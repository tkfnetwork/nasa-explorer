import { render } from '@testing-library/react';
import type { FunctionComponent } from 'react';
import { expect, test, vi } from 'vitest';
import { withProviders } from './withProviders';

vi.mock('../../config/core', () => ({
  getEnv: vi.fn(() => ({
    VITE_SANITY_PROJECT_ID: '12344567889',
    VITE_SANITY_DATASET: '2345678998765',
    VITE_ANJ_ID: 'ce5da088-39a1-4dea-8582-7a3d95b491f2',
    VITE_WIDGETBOT_SERVER: '',
    VITE_WIDGETBOT_CHANNEL: '',
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
