import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      title: "University-Specific Directories",
      desc: "A centralized platform where each university maintains its own independent, secure alumni listing.",
      icon: "🏛️"
    },
    {
      title: "Admin Verification",
      desc: "Authorized university personnel verify profiles to ensure a 100% authentic networking environment.",
      icon: "🛡️"
    },
    {
      title: "Advanced Search & Filtering",
      desc: "Find peers easily using combined filters like graduation year, department, company, and location.",
      icon: "🔍"
    },
    {
      title: "Comprehensive Profiles",
      desc: "Manage your professional identity with details including your current role, company, and LinkedIn URL.",
      icon: "💼"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
            Alumni<span className="text-blue-600">Directory</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition">Login</button>
          <button className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition-all shadow-md">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-wider"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          University-Centric Platform
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.15] mb-6"
        >
          Connect, Network, and <br />
          Grow with your <span className="text-blue-700">Alumni.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A secure, centralized web application allowing graduates to register, manage profiles, and connect through dedicated, university-verified directories.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="px-8 py-3.5 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200">
            Create Profile
          </button>
          <button className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
            University Admin Portal
          </button>
        </motion.div>
      </section>

      {/* Core Features Overview (From SRS) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Capabilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Built on a modern MERN stack to ensure scalability, security, and seamless networking across multiple universities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture/Roles */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-blue-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
          <div className="p-12 md:w-1/2 text-white">
            <h2 className="text-3xl font-bold mb-6">Secure Access Control</h2>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Our architecture ensures data integrity by enforcing role-based access control. University admins have the tools to moderate their specific alumni base effectively.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 bg-blue-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span>Role-Based Permissions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 bg-blue-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span>Encrypted Authentication</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 bg-blue-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span>Downloadable CSV Reports</span>
              </li>
            </ul>
          </div>
          
          {/* Mockup/Visual Side */}
          <div className="p-8 md:w-1/2 w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm"
            >
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="text-slate-800 font-bold">Admin Dashboard</div>
                <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded font-bold">Pending Verification</div>
              </div>
              <div className="flex gap-4 items-center mb-4">
                <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-bold">Approve</button>
                <button className="flex-1 bg-red-100 text-red-600 py-2 rounded text-sm font-bold">Reject</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-blue-700 rounded-md"></div>
            <span className="font-bold text-slate-800">Alumni Directory</span>
          </div>
          <p>© {new Date().getFullYear()} University-Centric Alumni Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}