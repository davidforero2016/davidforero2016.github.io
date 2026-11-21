// Trazos de tinta tipo sumi-e: ondas de jardín zen y ensō, dibujados como pinceladas.
(function () {
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // Convierte una línea central en una pincelada con grosor variable.
  function stroke(pts, width, profile) {
    var L = [], R = [], n = pts.length, jit = width > 10 ? 0.05 : 0.22;
    for (var i = 0; i < n; i++) {
      var a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      var nx = -dy / len, ny = dx / len, t = i / (n - 1);
      var w = width * profile(t) * (1 - jit / 2 + jit * rnd()) / 2;
      L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]);
      var k = 1 - jit / 2 + jit * rnd();
      R.push([pts[i][0] - nx * w * k, pts[i][1] - ny * w * k]);
    }
    var all = L.concat(R.reverse());
    return 'M' + all.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' L') + 'Z';
  }
  // Perfiles de presión del pincel
  function press(t) { return Math.pow(Math.min(1, t * 10), 0.6) * (Math.pow(1 - t, 0.5) + 0.06); }
  function swell(t) { return Math.pow(Math.sin(Math.PI * t), 0.7) + 0.04; }

  // Ensō: círculo de un solo trazo, con una pequeña apertura.
  function enso(cx, cy, r, width, start, sweep, wobble) {
    var pts = [], steps = 90;
    for (var i = 0; i <= steps; i++) {
      var t = i / steps, ang = start + sweep * t;
      var rr = r * (1 + wobble * Math.sin(ang * 3 + 1.3) + (t > 0.85 ? (t - 0.85) * 0.12 : 0));
      pts.push([cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr]);
    }
    return stroke(pts, width, press);
  }
  // Piedra: mancha de tinta irregular
  function stone(cx, cy, r) {
    var pts = [], k = 28;
    for (var i = 0; i < k; i++) {
      var a = (i / k) * Math.PI * 2, rr = r * (0.9 + 0.18 * rnd());
      pts.push([cx + Math.cos(a) * rr * 1.08, cy + Math.sin(a) * rr * 0.9]);
    }
    return 'M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' L') + 'Z';
  }
  function svg(w, h, body, extra) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="' + (extra || 'xMidYMid meet') + '" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
  }

  // ---- Portada: arena rastrillada alrededor de una piedra ----
  function hero(el) {
    seed = 11;
    var w = 1200, h = 680, cx = 905, cy = 320, out = [];
    var rings = [72, 112, 150, 186, 220];
    rings.forEach(function (r, i) {
      out.push('<path d="' + enso(cx, cy, r, 9 - i * 1.3, -1.2 + i * 0.7, Math.PI * (1.82 - i * 0.04), 0.012) +
        '" fill="#c8d7e6" opacity="' + (0.5 - i * 0.07).toFixed(2) + '"/>');
    });
    var limit = rings[rings.length - 1] + 26;
    for (var y0 = 46; y0 < h; y0 += 30) {
      var seg = [];
      for (var x = -10; x <= w + 20; x += 10) {
        var d = Math.hypot(x - cx, y0 - cy), y = y0;
        if (d < limit || x > w + 10) {
          if (seg.length > 6) out.push('<path d="' + stroke(seg, 3.6, swell) + '" fill="#c8d7e6" opacity="0.17"/>');
          seg = []; continue;
        }
        y += (3600 / (d + 60)) * (y0 > cy ? 1 : -1) * Math.exp(-Math.pow((x - cx) / 300, 2));
        y += Math.sin(x / 140 + y0) * 1.4;
        seg.push([x, y]);
      }
    }
    out.push('<path d="' + stone(cx, cy, 30) + '" fill="#e2622b"/>');
    el.innerHTML = svg(w, h,
      '<defs><linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="#0f1d30"/><stop offset=".42" stop-color="#0f1d30" stop-opacity=".7"/><stop offset=".75" stop-color="#0f1d30" stop-opacity="0"/></linearGradient></defs>' +
      out.join('') + '<rect width="' + w + '" height="' + h + '" fill="url(#fadeL)"/>', 'xMidYMid slice');
  }

  // ---- Samon: ensō grande con ondas internas ----
  function ensoArt(el) {
    seed = 29;
    var out = [], c = 200;
    out.push('<path d="' + enso(c, c, 158, 20, -0.9, Math.PI * 1.86, 0.018) + '" fill="#c8d7e6" opacity=".9"/>');
    [118, 88, 60].forEach(function (r, i) {
      out.push('<path d="' + enso(c, c, r, 5 - i, 0.6 + i * 1.7, Math.PI * (1.6 + i * 0.1), 0.02) + '" fill="#c8d7e6" opacity="' + (0.45 - i * 0.1).toFixed(2) + '"/>');
    });
    out.push('<path d="' + stone(c, c, 22) + '" fill="#e2622b"/>');
    el.innerHTML = svg(400, 400, out.join(''));
  }

  // ---- Contacto: ensō pequeño en tinta ----
  function ensoSmall(el) {
    seed = 41;
    el.innerHTML = svg(100, 100,
      '<path d="' + enso(50, 50, 38, 7, -1.0, Math.PI * 1.84, 0.02) + '" fill="#141a21"/>' +
      '<path d="' + stone(50, 50, 7) + '" fill="#e2622b"/>');
  }

  var map = { hero: hero, enso: ensoArt, 'enso-small': ensoSmall };
  document.querySelectorAll('[data-ink]').forEach(function (el) {
    var f = map[el.getAttribute('data-ink')]; if (f) f(el);
  });
})();
