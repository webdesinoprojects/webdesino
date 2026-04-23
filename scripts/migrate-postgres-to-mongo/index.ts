import { MIGRATION_ORDER, MigrationMode } from "./config";
import { MigrationLogger } from "./logger";
import { runValidationChecks } from "./checks";

function parseMode(argv: string[]): MigrationMode {
  const modeArg = argv.find((arg) => arg.startsWith("--mode="));
  if (!modeArg) return "dry-run";
  const value = modeArg.split("=")[1] as MigrationMode;
  if (value === "dry-run" || value === "validate" || value === "migrate") return value;
  throw new Error(`Unsupported mode "${value}". Use dry-run, validate, or migrate.`);
}

function parseLimit(argv: string[]): number | null {
  const limitArg = argv.find((arg) => arg.startsWith("--limit="));
  if (!limitArg) return null;
  const parsed = Number(limitArg.split("=")[1]);
  if (Number.isNaN(parsed) || parsed <= 0) throw new Error("Invalid --limit value.");
  return parsed;
}

async function runDryRun(logger: MigrationLogger, limit: number | null) {
  logger.section("Mongo Migration Dry Run");
  logger.info("No writes are executed in dry-run mode.");
  logger.info("PostgreSQL remains the protected rollback source.");
  logger.info("backup.sql should remain untouched for rollback safety.");

  const plan = limit ? MIGRATION_ORDER.slice(0, limit) : MIGRATION_ORDER;
  logger.json("Planned migration order", plan);
}

async function runValidate(logger: MigrationLogger) {
  logger.section("Mongo Migration Validation");
  logger.info("Running parity checks for critical entities (counts + slug parity).");
  const report = await runValidationChecks();
  logger.json("Validation report", report);
}

async function runMigrate(logger: MigrationLogger) {
  logger.section("Mongo Migration Execute");
  logger.warn("Execution mode is scaffolded only.");
  logger.warn("Actual migration write steps are intentionally not implemented in Phase 3.");
  logger.warn("Use --mode=dry-run or --mode=validate for now.");
  process.exitCode = 1;
}

async function main() {
  const logger = new MigrationLogger();
  const mode = parseMode(process.argv.slice(2));
  const limit = parseLimit(process.argv.slice(2));

  logger.info(`Mode: ${mode}`);
  if (limit) logger.info(`Plan limit: ${limit} entities`);

  if (mode === "dry-run") {
    await runDryRun(logger, limit);
    return;
  }

  if (mode === "validate") {
    await runValidate(logger);
    return;
  }

  await runMigrate(logger);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
