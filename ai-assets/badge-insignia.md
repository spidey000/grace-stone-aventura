# Badge / Insignia — Insignia final de explorador/científico

## Uso en la app
Se muestra en la pantalla final (`FinalScreen`) después de completar la misión. Es el premio máximo. Se puede imprimir.

## Diseño visual actual (HTML/CSS)

```
┌──────────────────────────────────┐
│  🐠                              │
│                                  │
│  Explorador Honorífico           │
│  del Océano                      │
│                                  │
│  [nombre del niño]               │
│                                  │
│  ── color: #0e8277 ──           │
└──────────────────────────────────┘
```

## Especificaciones de diseño

- **Contenedor:** `.final-insig` — padding 24px, border-radius 16px
- **Fondo:** gradiente suave del color del itinerario
- **Tipografía:** título bold (1.2rem), nombre grande (1.5rem)
- **Icono:** emoji grande (48px) del itinerario
- **Borde:** 3px sólido, tono más oscuro

## Propuesta de insignia diseñada (SVG)

Para impresión se recomienda un SVG de alta calidad:

```
┌──────────────────────────────────┐
│  ⭐                             │
│  ┌────────────────────────────┐ │
│  │         🐠 / 🔬            │ │
│  │                            │ │
│  │  Explorador Honorífico     │ │
│  │  del Océano                │ │
│  │                            │ │
│  │  ──── Dr. Bravestone ────     │ │
│  └────────────────────────────┘ │
│                                │
│  Fecha: ___ de ____ de 2026    │
└──────────────────────────────────┘
```

## Archivos SVG propuestos

- `badge-ocean.svg` — Insignia para Oceanogràfic (background azul marino, peces decorativos)
- `badge-museu.svg` — Insignia para Museu (background púrpura/rojo, engranajes decorativos)

## Especificaciones SVG

- **Tamaño:** 400×500px (proporción vertical para impresión)
- **Fondo:** gradiente circular
- **Borde:** ornamentado estilo pergamino
- **Icono central:** 80px, con glow
- **Texto:** "Explorador Honorífico del Océano" / "Científico Honorífico"
- **Línea Dr. Bravestone:** cursiva
- **Fecha:** línea inferior para la fecha de la visita
- **Nombre:** espacio en blanco para escribir a mano (si se imprime)
