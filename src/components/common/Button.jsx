import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
}) => {

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ease-out active:scale-95 disabled:cursor-not-allowed disabled:opacity-70";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500
      text-white shadow-lg shadow-emerald-500/30
      hover:shadow-emerald-500/50 hover:-translate-y-0.5
      focus:ring-2 focus:ring-emerald-400/50
      disabled:from-gray-400 disabled:to-gray-400 disabled:shadow-none
    `,

    secondary: `
      bg-gradient-to-r from-slate-500 to-gray-600
      text-white shadow-md
      hover:from-slate-600 hover:to-gray-700 hover:-translate-y-0.5
      focus:ring-2 focus:ring-gray-400/40
      disabled:bg-gray-400 disabled:shadow-none
    `,

    danger: `
      bg-gradient-to-r from-rose-500 to-red-600
      text-white shadow-lg shadow-red-500/30
      hover:shadow-red-500/50 hover:-translate-y-0.5
      focus:ring-2 focus:ring-red-400/50
      disabled:bg-gray-400 disabled:shadow-none
    `,

    outline: `
      bg-white/10 backdrop-blur-md
      border border-gray-300
      text-gray-700
      hover:bg-gray-100
      focus:ring-2 focus:ring-gray-400/40
      disabled:border-gray-300 disabled:text-gray-400 disabled:bg-transparent
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${sizes[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
