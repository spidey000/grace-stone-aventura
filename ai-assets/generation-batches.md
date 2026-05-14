# Generation Batches

Plan de lotes para generar todos los assets con IA sin perder consistencia visual.

## Batch 01: Dirección Visual Base

Objetivo: fijar el look antes de generar muchas piezas.

- `backgrounds/jungle-night`
- `backgrounds/ancient-ruins`
- `patterns/carved-symbols`
- `guardian-banner/default`
- `key-object-icons/compass`
- `crystal-gems/full`

Prompt sections:

- Backgrounds
- Patterns
- Guardian Banner
- Key Object Icons
- Crystal Gems

Aceptar este lote solo cuando la paleta, textura, brillo dorado/jade y nivel de detalle sean consistentes.

## Batch 02: Fondos y Patrones

Objetivo: cubrir escenarios y superficies.

- `backgrounds/itinerary-jungle-day`
- `backgrounds/itinerary-jungle-night`
- `backgrounds/itinerary-ruins`
- `backgrounds/itinerary-cave`
- `backgrounds/itinerary-map`
- `patterns/vines`
- `patterns/map-lines`
- `patterns/stone-carvings`
- `patterns/treasure-symbols`

Prompt sections:

- Backgrounds
- Patterns

Outputs:

- Mobile: `1080x1920`
- Desktop: `1920x1080`
- Pattern tiles: `1024x1024`

## Batch 03: Iconos UI y Estados

Objetivo: producir el lenguaje de estado de la app.

- `step-icons/default`
- `step-icons/active`
- `step-icons/completed`
- `step-icons/locked`
- `step-icons/error`
- `adult-help-button/default`
- `adult-help-button/hover`
- `adult-help-button/pressed`
- `adult-help-button/focus`
- `adult-help-button/disabled`

Prompt sections:

- Step Icons
- Key Object Icons

Outputs:

- SVG editable si la herramienta lo permite.
- PNG transparente: `512`, `256`, `96`, `48`, `32`, `24`.

## Batch 04: Objetos, Gemas e Inventario

Objetivo: cerrar piezas coleccionables y progreso.

- `key-object-icons/compass`
- `key-object-icons/lantern`
- `key-object-icons/map-fragment`
- `key-object-icons/golden-key`
- `key-object-icons/jade-token`
- `crystal-gems/empty`
- `crystal-gems/partial`
- `crystal-gems/full`
- `crystal-gems/bonus`
- `fragment-progress/0`
- `fragment-progress/25`
- `fragment-progress/50`
- `fragment-progress/75`
- `fragment-progress/100`
- `inventory-strip/empty`
- `inventory-strip/filled`
- `inventory-strip/full`
- `inventory-strip/compact`

Prompt sections:

- Key Object Icons
- Crystal Gems
- Inventory Strip

## Batch 05: Personajes y Narrativa

Objetivo: generar avatares y piezas narrativas.

- `grace-avatar/neutral`
- `grace-avatar/hint`
- `grace-avatar/celebration`
- `bravestone-avatar/neutral`
- `bravestone-avatar/alert`
- `bravestone-avatar/celebration`
- `guardian-banner/default`
- `guardian-banner/compact`

Prompt sections:

- Avatars
- Guardian Banner

Outputs:

- Avatares: `512`, `256`, `128`.
- Banners: `1440x360`, `720x240`.

## Batch 06: UI Especial

Objetivo: producir pantallas y marcos especiales.

- `riddle-card-ui/closed`
- `riddle-card-ui/open`
- `riddle-card-ui/correct`
- `riddle-card-ui/incorrect`
- `riddle-card-ui/resolved`
- `lantern-screen/off`
- `lantern-screen/on`
- `treasure-map/default`
- `treasure-map/completed`
- `badge-insignia/default`
- `badge-insignia/transparent`
- `badge-insignia/monochrome`

Prompt sections:

- Riddle Card UI
- Treasure Map
- Key Object Icons

## Batch 07: PWA y Export Final

Objetivo: cerrar assets de instalación y versión final.

- `app-icon-pwa/base`
- `app-icon-pwa/favicon`
- `app-icon-pwa/maskable`

Prompt sections:

- PWA Icon

Outputs:

- `favicon.svg`
- `icon-192.png`
- `icon-512.png`
- `icon-maskable-512.png`

## Batch 08: Animación y Audio

Objetivo: añadir feedback sensorial.

- `fragment-reveal/start`
- `fragment-reveal/reveal`
- `fragment-reveal/settle`
- `treasure-finale/start`
- `treasure-finale/open`
- `treasure-finale/reward`
- `audio/click`
- `audio/reveal`
- `audio/success`
- `audio/alert`
- `audio/treasure`
- `audio/ambient-jungle-loop`

Prompt sections:

- Animation Keyframes
- Audio SFX

Outputs:

- Lottie JSON o PNG sequence.
- WAV fuente y MP3/OGG optimizado.

## Reglas de Ejecución

- No avanzar al siguiente lote si el Batch 01 no está aprobado.
- Generar mínimo 3 variaciones por asset nuevo.
- Mantener una variante elegida como referencia visual por familia.
- Registrar cada asset aceptado en `ai-assets/manifests/`.
- Exportar previews por lote para comparación rápida.
