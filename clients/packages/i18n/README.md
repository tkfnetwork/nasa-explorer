# `@ne/i18n`

This package contains all internationalisation (or `i18n`) functionality for the frontend apps.

## 🛠️ Tech Stack

This application is built using the following tools and libraries:

- **[i18next](https://www.i18next.com/):** Framework agnostic i18n translation package
- **[react-i18next](https://react.i18next.com/):** React functionality to augment the core `i18next` package

---

## ⚙️ Getting Started

### 📦 Installation

Install dependencies using [pnpm](https://pnpm.io/):

```sh
pnpm install
```

If you don’t have `pnpm` installed, install it globally:

```sh
npm install -g pnpm
```

---

## Usage

### Translations

Translations are available by importing the `i18n` instance into their JS application e.g.

```ts
import { i18n } from '@ne/i18n';

i18n.t('<namespace>:<token>');
```

#### React

##### Provider

React translations can be added by wrapping your application in the `TranslationProvider` that is exported via the `@ne/i18n/react` path e.g.

```ts
import { TranslationProvider } from '@ne/i18n/react';
```

Then wrap your app

```tsx
<TranslationProvider>
  <App />
</TranslationProvider>
```

##### Hooks

The main hook is the `useTranslation` hook and can be accessed by doing the following:

```tsx
import { useTranslation } from '@ne/i18n/react';

const MyComponent = () => {
  const { t } = useTranslation(['<namespace>']);

  return <span>{t('<namespace>:<token>')}</span>;
};
```
