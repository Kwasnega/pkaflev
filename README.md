# PKAF LEV

Ecommerce platform with an integrated affiliate/referral system. Clients browse and purchase products; affiliates refer clients via a unique link/code and earn commission; admins manage products, sales, and payouts.

Full system design, architecture diagrams, and business rules live in `/docs`.

## Tech Stack

**Backend**
- Node.js + TypeScript
- Prisma ORM
- PostgreSQL
- Paystack (payments)
- JWT (authentication)

**Frontend**
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Project Structure

```
pkaf-lev/
├── backend/          # Node.js + TypeScript API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.ts
│   ├── prisma/        # Database schema & migrations
│   └── .env.example
├── frontend/          # React + TypeScript client
│   └── .env.example
├── docs/              # System design & analysis, diagrams
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in real values
npx prisma migrate dev
npm run dev
```

Backend runs on `http://localhost:5000` by default (see `PORT` in `.env`).

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # fill in real values
npm run dev
```

## Environment Variables

Each of `backend/` and `frontend/` has its own `.env.example`. Copy it to `.env` and fill in real values locally — never commit `.env` files.

**Backend** requires: `DATABASE_URL`, `PAYSTACK_SECRET_KEY`, `JWT_SECRET`, `FRONTEND_URL`, plus email service credentials.

## Contribution Workflow

1. Pull the latest `main`: `git pull origin main`
2. Create a branch for your task: `git checkout -b <type>/<short-description>` (e.g. `backend/payout-logic`, `frontend/checkout-ui`)
3. Commit your work on that branch
4. Push: `git push -u origin <branch-name>`
5. Open a Pull Request into `main` for review before merging

**Do not push directly to `main`.**

## Documentation

See `/docs` for:
- System architecture diagram
- Database ER diagram
- Use case & sequence diagrams
- User flow diagrams
- Business rules
- API contract
