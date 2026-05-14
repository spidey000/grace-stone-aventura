import { useEffect, useMemo, useState, useCallback } from 'react';
import { itineraries, modeLabels, filterStationsByMode } from './data/stations.js';

const STORAGE_KEY = 'grace-stone-progress-v3';

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

function useNarration(userName) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const speak = useCallback(
    async (story) => {
      const resolved = renderStory(story, userName);
      setIsLoading(true);
      setIsSpeaking(true);

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(resolved);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.pitch = 1.08;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsLoading(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsLoading(false);
      };
      window.speechSynthesis.speak(utterance);
    },
    [userName]
  );

  function stop() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsLoading(false);
  }

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  return { speakStory: speak, stopSpeaking: stop, isSpeaking, isLoading };
}

function Lobby({ onStart }) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('normal');
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
    onStart(trimmed, selected, mode);
  }

  return (
    <main className="app-shell lobby-shell">
      <div className="lobby-card">
        <header className="lobby-header">
          <span className="lobby-eyebrow">Audio-aventura guiada</span>
          <h1>La Aventura de Grace Stone</h1>
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

          <p className="section-label">Elige tu misión</p>
          <div className="mode-cards">
            {Object.entries(modeLabels).map(([key, m]) => (
              <button
                key={key}
                type="button"
                className={`mode-card ${mode === key ? 'selected' : ''}`}
                onClick={() => setMode(key)}
              >
                <span className="mode-emoji">{m.emoji}</span>
                <strong>{m.label}</strong>
                <small>{m.desc}</small>
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

function FinalScreen({ itinerary, userName, modeLabel, collectedObjects, onReset }) {
  const isOceanografic = itinerary.id === 'oceanografic';
  const title = isOceanografic ? 'Explorador Honorífico del Océano' : 'Científico Honorífico';
  const tagline = isOceanografic
    ? 'El océano necesita exploradores valientes como tú.'
    : 'La ciencia necesita mentes curiosas como la tuya.';

  return (
    <main className="app-shell final-shell">
      <div className="final-card">
        <span className="final-badge">{itinerary.icon}</span>
        <h1>¡{userName}, misión {modeLabel} completada!</h1>
        <p>
          {isOceanografic
            ? 'Has cruzado el Oceanogràfic con valentía y curiosidad. Has visto tiburones sin huesos, belugas blancas como el hielo y pingüinos que vuelan bajo el agua. El océano entero te ha visto y está orgulloso.'
            : 'Has explorado el Museu de les Ciències con tus manos, tus ojos y tu curiosidad. Has visto el péndulo que prueba que la Tierra gira y has descifrado el código de la vida. La ciencia te necesita.'}
        </p>

        {collectedObjects.length > 0 && (
          <div className="final-objects">
            <p><strong>Objetos recolectados:</strong></p>
            <div className="objects-grid">
              {itinerary.stations
                .filter((s) => s.riddle?.keyObject)
                .map((s) => {
                  const has = collectedObjects.includes(s.riddle.keyObject.id);
                  return (
                    <span
                      key={s.id}
                      className={`object-chip ${has ? 'collected' : 'missing'}`}
                      title={s.riddle.keyObject.name}
                    >
                      {has ? s.riddle.keyObject.icon : '❓'} {has && s.riddle.keyObject.name}
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
          — Grace Stone
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

function Adventure({ itinerary, userName, mode, onFinal, onReset }) {
  const saved = loadProgress();
  const stations = useMemo(() => filterStationsByMode(itinerary.stations, mode), [itinerary.stations, mode]);

  const validSaved =
    saved?.itineraryId === itinerary.id &&
    saved?.mode === mode;

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

  const { speakStory, stopSpeaking, isSpeaking, isLoading } = useNarration(userName);

  const currentStation = stations[currentIndex];
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = completed.length;
  const totalCount = stations.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isLastStation = currentIndex >= totalCount - 1;

  useEffect(() => {
    saveProgress({ itineraryId: itinerary.id, mode, currentIndex, completed, collectedObjects, riddleStep, riddleFails });
  }, [itinerary.id, mode, currentIndex, completed, collectedObjects, riddleStep, riddleFails]);

  useEffect(() => {
    setAnswer('');
    setFeedback('');
    setShowHint(false);
    stopSpeaking();
  }, [currentStation.id]);

  function completeStation(message, finalObjects) {
    const successMsg = message || currentStation.challenge.success;
    if (isLastStation) {
      const objects = finalObjects || collectedObjects;
      setCompleted((prev) => {
        const next = completedSet.has(currentStation.id) ? prev : [...prev, currentStation.id];
        saveProgress({ itineraryId: itinerary.id, mode, currentIndex, completed: next, collectedObjects: objects, riddleStep, riddleFails });
        return next;
      });
      onFinal(objects);
      return;
    }
    setCompleted((prev) =>
      completedSet.has(currentStation.id) ? prev : [...prev, currentStation.id]
    );
    setCurrentIndex((prev) => Math.min(prev + 1, totalCount - 1));
    setFeedback(successMsg);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = currentStation.challenge;

    if (challenge.type === 'confirm') {
      completeStation();
      return;
    }

    if (challenge.type === 'choice') {
      if (challenge.answer === '*') {
        completeStation();
        return;
      }
      if (answer === challenge.answer) {
        completeStation();
      } else {
        setFeedback('Grace dice: prueba otra opción o mira bien la zona.');
      }
      return;
    }

    if (challenge.type === 'text') {
      const normalized = answer.trim().toLowerCase();
      const accepted = (challenge.acceptedAnswers || []).map((a) => a.trim().toLowerCase());
      if (accepted.includes(normalized) || challenge.answer === '*') {
        completeStation();
      } else {
        setFeedback('Grace dice: prueba con otra palabra o mira los carteles.');
      }
    }
  }

  function skipStation() {
    const backup = currentStation.backupChallenge;
    completeStation(backup?.success || 'Estación saltada. La aventura continúa.');
  }

  function getCurrentStep() {
    return riddleStep[currentStation.id] || 0;
  }

  function getStepFails() {
    const key = `${currentStation.id}_${getCurrentStep()}`;
    return riddleFails[key] || 0;
  }

  function handleRiddleAnswer(event) {
    event.preventDefault();
    const riddle = currentStation.riddle;
    if (!riddle) return;

    const stepIdx = getCurrentStep();
    const step = riddle.steps[stepIdx];
    if (!step) return;

    if (step.answer === '*') {
      advanceRiddleStep(riddle, stepIdx);
      return;
    }
    if (answer === step.answer) {
      advanceRiddleStep(riddle, stepIdx);
    } else {
      const key = `${currentStation.id}_${stepIdx}`;
      const fails = (riddleFails[key] || 0) + 1;
      setRiddleFails((prev) => ({ ...prev, [key]: fails }));
      setFeedback(step.hint);
    }
  }

  function advanceRiddleStep(riddle, stepIdx) {
    if (stepIdx >= 2) {
      const newObjects = collectedObjects.includes(riddle.keyObject.id)
        ? collectedObjects
        : [...collectedObjects, riddle.keyObject.id];
      setCollectedObjects(newObjects);
      completeStation(riddle.finalSuccess, newObjects);
    } else {
      setRiddleStep((prev) => ({ ...prev, [currentStation.id]: stepIdx + 1 }));
      setFeedback('¡Fragmento recuperado!');
      setAnswer('');
      setShowHint(false);
    }
  }

  function handleAdultHelp() {
    const riddle = currentStation.riddle;
    if (!riddle) return;
    const stepIdx = getCurrentStep();
    advanceRiddleStep(riddle, stepIdx);
  }

  function hasAllTreasureObjects() {
    if (!currentStation.treasure) return false;
    return currentStation.treasure.requiredObjects.every((id) => collectedObjects.includes(id));
  }

  function isComplete() {
    return completedSet.has(currentStation.id);
  }

  return (
    <main className="app-shell">
      <section className="mission-panel" aria-labelledby="mission-title">
        <div className="mission-heading">
          <div>
            <p className="eyebrow">
              {itinerary.icon} {itinerary.title} ·{' '}
              {modeLabels[mode]?.label || 'Normal'}
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
              return (
                <button
                  className={`route-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  key={station.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    stopSpeaking();
                  }}
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
                onClick={() => speakStory(currentStation.story)}
                disabled={isLoading}
              >
                {isSpeaking ? '⏸ Pausar voz' : '🔊 Escuchar a Grace'}
              </button>
            </div>

            {currentStation.riddle && !currentStation.isTreasure ? (
              <>
                <div className="guardian-banner">
                  <span className="guardian-icon">🧩</span>
                  <p className="guardian-intro">{currentStation.riddle.guardian.intro}</p>
                </div>

                <div className="riddle-steps">
                  {currentStation.riddle.steps.map((step, idx) => {
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
                          <span className="step-label">Fragmento {idx + 1}/3</span>
                        </div>
                        {isActive && (
                          <>
                            <p className="step-text">{step.text}</p>
                            <div className="choice-grid">
                              {step.options.map((opt) => (
                                <button
                                  className={answer === opt ? 'selected' : ''}
                                  key={opt}
                                  onClick={() => setAnswer(opt)}
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
                                onClick={handleAdultHelp}
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

                <button className="primary-action" type="button" onClick={handleRiddleAnswer}>
                  📨 Enviar a Grace
                </button>

                <button type="button" className="ghost-button skip" onClick={skipStation}>
                  ⏭ Saltar
                </button>

                {feedback && <p className="feedback">{feedback}</p>}
              </>
            ) : currentStation.isTreasure ? (
              <>
                <div className="guardian-banner treasure-banner">
                  <span className="guardian-icon">
                    {currentStation.treasure.type === 'map' ? '🗺️' : '📽️'}
                  </span>
                  <h2>{currentStation.treasure.title}</h2>
                </div>

                <div className="objects-collection">
                  <p>Tienes {collectedObjects.length} de {currentStation.treasure.requiredObjects.length} objetos:</p>
                  <div className="objects-grid">
                    {stations
                      .filter((s) => s.riddle?.keyObject)
                      .map((s) => {
                        const has = collectedObjects.includes(s.riddle.keyObject.id);
                        return (
                          <span
                            key={s.id}
                            className={`object-chip ${has ? 'collected' : 'missing'}`}
                            title={s.riddle.keyObject.name}
                          >
                            {has ? s.riddle.keyObject.icon : '❓'}
                          </span>
                        );
                      })}
                  </div>
                </div>

                {hasAllTreasureObjects() ? (
                  <form className="challenge" onSubmit={handleSubmit}>
                    <label>{currentStation.challenge.prompt}</label>
                    <button className="primary-action" type="submit">
                      ✅ {currentStation.challenge.type === 'confirm' ? 'Revelar tesoro' : 'Confirmar'}
                    </button>
                  </form>
                ) : (
                  <p className="missing-objects-note">
                    Sigue explorando para reunir todos los objetos.
                  </p>
                )}

                {feedback && <p className="feedback">{feedback}</p>}
              </>
            ) : (
              <form className="challenge" onSubmit={handleSubmit}>
                <label>{currentStation.challenge.prompt}</label>

                {currentStation.challenge.type === 'choice' && (
                  <div className="choice-grid">
                    {currentStation.challenge.options.map((option) => (
                      <button
                        className={answer === option ? 'selected' : ''}
                        key={option}
                        onClick={() => setAnswer(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <div className="challenge-actions">
                  <button className="primary-action" type="submit">
                    {currentStation.challenge.type === 'confirm'
                      ? '✅ Confirmar'
                      : '📨 Enviar a Grace'}
                  </button>

                  <button
                    type="button"
                    className="ghost-button"
                    onClick={() => setShowHint((h) => !h)}
                  >
                    💡 Necesito pista
                  </button>

                  <button type="button" className="ghost-button skip" onClick={skipStation}>
                    ⏭ Saltar
                  </button>
                </div>
              </form>
            )}

            {showHint && currentStation.challenge.hint && !currentStation.riddle && (
              <p className="hint-bubble">💡 Pista: {currentStation.challenge.hint}</p>
            )}

            {feedback && !currentStation.riddle && !currentStation.isTreasure && (
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
                {stations
                  .filter((s) => s.riddle?.keyObject)
                  .map((s) => {
                    const has = collectedObjects.includes(s.riddle.keyObject.id);
                    return (
                      <span
                        key={s.id}
                        className={`inv-item ${has ? 'collected' : ''}`}
                        title={s.riddle.keyObject.name}
                      >
                        {has ? s.riddle.keyObject.icon : '○'}
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
              <strong>Ruta:</strong> {modeLabels[mode]?.label} ·{' '}
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
                  saveProgress({ itineraryId: itinerary.id, mode, currentIndex: 0, completed: [] });
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
  const [mode, setMode] = useState(saved?.mode || 'normal');

  function handleStart(name, itId, m) {
    setFinalObjects([]);
    setUserName(name);
    setItinerary(itineraries[itId]);
    setMode(m);
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

  const [finalObjects, setFinalObjects] = useState([]);

  function handleFinal(objects) {
    setFinalObjects(objects || []);
    setPhase('final');
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
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
        modeLabel={modeLabels[mode]?.label || ''}
        collectedObjects={finalObjects}
        onReset={handleReset}
      />
    );
  }

  return (
    <Adventure
      itinerary={itinerary}
      userName={userName}
      mode={mode}
      onFinal={handleFinal}
      onReset={handleReset}
    />
  );
}

export default App;