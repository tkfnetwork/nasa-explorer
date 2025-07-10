import { TextureLoader } from 'three';

export const asteroidTextures = Array.from({ length: 4 }).map((_, i) =>
  new TextureLoader().load(`/textures/asteroid-${i + 1}.png`)
);

export const getRandomTexture = () =>
  asteroidTextures[Math.floor(Math.random() * asteroidTextures.length)]!;
