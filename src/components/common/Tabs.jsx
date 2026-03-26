import React from "react";

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  const ActiveComponent = tabs.find((t) => t.name === activeTab)?.content;

  return (
    <div className=" flex flex-col h-full border border-gray-300 rounded-lg overflow-hidden ">
      {/*  Tab Header */}
      <div className=" bg-white sticky top-0 z-10">
        <nav className="border-b-2 border-gray-200 flex gap-6 px-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`relative py-3 text-sm font-medium transition ${
                activeTab === tab.name
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label || tab.name}

              {/* Active indicator */}
              {activeTab === tab.name && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 🔹 Tab Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-2">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default Tabs;
