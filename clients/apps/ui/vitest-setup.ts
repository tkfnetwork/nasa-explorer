import 'vitest-axe/extend-expect';
import '@testing-library/jest-dom/vitest';

/// <reference types="@vitest/browser/context" />

/**
 * Fixes virtualizer not getting any height to measure from
 *
 * @see https://github.com/TanStack/virtual/issues/641
 */
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  value: 800,
});
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  value: 800,
});
