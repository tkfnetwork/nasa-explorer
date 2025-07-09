'use client';

import { useWindowSize } from '@react-hookz/web';
import { useEffect, useState } from 'react';

import { breakpoints, breakpointsOrder } from '@ne/theme';

export type UseBreakpoints = Record<keyof typeof breakpoints, boolean>;

export const useBreakpoints = (
  direction: 'min' | 'max' = 'max'
): UseBreakpoints => {
  const { width } = useWindowSize();
  const [isClient, toggleIsClient] = useState(false);

  useEffect(() => {
    toggleIsClient(true);
  }, []);

  if (!isClient) {
    return Object.entries(breakpoints).map((key) => [
      key,
      false,
    ]) as unknown as UseBreakpoints;
  }

  const checks = Object.fromEntries(
    Object.entries(breakpoints)
      .sort(
        ([a], [b]) => breakpointsOrder.indexOf(a) - breakpointsOrder.indexOf(b)
      )
      .map(([key, value]) => [
        key,
        direction === 'min'
          ? width >= Number.parseInt(value)
          : width <= Number.parseInt(value),
      ])
  ) as unknown as UseBreakpoints;

  return checks;
};
