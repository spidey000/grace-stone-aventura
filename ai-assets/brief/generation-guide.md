# Generation Guide

## Qué generar

Solo assets que la UI actual pueda usar de forma directa:

- fondos de pantalla completa;
- texturas repetibles;
- iconos de marca y selector;
- paneles, banners y estados de UI;
- cristales, piezas del mapa e insignia final;
- recursos imprimibles del pasaporte;
- el efecto sonoro de desbloqueo.

## Flujo

1. Elegir el archivo de `prompts/` que corresponda.
2. Usar el bloque exacto del asset.
3. Generar 3 o más variaciones por familia.
4. Exportar en los tamaños pedidos.
5. Guardar fuentes editables en `sources/`.
6. Registrar el resultado en `manifests/oceanografic-ui-pack.json`.

## Reglas de prompt

- Describir el asset, su uso y su pantalla.
- Indicar composición, safe area y nivel de detalle.
- Especificar tamaño y formato final.
- Mantener el mundo marino de Oceanogràfic y la aventura tipo Jumanji.
- Evitar texto generado, marcas, ruido, terror o estética genérica.

## Nombres

- Usar kebab-case.
- Incluir la familia y la función.
- Incluir el tamaño en el nombre cuando haya varios exports.

Ejemplos:

- `background-oceanografic-shell-desktop-1920x1080.webp`
- `guardian-banner-oceanografic-1440x360.png`
- `map-piece-delfines-512.png`

