"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isErpPortal = pathname?.startsWith('/erp');
  const isStudentPortal = pathname?.startsWith('/student-portal');
  const isAdmin = pathname?.startsWith('/admin');

  // ERP portal or Student portal or App demo: no global header, no footer
  if (isErpPortal || isStudentPortal || pathname?.startsWith('/app')) {
    return <main className="flex-grow h-full">{children}</main>;
  }

  // Admin panel: header yes, footer no
  if (isAdmin) {
    return (
      <>
        <Header />
        <main className="flex-grow pt-24">{children}</main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </>
  );
}
