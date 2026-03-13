"use server";

import prisma from "@/lib/prisma";
import { getEmployeeSession } from "@/lib/employee-session";

/**
 * Records an action taken by the currently logged-in employee.
 * Silently skips if the caller is an admin (no employee session).
 */
export async function logEmployeeAction(
  section: string,
  action: string,
) {
  try {
    const employee = await getEmployeeSession();
    if (!employee) return; // admin — no log needed
    await prisma.employeeLog.create({
      data: { employeeId: employee.id, section, action },
    });
  } catch {
    // Logging must never break the actual action
  }
}
