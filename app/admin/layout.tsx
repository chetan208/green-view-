import React from "react";
import { Metadata } from "next";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

export const metadata: Metadata = {
  title: "Green View School | Admin Panel",
  description: "Secure administration panel to manage Green View data, notices, admissions, and more.",
};

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin', 'superadmin', 'super_admin']}>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </ProtectedRoute>
  );
}
