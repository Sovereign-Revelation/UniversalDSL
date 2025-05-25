// compiler/generateFrontendComponents.js
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'schema', 'ultimate.schema.json');
const outDir = path.join(__dirname, '..', 'frontend', 'components', 'generated');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const { properties } = schema;

for (const field in properties) {
  const componentName = `${field.charAt(0).toUpperCase() + field.slice(1)}Input`;
  const content = `// Auto-generated input for ${field}
import React from 'react';

export default function ${componentName}() {
  return (
    <div>
      <label>${field}</label>
      <input name="${field}" />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(outDir, `${componentName}.jsx`), content);
  console.log(`✅ Component generated: ${componentName}.jsx`);
}