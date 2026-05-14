# Background Themes — Fondos de pantalla por itinerario

## Uso en la app
Fondos decorativos para las pantallas principales: Lobby, Adventure, FinalScreen. Diferenciados por itinerario para dar identidad visual.

## Oceanogràfic — Tema Océano

**Paleta de colores:**
- Primario: `#0e8277` (verde océano)
- Secundario: `#0c4a6e` (azul profundo)
- Acento: `#f2b84b` (dorado / coral)
- Fondo: gradiente azul verdoso

**Elementos visuales:**
- Olas estilizadas en la parte inferior
- Burbujas ascendiendo (animación lenta)
- Silueta de peces/ballenas en fondo (muy tenue, opacidad 10%)
- Textura de agua / arrecife

**Lobby:**
- Gradiente de fondo: `#0e8277 → #0c4a6e` (diagonal)
- Olas animadas en footer (CSS wave animation)
- Burbujas CSS animadas (círculos translúcidos que suben)

**Station card:**
- Fondo blanco `#ffffff` con borde izquierdo del color de la estación
- Sombra sutil `0 4px 16px rgba(0,0,0,0.08)`

## Museu — Tema Ciencia / Laboratorio

**Paleta de colores:**
- Primario: `#d95f45` (rojo ciencia)
- Secundario: `#6b7280` (gris laboratorio)
- Acento: `#8b6bb5` (púrpura experimento)
- Fondo: gris claro con textura

**Elementos visuales:**
- Fórmulas matemáticas tenues al fondo
- Engranajes sutiles
- Partículas flotando (átomos estilizados)
- Textura de pizarra / papel cuadriculado

**Lobby:**
- Gradiente de fondo: `#d95f45 → #6b7280` (diagonal)
- Partículas CSS animadas (puntos de colores que flotan)
- Iconos de ciencia (🔬⚗️🧬) en fondo con opacidad 5%

**Station card:**
- Fondo blanco con borde izquierdo del color de la estación
- Sombra sutil

## Archivos de imagen propuestos

| Archivo | Descripción |
|:--------|:------------|
| `assets/images/ocean-bg.svg` | Fondo con olas y peces para Oceanogràfic |
| `assets/images/science-bg.svg` | Fondo con fórmulas para Museu |
| `assets/images/ocean-wave.svg` | Ola decorativa para footer |
| `assets/images/bubble.svg` | Burbuja individual para animación |

## Nota de implementación

Actualmente no hay imágenes de fondo; todo se hace con CSS gradientes. Si se añaden imágenes, deben ser:
- Ligeras (<50KB)
- SVG preferiblemente (escalable)
- Opacidad reducida (10–20%) para no competir con el contenido
- Decorativas, no funcionales (accesibilidad: `aria-hidden="true"`)
