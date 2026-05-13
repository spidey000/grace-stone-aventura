/**
 * Script de validación de datos de estaciones.
 *
 * Uso: node scripts/validate-stations.js
 *
 * Comprueba que cada estación en src/data/stations.js
 * tiene todos los campos obligatorios.
 */

import { itineraries } from '../src/data/stations.js';

let errors = 0;
let warnings = 0;

const REQUIRED_STATION_FIELDS = [
  'id',
  'minMode',
  'shortName',
  'title',
  'area',
  'routeHint',
  'adultHint',
  'childAction',
  'story',
  'reward',
  'duration',
  'color',
  'challenge',
];

const VALID_MODES = ['short', 'normal', 'complete'];
const VALID_CHALLENGE_TYPES = ['confirm', 'choice', 'text'];

function check(label, condition, isError = true) {
  if (!condition) {
    console[isError ? 'error' : 'warn'](`  ${isError ? 'ERROR' : 'ADVERTENCIA'}: ${label}`);
    if (isError) errors++;
    else warnings++;
  }
}

for (const [itId, it] of Object.entries(itineraries)) {
  console.log(`\n========================================`);
  console.log(` Itinerario: ${it.title} (${itId})`);
  console.log(` Estaciones: ${it.stations.length}`);
  console.log(`========================================`);

  check(`itinerario tiene id`, !!it.id);
  check(`itinerario tiene title`, !!it.title);
  check(`itinerario tiene stations`, Array.isArray(it.stations) && it.stations.length > 0);
  check(`itinerario tiene color`, !!it.color);
  check(`itinerario tiene icon`, !!it.icon);

  for (const st of it.stations) {
    const label = `Estación ${st.id} (${st.shortName})`;

    for (const field of REQUIRED_STATION_FIELDS) {
      check(`${label}: falta campo '${field}'`, st[field] !== undefined && st[field] !== null && st[field] !== '');
    }

    if (st.story) {
      check(`${label}: story contiene {username} correctamente`, st.story.includes('{username}'), false);
    }

    if (st.minMode) {
      check(`${label}: minMode '${st.minMode}' no es válido`, VALID_MODES.includes(st.minMode));
    }

    if (st.reward) {
      check(`${label}: reward.name`, !!st.reward.name);
      check(`${label}: reward.color`, !!st.reward.color);
    }

    const c = st.challenge;
    if (c) {
      check(`${label}: challenge.type`, VALID_CHALLENGE_TYPES.includes(c.type));
      check(`${label}: challenge.prompt`, !!c.prompt);
      check(`${label}: challenge.success`, !!c.success);
      check(`${label}: challenge.hint`, !!c.hint, false);

      if (c.type === 'choice') {
        check(`${label}: challenge.options (array > 1 para choice)`, Array.isArray(c.options) && c.options.length >= 2);
        check(`${label}: challenge.answer`, c.answer !== undefined && c.answer !== '');
      }
    }

    if (st.backupChallenge) {
      check(`${label}: backupChallenge.type`, VALID_CHALLENGE_TYPES.includes(st.backupChallenge.type));
      check(`${label}: backupChallenge.prompt`, !!st.backupChallenge.prompt);
    } else {
      warnings++;
      console.warn(`  ADVERTENCIA: ${label}: falta backupChallenge`);
    }
  }
}

console.log(`\n========================================`);
console.log(` Resultado:`);
console.log(`  Errores:     ${errors}`);
console.log(`  Advertencias: ${warnings}`);
console.log(`========================================`);

process.exit(errors > 0 ? 1 : 0);
