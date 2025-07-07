import { I18nextProvider, initReactI18next } from 'react-i18next';
import { render } from '@testing-library/react';
import i18next from 'i18next';

import { TranslationProvider } from './TranslationProvider';
import { TranslationProviderProps } from './TranslationProvider.types';
import { i18nReact } from '../../i18n';
import { config } from '../../../config';

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  I18nextProvider: jest.fn(),
}));

const renderElement = (props: TranslationProviderProps) => (
  <TranslationProvider {...props} />
);
const renderComponent = (props: TranslationProviderProps) =>
  render(renderElement(props));

test('underlying translation provider is passed correct props', () => {
  const children = 'Child';

  const { rerender } = renderComponent({ children });

  expect(I18nextProvider).toHaveBeenCalledWith(
    { children, i18n: i18nReact },
    undefined
  );

  const translator = i18next.createInstance(config).use(initReactI18next);
  rerender(renderElement({ children, translator }));

  expect(I18nextProvider).toHaveBeenCalledWith(
    { children, i18n: translator },
    undefined
  );
});
