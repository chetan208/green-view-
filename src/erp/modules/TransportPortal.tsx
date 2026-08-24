'use client';

import React, { useState, useEffect } from "react";
import { Bus, Plus, Edit2, Trash2, X, ChevronDown, ChevronUp, Loader2, AlertTriangle, CheckCircle2, MapPin, PauseCircle, PlayCircle } from "lucide-react";
import { erpApi } from "@/services/erpApi";
import { useAuth } from "@/hooks/useAuth";

type Route = {
  _id: string;
  routeName: string;
  description?: string;
  isActive: boolean;
};

type Station = {
  _id: string;
  station: string;
  amount: number;
  routeId?: Route | string; // Populated or ID
};

export default function TransportPortal() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user } = useAuth();
  const isAdmin = user?.accessLevel === 'superadmin' || user?.accessLevel === 'admin';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [routesRes, stationsRes] = await Promise.all([
        erpApi.transport.routes.list(),
        erpApi.transport.stations.list()
      ]);
      if (routesRes.success) setRoutes(routesRes.routes || []);
      if (stationsRes.success) setStations(stationsRes.stations || []);
    } catch (err: any) {
      setError(err.message || "Failed to load transport data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  // Route Modal States
  const [routeFormOpen, setRouteFormOpen] = useState<{isEdit: boolean, routeId?: string} | null>(null);
  const [routeFormData, setRouteFormData] = useState({ routeName: "", description: "" });
  
  // Station Modal States
  const [stationFormOpen, setStationFormOpen] = useState<{isEdit: boolean, stationId?: string, defaultRouteId?: string} | null>(null);
  const [stationFormData, setStationFormData] = useState<{name: string, fee: number | string, routeId: string}>({ name: "", fee: "", routeId: "" });
  
  const [deleteStationModal, setDeleteStationModal] = useState<string | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const toggleExpandedRoute = (routeId: string) => {
    if (expandedRoutes.includes(routeId)) {
      setExpandedRoutes(expandedRoutes.filter(id => id !== routeId));
    } else {
      setExpandedRoutes([...expandedRoutes, routeId]);
    }
  };

  // --- Route Handlers ---
  const handleOpenRouteForm = (route?: Route) => {
    if (route) {
      setRouteFormData({ routeName: route.routeName, description: route.description || "" });
      setRouteFormOpen({ isEdit: true, routeId: route._id });
    } else {
      setRouteFormData({ routeName: "", description: "" });
      setRouteFormOpen({ isEdit: false });
    }
    setError(null);
    setSuccess(null);
  };

  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeFormOpen) return;
    setSubmitLoading(true);
    setError(null);

    try {
      let res;
      if (routeFormOpen.isEdit && routeFormOpen.routeId) {
        res = await erpApi.transport.routes.update(routeFormOpen.routeId, routeFormData);
      } else {
        res = await erpApi.transport.routes.create(routeFormData);
      }

      if (res.success) {
        setSuccess(routeFormOpen.isEdit ? "Route updated successfully" : "Route created successfully");
        setRouteFormOpen(null);
        fetchData();
      } else {
        setError(res.message || "Failed to save route");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save route");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleRouteStatus = async (route: Route) => {
    try {
      const res = await erpApi.transport.routes.update(route._id, { isActive: !route.isActive });
      if (res.success) {
        setSuccess(`Route ${route.isActive ? 'paused' : 'resumed'} successfully`);
        fetchData();
      } else {
        setError(res.message || "Failed to update route status");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update route status");
    }
  };

  // --- Station Handlers ---
  const handleOpenStationForm = (routeId: string, station?: Station) => {
    if (station) {
      const sRouteId = typeof station.routeId === 'object' ? station.routeId?._id : station.routeId;
      setStationFormData({ name: station.station, fee: station.amount, routeId: sRouteId || routeId });
      setStationFormOpen({ isEdit: true, stationId: station._id });
    } else {
      setStationFormData({ name: "", fee: "", routeId: routeId });
      setStationFormOpen({ isEdit: false, defaultRouteId: routeId });
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
        amount: Number(stationFormData.fee),
        routeId: stationFormData.routeId
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
        fetchData();
      } else {
        setError(res.message || "Failed to save station");
      }
    } catch (err: any) {
      setError(err.message || "Failed to save station");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteStation = async () => {
    if (!deleteStationModal) return;
    try {
      const res = await erpApi.transport.stations.delete(deleteStationModal);
      if (res.success) {
        setSuccess("Station deleted successfully");
        setDeleteStationModal(null);
        fetchData();
      } else {
        setError(res.message || "Failed to delete station");
        setDeleteStationModal(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete station");
      setDeleteStationModal(null);
    }
  };

  const [deleteRouteModal, setDeleteRouteModal] = useState<string | null>(null);

  const handleDeleteRoute = async () => {
    if (!deleteRouteModal) return;
    try {
      const res = await erpApi.transport.routes.delete(deleteRouteModal);
      if (res.success) {
        setSuccess("Route deleted successfully");
        setDeleteRouteModal(null);
        fetchData();
      } else {
        setError(res.message || "Failed to delete route");
        setDeleteRouteModal(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete route");
      setDeleteRouteModal(null);
    }
  };

  const [draggedStation, setDraggedStation] = useState<{ id: string; routeId: string; index: number } | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string, routeId: string, index: number) => {
    setDraggedStation({ id, routeId, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, targetRouteId: string) => {
    e.preventDefault();
    if (draggedStation && draggedStation.routeId === targetRouteId) {
      e.dataTransfer.dropEffect = "move";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  };

  const handleDrop = async (e: React.DragEvent, targetId: string, targetRouteId: string, targetIndex: number) => {
    e.preventDefault();
    if (!draggedStation || draggedStation.routeId !== targetRouteId || draggedStation.index === targetIndex) {
      setDraggedStation(null);
      return;
    }

    // Get current stations for this route
    const routeStations = stations.filter(s => {
      if (typeof s.routeId === 'object' && s.routeId !== null) return s.routeId._id === targetRouteId;
      return s.routeId === targetRouteId;
    });

    // Reorder locally
    const newOrder = [...routeStations];
    const [movedItem] = newOrder.splice(draggedStation.index, 1);
    newOrder.splice(targetIndex, 0, movedItem);

    // Update locally for instant feedback
    setStations(prev => {
      const otherStations = prev.filter(s => {
        if (typeof s.routeId === 'object' && s.routeId !== null) return s.routeId._id !== targetRouteId;
        return s.routeId !== targetRouteId;
      });
      return [...otherStations, ...newOrder];
    });

    setDraggedStation(null);

    // Sync to backend
    try {
      const orderedIds = newOrder.map(s => s._id);
      await erpApi.transport.stations.reorder(orderedIds);
    } catch (err: any) {
      setError("Failed to save new station order");
      fetchData(); // revert
    }
  };

  const inputCls = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all";

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold font-serif text-slate-900">Transport Routes</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Manage transport routes, stations, and station-specific fees.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => handleOpenRouteForm()}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer"
          >
            <Plus size={16} /> Add New Route
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
      
      {error && !stationFormOpen && !routeFormOpen && (
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

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="animate-spin text-brand-green-dark" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Transport Data...</span>
          </div>
        ) : routes.length === 0 ? (
           <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-sm">
             <Bus className="mx-auto text-slate-300 mb-3" size={32} />
             <h3 className="text-sm font-semibold text-slate-700 mb-1">No Routes Found</h3>
             <p className="text-xs text-slate-500 max-w-sm mx-auto">Create a route to start adding transport stations and managing fees.</p>
           </div>
        ) : (
          routes.map(route => {
            const isExpanded = expandedRoutes.includes(route._id);
            const routeStations = stations.filter(s => {
               if (typeof s.routeId === 'object' && s.routeId !== null) return s.routeId._id === route._id;
               return s.routeId === route._id;
            });

            return (
              <div key={route._id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300">
                {/* Route Header */}
                <div 
                  onClick={() => toggleExpandedRoute(route._id)}
                  className={`p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${!route.isActive ? 'bg-slate-50 opacity-70' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${route.isActive ? 'bg-brand-green/10 text-brand-green' : 'bg-slate-200 text-slate-500'}`}>
                      <Bus size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base text-slate-900">
                          {route.routeName} {!route.isActive && <span className="text-xs text-rose-500 font-medium">(Paused)</span>}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                          {routeStations.length} Stations
                        </span>
                      </div>
                      {route.description && <p className="text-[13px] font-medium text-slate-500 mt-0.5">{route.description}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {isAdmin && (
                      <div className="flex items-center gap-1 mr-2" onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleOpenStationForm(route._id)} className="px-3 py-1.5 bg-brand-green/10 text-brand-green-dark hover:bg-brand-green hover:text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border-0">
                          <Plus size={14} /> Add Station
                        </button>
                        <button onClick={() => handleOpenRouteForm(route)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-brand-green rounded shadow-sm cursor-pointer" title="Edit Route">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleToggleRouteStatus(route)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-amber-500 rounded shadow-sm cursor-pointer" title={route.isActive ? "Pause Route" : "Resume Route"}>
                          {route.isActive ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                        </button>
                        {routeStations.length === 0 && (
                          <button onClick={() => setDeleteRouteModal(route._id)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 rounded shadow-sm cursor-pointer" title="Delete Route">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                    <button 
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition cursor-pointer flex items-center justify-center"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-0 overflow-x-auto bg-slate-50/30">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="px-6 py-3">Station / Stop Name</th>
                          <th className="px-6 py-3">Monthly Transport Fee</th>
                          {isAdmin && <th className="px-6 py-3 text-right">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[13px] bg-white">
                        {routeStations.map((station, idx) => (
                          <tr 
                            key={station._id} 
                            className={`hover:bg-slate-50/50 group ${isAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`}
                            draggable={isAdmin}
                            onDragStart={(e) => isAdmin && handleDragStart(e, station._id, route._id, idx)}
                            onDragOver={(e) => isAdmin && handleDragOver(e, route._id)}
                            onDrop={(e) => isAdmin && handleDrop(e, station._id, route._id, idx)}
                            onDragEnd={() => setDraggedStation(null)}
                          >
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                {isAdmin && (
                                  <div className="text-slate-300 group-hover:text-slate-400 cursor-grab px-1 -ml-2">
                                    <svg width="12" height="20" viewBox="0 0 12 20" fill="currentColor">
                                      <circle cx="4" cy="4" r="1.5" />
                                      <circle cx="4" cy="10" r="1.5" />
                                      <circle cx="4" cy="16" r="1.5" />
                                      <circle cx="8" cy="4" r="1.5" />
                                      <circle cx="8" cy="10" r="1.5" />
                                      <circle cx="8" cy="16" r="1.5" />
                                    </svg>
                                  </div>
                                )}
                                <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center text-[10px] font-semibold text-brand-green-dark shrink-0">
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
                                  <button onClick={() => handleOpenStationForm(route._id, station)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-brand-green rounded shadow-sm cursor-pointer" title="Edit Station">
                                    <Edit2 size={14} />
                                  </button>
                                  <button onClick={() => setDeleteStationModal(station._id)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 rounded shadow-sm cursor-pointer" title="Delete Station">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                        {routeStations.length === 0 && (
                          <tr>
                            <td colSpan={isAdmin ? 3 : 2} className="py-8 text-center text-slate-400 italic text-xs">
                              No stations found in this route. Add one to get started.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* --- Route Form Modal --- */}
      {routeFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Bus size={18} className="text-brand-green" />
                {routeFormOpen.isEdit ? "Edit Route" : "Add New Route"}
              </h3>
              <button onClick={() => setRouteFormOpen(null)} className="text-slate-400 hover:text-slate-600 border-0 bg-transparent cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveRoute} className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-2 rounded-lg flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Route Name *</label>
                  <input type="text" required value={routeFormData.routeName} onChange={(e) => setRouteFormData({...routeFormData, routeName: e.target.value})} className={inputCls} placeholder="E.g., Route 1" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
                  <input type="text" value={routeFormData.description} onChange={(e) => setRouteFormData({...routeFormData, description: e.target.value})} className={inputCls} placeholder="E.g., Morning Route A" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setRouteFormOpen(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition border-0 bg-transparent cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitLoading} className="px-4 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed border-0 cursor-pointer">
                  {submitLoading && <Loader2 className="animate-spin" size={14} />}
                  {routeFormOpen.isEdit ? "Update Route" : "Save Route"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Station Form Modal --- */}
      {stationFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={18} className="text-brand-green" />
                {stationFormOpen.isEdit ? "Edit Station" : "Add Station"}
              </h3>
              <button onClick={() => setStationFormOpen(null)} className="text-slate-400 hover:text-slate-600 border-0 bg-transparent cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveStation} className="p-6">
              {error && (
                <div className="mb-4 bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-2 rounded-lg flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Route</label>
                  <select required value={stationFormData.routeId} onChange={(e) => setStationFormData({...stationFormData, routeId: e.target.value})} className={inputCls}>
                    <option value="" disabled>Select Route</option>
                    {routes.map(r => (
                      <option key={r._id} value={r._id}>{r.routeName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Station Name *</label>
                  <input type="text" required value={stationFormData.name} onChange={(e) => setStationFormData({...stationFormData, name: e.target.value})} className={inputCls} placeholder="E.g., Main Bus Stand" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Monthly Fee (₹) *</label>
                  <input type="number" required min="0" value={stationFormData.fee} onChange={(e) => setStationFormData({...stationFormData, fee: e.target.value === '' ? '' : Number(e.target.value)})} className={inputCls} placeholder="E.g., 1000" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setStationFormOpen(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition border-0 bg-transparent cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitLoading} className="px-4 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed border-0 cursor-pointer">
                  {submitLoading && <Loader2 className="animate-spin" size={14} />}
                  {stationFormOpen.isEdit ? "Update Station" : "Save Station"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Custom Confirm Modal for Station Deletion --- */}
      {deleteStationModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Delete Station?</h3>
            <p className="text-xs text-slate-500 mb-6">Are you sure you want to delete this station? This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button onClick={() => setDeleteStationModal(null)} className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition border-0 cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDeleteStation} className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition border-0 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- Custom Confirm Modal for Route Deletion --- */}
      {deleteRouteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2">Delete Route?</h3>
            <p className="text-xs text-slate-500 mb-6">Are you sure you want to delete this route? This action cannot be undone.</p>
            
            <div className="flex gap-3">
              <button onClick={() => setDeleteRouteModal(null)} className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition border-0 cursor-pointer">
                Cancel
              </button>
              <button onClick={handleDeleteRoute} className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition border-0 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
