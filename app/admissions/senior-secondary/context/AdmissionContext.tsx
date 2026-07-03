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
  courseDetails: {
    selectedClass: string;
    selectedStream: string;
    isProvisional: boolean;
    
    selectedSubjects: string[];
  };
  studentDetails: {
    photoFile: File | null;
    photoPreview: string | null;
    studentNameEnglish: string;
    studentNameHindi: string;
    dateOfBirth: string;
    gender: string;
    aadhaarNumber: string;
    panNumber: string;
    socialCategory: string;
    bplStatus: string;
  };
  familyDetails: {
    fatherName: string;
    fatherMobile: string;
    fatherOccupation: string;
    motherName: string;
    motherMobile: string;
    guardianName: string;
    guardianMobile: string;
    annualIncome: string;
  };
  addressDetails: {
    village: string;
    postOffice: string;
    tehsil: string;
    district: string;
    stateName: string;
    pinCode: string;
  };
  bankDetails: {
    bankAccountNo: string;
    bankName: string;
    bankBranchName: string;
    ifscCode: string;
  };
  academicRecords: ExamRecord[];
  documents: {
    slc: boolean;
    marksheet: boolean;
    character: boolean;
    category: boolean;
  };
  additionalDetails: {
    extracurricular: string;
    acceptedTerms: boolean;
  };
  meta: {
    showErrors: boolean;
  };
}

const defaultData: AdmissionData = {
  courseDetails: {
    selectedClass: "Class 11",
    selectedStream: "Science",
    isProvisional: false,
    
    selectedSubjects: ["English (Core)", "Physics", "Chemistry"],
  },
  studentDetails: {
    photoFile: null,
    photoPreview: null,
    studentNameEnglish: "",
    studentNameHindi: "",
    dateOfBirth: "",
    gender: "",
    aadhaarNumber: "",
    panNumber: "",
    socialCategory: "General",
    bplStatus: "No",
  },
  familyDetails: {
    fatherName: "",
    fatherMobile: "",
    fatherOccupation: "",
    motherName: "",
    motherMobile: "",
    guardianName: "",
    guardianMobile: "",
    annualIncome: "",
  },
  addressDetails: {
    village: "",
    postOffice: "",
    tehsil: "",
    district: "",
    stateName: "Himachal Pradesh",
    pinCode: "",
  },
  bankDetails: {
    bankAccountNo: "",
    bankName: "",
    bankBranchName: "",
    ifscCode: "",
  },
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
  additionalDetails: {
    extracurricular: "",
    acceptedTerms: false,
  },
  meta: {
    showErrors: false,
  }
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
        if (parsed.courseDetails?.selectedSubjects) {
          parsed.courseDetails.selectedSubjects = parsed.courseDetails.selectedSubjects.map((s: string) => s === "English" ? "English (Core)" : s);
        }
        
        // Handle migration from old flat format if necessary
        if (!parsed.studentDetails && parsed.studentNameEnglish) {
          // In case the user has old localstorage, clear it and use default to prevent crashes
          localStorage.removeItem("seniorSecondaryAdmissionData");
          return;
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
