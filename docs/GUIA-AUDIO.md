# Guía de producción de audio

## Estructura de carpetas

Cada estación tiene su propia carpeta con los segmentos de audio:

```
public/audio/
├── fx/                          ← Efectos de sonido globales
│   ├── crystal-unlock.mp3       ← Cristal desbloqueado (1-2s)
│   ├── bubbles.mp3              ← Burbujas para zona tropical
│   ├── ice-crack.mp3            ← Hielo para pingüinos/belugas
│   ├── laboratory.mp3           ← Laboratorio para museu
│   ├── mystery-echo.mp3         ← Eco misterioso para inicio/final
│   └── success-chime.mp3        ← Tono de éxito al completar
│
├── oceanografic/
│   ├── 00/
│   │   ├── part-0.mp3           ← Texto antes de {username}
│   │   └── part-1.mp3           ← Texto después de {username}
│   │   └── fx/                  ← Efectos específicos de esta estación
│   │       └── ambient.mp3      ← Sonido ambiente del bioma
│   ├── 01/ …
│   └── 09/ …
│
└── museu/
    ├── 00/ …
    └── 09/ …
```

## Convención de nombres

| Archivo | Contenido | Duración |
|---------|-----------|----------|
| `part-0.mp3` | Narración antes del nombre del niño | 20-60s |
| `part-1.mp3` | Narración después del nombre | 10-40s |
| `fx/ambient.mp3` | Sonido ambiente del bioma (opcional) | 5-15s loop |
| `fx/crystal.mp3` | Sonido de cristal desbloqueado (específico) | 1-2s |

## Textos para grabar

### Oceanogràfic

| Estación | part-0 | part-1 |
|----------|--------|--------|
| 00 Inicio | ¡Atención,  | ! Aquí el Dr. Smolder Bravestone. Mi brújula —la misma que me guió por las junglas de Borneo— acaba de dispararse aquí en Valencia. Algo está haciendo eco bajo el océano. ¿Escuchas? Hay un misterio esperando, y lo vamos a resolver juntos. Mira a tu alrededor: ¿ves algo con forma de tiburón y cabeza de pala? Cuando estés listo, toca el botón y la misión comienza. |
| 01 Mediterráneo | (sin nombre) | El Mediterráneo parece un mar cualquiera, pero guarda tesoros: pulpos que cambian de color, tortugas que respiran aire como tú, y una planta llamada posidonia que no es un alga. Los buenos exploradores miran con calma. |
| 02 Tropical | (sin nombre) | El agua tropical está llena de colores: peces payaso con sus rayas blancas, cirujanos azules con espina escondida, y el napoleón que puede pesar 200 kilos. Cada color es un mensaje. ¿Cuál te gusta más? |
| 03 Islas | (sin nombre) | Los leones marinos tienen melena como los leones de verdad y rugen para comunicarse. Son mamíferos: respiran aire, tienen pelo y las crías toman leche. ¿Te atreves a rugir como ellos? |
| 04 Delfines | (sin nombre) | Los delfines son de los animales más inteligentes del océano. Se comunican con clics, silbidos y saltos. Usan el sonido como un GPS para encontrar comida. Son mamíferos, como tú y como yo. |
| 05 Pingüinos | (sin nombre) | Los pingüinos son pájaros que no vuelan... pero nadan como torpedos. El pingüino Juanito nada a 36 km/h y tiene un parche blanco detrás de los ojos. El Rey tiene plumas naranjas en el cuello. Mira cómo se mueven dentro y fuera del agua. |
| 06 Belugas | (sin nombre) | Las belugas son blancas como el hielo para camuflarse. Pueden girar la cabeza en todas direcciones porque no tienen aleta dorsal. Les llaman canarios del mar porque hacen muchos sonidos. Aquí viven Kylu, nacida aquí mismo, y Plombir y Miranda, rescatadas de la guerra de Ucrania. |
| 07 Cocodrilos | (sin nombre) | Los cocodrilos llevan en la Tierra más de 200 millones de años: vieron llegar y marcharse a los dinosaurios. Tienen escamas duras como armadura y pueden estar quietos mucho tiempo esperando. Son cazadores pacientes. |
| 08 Tiburones | (sin nombre) | Los tiburones no tienen huesos: su cuerpo es de cartílago, como tus orejas. Hay muchos tipos aquí: el martillo con ojos en los extremos de la cabeza, el nodriza que succiona la comida, el toro que traga aire para flotar. Son los guardianes del océano. |
| 09 Final | (sin nombre) | Los cristales juntos muestran la respuesta: el océano, los animales y la ciencia están conectados, y tú has sido el eslabón que faltaba. Valiente, curioso y paciente. El Dr. Smolder Bravestone te nombra Explorador Honorífico del Océano. Lleva esa insignia con orgullo. |

