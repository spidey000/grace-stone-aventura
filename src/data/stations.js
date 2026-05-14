import { oceanograficStations } from './oceanografic.js';
import { museuStations } from './museu.js';

export const itineraries = {
  oceanografic: {
    id: 'oceanografic',
    title: 'Oceanogràfic',
    subtitle: 'Aventura marina en el acuario más grande de Europa',
    durationLabel: '~90 min',
    shortLabel: '~45 min',
    icon: '🐠',
    color: '#0e8277',
    stations: oceanograficStations,
  },
  museu: {
    id: 'museu',
    title: 'Museu de les Ciències',
    subtitle: 'Laboratorio gigante de ciencia interactiva',
    durationLabel: '~60 min',
    shortLabel: '~40 min',
    icon: '🔬',
    color: '#d95f45',
    stations: museuStations,
  },
};

export const modeLabels = {
  short: { label: 'Corta', desc: '45-60 min, lo esencial', emoji: '⚡' },
  normal: { label: 'Normal', desc: '90-120 min, completa', emoji: '🌟' },
  complete: { label: 'Completa', desc: 'Todas las estaciones', emoji: '🏆' },
};

export function filterStationsByMode(stations, mode) {
  if (mode === 'complete') return stations;
  const levels = { short: 0, normal: 1, complete: 2 };
  const minLevel = levels[mode] || 1;
  return stations.filter((s) => levels[s.minMode || 'normal'] <= minLevel);
}
