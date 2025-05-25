const fs = require('fs');

function executeJsonFlow(flowPath) {
  const flow = JSON.parse(fs.readFileSync(flowPath, 'utf-8'));
  console.log(`🧠 Running Flow: ${flowPath}\n`);

  flow.steps.forEach((step, i) => {
    const label = `Step ${i + 1}: ${step.name}`;
    console.log(`▶️ ${label}`);

    if (step.log) console.log(`📝 ${step.log}`);
    if (step.exec) {
      try {
        const result = eval(step.exec); // for now, sandbox later
        console.log(`💡 Output: ${result}`);
      } catch (err) {
        console.error(`❌ Exec error: ${err.message}`);
      }
    }

    console.log('');
  });

  console.log(`✅ Flow Complete`);
}

module.exports = { executeJsonFlow };