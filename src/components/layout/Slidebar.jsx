import React from "react";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  LayoutDashboard,
  LogOut,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const initials = user?.username
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", path: "/documents", icon: BookOpen },
    { name: "Flashcards", path: "/flashcards", icon: BrainCircuit },
    { name: "Profile", path: "/profile", icon: UserRound },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[280px] shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white shadow-2xl shadow-slate-950/20 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 lg:shadow-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Main navigation"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-950/40">
            <BrainCircuit size={21} />
          </span>
          <div>
            <p className="text-sm font-bold tracking-wide text-white">
              Learn With AI
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Your study space
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={closeSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close navigation menu"
        >
          <X size={19} />
        </button>
      </div>

      <div className="px-4 pt-7">
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </p>
        <nav className="mt-3">
          <ul className="space-y-1.5">
            {navItems.map(({ name, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/20"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                          isActive
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "text-slate-500 group-hover:text-slate-200"
                        }`}
                      >
                        {React.createElement(Icon, { size: 18 })}
                      </span>
                      {name}
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <Link
            to="/profile"
            onClick={closeSidebar}
            className="flex min-w-0 items-center gap-3 rounded-xl transition hover:bg-white/[0.04]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white">
              {initials || <UserRound size={18} />}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-100">
                {user?.username || "Learner"}
              </span>
              <span className="mt-0.5 block truncate text-xs text-slate-400">
                {user?.email || "View account"}
              </span>
            </span>
          </Link>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
            <LogOut size={17} />
          </span>
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
