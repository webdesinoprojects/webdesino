import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/jwt";
import { getEmployeeDashboardBase } from "@/lib/employee-paths";
import type { EmployeePermissionKey } from "@/lib/employee-permissions";

export const EMPLOYEE_SESSION_COOKIE = "employee_token";

type EmployeeSessionPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  status: string;
};

export async function createEmployeeSession(payload: EmployeeSessionPayload) {
  const token = await signToken({ ...payload, type: "employee" });

  cookies().set(EMPLOYEE_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export function destroyEmployeeSession() {
  cookies().delete(EMPLOYEE_SESSION_COOKIE);
}

export async function getEmployeeSession() {
  const token = cookies().get(EMPLOYEE_SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || payload.type !== "employee" || !payload.id) {
    destroyEmployeeSession();
    return null;
  }

  const employee = await prisma.employee.findUnique({
    where: { id: String(payload.id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      status: true,
      note: true,
      lastLogin: true,
    },
  });

  if (!employee || employee.status !== "active") {
    destroyEmployeeSession();
    return null;
  }

  return employee;
}

export async function requireEmployee(permission?: EmployeePermissionKey) {
  const employee = await getEmployeeSession();

  if (!employee) {
    redirect("/employee/login");
  }

  if (permission && !employee.permissions.includes(permission)) {
    redirect(getEmployeeDashboardBase(employee.name));
  }

  return employee;
}