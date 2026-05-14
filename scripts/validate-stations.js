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
const VALID_CHALLENGE_TYPES = ['confirm', 'choice', 'text', 'familyVote', 'observe'];
const VALID_RIDDLE_TYPES = ['chain', 'steps'];

function check(label, condition, isError = true) {
  if (!condition) {
    console[isError ? 'error' : 'warn'](`  ${isError ? 'ERROR' : 'ADVERTENCIA'}: ${label}`);
    if (isError) errors++;
    else warnings++;
  }
}

function getRiddles(station) {
  return station.riddles || (station.riddle ? [station.riddle] : []);
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

    const riddles = getRiddles(st);
    if (riddles.length) {
      riddles.forEach((riddle, riddleIndex) => {
        const riddleLabel = `${label}: riddle[${riddleIndex}]`;
        check(`${riddleLabel}.type`, VALID_RIDDLE_TYPES.includes(riddle.type));
        check(`${riddleLabel}.steps (array de 3)`, Array.isArray(riddle.steps) && riddle.steps.length === 3);
        check(`${riddleLabel}.finalSuccess`, !!riddle.finalSuccess);
        check(`${riddleLabel}.keyObject`, !!riddle.keyObject);
        check(`${riddleLabel}.guardian.name`, !!riddle.guardian?.name);
        check(`${riddleLabel}.guardian.intro`, !!riddle.guardian?.intro);

        if (riddle.keyObject) {
          check(`${riddleLabel}.keyObject.id`, !!riddle.keyObject.id);
          check(`${riddleLabel}.keyObject.name`, !!riddle.keyObject.name);
          check(`${riddleLabel}.keyObject.icon`, !!riddle.keyObject.icon);
          check(`${riddleLabel}.keyObject.description`, !!riddle.keyObject.description);
        }

        if (Array.isArray(riddle.steps)) {
          riddle.steps.forEach((step, i) => {
            const stepLabel = `${riddleLabel}.step[${i}]`;
          check(`${stepLabel}.text`, !!step.text);
          check(`${stepLabel}.answer`, step.answer !== undefined && step.answer !== '');
          check(`${stepLabel}.options (array >= 2)`, Array.isArray(step.options) && step.options.length >= 2);
          check(`${stepLabel}.hint`, !!step.hint);
          });
        }
      });
    }

    if (st.isTreasure) {
      check(`${label}: isTreasure tiene requiredObjects`, Array.isArray(st.treasure?.requiredObjects) && st.treasure.requiredObjects.length > 0);
      check(`${label}: treasure.type`, ['map', 'lantern'].includes(st.treasure?.type));
      check(`${label}: treasure.title`, !!st.treasure?.title);
      check(`${label}: treasure.message`, !!st.treasure?.message);
    }
  }
}

console.log(`\n========================================`);
console.log(` Resultado:`);
console.log(`  Errores:     ${errors}`);
console.log(`  Advertencias: ${warnings}`);
console.log(`========================================`);

process.exit(errors > 0 ? 1 : 0);
