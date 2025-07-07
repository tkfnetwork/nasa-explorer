import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { config } from '../config';

const i18nReact = i18next.createInstance(config).use(initReactI18next);

i18nReact.init();

export { i18nReact };
