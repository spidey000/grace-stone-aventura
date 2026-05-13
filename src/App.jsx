import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { itineraries } from './data/stations.js';

const STORAGE_KEY = 'grace-stone-progress-v2';

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

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function useNarration(userName) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioCtxRef = useRef(null);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  const speakStory = useCallback(
    async (story) => {
      const resolved = story.replace('{username}', userName || 'Explorador');
      setIsLoading(true);
      setIsSpeaking(true);

      const hasUsername = story.includes('{username}');

      if (!hasUsername) {
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
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        return;
      }

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

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsLoading(false);
  }

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return { speakStory, stopSpeaking, isSpeaking, isLoading };
}

function Lobby({ onStart }) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  function handleStart() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Escribe tu nombre para empezar la aventura.');
      return;
    }
    if (!selected) {
      setError('Elige un itinerario para empezar.');
      return;
    }
    onStart(trimmed, selected);
  }

  return (
    <main className="app-shell lobby-shell">
      <div className="lobby-card">
        <header className="lobby-header">
          <span className="lobby-eyebrow">Audio-aventura guiada</span>
          <h1>La Aventura de Grace Stone</h1>
          <p>Elige tu misión y empieza a explorar</p>
        </header>

        <div className="lobby-form">
          <label htmlFor="name-input">¿Cómo te llamas, explorador?</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Tu nombre"
            autoComplete="off"
            autoFocus
          />

          <p className="itinerary-label">¿Adónde vamos hoy?</p>

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
                <span className="it-duration">{it.durationLabel}</span>
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

function FinalScreen({ itinerary, userName, onReset }) {
  const isOceanografic = itinerary.id === 'oceanografic';
  const isMuseu = itinerary.id === 'museu';
  const insigTitle = isOceanografic ? 'Explorador Honorífico' : 'Científico Honorífico';

  return (
    <main className="app-shell final-shell">
      <div className="final-card">
        <span className="final-badge">{itinerary.icon}</span>
        <h1>¡{userName}, mission completada!</h1>
        <p>
          {isOceanografic
            ? 'Has navegado por el acuario más grande de Europa. Has encontrado tiburones, belugas, pingüinos y leones marinos. El océano te ha visto.'
            : 'Has explorado el museo de ciencias más interactivo de Valencia. Has experimentado con los sentidos, observado el péndulo y descifrado el código de la vida. La ciencia te ha visto.'}
        </p>
        <div className="final-insig" style={{ '--it-color': itinerary.color }}>
          <strong>{insigTitle}</strong>
          <span>{userName}</span>
        </div>
        <p className="final-tagline">
          {isOceanografic
            ? 'El océano necesita exploradores valientes como tú.'
            : 'La ciencia necesita mentes curiosas como la tuya.'}
        </p>
        <button type="button" className="start-button" onClick={onReset}>
          Nueva aventura
        </button>
      </div>
    </main>
  );
}

function Adventure({ itinerary, userName, onFinal, onReset }) {
  const saved = loadProgress();
  const initialIndex = saved?.itineraryId === itinerary.id ? saved.currentIndex : 0;
  const initialCompleted = saved?.itineraryId === itinerary.id ? saved.completed : [];

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [completed, setCompleted] = useState(initialCompleted);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const { speakStory, stopSpeaking, isSpeaking, isLoading } = useNarration(userName);

  const stations = itinerary.stations;
  const currentStation = stations[currentIndex];
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = completed.length;
  const totalCount = stations.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isLastStation = currentIndex >= totalCount - 1;

  useEffect(() => {
    saveProgress({ itineraryId: itinerary.id, currentIndex, completed });
  }, [itinerary.id, currentIndex, completed]);

  useEffect(() => {
    setAnswer('');
    setFeedback('');
    stopSpeaking();
  }, [currentStation.id]);

  function completeStation(message) {
    const successMsg = message || currentStation.challenge.success;
    if (isLastStation) {
      setCompleted((prev) => {
        const next = completedSet.has(currentStation.id) ? prev : [...prev, currentStation.id];
        saveProgress({ itineraryId: itinerary.id, currentIndex, completed: next });
        return next;
      });
      onFinal();
      return;
    }
    const next = completedSet.has(currentStation.id) ? completed : [...completed, currentStation.id];
    const nextIdx = currentIndex + 1;
    setCompleted(next);
    setCurrentIndex(nextIdx);
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
      if (answer === challenge.answer) {
        completeStation();
      } else {
        setFeedback('Grace dice: observa otra vez con calma. La pista está cerca.');
      }
      return;
    }

    if (challenge.type === 'text') {
      const normalized = normalizeAnswer(answer);
      const accepted = challenge.acceptedAnswers.map(normalizeAnswer);
      if (accepted.includes(normalized)) {
        completeStation();
      } else {
        setFeedback('Grace dice: prueba con otra palabra o revisa el cartel.');
      }
    }
  }

  function goToStation(index) {
    setCurrentIndex(index);
    stopSpeaking();
  }

  function resetMission() {
    stopSpeaking();
    saveProgress({ itineraryId: itinerary.id, currentIndex: 0, completed: [] });
    onReset();
  }

  return (
    <main className="app-shell">
      <section className="mission-panel" aria-labelledby="mission-title">
        <div className="mission-heading">
          <div>
            <p className="eyebrow">{itinerary.icon} {itinerary.title}</p>
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
                  onClick={() => goToStation(index)}
                  type="button"
                >
                  <span className="step-code">{station.id}</span>
                  <span>
                    <strong>{station.shortName}</strong>
                    <small>{isCompleted ? station.crystal : station.area}</small>
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
              <p>{currentStation.story.replace('{username}', userName)}</p>
              <button
                className="icon-button"
                type="button"
                onClick={() => speakStory(currentStation.story)}
                disabled={isLoading}
              >
                {isSpeaking ? '⏸ Pausar' : '🔊 Escuchar a Grace'}
              </button>
            </div>

            <form className="challenge" onSubmit={handleSubmit}>
              <label>{currentStation.challenge.prompt}</label>

              {currentStation.challenge.type === 'text' && (
                <input
                  autoComplete="off"
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Respuesta"
                  value={answer}
                />
              )}

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

              <button className="primary-action" type="submit">
                {currentStation.challenge.type === 'confirm'
                  ? 'Confirmar pista'
                  : 'Enviar a Grace'}
              </button>
            </form>

            {feedback && <p className="feedback">{feedback}</p>}

            <div className="crystal-strip" aria-label="Cristales recuperados">
              {stations.map((station) => (
                <span
                  className={completedSet.has(station.id) ? 'lit' : ''}
                  key={station.id}
                  style={{ '--crystal-color': station.color }}
                  title={station.crystal}
                />
              ))}
            </div>
          </article>
        </div>

        <footer className="mission-footer">
          <span>
            {completedCount === totalCount
              ? '¡Misión completa!'
              : `${completedCount} de ${totalCount} cristales`}
          </span>
          <button type="button" onClick={resetMission}>
            Reiniciar misión
          </button>
        </footer>
      </section>
    </main>
  );
}

function App() {
  const saved = loadProgress();
  const [phase, setPhase] = useState(saved ? 'adventure' : 'lobby');
  const [itinerary, setItinerary] = useState(
    saved ? itineraries[saved.itineraryId] : null
  );
  const [userName, setUserName] = useState(saved?.userName || '');

  function handleStart(name, itId) {
    setUserName(name);
    setItinerary(itineraries[itId]);
    setPhase('adventure');
  }

  function handleFinal() {
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