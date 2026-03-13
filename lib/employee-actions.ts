"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { EMPLOYEE_PERMISSION_KEYS, getRolePermissions, sanitizeEmployeePermissions } from "@/lib/employee-permissions";

type EmployeeInput = {
  name: string;
  email: string;
  password?: string;
  role: string;
  permissions: string[];
  status: string;
  note?: string;
};

function normalizeEmployeeInput(data: EmployeeInput) {
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  const role = data.role.trim() || "editor";
  const permissions = sanitizeEmployeePermissions(data.permissions?.length ? data.permissions : getRolePermissions(role));
  const status = data.status === "inactive" ? "inactive" : "active";
  const note = data.note?.trim() || null;

  if (!name) throw new Error("Employee name is required.");
  if (!email) throw new Error("Employee email is required.");

  return { name, email, role, permissions, status, note };
}

function revalidateEmployeePaths() {
  revalidatePath("/admin/employees");
  revalidatePath("/employee/dashboard");
}

export async function createEmployee(data: EmployeeInput) {
  const normalized = normalizeEmployeeInput(data);

  if (!data.password || data.password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  await prisma.employee.create({
    data: {
      ...normalized,
      password: await hashPassword(data.password),
    },
  });

  revalidateEmployeePaths();
}

export async function updateEmployee(id: string, data: EmployeeInput) {
  const normalized = normalizeEmployeeInput(data);

  await prisma.employee.update({
    where: { id },
    data: {
      ...normalized,
      ...(data.password
        ? {
            password: await hashPassword(data.password),
          }
        : {}),
    },
  });

  revalidateEmployeePaths();
}

export async function deleteEmployee(id: string) {
  await prisma.employee.delete({ where: { id } });
  revalidateEmployeePaths();
}

export async function getEmployeePermissionOptions() {
  return EMPLOYEE_PERMISSION_KEYS.map((key) => ({ key, label: key }));
}