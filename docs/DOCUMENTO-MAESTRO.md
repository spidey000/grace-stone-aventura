# Documento maestro del proyecto

**Proyecto:** La Aventura de Exploradora Grace Stone en la Ciutat de les Arts i les Ciències  
**Ubicación del repositorio:** `/home/gg0099/proyectos/familia/grace-stone-aventura`  
**Fecha de esta versión:** 2026-05-13  
**Estado:** base inicial de producto, contenido y arquitectura.

## 1. Visión

Crear una experiencia móvil inmersiva para una visita familiar al Oceanogràfic y al Museu de les Ciències de Valencia. El niño se convierte en ayudante de Grace Stone, una exploradora científica que le guía por auriculares con una narración continua, retos sencillos y una colección de cristales.

La app no debe sentirse como un formulario ni como una lista fría de tareas. Debe sentirse como una misión narrada: Grace acompaña, observa, anima, desbloquea capítulos y transforma el paseo en una aventura de ciencia, océano y descubrimiento.

## 2. Objetivos

### Objetivo principal

Construir una PWA sencilla, fiable y desplegable en Vercel que permita ejecutar la aventura durante la visita, incluso con conectividad limitada.

### Objetivos de experiencia

- Convertir al niño en protagonista de la visita.
- Mantener un recorrido geográfico lógico, sin retrocesos obligatorios.
- Reducir fricción: botones grandes, confirmación manual, texto breve y audios cortos.
- Favorecer la observación real de animales, hábitats y experimentos.
- Evitar dependencia de GPS preciso en interiores.
- Permitir que el adulto acompañe sin tener que dirigir constantemente.

### Objetivos técnicos

- App web instalable o accesible desde navegador móvil.
- Estado guardado localmente.
- Contenido editable mediante datos estructurados.
- Preparada para audio real y futuras mejoras.
- Deploy simple en Vercel con build estático.

## 3. Audiencia

### Usuario principal

Niño de 7 años. Necesita instrucciones claras, interacción rápida, recompensa visual y tono narrativo protector.

### Usuario secundario

Adulto acompañante. Necesita controlar ritmo, reiniciar misión, ajustar estaciones y poder resolver problemas sin interrumpir la visita.

### Contexto de uso

- Móvil en mano.
- Auriculares.
- Exterior e interior.
- Posibles zonas con ruido, gente y poca cobertura.
- Uso intermitente: escuchar, guardar móvil, observar, volver a abrir.

## 4. Principios de diseño

- **La historia manda:** cada feature debe reforzar la misión de Grace.
- **Offline primero:** todo lo importante debe estar cargado antes de entrar.
- **Pocos pasos:** cada estación debe resolverse en 1 o 2 interacciones.
- **Sin castigo por error:** si falla una respuesta, Grace invita a observar otra vez.
- **Adulto como copiloto:** no se oculta la interfaz de control, pero no debe dominar la experiencia.
- **Contenido reemplazable:** preguntas provisionales se sustituyen por datos reales tras validar carteles o planos.

## 5. Producto MVP

El MVP debe permitir hacer la aventura completa con confirmaciones manuales y retos sencillos, sin depender de GPS ni cámara.

### Features MVP

1. **Ruta por estaciones**
   - Lista ordenada de estaciones.
   - Estación activa visible.
   - Navegación manual entre estaciones para el adulto.
   - Ruta basada en Oceanogràfic y Museu.

2. **Narración de Grace**
   - Texto narrativo por estación.
   - Botón para escuchar mediante Web Speech API.
   - Preparado para sustituir por audios MP3.

3. **Retos por estación**
   - Tipos iniciales: confirmar, opción múltiple, texto.
   - Mensajes de éxito.
   - Mensajes suaves de reintento.

4. **Cristales de progreso**
   - Cristal desbloqueado por estación.
   - Barra de progreso.
   - Cierre final con insignia.

5. **Persistencia local**
   - Guardado en LocalStorage.
   - Recuperación si se cierra el navegador.
   - Botón de reiniciar misión.

6. **PWA básica**
   - Manifest.
   - Service worker.
   - Cache inicial de shell.
   - Preparada para mejorar cache de audios y mapas.

7. **Deploy web**
   - React + Vite.
   - Build estático.
   - Configuración para Vercel.

## 6. Features futuras

### Audio avanzado

- Audios MP3 por estación.
- Efectos: olas, hielo, delfines, laboratorio, éxito.
- Control de volumen.
- Reanudar audio donde se quedó.
- Posible uso de Howler.js si hace falta control fino de reproducción.

### Personalización

