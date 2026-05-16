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
  LogIn,
  ArrowRight,
  Network,
  Lock,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router";
import bg from "../assets/bg.jpg";

export default function Home() {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.15 },
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-200 selection:text-indigo-900">
      <div className="fixed top-6 inset-x-0 mx-auto max-w-5xl px-4 z-50">
        <nav className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-100/20 rounded-full px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Alumni
              <span className="text-indigo-600 font-semibold">Directory</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a
              href="/platform"
              className="hover:text-indigo-600 transition-colors"
            >
              Platform
            </a>
            <a
              href="/universities"
              className="hover:text-indigo-600 transition-colors"
            >
              Universities
            </a>
            <a
              href="/security"
              className="hover:text-indigo-600 transition-colors"
            >
              Security
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
            <Link
              to="/register"
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-200"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      <section className="relative isolate pt-40 pb-32 px-6 flex flex-col items-center text-center min-h-[95vh] justify-center overflow-hidden bg-[#0a0a0c]">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${bg})`,
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-xs font-bold mb-8 shadow-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now supporting multi-university architecture
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8"
          >
            Your ultimate <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
              alumni network.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            A highly secure, centralized directory allowing graduates to
            register, maintain professional profiles, and connect through
            dedicated university portals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <Link to="/register" className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white text-slate-950 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
              <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Create Profile
            </Link>
            <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all hover:border-white/20">
              <LayoutDashboard className="w-5 h-5 text-indigo-400" />
              Admin Portal
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} 
          className="hidden lg:flex absolute top-1/4 left-[10%] w-48 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500"></div>
          <div>
            <div className="h-2.5 w-20 bg-white/20 rounded-full mb-2"></div>
            <div className="h-2 w-12 bg-white/10 rounded-full"></div>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }} 
          className="hidden lg:flex absolute bottom-1/4 right-[10%] w-56 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl items-center gap-4"
        >
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
             <Check className="w-5 h-5 text-white" />
           </div>
           <div>
             <div className="text-white text-sm font-bold">Verified Alumni</div>
             <div className="text-emerald-300 text-xs font-medium">Class of '24</div>
           </div>
        </motion.div>
      </section>

      {/* Social Proof / Stats Banner */}
      <section className="py-12 bg-white border-b border-slate-200 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">50+</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">10k+</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Verified Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">99%</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 mb-1">24/7</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Secure Access</div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-24 px-6 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Join your exclusive university network in three simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 -translate-y-1/2 z-0 opacity-50"></div>
            
            {[
              { step: "01", title: "Register", desc: "Create your account and select your alma mater.", icon: UserPlus, color: "from-blue-500 to-cyan-500" },
              { step: "02", title: "Get Verified", desc: "University admins authenticate your credentials.", icon: ShieldCheck, color: "from-indigo-500 to-violet-500" },
              { step: "03", title: "Connect", desc: "Network with verified alumni globally.", icon: Network, color: "from-emerald-400 to-teal-500" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 mb-6 shadow-xl shadow-indigo-100 transform group-hover:-translate-y-2 transition-all duration-300`}>
                   <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-slate-800" />
                   </div>
                </div>
                <div className="text-indigo-600 font-black tracking-widest text-sm mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Engineered for Connection
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Everything you need to maintain a thriving, secure, and authentic
              professional community.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-200/60 shadow-sm hover:shadow-xl transform transition-all hover:-translate-y-2 duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-200/40 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                  <Landmark className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  University-Specific Portals
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  Isolated directory environments for every institution,
                  ensuring localized data privacy and networking.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm hover:shadow-xl transform transition-all hover:-translate-y-2 duration-300 group"
            >
              <div className="h-14 w-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Admin Verification
              </h3>
              <p className="text-slate-500 leading-relaxed">
                100% authentic community guaranteed through manual admin
                approval.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-200/60 shadow-sm hover:shadow-xl transform transition-all hover:-translate-y-2 duration-300 group"
            >
              <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Search Function
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Filter by graduation year, department, or current company with
                ease.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border border-slate-800 shadow-2xl hover:shadow-indigo-900/50 transform transition-all hover:-translate-y-2 duration-300 relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
              <div className="relative z-10">
                <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                  <Briefcase className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Comprehensive Profiles
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg mb-8">
                  Allow alumni to maintain rich professional identities,
                  featuring current roles, skills, and social links.
                </p>
                <div className="flex items-center gap-2 text-indigo-300 font-bold hover:text-white cursor-pointer transition-colors">
                  Explore profile features <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              Ready to bridge the gap?
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
              Deploy your university's secure directory today. Facilitate
              meaningful connections and mentorships.
            </p>
            <button className="bg-white text-indigo-600 px-12 py-5 rounded-full font-black text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
              Start Building Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-100 relative overflow-hidden pt-16 sm:pt-24 pb-8 border-t border-slate-200">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="font-extrabold text-slate-900 tracking-tight text-xl">
                  Alumni
                  <span className="text-indigo-600 font-medium">Directory</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                Empowering university graduates to connect, discover
                opportunities, and build lifelong professional networks
                worldwide.
              </p>

              <div className="pt-2 space-y-1">
                <p className="text-slate-400 text-sm font-medium">
                  Have questions? Reach out to us:
                </p>
                <a
                  href="mailto:hello@alumnidirectory.com"
                  className="text-indigo-600 text-sm font-bold hover:text-indigo-800 transition-colors"
                >
                  hello@alumnidirectory.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <h3 className="text-slate-900 font-bold tracking-tight text-sm uppercase tracking-wider">
                Platform
              </h3>
              <ul className="space-y-3.5 text-sm font-medium text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Find Alumni
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Job Board
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Mentorship
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <h3 className="text-slate-900 font-bold tracking-tight text-sm uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3.5 text-sm font-medium text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <h3 className="text-slate-900 font-bold tracking-tight text-sm uppercase tracking-wider">
                Stay Updated
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                Get the latest news, event updates, and alumni spotlight stories
                delivered to your inbox.
              </p>
              <form
                className="relative flex items-center group mt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 bg-slate-900 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center focus:outline-none"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} AlumniDirectory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}