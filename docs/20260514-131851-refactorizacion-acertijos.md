# Refactorización: Sistema de Acertijos y Búsqueda del Tesoro

**Fecha:** 2026-05-14
**Versión:** 0.3

## 1. Objetivo

Transformar la aventura actual en una **búsqueda del tesoro narrativa** donde cada sala tiene un **Guardián** que ha roto su premio en 3 fragmentos. Resolver los 3 acertijos reconstruye el premio de la sala. Los premios de todas las salas se usan en el desafío final para revelar el Gran Tesoro.

## 2. Narrativa marco

### 2.1 Concepto general

Cada sala del acuario/museo tiene un **Guardián** (el animal o concepto principal). Cuando llegas, Bravestone explica:

> "El guardián de esta sala ha roto su pieza en 3 fragmentos para protegerla. Solo alguien que realmente observe podrá reconstruirla."

Cada acertijo resuelto revela un fragmento. Con 3 fragmentos se reconstruye el **premio de la sala**. Ese premio es una pieza necesaria para el tesoro final.

### 2.2 Premio de sala

- **Oceanogràfic:** Cada premio es una **Pieza del Mapa del Arrecife** (14 piezas total)
- **Museu:** Cada premio es una **Diapositiva de Cristal** con el guardián dibujado (8 diapositivas total)

### 2.3 Tesoro final

- **Oceanogràfic:** Un tablero con 14 huecos donde encajan las piezas del mapa. Al colocar todas, se revela el **Ojo del Océano**.
- **Museu:** Un proyector con 8 ranuras donde se insertan las diapositivas. Al proyectar todas, se forma la imagen: **Bravestone con la mano en el hombro del niño**.

## 3. Modelo de datos final

### 3.1 Riddle con guardián

```js
riddle: {
  type: 'chain' | 'steps',
  guardian: {
    name: string,    // "Kylu", "Foucault", etc.
    intro: string,   // "Kylu escondió su pieza del mapa en 3 fragmentos..."
  },
  steps: [
    {
      text: string,      // Acertijo del paso
      answer: string,    // Respuesta correcta (o '*' para abierta)
      options: string[], // 3-4 opciones
      hint: string       // Pista automática al fallar
    },
    // 3 steps
  ],
  finalSuccess: string,  // "¡Pieza del Mapa: Beluga reconstruida!"
  keyObject: {
    id: string,
    name: string,        // "Pieza del Mapa — Beluga"
    icon: string,
    description: string
  }
}
```

### 3.2 Tesoro final

```js
treasure: {
  requiredObjects: string[],   // IDs de todos los keyObject del itinerario
  type: 'map' | 'lantern',
  title: string,               // "El Mapa del Arrecife" / "La Linterna Mágica"
  message: string,             // Mensaje que se revela al completar
}
```

### 3.3 Compatibilidad

El campo `challenge` existente se conserva como fallback. Si una estación no tiene `riddle`, se usa `challenge`.

## 4. Mapa completo con guardianes

### Oceanogràfic (16 estaciones)

| ID | Nombre | Guardián | Tipo | Objeto (Pieza del Mapa) |
|:---|:-------|:---------|:----:|:------------------------|
| 00 | Acceso | — | ❌ intro | — |
| 01 | Mediterráneo | Pulpo | cadena | Pieza del Mapa — Mediterráneo |
| 02 | Humedales | Garza | cadena | Pieza del Mapa — Humedales |
| 03 | Tortugas | Tortuga Boba | cadena | Pieza del Mapa — Tortugas |
| 04 | Templados | Foca | cadena | Pieza del Mapa — Templados |
| 05 | Tropicales | Peces | escalera | Pieza del Mapa — Tropicales |
| 06 | Leones marinos | León Marino | cadena | Pieza del Mapa — Islas |
| 07 | Tortugas gigantes | Tortuga Aldabra | cadena | Pieza del Mapa — Islas Oceánicas |
| 08 | Mar Rojo | Coral Rojo | cadena | Pieza del Mapa — Arrecife |
| 09 | Delfines | Delfín Mular | cadena | Pieza del Mapa — Delfines |
| 10 | Flamencos | Flamenco | escalera | Pieza del Mapa — Flamencos |
| 11 | Pingüinos | Pingüino Juanito | cadena | Pieza del Mapa — Antártico |
| 12 | Belugas | Kylu | cadena | Pieza del Mapa — Beluga |
| 13 | Cocodrilos | Cocodrilo | cadena | Pieza del Mapa — Cocodrilo |
| 14 | Tiburones | Tiburón Toro | cadena | Pieza del Mapa — Tiburones |
| 15 | Final | — | 🗺️ Tesoro (Mapa) | — |

