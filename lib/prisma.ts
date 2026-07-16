import { connectToMongo } from "./mongo/connection";
import {
  AdminModel,
  BlogCommentModel,
  BlogPostModel,
  CareerApplicationModel,
  CareerCategoryModel,
  CareerFormFieldModel,
  CertificationModel,
  ClientModel,
  CompanySettingsModel,
  EmployeeLogModel,
  EmployeeModel,
  EnquiryModel,
  FaqModel,
  LegalPageModel,
  LocationPageModel,
  MediaModel,
  PageModel,
  ProjectModel,
  ServiceCategoryModel,
  ServiceSubtypeModel,
  TeamMemberModel,
  TestimonialModel,
} from "./mongo/models";

type AnyObject = any;
type PrismaLikeDelegate = {
  findUnique(args: AnyObject): Promise<AnyObject | null>;
  findFirst(args: AnyObject): Promise<AnyObject | null>;
  findMany(args?: AnyObject): Promise<AnyObject[]>;
  count(args?: AnyObject): Promise<number>;
  create(args: AnyObject): Promise<AnyObject>;
  createMany(args: AnyObject): Promise<{ count: number }>;
  update(args: AnyObject): Promise<AnyObject>;
  updateMany(args: AnyObject): Promise<{ count: number }>;
  delete(args: AnyObject): Promise<AnyObject>;
  deleteMany(args: AnyObject): Promise<{ count: number }>;
  upsert(args: AnyObject): Promise<AnyObject>;
  groupBy(args: AnyObject): Promise<AnyObject[]>;
};

type PrismaLikeClient = {
  admin: PrismaLikeDelegate;
  employee: PrismaLikeDelegate;
  employeeLog: PrismaLikeDelegate;
  project: PrismaLikeDelegate;
  blogPost: PrismaLikeDelegate;
  blogComment: PrismaLikeDelegate;
  enquiry: PrismaLikeDelegate;
  testimonial: PrismaLikeDelegate;
  serviceCategory: PrismaLikeDelegate;
  serviceSubtype: PrismaLikeDelegate;
  locationPage: PrismaLikeDelegate;
  page: PrismaLikeDelegate;
  client: PrismaLikeDelegate;
  teamMember: PrismaLikeDelegate;
  certification: PrismaLikeDelegate;
  companySettings: PrismaLikeDelegate;
  legalPage: PrismaLikeDelegate;
  faq: PrismaLikeDelegate;
  media: PrismaLikeDelegate;
  careerCategory: PrismaLikeDelegate;
  careerFormField: PrismaLikeDelegate;
  careerApplication: PrismaLikeDelegate;
  $connect: () => Promise<void>;
  $disconnect: () => Promise<void>;
  $transaction: (tx: any) => Promise<any>;
  $queryRaw: (...args: any[]) => Promise<any>;
  $executeRaw: (...args: any[]) => Promise<any>;
};

const modelMap: Record<string, any> = {
  admin: AdminModel,
  employee: EmployeeModel,
  employeeLog: EmployeeLogModel,
  project: ProjectModel,
  blogPost: BlogPostModel,
  blogComment: BlogCommentModel,
  enquiry: EnquiryModel,
  testimonial: TestimonialModel,
  serviceCategory: ServiceCategoryModel,
  serviceSubtype: ServiceSubtypeModel,
  locationPage: LocationPageModel,
  page: PageModel,
  client: ClientModel,
  teamMember: TeamMemberModel,
  certification: CertificationModel,
  companySettings: CompanySettingsModel,
  legalPage: LegalPageModel,
  faq: FaqModel,
  media: MediaModel,
  careerCategory: CareerCategoryModel,
  careerFormField: CareerFormFieldModel,
  careerApplication: CareerApplicationModel,
};

