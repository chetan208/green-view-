import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "School ERP | Green View School",
  description: "Internal School Management System — Green View School",
};

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F0F4F8] min-h-screen antialiased">
      {children}
    </div>
  );
}
