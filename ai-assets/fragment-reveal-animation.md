# Fragment Reveal Animation — Animación al completar un fragmento

## Uso en la app
Se dispara cuando el jugador responde correctamente un paso del riddle. El fragmento actual pasa de activo a completado, y el siguiente se desbloquea.

## Secuencia visual (0.8s)

```
t=0s            t=0.2s          t=0.5s          t=0.8s
│               │               │               │
▼               ▼               ▼               ▼
[Paso activo] → [resalta +     → [cambio de    → [siguiente
                 glow verde]     icono a ✅]     paso activo]
```

## Detalle de la animación

### Paso actual (0–0.2s)
- El borde del paso actual cambia a verde (`#86efac`) con glow
- Aparece feedback de texto "¡Fragmento recuperado!" en verde
- Sonido `fragment-complete.mp3` (0.5s)

### Transición (0.2–0.5s)
- El icono del paso escala de 🧩 a ✅ con animación pop-in
- El fondo del paso se vuelve verde claro (`#f0fdf4`)
- Opacidad baja a 80%

### Siguiente paso (0.5–0.8s)
- El siguiente paso pasa de locked a active
- Su borde cambia de gris al color de la estación
- Opacidad sube de 50% a 100%
- El icono cambia de 🔒 a 🧩

## CSS Implementation

```css
.riddle-step.active {
  border-color: var(--station-color);
  animation: step-activate 0.3s ease;
}

.riddle-step.done {
  border-color: #86efac;
  animation: step-complete 0.5s ease;
}

@keyframes step-complete {
  0%   { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
  50%  { transform: scale(1.02); box-shadow: 0 0 12px rgba(34,197,94,0.3); }
  100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
}

@keyframes step-activate {
  0%   { opacity: 0.5; transform: translateY(-4px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

## Estados intermedios (para el step-header)

```
Antes:   [🔒] Fragmento 2/3  (locked)
Durante: [🔒→✨→🧩] Fragmento 2/3  (transición 0.3s)
Después: [🧩] Fragmento 2/3  (active)
```

## Feedback de texto

Cuando se completa un fragmento (no el último), aparece un mensaje flotante:

```
┌──────────────────────┐
│ ¡Fragmento {n}       │
│ recuperado! 🧩✨     │
│                      │
│ {nombre del guardián}│
│ confía en ti.        │
└──────────────────────┘
```

Este mensaje se muestra 1.5s y luego desaparece automáticamente.
