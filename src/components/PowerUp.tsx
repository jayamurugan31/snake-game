import React from 'react';
import { Zap, Shield, Timer, Star } from 'lucide-react';
import { Position, PowerUpType } from '../types/game';

interface PowerUpProps {
  type: PowerUpType;
  position: Position;
  cellSize: number;
}

const PowerUp: React.FC<PowerUpProps> = ({ type, position, cellSize }) => {
  const getIcon = () => {
    switch (type) {
      case 'SPEED':
        return <Zap size={14} className="text-yellow-400" />;
      case 'SLOW':
        return <Timer size={14} className="text-purple-400" />;
      case 'POINTS':
        return <Star size={14} className="text-green-400" />;
      case 'SHIELD':
        return <Shield size={14} className="text-blue-400" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'SPEED':
        return 'bg-yellow-500/20';
      case 'SLOW':
        return 'bg-purple-500/20';
      case 'POINTS':
        return 'bg-green-500/20';
      case 'SHIELD':
        return 'bg-blue-500/20';
    }
  };

  return (
    <div
      className={`absolute rounded-full flex items-center justify-center animate-pulse ${getColor()}`}
      style={{
        width: cellSize - 2,
        height: cellSize - 2,
        left: position.x * cellSize,
        top: position.y * cellSize,
      }}
    >
      {getIcon()}
    </div>
  );
};

export default PowerUp;