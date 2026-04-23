import fs from "fs";
import path from "path";
import zlib from "zlib";
import dotenv from "dotenv";
import { Model, Types } from "mongoose";
import { connectToMongo, disconnectMongo } from "../lib/mongo/connection";
import {
  AdminModel,
  BlogPostModel,
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
} from "../lib/mongo/models";

dotenv.config();

type Row = Record<string, string | null>;

type TableBlock = {
  columns: string[];
  rows: Row[];
};

type DumpMap = Map<string, TableBlock>;

const WEBSITE_TABLES = [
  "Admin",
  "BlogPost",
  "Certification",
  "Client",
  "CompanySettings",
  "Employee",
  "EmployeeLog",
  "Enquiry",
  "FAQ",
  "LegalPage",
  "LocationPage",
  "Media",
  "Page",
  "Project",
  "ServiceCategory",
  "ServiceSubtype",
  "TeamMember",
  "Testimonial",
] as const;

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function decodeCopyValue(input: string): string | null {
  if (input === "\\N") return null;

  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch !== "\\") {
      out += ch;
      continue;
    }

    const next = input[i + 1];
    if (next === undefined) {
      out += "\\";
      continue;
    }

    if (next === "n") {
      out += "\n";
      i += 1;
      continue;
    }
    if (next === "r") {
      out += "\r";
      i += 1;
      continue;
    }
    if (next === "t") {
      out += "\t";
      i += 1;
      continue;
    }
    if (next === "b") {
      out += "\b";
      i += 1;
      continue;
    }
    if (next === "f") {
      out += "\f";
      i += 1;
      continue;
    }
    if (next === "v") {
      out += "\v";
      i += 1;
      continue;
    }
    if (next === "\\") {
      out += "\\";
      i += 1;
      continue;
    }
    if (/[0-7]/.test(next)) {
      const octal = input.slice(i + 1, i + 4).match(/^[0-7]{1,3}/)?.[0];
      if (octal) {
        out += String.fromCharCode(parseInt(octal, 8));
        i += octal.length;
        continue;
      }
    }

    out += next;
    i += 1;
  }

  return out;
}

