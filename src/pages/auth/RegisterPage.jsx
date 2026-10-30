import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpenCheck, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../../services/authService.js";
import Logo from "../../assets/Logo.png";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!username.trim() || !email.trim() || !password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await authService.register(username.trim(), email.trim(), password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1fr_0.9fr]">
        <section className="relative hidden min-h-[660px] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-12 text-white lg:flex">
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="relative">
            <img
              src={Logo}
              alt="Learn With AI"
              className="mb-12 h-14 w-auto object-contain"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-emerald-100">
              <BookOpenCheck size={16} /> A smarter way to study
            </span>
            <h1 className="mt-8 max-w-md text-4xl font-semibold leading-tight">
              Make every document a better way to learn.
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-slate-300">
              Create an account to organize your material and build your own
              study routine.
            </p>
          </div>
          <p className="relative text-sm text-slate-400">
            Notes, flashcards, and quizzes — together.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <img
                src={Logo}
                alt="Learn With AI"
                className="mb-6 h-12 w-auto object-contain"
              />
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                <BookOpenCheck size={17} /> A smarter way to study
              </span>
            </div>
            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Get started
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>
              <p className="mt-2 text-slate-500">
                Set up your space and make learning work for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your name
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <User size={19} className="shrink-0 text-slate-400" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
