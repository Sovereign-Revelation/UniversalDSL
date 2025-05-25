import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const exampleFlow = `{
  "steps": [
    { "name": "Hello", "log": "🌍 Hello, Sovereign IDE" },
    { "name": "Compute", "exec": "6 * 7" }
  ]
}`;

export default function IDE() {
  const [code, setCode] = useState(exampleFlow);
  const [output, setOutput] = useState("");

  const runFlow = async () => {
    try {
      const res = await fetch('/api/run-flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: code
      });
      const data = await res.text();
      setOutput(data);
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'monospace' }}>
      <div style={{ flex: 1, padding: 10 }}>
        <h3>📝 Sovereign Flow Editor</h3>
        <MonacoEditor
          height="90%"
          defaultLanguage="json"
          value={code}
          onChange={(val) => setCode(val)}
        />
        <button onClick={runFlow} style={{ marginTop: 10, padding: '10px 20px' }}>
          ▶️ Run Flow
        </button>
      </div>
      <div style={{ flex: 1, background: '#111', color: '#0f0', padding: 10 }}>
        <h3>🧠 Output</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}