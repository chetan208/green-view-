"use client";

import React from "react";
import Link from "next/link";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col gap-10">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-slate-500">
            <Link href="/" className="text-[#0fa958] hover:underline">Home</Link> / <span>Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] tracking-tight mt-1" style={{ fontFamily: "Georgia, serif" }}>
            Contact <span className="text-[#147a42]">Us</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2">
            We&apos;d love to hear from you. Reach out to us for any queries.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-4">
          <ContactDetails />
          <ContactForm />
        </div>

        {/* Map Section */}
        <ContactMap />

      </div>
    </div>
  );
}
