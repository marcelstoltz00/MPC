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
│   ├── frontend/                 # Next.js Application
│   │   ├── src/
│   │   │   ├── app/              # Standard Next.js routing
│   │   │   ├── domains/          # 🔒 ISOLATED FRONTEND MODULES
│   │   │   │   ├── user/         # User team 
│   │   │   │   ├── accounts/     # Accounts team 
│   │   │   │   ├── services/     # Services team 
│   │   │   │   ├── dispatch/     # Dispatch team 
│   │   │   │   └── fieldops/     # FieldOps team 
│   │   │   ├── api-client/       # Auto-generated from NestJS Swagger
│   │   │   └── env.ts            # Zod validation for frontend envs
│   │   └── .env.example
│   │
│   └── backend/                  # NestJS Application
│       ├── src/                  # 🔒 ISOLATED BACKEND MODULES
│       │   ├── user/             # User team 
│       │   ├── accounts/         # Accounts team 
│       │   ├── services/         # Services team 
│       │   ├── dispatch/         # Dispatch team 
│       │   ├── fieldops/         # FieldOps team 
│       │   ├── core/             # Shared guards/interceptors
│       │   └── env.validation.ts # Zod validation for backend envs
│       ├── typeorm/              # Migrations (Managed by Data Engineer) 
│       └── .env.example
│
├── packages/                     # 📦 SHARED MONOREPO CODE
│   ├── ui/                       # Reusable React components (Buttons, Layouts)
│   ├── types/                    # Shared universal TypeScript interfaces
│   └── eslint-config/            # Shared linting rules
│
├── docker-compose.yml            # Local Postgres & pgAdmin setup
└── .github/
    └── CODEOWNERS                # Pull Request approval enforcement
