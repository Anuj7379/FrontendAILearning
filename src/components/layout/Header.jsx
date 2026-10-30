import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, FilePlus2, Menu, UserRound } from "lucide-react";
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
  const pageTitle = getPageTitle(pathname);
  const initials = user?.username
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-30 flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="hidden sm:inline">Workspace</span>
            <ChevronRight className="hidden sm:block" size={13} />
            <span className="truncate text-emerald-700">{pageTitle}</span>
          </div>
          <h1 className="mt-0.5 truncate text-sm font-bold text-slate-900 sm:text-base">
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-2 sm:gap-4">
        <Link
          to="/documents?upload=1"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-sm font-semibold text-white shadow-md shadow-emerald-700/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 sm:px-4"
        >
          <FilePlus2 size={17} />
          <span className="hidden sm:inline">Add PDF</span>
        </Link>

        <span className="hidden h-8 w-px bg-slate-200 sm:block" />

        <Link
          to="/profile"
          className="group flex min-w-0 items-center gap-2 rounded-xl p-1 transition hover:bg-slate-50 sm:gap-3 sm:pr-2"
          aria-label="Open your profile"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 ring-2 ring-white">
            {initials || <UserRound size={19} />}
          </span>
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block max-w-36 truncate text-sm font-semibold text-slate-800 group-hover:text-emerald-800">
              {user?.username || "Learner"}
            </span>
            <span className="block max-w-40 truncate text-xs text-slate-500">
              {user?.email || "Learning account"}
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
