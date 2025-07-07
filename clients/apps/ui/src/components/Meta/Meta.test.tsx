import { render } from '@testing-library/react';
import { Meta } from './Meta';
import { useMatches } from '@tanstack/react-router';

jest.mock('@tanstack/react-router', () => ({ useMatches: jest.fn() }));

const useMatchesMock = useMatches as jest.Mock;

const renderElement = () => <Meta />;
const renderComponent = () => render(renderElement());

test('document title updates based on matches', async () => {
  const level1Title = 'level1';
  const level1 = [{ meta: [{ title: level1Title }] }];
  useMatchesMock.mockReturnValue(level1);

  const { rerender } = renderComponent();

  expect(document.title).toEqual(level1Title);

  const level2Title = 'level2';
  const level2 = [...level1, { meta: [{ title: level2Title }] }];

  useMatchesMock.mockReturnValue(level2);
  rerender(renderElement());

  expect(document.title).toEqual(`${level2Title} | ${level1Title}`);
});
