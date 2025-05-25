const { executeJsonFlow } = require('../src/utils/jsonflow-executor');
const tmp = require('tmp');
const fs = require('fs');

exports.runFlow = (req, res) => {
  const flowJSON = req.body;
  const tmpFile = tmp.fileSync({ postfix: '.jsonflow' });
  fs.writeFileSync(tmpFile.name, JSON.stringify(flowJSON, null, 2));

  const originalLog = console.log;
  let output = "";
  console.log = (msg) => output += msg + '\n';

  try {
    require('../src/utils/jsonflow-executor').executeJsonFlow(tmpFile.name);
    res.send(output);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    console.log = originalLog;
  }
};