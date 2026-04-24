"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Mail,
  Building2,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  Globe,
  Activity,
  UserCog,
  Settings,
  MoreVertical,
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  Phone,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import api from "../services/api";

export default function SystemAdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // General Universities State
  const [universitiesList, setUniversitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Alumni States
  const [alumniList, setAlumniList] = useState([]);
  const [isAlumniLoading, setIsAlumniLoading] = useState(false);

  // University Admins States
  const [uniAdminsList, setUniAdminsList] = useState([]);
  const [isUniAdminsLoading, setIsUniAdminsLoading] = useState(false);

  // Modal States
  const [uniModal, setUniModal] = useState({
    isOpen: false,
    mode: "add",
    data: null,
  });
  const [adminModal, setAdminModal] = useState({
    isOpen: false,
    mode: "create",
    data: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userInitial = (user?.name || "A").charAt(0).toUpperCase();

  // --- DATA FETCHING ---

  const fetchUniversities = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/universities");
      setUniversitiesList(response.data || []);
    } catch (err) {
      setUniversitiesList([
        {
          _id: "65e0f1a2b3c4d5e6f7g8h9i0",
          name: "UITS",
          location: "Badda, Dhaka",
        },
        {
          _id: "65e0f1a2b3c4d5e6f7g8h9i1",
          name: "Dhaka University",
          location: "Shahbag, Dhaka",
        },
      ]);
      console.error("Failed to fetch universities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAlumni = async () => {
    setIsAlumniLoading(true);
    try {
      const response = await api.get("/admin/system/all-alumni");
      setAlumniList(response.data || []);
    } catch (err) {
      setAlumniList([
        {
          _id: "a1",
          name: "John Doe",
          email: "john.doe@gmail.com",
          phone: "+8801711223344",
          student_id: "191-115-001",
          department: "Computer Science & Engineering",
          degree: "BSc in CSE",
          passing_year: "2023",
          cgpa: "3.85",
          university_id: "65e0f1a2b3c4d5e6f7g8h9i0",
        },
        {
          _id: "a2",
          name: "Ms. Farhana Haque",
          email: "farhana.haque@du.alumni.bd",
          phone: "+8801999887766",
          studentId: "DU-BBA-2017-045", // Testing camelCase fallback
          department: "Finance",
          degree: "BBA",
          passingYear: "2021",
          CGPA: "3.90",
          university_id: "65e0f1a2b3c4d5e6f7g8h9i1",
        },
      ]);
      console.error("Failed to fetch alumni:", err);
    } finally {
      setIsAlumniLoading(false);
    }
  };

  const fetchUniAdmins = async () => {
    setIsUniAdminsLoading(true);
    try {
      const response = await api.get("/admin/system/all-uni-admins");
      setUniAdminsList(response.data || []);
    } catch (err) {
      setUniAdminsList([
        {
          _id: "65f1a2b3c4d5e6f7g8h9i0j1",
          name: "Dr. Abu Rayhan",
          email: "rayhan@uits.edu.bd",
          role: "uni_admin",
          university_id: "65e0f1a2b3c4d5e6f7g8h9i0",
          created_at: "2026-03-15T10:30:00.000Z",
        },
      ]);
      console.error("Failed to fetch uni admins:", err);
    } finally {
      setIsUniAdminsLoading(false);
    }
  };

  useEffect(() => {
    if (universitiesList.length === 0) {
      fetchUniversities();
    }

    if (activeTab === "universities") fetchUniversities();
    else if (activeTab === "alumni") fetchAlumni();
    else if (activeTab === "uni_admins") fetchUniAdmins();
  }, [activeTab]);

  const getUniversityName = (id) => {
    const uni = universitiesList.find((u) => u._id === id);
    return uni ? uni.name : "Unknown University";
  };

  const displayedUniversities = useMemo(() => {
    return universitiesList.filter((uni) => {
      if (!searchQuery) return true;
      return (
        uni.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [universitiesList, searchQuery]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // --- API HANDLERS ---

  const handleSaveUniversity = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name"),
      location: formData.get("location"),
    };

    try {
      if (uniModal.mode === "add") {
        await api.post("/universities", payload);
      } else {
        await api.put(`/universities/${uniModal.data._id}`, payload);
      }
      setUniModal({ isOpen: false, mode: "add", data: null });
      fetchUniversities();
    } catch (err) {
      alert("Failed to save university.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUniversity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this university?"))
      return;
    try {
      await api.delete(`/universities/${id}`);
      fetchUniversities();
    } catch (err) {
      alert("Failed to delete university.");
    }
  };

  const handleSaveAdmin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      if (adminModal.mode === "create") {
        const payload = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          university_id: adminModal.data.university_id,
        };
        await api.post("/admin/system/create-uni-admin", payload);
        alert("University Admin created successfully!");
      } else {
        const adminId = formData.get("adminId");
        const payload = { name: formData.get("name") };
        await api.put(`/admin/system/uni-admin/${adminId}`, payload);
        alert("Admin details updated successfully!");
      }
      setAdminModal({ isOpen: false, mode: "create", data: null });
      if (activeTab === "uni_admins") fetchUniAdmins();
    } catch (err) {
      alert("Failed to save admin info.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAlumni = async (id) => {
    if (!window.confirm("Are you sure you want to remove this alumni?")) return;
    try {
      await api.delete(`/admin/system/alumni/${id}`);
      fetchAlumni();
    } catch (err) {
      alert("Failed to delete alumni.");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col h-full border-r border-slate-200 transform transition-all duration-300 ease-in-out md:relative ${
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
              <Shield className="w-5 h-5" />
            </div>
            <h1
              className={`font-bold text-lg tracking-tight text-slate-900 leading-tight whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              System Admin
            </h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p
            className={`px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
          >
            Administration
          </p>

          <button
            onClick={() => handleNavigation("profile")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all ${
              activeTab === "profile"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <UserCog
                className={`w-5 h-5 shrink-0 ${activeTab === "profile" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                Admin Profile
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNavigation("universities")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all ${
              activeTab === "universities"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <Building2
                className={`w-5 h-5 shrink-0 ${activeTab === "universities" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                Universities
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNavigation("uni_admins")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all ${
              activeTab === "uni_admins"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <UserCheck
                className={`w-5 h-5 shrink-0 ${activeTab === "uni_admins" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                University Admins
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNavigation("alumni")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all ${
              activeTab === "alumni"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <GraduationCap
                className={`w-5 h-5 shrink-0 ${activeTab === "alumni" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                Global Alumni
              </span>
            </div>
          </button>
        </nav>

        <div
          className={`p-4 border-t border-slate-200 bg-slate-50/50 ${isSidebarCollapsed ? "md:px-2" : ""}`}
        >
          <button
            onClick={logout}
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
              className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
            {userInitial}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* TAB: PROFILE */}
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Admin Dashboard
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Manage your system credentials and access levels.
                </p>
              </header>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-32 bg-slate-900 relative">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-slate-300 text-xs font-semibold tracking-wider border border-white/10">
                    ADMIN ID: {user?._id?.slice(-6).toUpperCase() || "SYS-001"}
                  </div>
                </div>
                <div className="px-6 md:px-8 pb-8 relative">
                  <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-sm absolute -top-12 border border-slate-200">
                    <div className="w-full h-full bg-slate-50 rounded-lg flex items-center justify-center font-bold text-slate-400 text-3xl">
                      {userInitial}
                    </div>
                  </div>
                  <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {user?.name || "Super Administrator"}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-500 mt-1.5 text-sm">
                        <Mail className="w-4 h-4" />{" "}
                        <span>{user?.email || "admin@system.local"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-indigo-200">
                      <ShieldCheck className="w-4 h-4" /> System Level Access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: UNIVERSITIES DIRECTORY */}
          {activeTab === "universities" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="mb-8 pt-2 md:pt-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    University Management
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm">
                    Monitor and manage all registered educational institutions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setAdminModal({ isOpen: true, mode: "edit", data: null })
                    }
                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" /> Edit Admin
                  </button>
                  <button
                    onClick={() =>
                      setUniModal({ isOpen: true, mode: "add", data: null })
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add University
                  </button>
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl border border-slate-200 mb-8 flex shadow-sm">
                <div className="flex-1 relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Search by university name or location..."
                    className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                </div>
              ) : displayedUniversities.length === 0 ? (
                <div className="p-12 bg-white rounded-xl border border-slate-200 text-center shadow-sm">
                  <Building2 className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Universities Found
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedUniversities.map((uni) => (
                    <div
                      key={uni._id}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col relative group"
                    >
                      <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <button
                          onClick={() =>
                            setUniModal({
                              isOpen: true,
                              mode: "edit",
                              data: uni,
                            })
                          }
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md"
                          title="Edit University"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUniversity(uni._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                          title="Delete University"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-4 mb-4 mt-2">
                        <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center font-bold text-lg border border-slate-200 shrink-0">
                          {(uni.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pr-10">
                          <h4 className="font-bold text-slate-900 text-base">
                            {uni.name}
                          </h4>
                        </div>
                      </div>

                      <div className="mb-5 flex-1">
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">
                            {uni.location || "Location not provided"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 mt-auto">
                        <button
                          onClick={() =>
                            setAdminModal({
                              isOpen: true,
                              mode: "create",
                              data: {
                                university_id: uni._id,
                                university_name: uni.name,
                              },
                            })
                          }
                          className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                        >
                          <UserPlus className="w-4 h-4" /> Create
                          Controller/Admin
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: UNIVERSITY ADMINS */}
          {activeTab === "uni_admins" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="mb-8 pt-2 md:pt-0 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    University Admins Directory
                  </h2>
                  <p className="text-slate-500 mt-1 text-sm">
                    Overview of all local administrators mapped to universities.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setAdminModal({ isOpen: true, mode: "edit", data: null })
                  }
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" /> Edit Admin
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Admin Info</th>
                        <th className="px-6 py-4 font-semibold">
                          Assigned University
                        </th>
                        <th className="px-6 py-4 font-semibold">Joined At</th>
                        <th className="px-6 py-4 font-semibold text-right">
                          Admin ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isUniAdminsLoading ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-8 text-center text-slate-400"
                          >
                            Loading administrators...
                          </td>
                        </tr>
                      ) : uniAdminsList.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-8 text-center text-slate-400"
                          >
                            No university admins found.
                          </td>
                        </tr>
                      ) : (
                        uniAdminsList.map((admin) => (
                          <tr
                            key={admin._id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900">
                                {admin.name}
                              </div>
                              <div className="text-slate-500 text-xs mt-0.5">
                                {admin.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium text-xs border border-indigo-100">
                                <Building2 className="w-3 h-3" />
                                {getUniversityName(admin.university_id)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                              {new Date(admin.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 border border-slate-200">
                                {admin._id}
                              </code>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GLOBAL ALUMNI (UPDATED ACADEMIC INFO) */}
          {activeTab === "alumni" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Global Alumni Directory
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Detailed view and management of all registered alumni across
                  universities.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold">
                          Alumni & Contact Info
                        </th>

                        <th className="px-6 py-4 font-semibold">University</th>
                        <th className="px-6 py-4 font-semibold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isAlumniLoading ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-8 text-center text-slate-400"
                          >
                            Loading alumni records...
                          </td>
                        </tr>
                      ) : alumniList.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-8 text-center text-slate-400"
                          >
                            No alumni found.
                          </td>
                        </tr>
                      ) : (
                        alumniList.map((alumni) => (
                          <tr
                            key={alumni._id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            {/* ALUMNI & CONTACT INFO */}
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900 text-base mb-1.5">
                                {alumni.name}
                              </div>
                              <div className="space-y-1">
                                {alumni.email && (
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>{alumni.email}</span>
                                  </div>
                                )}
                                {alumni.phone && (
                                  <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>{alumni.phone}</span>
                                  </div>
                                )}
                              </div>
                            </td>

                            {/* ACADEMIC PROFILE (DEGREE REMOVED) */}

                            {/* UNIVERSITY */}
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-medium text-xs border border-indigo-100">
                                <Building2 className="w-3.5 h-3.5" />
                                {getUniversityName(alumni.university_id)}
                              </span>
                            </td>

                            {/* ACTIONS */}
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDeleteAlumni(alumni._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors inline-block"
                                title="Delete Alumni Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- MODALS (Unchanged) --- */}
      {uniModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {uniModal.mode === "add" ? "Add University" : "Edit University"}
              </h3>
              <button
                onClick={() =>
                  setUniModal({ isOpen: false, mode: "add", data: null })
                }
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveUniversity} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  University Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  defaultValue={uniModal.data?.name}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="e.g. Dhaka University"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Location
                </label>
                <input
                  required
                  type="text"
                  name="location"
                  defaultValue={uniModal.data?.location}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="e.g. Dhaka, BD"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setUniModal({ isOpen: false, mode: "add", data: null })
                  }
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save University"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {adminModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {adminModal.mode === "create"
                  ? `Create Admin for ${adminModal.data?.university_name}`
                  : "Edit Admin Details"}
              </h3>
              <button
                onClick={() =>
                  setAdminModal({ isOpen: false, mode: "create", data: null })
                }
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
              {adminModal.mode === "edit" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Target Admin ID
                  </label>
                  <input
                    required
                    type="text"
                    name="adminId"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                    placeholder="Paste Admin ID here"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Copy the ID from the University Admins Directory.
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Admin Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  placeholder="e.g. UITS Controller"
                />
              </div>
              {adminModal.mode === "create" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                      placeholder="admin@univ.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      name="password"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setAdminModal({ isOpen: false, mode: "create", data: null })
                  }
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
