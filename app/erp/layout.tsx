import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "School ERP | Green View School",
  description: "Internal School Management System — Green View School",
};

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['superadmin', 'super_admin']}>
      <div className="bg-[#F0F4F8] min-h-screen antialiased">
        {children}
      </div>
    </ProtectedRoute>
  );
}
