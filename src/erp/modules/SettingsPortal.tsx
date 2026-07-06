'use client';

import React, { useState } from "react";
import { Settings, Save, Shield, Bell, Database } from "lucide-react";

export default function SettingsPortal() {
  const [settings, setSettings] = useState({
    academicYear: "2026-2027",
    smsAlerts: true,
    emailAlerts: true,
    maintenanceMode: false,
    autoBackup: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold font-serif text-slate-900">System Settings</h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Configure global ERP parameters and preferences.</p>
        </div>
        <button className="bg-brand-green hover:bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition shadow-sm border-0 cursor-pointer">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-brand-green-dark">
            <Settings size={20} />
            <h3 className="font-semibold text-lg">General Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Academic Year</label>
              <select 
                value={settings.academicYear}
                onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:border-brand-green"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Maintenance Mode</p>
                <p className="text-xs text-slate-500 mt-0.5">Disable access for non-admin users.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode} onChange={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-brand-green-dark">
            <Bell size={20} />
            <h3 className="font-semibold text-lg">Communications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-semibold text-slate-800 text-sm">SMS Alerts</p>
                <p className="text-xs text-slate-500 mt-0.5">Send fee reminders and notices via SMS.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.smsAlerts} onChange={() => setSettings({...settings, smsAlerts: !settings.smsAlerts})} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="font-semibold text-slate-800 text-sm">Email Alerts</p>
                <p className="text-xs text-slate-500 mt-0.5">Send reports and receipts via Email.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.emailAlerts} onChange={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
