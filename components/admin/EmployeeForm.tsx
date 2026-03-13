"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEmployee, updateEmployee } from "@/lib/employee-actions";
import { EMPLOYEE_PERMISSION_KEYS, EMPLOYEE_PERMISSION_LABELS, EMPLOYEE_ROLE_PRESETS, EMPLOYEE_ROLE_LABELS, getRolePermissions, type EmployeePermissionKey } from "@/lib/employee-permissions";

interface EmployeeFormProps {
  employee?: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    status: string;
    note: string | null;
  };
}

export default function EmployeeForm({ employee }: EmployeeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    password: "",
    role: employee?.role || "editor",
    permissions: (employee?.permissions as EmployeePermissionKey[]) || getRolePermissions("editor"),
    status: employee?.status || "active",
    note: employee?.note || "",
  });

  const isEditing = Boolean(employee);

  const [showPassword, setShowPassword] = useState(false);

  function generatePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    const pwd = Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    updateField("password", pwd);
    setShowPassword(true);
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePermission = (permission: EmployeePermissionKey) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleRoleChange = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      role,
      permissions: getRolePermissions(role),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing && employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await createEmployee(formData);
      }
      router.push("/admin/employees");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/employees">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            {isEditing ? "Edit Employee" : "Add Employee"}
          </h1>
          <p className="text-sm text-slate-500">Control employee access to CMS modules with roles and granular permissions.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-r from-[#111184]/[0.08] via-white to-white p-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#111184] text-white flex items-center justify-center shadow-sm">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Employee Access Control</p>
            <p className="text-xs text-slate-500">Create login access and configure exactly which sections each employee can manage.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-premium-form space-y-8">
        <Card className="admin-form-card">
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Riya Sharma" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="employee@webdesino.com" required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password {isEditing ? "(leave blank to keep current)" : ""}</Label>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <RefreshCw size={11} /> Generate
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    tabIndex={-1}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(EMPLOYEE_ROLE_PRESETS).map((role) => (
                      <SelectItem key={role} value={role}>{EMPLOYEE_ROLE_LABELS[role] ?? role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value) => updateField("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Internal Note</Label>
              <Textarea id="note" value={formData.note} onChange={(e) => updateField("note", e.target.value)} placeholder="Optional note about responsibilities, reporting line, or special access context..." rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card className="admin-form-card">
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EMPLOYEE_PERMISSION_KEYS.map((permission) => {
                const checked = formData.permissions.includes(permission);
                return (
                  <label key={permission} className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all ${checked ? "border-[#111184]/40 bg-[#111184]/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(permission)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#111184] focus:ring-[#111184]"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{EMPLOYEE_PERMISSION_LABELS[permission]}</p>
                      <p className="text-xs text-slate-500">Access {EMPLOYEE_PERMISSION_LABELS[permission].toLowerCase()} module</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-3">
          <Link href="/admin/employees">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" className="admin-form-submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Employee" : "Create Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
}