# Inventory Strip — Barra de objetos recolectados

## Uso en la app
Se muestra debajo de la `crystal-strip` en cada estación. Muestra todos los objetos clave que el jugador ha recolectado hasta el momento.

## Diseño visual

```
Cristales:   ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉ ◉  ← crystal strip
Objetos:     🐙 🪶 🐢 ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  ← inventory strip
               ^ collected         ^ missing
```

## Especificaciones

- **Layout:** display flex, gap 4px, justify-content center
- **Padding:** 8px 0, margin-top 8px
- **Separador:** borde superior `1px solid #e5e7eb`
- **Cada item:** 32×32px, border-radius 50%
- **Estado collected:** fondo `#d1fae5` (verde claro), icono visible
- **Estado missing:** fondo `#f3f4f6` (gris claro), icono "○" gris `#d1d5db`

## Animación al recolectar

Cuando se añade un nuevo objeto al inventario:

```
t=0s          t=0.15s       t=0.3s        t=0.5s
│             │             │             │
▼             ▼             ▼             ▼
[○ aparece   [escala 0]    [escala 1.3]  [escala 1,
 en gris]                              fondo verde]
```

```css
.inv-item.collected {
  animation: pop-in 0.3s ease;
  background: #d1fae5;
}

@keyframes pop-in {
  0%   { transform: scale(0); background: #f3f4f6; }
  50%  { transform: scale(1.3); }
  100% { transform: scale(1); background: #d1fae5; }
}
```

## Props (para componente React)

```js
{
  objects: [                    // todos los keyObject del itinerario
    { id: 'mapa-mediterraneo', icon: '🐙', name: 'Pieza del Mapa — Mediterráneo' },
    ...
  ],
  collectedIds: ['mapa-mediterraneo', 'mapa-humedales'],  // los que tiene el jugador
}
```

## Responsive

En <620px:
- Gap reduce a 2px
- Tamaño reduce a 28×28px
- Puede hacer overflow-x scroll si hay muchos objetos
