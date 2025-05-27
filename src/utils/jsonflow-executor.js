const fs = require('fs');

function executeJsonFlow(flowPath) {
  if (!fs.existsSync(flowPath)) {
    console.error(`❌ Flow file not found: ${flowPath}`);
    return;
  }

  const raw = fs.readFileSync(flowPath, 'utf-8');
  let flow;

  try {
    flow = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Invalid JSON in flow file: ${err.message}`);
    return;
  }

  console.log(`🧠 Running Flow from: ${flowPath}\n`);

  if (!Array.isArray(flow.steps)) {
    console.error(`❌ No 'steps' array in flow`);
    return;
  }

  flow.steps.forEach((step, i) => {
    const label = `Step ${i + 1}: ${step.name || 'Unnamed Step'}`;
    console.log(`▶️ ${label}`);

    if (step.log) console.log(`📝 ${step.log}`);

    if (step.exec) {
      try {
        // ⚠️ 'eval' is dangerous — sandbox or VM should be used in production
        const result = eval(step.exec);
        console.log(`💡 Output: ${result}`);
      } catch (err) {
        console.error(`❌ Exec Error: ${err.message}`);
      }
    }

    console.log('');
  });

  console.log(`✅ Flow Complete\n`);
}

module.exports = { executeJsonFlow };
