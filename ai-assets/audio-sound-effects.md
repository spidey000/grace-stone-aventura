# Audio Sound Effects — Efectos de sonido

## Uso en la app
Efectos de sonido para feedback de interacciones: completar fragmentos, recolectar objetos, errores, tesoro.

## Lista de efectos necesarios

### 1. Fragment Complete — Fragmento de acertijo completado
- **Archivo:** `audio/fx/fragment-complete.mp3`
- **Duración:** 0.5s
- **Descripción:** Sonido corto y alegre, como un "ding" o campanilla. Indica que se ha completado 1 de 3 fragmentos.
- **Estilo:** Tono ascendente, dos notas (do→mi o similar), optimista
- **Formato:** MP3, 128kbps, 44100Hz

### 2. Riddle Complete — Acertijo completo (3 fragmentos)
- **Archivo:** `audio/fx/riddle-complete.mp3`
- **Duración:** 1.5s
- **Descripción:** Fanfarria corta y triunfal. Los 3 fragmentos se han reunido y se obtiene el objeto clave.
- **Estilo:** Arpegio ascendente, 3 notas (como "subida" musical), final resonante
- **Formato:** MP3, 128kbps, 44100Hz

### 3. Object Collect — Recolectar objeto clave
- **Archivo:** `audio/fx/object-collect.mp3`
- **Duración:** 1.0s
- **Descripción:** Sonido mágico de "objeto obtenido". Similar a cuando coges un objeto en un juego de aventuras.
- **Estilo:** Sparkle / magia, con reverberación
- **Formato:** MP3, 128kbps, 44100Hz

### 4. Step Fail / Hint — Fallo en acertijo
- **Archivo:** `audio/fx/step-fail.mp3`
- **Duración:** 0.3s
- **Descripción:** Sonido corto y suave, no punitivo. Indica que la respuesta no es correcta pero está bien intentarlo.
- **Estilo:** Tono descendente suave, dos notas cortas, no negativo
- **Formato:** MP3, 128kbps, 44100Hz

### 5. Adult Help — Botón de ayuda adulto
- **Archivo:** `audio/fx/adult-help.mp3`
- **Duración:** 0.4s
- **Descripción:** Sonido neutral, como un "click" amable. Activa la ayuda del adulto.
- **Estilo:** Click suave con eco ligero
- **Formato:** MP3, 128kbps, 44100Hz

### 6. Map Piece Place — Colocar pieza del mapa
- **Archivo:** `audio/fx/map-piece-place.mp3`
- **Duración:** 0.3s
- **Descripción:** Sonido de encaje, como una pieza de puzzle encajando en su sitio.
- **Estilo:** Click físico, madera o plástico encajando
- **Formato:** MP3, 128kbps, 44100Hz

### 7. Slide Insert — Insertar diapositiva en linterna
- **Archivo:** `audio/fx/slide-insert.mp3`
- **Duración:** 0.3s
- **Descripción:** Sonido de diapositiva entrando en su ranura. Click mecánico suave.
- **Estilo:** Click metálico suave, como un cartucho entrando
- **Formato:** MP3, 128kbps, 44100Hz

### 8. Treasure Reveal — Revelar tesoro final
- **Archivo:** `audio/fx/treasure-reveal.mp3`
- **Duración:** 4.0s
- **Descripción:** Fanfarria triunfal larga para cuando se completa todo el mapa o la linterna.
- **Estilo:** Orquestal / aventura épica, crescendo, final grandioso
- **Formato:** MP3, 192kbps, 44100Hz

### 9. Crystal Unlock — Cristal de estación (existente)
- **Archivo:** `audio/fx/crystal-unlock.mp3`
- **Duración:** 0.8s
- **Descripción:** (Ya existe en `stations.js` como `crystalSound`). Sonido al completar una estación vía challenge normal.

## Notas de implementación

- Todos los sonidos deben ser ligeros (<50KB cada uno)
- Preferir tonos sintéticos (generados con bibliotecas JS o sintetizador) a samples grabados
- Alternativa: usar Web Audio API para generar tonos programáticamente (sin assets)
- Los sonidos deben funcionar offline (incluidos en service worker cache)

## Implementación alternativa sin assets

Usar Web Audio API para generar sonidos simples:

```js
function playTone(freq, duration, type = 'sine') {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}
```

Esto permitiría tener sonidos sin archivos MP3, pero con menor calidad.
