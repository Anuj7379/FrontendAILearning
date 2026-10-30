import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { ArrowRight, BrainCircuit, Lock, Mail, Sparkles } from "lucide-react";
=======
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";
>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext.jsx";
import authService from "../../services/authService.js";
import Logo from "../../assets/Logo.png";
<<<<<<< HEAD
=======
import loginBg from "../../assets/loginBg.jpg";
>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const [focusedField, setFocusedField] = useState(null);
>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469

  const { login } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  

>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(email, password);
<<<<<<< HEAD
      login(response.user, response.token);
=======

      //  correct response handling
      login(response.user, response.token);

>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1fr_0.9fr]">
        <section className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-12 text-white lg:flex">
          <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <img
              src={Logo}
              alt="Learn With AI"
              className="mb-12 h-14 w-auto object-contain"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-emerald-100">
              <Sparkles size={16} /> Your personal learning space
            </span>
            <h1 className="mt-8 max-w-md text-4xl font-semibold leading-tight">
              Turn your study material into real progress.
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-slate-300">
              Pick up where you left off with your notes, flashcards, and
              quizzes in one place.
            </p>
          </div>
          <p className="relative text-sm text-slate-400">
            Learn at your pace. Grow every day.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-9 lg:hidden">
              <img
                src={Logo}
                alt="Learn With AI"
                className="mb-7 h-12 w-auto object-contain"
              />
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                <BrainCircuit size={17} /> Your personal learning space
              </span>
            </div>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to continue
              </h2>
              <p className="mt-2 text-slate-500">
                Access your learning dashboard and saved materials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <Mail size={19} className="shrink-0 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <Lock size={19} className="shrink-0 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to Learn With AI?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
=======
  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-18 " />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Please login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div
              className={`flex items-center border ${
                focusedField === "email"
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md`}
            >
              <Mail size={20} className="text-gray-400 ml-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center border ${
                focusedField === "password"
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md`}
            >
              <Lock size={20} className="text-gray-400 ml-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition duration-200 flex items-center justify-center
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={20} className="ml-2" />}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
>>>>>>> 01bee3906ea871c78277b9f4f3ffe14815af5469
  );
};

export default LoginPage;
