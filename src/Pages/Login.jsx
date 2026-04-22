"use client";
import { use,  useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Building2,
  User,
  Info,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {login}=useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: "student", label: "Alumni", icon: <User className="w-4 h-4" /> },
    { id: "uni_admin", label: "Uni Admin", icon: <Building2 className="w-4 h-4" /> },
    { id: "admin", label: "Super Admin", icon: <Shield className="w-4 h-4" /> }
  ];

  const fillTestData = () => {
    setEmail("admin@alumni.com");
    setPassword("admin123");
    setRole("admin");
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

    console.log("Login success:", res);

    alert(`Logged in successfully as ${res.user.role}!`);
    if (res.user.role === "admin") navigate("/dashboard/system-admin");
    else if (res.user.role === "uni_admin") navigate("/dashboard/uni-admin");
    else if (res.user.role === "alumni") navigate("/dashboard/alumni");
    else if (res.user.role === "student") navigate("/dashboard/student");


  } catch (err) {
    console.error("Login error:", err);

    alert(err.error || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex w-full font-sans bg-white text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Left Column: Branding & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-slate-900 overflow-hidden flex-col justify-between p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        {/* Logo/Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Alumni<span className="text-blue-400">Directory</span>
          </h1>
        </motion.div>

        {/* Value Proposition / Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mb-10"
        >
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            The secure gateway to your professional network.
          </h2>
          <div className="space-y-4">
            {['Verified authentic profiles', 'Secure role-based access', 'Advanced directory filtering'].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-6 sm:p-12 relative">
        
        {/* Back Button (Mobile/Desktop top left) */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
          <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo (Only shows on small screens) */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <div className="h-10 w-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Alumni<span className="text-blue-600">Directory</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign in to your account</h2>
            <p className="text-slate-500 font-medium">Select your portal and enter your credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Role Selection Tabs */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                    role === r.id 
                      ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/50" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                  }`}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development / Test Credentials Helper */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-600 mb-2 leading-relaxed">
                  Development Mode: Use predefined admin credentials to bypass validation during testing.
                </p>
                <button 
                  onClick={fillTestData}
                  type="button"
                  className="text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Quick Fill Admin Details &rarr;
                </button>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}