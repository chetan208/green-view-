"use client";

import React from "react";
import { Bus, MapPin, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { getPublicStationsApi } from "@/lib/api";
import { facilitiesData } from "@/data/facilitiesData";

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

interface StationNodeProps {
  st: StationItem;
  sIdx: number;
  total: number;
  smoothProgress: MotionValue<number>;
  isCampus: boolean;
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

const DesktopStationNode = ({ st, sIdx, total, smoothProgress, isCampus }: StationNodeProps) => {
  const threshold = sIdx / Math.max(1, total - 1);
  const defaultBorder = isCampus ? "#0b9e50" : "#cbd5e1"; // slate-300
  const activeBorder = "#0b9e50";
  const defaultText = isCampus ? "#0b9e50" : "#64748b"; // slate-500
  const activeText = "#0b9e50";

  const borderColor = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [defaultBorder, activeBorder]);
  const textColor = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [defaultText, activeText]);
  const shadow = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], ["none", "0 0 15px rgba(11,158,80,0.3)"]);
  const scale = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [1, 1.15]);
  const bg = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], ["#ffffff", "#f0fdf4"]);

  return (
    <div className="flex flex-col items-center text-center gap-3 relative z-10 shrink-0 w-28 lg:w-32">
      <motion.div 
        style={{ borderColor, color: textColor, boxShadow: shadow, scale, backgroundColor: bg }}
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300 relative z-20"
      >
        {isCampus ? <MapPin className="w-5 h-5" /> : <span className="text-sm font-bold">{sIdx + 1}</span>}
      </motion.div>
      <div className="flex flex-col">
        <motion.span style={{ color: textColor, scale }} className="text-xs lg:text-sm leading-tight font-semibold">
          {st.name}
        </motion.span>
      </div>
    </div>
  );
};

const MobileStationNode = ({ st, sIdx, total, smoothProgress, isCampus }: StationNodeProps) => {
  const threshold = sIdx / Math.max(1, total - 1);
  const defaultBorder = isCampus ? "#0b9e50" : "#cbd5e1";
  const activeBorder = "#0b9e50";
  const defaultText = isCampus ? "#0b9e50" : "#64748b";
  const activeText = "#0b9e50";

  const borderColor = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [defaultBorder, activeBorder]);
  const textColor = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [defaultText, activeText]);
  const shadow = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], ["none", "0 0 15px rgba(11,158,80,0.3)"]);
  const scale = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], [1, 1.15]);
  const bg = useTransform(smoothProgress, [Math.max(0, threshold - 0.1), threshold], ["#ffffff", "#f0fdf4"]);

  return (
    <div className="flex items-center gap-5 min-h-[40px] relative z-10">
      <motion.div 
        style={{ borderColor, color: textColor, boxShadow: shadow, scale, backgroundColor: bg }}
        className="absolute left-[-25px] w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 z-20"
      >
        {isCampus ? <MapPin className="w-4 h-4" /> : <span className="text-xs font-bold">{sIdx + 1}</span>}
      </motion.div>
      <div className="flex flex-col pl-6">
        <motion.span style={{ color: textColor, scale }} className="text-base leading-none font-bold origin-left">
          {st.name}
        </motion.span>
      </div>
    </div>
  );
};