- Nombre del niño.
- Nivel de dificultad.
- Duración corta, normal o extendida.
- Idiomas: español primero; inglés después si se necesita.

### Cámara

- Foto opcional como "enviar prueba a Grace".
- Debe ser opcional para evitar permisos y fricción.
- No guardar fotos remotamente en MVP.

### Geolocalización ligera

- Solo para exteriores y transición entre edificios.
- En interiores debe priorizarse botón "Estoy aquí".
- Nunca bloquear avance por mala señal.

### Panel de edición

- Editor simple de estaciones.
- Exportar/importar JSON.
- Validación de que todas las estaciones tienen título, historia, reto y cristal.

## 7. Ruta narrativa propuesta

### 00. Inicio

Grace detecta el eco-misterio y activa la misión. El niño recibe el primer cristal al confirmar que está listo.

### 01. Mediterráneo / Humedales

Observación cercana: tortugas, aves, posidonia o fauna mediterránea. Tema: lo cercano también importa.

### 02. Templados / Tropicales

Reto de colores o formas. Tema: biodiversidad, temperatura y fragilidad de los ecosistemas.

### 03. Islas

Reto de identificar un animal. Tema: adaptación en lugares aislados.

### 04. Delfinario

Reto de observar comunicación o movimiento. Tema: cooperación y señales.

### 05. Antártico / Pingüinos

Reto de colores, conteo u observación. Tema: hielo, clima y adaptación.

### 06. Ártico / Belugas

Reto sobre belugas. Tema: sonido, hielo y comunicación.

### 07. Cocodrilos

Reto sobre escamas/protección. Tema: animales antiguos y adaptación.

### 08. Océanos / Tiburones

Reto de ver tiburones. Tema: depredadores como guardianes del equilibrio.

### 09. Museu de les Ciències

Reto de experimento interactivo. Tema: las manos también hacen ciencia.

### 10. Final

Grace reúne los cristales, explica que océano, animales y ciencia están conectados, y nombra al niño Explorador Honorífico.

## 8. Arquitectura

### Stack actual

- React para UI.
- Vite para desarrollo y build.
- JavaScript.
- CSS propio.
- LocalStorage para progreso.
- Web Speech API como voz provisional.
- Service worker y manifest para PWA.
- Vercel como destino de deploy.

### Estructura de carpetas

```txt
docs/
  DOCUMENTO-MAESTRO.md
  REQUISITOS-INTERNOS.md
  GUIA-CONTENIDO.md
public/
  audio/
  maps/
  manifest.webmanifest
  sw.js
src/
  data/stations.js
  App.jsx
  main.jsx
  styles.css
```

### Datos

Las estaciones viven en `src/data/stations.js`. Esa decisión permite cambiar contenido sin reescribir la lógica.

Campos clave:

- `id`: orden y referencia.
- `shortName`: nombre breve en la ruta.
- `title`: título narrativo.
- `area`: ubicación.
- `routeHint`: instrucción geográfica.
- `crystal`: recompensa.
- `duration`: duración orientativa.
- `story`: texto de Grace.
- `challenge`: tipo de reto y respuesta.

## 9. Cómo hacerlo

### Fase 1: Base técnica

Ya iniciada.

1. Crear proyecto React + Vite.
2. Añadir PWA básica.
3. Crear datos iniciales de estaciones.
4. Guardar progreso local.
5. Preparar deploy en Vercel.

### Fase 2: Contenido real

1. Descargar planos oficiales y guardarlos en `public/maps/`.
2. Revisar estaciones con plano del Oceanogràfic.
3. Revisar exposiciones activas del Museu en la fecha de visita.
4. Crear preguntas exactas a partir de carteles reales o fuentes oficiales.
5. Escribir guiones completos de 1-2 minutos por estación.
6. Añadir versión corta de cada guion por si hay prisa.

### Fase 3: Audio

1. Grabar voz propia o generar TTS.
2. Exportar MP3 por estación.
3. Guardar audios en `public/audio/`.
4. Cambiar la app para preferir audio real y usar Web Speech API solo como fallback.
5. Añadir efectos de sonido con volumen bajo.

### Fase 4: Ensayo

1. Probar en móvil real.
2. Probar en modo avión tras abrir la app.
3. Probar con auriculares.
4. Revisar legibilidad al sol.
5. Hacer una ruta simulada en casa.
6. Preparar pasaporte físico.

## 10. Deploy en Vercel

Flujo recomendado:

1. Subir el repositorio a GitHub, GitLab o Bitbucket.
2. Importar el proyecto en Vercel.
3. Vercel detectará Vite.
4. Confirmar:
   - Build command: `npm run build`.
   - Output directory: `dist`.
