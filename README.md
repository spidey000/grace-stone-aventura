# La Aventura de Exploradora Grace Stone

Audio-aventura móvil para una visita familiar al Oceanogràfic y al Museu de les Ciències de Valencia.

**Stack:** React + Vite + PWA.  
**Despliegue:** Vercel.  
**Estado:** MVP funcional con dos itinerarios, modos de duración y personalización por nombre.

---

## Filosofía

- El niño es el **protagonista**. Grace Stone guía la visita por auriculares.
- **Offline-first:** todo lo importante debe cargarse antes de entrar.
- **Pocos pasos:** cada estación se resuelve en 1-2 interacciones.
- **Sin castigo por error:** Grace siempre invita a observar otra vez.
- **El móvil aparece poco:** escuchar, guardar, mirar, hacer algo con la familia, tocar un botón.
- **El adulto es copiloto:** modo adulto plegado para saltar, ver pistas o reiniciar.

---

## Funcionalidades implementadas

| Feature | Estado |
|---------|--------|
| Dos itinerarios independientes (Oceanogràfic + Museu) | ✅ |
| Lobby con nombre del niño | ✅ |
| Selector de modo: Corta / Normal / Completa | ✅ |
| Retos observacionales sin teclado (confirmar y elegir) | ✅ |
| Botón "Necesito pista" por estación | ✅ |
| Botón "Saltar estación" (zona llena/cerrada) | ✅ |
| Backup challenge por si la zona no está disponible | ✅ |
| Modo adulto plegado en el pie | ✅ |
| Cristales visuales por estación | ✅ |
| Progreso guardado en LocalStorage | ✅ |
| Narración por voz (Web Speech API) | ✅ |
| Pantalla final con insignia personalizada | ✅ |
| Botón imprimir insignia | ✅ |
| Diseño responsive móvil | ✅ |

---

## Modos de duración

| Modo | Oceanogràfic | Museu |
|------|------|-------|
| **Corta** ⚡ ~45-60 min | Inicio + Tropicales + Pingüinos + Tiburones + Final | Inicio + Sentidos + Bosque + Construir + Final |
| **Normal** 🌟 ~90-120 min | Añade Mediterráneo + Islas + Delfines + Belugas + Final | Añade Magia + Péndulo + Cromosomas + Final |
| **Completa** 🏆 | Todas las estaciones | Todas las estaciones |

---

## Experiencia de usuario

1. **Lobby:** "Hola, explorador. ¿Cómo te llamas?" → Elige destino y duración.
2. **Cada estación:** Grace narra → Aparece una acción física ("Busca un animal con rayas") → El niño observa con la familia → Toca confirmar o elegir.
3. **Pista:** Si no sabe, toca "Necesito pista".
4. **Saltar:** Si la zona está llena, toca "Saltar". La historia sigue.
5. **Progreso:** Cristales se iluminan al completar.
6. **Adulto:** Menú plegado en el pie con opciones de control.
7. **Final:** Insignia con nombre, mensaje de Grace, botón imprimir.

---

## Estructura

```txt
docs/
  DOCUMENTO-MAESTRO.md         Visión, features, fases, arquitectura y fuentes.
  PLAN-ALCANCE-Y-EJECUCION.md  Alcance MVP, decisiones cerradas, hoja de ruta con P0/P1/P2.
  REQUISITOS-INTERNOS.md       Requisitos, alcance, ruta y decisiones del proyecto.
  GUIA-CONTENIDO.md            Guía para escribir guiones, pistas y audios.
  datos-oceanografic.md        Investigación verificada por zona del Oceanogràfic.
  datos-museu.md               Investigación verificada por zona del Museu.
public/
  audio/                       Audios finales por estación (pendiente de grabar).
  maps/                        Planos del Oceanogràfic, Museo y Ciutat.
  manifest.webmanifest         Configuración PWA.
  sw.js                        Service worker básico.
src/
  data/stations.js             Datos con estructura de dos itinerarios, modos, pistas, backups.
  App.jsx                      Lobby, Adventure y FinalScreen con todas las features.
  main.jsx                     Entrada React.
  styles.css                   Estilos responsive con lobby, adulto, pistas.
```

---

## Desarrollo local

```bash
npm install
npm run dev       # ver en http://localhost:5173
npm run build     # build producción en dist/
npm run preview   # vista previa del build
```

## Deploy en Vercel

Vercel detecta Vite automáticamente:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- `framework`: `vite`

---

## Próximos pasos (hoja de ruta completa en PLAN-ALCANCE-Y-EJECUCION.md)

### P1 — Para que sea memorable
- Grabar audios MP3 reales de Grace por estación
- Efectos sonoros (cristal, burbujas, hielo, laboratorio)
- Pasaporte físico imprimible con cristales para colorear

### P2 — Después del primer test real
- Script de validación de datos de estaciones
- Mapa simple con puntos numerados en imagen del plano
- Tests mínimos de flujo completo
- Tests mínimos de flujo completo

El punto de entrada documental del proyecto es `docs/DOCUMENTO-MAESTRO.md`.