function parsePgArray(raw: string | null): string[] | null {
  if (raw === null) return null;
  if (raw === "{}") return [];
  if (!raw.startsWith("{") || !raw.endsWith("}")) return [raw];

  const body = raw.slice(1, -1);
  const values: string[] = [];
  let current = "";
  let inQuotes = false;
  let escaped = false;

  for (let i = 0; i < body.length; i += 1) {
    const ch = body[i];

    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (ch === "\"") {
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  values.push(current);
  return values.map((v) => v.trim()).filter((v) => v.length > 0);
}

function parseJson<T = any>(raw: string | null): T | null {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function parseDate(raw: string | null): Date | null {
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function parseNumber(raw: string | null): number | null {
  if (raw === null || raw === "") return null;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function tableRows(dump: DumpMap, tableName: string): Row[] {
  return dump.get(tableName)?.rows ?? [];
}

function parseDump(sqlText: string): DumpMap {
  const out: DumpMap = new Map();
  const lines = sqlText.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const headerLine = lines[i].replace(/\r$/, "");
    const headerMatch = headerLine.match(
      /^COPY\s+public\."([^"]+)"\s*\(([^)]*)\)\s+FROM\s+stdin;$/
    );
    if (!headerMatch) continue;

    const tableName = headerMatch[1];
    if (!WEBSITE_TABLES.includes(tableName as (typeof WEBSITE_TABLES)[number])) {
      continue;
    }

    const columns = headerMatch[2].split(",").map((col) => stripQuotes(col));
    const existing = out.get(tableName);
    const rows: Row[] = existing?.rows ?? [];

    let j = i + 1;
    while (j < lines.length) {
      const rawLine = lines[j];
      const line = rawLine.replace(/\r$/, "");

      if (line === "\\.") {
        break;
      }

      if (line.length > 0) {
        const values = line.split("\t").map((v) => decodeCopyValue(v));
        const row: Row = {};
        for (let colIndex = 0; colIndex < columns.length; colIndex += 1) {
          row[columns[colIndex]] = values[colIndex] ?? null;
        }
        rows.push(row);
      }

      j += 1;
    }

    out.set(tableName, { columns, rows });
    i = j;
  }

  return out;
}

async function bulkUpsertByLegacyId(
  tableName: string,
  model: Model<any>,
  docs: Array<Record<string, any>>,
  batchSize = 500
) {
  if (docs.length === 0) return;

  let processed = 0;
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = docs.slice(i, i + batchSize);
    const operations = batch.map((doc) => {
      if (!doc.legacyId) {
        throw new Error(`Missing legacyId for model ${model.modelName}`);
      }
      return {
        updateOne: {
          filter: { legacyId: doc.legacyId },
          update: { $set: doc },
          upsert: true,
        },
      };
    });

    await model.bulkWrite(operations, { ordered: false, timestamps: false });
    processed += batch.length;
    console.log(`[${tableName}] ${processed}/${docs.length} upserted`);
  }
}

async function main() {
  const argFile = process.argv.find((arg) => arg.startsWith("--file="));
  const backupPath = argFile
    ? argFile.split("=")[1]
    : path.resolve(process.cwd(), "backup.sql.gz");

  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup file not found: ${backupPath}`);
  }

  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
    throw new Error("Missing MONGODB_URI or MONGODB_DB in environment.");
  }

  console.log(`Reading backup: ${backupPath}`);
  const compressed = fs.readFileSync(backupPath);
  const sqlText = zlib.gunzipSync(compressed).toString("utf8");
  const dump = parseDump(sqlText);

  console.log("Parsed public tables:");
  for (const table of WEBSITE_TABLES) {
    console.log(`- ${table}: ${tableRows(dump, table).length}`);
  }

  await connectToMongo();
  console.log("Connected to MongoDB.");

  const categoryIdByLegacyId = new Map<string, Types.ObjectId>();
  const employeeIdByLegacyId = new Map<string, Types.ObjectId>();
  const stats: Record<string, number> = {};
  const skippedByTable: Record<string, number> = {};
  let skippedEmployeeLogs = 0;
  let skippedServiceSubtypes = 0;

  async function migrateSimple(
    tableName: string,
    model: Model<any>,
    transform: (row: Row) => Record<string, any> | null
  ) {
    const docs: Array<Record<string, any>> = [];
    let skipped = 0;
    for (const row of tableRows(dump, tableName)) {
      const doc = transform(row);
      if (!doc) {
        skipped += 1;
        continue;
      }
      docs.push(doc);
    }
    await bulkUpsertByLegacyId(tableName, model, docs);
    stats[tableName] = docs.length;
    skippedByTable[tableName] = skipped;
  }

  await migrateSimple("Admin", AdminModel, (row) => ({
    legacyId: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  const employeeDocs = tableRows(dump, "Employee").map((row) => ({
      legacyId: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
      permissions: parsePgArray(row.permissions) ?? [],
      status: row.status,
      lastLogin: parseDate(row.lastLogin),
      note: row.note,
      createdAt: parseDate(row.createdAt),
      updatedAt: parseDate(row.updatedAt),
    }));
  await bulkUpsertByLegacyId("Employee", EmployeeModel, employeeDocs);
  stats.Employee = employeeDocs.length;

  const employeeMappings = await EmployeeModel.find(
    { legacyId: { $in: employeeDocs.map((doc) => String(doc.legacyId)) } },
    { legacyId: 1 }
  ).lean();
  for (const row of employeeMappings) {
    employeeIdByLegacyId.set(String((row as any).legacyId), (row as any)._id as Types.ObjectId);
  }

  await migrateSimple("Project", ProjectModel, (row) => ({
    legacyId: row.id,
    title: row.title,
    client: row.client ?? "",
    slug: row.slug,
    industry: row.industry,
    description: row.description,
    image: row.image,
    fullDescription: row.fullDescription,
    results: row.results,
    resultsData: parseJson(row.resultsData),
    highlights: parsePgArray(row.highlights) ?? [],
    metrics: parseJson(row.metrics),
    challenges: parseJson(row.challenges),
    solutions: parseJson(row.solutions),
    implementation: parseJson(row.implementation),
    testimonial: parseJson(row.testimonial),
    keyLearnings: parsePgArray(row.keyLearnings) ?? [],
    relatedServices: parseJson(row.relatedServices),
    faqs: parseJson(row.faqs),
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("BlogPost", BlogPostModel, (row) => ({
    legacyId: row.id,
    title: row.title,
    slug: row.slug,
    date: parseDate(row.date),
    category: row.category,
    excerpt: row.excerpt,
    image: row.image,
    content: row.content,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Enquiry", EnquiryModel, (row) => ({
    legacyId: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    status: row.status,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Testimonial", TestimonialModel, (row) => ({
    legacyId: row.id,
    name: row.name,
    text: row.text,
    company: row.company,
    location: row.location,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  const serviceCategoryDocs = tableRows(dump, "ServiceCategory").map((row) => ({
      legacyId: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      icon: row.icon,
      createdAt: parseDate(row.createdAt),
      updatedAt: parseDate(row.updatedAt),
    }));
  await bulkUpsertByLegacyId("ServiceCategory", ServiceCategoryModel, serviceCategoryDocs);
  stats.ServiceCategory = serviceCategoryDocs.length;

  const categoryMappings = await ServiceCategoryModel.find(
    { legacyId: { $in: serviceCategoryDocs.map((doc) => String(doc.legacyId)) } },
    { legacyId: 1 }
  ).lean();
  for (const row of categoryMappings) {
    categoryIdByLegacyId.set(String((row as any).legacyId), (row as any)._id as Types.ObjectId);
  }

  const serviceSubtypeDocs: Array<Record<string, any>> = [];
  for (const row of tableRows(dump, "ServiceSubtype")) {
    const categoryLegacyId = row.categoryId;
    const categoryObjectId = categoryLegacyId
      ? categoryIdByLegacyId.get(String(categoryLegacyId))
      : undefined;
    if (!categoryLegacyId || !categoryObjectId) {
      skippedServiceSubtypes += 1;
      continue;
    }

    serviceSubtypeDocs.push({
      legacyId: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      features: parsePgArray(row.features) ?? [],
      benefits: parsePgArray(row.benefits) ?? [],
      icon: row.icon,
      categoryId: categoryObjectId,
      categoryLegacyId: String(categoryLegacyId),
      createdAt: parseDate(row.createdAt),
      updatedAt: parseDate(row.updatedAt),
    });
  }
  await bulkUpsertByLegacyId("ServiceSubtype", ServiceSubtypeModel, serviceSubtypeDocs);
  stats.ServiceSubtype = serviceSubtypeDocs.length;

  await migrateSimple("LocationPage", LocationPageModel, (row) => ({
    legacyId: row.id,
    slug: row.slug,
    location: row.location,
    title: row.title,
    description: row.description,
    content: parseJson(row.content),
    serviceFocus: row.serviceFocus,
    state: row.state,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Page", PageModel, (row) => ({
    legacyId: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: parseJson(row.content),
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Client", ClientModel, (row) => ({
    legacyId: row.id,
    name: row.name,
    url: row.url,
    image: row.image,
    category: row.category,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("TeamMember", TeamMemberModel, (row) => ({
    legacyId: row.id,
    name: row.name,
    role: row.role,
    image: row.image,
    order: parseNumber(row.order) ?? 0,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Certification", CertificationModel, (row) => ({
    legacyId: row.id,
    name: row.name,
    image: row.image,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("CompanySettings", CompanySettingsModel, (row) => ({
    legacyId: row.id,
    key: row.key,
    value: row.value,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("LegalPage", LegalPageModel, (row) => {
    if (!row.id || !row.slug || !row.title || !row.lastUpdated || !row.content) {
      return null;
    }
    return {
      legacyId: row.id,
      slug: row.slug,
      title: row.title,
      lastUpdated: row.lastUpdated,
      content: row.content,
      createdAt: parseDate(row.createdAt),
      updatedAt: parseDate(row.updatedAt),
    };
  });

  await migrateSimple("FAQ", FaqModel, (row) => ({
    legacyId: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
    order: parseNumber(row.order) ?? 0,
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  await migrateSimple("Media", MediaModel, (row) => ({
    legacyId: row.id,
    filename: row.filename,
    url: row.url,
    mimeType: row.mimeType,
    size: parseNumber(row.size),
    createdAt: parseDate(row.createdAt),
    updatedAt: parseDate(row.updatedAt),
  }));

  const employeeLogDocs: Array<Record<string, any>> = [];
  for (const row of tableRows(dump, "EmployeeLog")) {
    const employeeLegacyId = row.employeeId;
    const employeeObjectId = employeeLegacyId
      ? employeeIdByLegacyId.get(String(employeeLegacyId))
      : undefined;
    if (!employeeLegacyId || !employeeObjectId) {
      skippedEmployeeLogs += 1;
      continue;
    }

    employeeLogDocs.push({
      legacyId: row.id,
      employeeId: employeeObjectId,
      employeeLegacyId: String(employeeLegacyId),
      action: row.action,
      section: row.section,
      createdAt: parseDate(row.createdAt),
    });
  }
  await bulkUpsertByLegacyId("EmployeeLog", EmployeeLogModel, employeeLogDocs);
  stats.EmployeeLog = employeeLogDocs.length;

  console.log("\nMigration summary (upserted rows):");
  for (const [table, count] of Object.entries(stats)) {
    console.log(`- ${table}: ${count}`);
  }
  for (const [table, count] of Object.entries(skippedByTable)) {
    if (count > 0) console.log(`- ${table} skipped invalid rows: ${count}`);
  }
  console.log(`- ServiceSubtype skipped (missing category link): ${skippedServiceSubtypes}`);
  console.log(`- EmployeeLog skipped (missing employee link): ${skippedEmployeeLogs}`);

  console.log("\nMongo counts after migration:");
  console.log(`- admins: ${await AdminModel.countDocuments()}`);
  console.log(`- employees: ${await EmployeeModel.countDocuments()}`);
  console.log(`- projects: ${await ProjectModel.countDocuments()}`);
  console.log(`- blogPosts: ${await BlogPostModel.countDocuments()}`);
  console.log(`- enquiries: ${await EnquiryModel.countDocuments()}`);
  console.log(`- testimonials: ${await TestimonialModel.countDocuments()}`);
  console.log(`- serviceCategories: ${await ServiceCategoryModel.countDocuments()}`);
  console.log(`- serviceSubtypes: ${await ServiceSubtypeModel.countDocuments()}`);
  console.log(`- locationPages: ${await LocationPageModel.countDocuments()}`);
  console.log(`- pages: ${await PageModel.countDocuments()}`);
  console.log(`- clients: ${await ClientModel.countDocuments()}`);
  console.log(`- teamMembers: ${await TeamMemberModel.countDocuments()}`);
  console.log(`- certifications: ${await CertificationModel.countDocuments()}`);
  console.log(`- companySettings: ${await CompanySettingsModel.countDocuments()}`);
  console.log(`- legalPages: ${await LegalPageModel.countDocuments()}`);
  console.log(`- faqs: ${await FaqModel.countDocuments()}`);
  console.log(`- media: ${await MediaModel.countDocuments()}`);
  console.log(`- employeeLogs: ${await EmployeeLogModel.countDocuments()}`);
}

main()
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectMongo();
  });
