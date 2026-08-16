"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PrimaryPrintableForm from "../../../admissions/primary-secondary/components/PrimaryPrintableForm";
import SeniorPrintableForm from "../../../admissions/senior-secondary/components/PrintableForm";
import { PrimaryAdmissionContext } from "../../../admissions/primary-secondary/context/PrimaryAdmissionContext";
import { AdmissionContext as SeniorAdmissionContext } from "../../../admissions/senior-secondary/context/AdmissionContext";

// This is a minimal layout specifically designed for the headless browser to render a clean PDF
export default function ApplicationPdfViewer() {
  const params = useParams();
  const id = params?.id;
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Fetch the raw document from backend API
    const fetchApp = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admissions/public/${id}`);
        const data = await res.json();
        if (data.success) {
          setAppData(data.application);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  if (loading) return <div className="p-10 font-sans text-sm">Loading application document...</div>;
  if (!appData) return <div className="p-10 font-sans text-sm text-red-500">Application not found</div>;

  const isPrimary = appData.applicationType === "primary";

  if (isPrimary) {
    // Map backend data to Context data format so PrimaryPrintableForm can read it
    const mockContextValue = {
      data: {
        studentDetails: {
          photoUrl: appData.photoUrl,
          studentName: appData.studentName,
          sex: appData.sex,
          dateOfBirthFigures: appData.dateOfBirth,
          dateOfBirthWords: "", 
          motherTongue: appData.motherTongue,
          religion: appData.religion,
          socialCategory: appData.socialCategory,
          aadhaarNumber: appData.aadhaarNumber,
        },
        familyDetails: {
          fatherName: appData.fatherName,
          motherName: appData.motherName,
          fatherMobile: appData.fatherMobile,
          motherMobile: appData.motherMobile,
          guardianName: appData.guardianName,
          guardianMobile: appData.guardianMobile,
          fatherOccupation: appData.fatherOccupation,
          annualIncome: appData.annualIncome,
        },
        contactDetails: {
          presentAddress: appData.address,
          permanentAddress: appData.address,
        },
        courseDetails: {
          selectedClass: appData.appliedClass,
        },
        academicDetails: {
          prevSchoolName: appData.prevSchoolName,
          prevSchoolMedium: appData.prevSchoolMedium,
        },
        transportDetails: {
          requiresTransport: appData.requiresTransport,
          selectedStation: appData.station,
        },
        meta: { showErrors: false }
      },
      updateData: () => {}
    };

    return (
      <PrimaryAdmissionContext.Provider value={mockContextValue as any}>
        <div className="bg-white text-black p-4 min-h-screen">
          <PrimaryPrintableForm />
        </div>
      </PrimaryAdmissionContext.Provider>
    );
  } else {
    // Map backend data to Context data format so SeniorPrintableForm can read it
    const mockContextValue = {
      data: {
        studentDetails: {
          photoUrl: appData.photoUrl,
          studentName: appData.studentName,
          studentNameHindi: appData.studentNameHindi,
          sex: appData.sex,
          dateOfBirthFigures: appData.dateOfBirth,
          religion: appData.religion,
          socialCategory: appData.socialCategory,
          aadhaarNumber: appData.aadhaarNumber,
          panNumber: appData.panNumber,
          bplStatus: appData.bplStatus,
        },
        familyDetails: {
          fatherName: appData.fatherName,
          fatherMobile: appData.fatherMobile,
          fatherOccupation: appData.fatherOccupation,
          motherName: appData.motherName,
          motherMobile: appData.motherMobile,
          annualIncome: appData.annualIncome,
        },
        addressDetails: {
          village: appData.village,
          postOffice: appData.postOffice,
          tehsil: appData.tehsil,
          district: appData.district,
          state: appData.state,
          pinCode: appData.pinCode,
        },
        courseDetails: {
          selectedClass: appData.appliedClass,
          stream: appData.stream,
          isProvisional: appData.isProvisional,
          selectedSubjects: appData.selectedSubjects || [],
        },
        academicDetails: {
          previousExams: appData.previousExams || [],
        },
        bankDetails: {
          bankAccountNo: appData.bankAccountNo,
          bankName: appData.bankName,
          bankBranch: appData.bankBranch,
          ifscCode: appData.ifscCode,
        },
        transportDetails: {
          requiresTransport: appData.requiresTransport,
          selectedStation: appData.station,
        },
        activityDetails: {
          hobbies: appData.hobbies,
          interestInGames: appData.interestInGames,
          extracurricular: appData.extracurricular,
        },
        meta: { showErrors: false }
      },
      updateData: () => {}
    };

    return (
      <SeniorAdmissionContext.Provider value={mockContextValue as any}>
        <div className="bg-white text-black p-4 min-h-screen">
          <SeniorPrintableForm />
        </div>
      </SeniorAdmissionContext.Provider>
    );
  }
}
