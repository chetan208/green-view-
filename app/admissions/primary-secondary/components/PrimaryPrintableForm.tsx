"use client";

import React from "react";
import { usePrimaryAdmissionContext } from "../context/PrimaryAdmissionContext";

export default function PrimaryPrintableForm() {
  const { data } = usePrimaryAdmissionContext();
  const parentName = data.fatherName || data.motherName || data.guardianName;

  const currentYear = new Date().getFullYear();
  const session = `${currentYear}-${(currentYear + 1).toString().slice(2)}`;
  const currentDate = new Date().toLocaleDateString('en-GB');

  return (
    <div id="primary-printable-form" className="hidden print:block w-full bg-white text-black text-[14px] font-serif leading-tight">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden; }
          #primary-printable-form, #primary-printable-form * { visibility: visible; }
          #primary-printable-form { position: absolute; left: 0; top: 0; width: 100%; padding: 10mm; box-sizing: border-box; }
          .dotted-line { border-bottom: 1px dotted black; display: inline-block; }
          .flex-line { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
        }
      `}} />
      
      <div className="w-full relative">
        <div className="absolute right-0 top-0 text-[12px]">
          Form No. ............
        </div>

        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-normal md:font-semibold uppercase mb-1">Green View Public School</h1>
          <h2 className="text-lg font-normal md:font-semibold">DADH</h2>
          <p className="text-sm">Teh. Palampur, Distt. Kangra (H.P.)</p>
          <p className="text-sm font-sans font-medium tracking-wide">Off.: 01894-252115 M.: 9816521168</p>
        </div>

        <div className="text-center mb-3 md:mb-4">
          <h2 className="text-xl font-normal md:font-semibold uppercase underline">Application for Registration</h2>
          <h3 className="text-lg font-normal md:font-semibold">SESSION {session}</h3>
        </div>

        {/* Photo Box */}
        <div className="absolute right-0 top-32 w-[120px] h-[150px] border border-black flex items-center justify-center text-center text-[10px] p-2 bg-white z-10">
          {data.photoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.photoPreview} alt="Student" className="w-full h-full object-cover" />
          ) : (
            "Paste Passport Size Photograph"
          )}
        </div>

        {/* Form Body */}
        <div className="flex flex-col pr-36">
          <div className="flex-line">
            <span className="w-6">1.</span>
            <span className="w-48">Name of the student<br/><span className="text-[10px]">(In Block Letters)</span></span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.studentName}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">2.</span>
            <span className="w-48">Father's Name</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.fatherName}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">3.</span>
            <span className="w-48">Mother's Name</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.motherName}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">4.</span>
            <span className="w-48">Sex</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.sex}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">5.</span>
            <span className="w-64">Date of Birth (Authentic proof must be attached)</span>
          </div>
          <div className="flex-line pl-8">
            <span className="w-6">a)</span>
            <span className="w-32">in figures</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.dateOfBirthFigures}</span>
          </div>
          <div className="flex-line pl-8">
            <span className="w-6">b)</span>
            <span className="w-32">in words</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.dateOfBirthWords}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">6.</span>
            <span className="w-48">Mother Tongue</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.motherTongue}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">7.</span>
            <span className="w-48">Religion</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.religion}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">8.</span>
            <span className="w-96">Category (Authentic proof must be attached) Gen .... OBC .... SC .... ST ....</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.socialCategory}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">9.</span>
            <span className="w-64">Class to which admission is sought :</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.selectedClass}</span>
          </div>
        </div>

        {/* Section below photo box */}
        <div className="mt-2">
          <div className="flex-line">
            <span className="w-6">10.</span>
            <span className="w-64">Previous school attended</span>
          </div>
          <div className="flex-line pl-8">
            <span className="w-6">(a)</span>
            <span className="w-48">Name of the School</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.prevSchoolName}</span>
          </div>
          <div className="flex-line pl-8">
            <span className="w-6">(b)</span>
            <span className="w-48">Medium of Instruction</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.prevSchoolMedium}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">11.</span>
            <span className="w-48">Hobbies</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.hobbies}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">12.</span>
            <span className="w-48">Interest in games</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.interestInGames}</span>
          </div>

          <div className="flex-line">
            <span className="w-6">13.</span>
            <span className="w-6">(a)</span>
            <span className="w-64">Name of Father/Mother/Guardian :</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{parentName}</span>
          </div>
          <div className="flex-line pl-8">
            <span className="w-6">(b)</span>
            <span className="w-48">Occupation</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.guardianOccupation}</span>
          </div>

          <div className="flex-line mt-3">
            <span className="w-6">14.</span>
            <span className="w-64">Present address with pin code :</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.presentAddress}</span>
          </div>

          <div className="flex-line mt-3">
            <span className="w-6">15.</span>
            <span className="w-64">Permanent Address :</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.permanentAddress}</span>
          </div>

          <div className="flex-line mt-3">
            <span className="w-6">16.</span>
            <span className="w-64">Telephone No. if any :</span>
            <span className="font-normal text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left">{data.telephoneNo}</span>
          </div>
        </div>

        {/* Declaration */}
        <div className="mt-6 text-center">
          <h3 className="font-normal md:font-semibold underline text-lg mb-3">DECLARATION</h3>
          <p className="text-left leading-relaxed">
            I <span className="inline-block w-64 border-b border-dotted border-black font-normal text-[13px] uppercase text-blue-700 px-2 text-left">{parentName}</span> Father/Mother/Guardian of <span className="inline-block w-64 border-b border-dotted border-black font-normal text-[13px] uppercase text-blue-700 px-2 text-left">{data.studentName}</span> Solemnly declare that the above information regarding my son/daughter/ward are true to the best of my knowledge.
          </p>
        </div>

        <div className="mt-8 flex justify-between items-end">
          <div className="flex gap-4 items-center">
            <span>Dated</span>
            <span className="inline-block w-48 border-b border-dotted border-black text-center text-blue-700 font-normal">{currentDate}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="inline-block w-64 border-b border-dotted border-black mb-2"></span>
            <span>Signature of Parent/Guardian</span>
          </div>
        </div>

      </div>
    </div>
  );
}
