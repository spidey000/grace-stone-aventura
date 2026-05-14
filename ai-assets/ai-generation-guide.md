# AI Generation Guide

Guía para generar todos los activos visuales y de audio con IA manteniendo una dirección visual consistente.

## Objetivo

Producir un set completo de assets de aventura con calidad consistente: iconos, patrones, fondos, UI decorativa, personajes, objetos, animaciones y sonidos. Cada asset debe poder generarse desde un prompt base, revisarse contra criterios claros y exportarse a las rutas definidas en `assets-checklist.md`.

## Estado actual

Los documentos existentes definen dirección visual, tokens, lista de assets y criterios de aceptación. Eso es suficiente para alinear diseño, pero no para generar assets de forma directa y repetible.

Para producir con IA falta:

- prompts por familia de asset;
- negative prompts para evitar resultados inconsistentes;
- parámetros de tamaño, formato y fondo;
- convención de versionado;
- criterios de revisión por tipo de asset;
- manifest para registrar lo generado.

## Flujo recomendado

1. Elegir familia de asset en `prompt-library.md`.
2. Copiar el prompt base y reemplazar variables entre llaves.
3. Generar 3-6 variaciones por asset.
4. Seleccionar una dirección y generar estados/variantes.
5. Exportar a `ai-assets/exports/`.
6. Registrar el resultado en `asset-manifest-template.json`.
7. Validar contra `assets-checklist.md`.

## Reglas globales de prompt

Usar siempre estas restricciones salvo que un asset indique lo contrario:

- Estilo: aventura cinemática familiar, tablero antiguo, selva misteriosa, ruinas, tesoro, magia suave.
- Calidad: composición clara, formas legibles, alto detalle controlado, acabado premium para app infantil/familiar.
- Paleta: usar los tokens de `design-tokens.md`.
- Iluminación: contraste dramático pero legible, acentos dorados y jade.
- Evitar: terror, sangre, armas realistas, texto ilegible, logotipos, marcas, fotorealismo duro, exceso de ruido, UI genérica, fondos saturados.

## Reglas por tipo

- Iconos: vista frontal o 3/4 ligera, silueta reconocible a 24 px, fondo transparente, sin texto.
- Patrones: tileable/seamless, bajo contraste, no competir con texto.
- Fondos: composición con zona segura central para UI, detalle más fuerte en bordes.
- Avatares: expresivos, familiares, consistentes entre personajes, sin parecer fotografía.
- Objetos clave: una pieza por imagen, centrada, fondo transparente, sombra suave.
- UI decorativa: evitar texto dentro del asset; el texto real debe renderizarse en la app.
- Animaciones: generar keyframes o capas separadas cuando la herramienta no entregue Lottie.
- Audio: sfx cortos, limpios, sin voces, sin música con copyright.

## Variables comunes

- `{asset_name}`: nombre del asset.
- `{asset_family}`: familia, por ejemplo icon, background, pattern, avatar.
- `{state}`: default, active, completed, locked, error, resolved, etc.
- `{size}`: tamaño final esperado.
- `{background}`: transparent, dark jungle, aged map paper, etc.
- `{composition}`: centered, safe center, tileable, wide banner, mobile vertical.
- `{mood}`: mysterious, discovery, celebration, warning, calm.
- `{output_format}`: svg, png, webp, lottie, wav, mp3.

## Versionado

- Generación inicial: `v01`.
- Ajuste de prompt: incrementar versión.
- Cambio de dirección visual: crear nueva rama conceptual, por ejemplo `guardian-banner-v01a`.
- Archivo final: usar sufijo `final` solo cuando el asset pasó validación.

Ejemplo:

```text
key-object-compass-default-v01.png
key-object-compass-default-v02.png
key-object-compass-default-final.png
```

## Validación rápida

Antes de aceptar un asset:

- Se entiende en 1 segundo.
- No contiene texto generado por IA.
- Funciona sobre fondo oscuro.
- Respeta la paleta y el nivel de detalle.
- Tiene el formato y tamaño esperados.
- Tiene estados suficientes si es interactivo.
- No introduce elementos fuera del mundo visual.
