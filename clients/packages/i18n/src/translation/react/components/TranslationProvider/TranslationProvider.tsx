import { I18nextProvider } from 'react-i18next';

import type { TranslationProviderProps } from './TranslationProvider.types';
import { i18nReact } from '../../i18n';

export const TranslationProvider = ({
  children,
  translator = i18nReact,
}: TranslationProviderProps) => (
  <I18nextProvider i18n={translator}>{children}</I18nextProvider>
);
