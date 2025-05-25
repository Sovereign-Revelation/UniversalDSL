// compiler/compileSchemas.js
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

const schemaPath = path.join(__dirname, '..', 'schema', 'ultimate.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const valid = ajv.validateSchema(schema);

if (valid) {
  console.log('✅ universal schema is valid.');
} else {
  console.error('❌ Schema validation failed:', ajv.errors);
  process.exit(1);
}