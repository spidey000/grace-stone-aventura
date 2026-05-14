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

