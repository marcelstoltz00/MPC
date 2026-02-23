# 🚀 MISP Project Setup

Welcome! Follow these steps to get the development environment running on your machine.

---

## 📋 Prerequisites

- **Node.js**: v18 or higher  
- **Docker Desktop**: Installed and running  
- **Yarn**: `npm install -g yarn`  

---

## 🛠 1. Environment Configuration

You need to create `.env` files for the root and the sub-apps. Run this command in your terminal at the project root:

```bash
# Mac/Linux
cp .env.example .env && \
cp apps/backend/.env.example apps/backend/.env && \
cp apps/frontend/.env.example apps/frontend/.env
```

**Important Settings:**  
Open `apps/backend/.env` and ensure the following are set to avoid conflicts with local databases:

```
DB_PORT=5435
DB_USER=postgres
DB_PASSWORD=misp_local_123
```

---

## 📦 2. Install Dependencies

From the root directory, run:

```bash
yarn install
```

---

## 🐳 3. Start the Database

Make sure Docker Desktop is open, then run:

```bash
docker-compose up -d
```

The database will be available at `localhost:5435`.

---

## 🏃 4. Run the Application

To start both the Frontend and Backend run:

```bash
yarn dev:frontend
```
and
```bash
yarn dev:backend
```

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🆘 Troubleshooting

| Issue                        | Solution                                                                 |
|------------------------------|--------------------------------------------------------------------------|
| Terminal Hangs / Freezes     | Check your disk space! If you are at 100% capacity, Node will not start. |
| Port 5432 or 5435 in use     | Change `DB_PORT` in `.env` and `docker-compose.yml` to 5436.             |
| Database Connection Error    | Run `docker-compose down -v` then `docker-compose up -d` to reset volume.|
| Missing required variables   | Ensure you didn't skip Step 1. Check your `.env` files for empty values. |

---

## 🏗 Project Structure

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

### 📱 FieldOps Mobile Team (PWA)
- **App Directory**: `apps/field-ops-pwa`
- **Port**: `3002`
- **Command**: `yarn dev:mobile`
- **Offline Sync**: This app uses `@ducanh2912/next-pwa`. To test offline capabilities:
    1. Develop UI: Run `yarn dev:mobile` (hot-reloading).
    2. Test Offline:
         - Open terminal and run:
             ```bash
             cd apps/field-ops-pwa
             yarn build
             yarn start
             ```
         - Open Chrome DevTools → Application tab → Service Workers to verify activation.
    3. Audit: Confirm Service Worker is active for offline mode.