// Interactive Route Card Component with Scroll-Jacking
const RouteCard = ({ route }: { route: DisplayRoute }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
  const movingContentRef = React.useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = React.useState(0);

  React.useEffect(() => {
    const updateMeasurements = () => {
      if (scrollWrapperRef.current && movingContentRef.current) {
        const overflow = movingContentRef.current.scrollWidth - scrollWrapperRef.current.clientWidth;
        setMaxScroll(Math.max(0, overflow + 32));
      }
    };
    
    const t = setTimeout(updateMeasurements, 150);
    window.addEventListener("resize", updateMeasurements);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [route]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.1 });
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);
  const fillProgress = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative md:h-[130vh] w-full">
      <div className="md:sticky md:top-32 w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500 flex flex-col gap-6 overflow-hidden">
        
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
              {/* Desktop Sequence (Scroll-Jacked Horizontal Timeline) */}
              <div className="hidden md:block relative mt-4 pb-6 pt-2 overflow-hidden w-full" ref={scrollWrapperRef}>
                <motion.div 
                  ref={movingContentRef} 
                  style={{ x }} 
                  className="flex flex-nowrap items-start justify-start gap-4 lg:gap-8 relative z-10 w-max px-2"
                >
                  
                  {/* The Track Line Container - Exactly bound between first and last circle centers */}
                  <div className="absolute top-[20px] left-[64px] lg:left-[72px] right-[64px] lg:right-[72px] z-0">
                    <div className="absolute inset-0 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                      {/* The Highlighted Animated Line */}
                      <motion.div 
                        style={{ width: fillProgress }}
                        className="h-full bg-brand-green shadow-[0_0_8px_rgba(11,158,80,0.5)] origin-left"
                      />
                    </div>
                    {/* The Moving Bus Icon Tracker */}
                    <motion.div
                      style={{ left: fillProgress }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-1.5 border-2 border-brand-green shadow-md z-30 flex items-center justify-center"
                    >
                      <Bus className="w-3.5 h-3.5 text-brand-green" />
                    </motion.div>
                  </div>

                  {route.stations.map((st, sIdx) => (
                    <DesktopStationNode 
                      key={sIdx} 
                      st={st} 
                      sIdx={sIdx} 
                      total={route.stations.length} 
                      smoothProgress={smoothProgress} 
                      isCampus={sIdx === 0} 
                    />
                  ))}
                </motion.div>
              </div>

              {/* Mobile Sequence (Vertical Animated Timeline) */}
              <div className="flex md:hidden flex-col gap-10 relative pl-6 mt-6 pb-2">
                {/* Vertical line track */}
                <div className="absolute top-4 bottom-6 left-[11px] w-[3px] z-0">
                  <div className="absolute inset-0 w-full bg-slate-100 rounded-full overflow-hidden">
                     {/* Highlighted Animated Line */}
                     <motion.div 
                        style={{ height: fillProgress }}
                        className="w-full bg-brand-green shadow-[0_0_8px_rgba(11,158,80,0.5)] origin-top"
                     />
                  </div>
                  {/* The Moving Bus Icon Tracker (Mobile) */}
                  <motion.div
                    style={{ top: fillProgress }}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border-2 border-brand-green shadow-md z-30 flex items-center justify-center"
                  >
                    <Bus className="w-2.5 h-2.5 text-brand-green" />
                  </motion.div>
                </div>

                {route.stations.map((st, sIdx) => (
                  <MobileStationNode 
                    key={sIdx} 
                    st={st} 
                    sIdx={sIdx} 
                    total={route.stations.length} 
                    smoothProgress={smoothProgress} 
                    isCampus={sIdx === 0} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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
          School Transport
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Bus Image */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] relative group aspect-[16/10]">
            <Image
              src={facilitiesData.find(f => f.id === "transport")?.image || "/images/facilities/school_bus.png"}
              alt="Green View School Buses"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="text-brand-green font-medium md:font-semibold text-xs uppercase tracking-wider mb-2">School Buses</span>
              <h3 className="text-white text-lg md:text-xl font-medium md:font-semibold leading-tight">Safe &amp; Reliable Student Commute</h3>
            </div>
          </div>

          {/* Secondary View - Mirroring Facilities Page */}
          <div className="flex flex-col items-start justify-center p-2 md:p-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#0B9E50] text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                {facilitiesData.find(f => f.id === "transport")?.category || "Safety"}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
              {facilitiesData.find(f => f.id === "transport")?.title}
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              {facilitiesData.find(f => f.id === "transport")?.fullDesc}
            </p>

            <div className="w-full">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {facilitiesData.find(f => f.id === "transport")?.highlights?.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B9E50] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">{h}</span>
                  </div>
                ))}
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
          <div className="flex flex-col gap-8 md:gap-16">
            {routes.map((route, rIdx) => (
              <RouteCard key={route.id || rIdx} route={route} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
