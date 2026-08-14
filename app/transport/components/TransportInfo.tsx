"use client";

import React from "react";
import { Bus, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { getPublicStationsApi } from "@/lib/api";

interface RouteData {
  busNo: string;
  busCode: string;
  stations: { name: string; time: string; fee?: number }[];
}

export default function TransportInfo() {
  const [routes, setRoutes] = React.useState<RouteData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await getPublicStationsApi();
        const stations = res.stations || res.data || res || [];
        
        // Group flat stations by routeNumber
        const grouped = stations.reduce((acc: any, st: any) => {
          const rNum = st.routeNumber || "Unassigned Route";
          if (!acc[rNum]) {
            acc[rNum] = { 
              busNo: rNum, 
              busCode: st.routeCode || "Unknown Code", 
              stations: [] 
            };
          }
          acc[rNum].stations.push({
            name: st.station || "Unnamed Station",
            time: st.pickupTime || "00:00 AM",
            fee: st.amount || 0
          });
          return acc;
        }, {});

        setRoutes(Object.values(grouped));
      } catch (err) {
        console.error("Failed to load stations", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col gap-14 pb-20">
      
      {/* 1. Bus Photo Showcase Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-medium md:font-semibold text-slate-800 tracking-tight">
          School Bus Fleet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Bus Image */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] relative group aspect-[16/10]">
            <img
              src="/images/school_bus.png"
              alt="Green View School Bus Fleet"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="text-brand-green font-medium md:font-semibold text-xs uppercase tracking-wider mb-2">School Transport</span>
              <h3 className="text-white text-lg md:text-xl font-medium md:font-semibold leading-tight">GPS & Camera-Enabled Safe Transit Busses</h3>
            </div>
          </div>

          {/* Secondary Fleet View */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center">
              <Bus className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="text-lg md:text-xl font-medium md:font-semibold text-slate-800 tracking-tight leading-tight">
              Safety-Centric Fleet Monitoring
            </h3>
            <p className="text-slate-500 text-xs md:text-sm font-normal md:font-medium leading-relaxed">
              Our transportation system operates fully GPS-tracked, speed-regulated school buses. Regular inspections and certified drivers guarantee a secure transit cycle for all students.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-xs font-medium md:font-semibold text-slate-850">03 Active Routes</span>
                <span className="text-[10px] text-slate-400 font-medium md:font-semibold uppercase tracking-wider">Covering All Sectors</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs font-medium md:font-semibold text-slate-850">GPS Tracker v2</span>
                <span className="text-[10px] text-slate-400 font-medium md:font-semibold uppercase tracking-wider">Live Parents App Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Routes and Stations Showcase Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-medium md:font-semibold text-slate-800 tracking-tight">
          Transit Routes & Station Sequences
        </h2>
        <div className="flex flex-col gap-8">
          {routes.map((route, rIdx) => (
            <motion.div
              key={rIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: rIdx * 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.01)] hover:shadow-lg transition-all duration-300 flex flex-col gap-6"
            >
              {/* Route Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium md:font-semibold text-slate-850 text-base md:text-lg leading-none">
                      {route.busNo}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium md:font-semibold uppercase mt-1 tracking-wider">
                      Reg. Code: {route.busCode}
                    </span>
                  </div>
                </div>
                
                <div className="text-[10px] text-brand-green bg-emerald-50/50 border border-emerald-100/30 px-3 py-1 rounded-full font-medium md:font-semibold self-start sm:self-auto select-none">
                  Fully Operational Route
                </div>
              </div>

              {/* Stations Sequence (Horizontal on Desktop, Vertical on Mobile) */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] text-slate-400 font-medium md:font-semibold uppercase tracking-wider">
                  Pickup Stations sequence:
                </span>
                
                {/* Desktop Sequence (Horizontal Timeline) */}
                <div className="hidden md:flex items-start justify-between relative mt-2">
                  {/* Connected line behind */}
                  <div className="absolute top-[15px] left-6 right-6 h-[2px] bg-slate-100 z-0" />

                  {route.stations.map((st, sIdx) => {
                    const isLast = sIdx === route.stations.length - 1;
                    return (
                      <div key={sIdx} className="flex flex-col items-center text-center gap-2 relative z-10 w-40">
                        {/* Circle node */}
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          isLast 
                            ? "bg-brand-green border-brand-green text-white shadow-md shadow-emerald-500/10" 
                            : "bg-white border-slate-200 text-slate-600 group-hover:border-brand-green transition-colors"
                        }`}>
                          {isLast ? (
                            <MapPin className="w-4 h-4" />
                          ) : (
                            <span className="text-[10px] font-medium md:font-semibold">{sIdx + 1}</span>
                          )}
                        </div>
                        {/* Name and timing */}
                        <div className="flex flex-col">
                          <span className={`text-xs font-medium md:font-semibold leading-tight ${isLast ? "text-brand-green font-medium md:font-semibold" : "text-slate-800"}`}>
                            {st.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium md:font-semibold mt-0.5 inline-flex items-center gap-1 justify-center">
                            <Clock className="w-3 h-3 text-slate-300" /> {st.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Sequence (Vertical Timeline) */}
                <div className="flex md:hidden flex-col gap-4 relative pl-8 mt-2">
                  {/* Vertical line behind */}
                  <div className="absolute top-3 bottom-3 left-[15px] w-[2px] bg-slate-100" />

                  {route.stations.map((st, sIdx) => {
                    const isLast = sIdx === route.stations.length - 1;
                    return (
                      <div key={sIdx} className="flex items-start gap-4 relative">
                        {/* Circle node absolute */}
                        <div className={`absolute left-[-25px] w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                          isLast 
                            ? "bg-brand-green border-brand-green text-white" 
                            : "bg-white border-slate-200 text-slate-600"
                        }`}>
                          {isLast ? (
                            <MapPin className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-[9px] font-medium md:font-semibold">{sIdx + 1}</span>
                          )}
                        </div>
                        {/* Name & Timing */}
                        <div className="flex flex-col pt-0.5">
                          <span className={`text-xs font-medium md:font-semibold leading-none ${isLast ? "text-brand-green font-medium md:font-semibold" : "text-slate-800"}`}>
                            {st.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium md:font-semibold mt-1.5 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-300" /> {st.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
