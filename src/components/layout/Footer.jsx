import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    
    { name: "Dashboard", path: "/" },
  
    { name: "Flashcards", path: "/flashcards" },
    { name: "Profile", path: "/profile" },
  
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16 border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            LearnWithAI 
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            AI-powered learning platform to generate quizzes & flashcards instantly. 
            Learn smarter, revise faster, and boost your productivity.
          </p>
          <div className="w-20 h-1 bg-emerald-500 mt-4 rounded-full"></div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-emerald-400 transition hover:translate-x-1 duration-200 block"
                >
                  → {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Connect with Me
          </h3>

          <div className="flex gap-4">
            
            {/* GitHub */}
            <a
              href="https://github.com/Anuj7379"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-3 rounded-xl hover:bg-gray-700 hover:scale-110 transition shadow-md"
            >
              <Github />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/anujvishwakarma7379/"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-3 rounded-xl hover:bg-blue-600 hover:text-white hover:scale-110 transition shadow-md"
            >
              <Linkedin />
            </a>

            {/* Email */}
            <a
              href="mailto:as9737856@gmail.com"
              className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 hover:text-white hover:scale-110 transition shadow-md"
            >
              <Mail />
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Let’s build something amazing together 💡
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-400">
        © {new Date().getFullYear()} LearnWithAI • Built by{" "}
        <span className="text-emerald-400 font-medium">
          Anuj Vishwakarma
        </span>
      </div>
    </footer>
  );
};

export default Footer;