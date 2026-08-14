"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PrimaryAdmissionData {
  courseDetails: {
    selectedClass: string;
    
  };
  studentDetails: {
    photoFile: File | null;
    photoPreview: string | null;
    studentName: string;
    sex: string;
    dateOfBirthFigures: string;
    dateOfBirthWords: string;
    motherTongue: string;
    religion: string;
    socialCategory: string;
    aadhaarNumber: string;
  };
  familyDetails: {
    fatherName: string;
    fatherMobile: string;
    fatherOccupation: string;
    motherName: string;
    motherMobile: string;
    guardianName: string;
    guardianMobile: string;
    guardianOccupation: string;
    annualIncome: string;
  };
  academicDetails: {
    prevSchoolName: string;
    prevSchoolMedium: string;
  };
  activityDetails: {
    hobbies: string;
    interestInGames: string;
  };
  contactDetails: {
    presentAddress: string;
    permanentAddress: string;
    telephoneNo: string;
  };
  additionalDetails: {
    acceptedDeclaration: boolean;
  };
  transportDetails: {
    requiresTransport: boolean;
    selectedStation: string;
  };
  meta: {
    showErrors: boolean;
  };
}

const defaultData: PrimaryAdmissionData = {
  courseDetails: {
    selectedClass: "",
    
  },
  studentDetails: {
    photoFile: null,
    photoPreview: null,
    studentName: "",
    sex: "",
    dateOfBirthFigures: "",
    dateOfBirthWords: "",
    motherTongue: "",
    religion: "",
    socialCategory: "Gen",
    aadhaarNumber: "",
  },
  familyDetails: {
    fatherName: "",
    fatherMobile: "",
    fatherOccupation: "",
    motherName: "",
    motherMobile: "",
    guardianName: "",
    guardianMobile: "",
    guardianOccupation: "",
    annualIncome: "",
  },
  academicDetails: {
    prevSchoolName: "",
    prevSchoolMedium: "",
  },
  activityDetails: {
    hobbies: "",
    interestInGames: "",
  },
  contactDetails: {
    presentAddress: "",
    permanentAddress: "",
    telephoneNo: "",
  },
  additionalDetails: {
    acceptedDeclaration: false,
  },
  transportDetails: {
    requiresTransport: false,
    selectedStation: "",
  },
  meta: {
    showErrors: false,
  },
};

interface PrimaryAdmissionContextType {
  data: PrimaryAdmissionData;
  updateData: (newData: Partial<PrimaryAdmissionData>) => void;
  resetData: () => void;
}

export const PrimaryAdmissionContext = createContext<PrimaryAdmissionContextType | undefined>(undefined);

export function PrimaryAdmissionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PrimaryAdmissionData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("primaryAdmissionData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Handle migration from flat structure
        if (parsed.studentName !== undefined && !parsed.studentDetails) {
          localStorage.removeItem("primaryAdmissionData");
          return;
        }
        setData({ ...defaultData, ...parsed });
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("primaryAdmissionData", JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateData = (newData: Partial<PrimaryAdmissionData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem("primaryAdmissionData");
  };

  if (!isLoaded) return null;

  return (
    <PrimaryAdmissionContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </PrimaryAdmissionContext.Provider>
  );
}

export function usePrimaryAdmissionContext() {
  const context = useContext(PrimaryAdmissionContext);
  if (context === undefined) {
    throw new Error("usePrimaryAdmissionContext must be used within a PrimaryAdmissionProvider");
  }
  return context;
}
