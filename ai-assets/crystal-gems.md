# Crystal Gems — Gemas de cristal por estación

## Uso en la app
Cada estación (incluyendo intro y final) otorga un cristal de color al completarse. Se muestran en la `crystal-strip` debajo de cada estación.

## Lista completa — Oceanogràfic (16 cristales)

| ID | Nombre | Color |
|:---|:-------|:------|
| 00 | Cristal de la Entrada | `#0e8277` |
| 01 | Cristal Mediterráneo | `#2e9f89` |
| 02 | Cristal de los Humedales | `#5aa86b` |
| 03 | Cristal de Caparazón | `#8aa64b` |
| 04 | Cristal Templado | `#4f94a3` |
| 05 | Cristal Tropical | `#f2b84b` |
| 06 | Cristal de las Islas | `#7dbe57` |
| 07 | Cristal de las Islas Oceánicas | `#9c8f4f` |
| 08 | Cristal del Arrecife | `#d65a4a` |
| 09 | Cristal del Salto Azul | `#2b7fd3` |
| 10 | Cristal Rosa | `#e98ca8` |
| 11 | Cristal Antártico | `#8fd3ff` |
| 12 | Cristal Ártico | `#bfefff` |
| 13 | Cristal de Escamas Antiguas | `#647b36` |
| 14 | Cristal de las Profundidades | `#123f63` |
| 15 | Insignia de Explorador Honorífico | `#7a4fd1` |

## Lista completa — Museu (10 cristales)

| ID | Nombre | Color |
|:---|:-------|:------|
| 00 | Cristal de la Calle Menor | `#d95f45` |
| 01 | Cristal de la Reacción | `#2b7fd3` |
| 02 | Cristal de los Sentidos | `#e07b39` |
| 03 | Cristal del Bosque | `#4c9e3a` |
| 04 | Cristal de Cooperación | `#8b6bb5` |
| 05 | Cristal del Giro | `#6b7280` |
| 06 | Cristal del ADN | `#0f9f8f` |
| 07 | Cristal del Escenario | `#b55488` |
| 08 | Cristal de la Transformación | `#c084fc` |
| 09 | Insignia de Científico Honorífico | `#7a4fd1` |

## Especificaciones de diseño

- **Tamaño en strip:** 24×24px (círculo)
- **Forma:** círculo con gradiente radial (más claro en centro)
- **Borde:** 1px sólido, tono más oscuro del color
- **Estado "apagado" (no completado):** `#e5e7eb` (gris claro), sin brillo
- **Estado "encendido" (completado):** color completo con efecto glow

## Efecto glow (CSS)

```css
.crystal-strip span.lit {
  background: radial-gradient(circle at 35% 35%, 
    color-mix(in srgb, var(--crystal-color) 80%, white), 
    var(--crystal-color));
  box-shadow: 0 0 6px var(--crystal-color);
  transition: all 0.3s ease;
}
```

## Archivos SVG propuestos

Generar un sprite SVG con todos los cristales (16 + 10 = 26), o generar individualmente:
- `crystals/crystal-default.svg` — plantilla base para "apagado"
- `crystals/crystal-lit.svg` — plantilla base para "encendido"
- Colores controlados por CSS `var(--crystal-color)`

También se puede implementar puramente con CSS (radial-gradient + border-radius: 50%), sin necesidad de imágenes.
