# AI Assets

Biblioteca de prompts y manifiestos para producir los assets visuales y de audio de la UI actual.

## Estructura

- `brief/`: estilo, tokens, guía, checklist y plantilla de manifiesto.
- `prompts/`: prompts listos para cada familia de asset.
- `manifests/`: lotes y catálogos de lo que hay que generar.
- `sources/`: archivos editables de trabajo.
- `exports/`: salidas finales organizadas por uso.

## Familias

- `backgrounds/`: fondos a pantalla completa para lobby, misión y final.
- `patterns/`: texturas repetibles para superficies, márgenes y paneles.
- `brand/`: icono de app, insignias y badges de itinerario.
- `ui/`: paneles, banners, estados y botones especiales.
- `collectibles/`: cristales, piezas del mapa, insignia final y mapa de tesoro.
- `print/`: recursos del pasaporte imprimible.
- `audio/`: efectos sonoros mínimos para feedback.

## Flujo

1. Abrir `brief/generation-guide.md`.
2. Elegir la familia en `prompts/`.
3. Generar variaciones con los tamaños indicados.
4. Guardar fuentes en `sources/` y salidas en `exports/`.
5. Registrar cada asset en `manifests/oceanografic-ui-pack.json`.

## Automatización local

- `npm run mcp:grok` levanta un servidor MCP local para controlar Grok con Camoufox.
- `npm run assets:sync` copia los exports finales de `ai-assets/exports/` a `public/` para que la web los consuma.
- `npm run assets:check` valida qué exports faltan antes de publicar.

El MCP usa un puente Python local y Camoufox con las librerías descargadas en `~/.local/camoufox-libs/` cuando no se define `CAMOUFOX_LD_LIBRARY_PATH`.

## Convención de runtime

- Imágenes y recursos visuales terminan en `public/assets/<familia>/...`.
- El audio de desbloqueo termina en `public/audio/fx/crystal-unlock.mp3`.
- El manifiesto de la web sigue siendo la fuente de verdad para el lote de assets.
