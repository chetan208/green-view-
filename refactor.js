const fs = require('fs');

const files = [
  {
    path: './app/admissions/senior-secondary/steps/Step2PersonalDetails.tsx',
    groups: [
      { name: 'studentDetails', fields: ['studentNameEnglish', 'dateOfBirth', 'aadhaarNumber', 'panNumber', 'socialCategory', 'bplStatus'] },
      { name: 'familyDetails', fields: ['fatherName', 'fatherMobile', 'motherName', 'motherMobile', 'guardianName', 'guardianMobile', 'fatherOccupation', 'annualIncome'] }
    ]
  },
  {
    path: './app/admissions/senior-secondary/steps/Step3AddressBank.tsx',
    groups: [
      { name: 'addressDetails', fields: ['village', 'postOffice', 'tehsil', 'district', 'stateName', 'pinCode'] },
      { name: 'bankDetails', fields: ['bankAccountNo', 'bankName', 'bankBranchName', 'ifscCode'] }
    ]
  }
];

files.forEach(({ path, groups }) => {
  let content = fs.readFileSync(path, 'utf8');
  
  // Also replace data.showErrors if it exists
  content = content.replace(/data\.showErrors/g, 'showErrors');

  groups.forEach(({ name, fields }) => {
    fields.forEach(field => {
      // Replace data.field
      const getterRegex = new RegExp(`data\\.${field}(?![a-zA-Z0-9_])`, 'g');
      content = content.replace(getterRegex, `data.${name}.${field}`);
      
      // Replace updateData({ field: val })
      const setterRegex = new RegExp(`updateData\\(\\{\\s*${field}\\s*:\\s*(.*?)\\s*\\}\\)`, 'g');
      content = content.replace(setterRegex, `updateData({ ${name}: { ...data.${name}, ${field}: $1 } })`);
    });
  });

  fs.writeFileSync(path, content);
  console.log('Updated ' + path);
});
