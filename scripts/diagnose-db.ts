/**
 * Comprehensive Database Diagnostics Script
 * Checks: connectivity, schema, tables, queries, migrations, and common issues
 * Run: npm run diagnose:db
 */
import * as dotenv from "dotenv";
import { PrismaClient } from "../lib/generated/prisma";

dotenv.config();

interface DiagnosticResult {
  category: string;
  status: "✓" | "✗" | "⚠";
  message: string;
  details?: string;
}

const results: DiagnosticResult[] = [];

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

function addResult(category: string, status: "✓" | "✗" | "⚠", message: string, details?: string) {
  results.push({ category, status, message, details });
}

async function checkEnvironment() {
  console.log("\n📋 Checking Environment Variables...");
  
  if (!process.env.DATABASE_URL) {
    addResult("Environment", "✗", "DATABASE_URL is not set");
    return false;
  }
  
  addResult("Environment", "✓", `DATABASE_URL is set: ${maskDatabaseUrl(process.env.DATABASE_URL)}`);

  if (!process.env.DIRECT_URL) {
    addResult("Environment", "⚠", "DIRECT_URL is not set (may cause issues with migrations)", "Consider setting DIRECT_URL for reliable migrations");
  } else {
    addResult("Environment", "✓", `DIRECT_URL is set: ${maskDatabaseUrl(process.env.DIRECT_URL)}`);
  }

  return true;
}

