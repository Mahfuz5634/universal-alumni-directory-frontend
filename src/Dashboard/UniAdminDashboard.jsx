"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Briefcase,
  User,
  School,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export default function UniAdminDashboard() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("students");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [students, setStudents] = useState([]);
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [verifiedAlumni, setVerifiedAlumni] = useState([]);
  const [universityName, setUniversityName] = useState("Loading University...");
  const [isLoading, setIsLoading] = useState(true);

  const [studentSearch, setStudentSearch] = useState("");
  const [pendingSearch, setPendingSearch] = useState("");
  const [verifiedSearch, setVerifiedSearch] = useState("");

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    confirmBg: "",
    iconBg: "",
    iconColor: "",
    icon: null,
    onConfirm: () => {},
  });

  const userInitial = (user?.name || "A").charAt(0).toUpperCase();

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [studentsRes, directoryRes, uniRes] = await Promise.all([
        api.get("/admin/uni/all-students"),
        api.get("/directory"),
        api.get("/universities")
      ]);

      setStudents(studentsRes.data || []);
      
      const allAlumni = directoryRes.data || [];
      setPendingAlumni(allAlumni.filter(a => a.role === "alumni" && !a.is_verified));
      setVerifiedAlumni(allAlumni.filter(a => a.role === "alumni" && a.is_verified));

      if (user?.university_id && uniRes.data) {
        const foundUni = uniRes.data.find(u => u._id === user.university_id);
        setUniversityName(foundUni ? foundUni.name : "Unknown University");
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
      showToast("Failed to load dashboard data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const displayedStudents = useMemo(() => {
    return students.filter(s => 
      s.name?.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.department?.toLowerCase().includes(studentSearch.toLowerCase())
    );
  }, [students, studentSearch]);

  const displayedPending = useMemo(() => {
    return pendingAlumni.filter(a => 
      a.name?.toLowerCase().includes(pendingSearch.toLowerCase()) ||
      a.department?.toLowerCase().includes(pendingSearch.toLowerCase())
    );
  }, [pendingAlumni, pendingSearch]);

  const displayedVerified = useMemo(() => {
    return verifiedAlumni.filter(a => 
      a.name?.toLowerCase().includes(verifiedSearch.toLowerCase()) ||
      a.department?.toLowerCase().includes(verifiedSearch.toLowerCase())
    );
  }, [verifiedAlumni, verifiedSearch]);

  const confirmVerify = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Approve Alumni",
      message: "Are you sure you want to approve and verify this alumni?",
      confirmText: "Approve & Verify",
      confirmBg: "bg-emerald-600 hover:bg-emerald-700",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: CheckCircle2,
      onConfirm: () => executeVerify(id),
    });
  };

  const executeVerify = async (id) => {
    try {
      await api.put(`/admin/uni/verify/${id}`);
      setConfirmModal({ ...confirmModal, isOpen: false });
      setIsProfileModalOpen(false);
      fetchDashboardData();
      showToast("Alumni approved and verified successfully!", "success");
    } catch (err) {
      showToast("Failed to verify alumni.", "error");
    }
  };

  const confirmReject = (id, isVerified = false) => {
    setConfirmModal({
      isOpen: true,
      title: isVerified ? "Revoke & Delete" : "Reject Application",
      message: isVerified
        ? "Are you sure you want to revoke verification and permanently remove this alumni?"
        : "Are you sure you want to reject and permanently delete this application?",
      confirmText: isVerified ? "Revoke & Remove" : "Reject & Delete",
      confirmBg: "bg-red-600 hover:bg-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      icon: Trash2,
      onConfirm: () => executeReject(id, isVerified),
    });
  };

  const executeReject = async (id, isVerified) => {
    try {
      if (isVerified) {
        await api.put(`/admin/uni/unverify/${id}`);
      }
      await api.delete(`/admin/uni/alumni/${id}`);
      setConfirmModal({ ...confirmModal, isOpen: false });
      setIsProfileModalOpen(false);
      fetchDashboardData();
      showToast(isVerified ? "Alumni verification revoked and profile removed." : "Alumni application rejected.", "success");
    } catch (err) {
      showToast("Failed to process the request.", "error");
    }
  };

  const confirmDeleteStudent = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Remove Student",
      message: "Are you sure you want to permanently remove this student from the directory?",
      confirmText: "Remove Student",
      confirmBg: "bg-red-600 hover:bg-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      icon: Trash2,
      onConfirm: () => executeDeleteStudent(id),
    });
  };

  const executeDeleteStudent = async (id) => {
    try {
      await api.delete(`/admin/uni/student/${id}`);
      setConfirmModal({ ...confirmModal, isOpen: false });
      fetchDashboardData();
      showToast("Student removed successfully.", "success");
    } catch (err) {
      showToast("Failed to remove student.", "error");
    }
  };

  const openProfile = (profile) => {
    setSelectedProfile(profile);
    setIsProfileModalOpen(true);
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ id, icon: Icon, label, badge }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => handleNavigation(id)}
        className={`w-full flex items-center relative py-3 px-4 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-sm"
            : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 font-medium"
        } ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
      >
        {isActive && !isSidebarCollapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-r-full" />
        )}
        <div className="flex items-center">
          <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-slate-600"} ${!isSidebarCollapsed && "mr-3"}`} />
          {!isSidebarCollapsed && <span className="whitespace-nowrap tracking-wide">{label}</span>}
        </div>
        {!isSidebarCollapsed && badge > 0 && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isActive ? "bg-indigo-200 text-indigo-800" : "bg-slate-200 text-slate-600"}`}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col h-full border-r border-slate-200 transform transition-all duration-300 ease-in-out md:relative ${isMobileMenuOpen ? "translate-x-0 shadow-2xl w-72" : "-translate-x-full md:translate-x-0"} ${isSidebarCollapsed ? "md:w-20" : "md:w-72"}`}>
        
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-transform hover:scale-105">
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-6 flex items-start justify-between md:justify-start gap-3 border-b border-slate-100 ${isSidebarCollapsed ? "md:justify-center px-4" : ""}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col overflow-hidden pr-2">
                <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">Uni Admin</h1>
                <span className="text-xs font-semibold text-indigo-600 truncate" title={universityName}>
                  {universityName}
                </span>
              </div>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 -mr-2 text-slate-400 hover:bg-slate-50 rounded-lg shrink-0"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {!isSidebarCollapsed && <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Management</p>}
          <NavItem id="students" icon={GraduationCap} label="Current Students" badge={students.length} />
          <NavItem id="pending" icon={Users} label="Verification Requests" badge={pendingAlumni.length} />
          <NavItem id="verified" icon={CheckCircle2} label="Verified Alumni" badge={verifiedAlumni.length} />
        </nav>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button onClick={logout} className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all ${isSidebarCollapsed ? "px-0" : "px-4"}`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md"><Menu className="w-5 h-5" /></button>
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center text-white"><ShieldCheck className="w-4 h-4" /></div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">{userInitial}</div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 pb-12">
          
          {activeTab === "students" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Current Students</h2>
                <p className="text-slate-500 mt-2 text-sm">Manage enrolled students at {universityName}.</p>
              </div>

              <div className="bg-white p-2 rounded-2xl border border-slate-200 mb-8 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute ml-4" />
                <input type="text" placeholder="Search by name or department..." className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : displayedStudents.length === 0 ? (
                <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><GraduationCap className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Students Found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedStudents.map((student) => (
                    <div key={student._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col relative group">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => confirmDeleteStudent(student._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Remove Student">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-xl border border-indigo-100/50 shrink-0 shadow-inner">
                          {(student.name || "S").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pr-8 pt-1">
                          <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 truncate">{student.name}</h4>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> <span className="truncate">{student.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <School className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{student.department || "Dept. N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium">Class of {student.graduation_year || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "pending" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verification Requests</h2>
                <p className="text-slate-500 mt-2 text-sm">Review and approve new alumni registrations for {universityName}.</p>
              </div>

              <div className="bg-white p-2 rounded-2xl border border-slate-200 mb-8 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute ml-4" />
                <input type="text" placeholder="Search pending requests..." className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={pendingSearch} onChange={(e) => setPendingSearch(e.target.value)} />
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : displayedPending.length === 0 ? (
                <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Pending Requests</h3>
                  <p className="text-slate-500 text-sm">All alumni registrations have been processed.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPending.map((alumni) => (
                    <div key={alumni._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col relative">
                      <div className="flex gap-4 mb-5">
                        <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center font-extrabold text-xl border border-amber-100/50 shrink-0 shadow-inner">
                          {(alumni.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 truncate">{alumni.name}</h4>
                          <p className="text-sm text-slate-500 font-medium">Class of {alumni.graduation_year}</p>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1 mb-6">
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <School className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.department || "Dept. N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.position || "N/A"} at {alumni.company || "N/A"}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 mt-auto">
                         <button onClick={() => openProfile(alumni)} className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl text-sm font-bold transition-colors border border-slate-200 hover:border-indigo-200">
                           <Eye className="w-4 h-4" /> Review
                         </button>
                         <button onClick={() => confirmVerify(alumni._id)} className="flex items-center justify-center gap-1.5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-sm font-bold transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                           <CheckCircle2 className="w-4 h-4" /> Approve
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "verified" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verified Alumni</h2>
                <p className="text-slate-500 mt-2 text-sm">Manage approved graduates in your {universityName} network.</p>
              </div>

              <div className="bg-white p-2 rounded-2xl border border-slate-200 mb-8 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute ml-4" />
                <input type="text" placeholder="Search verified alumni..." className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={verifiedSearch} onChange={(e) => setVerifiedSearch(e.target.value)} />
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : displayedVerified.length === 0 ? (
                <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Verified Alumni</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedVerified.map((alumni) => (
                    <div key={alumni._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col relative group">
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button onClick={() => openProfile(alumni)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Profile">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => confirmReject(alumni._id, true)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revoke & Remove">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-4 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-xl border border-indigo-100/50 shrink-0 shadow-inner">
                          {(alumni.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pr-12 pt-1">
                          <div className="flex items-start justify-between">
                             <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 truncate pr-2">{alumni.name}</h4>
                             <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" title="Verified" />
                          </div>
                          <p className="text-sm text-slate-500 font-medium">Class of {alumni.graduation_year}</p>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <School className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.department || "Dept. N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.position || "N/A"} at {alumni.company || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {isProfileModalOpen && selectedProfile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col relative">
            
            <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-1">
              <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative">
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-lg text-white/90 text-xs font-bold tracking-widest border border-white/10 shadow-sm flex items-center gap-2">
                  {selectedProfile.is_verified ? (
                    <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified</>
                  ) : (
                    <><ShieldCheck className="w-4 h-4 text-amber-400" /> Pending Verification</>
                  )}
                </div>
              </div>

              <div className="px-8 pb-8 relative">
                <div className="w-24 h-24 bg-white rounded-2xl p-1.5 shadow-lg absolute -top-12 border border-slate-100">
                  <div className="w-full h-full bg-indigo-50 rounded-xl flex items-center justify-center font-extrabold text-indigo-600 text-3xl">
                    {(selectedProfile.name || "A").charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="pt-16 pb-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedProfile.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500"><Mail className="w-4 h-4 text-slate-400" /> {selectedProfile.email}</span>
                      {selectedProfile.phone && <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500"><Phone className="w-4 h-4 text-slate-400" /> {selectedProfile.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Academic Info</p>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><School className="w-4 h-4 text-indigo-500" /> {selectedProfile.department || "N/A"}</div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Calendar className="w-4 h-4 text-indigo-500" /> Class of {selectedProfile.graduation_year || "N/A"}</div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><User className="w-4 h-4 text-indigo-500" /> Roll: {selectedProfile.student_roll_no || "N/A"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Professional Info</p>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Building2 className="w-4 h-4 text-indigo-500" /> {selectedProfile.company || "Not provided"}</div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Briefcase className="w-4 h-4 text-indigo-500" /> {selectedProfile.position || "Not provided"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Social Links</p>
                   <div className="flex gap-3">
                     {selectedProfile.linkedin_id ? (
                        <a href={selectedProfile.linkedin_id} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-[#0A66C2] rounded-lg text-sm font-semibold border border-slate-200 hover:border-[#0A66C2] transition-colors"><LinkedinIcon className="w-4 h-4" /> LinkedIn</a>
                     ) : <span className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-semibold border border-slate-100"><LinkedinIcon className="w-4 h-4" /> No LinkedIn</span>}
                     {selectedProfile.github_id ? (
                        <a href={selectedProfile.github_id} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-900 rounded-lg text-sm font-semibold border border-slate-200 hover:border-slate-900 transition-colors"><GithubIcon className="w-4 h-4" /> GitHub</a>
                     ) : <span className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-semibold border border-slate-100"><GithubIcon className="w-4 h-4" /> No GitHub</span>}
                   </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
              <button onClick={() => confirmReject(selectedProfile._id, selectedProfile.is_verified)} className="px-5 py-2.5 text-sm font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-colors">
                {selectedProfile.is_verified ? "Revoke & Delete" : "Reject Application"}
              </button>
              {!selectedProfile.is_verified && (
                <button onClick={() => confirmVerify(selectedProfile._id)} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Approve & Verify
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className={`w-12 h-12 rounded-full ${confirmModal.iconBg} flex items-center justify-center mb-4`}>
                <confirmModal.icon className={`w-6 h-6 ${confirmModal.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{confirmModal.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{confirmModal.message}</p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={confirmModal.onConfirm} className={`px-4 py-2 text-sm font-bold text-white ${confirmModal.confirmBg} rounded-xl transition-colors shadow-sm`}>
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}