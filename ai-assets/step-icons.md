# Step Icons — Iconos de estado de paso del acertijo

## Uso en la app
Aparecen en el `step-header` de cada paso del riddle. Son 3 estados: locked, active, done.

## Estado LOCKED (bloqueado)

**Forma actual (emoji):** 🔒
**Descripción:** Candado cerrado, gris, opaco.
**Propuesta SVG:**
- Círculo de fondo `#f3f4f6` con borde `#d1d5db`
- Candado simple centrado, color `#9ca3af`
- Tamaño: 28×28px
- Efecto: ninguno (estático)

## Estado ACTIVE (activo)

**Forma actual (emoji):** 🧩
**Descripción:** Pieza de puzzle/puzle, color de la estación.
**Propuesta SVG:**
- Forma de pieza de puzzle (con entrante/saliente en un lado)
- Color: `var(--station-color)` con relleno
- Tamaño: 28×28px
- Efecto: pulse suave (scale 1↔1.1 cada 2s) para llamar atención

## Estado DONE (completado)

**Forma actual (emoji):** ✅
**Descripción:** Check verde dentro de círculo.
**Propuesta SVG:**
- Círculo relleno `#86efac` con borde `#22c55e`
- Checkmark blanco centrado
- Tamaño: 28×28px
- Efecto: pop-in (scale 0→1.2→1 en 0.3s) al aparecer

## Alternativa minimalista (texto plano)

En lugar de SVG, se puede usar el emoji directamente. El emoji funciona bien en móvil y no requiere assets extra. Decidir si merece la pena generar SVGs personalizados.

## Archivos necesarios

| Archivo | Descripción | Formato |
|:--------|:------------|:--------|
| `step-locked.svg` | Candado cerrado | SVG 28×28 |
| `step-active-ocean.svg` | Puzzle piece Oceanogràfic | SVG 28×28 |
| `step-active-museu.svg` | Puzzle/frasco Museu | SVG 28×28 |
| `step-done.svg` | Check verde | SVG 28×28 |
