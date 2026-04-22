import React, { useContext } from "react";
import { Outlet } from "react-router"; 
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/authContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">Alumni Portal</h1>
          <div className="mt-8 flex items-center space-x-3 text-gray-700">
            <User size={20} />
            <span className="font-medium capitalize">{user?.role.replace('_', ' ')}</span>
          </div>
        </div>
        <button onClick={logout} className="p-6 text-red-600 flex items-center space-x-2">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dynamic header চাইলে Context বা Route state থেকে আনতে পারেন */}
        <header className="bg-white shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2> 
        </header>
        
        <motion.main 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6"
        >
          {/* Outlet এর জায়গায় আপনার alumni বা student ড্যাশবোর্ড রেন্ডার হবে */}
          <Outlet /> 
        </motion.main>
      </div>
    </div>
  );
}