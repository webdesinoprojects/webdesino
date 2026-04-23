import prisma from "@/lib/prisma";
import {
  BlogRepository,
  CriticalRepositories,
  EnquiryRepository,
  LocationPageRepository,
  PageRepository,
  ServiceRepository,
} from "../types";

const locationRepo: LocationPageRepository = {
  async findBySlug(slug) {
    const row = await prisma.locationPage.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      id: row.id,
      legacyId: row.id,
      slug: row.slug,
      location: row.location,
      title: row.title,
      description: row.description ?? null,
      content: row.content ?? null,
      serviceFocus: row.serviceFocus ?? null,
      state: row.state,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },
  async findManySlugs(limit) {
    return prisma.locationPage.findMany({
      select: { slug: true },
      take: limit,
      orderBy: { updatedAt: "desc" },
    });
  },
  async findFooterLocations(limit) {
    return prisma.locationPage.findMany({
      select: { location: true, slug: true },
      orderBy: { location: "asc" },
      take: limit,
      distinct: ["location"],
    });
  },
  async findRelatedLocations(excludeSlug, limit) {
    return prisma.locationPage.findMany({
      select: { title: true, slug: true, location: true },
      where: { slug: { not: excludeSlug } },
      take: limit,
    });
  },
  async count() {
    return prisma.locationPage.count();
  },
};

const pageRepo: PageRepository = {
  async findBySlug(slug) {
    const row = await prisma.page.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      id: row.id,
      legacyId: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description ?? null,
      content: row.content ?? null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },
};

const serviceRepo: ServiceRepository = {
  async listCategoriesWithSubtypes() {
    const rows = await prisma.serviceCategory.findMany({
      include: { subtypes: true },
      orderBy: { title: "asc" },
    });
    return rows.map((row) => ({
      id: row.id,
      legacyId: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      icon: row.icon ?? null,
      subtypes: row.subtypes.map((subtype: any) => ({
        id: subtype.id,
        legacyId: subtype.id,
        title: subtype.title,
        slug: subtype.slug,
        description: subtype.description,
        features: subtype.features,
        benefits: subtype.benefits,
        icon: subtype.icon ?? null,
        categoryId: subtype.categoryId,
        categoryLegacyId: subtype.categoryId,
      })),
    }));
  },
  async findCategoryBySlug(slug) {
    const row = await prisma.serviceCategory.findUnique({
      where: { slug },
      include: { subtypes: true },
    });
    if (!row) return null;
    return {
      id: row.id,
      legacyId: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      icon: row.icon ?? null,
      subtypes: row.subtypes.map((subtype: any) => ({
        id: subtype.id,
        legacyId: subtype.id,
        title: subtype.title,
        slug: subtype.slug,
        description: subtype.description,
        features: subtype.features,
        benefits: subtype.benefits,
        icon: subtype.icon ?? null,
        categoryId: subtype.categoryId,
        categoryLegacyId: subtype.categoryId,
      })),
    };
  },
};

const blogRepo: BlogRepository = {
  async findBySlug(slug) {
    const row = await prisma.blogPost.findUnique({ where: { slug } });
    if (!row) return null;
    return {
      id: row.id,
      legacyId: row.id,
      title: row.title,
      slug: row.slug,
      date: row.date,
      category: row.category,
      excerpt: row.excerpt,
      image: row.image ?? null,
      content: row.content ?? null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },
  async listPaged(page, pageSize) {
    const skip = Math.max(0, (page - 1) * pageSize);
    const [total, rows] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.findMany({
        orderBy: { date: "desc" },
        skip,
        take: pageSize,
      }),
    ]);
    return {
      total,
      rows: rows.map((row) => ({
        id: row.id,
        legacyId: row.id,
        title: row.title,
        slug: row.slug,
        date: row.date,
        category: row.category,
        excerpt: row.excerpt,
        image: row.image ?? null,
        content: row.content ?? null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      })),
    };
  },
};

const enquiryRepo: EnquiryRepository = {
  async listLatest(limit) {
    const rows = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.map((row) => ({
      id: row.id,
      legacyId: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone ?? null,
      service: row.service ?? null,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  },
  async create(input) {
    const row = await prisma.enquiry.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        service: input.service,
        message: input.message,
        status: input.status,
      },
    });
    return {
      id: row.id,
      legacyId: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone ?? null,
      service: row.service ?? null,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  },
  async updateStatus(id, status) {
    await prisma.enquiry.update({ where: { id }, data: { status } });
  },
};

export function createPrismaCriticalRepositories(): CriticalRepositories {
  return {
    locations: locationRepo,
    pages: pageRepo,
    services: serviceRepo,
    blogs: blogRepo,
    enquiries: enquiryRepo,
  };
}
