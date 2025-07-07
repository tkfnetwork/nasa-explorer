import type { PropsWithChildren } from 'react';

import type { I18NInstance } from '../../../types';

export type TranslationProviderProps = PropsWithChildren<{
  translator?: I18NInstance;
}>;