async function checkConnectivity(prisma: PrismaClient) {
  console.log("\n🔗 Checking Database Connectivity...");
  
  try {
    const startTime = Date.now();
    await prisma.$connect();
    const duration = Date.now() - startTime;
    
    addResult("Connectivity", "✓", `Connected successfully (${duration}ms)`);
    return true;
  } catch (error) {
    addResult("Connectivity", "✗", "Failed to connect", error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function checkBasicQuery(prisma: PrismaClient) {
  console.log("\n⚙️  Checking Basic Query...");
  
  try {
    const startTime = Date.now();
    const rows = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1::int as ok`;
    const duration = Date.now() - startTime;
    
    if (rows[0]?.ok === 1) {
      addResult("Basic Query", "✓", `SELECT 1 works (${duration}ms)`);
      return true;
    } else {
      addResult("Basic Query", "✗", "SELECT 1 returned unexpected result");
      return false;
    }
  } catch (error) {
    addResult("Basic Query", "✗", "Query failed", error instanceof Error ? error.message : String(error));
    return false;
  }
}

async function checkDatabaseSize(prisma: PrismaClient) {
  console.log("\n📊 Checking Database Size...");
  
  try {
    const result = await prisma.$queryRaw<Array<{ db_size: string }>>`
      SELECT pg_size_pretty(pg_database.datsize) as db_size
      FROM pg_database
      WHERE datname = current_database()
    `;
    
    addResult("Database Size", "✓", `Database size: ${result[0]?.db_size || "unknown"}`);
  } catch (error) {
    addResult("Database Size", "⚠", "Could not determine database size", error instanceof Error ? error.message : String(error));
  }
}

async function checkTables(prisma: PrismaClient) {
  console.log("\n📋 Checking Tables...");
  
  try {
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `;
    
    if (tables.length > 0) {
      addResult("Tables", "✓", `Found ${tables.length} tables`, `Tables: ${tables.map(t => t.tablename).join(", ")}`);
    } else {
      addResult("Tables", "⚠", "No tables found in public schema", "Database schema may not be initialized. Run: npx prisma migrate deploy");
    }
  } catch (error) {
    addResult("Tables", "✗", "Could not check tables", error instanceof Error ? error.message : String(error));
  }
}

async function checkConnections(prisma: PrismaClient) {
  console.log("🔌 Checking Active Connections...");
  
  try {
    const connections = await Promise.race([
      prisma.$queryRaw<Array<{ count: BigInt }>>`
        SELECT count(*) as count FROM pg_stat_activity 
        WHERE datname = current_database()
      `,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    
    const connCount = Number(connections[0]?.count || 0);
    if (connCount > 20) {
      addResult("Connections", "⚠", `${connCount} active connections (high)`, "Consider checking for connection leaks");
    } else {
      addResult("Connections", "✓", `${connCount} active connections (normal)`);
    }
  } catch (error) {
    addResult("Connections", "⚠", "Could not check connections", error instanceof Error ? error.message : String(error));
  }
}

async function checkMigrations(prisma: PrismaClient) {
  console.log("🔄 Checking Migrations...");
  
  try {
    const migrations = await Promise.race([
      prisma.$queryRaw<Array<{ id: string; checksum: string; finished_at: Date }>>`
        SELECT id, checksum, finished_at FROM "_prisma_migrations"
        ORDER BY finished_at DESC
        LIMIT 5
      `,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    
    if (migrations.length > 0) {
      addResult("Migrations", "✓", `${migrations.length} migrations applied`, `Latest: ${migrations[0]?.id}`);
    } else {
      addResult("Migrations", "⚠", "No migrations found", "Run: npx prisma migrate deploy");
    }
  } catch (error) {
    addResult("Migrations", "⚠", "Could not check migrations", error instanceof Error ? error.message : String(error));
  }
}

async function checkTableRowCounts(prisma: PrismaClient) {
  console.log("📈 Checking Table Row Counts...");
  
  try {
    const rowCounts = await Promise.race([
      prisma.$queryRaw<Array<{ relname: string; n_live_tup: number }>>`
        SELECT relname, n_live_tup FROM pg_stat_user_tables
        WHERE schemaname = 'public'
        ORDER BY n_live_tup DESC
      `,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    
    const summary = rowCounts.slice(0, 10).map(r => `${r.relname}: ${r.n_live_tup}`).join(", ");
    addResult("Table Rows", "✓", `Row counts retrieved (${rowCounts.length} tables)`, summary);
  } catch (error) {
    addResult("Table Rows", "⚠", "Could not check row counts", error instanceof Error ? error.message : String(error));
  }
}

async function checkIndexes(prisma: PrismaClient) {
  console.log("🔎 Checking Indexes...");
  
  try {
    const indexes = await Promise.race([
      prisma.$queryRaw<Array<{ indexname: string; tablename: string }>>`
        SELECT indexname, tablename FROM pg_indexes 
        WHERE schemaname = 'public'
        ORDER BY tablename, indexname
      `,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    
    addResult("Indexes", "✓", `Found ${indexes.length} indexes`);
  } catch (error) {
    addResult("Indexes", "⚠", "Could not check indexes", error instanceof Error ? error.message : String(error));
  }
}

async function checkQueryPerformance(prisma: PrismaClient) {
  console.log("⏱️  Checking Query Performance...");
  
  try {
    const startTime = Date.now();
    await Promise.race([
      prisma.$queryRaw`SELECT 1 FROM pg_class LIMIT 1`,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    const duration = Date.now() - startTime;
    
    if (duration < 100) {
      addResult("Query Performance", "✓", `Queries responsive (${duration}ms)`);
    } else if (duration < 500) {
      addResult("Query Performance", "⚠", `Queries slow (${duration}ms)`, "Consider optimizing database performance");
    } else {
      addResult("Query Performance", "✗", `Queries very slow (${duration}ms)`, "Database may be overloaded or connection issues");
    }
  } catch (error) {
    addResult("Query Performance", "⚠", "Could not test performance", error instanceof Error ? error.message : String(error));
  }
}

async function checkReplication(prisma: PrismaClient) {
  console.log("🔀 Checking Replication Status...");
  
  try {
    const replication = await Promise.race([
      prisma.$queryRaw<Array<{ wal_level: string }>>`
        SELECT setting as wal_level FROM pg_settings WHERE name = 'wal_level'
      `,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout after 5s")), 5000)
      ) as Promise<never>
    ]);
    
    addResult("Replication", "✓", `WAL level: ${replication[0]?.wal_level || "unknown"}`);
  } catch (error) {
    addResult("Replication", "⚠", "Could not check replication", error instanceof Error ? error.message : String(error));
  }
}

async function printReport() {
  console.log("\n\n" + "=".repeat(70));
  console.log("DATABASE DIAGNOSTIC REPORT".padStart(50));
  console.log("=".repeat(70));

  const categories = [...new Set(results.map(r => r.category))];

  for (const category of categories) {
    console.log(`\n${category}:`);
    const categoryResults = results.filter(r => r.category === category);
    
    for (const result of categoryResults) {
      const statusSymbol = result.status === "✓" ? "✅" : result.status === "✗" ? "❌" : "⚠️ ";
      console.log(`  ${statusSymbol} ${result.message}`);
      
      if (result.details) {
        console.log(`     💡 ${result.details}`);
      }
    }
  }

  const failCount = results.filter(r => r.status === "✗").length;
  const warnCount = results.filter(r => r.status === "⚠").length;

  console.log("\n" + "=".repeat(70));
  console.log(`Summary: ${results.length - failCount - warnCount} ✓ | ${warnCount} ⚠️  | ${failCount} ❌`);
  console.log("=".repeat(70));

  if (failCount > 0) {
    console.log("\n🚨 CRITICAL ISSUES FOUND - Database may not be functioning properly");
    return 1;
  } else if (warnCount > 0) {
    console.log("\n⚠️  WARNINGS FOUND - Review the items above");
    return 0;
  } else {
    console.log("\n✅ All checks passed - Database appears to be working correctly!");
    return 0;
  }
}

async function main() {
  console.log("🔍 Starting Database Diagnostics...\n");

  const hasEnv = await checkEnvironment();
  if (!hasEnv) {
    await printReport();
    process.exit(1);
  }

  const prisma = new PrismaClient({
    log: [],
  });

  try {
    const connected = await checkConnectivity(prisma);
    if (!connected) {
      await printReport();
      process.exit(1);
    }

    await checkBasicQuery(prisma);
    await checkDatabaseSize(prisma);
    await checkTables(prisma);
    await checkConnections(prisma);
    await checkMigrations(prisma);
    await checkTableRowCounts(prisma);
    await checkIndexes(prisma);
    await checkQueryPerformance(prisma);
    await checkReplication(prisma);

    const exitCode = await printReport();
    process.exit(exitCode);
  } catch (error) {
    console.error("Fatal error during diagnostics:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
