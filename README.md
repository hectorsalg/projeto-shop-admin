# Project Initialization

This guide explains how to set up and run the project locally, including **frontend**, **backend**, and **database** with Prisma.

---

## Tecnologies

- Frontend: (React, Vite, TypeScript and Bootstrap)

- Backend: (NestJs, Prisma and Graphql)

- Database: (Sqlite) com Prisma ORM

## Prerequisites

Before starting, make sure you have installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Python](https://www.python.org/) (In case of error with sqlite)

---

## Cloning the repository

```bash
git clone https://github.com/hectorsalg/projeto-shop-admin.git
cd projeto-shop-admin
```

## Repo Layout

```
/shop-admin
  /backend
    /prisma             # Database schema and configuration
    /src                # Backend source code (resolvers, services, etc.)
    package.json        # Backend dependencies and scripts
  /frontend
    /components         # Reusable React components
    /src                # Frontend main source code
    package.json        # Frontend dependencies and scripts
  package.json          # Root scripts for monorepo management
```


## Run 1 (Project root)

```bash
yarn install
```

### (If this is your first time starting the project, install dependencies and the database)

```bash
yarn build
```

### Start Backend and Frontend
```bash
yarn start:all
```

## Run 2 (Backend and Frontend separately)

```bash
cd backend
yarn install
npx prisma generate
npx prisma migrate dev
yarn start
```

```bash
cd frontend
yarn install
yarn dev
```