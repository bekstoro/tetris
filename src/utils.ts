import { Position, TetrisPiece, GameState } from './types';
import { BOARD_WIDTH, BOARD_HEIGHT, TETRIS_PIECES, PIECE_NAMES } from './constants';

export const createEmptyBoard = (): string[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(''));
};

export const createRandomPiece = (): TetrisPiece => {
  const pieceName = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)];
  const pieceTemplate = TETRIS_PIECES[pieceName];
  
  return {
    ...pieceTemplate,
    position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(pieceTemplate.shape[0].length / 2), y: 0 },
  };
};

export const rotatePiece = (piece: TetrisPiece): TetrisPiece => {
  const rotatedShape = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotatedShape,
  };
};

export const isValidPosition = (
  piece: TetrisPiece,
  board: string[][],
  offset: Position = { x: 0, y: 0 }
): boolean => {
  const newX = piece.position.x + offset.x;
  const newY = piece.position.y + offset.y;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;

        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (piece: TetrisPiece, board: string[][]): string[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: string[][]): { newBoard: string[][]; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === ''));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  // Add empty lines at the top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(''));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScore = [0, 40, 100, 300, 1200];
  return baseScore[linesCleared] * (level + 1);
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};

export const calculateDropTime = (level: number): number => {
  return Math.max(50, 1000 - (level * 50));
};
