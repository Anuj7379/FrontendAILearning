import React from "react";
import {
  User,
  LayoutDashboard,
  FileText,
  LogOut,
  BookOpen,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", path: "/documents", icon: BookOpen },
    { name: "Flashcards", path: "/flashcards", icon: FileText },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-300 shadow-sm transform transition-transform duration-300 ease-in-out 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:static`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-400 ">
        <h2 className="text-xl font-bold text-gray-800 ">Learn With AI</h2>

        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1 rounded-md hover:bg-gray-200"
        >
          <X size={18} />
        </button>
      </div>
      

      {/* Navigation */}
      <nav className="flex flex-col justify-between h-[calc(100%-70px)] px-4 py-5">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-md lg:text-lg font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-emerald-500 text-white shadow"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="pt-6 border-t-2 border-gray-400 ">
          <button
            onClick={handleLogout}
            className="flex items-center bg-gray-800 gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-400 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;