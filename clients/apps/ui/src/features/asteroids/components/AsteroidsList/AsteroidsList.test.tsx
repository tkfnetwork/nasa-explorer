import { cleanup, render } from '@testing-library/react';
import { AsteroidsList } from './AsteroidsList';
import type { AsteroidsListProps } from './AsteroidsList.types';
import { afterEach, beforeEach, expect, test, vi, type Mock } from 'vitest';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import { neoFactory } from '../../_mocks';

vi.mock('../AsteroidsPage/AsteroidsPage.context', () => ({
  useAsteroidsContext: vi.fn(() => ({
    unit: 'kilometers',
    isActive: false,
    setFocusedId: vi.fn(),
    focusedId: undefined,
  })),
}));

const useAsteroidsContextMock = useAsteroidsContext as Mock;

const renderElement = (props: AsteroidsListProps) => (
  <AsteroidsList {...props} />
);
const renderComponent = (props: AsteroidsListProps) =>
  render(renderElement(props));

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

test('skeleton loaders are shown on active', async () => {
  useAsteroidsContextMock.mockReturnValue({
    unit: 'kilometers',
    isActive: true,
    setFocusedId: vi.fn(),
    focusedId: undefined,
  });

  const { baseElement } = renderComponent({ data: [] });

  const loadingElements = baseElement.querySelectorAll('[data-skeleton]');
  expect(loadingElements).toHaveLength(10);
});

test('list items get the correct data', () => {
  useAsteroidsContextMock.mockReturnValue({
    unit: 'kilometers',
    isActive: false,
    setFocusedId: vi.fn(),
    focusedId: undefined,
  });

  const data = neoFactory.buildList(5);

  const { baseElement, rerender } = renderComponent({ data });

  const listItemElements = baseElement.querySelectorAll('[data-slot="card"]');

  expect(listItemElements).toHaveLength(5);

  useAsteroidsContextMock.mockReturnValue({
    unit: 'kilometers',
    isActive: false,
    setFocusedId: vi.fn(),
    focusedId: data[1].id,
  });

  rerender(renderElement({ data }));

  expect(listItemElements[1]).toHaveClass('brightness-150');
});
