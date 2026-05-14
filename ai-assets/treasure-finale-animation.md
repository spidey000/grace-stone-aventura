# Treasure Finale Animation — Animación de revelado del tesoro

## Uso en la app
Se dispara cuando el jugador completa el puzzle final (mapa o linterna). Es la recompensa máxima de toda la aventura.

## Secuencia de animación (4 segundos)

```
t=0s       t=1s       t=2s       t=3s       t=4s
│          │          │          │          │
▼          ▼          ▼          ▼          ▼
[oscuro] → [brillo  → [explosión → [tesoro  → [insignia]
           central]   de luz]     revelado]  + mensaje]
```

## Fase 1: Oscurecimiento (0–0.5s)
- La pantalla se oscurece gradualmente (overlay negro con opacidad 0→0.7)
- El sonido ambiente se desvanece
- Duración: 500ms

## Fase 2: Brillo central (0.5–1.5s)
- Aparece un punto de luz brillante en el centro
- Crece radialmente de 0 a 300px
- Color: blanco → dorado (para Oceanogràfic) / blanco → púrpura (para Museu)
- Efecto: glowing radial gradient
- Partículas diminutas empiezan a flotar desde el centro
- Duración: 1000ms

## Fase 3: Explosión de luz (1.5–2.5s)
- Explosión circular que llena la pantalla
- Partículas de colores explotan radialmente (colores de los objetos recolectados)
- Efecto: confetti digital, estrellas fugaces
- Flash blanco breve (200ms)
- Duración: 1000ms

## Fase 4: Tesoro revelado (2.5–3.5s)
- El mapa completo / la pantalla de la linterna se muestra con glow
- Oceanogràfic: El Ojo del Océano se abre lentamente en el centro del mapa
- Museu: Grace y el niño aparecen en la pantalla de la linterna
- Texto del mensaje aparece letra por letra (efecto máquina de escribir)
- Duración: 1000ms

## Fase 5: Insignia + mensaje (3.5–4s)
- La insignia del explorador/científico aparece con fade-in
- Sonido de fanfarria triunfal
- Botón "Continuar" aparece al final
- Todo se estabiliza en la pantalla final

## Implementación técnica

- **Tipo:** CSS animations + JS setTimeout para secuencia
- **Overlay:** fixed, z-index 100, pointer-events none (solo último paso clickable)
- **Partículas:** 50–100 partículas generadas con keyframes CSS (posiciones absolutas)
- **Texto máquina escribir:** JS interval con substring
- **Audio:** single `treasure-reveal.mp3` syncronizado con t=0.5s

## Archivos necesarios

| Archivo | Descripción |
|:--------|:------------|
| `audio/fx/treasure-reveal.mp3` | Fanfarria triunfal, 4s, estilo aventura |

## States CSS

```css
.treasure-overlay          { position: fixed; inset: 0; z-index: 100; 
                              background: rgba(0,0,0,0.7); }
.treasure-light            { position: absolute; top: 50%; left: 50%; 
                              border-radius: 50%; transform: translate(-50%,-50%); }
.treasure-particle         { position: absolute; border-radius: 50%; }
.treasure-message          { font-size: 1.5rem; text-align: center; 
                              animation: typewriter 1s steps(30); }
.treasure-badge            { animation: fadeIn 0.5s ease; }
```
