# Postgres -> Mongo Migration Scaffold

This scaffold is intentionally rollback-safe:
- PostgreSQL + Prisma remains active.
- `backup.sql` remains protected rollback source.
- No production read-path rewrite happens here.
- Mongo write cutover is not enabled in this phase.

## Modes

1. Dry run (default)
```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-postgres-to-mongo/index.ts
```

2. Dry run with explicit mode
```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-postgres-to-mongo/index.ts --mode=dry-run
```

3. Validate parity (critical entities)
```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-postgres-to-mongo/index.ts --mode=validate
```

4. Execute (scaffold-only, intentionally not implemented yet)
```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/migrate-postgres-to-mongo/index.ts --mode=migrate
```

## Notes
- Validation currently checks count and slug parity for critical entities.
- Migration execution steps will be added only after explicit approval.
