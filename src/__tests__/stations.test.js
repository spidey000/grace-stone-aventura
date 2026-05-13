import { describe, it, expect } from 'vitest';
import { itineraries, filterStationsByMode, modeLabels } from '../data/stations.js';

const allStations = [
  ...itineraries.oceanografic.stations.map(s => ({ ...s, itinerary: 'oceanografic' })),
  ...itineraries.museu.stations.map(s => ({ ...s, itinerary: 'museu' })),
];

describe('itineraries structure', () => {
  it('has both itineraries', () => {
    expect(Object.keys(itineraries)).toEqual(['oceanografic', 'museu']);
  });

  it('each itinerary has required fields', () => {
    for (const [id, it] of Object.entries(itineraries)) {
      expect(it.id).toBe(id);
      expect(it.title).toBeTruthy();
      expect(it.color).toMatch(/^#/);
      expect(it.icon).toBeTruthy();
      expect(it.stations.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('each station', () => {
  const REQUIRED = ['id', 'minMode', 'shortName', 'title', 'area', 'story', 'reward', 'challenge'];

  for (const st of allStations) {
    it(`${st.itinerary} ${st.id} (${st.shortName}) has all required fields`, () => {
      for (const field of REQUIRED) {
        expect(st[field]).toBeTruthy();
      }
      expect(['short', 'normal', 'complete']).toContain(st.minMode);
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has valid challenge`, () => {
      const c = st.challenge;
      expect(['confirm', 'choice', 'text']).toContain(c.type);
      expect(c.prompt).toBeTruthy();
      expect(c.success).toBeTruthy();
      if (c.type === 'choice') {
        expect(c.options.length).toBeGreaterThanOrEqual(2);
        expect(c.answer).toBeDefined();
      }
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has backupChallenge`, () => {
      expect(st.backupChallenge).toBeDefined();
      expect(['confirm', 'choice', 'text']).toContain(st.backupChallenge.type);
      expect(st.backupChallenge.prompt).toBeTruthy();
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has adultHint and childAction`, () => {
      expect(st.adultHint).toBeTruthy();
      expect(st.childAction).toBeTruthy();
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) reward has name and color`, () => {
      expect(st.reward.name).toBeTruthy();
      expect(st.reward.color).toMatch(/^#/);
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has no placeholder texts`, () => {
      const lower = st.story.toLowerCase();
      expect(lower).not.toContain('placeholder');
      expect(lower).not.toContain('cambiaremos');
      expect(lower).not.toContain('pendiente');
      expect(lower).not.toContain('provisional');
    });
  }
});

describe('filterStationsByMode', () => {
  const stations = itineraries.oceanografic.stations;

  it('returns all for complete', () => {
    expect(filterStationsByMode(stations, 'complete').length).toBe(stations.length);
  });

  it('filters for short', () => {
    const result = filterStationsByMode(stations, 'short');
    expect(result.length).toBeLessThan(stations.length);
    for (const s of result) {
      expect(['short', 'normal', 'complete']).toContain(s.minMode);
    }
  });

  it('short mode has correct stations for oceanografic', () => {
    const ids = filterStationsByMode(stations, 'short').map(s => s.id);
    expect(ids).toContain('00');
    expect(ids).toContain('02');
    expect(ids).toContain('05');
    expect(ids).toContain('08');
    expect(ids).toContain('09');
  });
});

describe('modeLabels', () => {
  it('has all three modes with labels', () => {
    for (const key of ['short', 'normal', 'complete']) {
      expect(modeLabels[key].label).toBeTruthy();
      expect(modeLabels[key].desc).toBeTruthy();
      expect(modeLabels[key].emoji).toBeTruthy();
    }
  });
});
