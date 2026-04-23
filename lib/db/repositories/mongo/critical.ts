import { connectToMongo } from "../../../mongo/connection";
import {
  BlogPostModel,
  EnquiryModel,
  LocationPageModel,
  PageModel,
  ServiceCategoryModel,
  ServiceSubtypeModel,
} from "../../../mongo/models";
import {
  BlogRepository,
  CriticalRepositories,
  EnquiryRepository,
  LocationPageRepository,
  PageRepository,
  ServiceCategoryEntity,
  ServiceRepository,
  ServiceSubtypeEntity,
} from "../types";

function mapServiceSubtype(row: any): ServiceSubtypeEntity {
  return {
    id: row._id.toString(),
    legacyId: row.legacyId,
    title: row.title,
    slug: row.slug,
    description: row.description,
    features: row.features ?? [],
    benefits: row.benefits ?? [],
    icon: row.icon ?? null,
    categoryId: row.categoryId?.toString?.() ?? "",
    categoryLegacyId: row.categoryLegacyId,
  };
}

function mapServiceCategory(row: any, subtypes?: any[]): ServiceCategoryEntity {
  return {
    id: row._id.toString(),
    legacyId: row.legacyId,
    title: row.title,
    slug: row.slug,
    description: row.description,
    icon: row.icon ?? null,
    subtypes: subtypes?.map(mapServiceSubtype),
  };
}

const locationRepo: LocationPageRepository = {
  async findBySlug(slug) {
    await connectToMongo();
    const row = (await LocationPageModel.findOne({ slug }).lean()) as any | null;
    if (!row) return null;
    return {
      id: row._id.toString(),
      legacyId: row.legacyId,
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
    await connectToMongo();
    const rows = (await LocationPageModel.find({}, { slug: 1, _id: 0 })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .lean()) as unknown as Array<{ slug: string }>;
    return rows.map((row) => ({ slug: row.slug }));
  },
  async findFooterLocations(limit) {
    await connectToMongo();
    const rows = (await LocationPageModel.aggregate([
      { $sort: { location: 1 } },
      { $group: { _id: "$location", slug: { $first: "$slug" } } },
      { $limit: limit },
      { $project: { _id: 0, location: "$_id", slug: 1 } },
    ])) as Array<{ location: string; slug: string }>;
    return rows;
  },
  async findRelatedLocations(excludeSlug, limit) {
    await connectToMongo();
    const rows = (await LocationPageModel.find(
      { slug: { $ne: excludeSlug } },
      { title: 1, slug: 1, location: 1, _id: 0 }
    )
      .limit(limit)
      .lean()) as unknown as Array<{ title: string; slug: string; location: string }>;
    return rows;
  },
  async count() {
    await connectToMongo();
    return LocationPageModel.countDocuments();
  },
};

const pageRepo: PageRepository = {
  async findBySlug(slug) {
    await connectToMongo();
    const row = (await PageModel.findOne({ slug }).lean()) as any | null;
    if (!row) return null;
    return {
      id: row._id.toString(),
      legacyId: row.legacyId,
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
    await connectToMongo();
    const categories = (await ServiceCategoryModel.find().sort({ title: 1 }).lean()) as any[];
    const categoryIds = categories.map((c) => c._id);
    const subtypes = (await ServiceSubtypeModel.find({ categoryId: { $in: categoryIds } }).lean()) as any[];
    const subtypeMap = new Map<string, any[]>();
    for (const subtype of subtypes) {
      const key = subtype.categoryId.toString();
      const list = subtypeMap.get(key) ?? [];
      list.push(subtype);
      subtypeMap.set(key, list);
    }
    return categories.map((category) =>
      mapServiceCategory(category, subtypeMap.get(category._id.toString()) ?? [])
    );
  },
  async findCategoryBySlug(slug) {
    await connectToMongo();
    const category = (await ServiceCategoryModel.findOne({ slug }).lean()) as any | null;
    if (!category) return null;
    const subtypes = (await ServiceSubtypeModel.find({ categoryId: category._id }).lean()) as any[];
    return mapServiceCategory(category, subtypes);
  },
};

const blogRepo: BlogRepository = {
  async findBySlug(slug) {
    await connectToMongo();
    const row = (await BlogPostModel.findOne({ slug }).lean()) as any | null;
    if (!row) return null;
    return {
      id: row._id.toString(),
      legacyId: row.legacyId,
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
    await connectToMongo();
    const skip = Math.max(0, (page - 1) * pageSize);
    const [total, rows] = await Promise.all([
      BlogPostModel.countDocuments(),
      BlogPostModel.find().sort({ date: -1 }).skip(skip).limit(pageSize).lean() as Promise<any[]>,
    ]);
    return {
      total,
      rows: rows.map((row) => ({
        id: row._id.toString(),
        legacyId: row.legacyId,
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
    await connectToMongo();
    const rows = (await EnquiryModel.find().sort({ createdAt: -1 }).limit(limit).lean()) as any[];
    return rows.map((row) => ({
      id: row._id.toString(),
      legacyId: row.legacyId,
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
    await connectToMongo();
    const created = await EnquiryModel.create({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      service: input.service ?? null,
      message: input.message,
      status: input.status,
    });

    const row = created.toObject() as any;
    return {
      id: row._id.toString(),
      legacyId: row.legacyId,
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
    await connectToMongo();
    const updated = await EnquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, projection: { _id: 1 } }
    ).lean();

    if (!updated) {
      throw new Error(`Enquiry not found for id: ${id}`);
    }
  },
};

export function createMongoCriticalRepositories(): CriticalRepositories {
  return {
    locations: locationRepo,
    pages: pageRepo,
    services: serviceRepo,
    blogs: blogRepo,
    enquiries: enquiryRepo,
  };
}
