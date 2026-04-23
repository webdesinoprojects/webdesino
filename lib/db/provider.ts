export type DbProvider = "postgres" | "mongo";
export type DbFeature = "locations" | "pages" | "services" | "blogs" | "enquiries";

const FEATURE_ENV_MAP: Record<DbFeature, string> = {
  locations: "DB_READ_LOCATIONS",
  pages: "DB_READ_PAGES",
  services: "DB_READ_SERVICES",
  blogs: "DB_READ_BLOGS",
  enquiries: "DB_READ_ENQUIRIES",
};

function parseProvider(value: string | undefined): DbProvider | null {
  if (!value) return null;
  if (value === "postgres" || value === "mongo") return value;
  return null;
}

export function getDefaultDbProvider(): DbProvider {
  return parseProvider(process.env.DB_PROVIDER) ?? "mongo";
}

export function getReadProviderForFeature(feature: DbFeature): DbProvider {
  const envKey = FEATURE_ENV_MAP[feature];
  const featureProvider = parseProvider(process.env[envKey]);
  return featureProvider ?? getDefaultDbProvider();
}

export function getDbReadFlagSnapshot(): Record<DbFeature, DbProvider> {
  return {
    locations: getReadProviderForFeature("locations"),
    pages: getReadProviderForFeature("pages"),
    services: getReadProviderForFeature("services"),
    blogs: getReadProviderForFeature("blogs"),
    enquiries: getReadProviderForFeature("enquiries"),
  };
}
