/**
 * Verifies DATABASE_URL works: TCP connect + a trivial SQL round-trip.
 * Run from project root: npm run check:db
 */
import * as dotenv from "dotenv";
import { PrismaClient } from "../lib/generated/prisma";

dotenv.config();

function maskDatabaseUrl(raw: string | undefined): string {
  if (!raw) return "(not set)";
  try {
    const u = new URL(raw.replace(/^postgresql:/i, "http:"));
    const host = u.hostname || "?";
    const port = u.port || (raw.includes("postgres") ? "5432" : "");
    const db = u.pathname?.replace(/^\//, "") || "?";
    return `${host}${port ? `:${port}` : ""} / db=${db}`;
  } catch {
    return "(invalid URL)";
  }
}

async function main() {
  const urlInfo = maskDatabaseUrl(process.env.DATABASE_URL);
  console.log("DATABASE_URL target:", urlInfo);

  if (!process.env.DATABASE_URL) {
    console.error("FAIL: DATABASE_URL is missing. Set it in .env or the environment.");
    process.exit(1);
  }

  const prisma = new PrismaClient({
    log: process.env.DEBUG_DB === "1" ? ["query", "error", "warn"] : ["error"],
  });

  try {
    await prisma.$connect();
    const rows = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1::int as ok`;
    const ok = rows[0]?.ok === 1;
    if (!ok) {
      console.error("FAIL: Unexpected response from SELECT 1.");
      process.exit(1);
    }
    console.log("OK: Database is reachable and responding.");
  } catch (e) {
    console.error("FAIL: Could not connect or query the database.");
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
