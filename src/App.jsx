import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false); // Added stop state
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [start, seconds, minutes, displayMessage]);

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
            </div>
          </>
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
