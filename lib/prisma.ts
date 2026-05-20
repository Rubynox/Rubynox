import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

function loadDevelopmentDatabaseUrl() {
  if (process.env.DATABASE_URL || process.env.NODE_ENV === "production") return;

  const envExamplePath = join(process.cwd(), ".env.example");
  if (!existsSync(envExamplePath)) return;

  const line = readFileSync(envExamplePath, "utf8")
    .split(/\r?\n/)
    .find((item) => item.trim().startsWith("DATABASE_URL="));

  if (!line) return;

  process.env.DATABASE_URL = line.replace(/^DATABASE_URL=/, "").trim().replace(/^"|"$/g, "");
}

loadDevelopmentDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
