import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Containers from './containers';

export function FLApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Containers.Landing />} />
        <Route path="/request-ppe" element={<Containers.RequestPpe />} />
        <Route
          path="/register-supplies"
          element={<Containers.RegisterSupplies />}
        />
        <Route path="/about" element={<Containers.About />} />
        <Route path="/partners" element={<Containers.Partners />} />
        {/* Root and fallback */}
        <Route path="/" element={<Containers.Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
