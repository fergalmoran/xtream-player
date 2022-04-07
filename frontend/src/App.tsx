import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./containers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
