const fs = require('fs');
const file = 'app/admissions/senior-secondary/components/PrintableForm.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Change leading
content = content.replace(/leading-none/g, 'leading-normal');

// Increase margins
content = content.replace(/mb-2/g, 'mb-4');
content = content.replace(/mb-3/g, 'mb-6');
content = content.replace(/h-6/g, 'h-8'); // table row height

fs.writeFileSync(file, content, 'utf-8');