5. Cada push generará preview.
6. Producción se actualiza desde la rama principal.

También se puede usar Vercel CLI desde la carpeta del proyecto.

## 11. Riesgos y mitigaciones

### Cambios en exposiciones o animales visibles

Mitigación: evitar preguntas que dependan de un único cartel salvo que se validen el día de la visita. Tener retos de confirmación alternativos.

### Mala cobertura

Mitigación: cachear app, audios y mapas antes de entrar. Usar progreso local.

### Audio no reproducible

Mitigación: mantener texto visible y Web Speech API como fallback mientras no haya audio real.

### Cansancio del niño

Mitigación: capítulos cortos, ruta sin retrocesos, posibilidad de saltar estaciones y final flexible.

### GPS impreciso

Mitigación: no usar GPS como bloqueo de progreso en interiores.

### Saturación visual

Mitigación: UI móvil con botones grandes, estaciones claras y pocas decisiones por pantalla.

## 12. Criterios de aceptación

El MVP estará listo cuando:

- La app compila con `npm run build`.
- Se puede abrir en móvil.
- Se puede completar la misión de principio a fin.
- El progreso persiste tras cerrar y abrir.
- Las estaciones están en orden lógico.
- El contenido puede editarse desde `src/data/stations.js`.
- Existen carpetas para audios y mapas.
- La documentación explica qué hacer después.

## 13. Fuentes de información

Fuentes revisadas o identificadas el 2026-05-13. Las fuentes oficiales deben comprobarse de nuevo antes de la visita, porque horarios, tarifas, exposiciones y disponibilidad pueden cambiar.

### Oceanogràfic: fuentes oficiales principales

- Web oficial: https://www.oceanografic.org/
- Plano del acuario: https://www.oceanografic.org/planifica-tu-visita/plano-del-acuario/
- PDF del plano: https://www.oceanografic.org/wp-content/uploads/2023/11/plano_ES-ENG-ITA.pdf
- Animales / especies: https://www.oceanografic.org/animales/
- Hábitats: https://www.oceanografic.org/habitats/
- Tarifas y horarios: https://www.oceanografic.org/planifica-tu-visita/tarifas-y-horarios/
- Entradas: https://entradas.oceanografic.org/
- Preguntas frecuentes: https://www.oceanografic.org/planifica-tu-visita/preguntas-frecuentes/
- Cómo llegar y parking: https://www.oceanografic.org/planifica-tu-visita/como-llegar-y-parking/
- Experiencias: https://www.oceanografic.org/planifica-tu-visita/experiencias-en-el-oceanografic/
- Fundación Oceanogràfic: https://fundacionoceanografic.org/

### Oceanogràfic: hábitats de la ruta

- Mediterráneo: https://www.oceanografic.org/habitat/mediterraneo/
- Humedales / Aviario: https://www.oceanografic.org/habitat/humedales/
- Templados y Tropicales: https://www.oceanografic.org/habitat/templados-y-tropicales/
- Islas: https://www.oceanografic.org/habitat/islas/
- Delfinario: https://www.oceanografic.org/delfinario/
- Ágora del Mar: https://www.oceanografic.org/habitat/agora-del-mar/
- Antártico: https://www.oceanografic.org/habitat/antartico/
- Ártico: https://www.oceanografic.org/habitat/artico/
- Cocodrilario: https://www.oceanografic.org/habitat/cocodrilario/
- Océanos: https://www.oceanografic.org/habitat/oceanos/

### Oceanogràfic: especies útiles para retos

- Belugas: https://www.oceanografic.org/especie/belugas/
- Kylu, cría de beluga: https://www.oceanografic.org/especie/kylu-la-cria-de-beluga/
- Plombir y Miranda: https://www.oceanografic.org/especie/plombir-y-miranda-las-dos-belugas-rescatadas-de-ucrania/
- Delfín mular: https://www.oceanografic.org/especie/delfin-mular/
- Pingüino Juanito: https://www.oceanografic.org/especie/pinguino-juanito/
- Pingüino Rey: https://www.oceanografic.org/especie/pinguino-rey/
- Tiburón martillo cabeza de pala: https://www.oceanografic.org/especie/tiburon-martillo-cabeza-de-pala/
- Tiburón toro: https://www.oceanografic.org/especie/tiburon-toro/
- Tiburón cebra: https://www.oceanografic.org/especie/tiburon-cebra/
- Tortuga boba: https://www.oceanografic.org/especie/tortuga-boba/
- Tortuga mediterránea: https://www.oceanografic.org/especie/tortuga-mediterranea/
- Tortugas de Aldabra: https://www.oceanografic.org/especie/tortugas-de-aldabra/
- Cocodrilo hociquifino africano: https://www.oceanografic.org/especie/cocodrilo-hociquifino-africano/
- Posidonia: https://www.oceanografic.org/especie/posidonia/
- Pulpo de roca: https://www.oceanografic.org/especie/pulpo-de-roca/

