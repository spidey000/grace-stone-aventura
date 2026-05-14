# Treasure Map — El Mapa del Arrecife (Oceanogràfic)

## Uso en la app
Aparece en la estación final (id 15) del itinerario Oceanogràfic. El jugador debe colocar las 14 piezas del mapa en sus posiciones correctas para revelar el tesoro.

## Diseño visual

```
┌────────────────────────────────────────────┐
│         🗺️  EL MAPA DEL ARRECIFE            │
│                                            │
│  ┌──────────────────────────────────┐      │
│  │  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  │      │
│  │  @  ┌──┐  ┌──┐  ┌──┐  ┌──┐  @  │      │
│  │  @  │🐙│  │  │  │🐢│  │  │  @  │      │
│  │  @  └──┘  └──┘  └──┘  └──┘  @  │      │
│  │  @  ┌──┐  ┌──┐  ┌──┐  ┌──┐  @  │      │
│  │  @  │  │  │  │  │  │  │  │  @  │      │
│  │  @  └──┘  └──┘  └──┘  └──┘  @  │      │
│  │  @  ┌──┐  ┌──┐  ┌──┐  ┌──┐  @  │      │
│  │  @  │  │  │  │  │  │  │  │  @  │      │
│  │  @  └──┘  └──┘  └──┘  └──┘  @  │      │
│  │  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  │      │
│  └──────────────────────────────────┘      │
│                                            │
│  🧩 Piezas disponibles:                    │
│  [🐙] [🪶] [🐢] [💧] [🪸] [🦭] [🐢]...  │
│                                            │
│  Arrastra cada pieza a su lugar             │
│  en el mapa.                                │
│                                            │
│  Progreso: 3/14 ■■■□□□□□□□□□□□            │
└────────────────────────────────────────────┘
```

## Especificaciones técnicas

- **Grid:** 7 columnas × 2 filas = 14 huecos (como el mapa real del Oceanogràfic)
- **Cada hueco:** 80×80px, borde dashed `#9ca3af`, border-radius 8px
- **Pieza:** 76×76px, border-radius 6px, sombra `0 2px 8px rgba(0,0,0,0.15)`
- **Fondo del mapa:** azul marino oscuro `#0c4a6e` con textura de océano (olas)

## Interacción

- **Drag & drop:** la pieza se arrastra desde el banco inferior
- **Snap:** al soltarla cerca del hueco correcto, encaja con animación
- **Feedback visual:** 
  - Correcto: la pieza se ilumina + sonido "click" de encaje
  - Incorrecto: la pieza rebota y vuelve al banco
- **Orden correcto:** las piezas se colocan por `routeOrder` (00→14) en orden de grid left→right, top→bottom
- **Completado:** cuando las 14 están colocadas, el mapa brilla + muestra el Ojo del Océano (animación de revelado)

## Elementos visuales específicos

| Elemento | Descripción |
|:---------|:------------|
| Fondo mapa | Azul marino con contorno dorado, ondas estilizadas |
| Grid huecos | 4×4 (14 visibles + 2 decorativos), líneas de navegación |
| Piezas | Icono del animal + borde del color de la estación |
| Banco inferior | Scroll horizontal con las piezas disponibles |
| Progreso | Barra de progreso con count 3/14 |
| Ojo del Océano | Animación final: ojo estilizado que se abre en el centro |

## Archivo de imagen

- `assets/images/treasure-map-bg.png` — 800×600px, fondo del mapa del arrecife
- `assets/images/ojo-oceano.png` — 200×200px, el ojo que se revela al completar

## Sonido

- `audio/fx/map-piece-place.mp3` — click de encaje al colocar pieza
- `audio/fx/treasure-reveal.mp3` — fanfarria al completar el mapa
