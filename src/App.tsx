import React, { useEffect, useState, useCallback } from 'react';
import { useTetris } from './hooks/useTetris';
import GameBoard from './components/GameBoard';
import NextPiece from './components/NextPiece';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

const App: React.FC = () => {
  const {
    gameState,
    movePiece,
    rotateCurrentPiece,
    dropPiece,
    resetGame,
    pauseGame,
  } = useTetris();

  const [pressed, setPressed] = useState<Set<string>>(new Set());

  const addPressed = useCallback((key: string) => {
    setPressed(prev => new Set(prev).add(key));
  }, []);

  const removePressed = useCallback((key: string) => {
    setPressed(prev => { const s = new Set(prev); s.delete(key); return s; });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.gameOver && event.code !== 'KeyR') return;
      switch (event.code) {
        case 'ArrowLeft':  event.preventDefault(); movePiece('left');       addPressed('left');   break;
        case 'ArrowRight': event.preventDefault(); movePiece('right');      addPressed('right');  break;
        case 'ArrowDown':  event.preventDefault(); movePiece('down');       addPressed('down');   break;
        case 'ArrowUp':    event.preventDefault(); rotateCurrentPiece();    addPressed('up');     break;
        case 'Space':      event.preventDefault(); dropPiece();             addPressed('a');      break;
        case 'KeyP':       event.preventDefault(); pauseGame();             addPressed('select'); break;
        case 'KeyR':       event.preventDefault(); resetGame();             addPressed('start');  break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':  removePressed('left');   break;
        case 'ArrowRight': removePressed('right');  break;
        case 'ArrowDown':  removePressed('down');   break;
        case 'ArrowUp':    removePressed('up');     break;
        case 'Space':      removePressed('a');      break;
        case 'KeyP':       removePressed('select'); break;
        case 'KeyR':       removePressed('start');  break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePiece, rotateCurrentPiece, dropPiece, pauseGame, resetGame, gameState.gameOver, addPressed, removePressed]);

  const p = (key: string) => pressed.has(key) ? 'pressed' : '';

  return (
    <div className="app">
      <div className="gameboy-body">

        <div className="gameboy-header">
          <div className="gameboy-brand">Nintendo</div>
          <div className="gameboy-battery">
            <div className={`power-led ${gameState.gameOver ? 'led-off' : 'led-on'}`}></div>
            <span>BATTERY</span>
          </div>
        </div>

        <div className="gameboy-screen-housing">
          <div className="screen-label">DOT MATRIX WITH STEREO SOUND</div>
          <div className="screen-stripe"></div>
          <div className="gameboy-screen">
            <div className="game-display">
              <GameBoard gameState={gameState} />
              <div className="sidebar">
                <ScoreBoard gameState={gameState} />
                <NextPiece piece={gameState.nextPiece} />
              </div>
            </div>

            {gameState.gameOver && (
              <div className="screen-overlay">
                <div className="overlay-content">
                  <div className="overlay-title">GAME OVER</div>
                  <div className="overlay-score">{gameState.score}</div>
                  <button className="overlay-btn" onClick={resetGame}>[ R ] RETRY</button>
                </div>
              </div>
            )}

            {gameState.isPaused && !gameState.gameOver && (
              <div className="screen-overlay">
                <div className="overlay-content">
                  <div className="overlay-title">PAUSE</div>
                  <div className="overlay-hint">press P</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="gameboy-controls">
          <div className="controls-left">
            <div className="dpad">
              <button className={`dpad-btn dpad-up ${p('up')}`}    onClick={rotateCurrentPiece}>▲</button>
              <button className={`dpad-btn dpad-left ${p('left')}`}  onClick={() => movePiece('left')}>◀</button>
              <div className="dpad-center"></div>
              <button className={`dpad-btn dpad-right ${p('right')}`} onClick={() => movePiece('right')}>▶</button>
              <button className={`dpad-btn dpad-down ${p('down')}`}  onClick={() => movePiece('down')}>▼</button>
            </div>
          </div>

          <div className="controls-center">
            <button className={`meta-btn ${p('select')}`} onClick={pauseGame}>SELECT</button>
            <button className={`meta-btn ${p('start')}`}  onClick={resetGame}>START</button>
          </div>

          <div className="controls-right">
            <div className="ab-buttons">
              <div className="ab-label-row">
                <span>B</span>
                <span>A</span>
              </div>
              <div className="ab-btn-row">
                <button className="ab-btn" onClick={pauseGame}></button>
                <button className={`ab-btn ${p('a')}`} onClick={resetGame}></button>
              </div>
            </div>
          </div>
        </div>

        <div className="gameboy-speaker">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="speaker-hole"></div>
          ))}
        </div>

        <div className="gameboy-logo">GAME BOY<span>™</span></div>
      </div>

      <a className="back-link" href="https://bekstoro.com">← bekstoro.com</a>
    </div>
  );
};

export default App;
