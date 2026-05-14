# Lantern Screen — La Linterna Mágica (Museu)

## Uso en la app
Aparece en la estación final (id 09) del itinerario Museu. El jugador debe insertar las 8 diapositivas en las ranuras del proyector para revelar el mensaje secreto.

## Diseño visual

```
┌────────────────────────────────────────────┐
│        📽️  LA LINTERNA MÁGICA              │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │                                    │    │
│  │           ┌──────────┐             │    │
│  │           │ PANTALLA │             │    │
│  │           │          │             │    │
│  │           └──────────┘             │    │
│  │                                    │    │
│  │   [1] [2] [3] [4] [5] [6] [7] [8] │    │
│  │    ▲   ▲   ▲   ▲   ▲   ▲   ▲   ▲   │    │
│  │    │   │   │   │   │   │   │   │   │    │
│  │   ── ── ── ── ── ── ── ──        │    │
│  │  (ranuras para insertar)          │    │
│  └────────────────────────────────────┘    │
│                                            │
│  💡 Diapositivas disponibles:              │
│  [⚗️] [👁️] [🎨] [⚙️] [🪢] [🧬] [🎭] [🦋]  │
│                                            │
│  Inserta cada diapositiva en la ranura     │
│  correspondiente (orden de visita).        │
│                                            │
│  Progreso: 3/8 ■■■□□□□□                   │
└────────────────────────────────────────────┘
```

## Especificaciones técnicas

- **Ranuras:** 8 ranuras numeradas (1–8) en línea horizontal
- **Cada ranura:** 60×80px, slot vertical con margen para agarrar
- **Diapositiva:** 56×76px, borde blanco (simula cristal), semi-transparente
- **Pantalla:** 360×240px, centro superior, muestra la diapositiva insertada

## Interacción

- **Drag & drop:** la diapositiva se arrastra desde el banco inferior
- **Snap:** al soltarla sobre la ranura numerada correcta, encaja
- **Número correcto:** el número de ranura = `routeOrder` de la estación (1-indexed)
- **Feedback visual:**
  - Correcto: la diapositiva se ilumina en la ranura + aparece en la pantalla
  - Incorrecto: la diapositiva rebota y vuelve al banco
- **Completado:** cuando las 8 están insertadas, la pantalla se ilumina mostrando al Dr. Smolder Bravestone con la mano en el hombro del niño y el texto "Tú también eres científico"

## Elementos visuales específicos

| Elemento | Descripción |
|:---------|:------------|
| Proyector | Estilo linterna mágica / proyector vintage, color gris oscuro |
| Pantalla | Rectangular blanca con bordes redondeados |
| Ranuras | 8 slots verticales numerados, estilo soporte de diapositivas |
| Diapositivas | Marco blanco con icono centrado, semi-transparencia |
| Luz del proyector | Haz de luz (animado) desde la linterna a la pantalla |
| Mensaje final | Bravestone + niño + frase ¡animación de revelado! |

## Archivos de imagen

- `assets/images/lantern-body.png` — cuerpo del proyector/linterna
- `assets/images/lantern-screen-frame.png` — marco de la pantalla
- `assets/images/bravestone-message.png` — imagen final: Bravestone + niño + texto

## Sonido

- `audio/fx/slide-insert.mp3` — click al insertar diapositiva
- `audio/fx/lantern-reveal.mp3` — sonido mágico al completar la linterna
