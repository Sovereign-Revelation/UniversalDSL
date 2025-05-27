const { executeJsonFlow } = require('../src/utils/jsonflow-executor');
const tmp = require('tmp');
const fs = require('fs');

exports.runFlow = (req, res) => {
  const flowJSON = req.body;

  const tmpFile = tmp.fileSync({ postfix: '.jsonflow' });
  fs.writeFileSync(tmpFile.name, JSON.stringify(flowJSON, null, 2));

  let output = '';
  const originalLog = console.log;

  // Override console.log to capture execution output
  console.log = (msg) => {
    if (typeof msg === 'object') {
      output += JSON.stringify(msg, null, 2) + '\n';
    } else {
      output += msg + '\n';
    }
  };

  try {
    executeJsonFlow(tmpFile.name); // Execute flow
    res.status(200).send(output || '✅ Flow executed with no output.');
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } finally {
    console.log = originalLog; // Restore logging
    tmpFile.removeCallback(); // Clean up tmp file
  }
};
