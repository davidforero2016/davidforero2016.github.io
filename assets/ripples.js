// Dibuja las ondas de arena (jardín zen) en la portada.
(function () {
  var box = document.querySelector('.hero .ripples');
  if (!box) return;
  var w = 1200, h = 640, step = 22, rings = 7;
  var stones = [[930, 300, 46], [1090, 520, 26]];
  var out = [];
  stones.forEach(function (s) {
    for (var k = 1; k < rings; k++) out.push('<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + (s[2] + k * step) + '"/>');
  });
  for (var y0 = 40; y0 < h; y0 += 26) {
    var seg = [];
    for (var x = 0; x <= w + 12; x += 12) {
      var y = y0, cut = false;
      if (x <= w) {
        for (var i = 0; i < stones.length; i++) {
          var cx = stones[i][0], cy = stones[i][1], r = stones[i][2];
          var d = Math.hypot(x - cx, y0 - cy);
          if (d < r + rings * step + 8) { cut = true; break; }
          y += (2400 / (d + 40)) * (y0 > cy ? 1 : -1) * Math.exp(-Math.pow((x - cx) / 260, 2));
        }
      } else cut = true;
      if (cut) {
        if (seg.length > 1) out.push('<path d="M' + seg.join(' L') + '"/>');
        seg = [];
      } else seg.push(x + ',' + y.toFixed(1));
    }
  }
  var st = stones.map(function (s) {
    return '<ellipse cx="' + s[0] + '" cy="' + s[1] + '" rx="' + s[2] + '" ry="' + Math.round(s[2] * 0.82) + '" fill="#d9d2c3"/>';
  }).join('');
  box.innerHTML =
    '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">' +
    '<defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#f6f3ec"/>' +
    '<stop offset=".45" stop-color="#f6f3ec" stop-opacity=".55"/><stop offset="1" stop-color="#f6f3ec" stop-opacity="0"/></linearGradient></defs>' +
    '<g fill="none" stroke="#ddd5c5" stroke-width="1.3">' + out.join('') + '</g>' + st +
    '<rect width="' + w + '" height="' + h + '" fill="url(#fade)"/></svg>';
})();
