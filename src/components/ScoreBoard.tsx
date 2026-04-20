import React from 'react';
import { GameState } from '../types';
import './ScoreBoard.css';

interface ScoreBoardProps {
  gameState: GameState;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState }) => {
  return (
    <div className="score-board">
      <div className="score-box">
        <span className="sb-label">SCORE</span>
        <span className="sb-value">{gameState.score}</span>
      </div>
      <div className="score-box">
        <span className="sb-label">LEVEL</span>
        <span className="sb-value">{gameState.level}</span>
      </div>
      <div className="score-box">
        <span className="sb-label">LINES</span>
        <span className="sb-value">{gameState.lines}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
