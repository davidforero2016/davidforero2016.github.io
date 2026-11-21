# Sitio de David Forero

Sitio personal bilingüe (español en la raíz, inglés en `/en/`), hecho en HTML y CSS, sin dependencias.

## Estructura

- `index.html`: versión en español (principal)
- `en/index.html`: versión en inglés
- `assets/style.css`: estilos (colores y tipografía al inicio del archivo)
- `assets/favicon.svg`: ícono de la pestaña
- `.nojekyll`: le indica a GitHub Pages que publique los archivos tal cual

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio público llamado exactamente `davidforero2016.github.io`.
2. Sube todos estos archivos a la raíz del repositorio, conservando las carpetas `assets` y `en`.
3. En el repositorio, ve a Settings → Pages. En "Branch", elige `main` y la carpeta `/ (root)`, y guarda.
4. En uno o dos minutos el sitio queda en https://davidforero2016.github.io

## Conectar un dominio propio (cuando lo compres)

1. En Settings → Pages → Custom domain, escribe el dominio (por ejemplo `davidforero.com`) y guarda.
2. En el registrador del dominio, crea los registros DNS que GitHub indica en su documentación de Pages (registros A hacia las IP de GitHub y un CNAME `www` hacia `davidforero2016.github.io`).
3. Cuando el dominio funcione, activa "Enforce HTTPS".

## Pendientes

- Reemplazar los enlaces de las columnas por las direcciones exactas de cada artículo (hoy apuntan a la portada de Al Poniente y de Medium).
- Agregar el enlace a LinkedIn cuando esté listo.
