export const EMPLOYEE_PERMISSION_KEYS = [
  "blogs",
  "clients",
  "services",
  "locations",
  "pages",
  "media",
  "enquiries",
  "testimonials",
  "faqs",
  "team",
] as const;

export type EmployeePermissionKey = (typeof EMPLOYEE_PERMISSION_KEYS)[number];

export const EMPLOYEE_PERMISSION_LABELS: Record<EmployeePermissionKey, string> = {
  blogs: "Blogs",
  clients: "Clients",
  services: "Services",
  locations: "Locations",
  pages: "Pages",
  media: "Media",
  enquiries: "Enquiries",
  testimonials: "Testimonials",
  faqs: "FAQs",
  team: "Team",
};

export const EMPLOYEE_SECTION_PATHS: Record<EmployeePermissionKey, string> = {
  blogs: "/employee/dashboard/blogs",
  clients: "/employee/dashboard/clients",
  services: "/employee/dashboard/services",
  locations: "/employee/dashboard/locations",
  pages: "/employee/dashboard/pages",
  media: "/employee/dashboard/media",
  enquiries: "/employee/dashboard/enquiries",
  testimonials: "/employee/dashboard/testimonials",
  faqs: "/employee/dashboard/faqs",
  team: "/employee/dashboard/team",
};

export const EMPLOYEE_ROLE_PRESETS: Record<string, EmployeePermissionKey[]> = {
  admin: [...EMPLOYEE_PERMISSION_KEYS],
  manager: ["blogs", "clients", "services", "pages", "media", "enquiries", "testimonials", "faqs"],
  editor: ["blogs", "pages", "media", "faqs", "testimonials"],
  support: ["enquiries", "clients", "testimonials"],
  // Developer: build-oriented sections — services, pages, locations, media, blogs
  developer: ["services", "pages", "locations", "media", "blogs"],
  // SEO: content & discoverability sections
  seo: ["blogs", "pages", "locations", "faqs", "services", "testimonials"],
  // Sales Team: lead & client-facing sections
  "sales team": ["enquiries", "clients", "testimonials"],
};

export const EMPLOYEE_ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  manager: "Manager",
  editor: "Editor",
  support: "Support",
  developer: "Developer",
  seo: "SEO",
  "sales team": "Sales Team",
};

export function sanitizeEmployeePermissions(input: string[] = []): EmployeePermissionKey[] {
  return input.filter((permission): permission is EmployeePermissionKey =>
    EMPLOYEE_PERMISSION_KEYS.includes(permission as EmployeePermissionKey)
  );
}

export function getRolePermissions(role: string) {
  return EMPLOYEE_ROLE_PRESETS[role] || EMPLOYEE_ROLE_PRESETS.editor;
}