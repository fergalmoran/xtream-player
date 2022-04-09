import React from "react";

interface ISidebarProvider {
  children: React.ReactChild;
}
interface ISidebarProviderContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}
export const SidebarContext = React.createContext<ISidebarProviderContext>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const SidebarProvider = ({ children }: ISidebarProvider) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const _toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const _closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const value = React.useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar: _toggleSidebar,
      closeSidebar: _closeSidebar,
    }),
    [isSidebarOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
