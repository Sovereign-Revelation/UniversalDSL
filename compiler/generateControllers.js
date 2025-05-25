// compiler/generateControllers.js
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'schema', 'ultimate.schema.json');
const outputPath = path.join(__dirname, '..', 'controllers', 'ultimateController.js');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const { title, properties } = schema;

let controller = `// Auto-generated controller for ${title || 'Universal Schema'}\n\nmodule.exports = {\n`;

for (const prop in properties) {
  controller += `  get${prop.charAt(0).toUpperCase() + prop.slice(1)}: (req, res) => {\n`;
  controller += `    res.send('${prop} data from universal schema');\n  },\n`;
}

controller += '};\n';

fs.writeFileSync(outputPath, controller);
console.log('✅ Controller generated:', outputPath);