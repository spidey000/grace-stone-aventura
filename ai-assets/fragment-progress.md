# Fragment Progress — Indicador de progreso del acertijo

## Uso en la app
Se muestra en el `step-header` de cada paso del riddle. Indica visualmente cuántos fragmentos del premio se han recuperado.

## Diseño visual formato texto (inline en HTML)

```
Fragmento 1/3    →    Fragmento 2/3    →    Fragmento 3/3
   [■░░]                [■■░]                [■■■] 🎁
```

## Formato visual en la UI

Cada paso tiene un `step-header` con:

```
[icono] Fragmento {n}/3
```

Donde icono es:
- Paso activo = 🧩
- Paso completado = ✅  
- Paso bloqueado = 🔒

## Barra de progreso horizontal (para el inventory global)

```
Objetos recolectados:
[🐙] [🪶] [🐢] [○] [○] [○] [○] [○] [○] [○] [○] [○] [○] [○]
  ^     ^     ^    ^ missing
  collected
```

## Especificaciones

- **Layout de 3 pasos:** display flex column, gap 12px
- **Cada paso:** ocupa todo el ancho, con indicador individual
- **Colors:** 
  - Fragmento activo: `color: var(--station-color)`
  - Fragmento completado: `color: #86efac`
  - Fragmento bloqueado: `color: #d1d5db`
- **Tipografía:** 0.85rem, font-weight 600, uppercase opcional
- **Transición:** 0.3s ease entre estados

## Para implementación CSS (ya existe)

Las clases son: `.riddle-step`, `.riddle-step.active`, `.riddle-step.done`, `.step-header`, `.step-icon`, `.step-label`

## Sugerencia visual SVG (para reemplazar emojis)

- **Fragmento vacío:** círculo gris `#d1d5db` de 24px
- **Fragmento medio:** círculo parcialmente relleno (50%) con color estación
- **Fragmento lleno:** círculo relleno con color estación + check blanco
- **Animación:** al completar, círculo escala de 0 a 1 (pop-in 0.3s)
