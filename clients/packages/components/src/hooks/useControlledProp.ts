'use client';

import { useState } from 'react';

/**
 * Helper hook for delegating values getter and setters
 * from internal state to prop values.  Prop value will
 * always take precedence
 *
 * @param value
 * @param callback
 */
export const useControlledProp = <PropValue>(
  value?: PropValue,
  callback?: (nextValue: PropValue) => void
) => {
  const [internalValue, setValue] = useState<PropValue | undefined>(value);

  const isControlled = value !== undefined;

  return isControlled
    ? {
        value,
        setValue: callback ?? setValue,
      }
    : {
        value: internalValue,
        setValue,
      };
};
