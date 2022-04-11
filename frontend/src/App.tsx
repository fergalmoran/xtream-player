import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./containers";
import { OnboardingPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {localStorage.getItem("server") ? (
          <>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/*" element={<Layout />} />
          </>
        ) : (
          <Route path="/*" element={<OnboardingPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
