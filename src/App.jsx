import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false); // Added stop state
  const [minutes, setMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5); // Added breakMinutes state
  const [breakSeconds, setBreakSeconds] = useState(0); // Added breakSeconds state
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newSeconds, setNewSeconds] = useState(seconds);
  const [newBreakMinutes, setNewBreakMinutes] = useState(breakMinutes); // Added newBreakMinutes state
  const [newBreakSeconds, setNewBreakSeconds] = useState(breakSeconds); // Added newBreakSeconds state

  const handleEditTime = () => {
    setEditTime(true);
  };

  const handleSaveTime = () => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setEditTime(false);
  };

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (!displayMessage) {
              setDisplayMessage(true);
              setMinutes(breakMinutes);
              setSeconds(breakSeconds);
            } else {
              setDisplayMessage(false);
              setMinutes(newMinutes);
              setSeconds(newSeconds);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!start) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    start,
    seconds,
    minutes,
    displayMessage,
    breakMinutes,
    breakSeconds,
    stop,
  ]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleStart = () => {
    setStart(true);
    setStop(false);
  };

  const handleStop = () => {
    setStart(false);
    setStop(true);
  };

  const handleReset = () => {
    setStart(false);
    setStop(false);
    setMinutes(25);
    setSeconds(0);
    setDisplayMessage(false);
  };

  return (
    <>
      <div className="container">
        {!start && (
          <>
            <div className="starting-container">
              <div className="pomodoro">
                <div className="timer">
                  {timerMinutes}:{timerSeconds}
                </div>
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
          </>
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
                    onChange={(e) => setBreakMinutes(e.target.value)}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    value={newBreakSeconds}
                    onChange={(e) => setBreakSeconds(e.target.value)}
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
              {displayMessage && (
                <div className="">Break time! New session starts in </div>
              )}
            </div>
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