### Ciutat de les Arts i les Ciències y Museu: fuentes oficiales

- Web oficial CAC: https://cac.es/
- Museu de les Ciències: https://cac.es/museu-de-les-ciencies/
- Museu de les Ciències en inglés: https://cac.es/en/museu-de-les-ciencies/
- Exposiciones: https://cac.es/exposiciones/
- Exposiciones en inglés: https://cac.es/en/exposiciones/
- Planos de la Ciutat: https://cac.es/planos-la-ciutat/
- Planos del Museu: https://cac.es/planos-la-ciutat/planos-museo/
- Planos del Museu en inglés: https://cac.es/en/planos-la-ciutat/planos-museo/
- Tarifas y horarios CAC: https://cac.es/horarios/
- Entradas oficiales CAC: https://tickets.cac.es/internetCAC/home.do

### Museu: exposiciones y espacios útiles para retos

- L'Espai dels Xiquets: https://cac.es/exposiciones/lespai-dels-xiquets/
- L'Espai dels Xiquets en inglés: https://cac.es/en/exposiciones/lespai-dels-xiquets/
- Exposiciones para primaria: https://cac.es/en/web/educacion/exposiciones-primaria/
- Metamorfosis / Metamorphosis: consultar desde https://cac.es/exposiciones/ y validar vigencia.
- Teatro de la Ciencia: consultar desde https://cac.es/exposiciones/ y validar sesiones.
- Talleres de La Ciencia a Escena: consultar desde https://cac.es/museu-de-les-ciencies/ y validar disponibilidad.

### Documentación técnica oficial

- React: https://react.dev/
- React `createRoot`: https://react.dev/reference/react-dom/client/createRoot
- React `useState`: https://react.dev/reference/react/useState
- React `useEffect`: https://react.dev/reference/react/useEffect
- Vite: https://vite.dev/
- Vite build de producción: https://vite.dev/guide/build
- Vite deploy estático: https://vite.dev/guide/static-deploy
- Vercel con Vite: https://vercel.com/docs/frameworks/frontend/vite
- Vercel deployments: https://vercel.com/docs/deployments/deployment-methods
- Vercel CLI deploy: https://vercel.com/docs/cli/deploy
- MDN PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- MDN Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
- MDN Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- MDN PWA caching: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
- MDN LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- MDN Geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- MDN MediaDevices / cámara: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

### Librerías candidatas para fases futuras

- Howler.js, audio web avanzado: https://howlerjs.com/

### Herramientas no-code o low-code de referencia

- Actionbound: https://en.actionbound.com/
- Actionbound features: https://en.actionbound.com/features
- Locatify: https://locatify.com/
- VoiceMap: https://voicemap.me/
- Tourient: https://tourient.app/

### Producción de audio y recursos

- Audacity: https://www.audacityteam.org/
- ElevenLabs: https://elevenlabs.io/
- Google Cloud Text-to-Speech: https://cloud.google.com/text-to-speech
- Freesound, efectos con licencias a revisar: https://freesound.org/
- Pixabay Sound Effects, revisar licencia antes de uso final: https://pixabay.com/sound-effects/

## 14. Notas de verificación de fuentes

- El plano oficial del Oceanogràfic enumera las zonas clave de la ruta: entrada, Mediterráneo, Humedales, Templados/Tropicales, Islas, Delfinario, Antártico, Ártico, Cocodrilos y Océanos.
- La página oficial de hábitats confirma el conjunto de hábitats usados como base narrativa.
- La página oficial de animales permite extraer especies concretas para retos.
- La página oficial del Museu confirma su enfoque de ciencia interactiva, exposiciones, talleres y planos por plantas.
- L'Espai dels Xiquets está descrito oficialmente como espacio infantil con sentidos, agua, animales y cooperación; su disponibilidad puede variar y debe confirmarse el día de visita.
- La documentación técnica de MDN confirma el uso de manifest, service worker, cache, localStorage y Web Speech API como base razonable para una PWA móvil.
- La documentación de Vite y Vercel confirma que el build estático con salida `dist` es el camino de deploy previsto.

