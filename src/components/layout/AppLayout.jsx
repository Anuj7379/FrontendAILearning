import React, { useState } from "react";
import Header from "./Header";
import Slidebar from "./Slidebar";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex min-h-[calc(100vh-64px)] flex-1">
        {isSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation menu"
          />
        )}
        <Slidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header toggleSidebar={toggleSidebar} />

          <main className="min-h-0 flex-1 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
