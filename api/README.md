# API Notes

The live Next.js API routes are inside `app/api`.

## Routes

- `POST /api/chat`
  - Body: `{ "message": "I need a CRM" }`
  - Returns a guided assistant reply. If the assistant cannot answer confidently, it returns `shouldRedirect: true` with a WhatsApp URL.

- `POST /api/lead`
  - Body: `{ "name": "Asha", "email": "asha@example.com", "phone": "+91...", "company": "Asha Foods", "projectType": "Dashboard or analytics", "budget": "1L-3L", "timeline": "4-6 weeks", "message": "Need a dashboard", "source": "landing-page-contact-form" }`
  - Stores the lead in PostgreSQL through Prisma when `DATABASE_URL` is set.
  - Uses temporary in-memory storage during local testing if no database is configured.

- `GET /api/lead`
  - Local development only.
  - Returns the 25 most recent leads so you can quickly confirm form submissions.
  - Disabled in production.
