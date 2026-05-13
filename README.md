# La Aventura de Exploradora Grace Stone

Audio-aventura móvil para una visita familiar a la Ciutat de les Arts i les Ciències de Valencia.

El proyecto está preparado como una app web React + Vite, desplegable en Vercel. La primera versión funciona como base offline-first: progreso local, estaciones narrativas, retos simples, lectura por voz con Web Speech API y estructura preparada para añadir audios reales, mapas y QR.

## Estructura

```txt
docs/
  DOCUMENTO-MAESTRO.md    Visión, features, fases, arquitectura y fuentes.
  PLAN-ALCANCE-Y-EJECUCION.md
                          Alcance MVP, fases, decisiones cerradas y forma de trabajo.
  REQUISITOS-INTERNOS.md   Requisitos, alcance, ruta y decisiones del proyecto.
  GUIA-CONTENIDO.md        Guía para escribir guiones, pistas y audios.
  datos-oceanografic.md   Investigación verificada de cada zona del Oceanogràfic con
                          todo list de animales, datos útiles y preguntas para validar in situ.
  datos-museu.md          Investigación verificada de cada zona del Museu con todo list
                          de estaciones, actividades y preguntas para validar in situ.
public/
  audio/                   Audios finales por estación.
  maps/                    Planos del Oceanogràfic, Museo y Ciutat.
  manifest.webmanifest     Configuración PWA.
  sw.js                    Service worker básico.
src/
  data/stations.js         Datos editables de la aventura (estructura de dos itinerarios).
  App.jsx                  Interfaz principal.
  main.jsx                 Entrada React.
  styles.css               Estilos responsive.
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy en Vercel

Vercel detecta Vite automáticamente. También se incluye `vercel.json` con:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- `framework`: `vite`

## Siguiente contenido a completar

1. Nombre del niño para personalizar guiones.
2. Descargar y guardar planos oficiales en `public/maps/`.
3. Validar preguntas exactas in situ o con fuentes oficiales recientes.
4. Grabar o generar audios y colocarlos en `public/audio/`.
5. Sustituir retos provisionales por respuestas reales de carteles/exposiciones.
6. Crear `src/data/stations.js` con estructura de dos itinerarios (Oceanogràfic + Museu).
7. Implementar lobby con input de nombre + selector de itinerario.
8. Implementar motor de audio secuencial (MP3 pregrabados + TTS para nombre).

El punto de entrada documental del proyecto es `docs/DOCUMENTO-MAESTRO.md`.
