// compiler/generateRoutes.js
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'schema', 'ultimate.schema.json');
const outputPath = path.join(__dirname, '..', 'routes', 'generatedRoutes.js');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const { properties } = schema;

let routes = `// Auto-generated routes for universal schema\nconst express = require('express');\nconst router = express.Router();\nconst controller = require('../controllers/ultimateController');\n\n`;

for (const prop in properties) {
  routes += `router.get('/${prop}', controller.get${prop.charAt(0).toUpperCase() + prop.slice(1)});\n`;
}

routes += `\nmodule.exports = router;\n`;

fs.writeFileSync(outputPath, routes);
console.log('✅ Routes generated:', outputPath);