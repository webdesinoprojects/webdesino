-- Safe rollback for potential blog-writing enhancements added during recent prompts.
-- This script is idempotent: it only removes columns if they exist.
-- It does not touch current schema columns defined in prisma/schema.prisma.

BEGIN;

ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "subheading";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "subtitle";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "metaTitle";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "metaDescription";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "seoTitle";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "seoDescription";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "publishedAt";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "status";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "tags";
ALTER TABLE "BlogPost" DROP COLUMN IF EXISTS "readingTime";

COMMIT;
