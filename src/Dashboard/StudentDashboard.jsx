"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  GraduationCap,
  Mail,
  BookOpen,
  Building2,
  CheckCircle2,
  User,
  Users,
  LogOut,
  School,
  Briefcase,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [universityName, setUniversityName] = useState("Loading...");

  // Directory States
  const [alumniList, setAlumniList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companySearch, setCompanySearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const departments = ["CSE", "BBA", "EEE", "Civil", "English", "Law"];

  ial;
  const userInitial = (user?.name || "U").charAt(0).toUpperCase();

  // Fetch University Name by ID
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
          (person) => person.role === "alumni" && person.is_verified,
        );
        setAlumniList(filteredAlumni);
      } catch (err) {
        setError("Failed to load alumni directory. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumni();
  }, [departmentFilter, user?.university_id, activeTab]);

  // Memoize filtered results for performance
  const displayedAlumni = useMemo(() => {
    return alumniList.filter((alumni) => {
      if (!companySearch) return true;
      return alumni.company
        ?.toLowerCase()
        .includes(companySearch.toLowerCase());
    });
  }, [alumniList, companySearch]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
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
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-indigo-600 shadow-sm z-50 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1
              className={`font-bold text-lg tracking-tight text-slate-900 leading-tight transition-opacity duration-200 whitespace-nowrap overflow-hidden ${isSidebarCollapsed ? "md:hidden" : "block"}`}
            >
              Alumni Portal
            </h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
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

          <button
            onClick={() => handleNavigation("profile")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <User
                className={`w-5 h-5 shrink-0 ${activeTab === "profile" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                My Profile
              </span>
            </div>
            {activeTab === "profile" && !isSidebarCollapsed && (
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0"></div>
            )}
          </button>

          <button
            onClick={() => handleNavigation("directory")}
            className={`w-full flex items-center relative py-2.5 rounded-lg transition-all duration-200 ${
              activeTab === "directory"
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
            } ${isSidebarCollapsed ? "md:justify-center px-0" : "px-3 justify-between"}`}
          >
            <div
              className={`flex items-center ${isSidebarCollapsed ? "" : "gap-3"}`}
            >
              <Users
                className={`w-5 h-5 shrink-0 ${activeTab === "directory" ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span
                className={`whitespace-nowrap ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                Directory
              </span>
            </div>
            {activeTab === "directory" && !isSidebarCollapsed && (
              <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full shrink-0"></div>
            )}
          </button>
        </nav>

        <div
          className={`p-4 border-t border-slate-200 bg-slate-50/50 transition-all ${isSidebarCollapsed ? "md:px-2" : ""}`}
        >
          {user && (
            <div
              className={`flex items-center gap-3 mb-4 px-2 ${isSidebarCollapsed ? "md:justify-center" : ""}`}
            >
              <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200">
                {userInitial}
              </div>
              <div
                className={`flex-1 min-w-0 ${isSidebarCollapsed ? "md:hidden" : "block"}`}
              >
                <p
                  className="text-sm font-semibold text-slate-900 truncate"
                  title={user.name}
                >
                  {user.name || "Student"}
                </p>
                <p
                  className="text-xs text-slate-500 truncate"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>
            </div>
          )}
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
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
            {userInitial}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "profile" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-5xl mx-auto animate-in fade-in duration-300">
              <header className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Personal Dashboard
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Manage your academic identity and directory presence.
                </p>
              </header>

              {user && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-32 bg-slate-900 relative">
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-slate-300 text-xs font-semibold tracking-wider border border-white/10">
                        ID:{" "}
                        {user.university_id?.slice(-6).toUpperCase() || "N/A"}
                      </div>
                    </div>

                    <div className="px-6 md:px-8 pb-8 relative">
                      <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-sm absolute -top-12 border border-slate-200">
                        <div className="w-full h-full bg-slate-50 rounded-lg flex items-center justify-center font-bold text-slate-400 text-3xl">
                          {userInitial}
                        </div>
                      </div>

                      {/* Name & Badge */}
                      <div className="pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {user.name || "Student"}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-500 mt-1.5 text-sm">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-xs font-semibold border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Verified Student
                        </div>
                      </div>

                      {/* Academic Details Grid */}
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
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Department
                            </p>
                            <p className="text-sm font-medium text-slate-900 leading-tight">
                              {user.department || "Not Specified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-50 rounded-md border border-slate-100 text-slate-500">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                              Graduation
                            </p>
                            <p className="text-sm font-medium text-slate-900 leading-tight">
                              Class of {user.graduation_year || "N/A"}
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

          {/* --- TAB: DIRECTORY --- */}
          {activeTab === "directory" && (
            <div className="p-4 md:p-8 lg:px-12 lg:py-10 max-w-7xl mx-auto animate-in fade-in duration-300">
              <div className="mb-8 pt-2 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  Alumni Directory
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Browse and connect with registered alumni from{" "}
                  {universityName}.
                </p>
              </div>

              {/* Search and Filters */}
              <div className="bg-white p-2 rounded-xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-2 shadow-sm">
                <div className="flex-1 relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Search by company..."
                    className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-[1px] bg-slate-200 hidden md:block my-1"></div>
                <select
                  className="md:w-56 px-3 py-2 bg-slate-50 md:bg-transparent rounded-md md:rounded-none border-none focus:ring-0 text-sm text-slate-700 font-medium cursor-pointer outline-none"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Directory Grid */}
              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-sm font-medium">Loading directory...</p>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                  {error}
                </div>
              ) : displayedAlumni.length === 0 ? (
                <div className="p-12 bg-white rounded-xl border border-slate-200 text-center shadow-sm">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Alumni Found
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Try modifying your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedAlumni.map((alumni) => (
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
                        <a
                          href={`mailto:${alumni.email}`}
                          className="flex-1 bg-white border border-slate-200 text-slate-700 text-center py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
                        >
                          Email
                        </a>

                        {alumni.linkedin_id && (
                          <a
                            href={alumni.linkedin_id}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn profile for ${alumni.name}`}
                            className="p-2 bg-white text-slate-500 rounded-lg border border-slate-200 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
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
                            aria-label={`GitHub profile for ${alumni.name}`}
                            className="p-2 bg-white text-slate-500 rounded-lg border border-slate-200 hover:text-slate-900 hover:border-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
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
        </div>
      </main>
    </div>
  );
}
