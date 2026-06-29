import React from "react";
import TransportHero from "./components/TransportHero";
import TransportInfo from "./components/TransportInfo";

export default function TransportPage() {
  return (
    <div className="w-full min-h-screen bg-[#fcfcfc] overflow-hidden pb-20">
      <TransportHero />
      <TransportInfo />
    </div>
  );
}
