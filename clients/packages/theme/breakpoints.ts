export const breakpoints = {
  xl: '1280px',
  lg: '1024px',
  md: '768px',
  sm: '640px',
  xs: '480px',
} as const;

export const breakpointsOrder = Object.keys(breakpoints);

export type Breakpoints = keyof typeof breakpoints;
