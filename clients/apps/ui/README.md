# 🚀 NASA Explorer UI

The **NASA Explorer UI** is a modern, interactive frontend application designed to visualize and explore NASA datasets in an immersive 3D globe interface. Built using modern web technologies, the project focuses on performance, accessibility, and developer experience.

This project is the frontend for the NASA Explorer platform.

---

## 🛠️ Tech Stack

This application is built using the following tools and libraries:

- **[React](https://reactjs.org/):** JavaScript library for building user interfaces
- **[@tanstack/react-router](https://tanstack.com/router):** Type-safe and powerful routing for React
- **[@tanstack/react-virtual](https://tanstack.com/virtual):** High-performance virtual scrolling
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

### 🔐 Environment Variables

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Populate the `.env` file with the required variables:

| Variable            | Description                      |
| ------------------- | -------------------------------- |
| `VITE_API_BASE_URL` | Base URL for the NASA API server |

Environment variables are **validated at runtime** using a [`zod`](https://zod.dev/) schema defined in `src/config/validation`.

> **Note:** Vite requires all environment variables to be defined at **build time**. Make sure your `.env` file is present before running `pnpm build`.

---

### ✅ Accessing Env Vars Properly

All environment variables are parsed and exposed via named exports from the `@/config` module. Do **not** access them directly via `import.meta.env`.

#### ✅ Correct Usage:

```ts
import { API_BASE_URL } from '@/config';

console.log(API_BASE_URL);
```

#### ❌ Avoid This:

```ts
console.log(import.meta.env.VITE_API_BASE_URL);
```

For more info, [see Vite’s guide on env variables](https://vite.dev/guide/env-and-mode.html#env-variables).

---

## 🚀 Running the App

### 🧪 Development

Start the development server with:

```sh
pnpm dev
```

The app will be available at `http://localhost:5173` by default.

---

### 📦 Production

Build and preview the application locally:

```sh
pnpm build && pnpm preview
```

This generates an optimized production build and serves it locally for testing.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
