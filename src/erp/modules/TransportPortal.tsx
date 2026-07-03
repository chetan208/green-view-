'use client';

import React, { useState } from "react";
import { Bus, Clock, MapPin, Plus, Edit2, Trash2, X, PauseCircle, PlayCircle, Eye, ChevronDown, ChevronUp } from "lucide-react";

type Station = {
  id: string;
  name: string;
  time: string;
  fee: number;
  students: number;
};

type Route = {
  id: string;
  busNo: string;
  busCode: string;
  driver: string;
  capacity: number;
  enrolled: number;
  status: "Active" | "Paused";
  stations: Station[];
};

export default function TransportPortal() {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "R-01",
      busNo: "Bus Route 01",
      busCode: "PB-08-AB-1234",
      driver: "Vikash Singh",
      capacity: 40,
      enrolled: 35,
      status: "Active",
      stations: [
        { id: "S1-1", name: "Gopal Nagar", time: "07:15 AM", fee: 1200, students: 8 },
        { id: "S1-2", name: "Shiv Mandir", time: "07:25 AM", fee: 1100, students: 12 },
        { id: "S1-3", name: "Main Highway Chowk", time: "07:35 AM", fee: 900, students: 7 },
        { id: "S1-4", name: "Sector-4 Market", time: "07:45 AM", fee: 800, students: 8 },
        { id: "S1-5", name: "School Campus", time: "08:00 AM", fee: 0, students: 0 }
      ]
    },
    {
      id: "R-02",
      busNo: "Bus Route 02",
      busCode: "PB-08-AB-5678",
      driver: "Ramesh Kumar",
      capacity: 35,
      enrolled: 35,
      status: "Active",
      stations: [
        { id: "S2-1", name: "Railway Road", time: "07:20 AM", fee: 1500, students: 10 },
        { id: "S2-2", name: "Green Valley Residency", time: "07:30 AM", fee: 1300, students: 15 },
        { id: "S2-3", name: "New Colony Phase-I", time: "07:40 AM", fee: 1000, students: 6 },
        { id: "S2-4", name: "Sector-12 Chowk", time: "07:50 AM", fee: 700, students: 4 },
        { id: "S2-5", name: "School Campus", time: "08:00 AM", fee: 0, students: 0 }
      ]
    },
    {
      id: "R-03",
      busNo: "Bus Route 03",
      busCode: "PB-08-AB-9012",
      driver: "Suresh",
      capacity: 20,
      enrolled: 12,
      status: "Paused",
      stations: [
        { id: "S3-1", name: "Urban Estate Phase I", time: "07:10 AM", fee: 2000, students: 4 },
        { id: "S3-2", name: "Police Lines Area", time: "07:22 AM", fee: 1800, students: 3 },
        { id: "S3-3", name: "Old Bus Stand Stop", time: "07:35 AM", fee: 1500, students: 2 },
        { id: "S3-4", name: "National Highway Bypass", time: "07:48 AM", fee: 1000, students: 3 },
        { id: "S3-5", name: "School Campus", time: "08:00 AM", fee: 0, students: 0 }
      ]
    }
  ]);

  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  // Modal States
  const [stationFormOpen, setStationFormOpen] = useState<{routeId: string, stationId?: string} | null>(null);
  const [stationFormData, setStationFormData] = useState({ name: "", time: "", fee: 0, students: 0 });
  const [viewRouteId, setViewRouteId] = useState<string | null>(null);

  // --- Route Handlers ---
  const toggleRouteStatus = (routeId: string) => {
    setRoutes(routes.map(r => r.id === routeId ? { ...r, status: r.status === "Active" ? "Paused" : "Active" } : r));
  };

  const toggleExpandedRoute = (routeId: string) => {
    if (expandedRoutes.includes(routeId)) {
      setExpandedRoutes(expandedRoutes.filter(id => id !== routeId));
    } else {
      setExpandedRoutes([...expandedRoutes, routeId]);
    }
  };

  // --- Station Handlers ---
  const handleOpenStationForm = (routeId: string, station?: Station) => {
    if (station) {
      setStationFormData({ name: station.name, time: station.time, fee: station.fee, students: station.students });
      setStationFormOpen({ routeId, stationId: station.id });
    } else {
      setStationFormData({ name: "", time: "", fee: 0, students: 0 });
      setStationFormOpen({ routeId });
    }
  };

  const handleSaveStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationFormOpen) return;

    setRoutes(routes.map(r => {
      if (r.id === stationFormOpen.routeId) {
        if (stationFormOpen.stationId) {
          // Edit existing station
          return {
            ...r,
            stations: r.stations.map(s => s.id === stationFormOpen.stationId ? { ...s, ...stationFormData } : s)
          };
        } else {
          // Add new station
          const newStation: Station = {
            id: `S-${Date.now()}`,
            ...stationFormData
          };
          return { ...r, stations: [...r.stations, newStation] };
        }
      }
      return r;
    }));
    
    setStationFormOpen(null);
  };

  const handleDeleteStation = (routeId: string, stationId: string) => {
    if (confirm("Are you sure you want to delete this station?")) {
      setRoutes(routes.map(r => {
        if (r.id === routeId) {
          return { ...r, stations: r.stations.filter(s => s.id !== stationId) };
        }
        return r;
      }));
    }
  };


  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold font-serif text-slate-900">Transport Management</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">Manage routes, stations, and station-specific fees.</p>
        </div>
        <button className="bg-brand-green hover:bg-brand-green text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer">
          <Plus size={16} /> Add New Route
        </button>
      </div>

      <div className="space-y-6">
        {routes.map((route) => (
          <div key={route.id} className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${route.status === 'Paused' ? 'border-slate-300 opacity-75' : 'border-slate-200'}`}>
            
            {/* Route Header */}
            <div 
              onClick={() => toggleExpandedRoute(route.id)}
              className={`p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b cursor-pointer transition-colors ${route.status === 'Paused' ? 'bg-slate-50 hover:bg-slate-100/50 border-slate-200' : 'bg-white hover:bg-slate-50 border-slate-100'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${route.status === 'Paused' ? 'bg-slate-200 text-slate-500' : 'bg-brand-green text-white'}`}>
                  <Bus size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{route.busNo}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${route.status === 'Active' ? 'bg-brand-green/10 text-brand-green-dark' : 'bg-slate-200 text-slate-600'}`}>
                      {route.status}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{route.busCode} • Driver: {route.driver}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block mr-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Capacity</p>
                  <p className={`text-[13px] font-bold ${route.enrolled >= route.capacity ? 'text-rose-600' : 'text-slate-700'}`}>
                    {route.enrolled} / {route.capacity}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRouteStatus(route.id);
                  }}
                  className={`p-2 rounded-lg border text-[13px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    route.status === "Active" 
                      ? "bg-white border-brand-green-dark/20 text-brand-green-dark hover:bg-brand-green/5" 
                      : "bg-white border-brand-green/20 text-brand-green hover:bg-brand-green/5"
                  }`}
                >
                  {route.status === "Active" ? <><PauseCircle size={16} /> Pause Route</> : <><PlayCircle size={16} /> Activate Route</>}
                </button>
                <button 
                  onClick={() => toggleExpandedRoute(route.id)}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer flex items-center justify-center ml-2"
                >
                  {expandedRoutes.includes(route.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {expandedRoutes.includes(route.id) && (
              <>
                {/* Stations List */}
                <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-3">Station / Stop Name</th>
                    <th className="px-6 py-3">Arrival Time</th>
                    <th className="px-6 py-3">Students</th>
                    <th className="px-6 py-3">Monthly Fee</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[13px]">
                  {route.stations.map((station, idx) => (
                    <tr key={station.id} className="hover:bg-slate-50/50 group">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                            {idx + 1}
                          </div>
                          <span className="font-bold text-slate-700">{station.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="flex items-center gap-1.5 font-medium text-slate-500">
                          <Clock size={14} className="text-brand-green" /> {station.time}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-bold text-slate-700">{station.students}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-bold text-slate-700">₹{station.fee.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => handleOpenStationForm(route.id, station)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-brand-green rounded shadow-sm cursor-pointer" title="Edit Station">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteStation(route.id, station.id)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 rounded shadow-sm cursor-pointer" title="Delete Station">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Route Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button 
                onClick={() => handleOpenStationForm(route.id)}
                className="text-xs font-bold text-brand-green hover:text-brand-green-dark flex items-center gap-1.5 transition bg-transparent border-0 cursor-pointer"
              >
                <Plus size={14} /> Add Station
              </button>
              <button className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition bg-transparent border-0 cursor-pointer">
                <Eye size={14} /> View Enrolled Students
              </button>
            </div>
            </>
            )}

          </div>
        ))}

        {routes.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <Bus size={32} className="mb-2 opacity-50" />
            <p className="font-semibold text-xs">No transport routes available.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Station Modal */}
      {stationFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{stationFormOpen.stationId ? "Edit Station" : "Add New Station"}</h3>
              <button onClick={() => setStationFormOpen(null)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveStation} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Station Name *</label>
                <input type="text" required value={stationFormData.name} onChange={(e) => setStationFormData({...stationFormData, name: e.target.value})} placeholder="e.g. Gopal Nagar" className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Time *</label>
                  <input type="text" required value={stationFormData.time} onChange={(e) => setStationFormData({...stationFormData, time: e.target.value})} placeholder="e.g. 07:15 AM" className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Fee (₹) *</label>
                  <input type="number" required min="0" value={stationFormData.fee} onChange={(e) => setStationFormData({...stationFormData, fee: Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Enrolled Students</label>
                  <input type="number" required min="0" value={stationFormData.students} onChange={(e) => setStationFormData({...stationFormData, students: Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setStationFormOpen(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition border-0 cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-brand-green hover:bg-brand-green text-white rounded-lg text-xs font-bold transition shadow-sm border-0 cursor-pointer">{stationFormOpen.stationId ? "Save Changes" : "Add Station"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
