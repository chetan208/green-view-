'use client';

import React, { useState, useEffect } from "react";
import { Bus, Clock, MapPin, Plus, Edit2, Trash2, X, PauseCircle, PlayCircle, Eye, ChevronDown, ChevronUp, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { erpApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

type Station = {
  _id: string;
  station: string;
  amount: number;
};

export default function TransportPortal() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user } = useAuth();
  const isAdmin = user?.teacherProfile?.accessRole === 'Owner' || user?.teacherProfile?.accessRole === 'Admin';

  const fetchStations = async () => {
    setLoading(true);
    try {
      const res = await erpApi.transport.stations.list();
      if (res.success) {
        setStations(res.stations || []);
      } else {
        setError(res.message || "Failed to load stations");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load stations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const [expandedRoutes, setExpandedRoutes] = useState<string[]>(['global']);

  // Modal States
  const [stationFormOpen, setStationFormOpen] = useState<{isEdit: boolean, stationId?: string} | null>(null);
  const [stationFormData, setStationFormData] = useState({ name: "", fee: 0 });
  const [submitLoading, setSubmitLoading] = useState(false);

  const toggleExpandedRoute = (routeId: string) => {
    if (expandedRoutes.includes(routeId)) {
      setExpandedRoutes(expandedRoutes.filter(id => id !== routeId));
    } else {
      setExpandedRoutes([...expandedRoutes, routeId]);
    }
  };

  // --- Station Handlers ---
  const handleOpenStationForm = (station?: Station) => {
    if (station) {
      setStationFormData({ name: station.station, fee: station.amount });
      setStationFormOpen({ isEdit: true, stationId: station._id });
    } else {
      setStationFormData({ name: "", fee: 0 });
      setStationFormOpen({ isEdit: false });
    }
    setError(null);
    setSuccess(null);
  };

  const handleSaveStation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationFormOpen) return;
    setSubmitLoading(true);
    setError(null);

    try {
      const payload = {
        station: stationFormData.name,
        amount: stationFormData.fee
      };

      let res;
      if (stationFormOpen.isEdit && stationFormOpen.stationId) {
        res = await erpApi.transport.stations.update(stationFormOpen.stationId, payload);
      } else {
        res = await erpApi.transport.stations.create(payload);
      }

      if (res.success) {
        setSuccess(stationFormOpen.isEdit ? "Station updated successfully" : "Station added successfully");
        setStationFormOpen(null);
        fetchStations();
      } else {
        setError(res.message || "Failed to save station");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save station");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteStation = async (stationId: string) => {
    if (confirm("Are you sure you want to delete this station?")) {
      try {
        const res = await erpApi.transport.stations.delete(stationId);
        if (res.success) {
          setSuccess("Station deleted successfully");
          fetchStations();
        } else {
          setError(res.message || "Failed to delete station");
        }
      } catch (err: any) {
        setError(err.message || "Failed to delete station");
      }
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold font-serif text-slate-900">Transport Management</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Manage transport routes, stations, and station-specific fees.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => handleOpenStationForm()}
            className="bg-brand-green hover:bg-brand-green text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add New Station
          </button>
        )}
      </div>

      {success && (
        <div className="bg-brand-green/10 border border-brand-green/20 text-brand-green-dark text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess(null)} className="text-brand-green hover:text-brand-green-dark border-0 bg-transparent cursor-pointer">
            <X size={15} />
          </button>
        </div>
      )}
      
      {error && !stationFormOpen && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900 border-0 bg-transparent cursor-pointer">
            <X size={15} />
          </button>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="animate-spin text-brand-green-dark" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Transport Data...</span>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
            
            {/* Route Header */}
            <div 
              onClick={() => toggleExpandedRoute('global')}
              className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 cursor-pointer transition-colors bg-white hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-brand-green text-white">
                  <Bus size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-slate-900">Global Transport Network</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green-dark">
                      Active
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">All school stations and pick-up points</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block mr-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Stations</p>
                  <p className="text-[13px] font-semibold text-slate-700">
                    {stations.length}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleExpandedRoute('global'); }}
                  className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer flex items-center justify-center ml-2"
                >
                  {expandedRoutes.includes('global') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {expandedRoutes.includes('global') && (
              <>
                {/* Stations List */}
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-white border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="px-6 py-3">Station / Stop Name</th>
                        <th className="px-6 py-3">Monthly Transport Fee</th>
                        {isAdmin && <th className="px-6 py-3 text-right">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[13px]">
                      {stations.map((station, idx) => (
                        <tr key={station._id} className="hover:bg-slate-50/50 group">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-400 shrink-0">
                                {idx + 1}
                              </div>
                              <span className="font-semibold text-slate-700">{station.station}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <span className="font-semibold text-slate-700">₹{station.amount.toLocaleString()}</span>
                          </td>
                          {isAdmin && (
                            <td className="px-6 py-3">
                              <div className="flex justify-end gap-1">
                                <button onClick={() => handleOpenStationForm(station)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-brand-green rounded shadow-sm cursor-pointer" title="Edit Station">
                                  <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDeleteStation(station._id)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 rounded shadow-sm cursor-pointer" title="Delete Station">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {stations.length === 0 && (
                        <tr>
                          <td colSpan={isAdmin ? 3 : 2} className="py-8 text-center text-slate-400 italic text-xs">
                            No stations found. Add one to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Route Footer Actions */}
                {isAdmin && (
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <button 
                      onClick={() => handleOpenStationForm()}
                      className="text-xs font-semibold text-brand-green hover:text-brand-green-dark flex items-center gap-1.5 transition bg-transparent border-0 cursor-pointer"
                    >
                      <Plus size={14} /> Add Station
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Station Modal */}
      {stationFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800">{stationFormOpen.isEdit ? "Edit Station" : "Add New Station"}</h3>
              <button onClick={() => setStationFormOpen(null)} className="text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveStation} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded flex items-center gap-2">
                  <AlertTriangle size={14} />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Station Name *</label>
                <input type="text" required value={stationFormData.name} onChange={(e) => setStationFormData({...stationFormData, name: e.target.value})} placeholder="e.g. Gopal Nagar" className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Monthly Fee (₹) *</label>
                <input type="number" required min="0" value={stationFormData.fee} onChange={(e) => setStationFormData({...stationFormData, fee: Number(e.target.value)})} className="w-full px-3 py-2 bg-white border border-slate-200 text-xs rounded-lg focus:outline-none focus:border-brand-green font-medium transition" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setStationFormOpen(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition border-0 cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitLoading} className="flex-1 py-2 bg-brand-green hover:bg-brand-green text-white rounded-lg text-xs font-semibold transition shadow-sm border-0 cursor-pointer disabled:opacity-50 flex justify-center items-center gap-2">
                  {submitLoading && <Loader2 size={14} className="animate-spin" />}
                  {stationFormOpen.isEdit ? "Save Changes" : "Add Station"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
