"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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
  AlertCircle
} from "lucide-react";

import { useAuth } from "../context/authContext";
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

export default function AlumniDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const userInitial = (user?.name || "A").charAt(0).toUpperCase();

  const fetchDirectory = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/directory");
      setAlumniData(response.data || []);
    } catch (err) {
      console.error("Failed to fetch directory:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    setIsProfileLoading(true);
    try {
      const response = await api.get("/auth/me");
      setProfile(response.data.user || user);
      setEditForm(response.data.user || user);
    } catch (err) {
      setProfile(user);
      setEditForm(user);
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "directory") fetchDirectory();
    if (activeTab === "profile" && !profile) fetchProfile();
  }, [activeTab]);

  const displayedAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const matchesSearch =
        alumni.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumni.department?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompany =
        !filterCompany ||
        alumni.company?.toLowerCase().includes(filterCompany.toLowerCase());
      return matchesSearch && matchesCompany;
    });
  }, [alumniData, searchQuery, filterCompany]);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      await api.put(`/alumni/${profile._id}`, editForm);
      setProfile(editForm);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          setIsMobileMenuOpen(false);
        }}
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
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 bg-white flex flex-col h-full border-r border-slate-200 transform transition-all duration-300 ease-in-out md:relative ${isMobileMenuOpen ? "translate-x-0 shadow-2xl w-72" : "-translate-x-full md:translate-x-0"} ${isSidebarCollapsed ? "md:w-20" : "md:w-72"}`}>
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-transform hover:scale-105">
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-6 flex items-center justify-between md:justify-start gap-3 border-b border-slate-100 ${isSidebarCollapsed ? "md:justify-center px-4" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            {!isSidebarCollapsed && (
              <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">Alumni Portal</h1>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {!isSidebarCollapsed && <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Dashboard</p>}
          <NavItem id="profile" icon={ShieldCheck} label="My Profile" />
          <NavItem id="directory" icon={Users} label="Alumni Directory" />
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
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h2>
                <p className="text-slate-500 mt-2 text-sm">Manage your personal information and professional details.</p>
              </header>

              {isProfileLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative">
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-lg text-white/90 text-xs font-bold tracking-widest border border-white/10 shadow-sm flex items-center gap-2">
                      {profile?.is_verified ? (
                        <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Alumni</>
                      ) : (
                        <><AlertCircle className="w-4 h-4 text-amber-400" /> Pending Verification</>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-8 pb-10 relative">
                    <div className="w-28 h-28 bg-white rounded-2xl p-1.5 shadow-lg absolute -top-14 border border-slate-100">
                      <div className="w-full h-full bg-indigo-50 rounded-xl flex items-center justify-center font-extrabold text-indigo-600 text-4xl">
                        {(profile?.name || "A").charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{profile?.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                          <Mail className="w-4 h-4 text-slate-400" /> <span>{profile?.email}</span>
                        </div>
                      </div>
                      {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
                          <Edit3 className="w-4 h-4" /> Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-3">
                          <button onClick={() => { setIsEditing(false); setEditForm(profile); }} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                          <button onClick={handleSaveProfile} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      {!isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Info</p>
                              <div className="flex items-center gap-3 text-slate-700 mt-3"><School className="w-5 h-5 text-indigo-500" /> <span className="font-medium">{profile?.department || "N/A"}</span></div>
                              <div className="flex items-center gap-3 text-slate-700 mt-3"><ShieldCheck className="w-5 h-5 text-indigo-500" /> <span className="font-medium">Class of {profile?.graduation_year || "N/A"}</span></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Contact</p>
                              <div className="flex items-center gap-3 text-slate-700 mt-3"><Phone className="w-5 h-5 text-slate-400" /> <span className="font-medium">{profile?.contact_number || "Not provided"}</span></div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Professional Info</p>
                              <div className="flex items-center gap-3 text-slate-700 mt-3"><Building2 className="w-5 h-5 text-indigo-500" /> <span className="font-medium">{profile?.company || "Not provided"}</span></div>
                              <div className="flex items-center gap-3 text-slate-700 mt-3"><Briefcase className="w-5 h-5 text-indigo-500" /> <span className="font-medium">{profile?.position || "Not provided"}</span></div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Social Links</p>
                              <div className="flex flex-col gap-3 mt-3">
                                {profile?.linkedin_id ? <a href={profile.linkedin_id} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium"><LinkedinIcon className="w-4 h-4" /> LinkedIn Profile</a> : <span className="text-slate-400 flex items-center gap-2"><LinkedinIcon className="w-4 h-4" /> No LinkedIn</span>}
                                {profile?.github_id ? <a href={profile.github_id} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:underline font-medium"><GithubIcon className="w-4 h-4" /> GitHub Profile</a> : <span className="text-slate-400 flex items-center gap-2"><GithubIcon className="w-4 h-4" /> No GitHub</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Company</label><input type="text" name="company" value={editForm.company || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Position</label><input type="text" name="position" value={editForm.position || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Number</label><input type="text" name="contact_number" value={editForm.contact_number || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">Graduation Year</label><input type="number" name="graduation_year" value={editForm.graduation_year || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">LinkedIn URL</label><input type="url" name="linkedin_id" value={editForm.linkedin_id || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                          <div><label className="block text-sm font-bold text-slate-700 mb-1.5">GitHub URL</label><input type="url" name="github_id" value={editForm.github_id || ""} onChange={handleEditChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all" /></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "directory" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Alumni Directory</h2>
                <p className="text-slate-500 mt-2 text-sm">Connect with verified graduates from your university.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute ml-4" />
                  <input type="text" placeholder="Search by name or department..." className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="md:w-72 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all flex items-center">
                  <Filter className="w-5 h-5 text-slate-400 absolute ml-4" />
                  <input type="text" placeholder="Filter by company..." className="w-full pl-12 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder:text-slate-400 font-medium" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} />
                </div>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
              ) : displayedAlumni.length === 0 ? (
                <div className="p-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-slate-400" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">No Alumni Found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedAlumni.map((alumni) => (
                    <div key={alumni._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col relative">
                      <div className="flex gap-4 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-700 rounded-xl flex items-center justify-center font-extrabold text-xl border border-indigo-100/50 shrink-0 shadow-inner">
                          {(alumni.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{alumni.name}</h4>
                            {alumni.is_verified && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" title="Verified" />}
                          </div>
                          <div className="text-sm text-slate-500 font-medium">Class of {alumni.graduation_year}</div>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1 mb-6">
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <School className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.department}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.company || "Not Specified"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-medium truncate">{alumni.position || "Not Specified"}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-auto">
                        {alumni.linkedin_id && (
                          <a href={alumni.linkedin_id} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 hover:border-indigo-200 flex-1 flex justify-center">
                            <LinkedinIcon className="w-4 h-4" />
                          </a>
                        )}
                        {alumni.github_id && (
                          <a href={alumni.github_id} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 hover:border-indigo-200 flex-1 flex justify-center">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {alumni.email && (
                          <a href={`mailto:${alumni.email}`} className="p-2 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200 hover:border-indigo-200 flex-1 flex justify-center">
                            <Mail className="w-4 h-4" />
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