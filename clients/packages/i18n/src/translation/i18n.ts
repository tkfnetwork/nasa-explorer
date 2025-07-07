import i18next from 'i18next';

import { config } from './config';

const i18n = i18next.createInstance();

i18n.init(config);

export { i18n };
