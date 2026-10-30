import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import authService from "../../services/authService";
import { useAuth } from "../../context/authContext";

const initialForm = {
  name: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        if (!cancelled) {
          setForm((previous) => ({
            ...previous,
            name: response.data.username || "",
            email: response.data.email || "",
          }));
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error.response?.data?.error || "Failed to load your profile.",
          );
          setForm((previous) => ({
            ...previous,
            name: user?.username || "",
            email: user?.email || "",
          }));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [user?.email, user?.username]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const username = form.name.trim();
    const email = form.email.trim();

    if (!username || !email) {
      toast.error("Name and email are required.");
      return;
    }

    setSavingProfile(true);
    try {
      const response = await authService.updateProfile({ username, email });
      updateUser(response.data);
      setForm((previous) => ({ ...previous, name: username, email }));
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Profile update failed.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      toast.error("Complete all password fields.");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (form.currentPassword === form.newPassword) {
      toast.error("Choose a password different from your current one.");
      return;
    }

    setPasswordLoading(true);
    try {
      await authService.changePassword(form.currentPassword, form.newPassword);
      toast.success("Password updated.");
      setForm((previous) => ({
        ...previous,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Password change failed.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const initials =
    form.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/dashboard"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950 to-teal-900 p-6 text-white shadow-lg sm:p-8">
          <div className="absolute -right-12 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl font-bold text-emerald-100 shadow-inner">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-emerald-200">
                Account settings
              </p>
              <h1 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                {form.name || "Your profile"}
              </h1>
              <p className="mt-1 truncate text-sm text-slate-300">
                {form.email}
              </p>
            </div>
            <div className="sm:ml-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100">
                <ShieldCheck size={15} /> Account protected
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <UserRound size={20} />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Personal details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the name and email on your account.
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="profile-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`${fieldClassName} pl-11`}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${fieldClassName} pl-11`}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Check size={17} />
                {savingProfile ? "Saving changes..." : "Save changes"}
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <LockKeyhole size={20} />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">Password & security</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose a strong password you have not used before.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <PasswordField
                id="current-password"
                name="currentPassword"
                label="Current password"
                value={form.currentPassword}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <PasswordField
                id="new-password"
                name="newPassword"
                label="New password"
                value={form.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <PasswordField
                id="confirm-password"
                name="confirmPassword"
                label="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <button
                type="submit"
                disabled={passwordLoading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <KeyRound size={17} />
                {passwordLoading ? "Updating password..." : "Update password"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
}) => (
  <div>
    <label
      htmlFor={id}
      className="text-sm font-semibold text-slate-700"
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type="password"
      value={value}
      onChange={onChange}
      className={fieldClassName}
      placeholder={label}
      autoComplete={autoComplete}
      minLength={name === "currentPassword" ? undefined : 6}
      required
    />
  </div>
);

export default ProfilePage;
