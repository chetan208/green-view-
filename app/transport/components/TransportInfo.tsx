"use client";

import React from "react";
import { Bus, MapPin, Clock, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getPublicStationsApi } from "@/lib/api";

interface StationItem {
  name: string;
  time?: string;
  fee?: number;
}

interface DisplayRoute {
  id: string;
  routeName: string;
  description?: string;
  stations: StationItem[];
}

function ensureSchoolCampusFirst(stations: StationItem[]): StationItem[] {
  if (!stations) return [{ name: "School Campus", time: "Departure Point" }];

  const isCampusFirst = stations.length > 0 && 
    (stations[0].name.toLowerCase().includes("campus") || stations[0].name.toLowerCase().includes("school"));

  if (isCampusFirst) {
    return stations;
  }

  const campusStation: StationItem = {
    name: "School Campus",
    time: "Departure Point"
  };

  const filtered = stations.filter(s => 
    !s.name.toLowerCase().includes("campus") && !s.name.toLowerCase().includes("school campus")
  );

  return [campusStation, ...filtered];
}

export default function TransportInfo() {
  const [routes, setRoutes] = React.useState<DisplayRoute[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const res = await getPublicStationsApi();
        const rawRoutes: any[] = res.routes || [];
        const rawStations: any[] = res.stations || res.data || (Array.isArray(res) ? res : []);

        if (rawRoutes.length > 0) {
          // Map dynamic routes directly from backend database
          const mapped: DisplayRoute[] = rawRoutes.map((r: any) => {
            const routeStations = rawStations
              .filter((st: any) => {
                const stRouteId = typeof st.routeId === 'object' ? st.routeId?._id : st.routeId;
                return String(stRouteId) === String(r._id);
              })
              .map((st: any) => ({
                name: st.station || "Unnamed Station",
                time: st.pickupTime || "As per schedule",
                fee: st.amount || 0
              }));

            return {
              id: r._id,
              routeName: r.routeName || "School Transport Route",
              description: r.description || "Active School Bus Transit",
              stations: ensureSchoolCampusFirst(routeStations)
            };
          });

          setRoutes(mapped);
        } else {
          // Fallback: Group by populated routeId in stations if rawRoutes array wasn't directly returned
          const grouped: { [key: string]: DisplayRoute } = {};
          
          rawStations.forEach((st: any) => {
            const routeObj = typeof st.routeId === 'object' ? st.routeId : null;
            const rId = routeObj?._id || String(st.routeId) || "default";
            const rName = routeObj?.routeName || st.routeNumber || "School Bus Route";
            const rDesc = routeObj?.description || st.routeCode || "Standard Route";

            if (!grouped[rId]) {
              grouped[rId] = {
                id: rId,
                routeName: rName,
                description: rDesc,
                stations: []
              };
            }

            grouped[rId].stations.push({
              name: st.station || "Unnamed Station",
              time: st.pickupTime || "As per schedule",
              fee: st.amount || 0
            });
          });

          const groupedArray = Object.values(grouped).map(route => ({
            ...route,
            stations: ensureSchoolCampusFirst(route.stations)
          }));

          setRoutes(groupedArray);
        }
      } catch (err) {
        console.error("Failed to load transport routes", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransportData();
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
              <h3 className="text-white text-lg md:text-xl font-medium md:font-semibold leading-tight">GPS &amp; Camera-Enabled Safe Transit Busses</h3>
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
                <span className="text-xs font-medium md:font-semibold text-slate-850">
                  {isLoading ? "Loading..." : `${String(routes.length).padStart(2, '0')} Active Routes`}
                </span>
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
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-medium md:font-semibold text-slate-800 tracking-tight">
            Transit Routes &amp; Station Sequences
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {routes.length} Active {routes.length === 1 ? 'Route' : 'Routes'}
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
            <span className="text-xs font-semibold text-slate-500">Fetching live transport routes...</span>
          </div>
        ) : routes.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center gap-3 shadow-xs">
            <AlertCircle className="w-10 h-10 text-amber-500 mb-1" />
            <h3 className="text-lg font-bold text-slate-800">No Active Transport Routes</h3>
            <p className="text-xs text-slate-500 max-w-md">Currently, no transport routes are configured in the system. Please check back later or contact the school office.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {routes.map((route, rIdx) => (
              <motion.div
                key={route.id || rIdx}
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
                      <h3 className="font-semibold text-slate-900 text-base md:text-lg leading-none">
                        {route.routeName}
                      </h3>
                      {route.description && (
                        <span className="text-[11px] text-slate-500 font-medium mt-1">
                          {route.description}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-brand-green bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full font-bold uppercase tracking-wider self-start sm:self-auto select-none">
                    {route.stations.length} Pickup {route.stations.length === 1 ? 'Station' : 'Stations'}
                  </div>
                </div>

                {/* Stations Sequence */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Pickup Stations Sequence:
                  </span>
                  
                  {route.stations.length === 0 ? (
                    <div className="text-xs text-slate-400 font-medium italic bg-slate-50 p-4 rounded-xl text-center">
                      No stations added for this route yet.
                    </div>
                  ) : (
                    <>
                      {/* Desktop Sequence (Horizontal Timeline) */}
                      <div className="hidden md:flex items-start justify-start gap-8 relative mt-2 overflow-x-auto pb-4 pt-1">
                        {route.stations.map((st, sIdx) => {
                          const isCampus = sIdx === 0;
                          return (
                            <div key={sIdx} className="flex flex-col items-center text-center gap-2 relative z-10 shrink-0 w-36">
                              {/* Circle node */}
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                                isCampus 
                                  ? "bg-brand-green border-brand-green text-white shadow-md shadow-emerald-500/20" 
                                  : "bg-white border-slate-200 text-slate-700"
                              }`}>
                                {isCampus ? <MapPin className="w-4 h-4" /> : <span className="text-[11px] font-bold">{sIdx + 1}</span>}
                              </div>
                              {/* Name and timing */}
                              <div className="flex flex-col">
                                <span className={`text-xs font-semibold leading-tight ${isCampus ? "text-brand-green font-bold" : "text-slate-800"}`}>
                                  {st.name}
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
                          const isCampus = sIdx === 0;
                          return (
                            <div key={sIdx} className="flex items-start gap-4 relative">
                              {/* Circle node absolute */}
                              <div className={`absolute left-[-25px] w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
                                isCampus 
                                  ? "bg-brand-green border-brand-green text-white" 
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}>
                                {isCampus ? <MapPin className="w-3.5 h-3.5" /> : <span className="text-[9px] font-bold">{sIdx + 1}</span>}
                              </div>
                              {/* Name & Timing */}
                              <div className="flex flex-col pt-0.5">
                                <span className={`text-xs font-semibold leading-none ${isCampus ? "text-brand-green font-bold" : "text-slate-800"}`}>
                                  {st.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
