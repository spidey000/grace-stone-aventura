# Background Themes — Fondos por itinerario

## Uso en la web
Fondos de contexto para `Lobby`, `Adventure` y `FinalScreen`. Deben anclar la experiencia en selva, ruinas y tesoro, sin competir con el contenido.

## Partes que necesita este layout
- fondo base con degradado oscuro
- capa de niebla o grano
- siluetas decorativas muy tenues
- luz ambiental o halo central
- marco oscuro en bordes para dirigir la vista

## Patrón visual común
- base: verde jungla + negro
- acento: oro antiguo o turquesa tesoro
- textura: pergamino, piedra, madera o grano
- profundidad: varias capas con opacidades bajas

## Itinerario Oceanogràfic
- paleta: verde jungla, turquesa, azul profundo, oro antiguo
- iconos: hojas, olas, burbujas, peces muy tenues
- patrones: ondas suaves, partículas ascendentes, brillo acuático

## Itinerario Museu
- paleta: marrón madera, cobre, rojo antorcha, pergamino
- iconos: brújulas, runas, engranajes, polvo
- patrones: papel envejecido, coordenadas, rejilla tenue

## Archivos sugeridos
| Archivo | Propósito |
|:--------|:----------|
| `assets/images/jungle-bg.svg` | Fondo base selva/ruina |
| `assets/images/jungle-fog.svg` | Niebla o grano superpuesto |
| `assets/images/map-lines.svg` | Líneas de mapa o ruta |
| `assets/images/light-halo.svg` | Halo central para pantallas clave |

## Nota de implementación
- SVG preferiblemente
- opacidad baja, entre 5% y 20%
- nunca bloquear lectura
- siempre decorativo
