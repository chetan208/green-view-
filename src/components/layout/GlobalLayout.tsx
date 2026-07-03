"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isErpPortal = pathname?.startsWith('/erp');
  const isAdmin = pathname?.startsWith('/admin');

  // ERP portal: no header, no footer
  if (isErpPortal) {
    return <main className="flex-grow">{children}</main>;
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
