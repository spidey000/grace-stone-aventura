# Adult Help Button — Botón de ayuda para adultos

## Uso en la app
Aparece dentro de un paso del riddle después de 3 intentos fallidos en el mismo paso. Permite que un adulto ayude al niño a superar el paso sin frustración.

## Diseño visual

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
  👤 ¿Necesitas ayuda?        
  Pide a un adulto que te     
  ayude con esta pregunta.    
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

## Especificaciones

- **Background:** `#fef3c7` (amarillo claro)
- **Borde:** `2px dashed #f59e0b` (naranja)
- **Border-radius:** 8px
- **Padding:** 10px
- **Margin-top:** 10px
- **Width:** 100%
- **Tipografía:** 0.95rem, color `#92400e`, font-weight 600
- **Cursor:** pointer

## Estados

| Estado | Aspecto |
|:-------|:--------|
| **Visible** | Fondo amarillo, borde dashed naranja, icono 👤 |
| **Hover** | Fondo `#fde68a` (amarillo más intenso) |
| **After click** | Se desvanece, el paso se completa automáticamente |

## Texto (hardcoded en español)

```
👤 Pedir ayuda a un adulto
```

## Condición de aparición

```js
if (failCount >= 3) {
  // mostrar botón de ayuda adulto
}
```

## Comportamiento

Al hacer clic:
1. El paso actual se marca como completado
2. Se avanza al siguiente paso (o se completa la estación si era el paso 3)
3. El contador de fallos se resetea para ese paso
4. No se reproduce sonido de éxito (es neutro)
5. Se guarda en `riddleFails` que se usó ayuda (para analytics)

## CSS (ya implementado en styles.css)

```css
.adult-help-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #fef3c7;
  border: 2px dashed #f59e0b;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #92400e;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.adult-help-button:hover {
  background: #fde68a;
}
```
