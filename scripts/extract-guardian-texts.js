import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { oceanograficStations } from '../src/data/oceanografic.js';
import { museuStations } from '../src/data/museu.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, '..', 'docs');

function getStationRiddles(station) {
  return station.riddles || (station.riddle ? [station.riddle] : []);
}

function estimateDuration(text) {
  const words = text.split(/\s+/).length;
  const seconds = Math.ceil(words / 4.5);
  return `~${seconds}s`;
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeGuardianFile(itineraryId, stationId, guardianIndex, guardianName, text, label) {
  const dirPath = join(DOCS_DIR, 'grabacion-guardianes', itineraryId);
  mkdirSync(dirPath, { recursive: true });

  const slug = slugify(guardianName);
  const filename = `${stationId}-guardian-${guardianIndex}-${slug}.md`;
  const filePath = join(dirPath, filename);

  const audioPath = `public/audio/${itineraryId}/${stationId}/guardian-${guardianIndex}.mp3`;

  const content = [
    `# ${guardianName}`,
    '',
    `- **Archivo MP3:** \`${audioPath}\``,
    `- **Duración estimada:** ${estimateDuration(text)}`,
    `- **Etiqueta:** ${label}`,
    `- **Estación:** ${stationId} — ${itineraryId === 'oceanografic' ? 'Oceanogràfic' : 'Museu de les Ciències'}`,
    '',
    '## Instrucciones de grabación',
    '',
    '1. Grabar en MP3 (128-192 kbps, 44.1 kHz, mono, normalizar a -3dB).',
    '2. Colocar el archivo en la ruta indicada arriba.',
    `3. \`{username}\` se sustituye automáticamente en la app — grabar tal cual.`,
    '',
    '## Texto',
    '',
    text,
    '',
  ].join('\n');

  writeFileSync(filePath, content, 'utf-8');
  return filename;
}

let total = 0;

function processItinerary(itineraryId, itineraryTitle, stations) {
  console.log(`\n📁 ${itineraryTitle}:`);

  for (const station of stations) {
    const riddles = getStationRiddles(station);

    if (station.isTreasure) {
      const fn = writeGuardianFile(
        itineraryId,
        station.id,
        0,
        station.treasure.title,
        station.treasure.title,
        'Tesoro'
      );
      console.log(`  ✓ ${fn}`);
      total++;
    }

    if (!riddles.length) continue;

    for (const [index, riddle] of riddles.entries()) {
      if (!riddle.guardian) continue;

      const fn = writeGuardianFile(
        itineraryId,
        station.id,
        index,
        riddle.guardian.name,
        riddle.guardian.intro,
        'Guardián'
      );
      console.log(`  ✓ ${fn}`);
      total++;
    }
  }
}

processItinerary('oceanografic', 'Oceanogràfic', oceanograficStations);
processItinerary('museu', 'Museu de les Ciències', museuStations);

console.log(`\n✅ ${total} archivos generados en docs/grabacion-guardianes/`);
