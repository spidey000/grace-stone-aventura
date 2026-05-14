# Riddle Card UI — Diseño visual del panel de acertijo

## Uso en la app
Es el componente central durante el juego. Se muestra cuando el jugador llega a una estación que tiene un `riddle` (con guardian, 3 pasos). Ocupa la zona principal de la `station-card`.

## Estructura visual

```
┌──────────────────────────────────────────────┐
│  🧩 GUARDIAN BANNER                          │
│  "Kylu, la cría de beluga, rompió su pieza   │
│   del mapa en 3 cantos submarinos..."        │
│  ── fondo degradado color estación ──        │
├──────────────────────────────────────────────┤
│                                              │
│  ┌ Paso 1 [🧩] Fragmento 1/3 ← activo ───┐  │
│  │ "Mira a Kylu. ¿De qué color es?"        │  │
│  │                                         │  │
│  │ [Blanco]  [Gris]  [Azul]               │  │
│  │                                         │  │
│  │ ── pista si falla ──                    │  │
│  │ [👤 Pedir ayuda adulto] (3 fallos)      │  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌ Paso 2 [🔒] Fragmento 2/3 ──bloqueado─┐  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  ┌ Paso 3 [🔒] Fragmento 3/3 ──bloqueado─┐  │
│  └─────────────────────────────────────────┘  │
│                                              │
│  [📨 Enviar a Grace]     [⏭ Saltar]          │
│                                              │
│  feedback text (verde si acierto,            │
│  amarillo si pista)                          │
└──────────────────────────────────────────────┘
```

## Estados visuales de cada paso

| Estado | Borde | Fondo | Icono | Opacidad |
|:-------|:------|:------|:------|:---------|
| **active** | Color de la estación (`--station-color`) | `#f0fdf4` | 🧩 | 100% |
| **done** | `#86efac` (verde) | `#f0fdf4` | ✅ | 80% |
| **locked** | `#e5e7eb` (gris) | `#f9fafb` | 🔒 | 50% |

## Especificaciones

- **Layout:** flex column, gap 12px entre pasos
- **Borde:** 2px solid, border-radius 10px, padding 14px
- **Fragmento activo:** animación subtle pulse en el borde cada 2s
- **Transiciones:** 0.2s ease all al cambiar de estado
- **Tipografía:** system sans-serif; step-text 1rem, step-label 0.85rem bold
- **Colores heredados:** `--station-color` (ej: #bfefff para Belugas)

## Modo responsive

- En <620px: botones choice-grid se apilan verticalmente
- Padding se reduce a 10px
- Guardian banner se colapsa a menos padding