### Museu (10 estaciones)

| ID | Nombre | Guardián | Tipo | Objeto (Diapositiva) |
|:---|:-------|:---------|:----:|:---------------------|
| 00 | Inicio | — | ❌ intro | — |
| 01 | Ciencia en vivo | Experimento | escalera | Diapositiva: Ciencia en Vivo |
| 02 | Sentidos | Los Sentidos | cadena | Diapositiva: Los Sentidos |
| 03 | Bosque animado | Bosque | escalera | Diapositiva: Bosque Animado |
| 04 | Construcción | Equipo | cadena | Diapositiva: Construcción |
| 05 | Péndulo | Foucault | cadena | Diapositiva: Péndulo |
| 06 | ADN | El ADN | cadena | Diapositiva: ADN |
| 07 | Teatro | Teatro Científico | cadena | Diapositiva: Teatro |
| 08 | Metamorfosis | Metamorfosis | cadena | Diapositiva: Metamorfosis |
| 09 | Final | — | 🪄 Tesoro (Linterna) | — |

## 5. Interfaz de juego

### 5.1 RiddleCard con fragmentos

```
┌────────────────────────────────────────────┐
│ 🧩 Sala 12 — Belugas                       │
│                                            │
│ "Kylu escondió su pieza del mapa           │
│  en 3 fragmentos..." — Bravestone               │
│                                            │
│ [■░░]  Fragmento 1/3                       │
│                                            │
│ "Kylu es blanca como el hielo.             │
│  ¿De qué color es su piel?"                │
│                                            │
│ [Blanco]  [Gris]  [Azul]                   │
│                                            │
│ ── Pista si falla ──                       │
│ [Ayuda adulto]  (si 3 fallos)              │
└────────────────────────────────────────────┘
```

### 5.2 Inventory (premios recolectados)

Oceanogràfic — piezas de mapa con sus huecos:
```
┌──────────────────────────────────────┐
│  Mapa del Arrecife     [🐙][🪶][🐢] │
│                                        │
│   ___ ___ ___ ___ ___ ___ ___         │
│  |🐙||  ||🐢||  ||  ||  ||  |        │
│   ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾      │
│   ___ ___ ___ ___ ___ ___ ___         │
│  |  ||  ||  ||  ||  ||  ||  |        │
│   ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾ ‾‾‾      │
└──────────────────────────────────────┘
```

Museu — diapositivas:
```
┌──────────────────────────────────────┐
│  Linterna Mágica      [⚗️][👁️][🎨] │
│                                        │
│  📽️ [1][2][3][4][5][6][7][8]         │
└──────────────────────────────────────┘
```

### 5.3 Pantalla de tesoro final

**Oceanogràfic — El Mapa del Arrecife:**
```
┌────────────────────────────────────────┐
│       🌊 EL MAPA DEL ARRECIFE          │
│                                        │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│  │🐙│ │  │ │  │ │  │ │  │ │  │ │  │ │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│  │  │ │  │ │  │ │  │ │  │ │  │ │  │ │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ │
│                                        │
│  Coloca cada pieza en su lugar         │
│                                        │
│  [🐙] [🪶] [🐢] ...14 disponibles     │
└────────────────────────────────────────┘

→ Al completar: animación + "¡Has revelado el Ojo del Océano!"
```

