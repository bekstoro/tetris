import React from 'react';
import { TetrisPiece } from '../types';
import './NextPiece.css';

const PREVIEW_CELL = 14;

interface NextPieceProps {
  piece: TetrisPiece | null;
}

const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  if (!piece) return null;

  const renderPiece = () => {
    return piece.shape.map((row, y) =>
      row.map((cell, x) => {
        if (!cell) return null;
        return (
          <div
            key={`${y}-${x}`}
            className="piece-cell"
            style={{
              left: x * PREVIEW_CELL + 6,
              top: y * PREVIEW_CELL + 6,
            }}
          />
        );
      })
    );
  };

  return (
    <div className="next-piece">
      <div className="next-piece-label">NEXT</div>
      <div className="next-piece-container">
        {renderPiece()}
      </div>
    </div>
  );
};

export default NextPiece;
