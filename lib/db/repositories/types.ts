export type SortOrder = "asc" | "desc";

export interface LocationPageEntity {
  id: string;
  legacyId: string;
  slug: string;
  location: string;
  title: string;
  description: string | null;
  content: unknown;
  serviceFocus: string | null;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageEntity {
  id: string;
  legacyId: string;
  slug: string;
  title: string;
  description: string | null;
  content: unknown;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceSubtypeEntity {
  id: string;
  legacyId: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  benefits: string[];
  icon: string | null;
  categoryId: string;
  categoryLegacyId: string;
}

export interface ServiceCategoryEntity {
  id: string;
  legacyId: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  subtypes?: ServiceSubtypeEntity[];
}

export interface BlogPostEntity {
  id: string;
  legacyId: string;
  title: string;
  slug: string;
  date: Date;
  category: string;
  excerpt: string;
  image: string | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnquiryEntity {
  id: string;
  legacyId: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LocationPageRepository {
  findBySlug(slug: string): Promise<LocationPageEntity | null>;
  findManySlugs(limit: number): Promise<Array<{ slug: string }>>;
  findFooterLocations(limit: number): Promise<Array<{ location: string; slug: string }>>;
  findRelatedLocations(excludeSlug: string, limit: number): Promise<Array<{ title: string; slug: string; location: string }>>;
  count(): Promise<number>;
}

export interface PageRepository {
  findBySlug(slug: string): Promise<PageEntity | null>;
}

export interface ServiceRepository {
  listCategoriesWithSubtypes(): Promise<ServiceCategoryEntity[]>;
  findCategoryBySlug(slug: string): Promise<ServiceCategoryEntity | null>;
}

export interface BlogRepository {
  findBySlug(slug: string): Promise<BlogPostEntity | null>;
  listPaged(page: number, pageSize: number): Promise<{ total: number; rows: BlogPostEntity[] }>;
}

export interface EnquiryRepository {
  listLatest(limit: number): Promise<EnquiryEntity[]>;
  create(input: Omit<EnquiryEntity, "id" | "legacyId" | "createdAt" | "updatedAt">): Promise<EnquiryEntity>;
  updateStatus(id: string, status: string): Promise<void>;
}

export interface CriticalRepositories {
  locations: LocationPageRepository;
  pages: PageRepository;
  services: ServiceRepository;
  blogs: BlogRepository;
  enquiries: EnquiryRepository;
}
