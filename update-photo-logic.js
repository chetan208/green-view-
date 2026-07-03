const fs = require('fs');
const glob = require('path');

// 1. Update Primary and Senior Secondary `page.tsx`
const pageSenior = './app/admissions/senior-secondary/page.tsx';
let pS = fs.readFileSync(pageSenior, 'utf8');
pS = pS.replace('!data.courseDetails.photoPreview', '!data.studentDetails.photoFile');
fs.writeFileSync(pageSenior, pS);

const pagePrimary = './app/admissions/primary-secondary/page.tsx';
let pP = fs.readFileSync(pagePrimary, 'utf8');
pP = pP.replace('!data.courseDetails.photoPreview', '!data.studentDetails.photoFile');
fs.writeFileSync(pagePrimary, pP);


// 2. Update Printable Forms and Reviews
const filesToChangeProperty = [
  './app/admissions/senior-secondary/components/PrintableForm.tsx',
  './app/admissions/senior-secondary/steps/Step6Review.tsx',
  './app/admissions/primary-secondary/components/PrimaryPrintableForm.tsx',
  './app/admissions/primary-secondary/steps/Step5Review.tsx'
];

filesToChangeProperty.forEach(path => {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/data\.courseDetails\.photoPreview/g, 'data.studentDetails.photoPreview');
  fs.writeFileSync(path, content);
});

// 3. Update Step1StreamSelection.tsx (Senior Secondary)
const step1Senior = './app/admissions/senior-secondary/steps/Step1StreamSelection.tsx';
let s1S = fs.readFileSync(step1Senior, 'utf8');
s1S = s1S.replace('photoPreview, ', ''); // remove from courseDetails destructuring
s1S = s1S.replace('const { showErrors } = data.meta;', 'const { showErrors } = data.meta;\n  const { photoPreview } = data.studentDetails;');

const newHandlerSenior = `
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updateData({ studentDetails: { ...data.studentDetails, photoFile: file, photoPreview: previewUrl } });
    }
  };
`;
s1S = s1S.replace(/const handlePhotoUpload = [\s\S]*?};\n/, newHandlerSenior);
fs.writeFileSync(step1Senior, s1S);

// 4. Update Step1BasicInfo.tsx (Primary Secondary)
const step1Primary = './app/admissions/primary-secondary/steps/Step1BasicInfo.tsx';
let s1P = fs.readFileSync(step1Primary, 'utf8');
s1P = s1P.replace(/data\.courseDetails\.photoPreview/g, 'data.studentDetails.photoPreview');

const newHandlerPrimary = `
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      updateData({ studentDetails: { ...data.studentDetails, photoFile: file, photoPreview: previewUrl } });
    }
  };
`;
s1P = s1P.replace(/const handlePhotoUpload = [\s\S]*?};\n/, newHandlerPrimary);
fs.writeFileSync(step1Primary, s1P);

console.log("Completed updating photo storage.");
