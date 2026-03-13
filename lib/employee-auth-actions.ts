"use server";

import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";
import { createEmployeeSession, destroyEmployeeSession } from "@/lib/employee-session";
import { getEmployeeDashboardBase } from "@/lib/employee-paths";
import { redirect } from "next/navigation";

export async function employeeLogin(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const employee = await prisma.employee.findUnique({ where: { email } });
  if (!employee) {
    return { success: false, error: "Invalid credentials." };
  }

  if (employee.status !== "active") {
    destroyEmployeeSession();
    return { success: false, error: "Employee is inactive, contact admin for further enquiries." };
  }

  const isValid = await comparePassword(password, employee.password);
  if (!isValid) {
    return { success: false, error: "Invalid credentials." };
  }

  await prisma.employee.update({
    where: { id: employee.id },
    data: { lastLogin: new Date() },
  });

  await createEmployeeSession({
    id: employee.id,
    email: employee.email,
    name: employee.name,
    role: employee.role,
    permissions: employee.permissions,
    status: employee.status,
  });

  return { success: true, dashboardPath: getEmployeeDashboardBase(employee.name) };
}

export async function employeeLogout() {
  destroyEmployeeSession();
  redirect("/employee/login");
}