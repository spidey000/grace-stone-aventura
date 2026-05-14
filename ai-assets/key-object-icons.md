# Key Object Icons — Iconos de objetos clave y premios de sala

## Uso en la app
Cada estación con riddle otorga un objeto clave al completar los 3 fragmentos. Estos objetos se muestran en el inventory strip, la pantalla de tesoro y la pantalla final.

## Oceanogràfic — 14 Piezas del Mapa

Cada pieza es un icono circular con fondo blanco, borde del color de la estación y el emoji/icono del guardián.

| # | Objeto | ID | Color | Icono actual |
|:--|:-------|:---|:------|:-------------|
| 1 | Pieza del Mapa — Mediterráneo | mapa-mediterraneo | `#2e9f89` | 🐙 |
| 2 | Pieza del Mapa — Humedales | mapa-humedales | `#5aa86b` | 🪶 |
| 3 | Pieza del Mapa — Tortugas | mapa-tortugas | `#8aa64b` | 🐢 |
| 4 | Pieza del Mapa — Templados | mapa-templados | `#4f94a3` | 💧 |
| 5 | Pieza del Mapa — Tropicales | mapa-tropicales | `#f2b84b` | 🪸 |
| 6 | Pieza del Mapa — Islas | mapa-islas | `#7dbe57` | 🦭 |
| 7 | Pieza del Mapa — Islas Oceánicas | mapa-islas-oceanicas | `#9c8f4f` | 🐢 |
| 8 | Pieza del Mapa — Arrecife | mapa-arrecife | `#d65a4a` | 🪸 |
| 9 | Pieza del Mapa — Delfines | mapa-delfines | `#2b7fd3` | 🐬 |
| 10 | Pieza del Mapa — Flamencos | mapa-flamencos | `#e98ca8` | 🦩 |
| 11 | Pieza del Mapa — Antártico | mapa-antartico | `#8fd3ff` | 🐧 |
| 12 | Pieza del Mapa — Beluga | mapa-belugas | `#bfefff` | 🐋 |
| 13 | Pieza del Mapa — Cocodrilo | mapa-cocodrilos | `#647b36` | 🐊 |
| 14 | Pieza del Mapa — Tiburones | mapa-tiburones | `#123f63` | 🦈 |

## Museu — 8 Diapositivas de Cristal

Cada diapositiva tiene un marco blanco (simula cristal) con el icono centrado.

| # | Objeto | ID | Color | Icono actual |
|:--|:-------|:---|:------|:-------------|
| 1 | Diapositiva: Ciencia en Vivo | diapo-experimento | `#2b7fd3` | ⚗️ |
| 2 | Diapositiva: Los Sentidos | diapo-sentidos | `#e07b39` | 👁️ |
| 3 | Diapositiva: Bosque Animado | diapo-bosque | `#4c9e3a` | 🎨 |
| 4 | Diapositiva: Construcción | diapo-construccion | `#8b6bb5` | ⚙️ |
| 5 | Diapositiva: Péndulo | diapo-pendulo | `#6b7280` | 🪢 |
| 6 | Diapositiva: ADN | diapo-adn | `#0f9f8f` | 🧬 |
| 7 | Diapositiva: Teatro | diapo-teatro | `#b55488` | 🎭 |
| 8 | Diapositiva: Metamorfosis | diapo-metamorfosis | `#c084fc` | 🦋 |

## Especificaciones de diseño

- **Tamaño:** 40×40px (inventory), 76×76px (mapa), 56×76px (diapositiva)
- **Forma mapa:** cuadrada con bordes redondeados (6px) y sombra
- **Forma diapositiva:** rectangular vertical (3:4 ratio), marco blanco 2px
- **Fondo:** blanco `#ffffff` con borde del color de la estación (3px)
- **Icono centrado:** emoji a 24px dentro del círculo, o SVG personalizado
- **Estado collected:** opacidad 100%, con glow sutil
- **Estado missing (en tesoro):** opacidad 40%, con signo "?" gris

## Archivos SVG propuestos

Se sugiere generar SVG para los iconos principales (reemplazo de emojis para mejor calidad):
- `ocean/icon-pulpo.svg`
- `ocean/icon-garza.svg`
- `ocean/icon-tortuga.svg`
- `ocean/icon-foca.svg`
- `ocean/icon-coral.svg`
- `ocean/icon-leon-marino.svg`
- `ocean/icon-delfin.svg`
- `ocean/icon-flamenco.svg`
- `ocean/icon-pinguino.svg`
- `ocean/icon-beluga.svg`
- `ocean/icon-cocodrilo.svg`
- `ocean/icon-tiburon.svg`
- `museu/icon-experimento.svg`
- `museu/icon-sentidos.svg`
- `museu/icon-bosque.svg`
- `museu/icon-construccion.svg`
- `museu/icon-pendulo.svg`
- `museu/icon-adn.svg`
- `museu/icon-teatro.svg`
- `museu/icon-metamorfosis.svg`
