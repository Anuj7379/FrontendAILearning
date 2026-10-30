import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, UserRound } from "lucide-react";
import { useAuth } from "../../context/authContext";

const getPageTitle = (pathname) => {
  if (pathname.startsWith("/documents/")) return "Document workspace";
  if (pathname === "/documents") return "My documents";
  if (pathname.startsWith("/flashcards")) return "Flashcards";
  if (pathname.startsWith("/quiz")) return "Quizzes";
  if (pathname === "/profile") return "Your profile";
  return "Dashboard";
};

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const initials = user?.username
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {getPageTitle(pathname)}
          </p>
          <p className="hidden text-xs text-slate-500 sm:block">
            Your personal learning workspace
          </p>
        </div>
      </div>

      <Link
        to="/profile"
        className="flex min-w-0 items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-50 sm:gap-3 sm:pr-3"
        aria-label="Open your profile"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-sm shadow-emerald-600/20">
          {initials || <UserRound size={19} />}
        </span>
        <span className="hidden min-w-0 text-left sm:block">
          <span className="block max-w-36 truncate text-sm font-semibold text-slate-800">
            {user?.username || "Learner"}
          </span>
          <span className="block max-w-40 truncate text-xs text-slate-500">
            {user?.email || "Learning account"}
          </span>
        </span>
      </Link>
    </header>
  );
};

export default Header;
