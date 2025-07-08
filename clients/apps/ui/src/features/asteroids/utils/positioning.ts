import type { OrbitalData } from '@/api/generated';
import { Vector3 } from 'three';
import type { GeocentricPosition, ParticlePosition } from '../types';
import type { NearEarthObjectWithOrbital } from '@/api/generated';

export const EARTH_RADIUS = 6371;

function solveEccentricAnomaly(M: number, e: number, tol = 1e-6): number {
  let E = M;
  let delta: number;
  do {
    delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= delta;
  } while (Math.abs(delta) > tol);
  return E;
}

function trueAnomaly(E: number, e: number): number {
  return (
    2 *
    Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    )
  );
}

export function orbitalToGeocentric(
  orbit: OrbitalData,
  date: Date = new Date()
): GeocentricPosition {
  const deg2rad = Math.PI / 180;
  const AU = 149597870.7; // km

  const a = parseFloat(orbit.semi_major_axis!); // AU
  const e = parseFloat(orbit.eccentricity!);
  const i = parseFloat(orbit.inclination!) * deg2rad;
  const Ω = parseFloat(orbit.ascending_node_longitude!) * deg2rad;
  const ω = parseFloat(orbit.perihelion_argument!) * deg2rad;
  const M0 = parseFloat(orbit.mean_anomaly!) * deg2rad;
  const epoch = new Date(parseFloat(orbit.epoch_osculation!)).getTime();

  const n = Math.sqrt(1 / Math.pow(a, 3)) * 2 * Math.PI; // rad/day
  const t = (date.getTime() - epoch) / (1000 * 3600 * 24); // days
  const M = (M0 + n * t) % (2 * Math.PI);

  const E = solveEccentricAnomaly(M, e);
  const ν = trueAnomaly(E, e);
  const r = a * (1 - e * Math.cos(E)); // AU

  const x_orb = r * Math.cos(ν);
  const y_orb = r * Math.sin(ν);

  const cosΩ = Math.cos(Ω),
    sinΩ = Math.sin(Ω);
  const cosω = Math.cos(ω),
    sinω = Math.sin(ω);
  const cosi = Math.cos(i),
    sini = Math.sin(i);

  const x =
    (cosΩ * cosω - sinΩ * sinω * cosi) * x_orb +
    (-cosΩ * sinω - sinΩ * cosω * cosi) * y_orb;

  const y =
    (sinΩ * cosω + cosΩ * sinω * cosi) * x_orb +
    (-sinΩ * sinω + cosΩ * cosω * cosi) * y_orb;

  const z = sinω * sini * x_orb + cosω * sini * y_orb;

  const x_km = x * AU;
  const y_km = y * AU;
  const z_km = z * AU;

  const r_mag = Math.sqrt(x_km ** 2 + y_km ** 2 + z_km ** 2);
  const lat = Math.asin(z_km / r_mag) * (180 / Math.PI);
  const lng = Math.atan2(y_km, x_km) * (180 / Math.PI);
  const alt = r_mag / EARTH_RADIUS - 1; // altitude in Earth radii

  return { lat, lng, alt };
}

export function itemToParticle(
  neo: NearEarthObjectWithOrbital
): ParticlePosition {
  const { lat, lng, alt } = orbitalToGeocentric(
    neo.orbital_data as OrbitalData
  );

  const radius = 1 + alt; // 1 = Earth radius, add altitude

  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const position = new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  const diameterKm =
    neo.estimated_diameter?.kilometers?.estimated_diameter_max ?? 10;

  const visualScale = 100;
  const size = diameterKm * visualScale;

  return {
    ...position,
    lat,
    lng,
    alt: alt / (EARTH_RADIUS / 2),
    color: 'grey',
    size,
  };
}
