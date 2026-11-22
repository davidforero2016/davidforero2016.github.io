/* Columna más reciente: lee assets/latest.json (actualizado a diario por GitHub Actions). */
(function () {
  var box = document.getElementById("latest");
  if (!box || !window.fetch) return;
  var lang = document.documentElement.lang === "en" ? "en" : "es";
  var M = {
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  };
  function fmt(iso) {
    var p = iso.split("-"), d = parseInt(p[2], 10), m = M[lang][parseInt(p[1], 10) - 1];
    return lang === "en" ? m + " " + d + ", " + p[0] : d + " " + m + " " + p[0];
  }
  fetch(box.getAttribute("data-src") + "?t=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (c) {
      if (!c || !c.title || !c.url) return;
      box.href = c.url;
      box.querySelector(".latest-title").textContent = c.title;
      box.querySelector(".latest-date").textContent = fmt(c.date) + " · " + c.source;
    })
    .catch(function () {});
})();
