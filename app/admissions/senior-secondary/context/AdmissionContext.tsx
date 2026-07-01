"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface ExamRecord {
  id: number;
  examName: string;
  passingYear: string;
  school: string;
  boardName: string;
  rollNumber: string;
  result: string;
  maxMarks: string;
  marksObtained: string;
  percentage: string;
}

export interface AdmissionData {
  // Step 1
  selectedClass: string;
  selectedStream: string;
  isProvisional: boolean;
  photoPreview: string | null;
  selectedSubjects: string[];

  // Step 2
  studentNameEnglish: string;
  studentNameHindi: string;
  dateOfBirth: string;
  gender: string;
  fatherName: string;
  fatherMobile: string;
  fatherOccupation: string;
  motherName: string;
  motherMobile: string;
  guardianName: string;
  guardianMobile: string;
  annualIncome: string;
  socialCategory: string;
  bplStatus: string;
  aadhaarNumber: string;
  panNumber: string;

  // Step 3
  village: string;
  postOffice: string;
  tehsil: string;
  district: string;
  stateName: string;
  pinCode: string;
  bankAccountNo: string;
  bankName: string;
  bankBranchName: string;
  ifscCode: string;

  // Step 4
  academicRecords: ExamRecord[];

  // Step 5
  documents: {
    slc: boolean;
    marksheet: boolean;
    character: boolean;
    category: boolean;
  };
  extracurricular: string;
  acceptedTerms: boolean;
  
  // Validation
  showErrors: boolean;
}

const defaultData: AdmissionData = {
  selectedClass: "Class 11",
  selectedStream: "Science",
  isProvisional: false,
  photoPreview: null,
  selectedSubjects: ["English (Core)", "Physics", "Chemistry"],
  
  studentNameEnglish: "",
  studentNameHindi: "",
  dateOfBirth: "",
  gender: "",
  fatherName: "",
  fatherMobile: "",
  fatherOccupation: "",
  motherName: "",
  motherMobile: "",
  guardianName: "",
  guardianMobile: "",
  annualIncome: "",
  socialCategory: "General",
  bplStatus: "No",
  aadhaarNumber: "",
  panNumber: "",

  village: "",
  postOffice: "",
  tehsil: "",
  district: "",
  stateName: "Himachal Pradesh",
  pinCode: "",
  bankAccountNo: "",
  bankName: "",
  bankBranchName: "",
  ifscCode: "",

  academicRecords: [
    {
      id: 1,
      examName: "Matric / 10th",
      passingYear: "",
      school: "",
      boardName: "",
      rollNumber: "",
      result: "Pass",
      maxMarks: "",
      marksObtained: "",
      percentage: "",
    },
    {
      id: 2,
      examName: "11th Class",
      passingYear: "",
      school: "",
      boardName: "",
      rollNumber: "",
      result: "Pass",
      maxMarks: "",
      marksObtained: "",
      percentage: "",
    }
  ],

  documents: {
    slc: false,
    marksheet: false,
    character: false,
    category: false,
  },
  extracurricular: "",
  acceptedTerms: false,
  showErrors: false,
};

interface AdmissionContextType {
  data: AdmissionData;
  updateData: (fields: Partial<AdmissionData>) => void;
}

const AdmissionContext = createContext<AdmissionContextType | undefined>(undefined);

export function AdmissionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdmissionData>(defaultData);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("seniorSecondaryAdmissionData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.selectedSubjects) {
          parsed.selectedSubjects = parsed.selectedSubjects.map((s: string) => s === "English" ? "English (Core)" : s);
        }
        setData(parsed);
      } catch (e) {
        console.error("Error parsing local storage data", e);
      }
    }
    setIsHydrated(true);
  }, []);

  const updateData = (fields: Partial<AdmissionData>) => {
    setData((prev) => {
      const newData = { ...prev, ...fields };
      localStorage.setItem("seniorSecondaryAdmissionData", JSON.stringify(newData));
      return newData;
    });
  };

  // Prevent rendering before hydration to avoid hydration mismatch if needed,
  // but since we render generic UI, it's mostly fine. 
  if (!isHydrated) return null;

  return (
    <AdmissionContext.Provider value={{ data, updateData }}>
      {children}
    </AdmissionContext.Provider>
  );
}

export function useAdmissionContext() {
  const context = useContext(AdmissionContext);
  if (context === undefined) {
    throw new Error("useAdmissionContext must be used within an AdmissionProvider");
  }
  return context;
}
