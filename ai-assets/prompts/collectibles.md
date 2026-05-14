# Collectibles

## Global negative prompt

```text
no readable text, no watermark, no logo, no clutter, no generic game loot, no flat emoji style, no noisy background
```

## collectibles/crystal-set

Create a coherent family of reward crystals for the Oceanogràfic Jumanji UI. Each crystal must look like a premium marine relic: cut glass, sea light, inner glow, wet reflections and a strong silhouette that reads at 32 px. The crystals are used as station rewards in the progress strip, the mission footer and the final screen. Produce one distinct crystal per reward state and keep the whole family visually related.

Required crystal variants:

- `crystal-entry` - `Cristal de la Entrada` - teal and gold - access and lobby start.
- `crystal-mediterranean` - `Cristal Mediterráneo` - marine teal.
- `crystal-wetlands` - `Cristal de los Humedales` - green-blue marsh tone.
- `crystal-shell` - `Cristal de Caparazón` - olive and bone.
- `crystal-temperate` - `Cristal Templado` - cool sea green.
- `crystal-tropical` - `Cristal Tropical` - coral gold and bright reef color.
- `crystal-islands` - `Cristal de las Islas` - sea green and moss.
- `crystal-oceanic-islands` - `Cristal de las Islas Oceánicas` - muted sand and seaweed.
- `crystal-reef` - `Cristal del Arrecife` - coral red and turquoise highlights.
- `crystal-blue-jump` - `Cristal del Salto Azul` - bright cobalt.
- `crystal-pink` - `Cristal Rosa` - soft rose.
- `crystal-antarctic` - `Cristal Antártico` - ice blue.
- `crystal-arctic` - `Cristal Ártico` - pale ice and white.
- `crystal-old-scales` - `Cristal de Escamas Antiguas` - deep olive and stone.
- `crystal-depths` - `Cristal de las Profundidades` - dark ocean blue.
- `insignia-honor` - `Insignia de Explorador Honorífico` - amethyst and gold.
- `crystal-lagoon` - `Cristal del Lago Vivo` - optional bonus, freshwater teal.
- `crystal-mysteries` - `Cristal de los Misterios` - optional bonus, violet marine glow.

Output: transparent PNG masters at 512x512, plus 256 and 96. Keep the background fully transparent and do not add shadows that touch the canvas edge.

## collectibles/map-pieces

Create a family of map piece icons that visually match the Oceanogràfic expedition route. Each piece is a collectible fragment used in the inventory strip, the objects grid and the final treasure reveal. The fragments must feel like parts of the same physical map, but each one should show a different marine guardian or habitat so the player can recognize progress.

Required map piece variants:

- `map-piece-mediterranean` - medal/fragment with octopus or Mediterranean cue.
- `map-piece-wetlands` - humid water and bird cue.
- `map-piece-turtles` - turtle shell cue.
- `map-piece-temperate` - seal or temperate water cue.
- `map-piece-tropical` - reef fish cue.
- `map-piece-islands` - sea lion cue.
- `map-piece-oceanic-islands` - giant turtle cue.
- `map-piece-reef` - coral cue.
- `map-piece-dolphins` - dolphin cue.
- `map-piece-flamingos` - flamingo cue.
- `map-piece-antarctic` - penguin cue.
- `map-piece-belugas` - beluga cue.
- `map-piece-crocodiles` - crocodile cue.
- `map-piece-sharks` - shark cue.

Optional expansion pieces for complete mode can reuse the same visual grammar but should still be distinct if generated:

- lagoon, mysteries, access bonus fragments and any other optional route fragment.

Output: transparent PNG masters at 512x512, plus 256 and 96. The icon must remain readable at 24 px.

## collectibles/treasure-map

Create the final treasure map reveal for the completion screen and printable celebration path. The map should show an Oceanogràfic-style marine route with the final treasure point, glowing path lines, coral markers and a strong sense of discovery. It must feel like the completed artifact of the whole adventure, not a generic nautical chart. Placement: treasure reveal screen, final screen illustration and optional passport spread. Output: 1920x1080 desktop, 1080x1920 mobile and a 1440x900 celebration crop, webp/png.

## collectibles/final-insignia

Create the final honor insignia for the Oceanogràfic Jumanji experience. The badge must feel ceremonial and collectible, with a marine expedition seal, gold trim, subtle turquoise glow and a strong circular or shield shape. It is used on the final screen, the passport cover and printable completion materials. Output: 1024x1024 master and 512, 256, 96 PNG exports.

