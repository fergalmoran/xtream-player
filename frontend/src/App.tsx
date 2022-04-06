import React from "react";
import { Sidebar } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, ChannelPage, PlayerPage } from "./pages";
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
