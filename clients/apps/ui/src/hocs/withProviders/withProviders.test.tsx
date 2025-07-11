import { render } from '@testing-library/react';
import type { FunctionComponent } from 'react';
import { expect, test, vi } from 'vitest';
import { withProviders } from './withProviders';

vi.mock('../../config/core', () => ({
  getEnv: vi.fn(() => ({
    VITE_API_BASE_URL: 'http://stub',
  })),
}));

const TestComponent: FunctionComponent = () => <span>Test</span>;

test('wraps component correctly', async () => {
  const DecoratedComponent = withProviders(TestComponent);

  expect(DecoratedComponent.displayName).toEqual('WithProviders(Component)');

  TestComponent.displayName = 'TestComponent';

  expect(withProviders(TestComponent).displayName).toEqual(
    `WithProviders(${TestComponent.displayName})`
  );

  render(await DecoratedComponent({}));
});
