# Rubynox Landing Page

Premium dark-themed landing page for a software agency, built with Next.js App Router, TypeScript, Tailwind CSS, Prisma-ready lead storage, and a guided chatbot.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env` from `.env.example`.

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=918779636850
DATABASE_URL="postgresql://postgres:password@localhost:5432/rubynox?schema=public"
```

`NEXT_PUBLIC_WHATSAPP_NUMBER` should include country code and digits only.

## PostgreSQL + Prisma Setup

1. Create a PostgreSQL database named `rubynox`.
2. Add the connection string to `.env` as `DATABASE_URL`.
3. Run:

```bash
npm run prisma:generate
npm run prisma:migrate
```

The lead model is defined in `prisma/schema.prisma`.

To view submitted leads in a browser:

```bash
npm run prisma:studio
```

Then open the `Lead` table in Prisma Studio.

During local development only, you can also check recent submissions at:

```text
http://localhost:3000/api/lead
```

If `DATABASE_URL` is not configured, local submissions use temporary in-memory storage for testing and will disappear when the dev server restarts. Add PostgreSQL `DATABASE_URL` to `.env` to persist real entries.

Simple insert example:

```ts
await prisma.lead.create({
  data: {
    name: "Asha",
    email: "asha@example.com",
    phone: "+918779636850",
    company: "Asha Foods",
    projectType: "Dashboard or analytics",
    budget: "1L-3L",
    timeline: "4-6 weeks",
    message: "Need a dashboard",
    source: "landing-page-contact-form"
  }
});
```

MongoDB is not used in this project. Lead storage is wired for PostgreSQL with Prisma.

## Project Structure

```text
app/
  api/
    chat/route.ts
    lead/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  ai-assist-section.tsx
  case-studies.tsx
  chatbot.tsx
  final-cta.tsx
  fit-section.tsx
  hero.tsx
  process-section.tsx
  project-requirement-form.tsx
  services.tsx
  site-header.tsx
  sticky-whatsapp.tsx
lib/
  leads.ts
  prisma.ts
  utils.ts
  whatsapp.ts
api/
  README.md
prisma/
  schema.prisma
```
