# Requisitos internos

## Proyecto

**Nombre:** La Aventura de Dr. Smolder Bravestone en la Ciutat de les Arts i les Ciències

**Tipo:** experiencia inmersiva de audio-aventura guiada por móvil, con mecánicas ligeras de escape room, búsqueda del tesoro y progreso por estaciones.

**Público principal:** niño de 7 años acompañado por un adulto.

**Objetivo emocional:** que el niño se sienta protagonista de una misión científica real, no solo visitante. El Dr. Smolder Bravestone debe hablarle como a un compañero de confianza, celebrar logros y mantener el ritmo de aventura.

## Concepto narrativo

El Dr. Smolder Bravestone es un legendario arqueólogo-explorador que ha viajado por todo el mundo descubriendo secretos ocultos. Ahora ha detectado un eco-misterio que amenaza el equilibrio de los océanos y la ciencia. Para resolverlo necesita que el niño recupere los Cristales del Saber, también llamados Fragmentos del Océano Sabio.

Cada cristal desbloquea un capítulo de la historia. Al final, Bravestone y el niño resuelven el misterio, salvan el equilibrio del planeta y Bravestone le nombra Explorador Honorífico.

## Tono y edad

- Lenguaje sencillo, cálido y aventurero.
- Frases cortas y directas.
- Preguntas simples, con espacio para observar.
- Felicitaciones frecuentes.
- Tensión narrativa suave, nunca miedo intenso.
- Ritmo de capítulos cortos: 1-2 minutos de narración por estación.
- Duración total objetivo: 60-90 minutos, ajustable.

## Recorrido geográfico

El recorrido debe evitar retrocesos. La ruta base sigue un flujo norte-sur o natural del complejo.

### Zona 00: Inicio / Entrada Ciutat u Oceanogràfic

- Bienvenida de Bravestone.
- Explicación de la misión.
- Primer enigma muy sencillo.
- Referencia posible: tiburón martillo o tortugas.

### Oceanogràfic

Ruta circular basada en el plano oficial y sus zonas numeradas:

1. Mediterráneo / Humedales: zonas 01-03.
2. Templados / Tropicales: zonas 04-05.
3. Islas: zonas 06-07.
4. Delfinario: zona 09.
5. Antártico / Pingüinos: zona 11.
6. Ártico / Belugas: zona 12.
7. Cocodrilos: zona 13.
8. Océanos / Tiburones: zona 14.
9. Final parcial en zona infantil o salida.

### Transición al Museo de las Ciencias

Bravestone acompaña el cambio de escenario: del mundo oceánico al laboratorio gigante de la ciencia.

### Museo de las Ciencias

Flujo sugerido por plantas:

1. Planta baja / Espai dels Xiquets.
2. Primera planta: Metamorphosis o Teatro de la Ciencia.
3. Otras exposiciones disponibles: cuerpo humano, robótica, genética, física u otras vigentes.

Las exposiciones pueden cambiar. Antes de la visita hay que validar el plano y las exposiciones activas en fuentes oficiales.

## Mecánica de juego

La app debe funcionar como PWA o web móvil. Debe poder abrirse en Android e iOS desde navegador y conservar progreso local.

### Progreso

- Estaciones secuenciales.
- Sin backtracking obligatorio.
- Checklist visual de cristales.
- Guardado automático en LocalStorage.
- Botón de reiniciar misión para pruebas.

### Triggers permitidos

La primera versión debe soportar confirmación manual. El diseño debe permitir añadir después:

- Códigos numéricos o palabras vistas en carteles.
- Botón "Estoy aquí".
- Foto opcional como gesto de enviar prueba a Bravestone.
- Geofencing ligero solo si no introduce frustración en interiores.

### Retos

Los retos deben ser simples y observacionales:

- Contar.
- Elegir color o forma.
- Responder una palabra visible.
- Confirmar que se ha hecho un experimento.
- Elegir una opción múltiple.

Ejemplos:

- Belugas, zona 12: escuchar el canto, buscar un cartel y responder un dato.
- Pingüinos, zona 11: contar o identificar colores.
- Espai dels Xiquets: hacer un experimento de agua y elegir qué ha ocurrido.
- Final: combinar datos de varios cristales para resolver un código simple.

## Requisitos técnicos

### Stack elegido para este repositorio

- React.
- Vite.
- JavaScript.
- CSS propio.
- Deploy web en Vercel.
- Service worker básico.
- Manifest PWA.
- LocalStorage para estado.
- Web Speech API como voz provisional.

### Preparado para futuro

- Reproducción de audios grabados o generados.
- Howler.js si se necesita mezcla avanzada de audio y efectos.
- Firebase solo si hace falta sincronización entre dispositivos.
- Multilingüe español/inglés si se amplía.

## Datos de contenido

La app usa un archivo editable de estaciones:

```js
{
  id: "12",
  title: "El Canto Ártico",
  location: "Oceanogràfic - Ártico / Belugas",
  crystal: "Cristal Ártico",
  story: "...",
  challenge: {
    type: "text",
    prompt: "...",
    acceptedAnswers: ["beluga"]
  }
}
```

## Materiales físicos

- Pasaporte de Explorador con casillas para sellos o pegatinas.
- Cristales impresos o pegatinas.
- Auriculares cómodos.
- Batería externa.

## Fuentes y recursos a consultar

Estos enlaces se usarán como base visual y de validación, pero deben revisarse antes de la visita:

- Oceanogràfic: https://www.oceanografic.org/
- Plano del Oceanogràfic: https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/
- PDF del Oceanogràfic indicado en la especificación inicial.
- Animales del Oceanogràfic: https://www.oceanografic.org/animales/
- Hábitats del Oceanogràfic: https://www.oceanografic.org/habitats/
- Ciutat de les Arts i les Ciències: https://cac.es/
- Museo de las Ciencias: https://cac.es/es/museu-de-les-ciencies/
- Exposiciones: https://cac.es/en/exposiciones/
- Planos del Museo y de la Ciutat: https://cac.es/en/planos-la-ciutat/

## Alcance MVP

El primer MVP debe incluir:

- Proyecto web desplegable en Vercel.
- Pantalla principal usable en móvil.
- Lista de 8-10 estaciones.
- Narración de Bravestone por estación.
- Botón de lectura en voz alta.
- Reto por estación.
- Desbloqueo de cristales.
- Guardado local.
- Documento interno de requisitos.
- Carpetas para audios y mapas.

## Pendientes de validación

- Nombre del niño.
- Fecha exacta de visita.
- Horarios reales y shows disponibles.
- Exposiciones activas del Museo en la fecha de visita.
- Preguntas basadas en carteles reales.
- Idiomas finales.

