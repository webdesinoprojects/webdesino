export type MigrationEntityConfig = {
  key: string;
  sourceModel: string;
  targetCollection: string;
  critical: boolean;
  notes?: string;
};

export const MIGRATION_ORDER: MigrationEntityConfig[] = [
  { key: "admins", sourceModel: "Admin", targetCollection: "admins", critical: false },
  { key: "employees", sourceModel: "Employee", targetCollection: "employees", critical: false },
  { key: "projects", sourceModel: "Project", targetCollection: "projects", critical: false },
  { key: "blogPosts", sourceModel: "BlogPost", targetCollection: "blogPosts", critical: true },
  { key: "enquiries", sourceModel: "Enquiry", targetCollection: "enquiries", critical: true },
  { key: "testimonials", sourceModel: "Testimonial", targetCollection: "testimonials", critical: false },
  { key: "locationPages", sourceModel: "LocationPage", targetCollection: "locationPages", critical: true },
  { key: "pages", sourceModel: "Page", targetCollection: "pages", critical: true },
  { key: "clients", sourceModel: "Client", targetCollection: "clients", critical: false },
  { key: "teamMembers", sourceModel: "TeamMember", targetCollection: "teamMembers", critical: false },
  { key: "certifications", sourceModel: "Certification", targetCollection: "certifications", critical: false },
  { key: "companySettings", sourceModel: "CompanySettings", targetCollection: "companySettings", critical: false },
  { key: "legalPages", sourceModel: "LegalPage", targetCollection: "legalPages", critical: false },
  { key: "faqs", sourceModel: "Faq", targetCollection: "faqs", critical: false },
  { key: "media", sourceModel: "Media", targetCollection: "media", critical: false },
  {
    key: "serviceCategories",
    sourceModel: "ServiceCategory",
    targetCollection: "serviceCategories",
    critical: true,
    notes: "Must migrate before serviceSubtypes",
  },
  {
    key: "serviceSubtypes",
    sourceModel: "ServiceSubtype",
    targetCollection: "serviceSubtypes",
    critical: true,
    notes: "Requires categoryId/categoryLegacyId mapping",
  },
  {
    key: "employeeLogs",
    sourceModel: "EmployeeLog",
    targetCollection: "employeeLogs",
    critical: false,
    notes: "Requires employeeId/employeeLegacyId mapping",
  },
];

export type MigrationMode = "dry-run" | "validate" | "migrate";