### Museu

| Estación | part-0 | part-1 |
|----------|--------|--------|
| 00 Inicio | (sin nombre) | ¡Bienvenido al laboratorio gigante,! Prepárate porque aquí la ciencia cobra vida. La regla es: tocar, sentir, experimentar. El Dr. Bravestone necesita un ayudante curioso, alguien que no tenga miedo de preguntar "¿y qué pasa si...?". Ese alguien eres tú. |
| 01 Sentidos | (sin nombre) | Aquí los sentidos son tus herramientas de científico. Hay espejos que te deforman, objetos que tienes que adivinar con los ojos cerrados y olores que reconocer. Los científicos usan todos sus sentidos para hacer descubrimientos. |
| 02 Bosque | (sin nombre) | En el bosque animado, tus dibujos cobran vida. Eliges un animal, lo coloreas, lo escaneas y aparece en la pantalla gigante. También hay animales de verdad: peces, tortugas y otros seres que viven en el agua y en la tierra. |
| 03 Construir | (sin nombre) | Los científicos no trabajan solos. En equipo pueden construir cosas increíblemente grandes. Aquí tienes ladrillos, grúas y carros para construir una casa con tu familia. Puedes construir, desmontar y volver a empezar. |
| 04 Magia | (sin nombre) | La química parece magia: líquidos que cambian de color, cosas que desaparecen, frío que quema. Pero no es magia: es ciencia. Los científicos mezclan sustancias y observan qué pasa. Así descubren cómo funciona el mundo. |
| 05 Péndulo | (sin nombre) | Este péndulo mide 34 metros: es de los más largos del mundo. Se mueve siempre en la misma dirección, pero la Tierra gira debajo de él. Por eso parece que cambia de dirección. Es la prueba de que nuestro planeta está girando ahora mismo. |
| 06 Metamorfosis | (sin nombre) | Todo cambia: las orugas se convierten en mariposas, los renacuajos en ranas, y tú cada día eres un poco más grande. Esta exposición te enseña que los cambios, aunque a veces den miedo, son parte de la vida. Y pueden ser mágicos. |
| 07 Cromosomas | (sin nombre) | Dentro de cada célula de tu cuerpo hay 23 pares de cromosomas. Son como un libro de instrucciones que dice cómo eres. El color de tus ojos, la forma de tu sonrisa y miles de cosas más están escritas ahí. |
| 08 Científicos | (sin nombre) | Tres científicos españoles cambiaron el mundo: Santiago Ramón y Cajal descubrió cómo funciona el cerebro, Severo Ochoa descifró cómo funcionan las células, y Jean Dausset entendió los genes. Gracias a ellos sabemos más de nosotros mismos. |
| 09 Final | (sin nombre) | ¡Lo has conseguido! Los cristales brillan y la respuesta está clara: la curiosidad, las preguntas y el trabajo en equipo pueden cambiar el mundo. Y tú lo has demostrado. El Dr. Smolder Bravestone te nombra Científico Honorífico por tu valentía y tus ganas de aprender. |

## Herramientas recomendadas

### Grabación de voz (Bravestone)
- **Audacity** (gratuito): https://www.audacityteam.org/
- **ElevenLabs** (TTS premium): https://elevenlabs.io/ — voz realista para español
- **Google Cloud TTS**: https://cloud.google.com/text-to-speech
- **Grabación directa**: usar Audacity con micrófono USB, grabar en seco (sin efectos)

### Efectos de sonido
- **Freesound**: https://freesound.org/ (revisar licencias)
- **Pixabay Sound Effects**: https://pixabay.com/sound-effects/ (revisar licencias)

### Formato de exportación
- **Formato:** MP3, 128-192 kbps, 44.1kHz, mono (voz) o estéreo (ambient)
- **Volumen:** normalizar a -3dB, sin clipping
- **Silencio inicial:** 0.5s antes de empezar a hablar

## Sistema de audio en la app

La app usa `useNarration` que por defecto usa Web Speech API para TTS.
Cuando los MP3 estén listos, se modificará para:

1. Intentar cargar `part-0.mp3` + nombre TTS + `part-1.mp3`
2. Si no existe MP3, caer en Web Speech API con el texto completo
3. Los efectos fx/ se reproducen al completar retos

El cambio está preparado en el hook `useNarration` en `src/App.jsx`.