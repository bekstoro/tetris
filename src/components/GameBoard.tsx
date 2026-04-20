import React from 'react';
import { GameState, TetrisPiece } from '../types';
import { CELL_SIZE } from '../constants';
import './GameBoard.css';

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const renderBoard = () => {
    const board = gameState.board.map(row => [...row]);
    
    // Place current piece on board for preview
    if (gameState.currentPiece) {
      const { shape, color, position } = gameState.currentPiece;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardX = position.x + x;
            const boardY = position.y + y;
            if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
              board[boardY][boardX] = color;
            }
          }
        }
      }
    }

    return board.map((row, y) =>
      row.map((cell, x) => (
        <div
          key={`${y}-${x}`}
          className={`cell ${cell ? 'filled' : 'empty'}`}
          style={{
            backgroundColor: cell || 'transparent',
            left: x * CELL_SIZE,
            top: y * CELL_SIZE,
          }}
        />
      ))
    );
  };

  return (
    <div className="game-board">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;
