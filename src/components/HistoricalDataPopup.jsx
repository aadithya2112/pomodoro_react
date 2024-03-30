import React from "react";

function HistoricalDataPopup({ historicalData, onClose }) {
  return (
    <div className="historical-data-popup">
      <div className="historical-data-content">
        <h2>Historical Data</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <ul>
          {historicalData.map((session, index) => (
            <li key={index}>
              <strong>{session.type}:</strong> {session.duration},{" "}
              {session.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HistoricalDataPopup;
