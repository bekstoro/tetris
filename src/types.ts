export interface Position {
  x: number;
  y: number;
}

export interface TetrisPiece {
  shape: number[][];
  color: string;
  position: Position;
}

export interface GameState {
  board: string[][];
  currentPiece: TetrisPiece | null;
  nextPiece: TetrisPiece | null;
  score: number;
  level: number;
  lines: number;
  gameOver: boolean;
  isPaused: boolean;
}

export type Direction = 'left' | 'right' | 'down';

export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
  dropTime: number;
}
