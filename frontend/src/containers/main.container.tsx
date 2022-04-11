import React from "react";

interface IMainProps {
  children: JSX.Element;
}
const Main = ({ children }: IMainProps) => {
  return (
    <main className="h-screen pb-16 overflow-y-hidden">
      <div className="container grid px-6 mx-auto">{children}</div>
    </main>
  );
};

export default Main;
