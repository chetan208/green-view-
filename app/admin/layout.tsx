import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green View School | Admin Panel",
  description: "Secure administration panel to manage Green View data, notices, admissions, and more.",
};

export default function AdminControlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
