import React from "react";

function SessionCounterComponent({ sessionCount }) {
  return (
    <div className="session-count">Sessions completed: {sessionCount}</div>
  );
}

export default SessionCounterComponent;
