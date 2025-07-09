'use client';

import { useMediaQuery } from '@react-hookz/web';

export const useIsTouch = () => useMediaQuery('(any-pointer: coarse)');