**Museu — La Linterna Mágica:**
```
┌────────────────────────────────────────┐
│       🔦 LA LINTERNA MÁGICA            │
│                                        │
│  ┌──────────────────────────────┐      │
│  │         PANTALLA             │      │
│  │                              │      │
│  └──────────────────────────────┘      │
│                                        │
│  [1][2][3][4][5][6][7][8]  ← ranuras   │
│                                        │
│  Inserta tus diapositivas:             │
│  [⚗️] [👁️] [🎨] [⚙️] [🪢] [🧬] [🎭] [🦋] │
└────────────────────────────────────────┘

→ Al completar: animación + "Has visto la luz de la ciencia"
```

## 6. Flujo de juego completo

```
LOBBY → ADVENTURE → TREASURE → FINAL

CADA SALA:
  1. Bravestone: historia de la sala (story actual)
  2. Bravestone: "El guardián [nombre] ha roto su premio en 3 fragmentos"
  3. Aparece RiddleCard con fragmento 1/3 activo
  4. Niño responde → fragmento se ilumina [■░░] → 2/3 disponible
  5. Fragmento 2 → [■■░] → 3/3 disponible  
  6. Fragmento 3 → [■■■] → ¡Premio reconstruido!
  7. Animación: pieza se añade al inventario

TESORO (estación final):
  1. Bravestone: "Tienes todas las piezas. Es hora del gran tesoro."
  2. Si Oceanogràfic → Mapa con 14 huecos + piezas para arrastrar
  3. Si Museu → Linterna con 8 ranuras + diapositivas para insertar
  4. Al completar → animación + insignia + mensaje secreto

FINAL:
  - Pantalla actual + premios mostrados + tesoro revelado
```

## 7. Implementación por fases

### Fase 1: Fundación (datos) — COMPLETADA
- [x] Añadir campos `riddle` y `keyObject` a `oceanografic.js`
- [x] Añadir campos `riddle` y `keyObject` a `museu.js` + crear estación 09
- [x] Añadir `minMode` a todas las estaciones v2
- [x] Refactorizar `stations.js` para importar de v2
- [x] Actualizar `scripts/validate-stations.js`
- [x] Actualizar tests en `src/__tests__/stations.test.js`

### Fase 1b: Narrativa (datos) — AHORA
- [ ] Añadir `guardian` a todos los riddles
- [ ] Ajustar textos narrativos (finalSuccess, keyObject.name)
- [ ] Actualizar `treasure` con `type`, `title`, `message`
- [ ] Actualizar tests

### Fase 2: Lógica (App.jsx)
- [ ] Añadir estado `riddleProgress` (fragmento actual por estación)
- [ ] Añadir estado `riddleFails` (contador de fallos)
- [ ] Crear `handleRiddleAnswer`, `handleAdultHelp`
- [ ] Mostrar animación de fragmento reconstruido
- [ ] Modificar flujo para detectar `isTreasure` con `treasure.type`

### Fase 3: UI
- [ ] RiddleCard con indicador de fragmentos [■░░]
- [ ] Inventory con vista de mapa/linterna según itinerario
- [ ] TreasureScreen con drag & drop (mapa / linterna)
- [ ] AnimationReward con fragmento que se completa

## 8. Reglas de juego

- **Pasos:** 3 por acertijo
- **Bloqueo:** fallar bloquea el paso actual, no se avanza
- **Pista:** automática al fallar
- **Reintentos:** infinitos
- **Ayuda adulto:** tras 3 fallos en un mismo paso
- **Visibilidad:** 3 fragmentos visibles, activo resaltado, resto bloqueados
- **Persistencia:** cada paso resuelto se guarda en localStorage

## 9. Historial de cambios

| Fecha | Versión | Cambio |
|-------|:-------:|:-------|
| 2026-05-14 | 0.1 | Versión inicial |
| 2026-05-14 | 0.2 | Modelo cadena/escalera 80/20, 3 pasos |
| 2026-05-14 | 0.3 | Narrativa de guardianes, fragmentos, mapa del arrecife, linterna mágica |
