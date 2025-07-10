import { cleanup, render } from '@testing-library/react';
import { AsteroidsPage } from './AsteroidsPage';
import { afterEach, beforeEach, expect, test, vi, type Mock } from 'vitest';
import { useAsteroidsQuery } from '../../queries';
import { neoFactory } from '../../_mocks';
import { AsteroidsPageProvider } from './AsteroidsPage.context';
import { useSearch } from '@tanstack/react-router';
import { AsteroidsGlobe } from '../AsteroidsGlobe';
import uniq from 'lodash/uniq';

vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(() => ({})),
}));

vi.mock('./AsteroidsPage.context', () => ({
  AsteroidsPageProvider: vi.fn(({ children }) => children),
}));

vi.mock('../AsteroidsGlobe', () => ({
  AsteroidsGlobe: vi.fn(),
}));
vi.mock('../AsteroidsForm', () => ({
  AsteroidsForm: vi.fn(),
}));
vi.mock('../AsteroidsList', () => ({
  AsteroidsList: vi.fn(),
}));

vi.mock('../../queries', () => ({
  useAsteroidsQuery: vi.fn(() => ({ data: undefined, isLoading: false })),
}));

const useSearchMock = useSearch as Mock;
const useAsteroidsQueryMock = useAsteroidsQuery as Mock;

const renderElement = () => <AsteroidsPage />;
const renderComponent = () => render(renderElement());

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

test('data is propogated correctly', () => {
  const data = neoFactory.buildList(10);

  useSearchMock.mockReturnValue({
    startDate: '2022-01-01',
    endDate: '2022-01-01',
  });
  useAsteroidsQueryMock.mockReturnValue({
    isLoading: false,
    data: {
      data,
    },
  });

  renderComponent();

  expect(AsteroidsPageProvider).toHaveBeenCalledWith(
    {
      children: expect.anything(),
      value: {
        dates: [new Date('2022-01-01'), new Date('2022-01-01')],
        focusedId: undefined,
        isActive: false,
        setFocusedId: expect.any(Function),
        unit: 'kilometers',
      },
    },
    undefined
  );

  expect(AsteroidsGlobe).toHaveBeenCalledWith(
    { ids: expect.arrayContaining(uniq(data.map(({ id }) => id))) },
    undefined
  );
});
