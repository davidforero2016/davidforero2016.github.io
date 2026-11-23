/* Editorial: lee assets/columns.json (actualizado a diario por GitHub Actions) y redibuja las listas. */
(function () {
  var box = document.getElementById("columns");
  if (!box || !window.fetch) return;
  var lang = document.documentElement.lang === "en" ? "en" : "es";
  var M = {
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };
  var see = box.getAttribute("data-see") || "";
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function row(c) {
    var p = c.date.split("-");
    return '<li><a href="' + esc(c.url) + '" target="_blank" rel="noopener"><span class="date">' +
      M[lang][parseInt(p[1], 10) - 1] + " " + p[0] + '</span><span class="title">' + esc(c.title) + "</span></a></li>";
  }
  function render(el, items) {
    var h4 = el.querySelector("h4").outerHTML, show = 6;
    var html = h4 + '<ul class="col-list">' + items.slice(0, show).map(row).join("") + "</ul>";
    if (items.length > show) {
      html += '<details class="more"><summary>' + esc(see) + " (" + items.length + ')</summary><ul class="col-list">' +
        items.slice(show).map(row).join("") + "</ul></details>";
    }
    el.innerHTML = html;
  }
  fetch(box.getAttribute("data-src") + "?t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data) return;
      Array.prototype.forEach.call(box.querySelectorAll("[data-outlet]"), function (el) {
        var items = data[el.getAttribute("data-outlet")];
        if (items && items.length) render(el, items);
      });
    })
    .catch(function () {});
})();
