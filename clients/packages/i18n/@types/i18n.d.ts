import type { defaultNS, resources } from '../src/translation';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNs: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
