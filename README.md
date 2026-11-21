# Sitio de David Forero

Sitio personal bilingüe sobre demografía aplicada. La versión en español está en la raíz y la versión en inglés en `/en/`. Está construido en HTML, CSS y JavaScript, sin dependencias externas, y se publica con GitHub Pages en https://davidforero2016.github.io.

## Estructura

- `index.html`: versión en español (principal).
- `en/index.html`: versión en inglés.
- `assets/style.css`: estilos; los colores y la tipografía se definen al inicio del archivo.
- `assets/ink.js`: trazos de tinta del encabezado, del proyecto y del contacto.
- `assets/david-forero.jpg`: fotografía del perfil.
- `assets/favicon.svg`: ícono de la pestaña.
- `.nojekyll`: indica a GitHub Pages que publique los archivos sin procesarlos.

## Publicación

El sitio se publica automáticamente desde la rama `main`, carpeta raíz (Settings → Pages). Cada cambio confirmado en el repositorio aparece en línea en uno o dos minutos.

## Edición

Los textos se modifican directamente en `index.html` y `en/index.html`. Cualquier cambio de contenido debe hacerse en ambos archivos para mantener las dos versiones alineadas.

## Dominio propio (pendiente)

1. En Settings → Pages → Custom domain, se registra el dominio (por ejemplo, `davidforero.com`).
2. En el registrador del dominio se crean los registros DNS que indica la documentación de GitHub Pages: registros A hacia las direcciones IP de GitHub y un CNAME `www` hacia `davidforero2016.github.io`.
3. Una vez activo el dominio, se habilita "Enforce HTTPS".

## Pendientes

- Reemplazar los enlaces de las columnas por las direcciones exactas de cada artículo; por ahora apuntan a la portada de Al Poniente y de Medium.
- Agregar el enlace al perfil de LinkedIn.
