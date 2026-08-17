'use client';

import React from "react";
import ResultsManager from "@/components/admin/sections/ResultsManager";

export default function ToppersManager({ selectedSession }: { selectedSession: string }) {
  return <ResultsManager selectedSession={selectedSession} />;
}
