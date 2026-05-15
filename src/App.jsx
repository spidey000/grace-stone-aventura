import { useEffect, useMemo, useState, useCallback } from 'react';
import { itineraries, filterStationsByMode } from './data/stations.js';

const STORAGE_KEY = 'bravestone-progress-v1';
const FEEDBACK_SOUNDS = {
  success: '/audio/fx/success-chime.mp3',
  error: '/audio/fx/error-buzz.mp3',
};

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderStory(story, userName) {
  return story.replace(/\{username\}/g, userName || 'Explorador');
}

function playSound(sound, volume = 0.7) {
  if (!sound) return;

  try {
    const audio = new Audio(sound);
    audio.preload = 'auto';
    audio.volume = volume;
    void audio.play().catch(() => {});
  } catch {
    // The asset may not exist yet while generation is in progress.
  }
}

function seedRandom(seed) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return () => {
    hash += 0x6d2b79f5;
    let t = Math.imul(hash ^ (hash >>> 15), 1 | hash);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleOptions(options, seed) {
  const shuffled = [...options];
  const random = seedRandom(seed);

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function getStationRiddles(station) {
  return station.riddles || (station.riddle ? [station.riddle] : []);
}

function getStationKeyObjects(station) {
  return getStationRiddles(station).map((riddle) => riddle.keyObject).filter(Boolean);
}

function getItineraryKeyObjects(stations) {
  return stations.flatMap(getStationKeyObjects);
}

function useNarration(userName) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSource, setActiveSource] = useState(null);

  const speak = useCallback(
    (text, sourceId = 'story') =>
      new Promise((resolve) => {
        const resolved = renderStory(text, userName);
        setIsLoading(true);
        setIsSpeaking(true);
        setActiveSource(sourceId);

        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(resolved);
          utterance.lang = 'es-ES';
          utterance.rate = 0.95;
          utterance.pitch = 1.08;
          const finish = () => {
            setIsSpeaking(false);
            setIsLoading(false);
            setActiveSource(null);
            resolve();
          };
          utterance.onend = finish;
          utterance.onerror = finish;
          window.speechSynthesis.speak(utterance);
        } catch {
          setIsSpeaking(false);
          setIsLoading(false);
          setActiveSource(null);
          resolve();
        }
      }),
    [userName]
  );

  const speakFeedback = useCallback((text) => speak(text, 'feedback'), [speak]);

  const speakStory = useCallback((text) => speak(text, 'story'), [speak]);
  const speakGuardian = useCallback((text) => speak(text, 'guardian'), [speak]);
  const speakTreasure = useCallback((text) => speak(text, 'treasure'), [speak]);

  function stop() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsLoading(false);
    setActiveSource(null);
  }

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  return {
    speakStory,
    speakGuardian,
    speakTreasure,
    speakFeedback,
    stopSpeaking: stop,
    isSpeaking,
    isLoading,
    activeSource,
  };
}

