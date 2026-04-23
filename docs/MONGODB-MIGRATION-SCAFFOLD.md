# MongoDB Migration Scaffold (Phase 3)

This project now includes non-invasive MongoDB scaffolding only.

## Safety posture
- MongoDB Atlas is the target.
- PostgreSQL + Prisma remains active.
- `backup.sql` on VPS remains rollback safety source.
- No Prisma/Postgres removal is done here.
- No production read path rewrites are done here.
- No write cutover to Mongo is enabled here.

## Added components
- Mongo connection cache for Next.js runtimes.
- Mongoose models with `strict: true`, `legacyId`, and migration-aware indexes.
- DB provider flags and repository abstraction scaffolding.
- Migration CLI scaffold with:
1. `dry-run` mode
2. `validate` mode
3. `migrate` mode intentionally stubbed (not yet implemented)

## Environment flags
Use in `.env`:
- `MONGODB_URI`
- `MONGODB_DB`
- `DB_PROVIDER`
- `DB_READ_LOCATIONS`
- `DB_READ_PAGES`
- `DB_READ_SERVICES`
- `DB_READ_BLOGS`
- `DB_READ_ENQUIRIES`

Default rollback-safe configuration should keep all flags on `postgres` until parity validation is complete.
