"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  GraduationCap, 
  Mail, 
  BookOpen,
  Building2,
  CheckCircle2,
  User,
  Users,
  LayoutDashboard,
  LogOut,
  School,
  Briefcase
} from "lucide-react";

import { useAuth } from "../context/authContext"; 
import api from "../services/api"; 

// Custom SVG Icons
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

export default function StudentDashboard() {
  const { user, logout } = useAuth(); 
  const [activeTab, setActiveTab] = useState("profile");
  const [universityName, setUniversityName] = useState("Loading...");

  // Directory States
  const [alumniList, setAlumniList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companySearch, setCompanySearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const departments = ["CSE", "BBA", "EEE", "Civil", "English", "Law"];

  // Fetch University Name by ID
  useEffect(() => {
    const fetchUniversityInfo = async () => {
      try {
        const response = await api.get("/universities");
        const foundUni = response.data.find(uni => uni._id === user?.university_id);
        setUniversityName(foundUni ? foundUni.name : "University Not Found");
      } catch (err) {
        console.error("Error fetching universities:", err);
        setUniversityName("Unknown University");
      }
    };

    if (user?.university_id) {
      fetchUniversityInfo();
    }
  }, [user]);

  // Fetch Alumni Directory
  useEffect(() => {
    if (activeTab !== "directory") return;

    const fetchAlumni = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = {};
        if (departmentFilter) params.department = departmentFilter;
        if (user?.university_id) params.university_id = user.university_id;

        const response = await api.get("/directory", { params });
        const filteredAlumni = response.data.filter(
          (person) => person.role === "alumni" && person.is_verified
        );
        setAlumniList(filteredAlumni);
      } catch (err) {
        setError("Failed to load alumni directory.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumni();
  }, [departmentFilter, user, activeTab]);

  const displayedAlumni = alumniList.filter((alumni) => {
    if (!companySearch) return true;
    return alumni.company?.toLowerCase().includes(companySearch.toLowerCase());
  });

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <aside className="w-72 bg-white flex flex-col h-full shrink-0 hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">UniConnect</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2">
          <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Menu</p>
          
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === "profile" 
                ? "bg-blue-50 text-blue-700 font-semibold shadow-sm ring-1 ring-blue-600/10" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 ${activeTab === "profile" ? "text-blue-600" : "text-slate-400"}`} />
              <span>My Profile</span>
            </div>
            {activeTab === "profile" && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === "directory" 
                ? "bg-blue-50 text-blue-700 font-semibold shadow-sm ring-1 ring-blue-600/10" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className={`w-5 h-5 ${activeTab === "directory" ? "text-blue-600" : "text-slate-400"}`} />
              <span>Alumni Network</span>
            </div>
            {activeTab === "directory" && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
          </button>
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="p-6 space-y-4">
          {user && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl ring-1 ring-slate-900/5">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shadow-inner">
                {user.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 font-medium">Student</p>
              </div>
            </div>
          )}
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors ring-1 ring-red-600/10"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        
        {/* --- TAB: PROFILE --- */}
        {activeTab === "profile" && (
          <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Personal Dashboard</h2>
              <p className="text-slate-500 mt-1 text-lg">Manage your academic identity and connections.</p>
            </header>
            
            {user && (
              <div className="space-y-6">
                {/* Hero Card */}
                <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                  {/* Banner */}
                  <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-xs font-bold tracking-wider ring-1 ring-white/20">
                      ID: {user.university_id?.slice(-6).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="px-8 pb-10 relative">
                    {/* Avatar */}
                    <div className="w-32 h-32 bg-white rounded-[1.5rem] p-2 shadow-xl absolute -top-16 ring-1 ring-slate-900/5">
                      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center font-black text-slate-300 text-6xl shadow-inner">
                        {user.name?.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Name & Badge */}
                    <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 mt-2">
                           <Mail className="w-4 h-4 text-slate-400" />
                           <span className="font-medium text-slate-600">{user.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-bold ring-1 ring-emerald-600/20 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 
                        Verified Student
                      </div>
                    </div>

                    {/* Academic Details Grid */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {/* University Card - Allowing full wrap */}
                      <div className="p-5 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                          <School className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Institution</p>
                        <p className="font-bold text-slate-800 leading-snug break-words">{universityName}</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                        <p className="font-bold text-slate-800">{user.department || "Not Specified"}</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center mb-3">
                          <GraduationCap className="w-5 h-5 text-violet-600" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Graduation Year</p>
                        <p className="font-bold text-slate-800">Class of {user.graduation_year || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB: DIRECTORY --- */}
        {activeTab === "directory" && (
           <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             <div className="mb-8">
               <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Alumni Network</h2>
               <p className="text-slate-500 mt-2 text-lg">
                 Connect with successful graduates from <span className="font-semibold text-slate-700">{universityName}</span>.
               </p>
             </div>

             {/* Search and Filters */}
             <div className="bg-white p-2 rounded-2xl ring-1 ring-slate-900/5 mb-8 flex flex-col md:flex-row gap-2 shadow-sm">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by company (e.g. Google, Meta)..."
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 outline-none"
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[1px] bg-slate-100 hidden md:block my-2"></div>
                <select 
                   className="md:w-64 px-4 py-3.5 bg-transparent border-none focus:ring-0 text-slate-700 font-medium cursor-pointer outline-none appearance-none"
                   value={departmentFilter}
                   onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
             </div>

             {/* Directory Grid */}
             {isLoading ? (
               <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-4">
                 <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                 <p className="font-medium">Searching alumni directory...</p>
               </div>
             ) : error ? (
               <div className="p-6 bg-red-50 text-red-600 rounded-xl text-center font-medium ring-1 ring-red-600/10">
                 {error}
               </div>
             ) : displayedAlumni.length === 0 ? (
               <div className="p-12 bg-white rounded-3xl ring-1 ring-slate-900/5 text-center">
                 <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-lg font-bold text-slate-900">No Alumni Found</h3>
                 <p className="text-slate-500 mt-1">Try adjusting your search or department filter.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {displayedAlumni.map(alumni => (
                   <div 
                     key={alumni._id} 
                     className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-900/5 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                   >
                     {/* Top Section: Avatar & Details */}
                     <div className="flex gap-4 mb-5">
                       <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl ring-1 ring-slate-900/5 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 transition-colors shrink-0 shadow-inner">
                         {alumni.name.charAt(0)}
                       </div>
                       <div className="flex-1 min-w-0 pt-1">
                         <h4 className="font-bold text-slate-900 text-lg leading-tight truncate" title={alumni.name}>
                           {alumni.name}
                         </h4>
                         <p className="text-[13px] text-slate-500 font-medium mt-1">
                           <span className="text-blue-600 font-semibold">{alumni.department || "Dept. N/A"}</span> • Class of {alumni.graduation_year || "N/A"}
                         </p>
                       </div>
                     </div>
                     
                     {/* Middle Section: Career Info */}
                     <div className="mb-6 flex-1 bg-slate-50/50 p-4 rounded-xl ring-1 ring-slate-900/5">
                       <div className="flex items-start gap-3">
                         <Briefcase className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                         <div className="min-w-0">
                           <p className="text-sm font-bold text-slate-800 line-clamp-1" title={alumni.position || "Position not specified"}>
                             {alumni.position || "Professional"}
                           </p> 
                           <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 line-clamp-1" title={alumni.company || "Company not specified"}>
                             <Building2 className="w-3.5 h-3.5" />
                             {alumni.company || "Company not listed"}
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Bottom Section: Actions */}
                     <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                        <a 
                          href={`mailto:${alumni.email}`} 
                          className="flex-1 bg-slate-900 text-white text-center py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:shadow-md hover:shadow-blue-600/20 transition-all"
                        >
                          Send Email
                        </a>
                        
                        {alumni.linkedin_id && (
                          <a 
                            href={alumni.linkedin_id} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:text-[#0A66C2] hover:bg-blue-50 ring-1 ring-slate-900/5 transition-colors"
                            title="LinkedIn Profile"
                          >
                            <LinkedinIcon />
                          </a>
                        )}
                        
                        {alumni.github_id && (
                          <a 
                            href={alumni.github_id} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:text-slate-900 hover:bg-slate-200 ring-1 ring-slate-900/5 transition-colors"
                            title="GitHub Profile"
                          >
                            <GithubIcon />
                          </a>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
        )}
      </main>
    </div>
  );
}