import React from "react";
import { Sidebar } from "./components";
import { Route, Routes } from "react-router-dom";
import { HomePage, ChannelPage, PlayerPage } from "./pages";

function App() {
  return (
    <div className="flex flex-col h-screen font-Rampart">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex h-16 p-4 bg-gray-100">Header</div>
          <main className="flex flex-1 px-4 pt-5 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="live/channel/:channelId" element={<ChannelPage />} />
              <Route path="live/play/:streamId" element={<PlayerPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
