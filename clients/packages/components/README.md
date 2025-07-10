# `@ne/components`

This package contains all generic, re-useable components for the frontend apps in this monorepo.

## 🛠️ Tech Stack

This application is built using the following tools and libraries:

- **[React](https://reactjs.org/):** JavaScript library for building user interfaces
- **[globe.gl](https://globe.gl/):** WebGL globe for geospatial data visualization
- **[Three.js](https://threejs.org/):** JavaScript 3D library for rendering scenes in WebGL
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework
- **[Vite](https://vitejs.dev/):** Lightning-fast build tool for modern web projects

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

## 🚀 Building

### 🧪 Development

To build the component library then watch for changes run the following:

```sh
pnpm dev
```

This uses a custom post build script to attempt to rsync only changes to the dist folder as `vite build --watch` does a full rebuild on every change.

### 📚 Storybook

Storybook can be used to browse and/or develop components by running:

```sh
pnpm storybook
```

### 📦 Production

To build the component library for production run the following:

```sh
pnpm build
```

---
