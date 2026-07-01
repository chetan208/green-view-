"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PrimaryAdmissionData {
  // Step 1: Basic Information
  selectedClass: string;
  studentName: string;
  sex: string;
  photoPreview: string;

  // Step 2: Personal & Family Details
  dateOfBirthFigures: string;
  dateOfBirthWords: string;
  motherTongue: string;
  religion: string;
  socialCategory: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianOccupation: string;

  // Step 3: Academic & Activities
  prevSchoolName: string;
  prevSchoolMedium: string;
  hobbies: string;
  interestInGames: string;

  // Step 4: Contact Details
  presentAddress: string;
  permanentAddress: string;
  telephoneNo: string;

  // Step 5: Declaration
  acceptedDeclaration: boolean;

  // Form State
  showErrors: boolean;
}

const defaultData: PrimaryAdmissionData = {
  selectedClass: "",
  studentName: "",
  sex: "",
  photoPreview: "",
  
  dateOfBirthFigures: "",
  dateOfBirthWords: "",
  motherTongue: "",
  religion: "",
  socialCategory: "Gen",
  fatherName: "",
  motherName: "",
  guardianName: "",
  guardianOccupation: "",
  
  prevSchoolName: "",
  prevSchoolMedium: "",
  hobbies: "",
  interestInGames: "",
  
  presentAddress: "",
  permanentAddress: "",
  telephoneNo: "",
  
  acceptedDeclaration: false,
  showErrors: false,
};

interface PrimaryAdmissionContextType {
  data: PrimaryAdmissionData;
  updateData: (newData: Partial<PrimaryAdmissionData>) => void;
  resetData: () => void;
}

const PrimaryAdmissionContext = createContext<PrimaryAdmissionContextType | undefined>(undefined);

export function PrimaryAdmissionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PrimaryAdmissionData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("primaryAdmissionData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData({ ...defaultData, ...parsed, showErrors: false });
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
