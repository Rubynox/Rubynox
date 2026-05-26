# Rubynoxx Website

Software agency website built with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL, Prisma, a guided chatbot, and lead capture.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env` from `.env.example`.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/rubunoxx?schema=public"
NEXT_PUBLIC_SITE_URL="https://rubynoxx.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="918779636850"
```

Optional direct WhatsApp Cloud API notification variables:

```bash
WHATSAPP_NOTIFY_NUMBER="918779636850"
WHATSAPP_CLOUD_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
```

Without WhatsApp Cloud API credentials, the app stores the memo and returns a free `wa.me` fallback link.

## PostgreSQL + Prisma

1. Create a PostgreSQL database.
2. Add `DATABASE_URL` to `.env`.
3. Run:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Tables:

- `Lead`
- `Requirement`
- `ChatConversation`

During local development only, recent leads are available at:

```text
http://localhost:3000/api/lead
```

If `DATABASE_URL` is not configured, local submissions use temporary in-memory storage for testing.
