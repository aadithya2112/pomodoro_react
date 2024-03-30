import React from "react";

function TimerComponent({ minutes, seconds }) {
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="timer-container">
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
}

export default TimerComponent;
