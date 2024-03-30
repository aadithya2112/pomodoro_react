import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [isFocusSession, setIsFocusSession] = useState(true);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [editTime, setEditTime] = useState(false);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newSeconds, setNewSeconds] = useState(seconds);
  const [newBreakMinutes, setNewBreakMinutes] = useState(breakMinutes);
  const [newBreakSeconds, setNewBreakSeconds] = useState(breakSeconds);
  const [progress, setProgress] = useState(0); // Start at 0%

  const handleEditTime = () => {
    setEditTime(true);
  };

  const handleSaveTime = () => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setBreakMinutes(newBreakMinutes);
    setBreakSeconds(newBreakSeconds);
    setEditTime(false);
  };

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setSeconds(59);
          setMinutes((prevMinutes) => prevMinutes - 1);
        } else {
          // Timer reached 0
          if (isFocusSession) {
            // Switch to Break timer
            setMinutes(breakMinutes);
            setSeconds(breakSeconds);
            setIsFocusSession(false);
          } else {
            // Switch to Focus timer
            setMinutes(newMinutes);
            setSeconds(newSeconds);
            setIsFocusSession(true);
          }
        }

        // Calculate progress
        const totalSeconds = isFocusSession
          ? newMinutes * 60 + newSeconds
          : newBreakMinutes * 60 + newBreakSeconds;
        const remainingSeconds = minutes * 60 + seconds;
        const calculatedProgress =
          ((totalSeconds - remainingSeconds) / totalSeconds) * 100; // Calculate progress as percentage
        setProgress(calculatedProgress);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [
    start,
    seconds,
    minutes,
    isFocusSession,
    breakMinutes,
    breakSeconds,
    newMinutes,
    newSeconds,
  ]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const handleReset = () => {
    setStart(false);
    setMinutes(25);
    setSeconds(0);
    setIsFocusSession(true);
    setProgress(0);
  };

  return (
    <>
      <div className="container">
        {!start && (
          <div className="starting-container">
            <div className="pomodoro">
              <div className="timer">
                {timerMinutes}:{timerSeconds}
              </div>
              <progress value={progress} max="100"></progress>
            </div>
            <button className="start-button" onClick={handleStart}>
              Start
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button className="edit-button" onClick={handleEditTime}>
              Edit Time
            </button>
          </div>
        )}
        {editTime && (
          <div className="modal">
            <div className="modal-content">
              <div className="edit-time">
                <div className="edit-inputs">
                  <label htmlFor="" className="duration-label">
                    Focus Duration
                  </label>
                  <input
                    type="number"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(e.target.value)}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    value={newSeconds}
                    onChange={(e) => setNewSeconds(e.target.value)}
                  />
                </div>
                <div className="edit-inputs">
                  <label htmlFor="" className="duration-label">
                    Break Duration
                  </label>
                  <input
                    type="number"
                    value={newBreakMinutes}
                    onChange={(e) => setNewBreakMinutes(e.target.value)}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    value={newBreakSeconds}
                    onChange={(e) => setNewBreakSeconds(e.target.value)}
                  />
                </div>
                <button className="save-button" onClick={handleSaveTime}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {start && (
          <div className="pomodoro">
            <div className="message">
              {!isFocusSession && (
                <div className="">Break time! New session starts in </div>
              )}
            </div>
            <progress value={progress} max="100"></progress>
            <div className="timer">
              {timerMinutes}:{timerSeconds}
            </div>

            <button className="stop-button start-button" onClick={handleStop}>
              Stop
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
