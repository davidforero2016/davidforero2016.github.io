"""Busca la columna más reciente de David Forero (Al Poniente y Medium)
y la guarda en assets/latest.json para la portada del sitio."""
import html
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

FEEDS = [
    ("Al Poniente", "https://alponiente.com/author/davidforero/feed/"),
    ("Medium", "https://medium.com/feed/@davidforero2016"),
]
OUT = Path("assets/latest.json")
UA = "Mozilla/5.0 (compatible; davidforero2016.github.io latest-column bot)"


def newest(source, url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    best = None
    for item in root.iter("item"):
        title = html.unescape((item.findtext("title") or "").strip())
        link = (item.findtext("link") or "").strip().split("?")[0]
        date = parsedate_to_datetime(item.findtext("pubDate"))
        if title and link and (best is None or date > best["dt"]):
            best = {"title": title, "url": link, "dt": date, "source": source}
    return best


found = []
for source, url in FEEDS:
    try:
        item = newest(source, url)
        if item:
            found.append(item)
    except Exception as e:  # si un feed falla, se conserva lo anterior
        print(f"Aviso: no se pudo leer {source}: {e}", file=sys.stderr)

if not found:
    print("Sin datos nuevos; se conserva assets/latest.json")
    sys.exit(0)

top = max(found, key=lambda x: x["dt"])
data = {"title": top["title"], "url": top["url"], "source": top["source"],
        "date": top["dt"].date().isoformat()}
old = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else None
if old != data:
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Actualizado:", data)
else:
    print("Sin cambios:", data)
