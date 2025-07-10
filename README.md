# NASA Explorer monorepo

This repository holds all the code relating to the nasa explorer site located at https://nasa-explorer.tkf.network.

## 📁 Project Structure

- `clients/`: Contains frontend apps (e.g., React, Next.js, etc.)
- `services/`: Contains backend services (e.g., Express, Node.js services)

Shared packages within each domain are located in `packages` sub folder.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [pnpm](https://pnpm.io/) (Recommended: `>=10.x`)

Install `pnpm` if you haven’t already:

```bash
npm install -g pnpm
```

### Install Dependencies

From the root of the repo:

```bash
pnpm install
```

This will install all dependencies and link local packages in the monorepo.

### Environments

Each application inside `clients/apps` and `services/apps` have environment files that are required in order to run. Refer to the `.env.example` in each folder, copy it and create a `.env` in each folder.

For example, the `clients/apps/ui` can simply be:

```sh
cp .env.example .env
```

You can then change the values in `.env` if needed.

_Some environments variables are pre-populated, others will need to be added manually._

**N.B. These files are required to execute the stack in development, or build the stack for production**

## Running the stack

### Development

The entire app can be run by creating `.env` in each `**/app/**` folder and then running the following from the root

```sh
pnpm dev
```

## Building the apps

Each app will have a `build:<app name>` pnpm script. For example:

- `pnpm build:api`
- `pnpm build:ui`

These script will propogate to the `build` scripts for their respective app.

### Docker

Some apps may have docker builds available, these can be run using `docker:<app name>`. For example:

`pnpm docker:api`

## 📦 Workspace Management

This monorepo uses [pnpm workspaces](https://pnpm.io/workspaces).
