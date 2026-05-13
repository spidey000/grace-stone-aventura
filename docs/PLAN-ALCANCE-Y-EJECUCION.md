# Plan, alcance y forma de trabajo

**Estado actual:** fase 0, definicion del proyecto.  
**Objetivo de este documento:** decidir que vamos a construir primero, que dejamos fuera y como avanzaremos sin sobredimensionar el proyecto.

## 1. Enfoque actual

Antes de seguir programando, el proyecto debe quedar claro en cuatro niveles:

1. **Experiencia:** que vivira el niño durante la visita.
2. **Contenido:** estaciones, guiones, retos, fuentes y materiales.
3. **Producto:** pantallas, mecanicas y progreso.
4. **Tecnica:** stack, estructura, deploy, offline y datos.

La prioridad ahora no es tener muchas features. La prioridad es tener una aventura coherente, viable para una visita real y facil de ajustar.

## 2. Resultado final deseado

Una app web movil que se abre antes de la visita, se queda preparada para funcionar con mala cobertura y guia al niño por una historia de Grace Stone.

El adulto puede acompañar y resolver bloqueos, pero la sensacion para el niño debe ser:

- Grace me habla.
- Estoy en una mision.
- Encuentro pistas reales.
- Gano cristales.
- Al final he ayudado a salvar el equilibrio del oceano y la ciencia.

## 3. Alcance MVP

El MVP es la version minima que ya serviria para hacer la visita.

### Incluido

- Proyecto web React + Vite desplegable en Vercel.
- Diseño movil responsive.
- Ruta secuencial de 8-10 estaciones.
- Narracion escrita por estacion.
- Voz provisional con Web Speech API.
- Retos simples:
  - confirmar llegada o prueba,
  - opcion multiple,
  - texto corto.
- Cristales desbloqueables.
- Progreso guardado en LocalStorage.
- Boton para reiniciar.
- Carpetas para audios y mapas.
- Documentacion interna.
- Fuentes oficiales organizadas.

### No incluido en el MVP

- GPS obligatorio.
- QR obligatorio.
- Camara obligatoria.
- Firebase o cuentas de usuario.
- Panel de administracion.
- Mapa interactivo avanzado.
- Generacion dinamica de audio en runtime.
- Analiticas.
- Pagos o publicacion publica en tiendas.

Estas features pueden llegar despues, pero no son necesarias para que la primera visita funcione.

## 4. Decisiones cerradas

> Actualizado: 2026-05-13

| Tema | Decision | Detalle |
|---|---|---|
| Itinerarios | Dos separados | Oceanogràfic (~90 min) y Museu (~60 min), elegidos al inicio |
| Nombre del niño | Input al inicio | Se introduce antes de empezar, se usa para personalizar audio |
| Audio | MP3 reales con nombre dinámico | Texto antes y después del nombre = MP3 pregrabado; nombre = TTS en runtime; concatenación secuencial |
| QR | No en V1 | Opcional para versión posterior |
| Oceanogràfic + Museu | Itinerarios separados | No se combinan en una misma sesión |

### Sistema de audio con nombre personalizado

Para cada fragmento narrativo que contenga `{username}`:

1. El texto **antes** de `{username}` → MP3 pregrabado (hosted en `public/audio/`)
2. El texto **después** de `{username}` → MP3 pregrabado
3. El nombre del usuario → generado por Web Speech API (TTS) en español
4. Reproducción secuencial: parte_0 → nombre → parte_1

```
Estructura de carpetas:
public/audio/{itinerario}/{stationId}/part-0.mp3   ← antes de {username}
public/audio/{itinerario}/{stationId}/part-1.mp3   ← después de {username}
```

**Fallback:** si falta algún MP3, usa Web Speech API para todo el texto de la estación.

### Flujo de UI

```
Lobby → (nombre + 选择 itinerario) → Aventura → Final
```

- **Lobby:** input de nombre + dos tarjetas (Oceanogràfic / Museu)
- **Aventura:** estaciones del itinerario elegido, audio secuencial, retos
- **Final:** insignia y cierre

Estado en LocalStorage: `{ userName, itineraryId, currentIndex, completed }`.

### Version 0: Proyecto definido

Objetivo: tener claridad antes de programar mas.

Entregables:

- Documento maestro.
- Requisitos internos.
- Plan y alcance.
- Guia de contenido.
- Estructura de proyecto.
- Lista inicial de fuentes.

Estado: en curso.

### Version 1: Prototipo navegable

Objetivo: poder recorrer la aventura de principio a fin desde el movil.

Entregables:

- App React funcional.
- Estaciones en datos estructurados.
- Progreso local.
- Retos basicos.
- Interfaz movil.
- Build en Vercel.

Validacion:

- Se completa sin errores.
- Se entiende el recorrido.
- Un adulto puede usarla sin instrucciones externas.

### Version 2: Contenido real

