import type { Units } from '@/utils';

export type AsteroidsPageContextValues = {
  isActive: boolean;
  unit: Units;
  dates: [Date | null, Date | null];
  focusedId?: string;
  setFocusedId: (id?: string) => void;
};
