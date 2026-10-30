import React, { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import authService from "../../services/authService";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

const ProfilePage = () => {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getProfile();

        setForm((prev) => ({
          ...prev,
          name: res.data.username,
          email: res.data.email,
        }));
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      const res = await authService.updateProfile({
        username: form.name,
        email: form.email,
      });

      toast.success("Profile updated 🚀");
    } catch (err) {
      console.log("update failed", err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (form.currentPassword === form.newPassword) {
      return toast.error("New password must be different");
    }
    console.log(
      "password is :",
      form.currentPassword,
      "another,, ",
      form.newPassword,
    );
    try {
      setPasswordLoading(true);

      await authService.changePassword(form.currentPassword, form.newPassword);

      toast.success("Password updated 🔐");

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE DATA:", err.response?.data);

      toast.error(err.response?.data?.error || "Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <PageHeader title="Profile Settings" />

      {/* Top Card */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
        {/* Simple Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-green-700 flex items-center justify-center text-white text-xl font-bold">
          {form.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold">{form.name}</h2>
          <p className="text-gray-500 text-sm">{form.email}</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h3 className="text-lg font-semibold">Personal Info</h3>

          <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
            <User size={16} />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent w-full outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg">
            <Mail size={16} />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full outline-none"
            />
          </div>

          <Button onClick={handleProfileUpdate}>Save Changes</Button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <h3 className="text-lg font-semibold">Security</h3>

          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="bg-gray-100 px-3 py-2 rounded-lg w-full outline-none"
          />

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="bg-gray-100 px-3 py-2 rounded-lg w-full outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="bg-gray-100 px-3 py-2 rounded-lg w-full outline-none"
          />

          <Button onClick={handlePasswordChange}>
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
