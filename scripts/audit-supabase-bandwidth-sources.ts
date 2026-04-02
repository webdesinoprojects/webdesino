/**
 * Scans DB content for patterns that drive Supabase Storage / public URL egress:
 * - Literal supabase.co / storage URLs in HTML or JSON
 * - "Storage-relative" paths (no leading `/`) that getStorageUrl() maps to Supabase
 *
 * Run: npm run audit:supabase-bandwidth
 */
import * as dotenv from "dotenv";
import { PrismaClient, Prisma } from "../lib/generated/prisma";

dotenv.config();

const prisma = new PrismaClient();

function isStorageRelativePath(s: string | null | undefined): boolean {
  if (s == null) return false;
  const t = s.trim();
  if (!t) return false;
  if (t.startsWith("/")) return false;
  if (t.startsWith("http://") || t.startsWith("https://")) return false;
  if (t.startsWith("data:")) return false;
  return true;
}

function hasSupabaseStorageUrl(s: string | null | undefined): boolean {
  if (!s) return false;
  const t = s.toLowerCase();
  return t.includes("supabase.co") && (t.includes("/storage/") || t.includes("storage/v1"));
}

async function scalarCount(query: Prisma.Sql): Promise<number> {
  const rows = await prisma.$queryRaw<[{ c: bigint }]>(query);
  return Number(rows[0]?.c ?? 0);
}

