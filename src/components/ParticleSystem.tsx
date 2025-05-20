import React from 'react';
import { Particle } from '../types/game';

interface ParticleSystemProps {
  particles: Particle[];
  cellSize: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ particles, cellSize }) => {
  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.position.x * cellSize,
            top: particle.position.y * cellSize,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}
    </>
  );
};

export default ParticleSystem;