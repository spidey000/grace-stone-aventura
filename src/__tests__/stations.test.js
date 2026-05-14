import { describe, it, expect } from 'vitest';
import { itineraries, filterStationsByMode, modeLabels } from '../data/stations.js';

const allStations = [
  ...itineraries.oceanografic.stations.map(s => ({ ...s, itinerary: 'oceanografic' })),
  ...itineraries.museu.stations.map(s => ({ ...s, itinerary: 'museu' })),
];

function getRiddles(station) {
  return station.riddles || (station.riddle ? [station.riddle] : []);
}

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

  it('oceanografic has 18 stations (v3 multi-riddle route)', () => {
    expect(itineraries.oceanografic.stations.length).toBe(18);
  });

  it('museu has 10 stations (v2 + final)', () => {
    expect(itineraries.museu.stations.length).toBe(10);
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
      expect(['confirm', 'choice', 'text', 'familyVote', 'observe']).toContain(c.type);
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

describe('riddle structure', () => {
  for (const st of allStations) {
    const riddles = getRiddles(st);
    if (!riddles.length) continue;

    it(`${st.itinerary} ${st.id} (${st.shortName}) has valid riddle types`, () => {
      riddles.forEach((riddle) => {
        expect(['chain', 'steps']).toContain(riddle.type);
      });
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has 3 riddle steps each`, () => {
      riddles.forEach((riddle) => {
        expect(riddle.steps).toHaveLength(3);
      });
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) each step has required fields`, () => {
      riddles.forEach((riddle) => {
        riddle.steps.forEach((step) => {
          expect(step.text).toBeTruthy();
          expect(step.answer).toBeDefined();
          expect(step.options.length).toBeGreaterThanOrEqual(2);
          expect(step.hint).toBeTruthy();
        });
      });
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has keyObject with all fields`, () => {
      riddles.forEach((riddle) => {
        expect(riddle.keyObject).toBeDefined();
        expect(riddle.keyObject.id).toBeTruthy();
        expect(riddle.keyObject.name).toBeTruthy();
        expect(riddle.keyObject.icon).toBeTruthy();
        expect(riddle.keyObject.description).toBeTruthy();
      });
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has finalSuccess`, () => {
      riddles.forEach((riddle) => {
        expect(riddle.finalSuccess).toBeTruthy();
      });
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has guardian with name and intro`, () => {
      riddles.forEach((riddle) => {
        expect(riddle.guardian).toBeDefined();
        expect(riddle.guardian.name).toBeTruthy();
        expect(riddle.guardian.intro).toBeTruthy();
      });
    });
  }

  it('all non-intro/non-treasure stations have riddles', () => {
    for (const st of allStations) {
      if (st.id === '00' || st.isTreasure) continue;
      expect(getRiddles(st).length).toBeGreaterThan(0);
    }
  });

  it('oceanografic main stations can contain multiple riddles', () => {
    const multiRiddleStations = itineraries.oceanografic.stations.filter((st) => getRiddles(st).length > 1);
    expect(multiRiddleStations.length).toBeGreaterThanOrEqual(8);
  });
});

describe('treasure stations', () => {
  const treasures = allStations.filter(s => s.isTreasure);

  it('has 2 treasure stations (one per itinerary)', () => {
    expect(treasures).toHaveLength(2);
  });

  for (const st of treasures) {
    it(`${st.itinerary} ${st.id} (${st.shortName}) has requiredObjects array`, () => {
      expect(st.treasure).toBeDefined();
      expect(Array.isArray(st.treasure.requiredObjects)).toBe(true);
      expect(st.treasure.requiredObjects.length).toBeGreaterThan(0);
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) minMode is short`, () => {
      expect(st.minMode).toBe('short');
    });

    it(`${st.itinerary} ${st.id} (${st.shortName}) has valid treasure type`, () => {
      expect(['map', 'lantern']).toContain(st.treasure.type);
      expect(st.treasure.title).toBeTruthy();
      expect(st.treasure.message).toBeTruthy();
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

  it('short mode includes intro and treasure', () => {
    const ids = filterStationsByMode(stations, 'short').map(s => s.id);
    expect(ids).toContain('00');
    expect(ids).toContain('15');
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
