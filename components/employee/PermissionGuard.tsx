"use client";

import type { ReactNode } from "react";

export default function PermissionGuard({
  allowed,
  children,
  fallback,
}: {
  allowed: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  if (!allowed) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}