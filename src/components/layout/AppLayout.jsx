import React, { useState } from "react";
import Header from "./Header";
import Slidebar from "./Slidebar";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-neutral-50 text-neutral-900 ">
        <Slidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col overflow-hidden ">
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden ">
            {children} {/*  children goes here */}
          </main>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AppLayout;
