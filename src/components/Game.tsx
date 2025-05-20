import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Gamepad2, RefreshCw, Pause, Play, ArrowRight } from 'lucide-react';
import { Howl } from 'howler';
import { useGameStore } from '../store/gameStore';
import { Direction, Position, PowerUpType, Particle } from '../types/game';
import PowerUp from './PowerUp';
import ParticleSystem from './ParticleSystem';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const POWER_UP_CHANCE = 0.1;

const sounds = {
  eat: new Howl({ src: ['https://assets.codepen.io/21542/pop.mp3'] }),
  powerUp: new Howl({ src: ['https://assets.codepen.io/21542/powerup.mp3'] }),
  gameOver: new Howl({ src: ['https://assets.codepen.io/21542/gameover.mp3'] })
};

const Game: React.FC = () => {
  const {
    score,
    highScore,
    isPaused,
    gameOver,
    isStarted,
    powerUps,
    setScore,
    setHighScore,
    setPaused,
    setGameOver,
    setStarted,
    addPowerUp,
    removePowerUp
  } = useGameStore();

  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeEffects, setActiveEffects] = useState<Set<PowerUpType>>(new Set());
  
  const gameLoopRef = useRef<number>();
  const particleLoopRef = useRef<number>();

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
      ? generateFood()
      : newFood;
  }, [snake]);

  const generatePowerUp = useCallback(() => {
    if (Math.random() < POWER_UP_CHANCE) {
      const types: PowerUpType[] = ['SPEED', 'SLOW', 'POINTS', 'SHIELD'];
      const type = types[Math.floor(Math.random() * types.length)];
      const position = generateFood();
      addPowerUp({
        id: Math.random().toString(),
        type,
        position,
        duration: 5000
      });
    }
  }, [addPowerUp, generateFood]);

  const createParticles = (position: Position, color: string, count: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random().toString(),
        position: { ...position },
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4
        },
        color,
        life: 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setParticles([]);
    setActiveEffects(new Set());
    setStarted(true);
  };

  const resetGame = () => {
    setStarted(false);
    setGameOver(false);
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setParticles([]);
    setActiveEffects(new Set());
  };

  const togglePause = () => {
    setPaused(!isPaused);
  };

  const checkCollision = (head: Position): boolean => {
    if (activeEffects.has('SHIELD')) return false;
    return (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !isStarted) return;

    const head = { ...snake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      sounds.gameOver.play();
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      createParticles(head, '#ef4444', 20);
      return;
    }

    const newSnake = [head, ...snake];
    
    if (head.x === food.x && head.y === food.y) {
      sounds.eat.play();
      setScore(score + 10);
      setFood(generateFood());
      generatePowerUp();
      createParticles(food, '#22c55e', 10);
      setSpeed(prev => Math.max(prev - SPEED_INCREASE, 50));
    } else {
      newSnake.pop();
    }

    powerUps.forEach(powerUp => {
      if (head.x === powerUp.position.x && head.y === powerUp.position.y) {
        sounds.powerUp.play();
        removePowerUp(powerUp.id);
        setActiveEffects(prev => new Set(prev).add(powerUp.type));
        createParticles(powerUp.position, '#3b82f6', 15);
        
        setTimeout(() => {
          setActiveEffects(prev => {
            const next = new Set(prev);
            next.delete(powerUp.type);
            return next;
          });
        }, powerUp.duration);

        switch (powerUp.type) {
          case 'SPEED':
            setSpeed(prev => prev * 0.7);
            break;
          case 'SLOW':
            setSpeed(prev => prev * 1.3);
            break;
          case 'POINTS':
            setScore(prev => prev + 50);
            break;
        }
      }
    });

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, score, highScore, isPaused, isStarted, powerUps, activeEffects]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isStarted) {
        if (e.key === 'Enter' || e.key === ' ') {
          startGame();
          return;
        }
        return;
      }

      if (e.key === ' ') {
        togglePause();
        return;
      }
      
      if (isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPaused, isStarted]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake, speed]);

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-8 flex items-center gap-2">
          <Gamepad2 className="text-green-500" size={32} />
          <h1 className="text-3xl font-bold text-white">Snake Game</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-300 mb-6">
            Use arrow keys to control the snake.<br />
            Collect power-ups and grow as long as you can!
          </p>
          
          <button
            onClick={startGame}
            className="flex items-center gap-2 mx-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
          >
            Start Game
            <ArrowRight size={20} />
          </button>
          
          {highScore > 0 && (
            <p className="mt-4 text-gray-400">
              High Score: {highScore}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-green-500" size={24} />
          <span className="text-xl font-bold text-white">Snake Game</span>
        </div>
        <div className="text-white">Score: {score}</div>
        <div className="text-white">High Score: {highScore}</div>
        <button
          onClick={togglePause}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>

      <div 
        className="bg-gray-800 rounded-lg p-1 relative overflow-hidden"
        style={{ 
          width: GRID_SIZE * CELL_SIZE + 10,
          height: GRID_SIZE * CELL_SIZE + 10
        }}
      >
        <div className="relative" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
          <div
            className="absolute bg-red-500 rounded-full transition-all duration-100 animate-pulse"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
            }}
          />

          {powerUps.map(powerUp => (
            <PowerUp
              key={powerUp.id}
              type={powerUp.type}
              position={powerUp.position}
              cellSize={CELL_SIZE}
            />
          ))}

          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm transition-all duration-100 ${
                index === 0 
                  ? 'bg-green-400' 
                  : 'bg-green-500'
              } ${
                activeEffects.has('SHIELD') 
                  ? 'ring-2 ring-blue-500 ring-opacity-50' 
                  : ''
              }`}
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
              }}
            />
          ))}

          <ParticleSystem particles={particles} cellSize={CELL_SIZE} />
        </div>
      </div>

      {gameOver && (
        <div className="mt-4 flex flex-col items-center">
          <div className="text-red-500 text-xl font-bold mb-2">Game Over!</div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
            Play Again
          </button>
        </div>
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Use arrow keys to control the snake | Space to pause
      </div>

      {activeEffects.size > 0 && (
        <div className="mt-2 flex gap-2">
          {Array.from(activeEffects).map(effect => (
            <div
              key={effect}
              className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white"
            >
              {effect}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;