const fs = require('fs');

const files = [
  './app/admissions/senior-secondary/context/AdmissionContext.tsx',
  './app/admissions/primary-secondary/context/PrimaryAdmissionContext.tsx'
];

files.forEach(path => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');

  // Remove photoPreview from courseDetails interface
  content = content.replace(/photoPreview:\s*string\s*\|\s*null;/g, '');
  content = content.replace(/photoPreview:\s*string;/g, '');

  // Add photoFile and photoPreview to studentDetails interface
  // Wait, in PrimaryAdmissionContext it's 'studentDetails: {'
  content = content.replace(/(studentDetails:\s*\{)/, '$1\n    photoFile: File | null;\n    photoPreview: string | null;');

  // Remove from defaultData courseDetails
  content = content.replace(/photoPreview:\s*null,/g, '');
  content = content.replace(/photoPreview:\s*"",/g, '');

  // Add to defaultData studentDetails
  // we use global replace just in case, but there is only one defaultData declaration.
  // We need to replace the FIRST occurrence of studentDetails: { in the object literal.
  // A regex might match the interface again if not careful.
  content = content.replace(/(studentDetails:\s*\{\s*studentName)/g, 'studentDetails: {\n    photoFile: null,\n    photoPreview: null,\n    studentName');
  // Wait, for senior-secondary it's studentNameEnglish
  content = content.replace(/(studentDetails:\s*\{\s*studentNameEnglish)/g, 'studentDetails: {\n    photoFile: null,\n    photoPreview: null,\n    studentNameEnglish');

  fs.writeFileSync(path, content);
  console.log('Updated ' + path);
});
