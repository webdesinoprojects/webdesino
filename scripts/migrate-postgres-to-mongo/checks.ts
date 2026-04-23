import prisma from "../../lib/prisma";
import { connectToMongo } from "../../lib/mongo/connection";
import {
  BlogPostModel,
  EnquiryModel,
  LocationPageModel,
  PageModel,
  ServiceCategoryModel,
  ServiceSubtypeModel,
} from "../../lib/mongo/models";

type CountCheck = {
  entity: string;
  postgres: number;
  mongo: number;
  delta: number;
  ok: boolean;
};

type SlugCheck = {
  entity: string;
  missingInMongo: number;
  extraInMongo: number;
  ok: boolean;
};

function toSet(values: string[]): Set<string> {
  return new Set(values.filter(Boolean));
}

function diffCount(source: Set<string>, target: Set<string>) {
  let count = 0;
  for (const value of source.values()) {
    if (!target.has(value)) count += 1;
  }
  return count;
}

export async function runValidationChecks() {
  await connectToMongo();

  const countChecks: CountCheck[] = [];
  const slugChecks: SlugCheck[] = [];

  const [
    pgLocationCount,
    mongoLocationCount,
    pgPageCount,
    mongoPageCount,
    pgServiceCategoryCount,
    mongoServiceCategoryCount,
    pgServiceSubtypeCount,
    mongoServiceSubtypeCount,
    pgBlogCount,
    mongoBlogCount,
    pgEnquiryCount,
    mongoEnquiryCount,
  ] = await Promise.all([
    prisma.locationPage.count(),
    LocationPageModel.countDocuments(),
    prisma.page.count(),
    PageModel.countDocuments(),
    prisma.serviceCategory.count(),
    ServiceCategoryModel.countDocuments(),
    prisma.serviceSubtype.count(),
    ServiceSubtypeModel.countDocuments(),
    prisma.blogPost.count(),
    BlogPostModel.countDocuments(),
    prisma.enquiry.count(),
    EnquiryModel.countDocuments(),
  ]);

  countChecks.push(
    {
      entity: "LocationPage",
      postgres: pgLocationCount,
      mongo: mongoLocationCount,
      delta: mongoLocationCount - pgLocationCount,
      ok: mongoLocationCount === pgLocationCount,
    },
    {
      entity: "Page",
      postgres: pgPageCount,
      mongo: mongoPageCount,
      delta: mongoPageCount - pgPageCount,
      ok: mongoPageCount === pgPageCount,
    },
    {
      entity: "ServiceCategory",
      postgres: pgServiceCategoryCount,
      mongo: mongoServiceCategoryCount,
      delta: mongoServiceCategoryCount - pgServiceCategoryCount,
      ok: mongoServiceCategoryCount === pgServiceCategoryCount,
    },
    {
      entity: "ServiceSubtype",
      postgres: pgServiceSubtypeCount,
      mongo: mongoServiceSubtypeCount,
      delta: mongoServiceSubtypeCount - pgServiceSubtypeCount,
      ok: mongoServiceSubtypeCount === pgServiceSubtypeCount,
    },
    {
      entity: "BlogPost",
      postgres: pgBlogCount,
      mongo: mongoBlogCount,
      delta: mongoBlogCount - pgBlogCount,
      ok: mongoBlogCount === pgBlogCount,
    },
    {
      entity: "Enquiry",
      postgres: pgEnquiryCount,
      mongo: mongoEnquiryCount,
      delta: mongoEnquiryCount - pgEnquiryCount,
      ok: mongoEnquiryCount === pgEnquiryCount,
    }
  );

  const [pgLocationSlugs, mongoLocationSlugs, pgPageSlugs, mongoPageSlugs, pgBlogSlugs, mongoBlogSlugs] =
    await Promise.all([
      prisma.locationPage.findMany({ select: { slug: true } }),
      LocationPageModel.find({}, { slug: 1, _id: 0 }).lean(),
      prisma.page.findMany({ select: { slug: true } }),
      PageModel.find({}, { slug: 1, _id: 0 }).lean(),
      prisma.blogPost.findMany({ select: { slug: true } }),
      BlogPostModel.find({}, { slug: 1, _id: 0 }).lean(),
    ]);

  const pgLocationSet = toSet(pgLocationSlugs.map((r: any) => r.slug));
  const mongoLocationSet = toSet(mongoLocationSlugs.map((r: any) => r.slug));
  const pgPageSet = toSet(pgPageSlugs.map((r: any) => r.slug));
  const mongoPageSet = toSet(mongoPageSlugs.map((r: any) => r.slug));
  const pgBlogSet = toSet(pgBlogSlugs.map((r: any) => r.slug));
  const mongoBlogSet = toSet(mongoBlogSlugs.map((r: any) => r.slug));

  slugChecks.push(
    {
      entity: "LocationPage.slug",
      missingInMongo: diffCount(pgLocationSet, mongoLocationSet),
      extraInMongo: diffCount(mongoLocationSet, pgLocationSet),
      ok: diffCount(pgLocationSet, mongoLocationSet) === 0 && diffCount(mongoLocationSet, pgLocationSet) === 0,
    },
    {
      entity: "Page.slug",
      missingInMongo: diffCount(pgPageSet, mongoPageSet),
      extraInMongo: diffCount(mongoPageSet, pgPageSet),
      ok: diffCount(pgPageSet, mongoPageSet) === 0 && diffCount(mongoPageSet, pgPageSet) === 0,
    },
    {
      entity: "BlogPost.slug",
      missingInMongo: diffCount(pgBlogSet, mongoBlogSet),
      extraInMongo: diffCount(mongoBlogSet, pgBlogSet),
      ok: diffCount(pgBlogSet, mongoBlogSet) === 0 && diffCount(mongoBlogSet, pgBlogSet) === 0,
    }
  );

  const isCountParityOk = countChecks.every((row) => row.ok);
  const isSlugParityOk = slugChecks.every((row) => row.ok);

  return {
    countChecks,
    slugChecks,
    summary: {
      isCountParityOk,
      isSlugParityOk,
      isOverallOk: isCountParityOk && isSlugParityOk,
    },
  };
}
