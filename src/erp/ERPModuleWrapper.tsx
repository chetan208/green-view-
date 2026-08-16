import React from "react";
import { ChevronRight } from "lucide-react";
import { ModuleType } from "./types";
import DummyModule from "./DummyModule";

import StudentManager from "./modules/StudentManager";
import StaffManager from "./modules/StaffManager";
import FeePortal from "./fee-portal/FeePortal";
import TransportPortal from "./modules/TransportPortal";
import SettingsPortal from "./modules/SettingsPortal";
import AcademicsManager from "./modules/AcademicsManager";
import AdmissionsManager from "@/components/admin/sections/AdmissionsManager";
import ProfileSettings from "./modules/ProfileSettings";
import WhatsAppSettings from "./modules/WhatsAppSettings";
import { useAuth } from "@/hooks/useAuth";

interface ERPModuleWrapperProps {
  activeModule: string;
  currentModule: ModuleType | undefined;
  setActiveModule: (id: string | null) => void;
  selectedSession: string;
  preselectedStudent?: any;
  setPreselectedStudent?: (student: any) => void;
}

export default function ERPModuleWrapper({
  activeModule,
  currentModule,
  setActiveModule,
  selectedSession,
  preselectedStudent,
  setPreselectedStudent
}: ERPModuleWrapperProps) {
  const { user } = useAuth();

  const handleManageFees = (student: any) => {
    if (setPreselectedStudent) setPreselectedStudent(student);
    setActiveModule("fees");
  };

  return (
    <div className="p-5 sm:p-7 mx-auto transition-all duration-300 max-w-6xl">
      {/* Breadcrumb Header */}
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-brand-green-dark">
        <button
          onClick={() => setActiveModule(null)}
          className="text-slate-400 hover:text-brand-green-dark transition cursor-pointer border-0 bg-transparent p-0"
        >
          ERP Overview
        </button>
        <ChevronRight size={12} className="text-slate-400" />
        <span className="text-brand-green">{currentModule?.label}</span>
      </div>

      {activeModule === "staff" ? (
        <StaffManager />
      ) : activeModule === "students" ? (
        <StudentManager selectedSession={selectedSession} onManageFees={handleManageFees} />
      ) : activeModule === "fees" ? (
        <FeePortal selectedSession={selectedSession} preselectedStudent={preselectedStudent} clearPreselected={() => setPreselectedStudent?.(null)} setActiveModule={setActiveModule} />
      ) : activeModule === "transport" ? (
        <TransportPortal />
      ) : activeModule === "settings" ? (
        <SettingsPortal />
      ) : activeModule === "whatsapp" ? (
        <WhatsAppSettings />
      ) : activeModule === "academics" ? (
        <AcademicsManager />
      ) : activeModule === "admissions" ? (
        <AdmissionsManager />
      ) : activeModule === "profile" ? (
        <ProfileSettings user={user} onProfileUpdated={() => window.location.reload()} />
      ) : (
        <DummyModule title={currentModule?.label || "Module"} />
      )}
    </div>
  );
}
