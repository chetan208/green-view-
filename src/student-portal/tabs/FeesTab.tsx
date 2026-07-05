"use client";

import React from "react";
import FeeStatsCards from "../components/fees/FeeStatsCards";
import FeeReceiptsLedger from "../components/fees/FeeReceiptsLedger";

export default function FeesTab() {
  const receipts = [
    { id: "INV-2026-0954", period: "Quarter 1 (Apr - Jun)", amount: "₹14,200", date: "08 April 2026", status: "Paid", method: "UPI / Net Banking" },
    { id: "INV-2026-1439", period: "Quarter 2 (Jul - Sep)", amount: "₹14,200", date: "02 July 2026", status: "Paid", method: "Credit Card" },
    { id: "INV-2026-2094", period: "Quarter 3 (Oct - Dec)", amount: "₹14,200", date: "Pending", status: "Upcoming", method: "--" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn">
      <FeeStatsCards />
      <FeeReceiptsLedger receipts={receipts} />
    </div>
  );
}
