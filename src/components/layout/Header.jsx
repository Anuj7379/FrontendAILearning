import React from "react";
import { useAuth } from "../../context/authContext";
import { Bell, User, Menu ,  } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-white shadow-md h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-lg  text-gray-800 hidden sm:block italic font-bold">
         Learn With Ai
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        <span className="h-10 bg-gray-200 w-[2px]">

        </span>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-emerald-500 p-2 rounded-md flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-md  font-semibold text-gray-800">
              {user?.username}
            </span>
            <span className="text-xs italic text-gray-600 truncate max-w-[160px]">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
