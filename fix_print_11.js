const fs = require('fs');
const file = 'app/admissions/senior-secondary/components/PrintableForm.tsx';
let content = fs.readFileSync(file, 'utf-8');

// The base classes to replace
content = content.replace(/text-blue-600 font-bold text-center/g, 'text-blue-700 font-semibold text-[11px] text-left px-2');
content = content.replace(/font-bold underline text-blue-600 uppercase/g, 'font-semibold underline text-blue-700 uppercase text-[11px] px-2 text-left');
content = content.replace(/text-blue-600 font-bold/g, 'text-blue-700 font-semibold text-[10px]');

fs.writeFileSync(file, content, 'utf-8');