function mapKeyForModel(key: string): string {
  if (key === "id") return "legacyId";
  if (key === "categoryId") return "categoryLegacyId";
  if (key === "employeeId") return "employeeLegacyId";
  if (key === "blogPostId") return "blogPostLegacyId";
  return key;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toMongoWhere(where: AnyObject | undefined): AnyObject {
  if (!where) return {};
  const out: AnyObject = {};

  for (const [rawKey, rawValue] of Object.entries(where)) {
    if (rawKey === "AND" && Array.isArray(rawValue)) {
      out.$and = rawValue.map((entry) => toMongoWhere(entry));
      continue;
    }
    if (rawKey === "OR" && Array.isArray(rawValue)) {
      out.$or = rawValue.map((entry) => toMongoWhere(entry));
      continue;
    }
    if (rawKey === "NOT") {
      if (Array.isArray(rawValue)) {
        out.$nor = rawValue.map((entry) => toMongoWhere(entry));
      } else {
        out.$nor = [toMongoWhere(rawValue as AnyObject)];
      }
      continue;
    }

    const key = mapKeyForModel(rawKey);
    const value = rawValue as any;

    if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      const queryPart: AnyObject = {};

      if ("equals" in value) queryPart.$eq = value.equals;
      if ("in" in value) queryPart.$in = value.in;
      if ("notIn" in value) queryPart.$nin = value.notIn;
      if ("lt" in value) queryPart.$lt = value.lt;
      if ("lte" in value) queryPart.$lte = value.lte;
      if ("gt" in value) queryPart.$gt = value.gt;
      if ("gte" in value) queryPart.$gte = value.gte;

      if ("contains" in value) {
        const flags = value.mode === "insensitive" ? "i" : "";
        queryPart.$regex = escapeRegExp(String(value.contains));
        queryPart.$options = flags;
      }
      if ("startsWith" in value) {
        const flags = value.mode === "insensitive" ? "i" : "";
        queryPart.$regex = `^${escapeRegExp(String(value.startsWith))}`;
        queryPart.$options = flags;
      }
      if ("endsWith" in value) {
        const flags = value.mode === "insensitive" ? "i" : "";
        queryPart.$regex = `${escapeRegExp(String(value.endsWith))}$`;
        queryPart.$options = flags;
      }

      if ("not" in value) {
        if (typeof value.not === "object" && value.not !== null) {
          queryPart.$not = toMongoWhere({ [rawKey]: value.not })[key];
        } else {
          queryPart.$ne = value.not;
        }
      }

      if (Object.keys(queryPart).length === 0) {
        out[key] = value;
      } else if (Object.keys(queryPart).length === 1 && "$eq" in queryPart) {
        out[key] = queryPart.$eq;
      } else {
        out[key] = queryPart;
      }
      continue;
    }

    out[key] = value;
  }

  return out;
}

function toSort(orderBy: any): AnyObject {
  if (!orderBy) return {};
  const out: AnyObject = {};
  const entries = Array.isArray(orderBy) ? orderBy : [orderBy];
  for (const entry of entries) {
    for (const [key, value] of Object.entries(entry ?? {})) {
      out[mapKeyForModel(key)] = value === "desc" ? -1 : 1;
    }
  }
  return out;
}

function normalizeDoc(doc: AnyObject | null): AnyObject | null {
  if (!doc) return null;
  const next = { ...doc };

  delete next.__v;
  delete next._id;

  next.id = next.legacyId ?? next.id ?? null;
  if (next.categoryLegacyId) next.categoryId = next.categoryLegacyId;
  if (next.employeeLegacyId) next.employeeId = next.employeeLegacyId;
  if (next.blogPostLegacyId) next.blogPostId = next.blogPostLegacyId;

  return next;
}

function applySelect(row: AnyObject, select?: AnyObject): AnyObject {
  if (!select) return row;
  const out: AnyObject = {};
  for (const [key, selected] of Object.entries(select)) {
    if (!selected) continue;
    out[key] = row[key];
  }
  return out;
}

async function withIncludes(delegate: string, row: AnyObject, include?: AnyObject): Promise<AnyObject> {
  if (!include || !row) return row;
  const out: AnyObject = { ...row };

  if (delegate === "serviceCategory") {
    if (include.subtypes) {
      const subtypeRows = await ServiceSubtypeModel.find({
        categoryLegacyId: row.id,
      })
        .sort({ title: 1 })
        .lean();
      out.subtypes = subtypeRows.map((item) => normalizeDoc(item)).filter(Boolean);
    }
    if (include._count?.select?.subtypes) {
      const subtypeCount = await ServiceSubtypeModel.countDocuments({
        categoryLegacyId: row.id,
      });
      out._count = { ...(out._count ?? {}), subtypes: subtypeCount };
    }
  }

  return out;
}

