const fs = require('fs');
const path = require('path');

const dirs = [
  'app/admissions/senior-secondary/steps',
  'app/admissions/primary-secondary/steps',
  'app/admissions/senior-secondary/components',
  'app/admissions/primary-secondary/components',
];

const replacements = [
  // Container paddings
  { search: /p-5 md:p-8/g, replace: 'p-4 md:p-8' },
  
  // Outer gaps
  { search: /gap-8 md:gap-10/g, replace: 'gap-5 md:gap-10' },
  { search: /gap-8 md:gap-12/g, replace: 'gap-5 md:gap-12' },
  { search: /gap-6 md:gap-8/g, replace: 'gap-4 md:gap-8' },
  
  // Headers and general margins
  { search: /mb-8/g, replace: 'mb-5 md:mb-8' },
  
  // Inputs and buttons padding/sizing
  { search: /px-4 py-3/g, replace: 'px-3 py-2.5 md:px-4 md:py-3' },
  { search: /text-sm font-medium/g, replace: 'text-xs md:text-sm font-medium' },
  
  // Inner gaps
  { search: /gap-6/g, replace: 'gap-4 md:gap-6' },
  { search: /gap-5/g, replace: 'gap-3 md:gap-5' },
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (!file.endsWith('.tsx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    replacements.forEach(r => {
      content = content.replace(r.search, r.replace);
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  });
});
