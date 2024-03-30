import React from "react";

function ControlsComponent({
  isRunning,
  handleStart,
  handleStop,
  handleReset,
  handleEditTime,
}) {
  return (
    <div className="controls">
      {!isRunning && (
        <>
          <button className="start-button" onClick={handleStart}>
            Start
          </button>
          <button className="edit-button" onClick={handleEditTime}>
            Edit Time
          </button>
        </>
      )}
      {isRunning && (
        <>
          <button className="stop-button" onClick={handleStop}>
            Stop
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </>
      )}
    </div>
  );
}

export default ControlsComponent;
