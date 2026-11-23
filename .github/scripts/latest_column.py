"""Revisa las columnas de David Forero en Al Poniente y Medium.
- assets/columns.json: historial completo por medio (agrega las nuevas, nunca borra).
- assets/latest.json: la columna más reciente de ambos medios, para la portada."""
import html
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

FEEDS = {
    "alponiente": ("Al Poniente", "https://alponiente.com/author/davidforero/feed/"),
    "medium": ("Medium", "https://medium.com/feed/@davidforero2016"),
}
COLS = Path("assets/columns.json")
LATEST = Path("assets/latest.json")
UA = "Mozilla/5.0 (compatible; davidforero2016.github.io columns bot)"


def read_feed(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    out = []
    for item in root.iter("item"):
        title = html.unescape((item.findtext("title") or "").strip())
        link = (item.findtext("link") or "").strip().split("?")[0]
        pub = item.findtext("pubDate")
        if title and link and pub:
            out.append({"date": parsedate_to_datetime(pub).date().isoformat(), "title": title, "url": link})
    return out


def write_if_changed(path, data):
    text = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if not path.exists() or path.read_text(encoding="utf-8") != text:
        path.write_text(text, encoding="utf-8")
        print("Actualizado:", path)


cols = json.loads(COLS.read_text(encoding="utf-8")) if COLS.exists() else {}
for key, (name, url) in FEEDS.items():
    known = cols.setdefault(key, [])
    seen = {c["url"].rstrip("/") for c in known}
    try:
        new = [c for c in read_feed(url) if c["url"].rstrip("/") not in seen]
    except Exception as e:  # si un medio no responde, se conserva lo anterior
        print(f"Aviso: no se pudo leer {name}: {e}", file=sys.stderr)
        continue
    for c in new:
        print(f"Nueva columna en {name}: {c['title']}")
    known.extend(new)
    known.sort(key=lambda c: c["date"], reverse=True)
write_if_changed(COLS, cols)

best = None
for key, (name, _) in FEEDS.items():
    for c in cols.get(key, [])[:1]:
        if best is None or c["date"] > best["date"]:
            best = {"title": c["title"], "url": c["url"], "source": name, "date": c["date"]}
if best:
    write_if_changed(LATEST, best)
