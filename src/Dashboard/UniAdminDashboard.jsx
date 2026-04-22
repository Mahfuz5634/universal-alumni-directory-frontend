import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../services/api"; // আপনার Axios instance যেখানে Token Header-এ সেট করা আছে
import { useAuth } from "../context/authContext";

// --- SVG Icons ---
const Icons = {
  Dashboard: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Users: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  AcademicCap: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  Search: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  Logout: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>,
  Trash: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  CheckBadge: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
  XMark: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
  Filter: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" /></svg>,
  Eye: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
};

export default function UniAdminDashboard() {
  const [activeTab, setActiveTab] = useState("alumni-management");
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-[#09090b] border-r border-slate-800 transition-all duration-300 flex flex-col z-20 shrink-0">
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-4">
          <div className="flex items-center gap-3 w-full px-2">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs tracking-wider">UA</span>
            </div>
            <span className="text-slate-100 font-semibold text-sm tracking-wide truncate">Uni Portal</span>
          </div>
        </div>
        
        <nav className="flex-1 mt-6 space-y-1 px-3">
          <NavItem active={activeTab === "alumni-management"} label="Alumni Management" icon={<Icons.AcademicCap />} onClick={() => setActiveTab("alumni-management")} />
          <NavItem active={activeTab === "student-management"} label="Students" icon={<Icons.Users />} onClick={() => setActiveTab("student-management")} />
          <NavItem active={activeTab === "directory"} label="Alumni Directory" icon={<Icons.Search />} onClick={() => setActiveTab("directory")} />
        </nav>
        
        <div className="mt-auto border-t border-slate-800 p-3">
          <button onClick={handleLogout} className="w-full flex items-center px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-all">
            <Icons.Logout />
            <span className="ml-3 text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800 capitalize tracking-tight">
            {activeTab.replace("-", " ")}
          </h1>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">University Admin</p>
            </div>
            <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-emerald-600">
              <Icons.Dashboard />
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto w-full h-full">
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg border flex items-center shadow-sm transition-all animate-fade-in-down ${
              message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          <div className="max-w-6xl mx-auto animate-fade-in pb-12">
            {activeTab === "alumni-management" && <AlumniManagementTab showMsg={showMsg} />}
            {activeTab === "student-management" && <StudentManagementTab showMsg={showMsg} />}
            {activeTab === "directory" && <DirectoryTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sidebar Helper ---
const NavItem = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
      active ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`}
  >
    <div className={`${active ? "text-emerald-400" : "text-slate-400"} transition-colors`}>{icon}</div>
    <span className="ml-3 text-sm font-medium">{label}</span>
  </button>
);

// --- TABS ---

// 1. Alumni Management (Verify, Unverify, Delete, View Profile)
const AlumniManagementTab = ({ showMsg }) => {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchAlumniList();
  }, []);

  const fetchAlumniList = async () => {
    try {
      // Assuming this endpoint returns all alumni (verified/unverified) for this uni admin
      const res = await api.get('/admin/uni/alumni'); 
      setAlumniList(res.data || []);
    } catch (err) {
      showMsg("error", "Failed to fetch alumni records.");
      setAlumniList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      await api.put(`/admin/uni/verify/${id}`);
      setAlumniList(prev => prev.map(a => a._id === id ? { ...a, is_verified: true } : a));
      showMsg("success", "Alumni successfully verified.");
    } catch (err) {
      showMsg("error", "Failed to verify alumni.");
    }
  };

  const handleUnverify = async (id) => {
    try {
      await api.put(`/admin/uni/unverify/${id}`);
      setAlumniList(prev => prev.map(a => a._id === id ? { ...a, is_verified: false } : a));
      showMsg("success", "Alumni verification revoked.");
    } catch (err) {
      showMsg("error", "Failed to revoke verification.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this alumni?")) return;
    try {
      await api.delete(`/admin/uni/alumni/${id}`);
      setAlumniList(prev => prev.filter(a => a._id !== id));
      showMsg("success", "Alumni deleted permanently.");
    } catch (err) {
      showMsg("error", "Failed to delete alumni.");
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

  if (loading) return <div className="text-center py-10 text-slate-500 font-medium">Loading Alumni Data...</div>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-white">
        <h3 className="text-base font-semibold text-slate-900">Alumni Verification & Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Alumni Details</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Dept & Year</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alumniList.map((alumni) => (
              <tr key={alumni._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900">{alumni.name}</div>
                  <div className="text-xs text-slate-500">{alumni.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {alumni.department} <span className="text-slate-400">({alumni.graduation_year})</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {alumni.is_verified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Icons.CheckBadge /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
                  <button onClick={() => viewProfile(alumni._id)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Profile">
                    <Icons.Eye />
                  </button>
                  
                  {alumni.is_verified ? (
                    <button onClick={() => handleUnverify(alumni._id)} className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 shadow-sm" title="Revoke Verification">
                      Unverify
                    </button>
                  ) : (
                    <button onClick={() => handleVerify(alumni._id)} className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 shadow-sm">
                      Verify
                    </button>
                  )}
                  
                  <button onClick={() => handleDelete(alumni._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete Account">
                    <Icons.Trash />
                  </button>
                </td>
              </tr>
            ))}
            {alumniList.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-500">No alumni records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-down">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-900">Alumni Profile</h3>
              <button onClick={() => setSelectedProfile(null)} className="text-slate-400 hover:text-slate-700">
                <Icons.XMark />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Full Name</p>
                <p className="text-slate-900">{selectedProfile.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Email</p>
                <p className="text-slate-900">{selectedProfile.email}</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Department</p>
                  <p className="text-slate-900">{selectedProfile.department}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Graduation Year</p>
                  <p className="text-slate-900">{selectedProfile.graduation_year}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-right">
              <button onClick={() => setSelectedProfile(null)} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Student Management (Delete Student)
const StudentManagementTab = ({ showMsg }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Assuming this endpoint returns current students for this uni admin
      const res = await api.get('/admin/uni/students');
      setStudents(res.data || []);
    } catch (err) {
      showMsg("error", "Failed to fetch student records.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this student?")) return;
    try {
      await api.delete(`/admin/uni/student/${id}`);
      setStudents(prev => prev.filter(s => s._id !== id));
      showMsg("success", "Student record deleted.");
    } catch (err) {
      showMsg("error", "Failed to delete student.");
    }
  };

  if (loading) return <div className="text-center py-10 text-slate-500 font-medium">Loading Student Data...</div>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-white">
        <h3 className="text-base font-semibold text-slate-900">Current Students Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Student Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">ID & Dept</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900">{student.name}</div>
                  <div className="text-xs text-slate-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <span className="font-medium text-slate-800">{student.student_id}</span> • {student.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleDelete(student._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-md border border-red-100 hover:bg-red-100 transition-colors">
                    <Icons.Trash /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-sm text-slate-500">No student records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 3. Verified Alumni Directory with Filters
const DirectoryTab = () => {
  const [directory, setDirectory] = useState([]);
  const [filters, setFilters] = useState({ department: "", graduation_year: "", company: "" });
  const [loading, setLoading] = useState(true);

  const fetchDirectory = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.graduation_year) params.append("graduation_year", filters.graduation_year);
      if (filters.company) params.append("company", filters.company);

      const res = await api.get(`/directory?${params.toString()}`);
      setDirectory(res.data || []);
    } catch (err) {
      console.error(err);
      setDirectory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Filters Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Department</label>
          <input name="department" placeholder="e.g. CSE" onChange={handleFilterChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Grad Year</label>
          <input name="graduation_year" placeholder="e.g. 2023" onChange={handleFilterChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Company</label>
          <input name="company" placeholder="e.g. Google" onChange={handleFilterChange} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <button onClick={fetchDirectory} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <Icons.Filter /> Filter
        </button>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 font-medium">Loading Directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {directory.map((person) => (
            <div key={person._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{person.name}</h4>
                  <p className="text-xs text-slate-500">{person.department} • {person.graduation_year}</p>
                </div>
              </div>
              {person.company && (
                 <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                   Works at <span className="text-slate-900">{person.company}</span>
                 </div>
              )}
            </div>
          ))}
          {directory.length === 0 && (
             <div className="col-span-full py-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
               <p className="text-slate-500 text-sm">No verified alumni found matching the criteria.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};