
# Project Setup Guide

## Step 1: Install Node.js, Docker Desktop, and Yarn

Ensure you have **Node.js (v18 or higher)** and **Docker Desktop** installed and currently running. Install Yarn globally by running:

```bash
npm install -g yarn
```

---

## Step 2: Install Dependencies

Open your terminal, navigate to the root directory (`/misp-repo`), and run:

```bash
yarn install
```

---

## Step 3: Add `.env` Files

You need three separate `.env` files: one in the root, one in the backend, and one in the frontend. Run the following command from the root directory (`/misp-repo`):

```bash
cp .env.example .env && cp apps/backend/.env.example apps/backend/.env && cp apps/frontend/.env.example apps/frontend/.env
```

If that command does not work on your system (e.g., standard Windows Command Prompt), manually create a file named `.env` in these three folders:

- `/misp-repo/`
- `/misp-repo/apps/backend/`
- `/misp-repo/apps/frontend/`

Ask for the specific `.env` values on the Discord server.

> **CRITICAL SECURITY NOTE:**
> **DO NOT COMMIT YOUR `.env` FILES.** Committing these files is like giving thieves your house key on a silver platter. They are ignored by git for a reason; please keep it that way.

---

## Step 4: Run the Web App

Open your terminal in the root directory (`/misp-repo`) and run these commands (it is best to use separate terminal tabs for each):

### 4.1) Start the Database

```bash
docker-compose up -d
```
This starts the Postgres database in the background.

### 4.2) Start the Backend

```bash
yarn dev:backend
```
This starts the NestJS backend server.

### 4.3) Start the Frontend

```bash
yarn dev:frontend
```
This starts the Next.js frontend application.

---

### Shutting Down

When you are done, shut down the database by running:

```bash
docker-compose down
```

---


# 🏗 Project Structure

```
misp-repo/
├── apps/
│   ├── backend/                  # NestJS Application
│   │   ├── src/
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   ├── env.validation.ts # Zod validation for backend envs
│   │   │   ├── main.ts
│   │   │   ├── user/             # User team
│   │   │   ├── accounts/         # Accounts team
│   │   │   ├── services/         # Services team
│   │   │   ├── dispatch/         # Dispatch team
│   │   │   └── fieldops/         # FieldOps team
│   │   ├── test/
│   │   ├── package.json
│   │   └── .env.example
│   ├── frontend/                 # Next.js Application
│   │   ├── app/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── src/
│   │   │   ├── env.ts            # Zod validation for frontend envs
│   │   │   └── domains/
│   │   │       ├── user/         # User team
│   │   │       ├── accounts/     # Accounts team
│   │   │       ├── services/     # Services team
│   │   │       ├── dispatch/     # Dispatch team
│   │   │       └── fieldops/     # FieldOps team
│   │   │   └── ...               # Other frontend modules
│   │   ├── public/
│   │   ├── package.json
│   │   └── .env.example
│   ├── field-ops-pwa/            # FieldOps Progressive Web App
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.mjs
│   │   └── ...                   # PWA source files
│
├── packages/                     # 📦 SHARED MONOREPO CODE
│   ├── ui/                       # Reusable React components (Buttons, Layouts)
│   │   ├── src/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── code.tsx
│   │   └── package.json
│   ├── typescript-config/        # Shared TypeScript configs
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── react-library.json
│   ├── eslint-config/            # Shared linting rules
│   │   ├── base.js
│   │   ├── next.js
│   │   └── react-internal.js
│   │   └── package.json
│
├── docker-compose.yml            # Local Postgres & pgAdmin setup
├── package.json                  # Root package
├── README.md                     # Project documentation
└── .github/
    └── CODEOWNERS                # Pull Request approval enforcement
```
---

# TypeORM and Migrations Guide

## What are Migrations?

A migration is essentially a "version control" file for your database. Instead of manually adding columns or tables in pgAdmin, we write (or generate) a migration file. This ensures that all 50+ developers are using the exact same database structure. If you change a table and don’t create a migration, the app will crash for everyone else.

## How to Use TypeORM in this Project

We use the **Active Record** pattern for simplicity. This means your database logic lives inside the `Entity` files. Each team is responsible for their own entities within their respective folders (e.g., `apps/backend/src/dispatch/entities`).

---

## Migration Workflow

### 1. Create or Modify an Entity
If you need a new table or a new column, go to your team's entity folder and create/edit the TypeScript file. For example, add a `status` column to your `Order` entity.

### 2. Generate the Migration
Once your TypeScript code is updated, you need to tell the database. Run this command from the root:

```bash
yarn workspace backend migration:generate src/migrations/NameOfYourChange
```

Replace `NameOfYourChange` with something descriptive like `AddStatusToOrders`. This will create a new file in the migrations folder containing the SQL needed to update the database.

### 3. Run the Migration
To actually apply the changes to your local Postgres database, run:

```bash
yarn workspace backend migration:run
```

### 4. Reverting Changes
If you made a mistake and need to undo the last migration, run:

```bash
yarn workspace backend migration:revert
```

---

## Rules for the Team

- **Never edit the database manually:** Always use migrations.
- **Check your migration before committing:** Open the generated file and make sure it only contains the changes you intended.
- **Team Prefixes:** To avoid conflicts, name your tables with your team prefix (e.g., `@Entity('dispatch_orders')` or `@Entity('accounts_profile')`).