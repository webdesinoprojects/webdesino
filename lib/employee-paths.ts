export function employeeNameToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "") || "employee";
}

export function getEmployeeDashboardBase(name: string) {
  return `/employee/${employeeNameToSlug(name)}/dashboard`;
}

export function getEmployeeSectionPath(name: string, section?: string) {
  const base = getEmployeeDashboardBase(name);
  return section ? `${base}/${section}` : base;
}
