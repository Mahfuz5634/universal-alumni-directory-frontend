"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Briefcase,
  Building2,
  School,
  Mail,
  Phone,
  Filter,
  Users,
  Edit3,
  Save,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import api from "../services/api";

// Custom SVG Icons
const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function AlumniDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [directory, setDirectory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ department: "", company: "" });

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState(
    user || {
      name: "Md. Mahfuz rahman",
      email: "mahfuz.alumni@example.com",
      role: "alumni",
      department: "CSE",
      graduation_year: 2023,
      student_roll_no: "UG02-43-18-051",
      company: "Google",
      position: "Software Engineer",
      contact_number: "01712345678",
      linkedin_id: "https://linkedin.com/in/mahfuz",
      github_id: "https://github.com/mahfuz",
      is_verified: false,
    },
  );

  const userInitial = (profileData.name || "A").charAt(0).toUpperCase();

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // --- API CALLS ---
  const fetchDirectory = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.company) params.append("company", filters.company);

      const res = await api.get(`/directory?${params.toString()}`);
      setDirectory(res.data || []);
    } catch (err) {
      showMsg("error", "Failed to fetch directory.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      // await api.put(`/alumni/profile/${profileData._id}`, profileData);
      showMsg("success", "Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      showMsg("error", "Failed to update profile.");
    }
  };

  useEffect(() => {
    if (activeTab === "directory") fetchDirectory();
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white flex flex-col h-full border-r border-slate-200 transform transition-all duration-300 ease-in-out md:relative ${
          isMobileMenuOpen
            ? "translate-x-0 shadow-2xl w-72"
            : "-translate-x-full md:translate-x-0"
        } ${isSidebarCollapsed ? "md:w-20" : "md:w-72"}`}
      >
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-transform hover:scale-105"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        <div
          className={`p-6 flex items-center justify-between md:justify-start gap-3 border-b border-slate-100 ${isSidebarCollapsed ? "md:justify-center px-4" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <GraduationCapIcon className="w-5 h-5" />
            </div>
            <h1
              className={`font-bold text-lg tracking-tight text-slate-900 leading-tight transition-opacity duration-200 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              Alumni Portal
            </h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden">
          <p
            className={`px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 transition-opacity whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
          >
            Navigation
          </p>

          <NavItem
            active={activeTab === "profile"}
            icon={User}
            label="My Profile"
            onClick={() => handleNavigation("profile")}
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            active={activeTab === "directory"}
            icon={Search}
            label="Alumni Directory"
            onClick={() => handleNavigation("directory")}
            isCollapsed={isSidebarCollapsed}
          />
        </nav>

        <div
          className={`p-4 border-t border-slate-200 bg-slate-50/50 transition-all ${isSidebarCollapsed ? "md:px-2" : ""}`}
        >
          <div
            className={`flex items-center gap-3 mb-4 px-2 ${isSidebarCollapsed ? "md:justify-center" : ""}`}
          >
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200">
              {userInitial}
            </div>
            <div
              className={`flex-1 min-w-0 ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              <p className="text-sm font-semibold text-slate-900 truncate">
                {profileData.name}
              </p>
              <p className="text-xs text-slate-500 truncate">Alumni</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg transition-colors shadow-sm ${isSidebarCollapsed ? "px-0" : "px-4"}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span
              className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white">
              <GraduationCapIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
            {userInitial}
          </div>
        </header>

        {/* Global Toast Message */}
        {message.text && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-top-4">
            <div
              className={`p-4 rounded-lg border shadow-lg flex items-center gap-3 ${
                message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              {message.type === "error" ? (
                <XCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {/* TAB 1: MY PROFILE */}
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    My Profile
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm">
                    Manage your personal and professional information.
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </header>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                {/* Profile Header Image/Cover */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  {/* Verified / Unverified Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20 shadow-sm">
                    {profileData.is_verified ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-green-300" />
                        <span>Verified Alumni</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-300" />
                        <span>Unverified Profile</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-8 relative">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-sm absolute -top-12 border border-slate-200">
                    <div className="w-full h-full bg-indigo-50 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-4xl">
                      {userInitial}
                    </div>
                  </div>

                  {isEditing ? (
                    /* EDIT MODE FORM */
                    <form onSubmit={updateProfile} className="pt-16 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Non-editable Academic Info (Display Only) */}
                        <div className="md:col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-wrap gap-6">
                          <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">
                              Name
                            </p>
                            <p className="font-semibold text-slate-900">
                              {profileData.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">
                              Department
                            </p>
                            <p className="font-semibold text-slate-900">
                              {profileData.department}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">
                              Graduation Year
                            </p>
                            <p className="font-semibold text-slate-900">
                              {profileData.graduation_year}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium uppercase">
                              Roll No
                            </p>
                            <p className="font-semibold text-slate-900">
                              {profileData.student_roll_no}
                            </p>
                          </div>
                        </div>

                        {/* Editable Professional & Contact Info */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={profileData.company || ""}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Position / Job Title
                          </label>
                          <input
                            type="text"
                            name="position"
                            value={profileData.position || ""}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Contact Number
                          </label>
                          <input
                            type="text"
                            name="contact_number"
                            value={profileData.contact_number || ""}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            LinkedIn URL
                          </label>
                          <input
                            type="text"
                            name="linkedin_id"
                            value={profileData.linkedin_id || ""}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            GitHub URL
                          </label>
                          <input
                            type="text"
                            name="github_id"
                            value={profileData.github_id || ""}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          <Save className="w-4 h-4" /> Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* VIEW MODE */
                    <div className="pt-16">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {profileData.name}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm font-medium">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span>{profileData.email}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {profileData.linkedin_id && (
                            <a
                              href={profileData.linkedin_id}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-slate-50 text-[#0A66C2] rounded-lg border border-slate-200 hover:bg-blue-50 transition-colors"
                            >
                              <LinkedinIcon className="w-5 h-5" />
                            </a>
                          )}
                          {profileData.github_id && (
                            <a
                              href={profileData.github_id}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                            >
                              <GithubIcon className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Academic Block */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pb-2 border-b border-slate-200">
                            <School className="w-4 h-4 text-indigo-500" />{" "}
                            Academic Information
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Department
                              </p>
                              <p className="text-sm font-medium text-slate-900">
                                {profileData.department}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Graduation Year
                              </p>
                              <p className="text-sm font-medium text-slate-900">
                                Class of {profileData.graduation_year}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Student Roll No
                              </p>
                              <p className="text-sm font-medium text-slate-900">
                                {profileData.student_roll_no}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Professional Block */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pb-2 border-b border-slate-200">
                            <Briefcase className="w-4 h-4 text-indigo-500" />{" "}
                            Professional Details
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Current Company
                              </p>
                              <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-slate-400" />{" "}
                                {profileData.company || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Position / Job Title
                              </p>
                              <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" />{" "}
                                {profileData.position || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                                Contact Number
                              </p>
                              <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />{" "}
                                {profileData.contact_number || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALUMNI DIRECTORY */}
          {activeTab === "directory" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Alumni Directory
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Browse and connect with verified alumni across the university.
                </p>
              </header>

              {/* Filters */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 shadow-sm items-end">
                <div className="flex-[2] w-full">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                    Search Company
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      name="company"
                      placeholder="e.g. Google, Microsoft..."
                      onChange={handleFilterChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                    Department
                  </label>
                  <select
                    name="department"
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="BBA">BBA</option>
                    <option value="Civil">Civil</option>
                    <option value="English">English</option>
                    <option value="Law">Law</option>
                  </select>
                </div>
              </div>

              {/* Directory Grid */}
              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-sm font-medium">Loading directory...</p>
                </div>
              ) : directory.length === 0 ? (
                <div className="p-12 bg-white rounded-xl border border-slate-200 text-center shadow-sm">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Alumni Found
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Try modifying your filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {directory.map((alumni) => (
                    <div
                      key={alumni._id || Math.random()}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-200 flex flex-col"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center font-bold text-lg border border-slate-200 shrink-0">
                          {(alumni.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-bold text-slate-900 text-base truncate"
                            title={alumni.name}
                          >
                            {alumni.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {alumni.department || "Dept. N/A"} • Class of{" "}
                            {alumni.graduation_year || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-5 flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                          <span
                            className="truncate"
                            title={alumni.position || "Professional"}
                          >
                            {alumni.position || "Professional"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span
                            className="truncate"
                            title={alumni.company || "Company not listed"}
                          >
                            {alumni.company || "Company not listed"}
                          </span>
                        </div>
                      </div>

                      {/* --- UPDATE: Social & Contact Links --- */}
                      <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                        {alumni.linkedin_id && (
                          <a
                            href={alumni.linkedin_id}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            className="flex-1 flex justify-center items-center gap-2 py-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-lg text-sm font-semibold hover:bg-[#0A66C2]/20 transition-colors"
                          >
                            <LinkedinIcon className="w-4 h-4" />{" "}
                            <span className="hidden sm:inline">LinkdIn</span>
                          </a>
                        )}
                        {alumni.github_id && (
                          <a
                            href={alumni.github_id}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                            className="flex-1 flex justify-center items-center gap-2 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                          >
                            <GithubIcon className="w-4 h-4" />{" "}
                            <span className="hidden sm:inline">GitHub</span>
                          </a>
                        )}
                        {alumni.email && (
                          <a
                            href={`mailto:${alumni.email}`}
                            title="Email"
                            className="flex-1 flex justify-center items-center gap-2 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors"
                          >
                            <Mail className="w-4 h-4" />{" "}
                            <span className="hidden sm:inline">Email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Components
const GraduationCapIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const NavItem = ({ active, label, icon: Icon, onClick, isCollapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center relative py-2.5 rounded-lg transition-all duration-200 ${
      active
        ? "bg-indigo-50 text-indigo-700 font-semibold"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
    } ${isCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
  >
    <div className={`flex items-center ${isCollapsed ? "" : "gap-3"}`}>
      <Icon
        className={`w-5 h-5 shrink-0 ${active ? "text-indigo-600" : "text-slate-400"}`}
      />
      <span
        className={`whitespace-nowrap ${isCollapsed ? "md:hidden" : "block"}`}
      >
        {label}
      </span>
    </div>
    {active && !isCollapsed && (
      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0"></div>
    )}
  </button>
);
