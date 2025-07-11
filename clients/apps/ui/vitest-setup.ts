import 'vitest-axe/extend-expect';
import '@testing-library/jest-dom/vitest';
import { faker } from '@faker-js/faker';

/// <reference types="@vitest/browser/context" />

/**
 * Fixes virtualizer not getting any height to measure from
 *
 * @see https://github.com/TanStack/virtual/issues/641
 */
// eslint-disable-next-line
// @ts-ignore HTMLElement is not inferred during build
Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  value: 800,
});
// eslint-disable-next-line
// @ts-ignore HTMLElement is not inferred during build
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  value: 800,
});

// eslint-disable-next-line
// @ts-ignore HTMLElement is not inferred during build
import.meta.env.VITE_API_BASE_URL = faker.internet.url();
