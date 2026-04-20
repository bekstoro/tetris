import { useState, useEffect, useCallback } from 'react';
import { GameState, Direction } from '../types';
import {
  createEmptyBoard,
  createRandomPiece,
  rotatePiece,
  isValidPosition,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateDropTime,
} from '../utils';

const INITIAL_STATE: GameState = {
  board: createEmptyBoard(),
  currentPiece: null,
  nextPiece: null,
  score: 0,
  level: 0,
  lines: 0,
  gameOver: false,
  isPaused: false,
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [dropTime, setDropTime] = useState(1000);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setDropTime(1000);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const movePiece = useCallback((direction: Direction) => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const offset = {
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      down: { x: 0, y: 1 },
    }[direction];

    if (isValidPosition(gameState.currentPiece, gameState.board, offset)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: {
            x: prev.currentPiece.position.x + offset.x,
            y: prev.currentPiece.position.y + offset.y,
          },
        } : null,
      }));
    } else if (direction === 'down') {
      // Piece has landed
      if (gameState.currentPiece) {
        const newBoard = placePiece(gameState.currentPiece, gameState.board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const newLines = gameState.lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const scoreIncrease = calculateScore(linesCleared, gameState.level);
        
        setGameState(prev => ({
          ...prev,
          board: clearedBoard,
          currentPiece: prev.nextPiece,
          nextPiece: createRandomPiece(),
          score: prev.score + scoreIncrease,
          lines: newLines,
          level: newLevel,
          gameOver: prev.nextPiece ? !isValidPosition(prev.nextPiece, clearedBoard) : true,
        }));
        
        setDropTime(calculateDropTime(newLevel));
      }
    }
  }, [gameState]);

  const rotateCurrentPiece = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    const rotatedPiece = rotatePiece(gameState.currentPiece);
    if (isValidPosition(rotatedPiece, gameState.board)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece,
      }));
    }
  }, [gameState]);

  const dropPiece = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.isPaused) return;

    let newY = gameState.currentPiece.position.y;
    while (isValidPosition(gameState.currentPiece, gameState.board, { x: 0, y: newY - gameState.currentPiece.position.y + 1 })) {
      newY++;
    }
    
    if (newY > gameState.currentPiece.position.y) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: { ...prev.currentPiece.position, y: newY },
        } : null,
      }));
    }
  }, [gameState]);

  // Initialize game
  useEffect(() => {
    if (!gameState.currentPiece && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        currentPiece: createRandomPiece(),
        nextPiece: createRandomPiece(),
      }));
    }
  }, [gameState.currentPiece, gameState.gameOver]);

  // Auto drop
  useEffect(() => {
    if (!gameState.isPaused && !gameState.gameOver) {
      const interval = setInterval(() => {
        movePiece('down');
      }, dropTime);
      
      return () => clearInterval(interval);
    }
  }, [movePiece, dropTime, gameState.isPaused, gameState.gameOver]);

  return {
    gameState,
    movePiece,
    rotateCurrentPiece,
    dropPiece,
    resetGame,
    pauseGame,
  };
};
