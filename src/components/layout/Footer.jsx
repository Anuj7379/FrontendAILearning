import React from "react";
import { BrainCircuit, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Documents", path: "/documents" },
    { name: "Flashcards", path: "/flashcards" },
    { name: "Profile", path: "/profile" },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Anuj7379",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anujvishwakarma7379/",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:as9737856@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 py-9 sm:px-8 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:gap-12 lg:px-10">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-600/20">
              <BrainCircuit size={20} />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Learn With AI
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Your study materials, flashcards, and quizzes in one focused
            learning space.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Explore
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {links.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Connect
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Follow along or get in touch.
          </p>
          <div className="mt-3 flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {React.createElement(Icon, { size: 18 })}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} Learn With AI. Built for curious minds.
          </p>
          <p>Learn a little. Grow a lot.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
