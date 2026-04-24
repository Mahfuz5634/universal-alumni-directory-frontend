"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  GraduationCap,
  Building2,
  CheckCircle2,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Eye,
  Trash2,
  XCircle,
  Filter,
  Check,
  Briefcase,
  User,
  School,
  Mail,
  Phone,
  IdCard,
  Calendar,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import api from "../services/api";

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

export default function UniAdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Layout States
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Data States
  const [universityName, setUniversityName] = useState("Loading...");
  const [alumniList, setAlumniList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [directory, setDirectory] = useState([]);

  const [managementFilter, setManagementFilter] = useState("pending");

  // Modals & Filters
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: "",
    graduation_year: "",
    company: "",
  });

  const adminInitial = (user?.name || "A").charAt(0).toUpperCase();

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchUniversityInfo = async () => {
      try {
        const response = await api.get("/universities");
        const foundUni = response.data.find(
          (uni) => uni._id === user?.university_id,
        );
        setUniversityName(foundUni ? foundUni.name : "University Not Found");
      } catch (err) {
        console.error("Error fetching universities:", err);
        setUniversityName("Unknown University");
      }
    };

    if (user?.university_id) {
      fetchUniversityInfo();
    }
  }, [user?.university_id]);

  const fetchAlumniList = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/directory");
      setAlumniList(res.data || []);
    } catch (err) {
      showMsg("error", "Failed to fetch alumni records.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentList = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/uni/all-students");
      setStudentList(res.data || []);
    } catch (err) {
      showMsg("error", "Failed to fetch student records.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDirectory = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.graduation_year)
        params.append("graduation_year", filters.graduation_year);
      if (filters.company) params.append("company", filters.company);

      const res = await api.get(`/directory?${params.toString()}`);
      // Ensure only verified alumni are in the directory (fallback if backend doesn't filter)
      const verifiedOnly = (res.data || []).filter((a) => a.is_verified);
      setDirectory(verifiedOnly);
    } catch (err) {
      showMsg("error", "Failed to fetch directory.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "alumni-management") fetchAlumniList();
    if (activeTab === "student-management") fetchStudentList();
    if (activeTab === "directory") fetchDirectory();
  }, [activeTab]);

  // --- ACTIONS ---
  const handleVerify = async (id) => {
    try {
      await api.put(`/admin/uni/verify/${id}`);
      setAlumniList((prev) =>
        prev.map((a) => (a._id === id ? { ...a, is_verified: true } : a)),
      );
      if (selectedProfile && selectedProfile._id === id) {
        setSelectedProfile((prev) => ({ ...prev, is_verified: true }));
      }
      showMsg("success", "Alumni successfully verified.");
    } catch (err) {
      showMsg("error", "Failed to verify alumni.");
    }
  };

  const handleUnverify = async (id) => {
    try {
      await api.put(`/admin/uni/unverify/${id}`);
      setAlumniList((prev) =>
        prev.map((a) => (a._id === id ? { ...a, is_verified: false } : a)),
      );

      // Update modal state if open
      if (selectedProfile && selectedProfile._id === id) {
        setSelectedProfile((prev) => ({ ...prev, is_verified: false }));
      }
      showMsg("success", "Alumni verification revoked.");
    } catch (err) {
      showMsg("error", "Failed to revoke verification.");
    }
  };

  const handleDeleteAlumni = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this alumni?",
      )
    )
      return;
    try {
      await api.delete(`/admin/uni/alumni/${id}`);
      setAlumniList((prev) => prev.filter((a) => a._id !== id));
      if (selectedProfile && selectedProfile._id === id)
        setSelectedProfile(null);
      showMsg("success", "Alumni deleted permanently.");
    } catch (err) {
      showMsg("error", "Failed to delete alumni.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to remove this student?"))
      return;
    try {
      await api.delete(`/admin/uni/student/${id}`);
      setStudentList((prev) => prev.filter((s) => s._id !== id));
      showMsg("success", "Student record deleted.");
    } catch (err) {
      showMsg("error", "Failed to delete student.");
    }
  };

  const viewProfile = async (id) => {
    try {
      const res = await api.get(`/alumni/profile/${id}`);
      setSelectedProfile(res.data);
    } catch (err) {
      showMsg("error", "Failed to fetch profile details.");
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const displayedAlumniList = alumniList.filter((alumni) =>
    managementFilter === "pending" ? !alumni.is_verified : alumni.is_verified,
  );

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
            <div className="w-9 h-9 shrink-0 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1
              className={`font-bold text-lg tracking-tight text-slate-900 leading-tight transition-opacity duration-200 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              Uni Portal
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
            Administration
          </p>

          <NavItem
            active={activeTab === "profile"}
            icon={User}
            label="My Profile"
            onClick={() => handleNavigation("profile")}
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            active={activeTab === "alumni-management"}
            icon={GraduationCap}
            label="Alumni Management"
            onClick={() => handleNavigation("alumni-management")}
            isCollapsed={isSidebarCollapsed}
          />
          <NavItem
            active={activeTab === "student-management"}
            icon={Users}
            label="Student Management"
            onClick={() => handleNavigation("student-management")}
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
              {adminInitial}
            </div>
            <div
              className={`flex-1 min-w-0 ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              <p
                className="text-sm font-semibold text-slate-900 truncate"
                title={user?.name}
              >
                {user?.name || "University Admin"}
              </p>
              <p
                className="text-xs text-slate-500 truncate"
                title={user?.email}
              >
                {user?.email}
              </p>
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

      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
            {adminInitial}
          </div>
        </header>

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
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Admin Dashboard
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Manage your university identity and portal settings.
                </p>
              </header>

              {user && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-32 bg-slate-900 relative">
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-slate-300 text-xs font-semibold tracking-wider border border-white/10">
                        ID:{" "}
                        {user.university_id?.slice(-6).toUpperCase() || "ADMIN"}
                      </div>
                    </div>

                    <div className="px-6 md:px-8 pb-8 relative">
                      <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-sm absolute -top-12 border border-slate-200">
                        <div className="w-full h-full bg-slate-50 rounded-lg flex items-center justify-center font-bold text-slate-400 text-3xl">
                          {adminInitial}
                        </div>
                      </div>

                      <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {user.name || "University Admin"}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-500 mt-1.5 text-sm">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-indigo-200">
                          <ShieldCheck className="w-4 h-4 text-indigo-600" />
                          Official Admin
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-50 rounded-md border border-slate-100 text-slate-500">
                            <School className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Institution
                            </p>
                            <p className="text-sm font-medium text-slate-900 leading-tight">
                              {universityName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-50 rounded-md border border-slate-100 text-slate-500">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Role
                            </p>
                            <p className="text-sm font-medium text-slate-900 leading-tight">
                              Portal Administrator
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-50 rounded-md border border-slate-100 text-slate-500">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Access Level
                            </p>
                            <p className="text-sm font-medium text-slate-900 leading-tight">
                              Full Dashboard Access
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- TAB: ALUMNI MANAGEMENT --- */}
          {activeTab === "alumni-management" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <header className="mb-6 pt-2 md:pt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Alumni Management
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm">
                    Review pending verification requests and manage existing
                    alumni.
                  </p>
                </div>

                <div className="flex bg-slate-200/50 p-1 rounded-lg shrink-0">
                  <button
                    onClick={() => setManagementFilter("pending")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${managementFilter === "pending" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Pending Requests
                  </button>
                  <button
                    onClick={() => setManagementFilter("verified")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${managementFilter === "verified" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Verified Alumni
                  </button>
                </div>
              </header>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {isLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">Loading records...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Alumni Details
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Academic Info
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {displayedAlumniList.map((alumni) => (
                          <tr
                            key={alumni._id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center font-bold text-sm border border-slate-200">
                                  {alumni.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900">
                                    {alumni.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {alumni.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900 font-medium">
                                {alumni.department}
                              </div>
                              <div className="text-xs text-slate-500">
                                Class of {alumni.graduation_year}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {alumni.is_verified ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                  <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                  Verified
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => viewProfile(alumni._id)}
                                  className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                  <Eye className="w-4 h-4" /> Review
                                </button>

                                <button
                                  onClick={() => handleDeleteAlumni(alumni._id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Remove Account"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {displayedAlumniList.length === 0 && (
                          <tr>
                            <td
                              colSpan="4"
                              className="px-6 py-12 text-center text-sm text-slate-500"
                            >
                              <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                              <p>No {managementFilter} alumni found.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- TAB: STUDENT MANAGEMENT --- */}
          {activeTab === "student-management" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Student Directory
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Manage current student records connected to the portal.
                </p>
              </header>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {isLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-medium">
                      Loading student records...
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/80 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Student Info
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Academic Details
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentList.map((student) => (
                          <tr
                            key={student._id}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm border border-indigo-100">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900">
                                    {student.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {student.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900 font-medium">
                                {student.student_id}
                              </div>
                              <div className="text-xs text-slate-500">
                                {student.department}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button
                                onClick={() => handleDeleteStudent(student._id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Remove Student"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {studentList.length === 0 && (
                          <tr>
                            <td
                              colSpan="3"
                              className="px-6 py-12 text-center text-sm text-slate-500"
                            >
                              <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                              <p>No student records found.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- TAB: DIRECTORY --- */}
          {activeTab === "directory" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Alumni Directory
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Browse all verified alumni profiles across the university.
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
                      placeholder="Search by company name (e.g. Google)..."
                      onChange={handleFilterChange}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Department Dropdown */}
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
                    <option value="Mechanical">Mechanical</option>
                    <option value="Architecture">Architecture</option>
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
                    No Verified Alumni Found
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Try modifying your filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {directory.map((alumni) => (
                    <div
                      key={alumni._id}
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
                            title={alumni.position || "Position not specified"}
                          >
                            {alumni.position || "Professional"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span
                            className="truncate"
                            title={alumni.company || "Company not specified"}
                          >
                            {alumni.company || "Company not listed"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                        <button
                          onClick={() => viewProfile(alumni._id)}
                          className="flex-1 bg-white border border-slate-200 text-slate-700 text-center py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                        >
                          View Profile
                        </button>
                        {alumni.linkedin_id && (
                          <a
                            href={alumni.linkedin_id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-slate-500 rounded-lg border border-slate-200 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
                          >
                            <LinkedinIcon />
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

      {/* --- PROFESSIONAL PROFILE MODAL WITH VERIFY/UNVERIFY ACTIONS --- */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-900 text-lg">
                  Alumni Profile Review
                </h3>
                {selectedProfile.is_verified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                    Pending Verification
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors bg-white hover:bg-slate-200 rounded-full p-1.5 border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex items-center justify-center font-bold text-indigo-600 text-4xl border border-indigo-100 shadow-sm shrink-0">
                  {selectedProfile.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {selectedProfile.name}
                  </h4>
                  <p className="text-slate-500 font-medium mb-3">
                    {selectedProfile.email}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    {selectedProfile.linkedin_id && (
                      <a
                        href={selectedProfile.linkedin_id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/10 text-[#0A66C2] rounded-md text-xs font-semibold hover:bg-[#0A66C2]/20 transition-colors"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                    {selectedProfile.github_id && (
                      <a
                        href={selectedProfile.github_id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {selectedProfile.contact_number && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-md text-xs font-semibold border border-slate-200">
                        <Phone className="w-3.5 h-3.5" />{" "}
                        {selectedProfile.contact_number}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Data Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />{" "}
                    Academic Details
                  </h5>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                        Student Roll No
                      </p>
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <IdCard className="w-4 h-4 text-slate-400" />{" "}
                        {selectedProfile.student_roll_no || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                        Department
                      </p>
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <School className="w-4 h-4 text-slate-400" />{" "}
                        {selectedProfile.department || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                        Graduation Year
                      </p>
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Class of{" "}
                        {selectedProfile.graduation_year || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Block */}
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-500" />{" "}
                    Professional Details
                  </h5>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3 h-[180px]">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                        Current Company
                      </p>
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />{" "}
                        {selectedProfile.company || "Not Provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                        Position / Job Title
                      </p>
                      <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />{" "}
                        {selectedProfile.position || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => setSelectedProfile(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
              >
                Close View
              </button>

              <div className="w-full sm:w-auto flex gap-3">
                {selectedProfile.is_verified ? (
                  <button
                    onClick={() => handleUnverify(selectedProfile._id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Revoke Verification
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerify(selectedProfile._id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Verify
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sidebar Helper Component ---
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
