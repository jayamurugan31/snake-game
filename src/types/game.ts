export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };
export type PowerUpType = 'SPEED' | 'SLOW' | 'POINTS' | 'SHIELD';

export interface Particle {
  id: string;
  position: Position;
  velocity: Position;
  color: string;
  life: number;
}