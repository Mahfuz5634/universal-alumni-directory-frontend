"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Landmark, 
  ShieldCheck, 
  Search, 
  Briefcase, 
  Check, 
  UserPlus, 
  LayoutDashboard, 
  User, 
  CheckCircle2, 
  XCircle,
  LogIn,
  Users,
  Globe,
  Star,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router";

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
      icon: <Landmark className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Admin Verification",
      desc: "Authorized university personnel verify profiles to ensure a 100% authentic networking environment.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Advanced Search & Filtering",
      desc: "Find peers easily using combined filters like graduation year, department, company, and location.",
      icon: <Search className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Comprehensive Profiles",
      desc: "Manage your professional identity with details including your current role, company, and LinkedIn URL.",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />
    }
  ];

  const stats = [
    { label: "Partner Universities", value: "50+", icon: <Landmark className="w-6 h-6 text-blue-200" /> },
    { label: "Verified Alumni", value: "100k+", icon: <Users className="w-6 h-6 text-blue-200" /> },
    { label: "Global Reach", value: "120+", icon: <Globe className="w-6 h-6 text-blue-200" /> },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Class of '18 • Software Engineer",
      text: "This directory helped me find a referral at my dream company through a fellow alum I hadn't spoken to in years. Invaluable tool!"
    },
    {
      name: "David Chen",
      role: "Class of '21 • Product Manager",
      text: "Knowing that every profile is verified by the university admins gives me the confidence to reach out and network securely."
    },
    {
      name: "Dr. Emily Rostova",
      role: "University Administrator",
      text: "The admin dashboard is incredibly intuitive. Verifying new graduates and exporting alumni data reports takes half the time it used to."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
            Alumni<span className="text-blue-600">Directory</span>
          </h1>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-700 transition">Features</a>
          <a href="#" className="hover:text-blue-700 transition">Universities</a>
          <a href="#" className="hover:text-blue-700 transition">About Us</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition">
            <LogIn className="w-4 h-4" />
            Login
          </Link>
          <Link to="/register" className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md">
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto overflow-visible">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 -z-10 rounded-3xl"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-wider shadow-sm"
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
          Grow with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Alumni.</span>
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
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 hover:-translate-y-1">
            <UserPlus className="w-5 h-5" />
            Create Profile
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all hover:-translate-y-1">
            <LayoutDashboard className="w-5 h-5 text-slate-500" />
            Admin Portal
          </button>
        </motion.div>

        {/* Social Proof Avatars */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="flex -space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm z-[${5-i}]`}></div>
            ))}
          </div>
          <p className="text-sm font-medium text-slate-500">Join over <span className="text-blue-700 font-bold">10,000+</span> verified alumni.</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-900 py-12 border-y border-blue-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-800">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0"
            >
              <div className="mb-3 bg-blue-800/50 p-3 rounded-2xl">{stat.icon}</div>
              <h4 className="text-4xl font-black text-white mb-1">{stat.value}</h4>
              <p className="text-blue-200 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Features Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Capabilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Built on a modern MERN stack to ensure scalability, security, and seamless networking across multiple universities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all hover:-translate-y-1 group"
              >
                <div className="mb-6 h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture/Roles */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center relative">
          
          {/* Decorative background for the dark card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          
          <div className="p-12 lg:w-1/2 text-white relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-6 uppercase tracking-wider">
              Security First
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Access Control</h2>
            <p className="text-slate-300 mb-8 leading-relaxed text-lg">
              Our architecture ensures data integrity by enforcing role-based access control. University admins have the tools to moderate their specific alumni base effectively.
            </p>
            <ul className="space-y-4">
              {['Role-Based Permissions', 'Encrypted Authentication', 'Downloadable CSV Reports'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Mockup/Visual Side */}
          <div className="p-8 lg:w-1/2 w-full flex justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-slate-100"
            >
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="text-slate-800 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Admin Dashboard
                </div>
                <div className="bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wide px-2 py-1 rounded font-bold">
                  Pending
                </div>
              </div>
              <div className="flex gap-4 items-center mb-4">
                <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 flex justify-center items-center gap-2 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 py-2 rounded-lg text-sm font-bold transition">
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 py-2 rounded-lg text-sm font-bold transition">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Graduates Worldwide</h2>
            <p className="text-slate-500">See how our platform is helping professionals reconnect.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-blue-200">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Reconnect?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Join your university's official directory today. Expand your network, find mentors, and explore new career opportunities.
          </p>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-lg hover:-translate-y-1">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-slate-800 text-lg tracking-tight">
              Alumni<span className="text-blue-600">Directory</span>
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-700 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-700 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-700 transition">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} AlumniDirectory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}