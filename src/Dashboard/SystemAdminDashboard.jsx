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
  Edit2,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  Phone,
  GraduationCap,
  Plus,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

export default function SystemAdminDashboard() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
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
  const [uniModal, setUniModal] = useState({ isOpen: false, mode: "add", data: null });
  const [adminModal, setAdminModal] = useState({ isOpen: false, mode: "create", data: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userInitial = (user?.name || "A").charAt(0).toUpperCase();

  // --- DATA FETCHING ---
  const fetchUniversities = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/universities");
      setUniversitiesList(response.data || []);
    } catch (err) {
      // Fallback dummy data for preview
      setUniversitiesList([
        { _id: "65e0f1a2b3c4d5e6f7g8h9i0", name: "UITS", location: "Badda, Dhaka" },
        { _id: "65e0f1a2b3c4d5e6f7g8h9i1", name: "Dhaka University", location: "Shahbag, Dhaka" },
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
        { _id: "a1", name: "John Doe", email: "john.doe@gmail.com", phone: "+8801711223344", university_id: "65e0f1a2b3c4d5e6f7g8h9i0" },
        { _id: "a2", name: "Ms. Farhana", email: "farhana@du.alumni.bd", phone: "+8801999887766", university_id: "65e0f1a2b3c4d5e6f7g8h9i1" },
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
        { _id: "65f1a2b3c4d5e6f7g8h9i0j1", name: "Dr. Abu Rayhan", email: "rayhan@uits.edu.bd", role: "uni_admin", university_id: "65e0f1a2b3c4d5e6f7g8h9i0", created_at: "2026-03-15T10:30:00.000Z" },
      ]);
      console.error("Failed to fetch uni admins:", err);
    } finally {
      setIsUniAdminsLoading(false);
    }
  };

  useEffect(() => {
    if (universitiesList.length === 0) fetchUniversities();
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
    const payload = { name: formData.get("name"), location: formData.get("location") };

    try {
      if (uniModal.mode === "add") await api.post("/universities", payload);
      else await api.put(`/universities/${uniModal.data._id}`, payload);
      
      setUniModal({ isOpen: false, mode: "add", data: null });
      fetchUniversities();
      showToast(`University ${uniModal.mode === "add" ? "added" : "updated"} successfully!`, "success");
    } catch (err) {
      showToast("Failed to save university.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUniversity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this university?")) return;
    try {
      await api.delete(`/universities/${id}`);
      fetchUniversities();
      showToast("University deleted.", "success");
    } catch (err) {
      showToast("Failed to delete university.", "error");
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
        showToast("University Admin created successfully!", "success");
      } else {
        const adminId = formData.get("adminId");
        const payload = { name: formData.get("name") };
        await api.put(`/admin/system/uni-admin/${adminId}`, payload);
        showToast("Admin details updated successfully!", "success");
      }
      setAdminModal({ isOpen: false, mode: "create", data: null });
      if (activeTab === "uni_admins") fetchUniAdmins();
    } catch (err) {
      showToast("Failed to save admin info.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAlumni = async (id) => {
    if (!window.confirm("Are you sure you want to remove this alumni?")) return;
    try {
      await api.delete(`/admin/system/alumni/${id}`);
      fetchAlumni();
      showToast("Alumni deleted.", "success");
    } catch (err) {
      showToast("Failed to delete alumni.", "error");
    }
  };

  // --- REUSABLE NAV ITEM ---
  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => handleNavigation(id)}
        className={`w-full flex items-center relative py-3 px-4 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-sm"
            : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 font-medium"
        } ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}
      >
        {isActive && !isSidebarCollapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-r-full" />
        )}
        <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-slate-600"} ${!isSidebarCollapsed && "mr-3"}`} />
        {!isSidebarCollapsed && <span className="whitespace-nowrap tracking-wide">{label}</span>}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col h-full border-r border-slate-200 transform transition-all duration-300 ease-in-out md:relative ${isMobileMenuOpen ? "translate-x-0 shadow-2xl w-72" : "-translate-x-full md:translate-x-0"} ${isSidebarCollapsed ? "md:w-20" : "md:w-72"}`}>
        
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-transform hover:scale-105">
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-6 flex items-center justify-between md:justify-start gap-3 border-b border-slate-100 ${isSidebarCollapsed ? "md:justify-center px-4" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Shield className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">System Admin</h1>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {!isSidebarCollapsed && <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Dashboard</p>}
          <NavItem id="profile" icon={ShieldCheck} label="Admin Profile" />
          <NavItem id="universities" icon={Building2} label="Universities" />
          <NavItem id="uni_admins" icon={UserCheck} label="University Admins" />
          <NavItem id="alumni" icon={GraduationCap} label="Global Alumni" />
        </nav>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button onClick={logout} className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all ${isSidebarCollapsed ? "px-0" : "px-4"}`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md"><Menu className="w-5 h-5" /></button>
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white"><Shield className="w-4 h-4" /></div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">{userInitial}</div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 pb-12">
          
          {/* TAB: PROFILE */}
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h2>
                <p className="text-slate-500 mt-2 text-sm">Manage your top-level credentials and platform access.</p>
              </header>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative">
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-lg text-white/90 text-xs font-bold tracking-widest border border-white/10 shadow-sm">
                    ID: {user?._id?.slice(-6).toUpperCase() || "SYS-001"}
                  </div>
                </div>
                <div className="px-8 pb-10 relative">
                  <div className="w-28 h-28 bg-white rounded-2xl p-1.5 shadow-lg absolute -top-14 border border-slate-100">
                    <div className="w-full h-full bg-indigo-50 rounded-xl flex items-center justify-center font-extrabold text-indigo-600 text-4xl">
                      {userInitial}
                    </div>
                  </div>
                  <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{user?.name || "Super Administrator"}</h3>
                      <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                        <Mail className="w-4 h-4 text-slate-400" /> <span>{user?.email || "admin@system.local"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold border border-indigo-100 shadow-sm">
                      <ShieldCheck className="w-5 h-5" /> Master Access Level
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: UNIVERSITIES DIRECTORY */}
          {activeTab === "universities" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-5">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Universities</h2>
                  <p className="text-slate-500 mt-2 text-sm">Monitor and manage all registered educational institutions.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setAdminModal({ isOpen: true, mode: "edit", data: null })} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2">
                    <Users className="w-4 h-4" /> Edit Admin
                  </button>
                  <button onClick={() => setUniModal({ isOpen: true, mode: "add", data: null })} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200 flex items-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    <Plus className="w-4 h-4" /> Add University
                  </button>
                </div>
              </div>

              <div className="bg-white p-2 rounded-2xl border border-slate-200 mb-8 flex shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <div className="flex-1 relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4" />
                  <input type="text" placeholder="Search by university name or location..." className="w-full pl-12 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : displayedUniversities.length === 0 ? (
                <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Universities Found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedUniversities.map((uni) => (
                    <div key={uni._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col relative group">
                      
                      {/* Top Action Icons */}
                      <div className="absolute top-4 right-4 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1.5 bg-white p-1 rounded-lg shadow-sm border border-slate-100">
                        <button onClick={() => setUniModal({ isOpen: true, mode: "edit", data: uni })} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteUniversity(uni._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>

                      <div className="flex gap-4 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-xl border border-indigo-100/50 shrink-0 shadow-inner">
                          {(uni.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pr-12 pt-1">
                          <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{uni.name}</h4>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                            <Globe className="w-3.5 h-3.5 text-slate-400" /> {uni.location || "Location not set"}
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 mt-auto">
                        <button onClick={() => setAdminModal({ isOpen: true, mode: "create", data: { university_id: uni._id, university_name: uni.name } })} className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 py-2.5 rounded-xl text-sm font-bold transition-colors border border-slate-200 hover:border-indigo-200">
                          <UserPlus className="w-4 h-4" /> Assign Administrator
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
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">University Admins</h2>
                  <p className="text-slate-500 mt-2 text-sm">Manage localized administrators assigned to institutions.</p>
                </div>
                <button onClick={() => setAdminModal({ isOpen: true, mode: "edit", data: null })} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Admin
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Admin Detail</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Assigned Institution</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Joined Date</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">System ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isUniAdminsLoading ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400">Loading administrators...</td></tr>
                    ) : uniAdminsList.length === 0 ? (
                      <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400">No administrators found.</td></tr>
                    ) : (
                      uniAdminsList.map((admin) => (
                        <tr key={admin._id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                {admin.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{admin.name}</div>
                                <div className="text-slate-500 text-xs mt-0.5 font-medium">{admin.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                              <Building2 className="w-3.5 h-3.5 text-slate-500" /> {getUniversityName(admin.university_id)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                            {new Date(admin.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md text-slate-500 border border-slate-200">
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
          )}

          {/* TAB: GLOBAL ALUMNI */}
          {activeTab === "alumni" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Global Alumni</h2>
                <p className="text-slate-500 mt-2 text-sm">Master directory of all verified alumni records.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Alumni Profile</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Alma Mater</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isAlumniLoading ? (
                      <tr><td colSpan="3" className="px-6 py-12 text-center text-slate-400">Loading alumni records...</td></tr>
                    ) : alumniList.length === 0 ? (
                      <tr><td colSpan="3" className="px-6 py-12 text-center text-slate-400">No alumni found.</td></tr>
                    ) : (
                      alumniList.map((alumni) => (
                        <tr key={alumni._id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200 shadow-sm">
                                {alumni.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-base">{alumni.name}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  {alumni.email && <span className="flex items-center gap-1 text-xs text-slate-500 font-medium"><Mail className="w-3.5 h-3.5 text-slate-400" /> {alumni.email}</span>}
                                  {alumni.phone && <span className="flex items-center gap-1 text-xs text-slate-500 font-medium"><Phone className="w-3.5 h-3.5 text-slate-400" /> {alumni.phone}</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 align-middle">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                              <Building2 className="w-3.5 h-3.5" /> {getUniversityName(alumni.university_id)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right align-middle">
                            <button onClick={() => handleDeleteAlumni(alumni._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block" title="Remove Record">
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
          )}
        </div>
      </main>

      {/* --- MODALS --- */}
      {uniModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-xl text-slate-900">
                {uniModal.mode === "add" ? "Add University" : "Edit University"}
              </h3>
              <button onClick={() => setUniModal({ isOpen: false, mode: "add", data: null })} className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveUniversity} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">University Name</label>
                <input required type="text" name="name" defaultValue={uniModal.data?.name} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="e.g. Dhaka University" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Location</label>
                <input required type="text" name="location" defaultValue={uniModal.data?.location} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="e.g. Dhaka, BD" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setUniModal({ isOpen: false, mode: "add", data: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                  {isSubmitting ? "Saving..." : "Save University"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {adminModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-xl text-slate-900 truncate pr-4">
                {adminModal.mode === "create" ? `New Admin` : "Edit Details"}
              </h3>
              <button onClick={() => setAdminModal({ isOpen: false, mode: "create", data: null })} className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-lg transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAdmin} className="p-6 space-y-5">
              {adminModal.mode === "create" && adminModal.data?.university_name && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-2 flex items-center gap-3">
                   <Building2 className="w-5 h-5 text-indigo-600" />
                   <p className="text-sm font-medium text-indigo-900">Assigning to: <span className="font-bold">{adminModal.data.university_name}</span></p>
                </div>
              )}
              {adminModal.mode === "edit" && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Target Admin ID</label>
                  <input required type="text" name="adminId" className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium font-mono text-sm" placeholder="Paste Admin ID here" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Admin Full Name</label>
                <input required type="text" name="name" className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="e.g. John Smith" />
              </div>
              {adminModal.mode === "create" && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input required type="email" name="email" className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="admin@univ.edu" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Secure Password</label>
                    <input required type="password" name="password" className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="••••••••" />
                  </div>
                </>
              )}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setAdminModal({ isOpen: false, mode: "create", data: null })} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                  {isSubmitting ? "Saving..." : "Save Administrator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}