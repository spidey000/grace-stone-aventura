# Fragment Reveal Animation — Revelado de fragmento

## Uso en la app
Se dispara cuando un paso del riddle se resuelve. La pieza activa pasa a completada y el siguiente paso se desbloquea.

## Partes que necesita esta animación
- borde activo
- glow de recompensa
- cambio de icono
- texto breve de confirmación
- transición del siguiente paso

## Secuencia visual
`activo -> brillo -> check -> siguiente paso`

## Iconos necesarios
- `locked`: candado cerrado
- `active`: pieza o fragmento
- `done`: check dentro de círculo o medalla

## Patrones visuales
- resplandor radial corto
- destello de polvo
- borde pulsante de baja intensidad
- transición de escala mínima

## Feedback de texto
- mensaje corto: `Fragmento recuperado`
- estilo: pergamino o placa pequeña
- duración: 1.5s

## CSS de referencia
```css
.riddle-step.active { border-color: var(--station-color); animation: step-activate 0.3s ease; }
.riddle-step.done { border-color: #86efac; animation: step-complete 0.5s ease; }
```
