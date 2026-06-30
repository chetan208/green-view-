import React from "react";

export default function PrintableForm() {
  return (
    <div id="printable-form" className="hidden print:block w-full bg-white text-black text-[12px] font-serif leading-tight">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 15mm; }
          body * { visibility: hidden; }
          #printable-form, #printable-form * { visibility: visible; }
          #printable-form { position: absolute; left: 0; top: 0; width: 100%; }
          .dotted-line { border-bottom: 1px dashed black; display: inline-block; min-width: 50px; }
        }
      `}} />
      
      {/* Page 1 */}
      <div className="w-full relative mb-10" style={{ pageBreakAfter: 'always' }}>
        <div className="absolute right-0 top-0 text-[10px]">
          Roll . No. Allowed.......................
        </div>
        
        <div className="text-center font-bold mb-4 pt-4">
          <h1 className="text-lg uppercase">Green View Senior Secondary School Dadh</h1>
          <h2 className="text-sm">Admission Form -20........ - 20..........</h2>
          <h3 className="text-xs">Provisional /regular</h3>
        </div>

        {/* Photo Box */}
        <div className="absolute right-0 top-12 w-28 h-36 border border-black flex items-center justify-center text-xs text-slate-400">
          Photo
        </div>

        <div className="flex flex-col gap-3 max-w-[80%] mb-4">
          <div className="flex items-center gap-2">
            <span>Provisional</span><span className="dotted-line flex-1"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Date</span><span className="dotted-line flex-1"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Sign</span><span className="dotted-line flex-1"></span>
          </div>
        </div>

        {/* Checkboxes Row */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span>Class +1</span><div className="w-4 h-4 border border-black flex items-center justify-center">✓</div>
          </div>
          <div className="flex items-center gap-2">
            <span>+2</span><div className="w-4 h-4 border border-black"></div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span>Stream -Science</span><div className="w-4 h-4 border border-black flex items-center justify-center">✓</div>
          </div>
          <div className="flex items-center gap-2">
            <span>Comm.</span><div className="w-4 h-4 border border-black"></div>
          </div>
          <div className="flex items-center gap-2">
            <span>Arts</span><div className="w-4 h-4 border border-black"></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span>Subject English</span>
          <span>2. <span className="dotted-line w-24 border-b-black border-dashed">Physics</span></span>
          <span>3. <span className="dotted-line w-24 border-b-black border-dashed">Chemistry</span></span>
          <span>4. <span className="dotted-line w-24 border-b-black border-dashed">Maths</span></span>
          <span>5. <span className="dotted-line w-24 border-b-black border-dashed">CS</span></span>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span>Name (in English)</span><span className="dotted-line flex-1">ANONYMOUS USER</span>
            <span>(in capital letters)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-24">Father's Name</span><span className="dotted-line flex-1">Father Name</span>
            <span>Mob. No</span><span className="dotted-line w-32">9876543210</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-24">Mother's Name</span><span className="dotted-line flex-1">Mother Name</span>
            <span>Mob. No</span><span className="dotted-line w-32"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Guardian's Name (if applicable):</span><span className="dotted-line flex-1"></span>
            <span>Mob .No</span><span className="dotted-line w-32"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Date of Birth(in figure)</span><span className="dotted-line w-32">11 / 05 / 2006</span>
            <span>(in Words)</span><span className="dotted-line flex-1"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Aadhaar No. of the student</span><span className="dotted-line flex-1">123456789123</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Category(tick) General/SC/ST/OBC</span>
            <span className="font-bold underline">OBC</span>
            <span>(Attach certificate)</span>
            <span className="ml-8">IRDP Yes/No</span>
            <span className="dotted-line w-16">No</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Father's/ Guardian's occupation</span><span className="dotted-line flex-1"></span>
            <span>Annual income:</span><span className="dotted-line w-32">1200000</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>PAN No. of student</span><span className="dotted-line flex-1">ABCDE1234F</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Bank Account No.</span><span className="dotted-line flex-1">51561561</span>
            <span>Bank and Branch</span><span className="dotted-line flex-1">SBI</span>
            <span>IFSC</span><span className="dotted-line w-32">SBIN0001234</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Permanent Address__ Village</span><span className="dotted-line flex-1">123 Street Name</span>
            <span>P.O</span><span className="dotted-line w-32"></span>
            <span>Tehsil</span><span className="dotted-line w-32"></span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Distt:-</span><span className="dotted-line flex-1">Solan</span>
            <span>State</span><span className="dotted-line flex-1">Himachal Pradesh</span>
            <span>PIN</span><span className="dotted-line w-32">173205</span>
          </div>
        </div>

        <h3 className="font-bold mb-2 text-sm">Academic Record</h3>
        <table className="w-full border-collapse border border-black mb-6 text-center text-[10px]">
          <thead>
            <tr>
              <th className="border border-black p-1">Name of Exam</th>
              <th className="border border-black p-1">Year</th>
              <th className="border border-black p-1">Institution</th>
              <th className="border border-black p-1">Board</th>
              <th className="border border-black p-1">Roll No</th>
              <th className="border border-black p-1">Result Pass/Fail</th>
              <th className="border border-black p-1">Subjects</th>
              <th className="border border-black p-1">Max Marks</th>
              <th className="border border-black p-1">Marks Obtained</th>
              <th className="border border-black p-1">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-8">
              <td className="border border-black p-1">Matric</td>
              <td className="border border-black p-1">2022</td>
              <td className="border border-black p-1">Some School</td>
              <td className="border border-black p-1">CBSE</td>
              <td className="border border-black p-1">123456</td>
              <td className="border border-black p-1">Pass</td>
              <td className="border border-black p-1">All</td>
              <td className="border border-black p-1">500</td>
              <td className="border border-black p-1">500</td>
              <td className="border border-black p-1">100%</td>
            </tr>
            <tr className="h-8">
              <td className="border border-black p-1">10+1</td>
              <td className="border border-black p-1">2026</td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">CBSE</td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">Pass</td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">500</td>
              <td className="border border-black p-1">500</td>
              <td className="border border-black p-1">100%</td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span>Details of Participation in Sports / other Activities</span>
            <span className="dotted-line flex-1"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Level</span>
            <span className="dotted-line flex-1"></span>
          </div>
        </div>
      </div>

      {/* Page 2 */}
      <div className="w-full relative">
        <h3 className="font-bold text-center mb-2">DECLARATION</h3>
        <p className="mb-4 text-justify">
          I/We hereby declare to abide by all the rules and regulations of the school,(which is a NO-INTOXICATION ZONE). HP Board of school education and other Government intrusions and declare that I will not be involved in any activities that goes against the discipline of the institution .I understand that admission will automatically be cancelled if/ my ward fail to pay necessary dues to remain absent without authorization and if found to be indulged in any in toxicities, drugs related activities or anti social activities disciplinary action will be taken against me/my wards.
        </p>
        <p className="text-center mb-8">
          I solemnly declare that all the facts stated above are correct.
        </p>
        
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center gap-2">
            <span>Date:</span>
            <span className="dotted-line w-32"></span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-8"></span>
            <span>Signature of student</span>
          </div>
        </div>
        
        <div className="flex justify-end mb-8">
          <div className="flex flex-col items-center">
            <span className="mb-8"></span>
            <span>Signature of parent/Guardians</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-1">Recommendation by admission committee</p>
          <p className="mb-4">Certified that above particulars have been verified and the student is recommended for admission.</p>
          
          <div className="flex justify-between mb-2">
            <span>(1)Signature........................</span>
            <span>(2)Signature........................</span>
            <span>(3)Signature........................</span>
          </div>
          <div className="flex justify-between mb-6 px-4">
            <span>Name</span>
            <span>Name</span>
            <span>Name</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span>Roll No. Issued</span><span className="dotted-line w-24"></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Fee collected</span><span className="dotted-line w-24"></span>
            </div>
            <div className="flex items-center gap-2">
              <span>Receipt Number</span><span className="dotted-line w-24"></span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex flex-col items-center">
            <span className="mb-8"></span>
            <span>Signature of the office clerk</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span>Date of Provisional admission</span><span className="dotted-line w-48 border-dashed"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Date of final admission</span><span className="dotted-line w-48 border-dashed"></span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="font-bold underline mb-1">Note: Attach following documents(attached photocopies)</p>
            <ol className="list-decimal pl-4">
              <li>School Leaving Certificate</li>
              <li>Metric Certificate/Result of Pervious Class</li>
              <li>Character certificate</li>
              <li>Category certificate (if applicable)</li>
              <li>Aadhaar Card copy</li>
              <li>Bank Passbook copy</li>
            </ol>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold mb-8">Principal</span>
            <span>Stamp/Signature</span>
          </div>
        </div>

        <div className="border border-black p-4">
          <h3 className="font-bold text-center underline mb-2">SUBJECT COMBINATION</h3>
          <div className="text-[11px] flex flex-col gap-2">
            <div>
              <span className="font-bold">SCIENCE STREAM:{'>'}</span>
              <br/>Compulsory Subjects: 1.English 2. Physics 3.Chemistry 4.Math/Biology
              <br/>Optional Subjects:- Computer science/Physical education/Healthcare/Telecom.
            </div>
            <div>
              <span className="font-bold">COMMERCE STREAM:-</span>
              <br/>Compulsory subjects :-English 2. Accountancy 3. Business studies 4.Economics
              <br/>Optional Subjects:-Computer science/physical education/Healthcare/Telecom.
            </div>
            <div>
              <span className="font-bold">ARTS STREAM :{'>'}</span>
              <br/>Compulsory subjects :- 1.English 2.Math/History 3.Economics /Hindi 4. Political science/Geography
              <br/>Optional Subjects :-Computer Science /Physical education /Healthcare /Telecom.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