Objetivo: sustituir placeholders por contenido util para la visita.

Entregables:

- Guiones completos por estacion.
- Preguntas validadas contra plano, carteles o fuentes oficiales.
- Version corta de cada guion.
- Retos alternativos por si una zona esta llena o no disponible.
- Material fisico: pasaporte e insignias.

Validacion:

- La historia fluye sin retrocesos.
- Cada estacion tiene un motivo narrativo.
- Las preguntas son resolubles por un niño de 7 años.

### Version 3: Audio y offline

Objetivo: que la experiencia se sienta como audio-aventura real.

Entregables:

- Audios MP3 por estacion.
- Efectos suaves.
- Reproductor de audio real.
- Cache de audios y mapas.
- Prueba en modo avion.

Validacion:

- La app funciona tras cargarla previamente.
- Los audios se reproducen en movil.
- Si falla audio, queda texto visible.

### Version 4: Mapa, QR y refinamiento

Objetivo: hacer la experiencia mas magica sin hacerla fragil.

Entregables:

- Plano visual.
- Marcadores de ruta.
- QR opcionales.
- Codigos impresos.
- Modo adulto para saltar estacion.

Validacion:

- Ningun QR o permiso bloquea la aventura.
- El mapa ayuda, no distrae.

## 5. Estructura de datos

La estructura cambia de lista plana de estaciones a dos itinerarios independientes:

```js
export const itineraries = {
  oceanografic: { id, title, durationLabel, stations: [...] },
  museu: { id, title, durationLabel, stations: [...] },
};
```

Cada estación incluye:

- `id`: identificador único
- `story`: texto con marcadores `{username}` para nombre dinámico
- `audio.mode`: `'split'` (part-0, name, part-1) o `'full'` (un MP3 completo)
- `challenge`: tipo y opciones de reto
- `crystal`: nombre de la recompensa visual

### Ruta Oceanogràfic (~90 min, 10 estaciones)

1. Inicio (Zona 00 - Acceso)
2. Mediterráneo (Zonas 01-03)
3. Templados / Tropicales (Zonas 04-05)
4. Islas Continentales (Zona 06)
5. Islas Oceánicas (Zona 07)
6. Delfinario (Zona 09)
7. Antártico / Pingüinos (Zona 11)
8. Ártico / Belugas (Zona 12)
9. Cocodrilos (Zona 13)
10. Océanos / Tiburones (Zona 14)
11. Final

### Ruta Museu (~60 min, ~8 estaciones)

Definida en `datos-museu.md`:

| # | Planta | Título | Tipo reto |
|---|---|---|---|
| 00 | Baja | Inicio de misión — Calle Menor | Confirmar |
| 01 | 1ª | Los sentidos — L'Espai dels Xiquets | Confirmar |
| 02 | 1ª | El Bosque Animado — L'Espai dels Xiquets | Elegir |
| 03 | 1ª | La casa inacabada — L'Espai dels Xiquets | Confirmar |
| 04 | Baja | Magia Química — Teatro científico | Confirmar |
| 05 | 1ª | Péndulo de Foucault — Pasillo principal | Observar |
| 06 | 3ª | Metamorfosis — Expo temporal (si activo) | Confirmar |
| 07 | 3ª | El Bosque de Cromosomas | Elegir |
| 08 | 2ª | El Legado de la Ciencia — Nobel | Elegir |
| 09 | Exterior | Water Balls — Lago Hemisfèric (opcional) | Confirmar |
| 10 | Baja | Final — Cierre | Confirmar |

## 6. Criterios para elegir retos

Un reto entra en la aventura si cumple estas reglas:

- Se puede resolver observando.
- No exige leer parrafos largos.
- No depende de una unica pieza que podria no estar visible.
- Tiene alternativa si la zona esta llena.
- La respuesta no debe frustrar: mejor confirmar o elegir que escribir algo dificil.

Tipos preferidos:

- "Encuentra y confirma".
- "Elige lo que ves".
- "Cuenta hasta 3, 4 o 5".
- "Escribe una palabra grande del cartel".
- "Haz un experimento y confirma que ocurrio".

## 7. Decisiones recomendadas por ahora

| Tema | Decision recomendada | Motivo |
| --- | --- | --- |
| Plataforma | PWA React + Vite | Rapida, desplegable en Vercel, reusable |
| Progreso | LocalStorage | Suficiente para una experiencia familiar |
| Audio | MP3 reales con nombre dinámico | Texto antes/después = MP3 pregrabado; nombre = TTS runtime |
| GPS | No en MVP | En interiores puede frustrar |
| QR | No en V1 | Opcional para versión posterior |
| Mapa | Primero imagen/plano, luego interactivo | Menos riesgo inicial |
| Datos | `src/data/stations.js` | Facil de editar |
| Deploy | Vercel | Encaja con Vite y previews |

