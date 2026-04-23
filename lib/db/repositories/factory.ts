import { getReadProviderForFeature } from "../provider";
import { createMongoCriticalRepositories } from "./mongo/critical";
import { createPrismaCriticalRepositories } from "./prisma/critical";
import { CriticalRepositories } from "./types";

export function createCriticalRepositories(): CriticalRepositories {
  const prismaRepos = createPrismaCriticalRepositories();
  const mongoRepos = createMongoCriticalRepositories();

  return {
    locations:
      getReadProviderForFeature("locations") === "mongo"
        ? mongoRepos.locations
        : prismaRepos.locations,
    pages:
      getReadProviderForFeature("pages") === "mongo"
        ? mongoRepos.pages
        : prismaRepos.pages,
    services:
      getReadProviderForFeature("services") === "mongo"
        ? mongoRepos.services
        : prismaRepos.services,
    blogs:
      getReadProviderForFeature("blogs") === "mongo"
        ? mongoRepos.blogs
        : prismaRepos.blogs,
    enquiries:
      getReadProviderForFeature("enquiries") === "mongo"
        ? mongoRepos.enquiries
        : prismaRepos.enquiries,
  };
}
