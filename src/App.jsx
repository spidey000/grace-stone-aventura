import { useEffect, useMemo, useState } from 'react';
import { adventure, stations } from './data/stations.js';

const STORAGE_KEY = 'grace-stone-progress-v1';

function loadProgress() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return { currentIndex: 0, completed: [] };

    const parsed = JSON.parse(saved);
    return {
      currentIndex: Number.isInteger(parsed.currentIndex) ? parsed.currentIndex : 0,
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
    };
  } catch {
    return { currentIndex: 0, completed: [] };
  }
}

function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentIndex = Math.min(progress.currentIndex, stations.length - 1);
  const currentStation = stations[currentIndex];
  const completedSet = useMemo(() => new Set(progress.completed), [progress.completed]);
  const completedCount = progress.completed.length;
  const percent = Math.round((completedCount / stations.length) * 100);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    setAnswer('');
    setFeedback('');
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, [currentStation.id]);

  function completeStation(message = currentStation.challenge.success) {
    const completed = completedSet.has(currentStation.id)
      ? progress.completed
      : [...progress.completed, currentStation.id];
    const nextIndex = Math.min(currentIndex + 1, stations.length - 1);

    setProgress({ currentIndex: nextIndex, completed });
    setFeedback(message);
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
    setProgress((current) => ({ ...current, currentIndex: index }));
  }

  function resetMission() {
    window.speechSynthesis?.cancel();
    setProgress({ currentIndex: 0, completed: [] });
  }

  function speakStory() {
    if (!('speechSynthesis' in window)) {
      setFeedback('Este navegador no tiene lectura de voz integrada.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentStation.story);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.pitch = 1.08;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  const isComplete = completedCount === stations.length;

  return (
    <main className="app-shell">
      <section className="mission-panel" aria-labelledby="mission-title">
        <div className="mission-heading">
          <div>
            <p className="eyebrow">Audio-aventura guiada</p>
            <h1 id="mission-title">{adventure.title}</h1>
            <p>{adventure.subtitle}</p>
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
              const completed = completedSet.has(station.id);
              const active = index === currentIndex;

              return (
                <button
                  className={`route-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
                  key={station.id}
                  onClick={() => goToStation(index)}
                  type="button"
                >
                  <span className="step-code">{station.id}</span>
                  <span>
                    <strong>{station.shortName}</strong>
                    <small>{completed ? station.crystal : station.area}</small>
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

            <h2>{currentStation.title}</h2>
            <p className="route-hint">{currentStation.routeHint}</p>

            <div className="story-box">
              <p>{currentStation.story}</p>
              <button className="icon-button" type="button" onClick={speakStory}>
                {isSpeaking ? 'Pausar voz' : 'Escuchar a Grace'}
              </button>
            </div>

            <form className="challenge" onSubmit={handleSubmit}>
              <label>{currentStation.challenge.prompt}</label>

              {currentStation.challenge.type === 'text' && (
                <input
                  autoComplete="off"
                  onChange={(event) => setAnswer(event.target.value)}
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
                {currentStation.challenge.type === 'confirm' ? 'Confirmar pista' : 'Enviar a Grace'}
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
          <span>{isComplete ? 'Misión completa' : `${completedCount} de ${stations.length} cristales`}</span>
          <button type="button" onClick={resetMission}>
            Reiniciar misión
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;

