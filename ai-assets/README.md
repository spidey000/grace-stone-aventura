# AI Assets

Biblioteca de prompts y manifiestos para producir los assets visuales y de audio de la UI actual.

## Estructura

- `brief/`: estilo, tokens, guía, checklist y plantilla de manifiesto.
- `prompts/`: un prompt individual `prompt{asset_id}.md` por cada asset generable.
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
2. Elegir el asset en `prompts/prompt{asset_id}.md`.
3. Pasar el contenido del archivo a Grok como prompt único.
4. Guardar fuentes en `sources/` y salidas en `exports/`.
5. Registrar cada asset en `manifests/oceanografic-ui-pack.json`.

## Estructura de prompts

Cada `prompts/prompt{asset_id}.md` sigue la fórmula Grok optimizada:

```
[Style] + [Subject] + [Background/Palette] + [Mood] + [Technical details] + [Negative prompt]
```

- **Style first**: "Flat vector illustration", "Cinematic concept art", "Premium badge design"
- **Paleta explícita**: colores de la guía de estilo
- **Sujeto concreto**: descripción del asset única
- **Negative prompt al final**: "no text, no watermark, no logo, no clutter"

## Assets por familia

| Familia | Assets | Prompt files |
|---------|--------|-------------|
| audio | 1 | `promptaudio-crystal-unlock.md` |
| backgrounds | 2 | `promptbackground-*.md` |
| patterns | 1 | `promptpattern-ocean-floor-tile.md` |
| brand | 3 | `promptbrand-*.md` |
| ui | 8 | `promptui-*.md` |
| collectibles | 34 | `promptcollectibles-*.md` (18 cristales + 14 mapas + tesoro + insignia) |
| print | 4 | `promptprint-*.md` |
| **Total** | **53** | **53 prompts individuales** |

## Automatización local

- `npm run mcp:grok` levanta un servidor MCP local para controlar Grok con Camoufox.
- `npm run assets:sync` copia los exports finales de `ai-assets/exports/` a `public/` para que la web los consuma.
- `npm run assets:check` valida qué exports faltan antes de publicar.

El MCP usa un puente Python local y Camoufox con las librerías descargadas en `~/.local/camoufox-libs/` cuando no se define `CAMOUFOX_LD_LIBRARY_PATH`.

## Convención de runtime

- Imágenes y recursos visuales terminan en `public/assets/<familia>/...`.
- El audio de desbloqueo termina en `public/audio/fx/crystal-unlock.mp3`.
- El manifiesto de la web sigue siendo la fuente de verdad para el lote de assets.
