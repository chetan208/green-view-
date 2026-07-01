const fs = require('fs');
const file = 'app/admissions/primary-secondary/components/PrimaryPrintableForm.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace all font-bold filled values with font-semibold text-[13px]
content = content.replace(/font-bold border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left/g, 'font-semibold text-[13px] border-b border-dotted border-black flex-1 uppercase pb-1 text-blue-700 px-2 text-left');

fs.writeFileSync(file, content, 'utf-8');
