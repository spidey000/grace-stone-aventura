# Assets Checklist

Lista de producción para cerrar el set de assets de aventura. Cada item debe terminar con archivo fuente editable, export final optimizado, prompt registrado, manifest y vista previa para validación.

## Pendiente de generar

- [ ] `backgrounds/`: fondos por itinerario con variaciones de clima, selva, ruina y noche.
- [ ] `patterns/`: patrones de soporte para cada ruta narrativa.
- [ ] `fragment-reveal/`: animación completa en SVG/Lottie o PNG sequence.
- [ ] `treasure-finale/`: animación de cierre con brillo, apertura y recompensa.
- [ ] `guardian-banner/`: banner narrativo en desktop, tablet y mobile.
- [ ] `step-icons/`: estados normal, activo, completado, bloqueado y error.
- [ ] `app-icon-pwa/`: icono base, favicon y variantes maskable.
- [ ] `audio/`: sfx de click, reveal, success, alert, treasure y ambient.
- [ ] `badge-insignia/`: insignia final con fondo, sin fondo y monocroma.
- [ ] `crystal-gems/`: gemas para progreso vacío, parcial, lleno y bonus.
- [ ] `fragment-progress/`: barra o anillo de progreso con 0, 25, 50, 75 y 100%.
- [ ] `grace-avatar/`: avatar de Grace con neutral, pista y celebración.
- [ ] `bravestone-avatar/`: avatar de Bravestone con neutral, alerta y celebración.
- [ ] `riddle-card-ui/`: panel de acertijo cerrado, abierto, correcto, incorrecto y resuelto.
- [ ] `adult-help-button/`: botón de ayuda adulta con default, hover, pressed, focus y disabled.
- [ ] `inventory-strip/`: tira de inventario vacía, con objetos, llena y compacta.
- [ ] `key-object-icons/`: set de objetos clave con fondo transparente y silueta legible.
- [ ] `lantern-screen/`: linterna mágica con overlay, halo y estado encendido/apagado.
- [ ] `treasure-map/`: mapa final con puntos de ruta, ruta marcada y versión completada.

## Entregables recomendados por asset

- Prompt final usado, basado en `prompt-library.md`.
- SVG editable para iconos, insignias y objetos simples.
- PNG transparente para piezas con textura o detalle fino.
- WebP/PNG para fondos si se prioriza tamaño.
- Lottie o sprite sheet para animaciones.
- MP3 y WAV para audio, con versión corta y loop cuando aplique.
- JSON de metadatos basado en `asset-manifest-template.json`.
- Preview JPG/PNG por carpeta para revisar el set completo sin abrir cada archivo.

## Convención de nombres

- Usar kebab-case.
- Incluir estado al final: `step-icon-active.svg`, `riddle-card-resolved.webp`.
- Incluir tamaño cuando haya múltiples exports: `guardian-banner-mobile-720x240.webp`.
- Incluir loop en audio ambiental: `ambient-jungle-loop.mp3`.

## Criterios de aceptación

- Las variantes conservan el mismo lenguaje visual.
- El asset fue generado desde un prompt trazable.
- Cada asset se lee bien en móvil y escritorio.
- Los iconos siguen siendo reconocibles a 24-32 px.
- El contraste es suficiente sobre `bg/outer` y `bg/surface`.
- Los estados clave tienen versiónes activas, inactivas y deshabilitadas.
- Las versiónes transparentes no tienen halos blancos ni bordes sucios.
- Las animaciones tienen un peso adecuado para usarse en mobile.
- Los audios tienen inicio limpio, sin silencio largo ni clicks al final.
- PWA incluye `192x192`, `512x512`, `maskable-512x512` y favicon SVG.

## Prioridad sugerida

1. Cerrar fondos, patrones y UI base.
2. Cerrar iconografía y objetos clave.
3. Cerrar animaciones y sonidos.
4. Exportar insignia final, mapa final y recursos de cierre.

## Rutas sugeridas

- `ai-assets/prompts/`: prompts finales por asset o lote.
- `ai-assets/manifests/`: metadatos de generación y revisión.
- `ai-assets/sources/`: archivos editables.
- `ai-assets/exports/svg/`: iconos y piezas vectoriales.
- `ai-assets/exports/png/`: assets transparentes y previews.
- `ai-assets/exports/webp/`: fondos y piezas raster optimizadas.
- `ai-assets/exports/audio/`: WAV fuente y MP3/OGG final.
- `ai-assets/exports/lottie/`: animaciones JSON.
