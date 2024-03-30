import React from "react";

function ProgressBarComponent({ progress }) {
  return (
    <div className="progress-container">
      <progress value={progress} max="100"></progress>
    </div>
  );
}

export default ProgressBarComponent;
