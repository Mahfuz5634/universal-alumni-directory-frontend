import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/authContext";

// --- SVG Icons ---
const Icons = {
  Dashboard: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  Building: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>,
  Users: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
  AcademicCap: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  Search: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  Link: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
  Logout: () => <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
};

export default function SystemAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State
  const [universities, setUniversities] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [stats, setStats] = useState({ unis: 0, admins: 0, alumni: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Destructure logout function
  const { logout } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [uniRes, alumniRes] = await Promise.all([
        api.get("/universities"),
        api.get("/admin/system/all-alumni"),
      ]);

      const uniData = uniRes.data || [];
      const alumniData = alumniRes.data || [];

      setUniversities(uniData);
      setAlumni(alumniData);
      setStats({
        unis: uniData.length,
        admins: 24, 
        alumni: alumniData.length,
      });
    } catch (error) {
      showMsg("error", "Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* --- Sidebar --- */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#0f172a] transition-all duration-300 flex flex-col shadow-2xl z-20`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-800 px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            {sidebarOpen && <span className="text-white font-bold tracking-wide truncate">Admin Portal</span>}
          </div>
        </div>
        
        <nav className="flex-1 mt-6 space-y-1.5 px-3">
          <NavItem active={activeTab === "overview"} label="Overview" icon={<Icons.Dashboard />} collapsed={!sidebarOpen} onClick={() => setActiveTab("overview")} />
          <NavItem active={activeTab === "universities"} label="Universities" icon={<Icons.Building />} collapsed={!sidebarOpen} onClick={() => setActiveTab("universities")} />
          <NavItem active={activeTab === "uni-admins"} label="Admins" icon={<Icons.Users />} collapsed={!sidebarOpen} onClick={() => setActiveTab("uni-admins")} />
          <NavItem active={activeTab === "alumni-directory"} label="Alumni" icon={<Icons.AcademicCap />} collapsed={!sidebarOpen} onClick={() => setActiveTab("alumni-directory")} />
        </nav>
        
        {/* Bottom Actions Container */}
        <div className="mt-auto border-t border-slate-800">
          <button 
            onClick={logout}
            className={`w-full flex items-center p-4 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <Icons.Logout />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">Log out</span>}
          </button>
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-4 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center justify-center border-t border-slate-800"
          >
            {sidebarOpen ? <span className="text-sm font-medium">← Collapse Sidebar</span> : "→"}
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
            {activeTab.replace("-", " ")}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">Super Admin</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm">
              <Icons.Users />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="p-8 overflow-y-auto w-full h-full">
          {/* Toast Notification */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl shadow-lg border-l-4 flex items-center transition-all animate-fade-in-down ${
              message.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-emerald-50 border-emerald-500 text-emerald-700'
            }`}>
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
              <p className="text-slate-500 font-medium">Syncing Data...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto animate-fade-in">
              {activeTab === "overview" && <OverviewTab stats={stats} />}
              {activeTab === "universities" && <UniversitiesTab universities={universities} refresh={fetchDashboardData} showMsg={showMsg} />}
              {activeTab === "uni-admins" && <UniAdminsTab universities={universities} showMsg={showMsg} />}
              {activeTab === "alumni-directory" && <AlumniDirectoryTab alumni={alumni} universities={universities} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Helper UI Components ---

const NavItem = ({ active, label, icon, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
        : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
    }`}
  >
    <div className={`${active ? "text-white" : "text-slate-400 group-hover:text-white"} transition-colors`}>
      {icon}
    </div>
    {!collapsed && <span className="ml-3.5 text-sm font-medium tracking-wide">{label}</span>}
  </button>
);

const StatCard = ({ title, value, gradient, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
    <div>
      <p className="text-sm text-slate-500 font-medium mb-2">{title}</p>
      <p className="text-4xl font-bold text-slate-800">{value}</p>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient} shadow-md`}>
      {icon}
    </div>
  </div>
);

// --- Tab Content Components ---

const OverviewTab = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatCard title="Total Universities" value={stats.unis} gradient="from-blue-500 to-indigo-600" icon={<Icons.Building />} />
    <StatCard title="Active Admins" value={stats.admins} gradient="from-emerald-400 to-teal-500" icon={<Icons.Dashboard />} />
    <StatCard title="Global Alumni" value={stats.alumni} gradient="from-violet-500 to-purple-600" icon={<Icons.AcademicCap />} />
  </div>
);

const UniversitiesTab = ({ universities, refresh, showMsg }) => {
  const [newUni, setNewUni] = useState({ name: "", location: "", website: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/universities", newUni);
      showMsg("success", "University registered successfully!");
      setNewUni({ name: "", location: "", website: "" });
      refresh();
    } catch (err) {
      showMsg("error", "Failed to register university.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Registration Card */}
      <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800">Register New Institution</h3>
          <p className="text-sm text-slate-500">Add a new university to the system network.</p>
        </div>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-start">
          <input
            className="flex-1 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition text-sm"
            placeholder="Institution Name"
            value={newUni.name}
            onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
            required
          />
          <input
            className="flex-1 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition text-sm"
            placeholder="City, Country"
            value={newUni.location}
            onChange={(e) => setNewUni({ ...newUni, location: e.target.value })}
          />
          <input
            className="flex-1 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition text-sm"
            placeholder="https://website.edu"
            value={newUni.website}
            onChange={(e) => setNewUni({ ...newUni, website: e.target.value })}
          />
          <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-all">
            Add University
          </button>
        </form>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Partner Universities</h3>
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{universities.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-4 pl-6">Institution</th>
                <th className="p-4">Location</th>
                <th className="p-4">Website Link</th>
                <th className="p-4 pr-6 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {universities.map((uni) => (
                <tr key={uni._id} className="hover:bg-slate-50/80 transition group">
                  <td className="p-4 pl-6 font-semibold text-slate-700">{uni.name}</td>
                  <td className="p-4 text-sm text-slate-500">{uni.location || "—"}</td>
                  <td className="p-4">
                    <a href={uni.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-indigo-500 hover:text-indigo-700 font-medium transition">
                      <Icons.Link />
                      Visit Site
                    </a>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UniAdminsTab = ({ universities, showMsg }) => {
  // Updated state key to use "university_id" and added empty "password" parameter
  const [adminData, setAdminData] = useState({ name: "", email: "", university_id: "", password: "" });

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/system/create-uni-admin", adminData);
      showMsg("success", "Administrator access generated successfully.");
      setAdminData({ name: "", email: "", university_id: "", password: "" });
    } catch (err) {
      showMsg("error", "Error creating administrator profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icons.Users />
        </div>
        <h3 className="text-2xl font-bold text-slate-800">Assign Administrator</h3>
        <p className="text-slate-500 text-sm mt-2">Provision a new super-user for a specific partner university.</p>
      </div>

      <form onSubmit={handleCreateAdmin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Institution</label>
          <select 
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
            value={adminData.university_id}
            onChange={(e) => setAdminData({ ...adminData, university_id: e.target.value })}
            required
          >
            <option value="" disabled>-- Select University --</option>
            {universities.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Admin Full Name</label>
            <input 
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
              placeholder="e.g. Jane Doe"
              value={adminData.name}
              onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
            <input 
              type="email"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
              placeholder="admin@university.edu"
              value={adminData.email}
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Account Password</label>
          <input 
            type="password"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
            placeholder="••••••••"
            value={adminData.password}
            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
            required
          />
        </div>

        <button className="w-full mt-4 py-4 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 shadow-lg shadow-slate-900/20 transition-all flex justify-center items-center gap-2">
          <Icons.Users /> Provision Account
        </button>
      </form>
    </div>
  );
};

const AlumniDirectoryTab = ({ alumni, universities }) => {
  const [search, setSearch] = useState("");

  const filteredAlumni = alumni.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
          <input 
            type="text" 
            placeholder="Search alumni by name or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-slate-500 font-medium px-2">
          Showing <span className="text-slate-800 font-bold">{filteredAlumni.length}</span> records
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAlumni.map((person) => {
          const uni = universities.find(u => u._id === person.universityId);
          return (
            <div key={person._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div className="flex items-start space-x-4 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-700 rounded-full flex items-center justify-center text-lg font-bold shrink-0 border border-indigo-100">
                  {person.name.charAt(0)}
                </div>
                <div className="truncate pt-1">
                  <h4 className="text-[15px] font-bold text-slate-800 truncate">{person.name}</h4>
                  <p className="text-sm text-slate-500 truncate">{person.email}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                <Icons.Building />
                <p className="text-xs font-semibold text-slate-600 truncate">
                  {uni ? uni.name : "Guest / Unaffiliated"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};