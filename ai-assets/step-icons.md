# Step Icons — Iconos de estado

## Uso en la app
Aparecen en cada `step-header` y deben comunicar progreso con un lenguaje de aventura.

## Partes que necesita este layout
- fondo circular o medalla
- símbolo central
- borde diferenciado por estado
- animación mínima para active y done

## Estado locked
- icono: candado cerrado
- color base: gris piedra
- sensación: sellado, quieto, bloqueado

## Estado active
- icono: fragmento o pieza de puzzle
- color base: `var(--station-color)`
- sensación: energía contenida
- patrón: pulso suave

## Estado done
- icono: check o gema completada
- color base: verde hoja
- sensación: recompensa y cierre
- patrón: pop-in corto

## Archivos sugeridos
| Archivo | Descripción |
|:--------|:------------|
| `step-locked.svg` | candado sellado |
| `step-active.svg` | fragmento activo |
| `step-done.svg` | check de recompensa |
