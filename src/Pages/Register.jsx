"use client";

import { useState } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Building2,
  User,
  Info,
  ArrowLeft,
  Briefcase,
  Phone,
  Calendar,
  BookOpen,
  Hash,
 
} from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState("student"); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    university_id: "",
    department: "",
    graduation_year: "",
    contact_number: "",
    // Alumni specific fields
    student_roll_no: "",
    company: "",
    position: "",
    linkedin_id: "",
    github_id: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const fillAlumniData = () => {
    setRole("alumni");
    setFormData({
      name: "Md. Mahfuz",
      email: "mahfuz.alumni@example.com",
      password: "pass1234",
      university_id: "69e505c2dba758dd44b49ff8",
      department: "CSE",
      graduation_year: "2023",
      contact_number: "01712345678",
      student_roll_no: "UG02-43-18-051",
      company: "Google",
      position: "Software Engineer",
      linkedin_id: "https://linkedin.com/in/mahfuz",
      github_id: "https://github.com/mahfuz"
    });
  };

  // Helper to fill Student test data
  const fillStudentData = () => {
    setRole("student");
    setFormData({
      ...formData, // Keep existing fields to not break react controlled inputs
      name: "Sabbir Hossain",
      email: "sabbir.student@example.com",
      password: "pass1234",
      university_id: "69e505c2dba758dd44b49ff8",
      department: "BBA",
      graduation_year: "2026",
      contact_number: "01812345678",
      // Clear alumni fields just in case
      student_roll_no: "",
      company: "",
      position: "",
      linkedin_id: "",
      github_id: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Construct payload based on role
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role,
      university_id: formData.university_id,
      department: formData.department,
      graduation_year: Number(formData.graduation_year),
      contact_number: formData.contact_number,
    };

    if (role === "alumni") {
      payload.student_roll_no = formData.student_roll_no;
      payload.company = formData.company;
      payload.position = formData.position;
      payload.linkedin_id = formData.linkedin_id;
      payload.github_id = formData.github_id;
    }
    
    setTimeout(() => {
      console.log("Registration Payload:", payload);
      setIsLoading(false);
      alert(`Successfully registered as ${role}! Check console for payload.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-white text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* Left Column: Branding & Visuals */}
      <div className="hidden lg:flex lg:w-[40%] relative bg-slate-900 overflow-hidden flex-col justify-between p-12 sticky top-0 h-screen">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mb-10"
        >
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Join your university's official network.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Whether you are currently studying or already making your mark in the industry, connect with peers, find opportunities, and grow your career.
          </p>
        </motion.div>
      </div>

      {/* Right Column: Scrollable Registration Form */}
      <div className="w-full lg:w-[60%] flex flex-col items-center p-6 sm:p-12 h-screen overflow-y-auto">
        
        <div className="w-full max-w-[550px] relative">
          
          <div className="flex items-center justify-between mb-10">
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <p className="text-sm font-medium text-slate-500">
              Already have an account? <a href="#" className="text-blue-600 font-bold hover:text-blue-800">Sign in</a>
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
            <p className="text-slate-500 font-medium">Select your current status to begin.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pb-12">
            
            {/* Role Toggle */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-200 ${
                  role === "student" ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/50" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <User className="w-4 h-4" />
                Current Student
              </button>
              <button
                type="button"
                onClick={() => setRole("alumni")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all duration-200 ${
                  role === "alumni" ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/50" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Alumni / Graduate
              </button>
            </div>

            {/* General Information Section */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-400" /></div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-400" /></div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-400" /></div>
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">University</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Building2 className="h-5 w-5 text-slate-400" /></div>
                  <select name="university_id" value={formData.university_id} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm appearance-none cursor-pointer">
                    <option value="" disabled>Select your university</option>
                    <option value="69e505c2dba758dd44b49ff8">Demo University of Technology</option>
                    <option value="dummy_id_2">Global Business School</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Department</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><BookOpen className="h-5 w-5 text-slate-400" /></div>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. CSE" required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Grad Year</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-slate-400" /></div>
                    <input type="number" name="graduation_year" value={formData.graduation_year} onChange={handleChange} placeholder="2024" required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-slate-400" /></div>
                    <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="017..." required className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Alumni Specific Fields (Animated Dropdown) */}
            <AnimatePresence>
              {role === "alumni" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="space-y-5 border-t border-slate-100 pt-5 mt-5 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Student Roll No</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Hash className="h-5 w-5 text-slate-400" /></div>
                        <input type="text" name="student_roll_no" value={formData.student_roll_no} onChange={handleChange} placeholder="UG02-43..." required={role === "alumni"} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Company</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Building2 className="h-5 w-5 text-slate-400" /></div>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Google" required={role === "alumni"} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Job Position</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><Briefcase className="h-5 w-5 text-slate-400" /></div>
                      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Software Engineer" required={role === "alumni"} className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">LinkedIn URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"></div>
                        <input type="url" name="linkedin_id" value={formData.linkedin_id} onChange={handleChange} placeholder="https://linkedin.com/in/..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">GitHub URL</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"></div>
                        <input type="url" name="github_id" value={formData.github_id} onChange={handleChange} placeholder="https://github.com/..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create {role === "student" ? "Student" : "Alumni"} Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development / Test Credentials Helper */}
          <div className="mt-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="w-full">
                <p className="text-sm font-medium text-slate-600 mb-3 leading-relaxed">
                  Development Mode: Use predefined data payloads for testing.
                </p>
                <div className="flex gap-3">
                  <button onClick={fillStudentData} type="button" className="flex-1 bg-white border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:border-blue-200 rounded-lg transition-colors">
                    Fill Student Data
                  </button>
                  <button onClick={fillAlumniData} type="button" className="flex-1 bg-white border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:border-blue-200 rounded-lg transition-colors">
                    Fill Alumni Data
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}