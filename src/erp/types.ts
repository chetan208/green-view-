import {
  GraduationCap,
  Users,
  CreditCard,
  Bus,
  Settings,
  Inbox,
  BookOpen,
  LucideIcon
} from "lucide-react";

export interface ModuleType {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  description: string;
  status: "active" | "coming-soon";
}

export const modules: ModuleType[] = [
  {
    id: "students",
    label: "Student Management",
    icon: GraduationCap,
    color: "#166534", 
    bg: "rgba(22,101,52,0.1)",
    description: "Enroll, track attendance, and manage student records.",
    status: "active",
  },
  {
    id: "fees",
    label: "Fee Management",
    icon: CreditCard,
    color: "#166534",
    bg: "rgba(22,101,52,0.1)",
    description: "Fee collection, receipts, dues, and reports.",
    status: "active",
  },
  {
    id: "transport",
    label: "Transport",
    icon: Bus,
    color: "#166534",
    bg: "rgba(22,101,52,0.1)",
    description: "Station fee rates, route management, and student bus allocation.",
    status: "active",
  },
   {
    id: "staff",
    label: "Staff & HR",
    icon: Users,
    color: "#166534",
    bg: "rgba(22,101,52,0.1)",
    description: "Employee profiles, payroll, leaves, and scheduling.",
    status: "active",
  },
  {
    id: "admissions",
    label: "Admissions",
    icon: Inbox,
    color: "#166534",
    bg: "rgba(22,101,52,0.1)",
    description: "Manage online registration applications.",
    status: "active",
  },
  {
    id: "academics",
    label: "Academics",
    icon: BookOpen,
    color: "#166534",
    bg: "rgba(22,101,52,0.1)",
    description: "Manage classes, sections, and subjects.",
    status: "active",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    color: "#64748B",
    bg: "rgba(100,116,139,0.10)",
    description: "School info, session, academic year, and configurations.",
    status: "active",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: Settings, // Re-use settings icon or import a new one
    color: "#22c55e",
    bg: "rgba(34,197,94,0.10)",
    description: "WhatsApp connection and automation settings.",
    status: "active",
  },
];

export const summaryStats = [
  { label: "Total Students",  value: "—",   color: "#166534", icon: GraduationCap },
  { label: "Teaching Staff",  value: "—",   color: "#166534", icon: Users },
  { label: "Pending Fees",    value: "—",   color: "#166534", icon: CreditCard },
];
