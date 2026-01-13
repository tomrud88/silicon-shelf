# Vercel Deployment Guide for Silicon Shelf

## Prerequisites

- GitHub/GitLab/Bitbucket account with repository access
- Vercel account (free tier works)
- Local environment tested and working

## Step 1: Prepare Repository

Ensure your code is pushed to Git:

```bash
git add .
git commit -m "chore: prepare for Vercel deployment"
git push
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your `silicon-shelf` repository
4. Vercel will auto-detect Next.js settings
5. **Do not deploy yet** - first configure the database

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Vercel Postgres Database

### Create Database

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose a region (same as your deployment region for best performance)
5. Click **"Create"**

### Connect Database to Project

Vercel will automatically add these environment variables to your project:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` (optimized for Prisma)
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 4: Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add:

### Required Variables

```env
# Database (automatically added by Vercel Postgres)
DATABASE_URL=${POSTGRES_PRISMA_URL}

# NextAuth
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app

# Optional: Node Environment
NODE_ENV=production
```

### Generate NEXTAUTH_SECRET locally:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the value for `NEXTAUTH_SECRET`.

## Step 5: Run Database Migrations

### Option A: Using Vercel CLI (Recommended)

```bash
# Pull environment variables locally
vercel env pull .env.production

# Run Prisma migrations
npx prisma migrate deploy

# Or use db push for development
npx prisma db push
```

### Option B: Add to package.json scripts

Add a postinstall script to automatically run migrations:

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma migrate deploy && prisma db seed && next build"
  }
}
```

## Step 6: Seed Production Database

### Method 1: Run Seed Locally Against Vercel DB

```bash
# Pull Vercel environment variables
vercel env pull .env.production

# Load production env and run seed
DATABASE_URL="<your-vercel-postgres-url>" npm run prisma:seed
```

### Method 2: Add Seed to Build Process

Update `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma migrate deploy && npm run prisma:seed && next build"
  }
}
```

**⚠️ Warning**: This will seed on every deployment. For production, seed only once manually.

### Method 3: One-Time Seed Script (Recommended)

Create `scripts/seed-production.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Your seed logic here
  console.log("Seeding production database...");
  // Import and run your seed function
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run once after deployment:

```bash
DATABASE_URL="<vercel-postgres-url>" tsx scripts/seed-production.ts
```

## Step 7: Deploy Application

### Trigger Deployment

```bash
git push
# or
vercel --prod
```

Vercel will:

1. Install dependencies
2. Generate Prisma Client
3. Run migrations (if configured)
4. Build Next.js app
5. Deploy to production

## Step 8: Verify Deployment

1. Check deployment logs in Vercel Dashboard
2. Visit your deployed URL: `https://your-app.vercel.app`
3. Test authentication (register/login)
4. Verify database connection (check products load)
5. Test checkout flow

## Troubleshooting

### Database Connection Issues

```bash
# Test connection locally
DATABASE_URL="<vercel-url>" npx prisma db push
```

### Missing Environment Variables

Check Vercel Dashboard → Settings → Environment Variables and ensure all required vars are set for **Production** environment.

### Prisma Client Not Generated

Add to `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Seed Not Running

Manually run seed against Vercel database:

```bash
vercel env pull .env.production
source .env.production  # or load in your terminal
npm run prisma:seed
```

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database tables created
- [ ] Seed data visible (products, categories, brands)
- [ ] User registration works
- [ ] Login/logout works
- [ ] Product browsing works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Order history displays correctly
- [ ] Profile page accessible

## Production Database Management

### View Data

```bash
# Open Prisma Studio connected to production
DATABASE_URL="<vercel-url>" npx prisma studio
```

### Run Migrations

```bash
# Create and apply new migration
npx prisma migrate dev --name add_new_feature
git push  # Vercel will auto-deploy with new migration
```

## Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma with Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NextAuth Deployment](https://next-auth.js.org/deployment)
