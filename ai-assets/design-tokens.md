# Design Tokens

Tokens base para mantener coherencia entre fondos, UI, estados y animaciones del set de assets de aventura. Usar estos nombres como referencia al exportar CSS variables, tokens de Figma o presets para prompts visuales.

## Color

- `--color-bg-outer`: `#08131A`
- `--color-bg-inner`: `#102836`
- `--color-bg-surface`: `#173242`
- `--color-bg-surface-raised`: `#22485C`
- `--color-accent-gold`: `#F2C66D`
- `--color-accent-amber`: `#D89A2B`
- `--color-accent-jade`: `#62C28B`
- `--color-accent-teal`: `#4DB7B0`
- `--color-accent-danger`: `#D45A4F`
- `--color-accent-mystic`: `#7A7BD8`
- `--color-text-primary`: `#F7F2E8`
- `--color-text-secondary`: `#D6CBB9`
- `--color-text-muted`: `#9E927F`
- `--color-line-soft`: `rgba(247, 242, 232, 0.12)`
- `--color-line-strong`: `rgba(247, 242, 232, 0.24)`
- `--color-focus-ring`: `#9BE7C0`

## Semantic Color

- Progreso: `--color-accent-jade`
- Logro o recompensa: `--color-accent-gold`
- Advertencia suave: `--color-accent-amber`
- Error o bloqueo: `--color-accent-danger`
- Misterio, magia o pista especial: `--color-accent-mystic`
- Borde activo: `--color-line-strong` con `--shadow-glow-gold` o `--shadow-glow-jade`

## Typography

- Título narrativo: serif aventurera, alto contraste, peso 700-800.
- Texto UI: sans legible, compacta y robusta.
- Texto de pista: serif o slab para separar la voz del guardián.
- Jerarquía:
- `--font-size-display`: 40-56 px
- `--font-size-title`: 24-32 px
- `--font-size-body`: 14-18 px
- `--font-size-micro`: 11-12 px
- `--line-height-tight`: 1.05
- `--line-height-title`: 1.15
- `--line-height-body`: 1.45
- `--letter-spacing-ui`: 0

## Spacing

- Sistema base: múltiplos de `4 px`
- `--space-xs`: 4 px
- `--space-sm`: 8 px
- `--space-md`: 12 px
- `--space-lg`: 16 px
- `--space-xl`: 24 px
- `--space-2xl`: 32 px
- `--space-3xl`: 48 px

## Radius

- `--radius-xs`: 6 px
- `--radius-sm`: 8 px
- `--radius-md`: 12 px
- `--radius-lg`: 16 px
- `--radius-xl`: 24 px
- Piezas orgánicas o sellos: `999 px`

## Shadow

- `--shadow-soft`: `0 6px 18px rgba(0, 0, 0, 0.24)`
- `--shadow-deep`: `0 14px 34px rgba(0, 0, 0, 0.36)`
- `--shadow-glow-gold`: `0 0 18px rgba(242, 198, 109, 0.28)`
- `--shadow-glow-jade`: `0 0 18px rgba(98, 194, 139, 0.26)`
- `--shadow-inset-carved`: `inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -2px 0 rgba(0, 0, 0, 0.28)`

## Motion

- `--duration-fast`: `120ms`
- `--duration-base`: `180ms`
- `--duration-slow`: `280ms`
- `--duration-scene`: `420ms`
- `--ease-out`: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- `--ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`
- Flash de descubrimiento: 120-180 ms.
- Revelación de fragmentos: entrada escalonada con rebote sutil.
- Tesoro final: pulso lento, brillo intermitente y expansión radial.
- Respetar `prefers-reduced-motion`: cambiar animaciones de escena por fundidos de 120-180 ms.

## Texture

- Fondo base con grano leve.
- Mapa/patrones con papel envejecido, tinta gastada y marcas de viaje.
- Estados activos con borde luminoso y ruido fino.
- Elementos de aventura con desgaste, rayas, polvo y golpes suaves.

## Component Rules

- Mantener legibilidad sobre fondos oscuros y texturas complejas.
- Priorizar siluetas simples para iconos de estado y objetos clave.
- Reforzar lectura por color, forma y brillo, no solo por detalle.
- Evitar saturación excesiva en fondos; reservar el oro para momentos narrativos clave.
- Usar jade/teal para progreso, gold para logro y red solo para alerta.
- No depender solo del color para comunicar estado; cada estado debe cambiar icono, borde o etiqueta.
- Mantener contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande.

## Export Sizes

- Iconos UI: 24, 32 y 48 px.
- Objetos de inventario: 64 y 96 px.
- Avatares: 128, 256 y 512 px.
- Fondos mobile: 1080 x 1920 px.
- Fondos desktop: 1920 x 1080 px y 2560 x 1440 px.
- Banner narrativo: 1440 x 360 px y variante compacta 720 x 240 px.
- PWA: 192, 512, maskable 512 y favicon SVG.
