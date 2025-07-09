import type { Texture } from 'three';

export type GeocentricPosition = {
  lat: number;
  lng: number;
  alt: number;
};

export type ParticlePosition = {
  id: string;
  lat: number;
  lng: number;
  alt: number;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  texture?: Texture;
};
