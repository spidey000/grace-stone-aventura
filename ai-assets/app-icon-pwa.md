# App Icon / PWA — Icono de la aplicación

## Uso en la app
Icono de la Progressive Web App. Se usa en el manifest, la pantalla de inicio del dispositivo y los bookmarks.

## Estado actual
Actualmente existe `public/grace-icon.svg` que es un SVG con la letra "G" estilizada.

## Propuesta de diseño

**Concepto:** Una brújula con una "G" en el centro, rodeada de un anillo con colores océano y ciencia.

**Elementos:**
- Círculo exterior: dividido en dos mitades de color
  - Mitad izquierda: `#0e8277` (verde océano)
  - Mitad derecha: `#d95f45` (rojo ciencia)
- Interior: forma de brújula/rosa de los vientos estilizada
- Centro: letra "G" blanca, bold, sans-serif
- Detalle: estrella de 4 puntas en una esquina (aventura)

**Tamaños necesarios (para manifest):**
- 192×192px
- 512×512px

**Formatos:**
- SVG (origen)
- PNG (generado desde SVG para compatibilidad)

## Archivos

- `public/grace-icon.svg` — Reemplazar con el nuevo diseño
- `public/grace-icon-192.png` — 192×192 PNG
- `public/grace-icon-512.png` — 512×512 PNG

## Colores

- Océano: `#0e8277`
- Ciencia: `#d95f45`
- Fondo: `#ffffff`
- Texto/G: `#ffffff`
- Sombra: `rgba(0,0,0,0.1)`

## Nota de implementación

Actualizar `public/manifest.webmanifest` si se cambia la ruta del icono.
