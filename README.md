# PKAF LEV

PKAF LEV is an ecommerce platform for premium urban mobility products with an integrated affiliate and referral system.

The repository contains the Next.js frontend, Node.js/TypeScript backend, Prisma schema, and system design documentation.

## Tech Stack

- Next.js, React, TypeScript, Tailwind CSS, and Framer Motion
- Node.js, TypeScript, Prisma, and PostgreSQL
- Paystack payments and JWT authentication

## Frontend

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
# or

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
Open `http://localhost:3000` to view the storefront.

## Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

The backend runs on `http://localhost:5000` by default. Configure database, Paystack, JWT, frontend URL, and email variables in `backend/.env`.

## Project Structure

```text
app/       Next.js routes and pages
components/ Shared frontend components
backend/   Node.js API, Prisma schema, and services
docs/      System design documentation
public/    Frontend assets
```

Never commit `.env` files or production credentials.
## Learn More

- JWT (authentication)
