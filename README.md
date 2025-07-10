# 🚀 NASA Explorer Monorepo

This is the **monorepo** for all code related to the [NASA Explorer](https://nasa-explorer.tkf.network) platform — a modern, interactive data explorer for visualizing space and Earth science data.

The repository is structured as a **modular monorepo** and contains all frontend clients, backend services, shared utilities, and configurations necessary to run the complete system in development and production environments.

---

## 📁 Project Structure

```
.
├── clients/           # All frontend applications (e.g., React, Next.js)
│   └── apps/          # Individual frontend apps
│   └── packages/      # Shared frontend packages
│
├── services/          # All backend services (e.g., Express APIs, workers)
│   └── apps/          # Individual backend services
│   └── packages/      # Shared backend packages
│
├── node_modules/      # Installed dependencies
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) – Recommended: Latest LTS version
- [pnpm](https://pnpm.io/) – Recommended: `>=10.x`

Install `pnpm` globally if you haven’t already:

```bash
npm install -g pnpm
```

---

### 📦 Install Dependencies

From the root of the repo:

```bash
pnpm install
```

This will install all dependencies and automatically link local packages within the monorepo using pnpm workspaces.

---

### 🔐 Environment Variables

Each application under `clients/apps/*` or `services/apps/*` requires its own environment configuration file.

1. Navigate into the app's directory
2. Copy the example `.env` file:

```sh
cp .env.example .env
```

3. Update any required values in the newly created `.env` file.

> ℹ️ Some environment variables are pre-filled. Others (like API keys or secrets) will need to be manually added.

> ⚠️ These `.env` files are **required** to run or build the application.

---

## 🧪 Running the Stack

### Development

Once all required `.env` files are created, you can run the entire stack using:

```sh
pnpm dev
```

This starts all apps and services marked for development via [`turbo`](https://turbo.build/) or custom scripts.

---

## 🛠️ Building Applications

Each application provides its own build script prefixed with `build:<app-name>`. For example:

```bash
pnpm build:ui      # Builds the frontend UI
pnpm build:api     # Builds the backend API
```

These scripts delegate to the corresponding app's `build` command internally.

---

### 🐳 Docker Support

Some apps include Docker configurations for containerized builds. These can be triggered using:

```bash
pnpm docker:<app-name>
```

For example:

```bash
pnpm docker:api
```

---

## 📦 Workspace Management

This monorepo uses [pnpm workspaces](https://pnpm.io/workspaces) for dependency management and package linking. It ensures fast, deterministic installs and local package sharing across apps.

---

## 📚 Documentation

- Each application and package contains its own `README.md` with specific setup and usage instructions.
- Refer to those for further details on environment configuration, testing, and deployment.

---

## 🤝 Contributing

We welcome contributions to NASA Explorer! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
