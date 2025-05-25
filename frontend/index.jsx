import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IDE from './ide/IDE';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>🧠 Sovereign Runtime IDE</h1>} />
      <Route path="/ide" element={<IDE />} />
    </Routes>
  </BrowserRouter>
);