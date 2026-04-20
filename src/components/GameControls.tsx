import React from 'react';
import './GameControls.css';

interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPaused: boolean;
  gameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onStart,
  onPause,
  onReset,
  isPaused,
  gameOver,
}) => {
  return (
    <div className="game-controls">
      <button
        className="control-button primary"
        onClick={gameOver ? onStart : onPause}
        disabled={false}
      >
        {gameOver ? 'Start Game' : isPaused ? 'Resume' : 'Pause'}
      </button>
      <button
        className="control-button secondary"
        onClick={onReset}
        disabled={false}
      >
        Reset
      </button>
    </div>
  );
};

export default GameControls;