function generateCuid(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  return `c${timestamp}${randomPart}${randomPart2}`.substring(0, 25);
}

function prepareCreateData(delegate: string, data: AnyObject): AnyObject {
  const out = { ...data };
  
  // Auto-generate legacyId if not provided (for new records)
  if ("id" in out) {
    out.legacyId = out.id;
    delete out.id;
  } else if (!out.legacyId) {
    // Generate a new legacyId for records created without an explicit id
    out.legacyId = generateCuid();
  }

  if (delegate === "serviceSubtype" && out.categoryId && !out.categoryLegacyId) {
    out.categoryLegacyId = out.categoryId;
  }
  if (delegate === "employeeLog" && out.employeeId && !out.employeeLegacyId) {
    out.employeeLegacyId = out.employeeId;
  }
  if (delegate === "careerApplication" && out.categoryId && !out.categoryLegacyId) {
    out.categoryLegacyId = out.categoryId;
  }
  if (delegate === "blogComment" && out.blogPostId && !out.blogPostLegacyId) {
    out.blogPostLegacyId = out.blogPostId;
  }
  if (delegate === "serviceSubtype") {
    delete out.categoryId;
  }
  if (delegate === "employeeLog") {
    delete out.employeeId;
  }
  if (delegate === "careerApplication") {
    delete out.categoryId;
  }
  if (delegate === "blogComment") {
    delete out.blogPostId;
  }

  return out;
}

function prepareUpdateData(delegate: string, data: AnyObject): AnyObject {
  const out = { ...data };

  if ("id" in out) {
    out.legacyId = out.id;
    delete out.id;
  }

  if (delegate === "serviceSubtype" && out.categoryId && !out.categoryLegacyId) {
    out.categoryLegacyId = out.categoryId;
  }
  if (delegate === "employeeLog" && out.employeeId && !out.employeeLegacyId) {
    out.employeeLegacyId = out.employeeId;
  }
  if (delegate === "careerApplication" && out.categoryId && !out.categoryLegacyId) {
    out.categoryLegacyId = out.categoryId;
  }
  if (delegate === "blogComment" && out.blogPostId && !out.blogPostLegacyId) {
    out.blogPostLegacyId = out.blogPostId;
  }
  if (delegate === "serviceSubtype") {
    delete out.categoryId;
  }
  if (delegate === "employeeLog") {
    delete out.employeeId;
  }
  if (delegate === "careerApplication") {
    delete out.categoryId;
  }
  if (delegate === "blogComment") {
    delete out.blogPostId;
  }

  return out;
}

