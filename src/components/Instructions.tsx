import React from 'react';
import './Instructions.css';

const Instructions: React.FC = () => {
  return (
    <div className="instructions">
      <h3>Controls</h3>
      <div className="control-list">
        <div className="control-item">
          <span className="key">← →</span>
          <span className="action">Move</span>
        </div>
        <div className="control-item">
          <span className="key">↓</span>
          <span className="action">Soft Drop</span>
        </div>
        <div className="control-item">
          <span className="key">↑</span>
          <span className="action">Rotate</span>
        </div>
        <div className="control-item">
          <span className="key">Space</span>
          <span className="action">Hard Drop</span>
        </div>
        <div className="control-item">
          <span className="key">P</span>
          <span className="action">Pause</span>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
