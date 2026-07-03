const fs = require('fs');

const files = [
  './app/admissions/primary-secondary/page.tsx',
  './app/admissions/primary-secondary/steps/Step1BasicInfo.tsx',
  './app/admissions/primary-secondary/steps/Step2PersonalFamily.tsx',
  './app/admissions/primary-secondary/steps/Step3AcademicActivities.tsx',
  './app/admissions/primary-secondary/steps/Step4Contact.tsx',
  './app/admissions/primary-secondary/steps/Step5Review.tsx',
  './app/admissions/primary-secondary/components/PrimaryPrintableForm.tsx'
];

const schema = [
  { name: 'courseDetails', fields: ['selectedClass', 'photoPreview'] },
  { name: 'studentDetails', fields: ['studentName', 'sex', 'dateOfBirthFigures', 'dateOfBirthWords', 'motherTongue', 'religion', 'socialCategory'] },
  { name: 'familyDetails', fields: ['fatherName', 'motherName', 'guardianName', 'guardianOccupation'] },
  { name: 'academicDetails', fields: ['prevSchoolName', 'prevSchoolMedium'] },
  { name: 'activityDetails', fields: ['hobbies', 'interestInGames'] },
  { name: 'contactDetails', fields: ['presentAddress', 'permanentAddress', 'telephoneNo'] },
  { name: 'additionalDetails', fields: ['acceptedDeclaration'] },
  { name: 'meta', fields: ['showErrors'] }
];

files.forEach(path => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');

  // Handle meta.showErrors explicitly
  content = content.replace(/const\s+\{\s*showErrors\s*\}\s*=\s*data;/g, 'const showErrors = data.meta.showErrors;');
  content = content.replace(/data\.showErrors/g, 'data.meta.showErrors');
  content = content.replace(/updateData\(\{\s*showErrors:\s*(true|false)\s*\}\)/g, 'updateData({ meta: { ...data.meta, showErrors: $1 } })');

  schema.forEach(({ name, fields }) => {
    fields.forEach(field => {
      if (name === 'meta') return;
      
      const getterRegex = new RegExp(`data\\.${field}(?![a-zA-Z0-9_])`, 'g');
      content = content.replace(getterRegex, `data.${name}.${field}`);

      const setterRegex = new RegExp(`updateData\\(\\{\\s*${field}\\s*:\\s*(.*?)\\s*\\}\\)`, 'g');
      content = content.replace(setterRegex, `updateData({ ${name}: { ...data.${name}, ${field}: $1 } })`);
    });
  });

  fs.writeFileSync(path, content);
  console.log('Updated ' + path);
});