function Lobby({ onStart }) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  function handleStart() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Escribe tu nombre secreto de misión.');
      return;
    }
    if (!selected) {
      setError('Elige una aventura para empezar.');
      return;
    }
    onStart(trimmed, selected);
  }

  return (
    <main className="app-shell lobby-shell">
      <div className="lobby-card">
        <header className="lobby-header">
          <span className="lobby-eyebrow">Audio-aventura guiada</span>
          <h1>La Aventura de Dr. Smolder Bravestone</h1>
          <p>Hola, explorador. Antes de entrar, dime tu nombre secreto de misión.</p>
        </header>

        <div className="lobby-form">
          <label htmlFor="name-input">¿Cómo te llamas?</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Tu nombre secreto"
            autoComplete="off"
            autoFocus
          />

          <p className="section-label">¿Adónde vamos hoy?</p>
          <div className="itinerary-cards">
            {Object.values(itineraries).map((it) => (
              <button
                key={it.id}
                type="button"
                className={`itinerary-card ${selected === it.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelected(it.id);
                  setError('');
                }}
                style={{ '--it-color': it.color }}
              >
                <span className="it-icon">{it.icon}</span>
                <strong>{it.title}</strong>
                <small>{it.subtitle}</small>
              </button>
            ))}
          </div>

          {error && <p className="lobby-error">{error}</p>}

          <button className="start-button" type="button" onClick={handleStart}>
            Empezar aventura
          </button>
        </div>
      </div>
    </main>
  );
}

function FinalScreen({ itinerary, userName, collectedObjects, onReset }) {
  const isOceanografic = itinerary.id === 'oceanografic';
  const title = isOceanografic ? 'Explorador Honorífico del Océano' : 'Científico Honorífico';
  const tagline = isOceanografic
    ? 'El océano necesita exploradores valientes como tú.'
    : 'La ciencia necesita mentes curiosas como la tuya.';
  const finalStory = isOceanografic
    ? '¡Misión cumplida, {username}! Has cruzado el Oceanogràfic como un auténtico explorador. Tiburones sin huesos, belugas blancas como el hielo, pingüinos que vuelan bajo el agua... lo has visto todo con tus propios ojos. El Dr. Bravestone está orgulloso de ti. El océano entero te ha visto y te necesita.'
    : '¡Lo lograste, {username}! Has explorado el Museu de les Ciències como un verdadero científico. El péndulo que prueba que la Tierra gira, el código secreto del ADN, la magia de la metamorfosis... lo has descifrado todo. El Dr. Bravestone te nombra oficialmente miembro de su equipo. La ciencia te necesita.';

  return (
    <main className="app-shell final-shell">
      <div className="final-card">
        <span className="final-badge">{itinerary.icon}</span>
        <h1>¡{userName}, misión completa!</h1>
        <p>{renderStory(finalStory, userName)}</p>

        {collectedObjects.length > 0 && (
          <div className="final-objects">
            <p><strong>Objetos recolectados:</strong></p>
            <div className="objects-grid">
              {getItineraryKeyObjects(itinerary.stations)
                .map((keyObject) => {
                  const has = collectedObjects.includes(keyObject.id);
                  return (
                    <span
                      key={keyObject.id}
                      className={`object-chip ${has ? 'collected' : 'missing'}`}
                      title={keyObject.name}
                    >
                      {has ? keyObject.icon : '❓'} {has && keyObject.name}
                    </span>
                  );
                })}
            </div>
          </div>
        )}

        <div className="final-insig" style={{ '--it-color': itinerary.color }}>
          <strong>{title}</strong>
          <span>{userName}</span>
        </div>
        <p className="final-tagline">{tagline}</p>
        <p className="final-message">
          — Dr. Smolder Bravestone
        </p>
        <div className="final-actions">
          <button
            type="button"
            className="start-button"
            onClick={() => window.print()}
          >
            🖨 Imprimir insignia
          </button>
          <button type="button" className="start-button secondary" onClick={onReset}>
            Nueva aventura
          </button>
        </div>
      </div>
    </main>
  );
}

function Adventure({ itinerary, userName, onFinal, onReset }) {
  const saved = loadProgress();
  const stations = useMemo(() => filterStationsByMode(itinerary.stations), [itinerary.stations]);

  const validSaved = saved?.itineraryId === itinerary.id;

  const initialIndex = validSaved ? saved.currentIndex : 0;
  const initialCompleted = validSaved ? saved.completed : [];

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [completed, setCompleted] = useState(initialCompleted);
  const [collectedObjects, setCollectedObjects] = useState(validSaved ? saved.collectedObjects || [] : []);
  const [riddleStep, setRiddleStep] = useState(validSaved ? saved.riddleStep || {} : {});
  const [riddleFails, setRiddleFails] = useState(validSaved ? saved.riddleFails || {} : {});
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAdult, setShowAdult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const {
    speakStory,
    speakGuardian,
    speakTreasure,
    speakFeedback,
    stopSpeaking,
    isSpeaking,
    isLoading,
    activeSource,
  } = useNarration(userName);

  const currentStation = stations[currentIndex];
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = completed.length;
  const totalCount = stations.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isLastStation = currentIndex >= totalCount - 1;

  useEffect(() => {
    saveProgress({ itineraryId: itinerary.id, currentIndex, completed, collectedObjects, riddleStep, riddleFails });
  }, [itinerary.id, currentIndex, completed, collectedObjects, riddleStep, riddleFails]);

  useEffect(() => {
    setAnswer('');
    setFeedback('');
    setShowHint(false);
    stopSpeaking();
  }, [currentStation.id]);

  async function announceFeedback(
    message,
    tone = 'success',
    { awaitSpeech = false, playTone = true, speak = true } = {}
  ) {
    setFeedback(message);
    if (playTone) {
      playSound(tone === 'error' ? FEEDBACK_SOUNDS.error : FEEDBACK_SOUNDS.success, 0.72);
    }
    if (speak) {
      const speech = speakFeedback(message);
      if (awaitSpeech) {
        await speech;
      }
    }
  }

  async function completeStation(message, finalObjects, options = {}) {
    const successMsg = message || currentStation.challenge.success;
    if (options.playRewardSound !== false) {
      playSound(currentStation.reward?.sound);
    }
    await announceFeedback(successMsg, 'success', {
      awaitSpeech: options.awaitSpeech ?? true,
      playTone: options.playTone ?? true,
      speak: options.speak ?? true,
    });

    if (isLastStation) {
      const objects = finalObjects || collectedObjects;
      setCompleted((prev) => {
        const next = completedSet.has(currentStation.id) ? prev : [...prev, currentStation.id];
        saveProgress({ itineraryId: itinerary.id, currentIndex, completed: next, collectedObjects: objects, riddleStep, riddleFails });
        return next;
      });
      onFinal(objects);
      return;
    }
    setCompleted((prev) =>
      completedSet.has(currentStation.id) ? prev : [...prev, currentStation.id]
    );
    setCurrentIndex((prev) => Math.min(prev + 1, totalCount - 1));
  }

  function skipStation() {
    const backup = currentStation.backupChallenge;
    completeStation(backup?.success || 'Estación saltada. La aventura continúa.', undefined, {
      playRewardSound: false,
      awaitSpeech: false,
      playTone: false,
      speak: false,
    });
  }

  function getCurrentStep() {
    return riddleStep[`${currentStation.id}_${getCurrentRiddleIndex()}`] || 0;
  }

  function getCurrentRiddleIndex() {
    return riddleStep[`${currentStation.id}_riddle`] || 0;
  }

  function getCurrentRiddle() {
    return getStationRiddles(currentStation)[getCurrentRiddleIndex()];
  }

  function getStepFails() {
    const key = `${currentStation.id}_${getCurrentRiddleIndex()}_${getCurrentStep()}`;
    return riddleFails[key] || 0;
  }

  async function handleChoiceAnswer(option) {
    const challenge = currentStation.challenge;
    setAnswer(option);
    if (challenge.answer === '*' || option === challenge.answer) {
      await completeStation(challenge.success);
    } else {
      void announceFeedback('Bravestone dice: prueba otra opción o mira bien la zona.', 'error', {
        awaitSpeech: false,
      });
    }
  }

  async function handleRiddleChoiceAnswer(option) {
    const riddle = getCurrentRiddle();
    if (!riddle) return;

    const stepIdx = getCurrentStep();
    const step = riddle.steps[stepIdx];
    if (!step) return;

    setAnswer(option);
    if (step.answer === '*' || option === step.answer) {
      await advanceRiddleStep(riddle, stepIdx);
    } else {
      const key = `${currentStation.id}_${getCurrentRiddleIndex()}_${stepIdx}`;
      const fails = (riddleFails[key] || 0) + 1;
      setRiddleFails((prev) => ({ ...prev, [key]: fails }));
      void announceFeedback(step.hint, 'error', { awaitSpeech: false });
    }
  }

  async function advanceRiddleStep(riddle, stepIdx) {
    if (stepIdx >= 2) {
      const newObjects = collectedObjects.includes(riddle.keyObject.id)
        ? collectedObjects
        : [...collectedObjects, riddle.keyObject.id];
      const nextRiddleIdx = getCurrentRiddleIndex() + 1;
      const riddles = getStationRiddles(currentStation);
      if (nextRiddleIdx < riddles.length) {
        await announceFeedback(
          `${riddle.finalSuccess} Siguiente acertijo: ${riddles[nextRiddleIdx].guardian.name}.`,
          'success',
          { awaitSpeech: true }
        );
        setCollectedObjects(newObjects);
        setRiddleStep((prev) => ({
          ...prev,
          [`${currentStation.id}_riddle`]: nextRiddleIdx,
          [`${currentStation.id}_${nextRiddleIdx}`]: 0,
        }));
        setAnswer('');
        setShowHint(false);
        return;
      }
      setCollectedObjects(newObjects);
      completeStation(riddle.finalSuccess, newObjects);
    } else {
      await announceFeedback('¡Fragmento recuperado!', 'success', { awaitSpeech: true });
      setRiddleStep((prev) => ({ ...prev, [`${currentStation.id}_${getCurrentRiddleIndex()}`]: stepIdx + 1 }));
      setAnswer('');
      setShowHint(false);
    }
  }

  async function handleAdultHelp() {
    const riddle = getCurrentRiddle();
    if (!riddle) return;
    const stepIdx = getCurrentStep();
    await advanceRiddleStep(riddle, stepIdx);
  }

  function hasAllTreasureObjects() {
    if (!currentStation.treasure) return false;
    return currentStation.treasure.requiredObjects.every((id) => collectedObjects.includes(id));
  }

  function isComplete() {
    return completedSet.has(currentStation.id);
  }

  const currentRiddles = getStationRiddles(currentStation);
  const currentRiddle = getCurrentRiddle();
  const currentRiddleIndex = getCurrentRiddleIndex();
  const challengeOptions = useMemo(() => {
    const options = currentStation.challenge?.options || [];
    if (!options.length) return [];
    return shuffleOptions(options, `${currentStation.id}:challenge`);
  }, [currentStation.id, currentStation.challenge]);
  const currentRiddleOptions = useMemo(
    () => (currentRiddle
      ? currentRiddle.steps.map((step, idx) => ({
        ...step,
        options: shuffleOptions(step.options, `${currentStation.id}:${currentRiddleIndex}:${idx}`),
      }))
      : []),
    [currentStation.id, currentRiddle, currentRiddleIndex],
  );

  return (
    <main className="app-shell">
      <section className="mission-panel" aria-labelledby="mission-title">
        <div className="mission-heading">
          <div>
            <p className="eyebrow">
              {itinerary.icon} {itinerary.title} · Completa
            </p>
            <h1 id="mission-title">{currentStation.title}</h1>
          </div>
          <div className="progress-dial" aria-label={`Progreso ${percent}%`}>
            <span>{percent}%</span>
          </div>
        </div>

        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${percent}%` }} />
        </div>

        <div className="station-layout">
          <aside className="route-list" aria-label="Ruta de estaciones">
            {stations.map((station, index) => {
              const isCompleted = completedSet.has(station.id);
              const isActive = index === currentIndex;
              const isLocked = !isCompleted && index > currentIndex;
              return (
                <button
                  className={`route-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                  key={station.id}
                  onClick={() => {
                    if (isLocked) return;
                    setCurrentIndex(index);
                    stopSpeaking();
                  }}
                  disabled={isLocked}
                  type="button"
                >
                  <span className="step-code">{station.id}</span>
                  <span>
                    <strong>{station.shortName}</strong>
                    <small>{isCompleted ? station.reward.name : station.area}</small>
                  </span>
                </button>
              );
            })}
          </aside>

          <article className="station-card" style={{ '--station-color': currentStation.color }}>
            <div className="station-topline">
              <span>{currentStation.area}</span>
              <span>{currentStation.duration}</span>
            </div>

            <p className="route-hint">{currentStation.routeHint}</p>

            <div className="story-box">
              <p>{renderStory(currentStation.story, userName)}</p>
              <button
                className="icon-button"
                type="button"
                onClick={() => isSpeaking && activeSource === 'story' ? stopSpeaking() : speakStory(currentStation.story)}
                disabled={isLoading}
              >
                {isSpeaking && activeSource === 'story' ? '⏸ Pausar voz' : '🔊 Escuchar a Bravestone'}
              </button>
            </div>

            {currentRiddle && !currentStation.isTreasure ? (
              <>
                <div className="guardian-banner">
                  <span className="guardian-icon">🧩</span>
                  <p className="guardian-intro">{currentRiddle.guardian.intro}</p>
                  <button
                    className="guardian-audio-btn"
                    type="button"
                    onClick={() => isSpeaking && activeSource === 'guardian' ? stopSpeaking() : speakGuardian(currentRiddle.guardian.intro)}
                    disabled={isLoading && activeSource !== 'guardian'}
                    aria-label="Escuchar guardián"
                  >
                    {isSpeaking && activeSource === 'guardian' ? '⏸' : '🔊'}
                  </button>
                </div>

                <div className="riddle-steps">
                  {currentRiddleOptions.map((step, idx) => {
                    const stepIdx = getCurrentStep();
                    const isActive = idx === stepIdx && !isComplete();
                    const isDone = idx < stepIdx || isComplete();
                    const failCount = idx === stepIdx ? getStepFails() : 0;
                    return (
                      <div
                        key={idx}
                        className={`riddle-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                      >
                        <div className="step-header">
                          <span className="step-icon">{isDone ? '✅' : isActive ? '🧩' : '🔒'}</span>
                          <span className="step-label">
                            Acertijo {currentRiddleIndex + 1}/{currentRiddles.length} · Fragmento {idx + 1}/3
                          </span>
                        </div>
                        {isActive && (
                          <>
                            <p className="step-text">{step.text}</p>
                            <div className="choice-grid">
                              {step.options.map((opt) => (
                                <button
                                  className={answer === opt ? 'selected' : ''}
                                  key={opt}
                                  onClick={() => void handleRiddleChoiceAnswer(opt)}
                                  type="button"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {failCount >= 3 && (
                              <button
                                type="button"
                                className="adult-help-button"
                                onClick={() => void handleAdultHelp()}
                              >
                                👤 Pedir ayuda a un adulto
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {feedback && <p className="feedback">{feedback}</p>}
              </>
            ) : currentStation.isTreasure ? (
              <>
                <div className="guardian-banner treasure-banner">
                  <span className="guardian-icon">
                    {currentStation.treasure.type === 'map' ? '🗺️' : '📽️'}
                  </span>
                  <h2>{currentStation.treasure.title}</h2>
                  <button
                    className="guardian-audio-btn"
                    type="button"
                    onClick={() => isSpeaking && activeSource === 'treasure' ? stopSpeaking() : speakTreasure(currentStation.treasure.title)}
                    disabled={isLoading && activeSource !== 'treasure'}
                    aria-label="Escuchar título del tesoro"
                  >
                    {isSpeaking && activeSource === 'treasure' ? '⏸' : '🔊'}
                  </button>
                </div>

                <div className="objects-collection">
                  <p>Tienes {collectedObjects.length} de {currentStation.treasure.requiredObjects.length} objetos:</p>
                  <div className="objects-grid">
                    {getItineraryKeyObjects(stations)
                      .map((keyObject) => {
                        const has = collectedObjects.includes(keyObject.id);
                        return (
                          <span
                            key={keyObject.id}
                            className={`object-chip ${has ? 'collected' : 'missing'}`}
                            title={keyObject.name}
                          >
                            {has ? keyObject.icon : '❓'}
                          </span>
                        );
                      })}
                  </div>
                </div>

                {hasAllTreasureObjects() ? (
                  <div className="challenge">
                    <label>{currentStation.challenge.prompt}</label>
                    <button className="primary-action" type="button" onClick={() => void completeStation(currentStation.challenge.success)}>
                      ✅ Revelar tesoro
                    </button>
                  </div>
                ) : (
                  <p className="missing-objects-note">
                    Sigue explorando para reunir todos los objetos.
                  </p>
                )}

                {feedback && <p className="feedback">{feedback}</p>}
              </>
            ) : (
              <div className="challenge">
                <label>{currentStation.challenge.prompt}</label>

                {(currentStation.challenge.type === 'choice' || currentStation.challenge.type === 'familyVote') && (
                  <div className="choice-grid">
                    {challengeOptions.map((option) => (
                      <button
                        className={answer === option ? 'selected' : ''}
                        key={option}
                        onClick={() => void handleChoiceAnswer(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentStation.challenge.type === 'confirm' && (
                  <button className="primary-action" type="button" onClick={() => void completeStation(currentStation.challenge.success)}>
                    ✅ Confirmar
                  </button>
                )}

                <div className="challenge-actions">
                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => setShowHint((h) => !h)}
                  >
                    💡 Necesito pista
                  </button>

                </div>
              </div>
            )}

            {showHint && currentStation.challenge.hint && !currentRiddle && (
              <p className="hint-bubble">💡 Pista: {currentStation.challenge.hint}</p>
            )}

            {feedback && !currentRiddle && !currentStation.isTreasure && (
              <p className="feedback">{feedback}</p>
            )}

            <div className="crystal-strip" aria-label="Cristales recuperados">
              {stations.map((station) => (
                <span
                  className={completedSet.has(station.id) ? 'lit' : ''}
                  key={station.id}
                  style={{ '--crystal-color': station.reward.color }}
                  title={station.reward.name}
                />
              ))}
            </div>

            {collectedObjects.length > 0 && (
              <div className="inventory-strip" aria-label="Objetos recolectados">
                {getItineraryKeyObjects(stations)
                  .map((keyObject) => {
                    const has = collectedObjects.includes(keyObject.id);
                    return (
                      <span
                        key={keyObject.id}
                        className={`inv-item ${has ? 'collected' : ''}`}
                        title={keyObject.name}
                      >
                        {has ? keyObject.icon : '○'}
                      </span>
                    );
                  })}
              </div>
            )}
          </article>
        </div>

        <footer className="mission-footer">
          <span>
            {completedCount === totalCount
              ? '🎉 ¡Misión completa!'
              : `💎 ${completedCount} de ${totalCount} cristales`}
          </span>
          {collectedObjects.length > 0 && (
            <span>
              🧩 {collectedObjects.length} objetos
            </span>
          )}
          <button
            type="button"
            className="adult-toggle"
            onClick={() => setShowAdult((a) => !a)}
          >
            👤 {showAdult ? 'Ocultar adulto' : 'Modo adulto'}
          </button>
        </footer>

        {showAdult && (
          <aside className="adult-panel">
            <p>
              <strong>Ruta:</strong> Completa ·{' '}
              {itinerary.title}
            </p>
            <p>
              <strong>Adulto:</strong> {currentStation.adultHint || 'Sin indicaciones adicionales.'}
            </p>
            <div className="adult-grid">
              <button type="button" onClick={skipStation}>
                ⏭ Saltar estación
              </button>
              <button type="button" onClick={() => window.print()}>
                🖨 Imprimir
              </button>
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  saveProgress({ itineraryId: itinerary.id, currentIndex: 0, completed: [] });
                  onReset();
                }}
              >
                🔄 Nueva misión
              </button>
            </div>
          </aside>
        )}
      </section>
    </main>
  );
}

function App() {
  const saved = loadProgress();
  const isValid = saved && itineraries[saved.itineraryId];
  const [phase, setPhase] = useState(saved && isValid ? 'adventure' : 'lobby');
  const [itinerary, setItinerary] = useState(isValid ? itineraries[saved.itineraryId] : null);
  const [userName, setUserName] = useState(saved?.userName || '');
  const [finalObjects, setFinalObjects] = useState([]);

  function handleStart(name, itId) {
    setFinalObjects([]);
    setUserName(name);
    setItinerary(itineraries[itId]);
    setPhase('adventure');
  }

  function handleFinal(objects) {
    setFinalObjects(objects || []);
    setPhase('final');
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    setFinalObjects([]);
    setPhase('lobby');
    setItinerary(null);
    setUserName('');
  }

  if (phase === 'lobby') {
    return <Lobby onStart={handleStart} />;
  }

  if (phase === 'final') {
    return (
      <FinalScreen
        itinerary={itinerary}
        userName={userName}
        collectedObjects={finalObjects}
        onReset={handleReset}
      />
    );
  }

  return (
    <Adventure
      itinerary={itinerary}
      userName={userName}
      onFinal={handleFinal}
      onReset={handleReset}
    />
  );
}

export default App;
