const fs = require('fs');
const path = require('path');

const file = 'app/admissions/primary-secondary/components/PrimaryPrintableForm.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Color & alignment
content = content.replace(/font-bold border-b border-dotted border-black flex-1 uppercase pb-1 text-center/g, 'font-bold border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left');
content = content.replace(/font-bold border-b border-dotted border-black flex-1 uppercase pb-1"/g, 'font-bold border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left"');
content = content.replace(/inline-block w-64 border-b border-dotted border-black font-bold uppercase text-center/g, 'inline-block w-64 border-b border-dotted border-black font-bold uppercase text-blue-700 px-2 text-left');

// Declaration Parent Name
content = content.replace(/const { data } = usePrimaryAdmissionContext\(\);/, `const { data } = usePrimaryAdmissionContext();\n  const parentName = data.fatherName || data.motherName || data.guardianName;`);
content = content.replace(/\{data\.guardianName\}/g, '{parentName}');

fs.writeFileSync(file, content, 'utf-8');
