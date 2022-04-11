import React, { Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "../components/header.component";
import Main from "./main.container";
import { ChannelPage, HomePage, PlayerPage } from "../pages";
import ThemedSuspence from "../components/themed-suspence.component";
import { SidebarContext } from "../context";
import Sidebar from "../components/sidebar";
const Layout = () => {
  const { isSidebarOpen, closeSidebar } = React.useContext(SidebarContext);
  let location = useLocation();

  React.useEffect(() => {
    closeSidebar();
  }, [location]);
  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 xtreamium-font ${
        isSidebarOpen && "overflow-hidden"
      } `}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspence />}>
            <Routes>
              <Route path="live/channel/:channelId" element={<ChannelPage />} />
              <Route path="live/play/:streamId" element={<PlayerPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
};

export default Layout;
