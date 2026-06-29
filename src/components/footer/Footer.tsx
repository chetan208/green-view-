import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 mt-auto">
      


      {/* Main Footer Content */}
      <div className="w-full py-16 px-6 md:px-12 lg:px-24 flex justify-center border-b border-slate-900">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 relative shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Green View Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-lg leading-none tracking-tight">
                  Green view
                </span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase mt-1 leading-none">
                  Sr. Sec. School
                </span>
              </div>
            </Link>
            
            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              Fostering excellence, character, and integrity in every student since 1996. Our balanced CBSE curriculum empowers kids to lead globally.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: "https://facebook.com" },
                { icon: TwitterIcon, href: "https://twitter.com" },
                { icon: InstagramIcon, href: "https://instagram.com" },
                { icon: YoutubeIcon, href: "https://youtube.com" },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-emerald-700 text-slate-400 hover:text-white p-2.5 rounded-full transition-colors border border-slate-900 hover:border-emerald-600/30 shadow-md"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest relative pb-2 border-b border-slate-900 w-fit">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-xs md:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">About Campus</Link>
              </li>
              <li>
                <Link href="#facilities" className="hover:text-emerald-400 transition-colors">School Facilities</Link>
              </li>
              <li>
                <Link href="#events" className="hover:text-emerald-400 transition-colors">Recent Events</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-emerald-400 transition-colors">Contact Directory</Link>
              </li>
            </ul>
          </div>

          {/* Academics Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest relative pb-2 border-b border-slate-900 w-fit">
              Academics
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-xs md:text-sm">
              <li>
                <Link href="#admission" className="hover:text-emerald-400 transition-colors">Admission Form</Link>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Syllabus & Curriculum</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Academic Calendar</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Examinations Schedule</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">Mandatory Disclosures</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest relative pb-2 border-b border-slate-900 w-fit">
              Have Questions?
            </h4>
            <div className="flex flex-col gap-4 font-semibold text-xs md:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="leading-relaxed text-slate-500">
                  Green Avenue, Sector-12, Near City Park, Chandigarh, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-500">
                  +91 98765 43210, 0172-2541300
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-500">
                  info@greenviewschool.edu.in
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom copyright bar */}
      <div className="w-full py-6 px-6 text-center text-[10px] md:text-xs font-bold text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            © 2026 Green View Sr. Sec. School. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-400 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