function createDelegate(delegateName: string) {
  const model = modelMap[delegateName];

  return {
    async findUnique(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const doc = await model.findOne(where).lean();
      const normalized = normalizeDoc(doc);
      if (!normalized) return null;
      const withIncluded = await withIncludes(delegateName, normalized, args?.include);
      return applySelect(withIncluded, args?.select);
    },
    async findFirst(args: AnyObject) {
      return this.findUnique(args);
    },
    async findMany(args: AnyObject = {}) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const sort = toSort(args?.orderBy);
      let query = model.find(where);
      if (Object.keys(sort).length > 0) query = query.sort(sort);
      if (typeof args?.skip === "number") query = query.skip(args.skip);
      if (typeof args?.take === "number") query = query.limit(args.take);
      const rows = await query.lean();

      const mapped: AnyObject[] = [];
      for (const row of rows) {
        const normalized = normalizeDoc(row);
        if (!normalized) continue;
        const withIncluded = await withIncludes(delegateName, normalized, args?.include);
        mapped.push(applySelect(withIncluded, args?.select));
      }

      return mapped;
    },
    async count(args: AnyObject = {}) {
      await connectToMongo();
      return model.countDocuments(toMongoWhere(args?.where ?? {}));
    },
    async create(args: AnyObject) {
      await connectToMongo();
      const created = await model.create(prepareCreateData(delegateName, args.data ?? {}));
      const normalized = normalizeDoc(created.toObject());
      return normalized;
    },
    async createMany(args: AnyObject) {
      await connectToMongo();
      const rows = (args?.data ?? []).map((entry: AnyObject) => prepareCreateData(delegateName, entry));
      const result = await model.insertMany(rows, { ordered: false });
      return { count: Array.isArray(result) ? result.length : 0 };
    },
    async update(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const updated = await model
        .findOneAndUpdate(where, prepareUpdateData(delegateName, args?.data ?? {}), { returnDocument: "after" })
        .lean();
      const normalized = normalizeDoc(updated);
      if (!normalized) throw new Error(`Record not found for ${delegateName}.update`);
      return normalized;
    },
    async updateMany(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const result = await model.updateMany(where, prepareUpdateData(delegateName, args?.data ?? {}));
      return { count: result.modifiedCount ?? 0 };
    },
    async delete(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const deleted = await model.findOneAndDelete(where).lean();
      const normalized = normalizeDoc(deleted);
      if (!normalized) throw new Error(`Record not found for ${delegateName}.delete`);
      return normalized;
    },
    async deleteMany(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const result = await model.deleteMany(where);
      return { count: result.deletedCount ?? 0 };
    },
    async upsert(args: AnyObject) {
      await connectToMongo();
      const where = toMongoWhere(args?.where ?? {});
      const existing = await model.findOne(where).lean();
      if (existing) {
        return this.update({ where: args.where, data: args.update });
      }
      return this.create({ data: args.create });
    },
    async groupBy(args: AnyObject) {
      await connectToMongo();
      const by = Array.isArray(args?.by) ? args.by : [args?.by].filter(Boolean);
      if (by.length !== 1) {
        throw new Error("Mongo prisma adapter currently supports groupBy by a single field.");
      }
      const field = mapKeyForModel(by[0]);
      const pipeline = [
        { $match: toMongoWhere(args?.where ?? {}) },
        { $group: { _id: `$${field}`, _count: { $sum: 1 } } },
      ];
      const rows = await model.aggregate(pipeline);
      return rows.map((row: AnyObject) => ({ [by[0]]: row._id, _count: { _all: row._count } }));
    },
  };
}

const prismaAdapter: any = {
  admin: createDelegate("admin"),
  employee: createDelegate("employee"),
  employeeLog: createDelegate("employeeLog"),
  project: createDelegate("project"),
  blogPost: createDelegate("blogPost"),
  blogComment: createDelegate("blogComment"),
  enquiry: createDelegate("enquiry"),
  testimonial: createDelegate("testimonial"),
  serviceCategory: createDelegate("serviceCategory"),
  serviceSubtype: createDelegate("serviceSubtype"),
  locationPage: createDelegate("locationPage"),
  page: createDelegate("page"),
  client: createDelegate("client"),
  teamMember: createDelegate("teamMember"),
  certification: createDelegate("certification"),
  companySettings: createDelegate("companySettings"),
  legalPage: createDelegate("legalPage"),
  faq: createDelegate("faq"),
  media: createDelegate("media"),
  careerCategory: createDelegate("careerCategory"),
  careerFormField: createDelegate("careerFormField"),
  careerApplication: createDelegate("careerApplication"),
  async $connect() {
    await connectToMongo();
  },
  async $disconnect() {
    return;
  },
  async $transaction(tx: any) {
    if (Array.isArray(tx)) return Promise.all(tx);
    if (typeof tx === "function") return tx(prismaAdapter);
    return tx;
  },
  async $queryRaw() {
    throw new Error("Raw SQL is not supported in Mongo mode. Use model queries instead.");
  },
  async $executeRaw() {
    throw new Error("Raw SQL is not supported in Mongo mode. Use model queries instead.");
  },
};

export const prisma = prismaAdapter as PrismaLikeClient;
export default prisma;
