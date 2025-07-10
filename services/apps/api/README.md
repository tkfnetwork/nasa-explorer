# NASA Explorer API

This app is the API for the NASA Explorer frontend. It communicates with NASA API and returns cached (in memory) data.

## Getting started

### Installation

Install the dependencies:

```ts
pnpm i
```

### 🔐 Environment Variables

1. Copy the example environment file:

```sh
cp .env.example .env
```

2. Populate the `.env` file with the required variables:

| Variable            | Description                   |
| ------------------- | ----------------------------- |
| `NASA_API_BASE_URL` | Base URL for the NASA API     |
| `NASA_API_KEY`      | API Key required for NASA API |

Environment variables are **validated at runtime** using a [`zod`](https://zod.dev/) schema defined in `src/config/validation`.

---

### ✅ Accessing Env Vars Properly

All environment variables are parsed and exposed via named exports from the `./config` module. Do **not** access them directly via `process.env`.

#### ✅ Correct Usage:

```ts
import { NASA_API_BASE_URL } from '../config';

console.log(NASA_API_BASE_URL);
```

#### ❌ Avoid This:

```ts
console.log(process.env.NASA_API_BASE_URL);
```

## Building/Running

### Development

To run the application in development mode, run the following:

```sh
pnpm dev
```

**Note: The `NODE_ENV` variable is determined via the `.env` file.**

### Production

To build the production api, run the following:

```sh
pnpm build
```

We use `esbuild` to build a minified and tree-shaken `server.js`.

To run the production app run:

```sh
node ./dist/server.js
```
