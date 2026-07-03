'use client';

import React from "react";
import ERPHeader from "@/components/erp/ERPHeader";
import { ERPDashboardContent } from "@/erp";

export default function ERPPage() {
  return (
    <div className="pt-14">
      <ERPHeader />
      <ERPDashboardContent />
    </div>
  );
}