async function main() {
  console.log("=".repeat(72));
  console.log("Supabase bandwidth / storage URL audit (database scan)");
  console.log("=".repeat(72));

  const [
    blogTotal,
    blogHtmlHasSupabase,
    pageTotal,
    pageJsonHasSupabase,
    locTotal,
    locJsonHasSupabase,
    legalTotal,
    legalHtmlHasSupabase,
    faqTotal,
    faqHtmlHasSupabase,
    mediaTotal,
    blogImageSupabaseUrl,
  ] = await Promise.all([
    prisma.blogPost.count(),
    scalarCount(Prisma.sql`
      SELECT COUNT(*)::bigint AS c FROM "BlogPost"
      WHERE "content" IS NOT NULL AND (
        "content" ILIKE ${"%supabase.co%"}
        OR "content" ILIKE ${"%storage/v1/object%"}
      )
    `),
    prisma.page.count(),
    scalarCount(Prisma.sql`
      SELECT COUNT(*)::bigint AS c FROM "Page"
      WHERE "content" IS NOT NULL AND (
        "content"::text ILIKE ${"%supabase.co%"}
        OR "content"::text ILIKE ${"%storage/v1/object%"}
      )
    `),
    prisma.locationPage.count(),
    scalarCount(Prisma.sql`
      SELECT COUNT(*)::bigint AS c FROM "LocationPage"
      WHERE "content" IS NOT NULL AND (
        "content"::text ILIKE ${"%supabase.co%"}
        OR "content"::text ILIKE ${"%storage/v1/object%"}
      )
    `),
    prisma.legalPage.count(),
    prisma.legalPage.count({
      where: {
        OR: [
          { content: { contains: "supabase.co", mode: "insensitive" } },
          { content: { contains: "storage/v1/object", mode: "insensitive" } },
        ],
      },
    }),
    prisma.faq.count(),
    prisma.faq.count({
      where: {
        OR: [
          { answer: { contains: "supabase.co", mode: "insensitive" } },
          { answer: { contains: "storage/v1/object", mode: "insensitive" } },
        ],
      },
    }),
    prisma.media.count(),
    prisma.blogPost.count({
      where: { image: { contains: "supabase.co", mode: "insensitive" } },
    }),
  ]);

  const blogRowsForRel = await prisma.blogPost.findMany({ select: { image: true } });
  const blogImageStorageRel = blogRowsForRel.filter((r) => isStorageRelativePath(r.image)).length;

  const projects = await prisma.project.findMany({ select: { slug: true, image: true } });
  const projectSupabaseUrl = projects.filter((p) => hasSupabaseStorageUrl(p.image)).length;
  const projectStorageRel = projects.filter((p) => isStorageRelativePath(p.image)).length;

  const clients = await prisma.client.findMany({ select: { id: true, image: true } });
  const clientSupabaseUrl = clients.filter((c) => hasSupabaseStorageUrl(c.image)).length;
  const clientStorageRel = clients.filter((c) => isStorageRelativePath(c.image)).length;

  const team = await prisma.teamMember.findMany({ select: { id: true, image: true } });
  const teamSupabaseUrl = team.filter((t) => hasSupabaseStorageUrl(t.image)).length;
  const teamStorageRel = team.filter((t) => isStorageRelativePath(t.image)).length;

  const certs = await prisma.certification.findMany({ select: { id: true, image: true } });
  const certSupabaseUrl = certs.filter((c) => hasSupabaseStorageUrl(c.image)).length;
  const certStorageRel = certs.filter((c) => isStorageRelativePath(c.image)).length;

  const categories = await prisma.serviceCategory.findMany({ select: { slug: true, icon: true } });
  const catSuspicious = categories.filter(
    (c) => c.icon && (hasSupabaseStorageUrl(c.icon) || isStorageRelativePath(c.icon))
  ).length;

  const subtypes = await prisma.serviceSubtype.findMany({ select: { slug: true, icon: true } });
  const subSuspicious = subtypes.filter(
    (s) => s.icon && (hasSupabaseStorageUrl(s.icon) || isStorageRelativePath(s.icon))
  ).length;

  console.log("\n--- HTML / long text (direct browser hits, often full-size images) ---\n");
  console.log(
    `BlogPost.content with supabase.co or storage/v1/object: ${blogHtmlHasSupabase} of ${blogTotal}`
  );
  console.log(`Page.content (JSON) text match:                      ${pageJsonHasSupabase} of ${pageTotal}`);
  console.log(
    `LocationPage.content (JSON) text match:                 ${locJsonHasSupabase} of ${locTotal}`
  );
  console.log(`LegalPage.content HTML match:                         ${legalHtmlHasSupabase} of ${legalTotal}`);
  console.log(`Faq.answer HTML match:                                 ${faqHtmlHasSupabase} of ${faqTotal}`);

  console.log("\n--- Image / URL fields ---\n");
  console.log(
    "(Paths without leading `/` and not http(s) are mapped by getStorageUrl() to Supabase public objects unless NEXT_PUBLIC_CDN_URL is set.)\n"
  );
  console.log(`BlogPost.image — literal supabase.co in string: ${blogImageSupabaseUrl}`);
  console.log(`BlogPost.image — storage-relative path:         ${blogImageStorageRel}`);
  console.log(`Project.image — full Supabase storage URL:    ${projectSupabaseUrl} (${projects.length} rows)`);
  console.log(`Project.image — storage-relative path:          ${projectStorageRel}`);
  console.log(`Client.image — full Supabase storage URL:     ${clientSupabaseUrl} (${clients.length} rows)`);
  console.log(`Client.image — storage-relative path:         ${clientStorageRel}`);
  console.log(`TeamMember.image — full Supabase URL:         ${teamSupabaseUrl}`);
  console.log(`TeamMember.image — storage-relative:            ${teamStorageRel}`);
  console.log(`Certification.image — full Supabase URL:      ${certSupabaseUrl}`);
  console.log(`Certification.image — storage-relative:       ${certStorageRel}`);
  console.log(`ServiceCategory.icon (supabase or rel path):  ${catSuspicious}`);
  console.log(`ServiceSubtype.icon (supabase or rel path):   ${subSuspicious}`);
  console.log(`Media rows (urls stored after upload):        ${mediaTotal}`);

  const sampleBlogs = await prisma.blogPost.findMany({
    where: {
      OR: [
        { content: { contains: "supabase.co", mode: "insensitive" } },
        { content: { contains: "storage/v1", mode: "insensitive" } },
      ],
    },
    select: { slug: true, title: true },
    take: 8,
  });
  if (sampleBlogs.length) {
    console.log("\n--- Sample BlogPost slugs (HTML mentions Supabase storage) ---\n");
    for (const b of sampleBlogs) console.log(`  /blog/${b.slug} — ${b.title}`);
  }

  const samplePages = await prisma.$queryRaw<Array<{ slug: string }>>`
    SELECT slug FROM "Page"
    WHERE "content" IS NOT NULL AND (
      "content"::text ILIKE ${"%supabase.co%"}
      OR "content"::text ILIKE ${"%storage/v1/object%"}
    )
    LIMIT 8
  `;
  if (samplePages.length) {
    console.log("\n--- Sample Page slugs (JSON mentions Supabase storage) ---\n");
    for (const p of samplePages) console.log(`  /${p.slug}`);
  }

  const sampleLocs = await prisma.$queryRaw<Array<{ slug: string }>>`
    SELECT slug FROM "LocationPage"
    WHERE "content" IS NOT NULL AND (
      "content"::text ILIKE ${"%supabase.co%"}
      OR "content"::text ILIKE ${"%storage/v1/object%"}
    )
    LIMIT 8
  `;
  if (sampleLocs.length) {
    console.log("\n--- Sample LocationPage slugs (JSON mentions Supabase storage) ---\n");
    for (const p of sampleLocs) console.log(`  /${p.slug}`);
  }

  console.log("\n" + "=".repeat(72));
  console.log("Done. Compare with Supabase dashboard: Storage vs Database egress.");
  console.log("=".repeat(72));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
