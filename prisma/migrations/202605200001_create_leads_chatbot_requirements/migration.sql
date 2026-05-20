CREATE TABLE IF NOT EXISTS "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "businessType" TEXT,
    "projectType" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'website',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "chatbot_conversations" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "businessType" TEXT,
    "projectType" TEXT,
    "conversationSummary" TEXT,
    "memo" TEXT,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatbot_conversations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "requirements" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "conversationId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "businessType" TEXT,
    "projectType" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "requirement" TEXT NOT NULL,
    "features" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "estimatedScope" TEXT,
    "conversationSummary" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'website',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "leads_createdAt_idx" ON "leads"("createdAt");
CREATE INDEX IF NOT EXISTS "leads_email_idx" ON "leads"("email");
CREATE INDEX IF NOT EXISTS "leads_phone_idx" ON "leads"("phone");
CREATE INDEX IF NOT EXISTS "chatbot_conversations_createdAt_idx" ON "chatbot_conversations"("createdAt");
CREATE INDEX IF NOT EXISTS "chatbot_conversations_phone_idx" ON "chatbot_conversations"("phone");
CREATE INDEX IF NOT EXISTS "chatbot_conversations_email_idx" ON "chatbot_conversations"("email");
CREATE INDEX IF NOT EXISTS "requirements_createdAt_idx" ON "requirements"("createdAt");
CREATE INDEX IF NOT EXISTS "requirements_projectType_idx" ON "requirements"("projectType");
CREATE INDEX IF NOT EXISTS "requirements_conversationId_idx" ON "requirements"("conversationId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'requirements_leadId_fkey'
  ) THEN
    ALTER TABLE "requirements"
    ADD CONSTRAINT "requirements_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'requirements_conversationId_fkey'
  ) THEN
    ALTER TABLE "requirements"
    ADD CONSTRAINT "requirements_conversationId_fkey"
    FOREIGN KEY ("conversationId") REFERENCES "chatbot_conversations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