## 8. Preguntas abiertas

> Actualizado: 2026-05-13 — La mayoría de decisiones están cerradas (sección 4).

Preguntas pendientes antes de escribir guiones finales:

- ~~Nombre del niño~~ — se introduce al inicio de la app (input).
- ~~Duración~~ — Oceanogràfic ~90 min, Museu ~60 min.
- ~~Ruta~~ — Dos itinerarios separados, elegidos al inicio.
- ~~Audio~~ — MP3 reales pregrabados + TTS para nombre dinámico.
- ~~QR~~ — No en V1.

Por responder:

- ¿Fecha prevista de visita? (para validar horarios de shows y actividades)
- ¿Quieres grabar tu voz, usar ElevenLabs u otro TTS para los segmentos fijos?
- ¿Quieres imprimir pasaporte físico?
- ¿Idioma solo español o también valenciano/inglés?

## 9. Hoja de ruta completa

> Actualizado: 2026-05-13 tras revisión de experiencia infantil

Basado en la revisión de usabilidad para niño de 7 años, se prioriza reducir fricción, aumentar acción física y personalizar la aventura.

### P0 — Antes de probar con la familia (prioridad máxima)

| # | Tarea | Detalle |
|---|-------|---------|
| P0-1 | **Modos de duración en lobby** | Añadir short (45-60min, 4-5 estaciones), normal (90-120min, 8 estaciones), completo (todas). Selector en lobby junto a nombre e itinerario. |
| P0-2 | **Retos observacionales sin teclado** | Reescribir todos los retos para que sean: confirmar, elegir, contar, observar, imitar, votar en familia. Eliminar input de texto del flujo infantil. |
| P0-3 | **Eliminar placeholders** | Quitar todo texto provisional como "Luego cambiaremos esto por un dato real del cartel". Los retos deben funcionar con observación real. |
| P0-4 | **Botón "Necesito pista"** | Cada estación tiene un botón de ayuda que da una pista adicional sin penalización. |
| P0-5 | **Botón "Saltar estación"** | Si una zona está llena, cerrada o el animal no se ve, la familia puede saltar sin perder la historia. |
| P0-6 | **Modo adulto plegado** | Panel colapsable con: saltar a cualquier estación, reiniciar, cambiar modo/ruta, desbloquear final. No visible para el niño por defecto. |
| P0-7 | **Final celebrable** | Insignia con nombre del niño, botón "Foto familiar", frase final de Grace, opción de compartir. |
| P0-8 | **Museu como mini-aventura** | 3 retos protagonistas: Sentidos / Agua-Animales / Construcción-Cooperación. El Museu no debe ser "una estación más" sino un clímax de ciencia. |

### P1 — Para que sea memorable

| # | Tarea | Detalle |
|---|-------|---------|
| P1-1 | **Estructura MP3 real** | Definir carpetas `public/audio/{itinerario}/{stationId}/part-0.mp3` + `part-1.mp3`. Plan de grabación de voz Grace. |
| P1-2 | **Efectos sonoros** | Cristal desbloqueado, burbujas, hielo, laboratorio, eco misterioso (1-2 segundos cada uno). |
| P1-3 | **Pasaporte físico imprimible** | PDF con 8-10 cristales para colorear o pegar stickers. El niño "posee" la aventura fuera del móvil. |
| P1-4 | **Audios de fondo suaves** | Música ambiental por bioma (océano, hielo, ciencia) para cada estación. |

### P2 — Después del primer test real

| # | Tarea | Detalle |
|---|-------|---------|
| P2-1 | **Script de validación** | Comprobar que cada estación tiene: id, title, area, story, challenge, reward, audioSrc, modes. |
| P2-2 | **Mapa simple con puntos** | Imagen del plano con botones numerados 00-10. No necesita Leaflet. |
| P2-3 | **QR opcionales** | Modo extra: escanear QR desbloquea audio secreto. No bloquea el avance. |
| P2-4 | **Tests mínimos** | Carga sin progreso, guardado, finalización, cada tipo de reto, modo offline. |

### Próximo bloque inmediato (P0 en orden)

1. ~~Cerrar alcance MVP~~ — hecho
2. ~~Crear datos-oceanografic.md + datos-museu.md~~ — hecho
3. ~~Estructura de dos itinerarios~~ — hecho
4. ~~Lobby con nombre + selector~~ — hecho
5. **P0-1: Modos de duración en lobby** ← AHORA
6. **P0-2 + P0-3: Retos observacionales + eliminar placeholders**
7. **P0-4 + P0-5: Botones pista y saltar**
8. **P0-6: Modo adulto plegado**
9. **P0-7: Final celebrable**
10. **P0-8: Museu como mini-aventura**
11. P1-1: Estructura MP3
12. P1-3: Pasaporte físico
13. P2-1: Script de validación
14. Validar in situ zonas y horarios antes de la visita

