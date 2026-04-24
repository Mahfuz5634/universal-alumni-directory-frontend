"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  User,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: "student", label: "Student", icon: <User className="w-4 h-4" /> },
    {
      id: "alumni",
      label: "Alumni",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "uni_admin",
      label: "Uni Admin",
      icon: <Building2 className="w-4 h-4" />,
    },
    { id: "admin", label: "Super Admin", icon: <Lock className="w-4 h-4" /> },
  ];

  const showNotification = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await login({
        email,
        password,
        role,
      });

      showNotification(
        `Logged in successfully as ${res.user.role}!`,
        "success",
      );

      // Delay navigation slightly so the user can see the toast
      setTimeout(() => {
        if (res.user.role === "admin") navigate("/system-admin");
        else if (res.user.role === "uni_admin") navigate("/uni-admin");
        else if (res.user.role === "alumni") navigate("/alumni");
        else if (res.user.role === "student") navigate("/student");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      showNotification(err.error || "Login failed. Please try again.", "error");
      setIsLoading(false);
    }
  };

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#fafafa] text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 relative">
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed top-6 right-6 sm:top-10 sm:right-10 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
              toast.type === "success"
                ? "bg-slate-900/95 border-slate-800 text-white shadow-green-900/20"
                : "bg-red-50 border-red-200 text-red-900 shadow-red-900/10"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                toast.type === "success" ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2
                  className={`w-5 h-5 ${toast.type === "success" ? "text-green-400" : "text-red-500"}`}
                />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <span className="font-semibold text-sm tracking-wide">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"
            style={{ animationDuration: "12s" }}
          ></div>

          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/10">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Alumni<span className="text-indigo-400 font-medium">Directory</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mb-10 max-w-lg"
        >
          <h2 className="text-5xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            The secure gateway to your professional network.
          </h2>
          <div className="space-y-5">
            {[
              "Verified authentic university profiles",
              "Strict role-based access controls",
              "Granular directory search & filtering",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 text-slate-300">
                <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 xl:p-24 relative bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] z-10 rounded-l-3xl lg:rounded-l-[3rem]">
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-[480px] mt-12 lg:mt-0">
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Alumni
              <span className="text-indigo-600 font-medium">Directory</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 font-medium">
              Select your role and enter your credentials to continue.
            </p>
          </div>

          <motion.form
            onSubmit={handleLogin}
            className="space-y-6"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Role Selection Tabs */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-100/80 p-1.5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1"
            >
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                    role === r.id
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </motion.div>

            <div className="space-y-5">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-slate-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none mt-4"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
