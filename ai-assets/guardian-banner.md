# Guardian Banner — Cabecera narrativa del acertijo

## Uso en la app
Aparece al inicio de cada estación con riddle. Muestra el nombre del guardián y la introducción narrativa que explica que el premio está roto en 3 fragmentos.

## Diseño visual

```
┌──────────────────────────────────────────────┐
│  🧩                                          │
│  "El pulpo del Mediterráneo ha escondido     │
│   su pieza del mapa en 3 fragmentos..."      │
│                                              │
│  ── gradiente: color estación → 70%+blanco ──│
└──────────────────────────────────────────────┘
```

## Especificaciones

- **Background:** `linear-gradient(135deg, var(--station-color), color-mix(in srgb, var(--station-color) 70%, #fff))`
- **Border-radius:** 12px
- **Padding:** 14px 18px
- **Display:** flex, gap 12px, icono a la izquierda
- **Icono:** 🧩 (emoji, 28px)
- **Texto:** cursiva (`font-style: italic`), ~0.95rem, color blanco
- **Sombra:** box-shadow sutil `0 2px 8px rgba(0,0,0,0.1)`

## Variante: Treasure Banner

Cuando la estación es de tipo `treasure`, el banner cambia:
- **Background:** gradiente `#7a4fd1 → #b55488` (púrpura)
- **Centrado:** flex column, align-items center
- **Título:** `treasure.title` en h2, tamaño 1.3rem
- **Icono:** 🗺️ para Oceanogràfic, 📽️ para Museu

## Tokens de color por itinerario

Oceanogràfic: colores de agua/océano (#0e8277, #2e9f89, #2b7fd3, etc.)
Museu: colores cálidos/ciencia (#d95f45, #e07b39, #8b6bb5, etc.)
