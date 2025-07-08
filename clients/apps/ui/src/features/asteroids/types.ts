export type GeocentricPosition = {
  lat: number;
  lng: number;
  alt: number;
};

export type ParticlePosition = {
  lat: number;
  lng: number;
  alt: number;
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
};

export type Units = 'kilometer' | 'miles' | 'feet';
