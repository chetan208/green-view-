import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function MapSection() {
  return (
    <section id="contact" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-slate-50 flex justify-center">
      <div className="max-w-7xl w-full bg-white border border-slate-100 rounded-[40px] shadow-lg p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Contact info details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-600" />
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                Our Location
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              We&apos;re close to where you want to go next
            </h2>

            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-sm">
              Our campus is located in a quiet, green residential zone, providing a peaceful environment ideal for studying.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 text-sm block">Address Location</span>
                  <span className="text-xs text-slate-500 font-semibold mt-1 block max-w-xs leading-relaxed">
                    Green View Sr. Sec. School Campus, Near City Park, Green Avenue Road, Sector-12
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 text-sm block">Get In Touch</span>
                  <span className="text-xs text-slate-500 font-semibold mt-1 block">
                    +91 98765 43210, +91 0123 245678
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-800 text-sm block">Send Email</span>
                  <span className="text-xs text-slate-500 font-semibold mt-1 block">
                    info@greenviewschool.edu.in
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex items-center gap-3 text-slate-400">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Visiting Hours: 9:00 AM - 1:30 PM (Mon-Sat)
            </span>
          </div>
        </div>

        {/* Visual Map Frame */}
        <div className="flex-1 w-full min-h-[300px] lg:min-h-auto rounded-[30px] overflow-hidden border border-slate-100 shadow-inner relative bg-slate-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4795328830154!2d76.78212137630737!3d30.733079974582855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sSector%2017%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}
