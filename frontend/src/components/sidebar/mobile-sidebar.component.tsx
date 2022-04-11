import React from "react";
import { SidebarContext } from "../../context";
import SidebarContent from "./sidebar-content.component";

const MobileSidebar = () => {
  const { isSidebarOpen } = React.useContext(SidebarContext);
  return isSidebarOpen ? (
    <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
      <SidebarContent />
    </aside>
  ) : null;
};

export default MobileSidebar;
