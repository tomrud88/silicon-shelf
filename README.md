# Silicon Shelf

Silicon Shelf is an e-commerce storefront for a premium electronics retailer. The app exposes a curated catalog of computer accessories, lets shoppers add items to a cart, and guides them through checkout with product protection, shipping, and payment options. Authenticated users can review their order history and manage profile details.

## Highlights

- **Modern storefront** – marketing-driven landing page, product browsing, category filters, brand carousel, and personalized CTAs.
- **End-to-end checkout** – cart management, shipping address handling, optional product protection, order summary, and confirmation flow.
- **Secure authentication** – email/password login, profile guard middleware, and session-aware UI states.
- **Backed by Prisma + PostgreSQL** – seeded catalog, orders, and cart models with typed access.
- **Mobile-ready UI** – responsive Tailwind design system with reusable feature, layout, and UI components.

## Tech Stack

- Next.js 16 (App Router, Server/Client Components, Turbopack)
- TypeScript + ESLint + Prettier
- Tailwind CSS for styling
- Prisma ORM with PostgreSQL via Docker Compose
- NextAuth for authentication
- ESLint-powered quality checks with testing tooling to be added

## Project Structure

- `src/app` – application routes, pages, and API handlers
- `src/components/features` – domain-specific components (landing, catalog, checkout)
- `src/components/layout` – header, footer, breadcrumbs, navigation
- `src/components/ui` – shared primitives (buttons, dropdowns, notifications)
- `src/constants` – reusable configuration data (countries, etc.)
- `prisma` – schema, migrations, and seed scripts
- `docker-compose.yml` – PostgreSQL development database

## Prerequisites

- Node.js 18+
- npm (bundled with Node) or yarn/pnpm/bun
- Docker Desktop (for local PostgreSQL via docker-compose)
- Optional: Stripe test keys or other integrations you wish to add

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start database container**

   ```bash
   docker-compose up -d
   ```

3. **Apply database schema**

   ```bash
   npx prisma db push
   # or apply migrations if they exist
   # npx prisma migrate deploy
   ```

4. **Seed sample data (optional)**

   ```bash
   npm run prisma:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev:full   # runs docker-compose + dev server
   # or run the app only
   npm run dev
   ```

6. Open http://localhost:3000 to explore the storefront.

## Environment Variables

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

Key variables include database connection strings, NextAuth secrets, and optional third-party keys. Restart the dev server after updating env vars.

## Useful Commands

```bash
npm run dev            # Start Next.js (without Docker helper)
npm run dev:full       # Start PostgreSQL via docker-compose then run Next.js
npm run lint           # Run ESLint
npm run test           # Execute unit tests
npm run test:e2e       # Run Playwright end-to-end tests
npm run prisma:studio  # Open Prisma Studio data browser
```

## Testing

- **Unit tests** – Jest located under `__tests__`
- **Integration/e2e** – Playwright specs under `e2e`
- **API coverage** – use `npm run test` (unit) and `npm run test:e2e` (browser automation)

Ensure the database is running and seeded before executing tests that rely on data access.

## Deployment

The project is deployment-ready for platforms that support Next.js (Vercel, Netlify, self-hosted). Recommended steps:

1. Set environment variables (NextAuth, database, third-party services).
2. Run `npm run build` to produce the optimized production bundle.
3. Serve with `npm run start` behind your hosting provider.

For Vercel deployments, connect the repository, configure environment variables in the Vercel dashboard, and trigger a production build.

## Contributing

1. Fork the repository and create a feature branch.
2. Ensure linting and tests pass: `npm run lint && npm run test`.
3. Open a pull request describing your changes and screenshots where applicable.

## License

This project is distributed under the MIT License. See `LICENSE` for details.
