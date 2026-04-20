# Tetris Game

A modern Tetris game built with React and TypeScript featuring smooth animations, responsive design, and classic gameplay.

## Features

- 🎮 Classic Tetris gameplay with all 7 standard pieces
- ⌨️ Keyboard controls for movement, rotation, and dropping
- 🎯 Scoring system with levels and line clearing
- 🎨 Modern, responsive UI with smooth animations
- ⏸️ Pause/resume functionality
- 📱 Mobile-friendly design

## Controls

- **Arrow Keys**: Move pieces left/right and soft drop
- **Up Arrow**: Rotate piece
- **Space**: Hard drop (instant drop)
- **P**: Pause/Resume game
- **R**: Reset game

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Game Rules

- Clear horizontal lines by filling them with pieces
- Score points for clearing lines (more lines = more points)
- Game speed increases with each level
- Game ends when pieces reach the top of the board

## Scoring

- Single line: 40 × (level + 1)
- Double lines: 100 × (level + 1)
- Triple lines: 300 × (level + 1)
- Tetris (4 lines): 1200 × (level + 1)

## Technologies Used

- React 19
- TypeScript
- Vite (build tool)
- CSS3 with animations
- Custom hooks for game logic
- Responsive design

## Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game board
│   ├── NextPiece.tsx   # Next piece preview
│   ├── ScoreBoard.tsx  # Score display
│   ├── GameControls.tsx # Control buttons
│   └── Instructions.tsx # Control instructions
├── hooks/
│   └── useTetris.ts    # Game logic hook
├── types.ts            # TypeScript interfaces
├── constants.ts        # Game constants
├── utils.ts           # Utility functions
└── App.tsx            # Main app component
```

Enjoy playing Tetris! 🎮
