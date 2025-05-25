const fs = require('fs');

function parseJsonFlow(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to parse JSONFlow DSL: ${err.message}`);
  }
}

module.exports = { parseJsonFlow };