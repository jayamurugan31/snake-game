import { create } from 'zustand';
import { Position, PowerUpType } from '../types/game';

interface GameState {
  score: number;
  highScore: number;
  isPaused: boolean;
  gameOver: boolean;
  isStarted: boolean;
  powerUps: PowerUp[];
  setScore: (score: number) => void;
  setHighScore: (score: number) => void;
  setPaused: (paused: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  setStarted: (started: boolean) => void;
  addPowerUp: (powerUp: PowerUp) => void;
  removePowerUp: (id: string) => void;
}

interface PowerUp {
  id: string;
  type: PowerUpType;
  position: Position;
  duration: number;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  highScore: parseInt(localStorage.getItem('snakeHighScore') || '0'),
  isPaused: false,
  gameOver: false,
  isStarted: false,
  powerUps: [],
  setScore: (score) => set({ score }),
  setHighScore: (score) => {
    localStorage.setItem('snakeHighScore', score.toString());
    set({ highScore: score });
  },
  setPaused: (isPaused) => set({ isPaused }),
  setGameOver: (gameOver) => set({ gameOver }),
  setStarted: (isStarted) => set({ isStarted }),
  addPowerUp: (powerUp) => set((state) => ({ 
    powerUps: [...state.powerUps, powerUp] 
  })),
  removePowerUp: (id) => set((state) => ({ 
    powerUps: state.powerUps.filter(p => p.id !== id) 
  })),
}));