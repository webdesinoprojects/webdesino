import prisma from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/lib/auth";
import { signToken, verifyToken } from "@/lib/jwt";
import { getRolePermissions, sanitizeEmployeePermissions } from "@/lib/employee-permissions";

type ExpressLikeApp = {
  get: (path: string, ...handlers: Array<(req: any, res: any, next?: any) => unknown>) => void;
  post: (path: string, ...handlers: Array<(req: any, res: any, next?: any) => unknown>) => void;
  put: (path: string, ...handlers: Array<(req: any, res: any, next?: any) => unknown>) => void;
  delete: (path: string, ...handlers: Array<(req: any, res: any, next?: any) => unknown>) => void;
};

const EMPLOYEE_COOKIE = "employee_token";

async function employeeAuth(req: any, res: any, next: any) {
  const token = req.cookies?.[EMPLOYEE_COOKIE] || req.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.type !== "employee") {
    return res.status(401).json({ error: "Invalid session" });
  }

  req.employee = payload;
  return next();
}

export function registerEmployeeRoutes(app: ExpressLikeApp) {
  app.post("/api/employees/login", async (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const employee = await prisma.employee.findUnique({ where: { email } });
    if (!employee || employee.status !== "active") {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isValid = await comparePassword(password, employee.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    await prisma.employee.update({ where: { id: employee.id }, data: { lastLogin: new Date() } });

    const token = await signToken({
      id: employee.id,
      email: employee.email,
      name: employee.name,
      role: employee.role,
      permissions: employee.permissions,
      status: employee.status,
      type: "employee",
    });

    res.cookie?.(EMPLOYEE_COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 86400000 });
    return res.json({ success: true, employee: { id: employee.id, name: employee.name, role: employee.role, permissions: employee.permissions } });
  });

  app.get("/api/employees", employeeAuth, async (_req, res) => {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        status: true,
        lastLogin: true,
        note: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(employees);
  });

  app.post("/api/employees", employeeAuth, async (req, res) => {
    const role = String(req.body?.role || "editor");
    const permissions = sanitizeEmployeePermissions(req.body?.permissions?.length ? req.body.permissions : getRolePermissions(role));

    const employee = await prisma.employee.create({
      data: {
        name: String(req.body?.name || "").trim(),
        email: String(req.body?.email || "").trim().toLowerCase(),
        password: await hashPassword(String(req.body?.password || "")),
        role,
        permissions,
        status: req.body?.status === "inactive" ? "inactive" : "active",
        note: req.body?.note ? String(req.body.note) : null,
      },
    });

    return res.status(201).json(employee);
  });

  app.put("/api/employees/:id", employeeAuth, async (req, res) => {
    const role = String(req.body?.role || "editor");
    const permissions = sanitizeEmployeePermissions(req.body?.permissions?.length ? req.body.permissions : getRolePermissions(role));

    const employee = await prisma.employee.update({
      where: { id: req.params.id },
      data: {
        name: String(req.body?.name || "").trim(),
        email: String(req.body?.email || "").trim().toLowerCase(),
        role,
        permissions,
        status: req.body?.status === "inactive" ? "inactive" : "active",
        note: req.body?.note ? String(req.body.note) : null,
        ...(req.body?.password
          ? { password: await hashPassword(String(req.body.password)) }
          : {}),
      },
    });

    return res.json(employee);
  });

  app.delete("/api/employees/:id", employeeAuth, async (req, res) => {
    await prisma.employee.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  });
}