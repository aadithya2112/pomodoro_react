import React, { useState, useEffect } from "react";
import "./App.css";
import TimerComponent from "./components/TimerComponent";
import ProgressBarComponent from "./components/ProgressBarComponent";
import ControlsComponent from "./components/ControlsComponent";
import SessionCounterComponent from "./components/SessionCounterComponent";
import HistoricalDataPopup from "./components/HistoricalDataPopup";

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
  const [sessionCount, setSessionCount] = useState(0); // Session counter
  const [historicalData, setHistoricalData] = useState([]);
  const [showHistoricalData, setShowHistoricalData] = useState(false);

  // Load historical data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("pomodoroHistoricalData");
    if (storedData) {
      setHistoricalData(JSON.parse(storedData));
    }
  }, []);

  // Save historical data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "pomodoroHistoricalData",
      JSON.stringify(historicalData)
    );
  }, [historicalData]);

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

  const handleShowHistoricalData = () => {
    setShowHistoricalData(true);
  };

  const handleCloseHistoricalData = () => {
    setShowHistoricalData(false);
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

            // Increment session count
            setSessionCount((prevCount) => prevCount + 1);

            // Add session to historical data
            const newSession = {
              type: isFocusSession ? "Focus" : "Break",
              duration: isFocusSession
                ? `${newMinutes}:${newSeconds}`
                : `${newBreakMinutes}:${newBreakSeconds}`,
              timestamp: new Date().toLocaleString(),
            };
            setHistoricalData((prevData) => [...prevData, newSession]);
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
            <TimerComponent minutes={minutes} seconds={seconds} />
            <ProgressBarComponent progress={progress} />
            <ControlsComponent
              isRunning={start}
              handleStart={handleStart}
              handleStop={handleStop}
              handleReset={handleReset}
              handleEditTime={handleEditTime}
            />
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
            <ProgressBarComponent progress={progress} />
            <TimerComponent minutes={minutes} seconds={seconds} />
            <SessionCounterComponent sessionCount={sessionCount} />
            <ControlsComponent
              isRunning={start}
              handleStop={handleStop}
              handleReset={handleReset}
              handleEditTime={handleEditTime}
            />
          </div>
        )}
      </div>
      {showHistoricalData && (
        <HistoricalDataPopup
          historicalData={historicalData}
          onClose={handleCloseHistoricalData}
        />
      )}
      <button
        className="historical-data-button"
        onClick={handleShowHistoricalData}
      >
        Historical Data
      </button>
    </>
  );
}

export default App;
