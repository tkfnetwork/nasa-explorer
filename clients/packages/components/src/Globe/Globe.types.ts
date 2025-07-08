import type {
  GlobeProps as BaseGlobeProps,
  GlobeMethods,
} from 'react-globe.gl';

export type GlobeProps = BaseGlobeProps & { className?: string };
export type GlobeRef = GlobeMethods;
