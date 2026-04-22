import React from "react";


export default function StudentDashboard() {
  return <>

    
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-6 shadow-md">
        <h2 className="text-2xl font-bold mb-2">Connect with Alumni</h2>
        <p>Find mentors, explore career paths, and connect with graduates from your university.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Alumni Directory</h3>
        <input 
          type="text" 
          placeholder="Filter by company (e.g. Google, Microsoft)..." 
          className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white transition"
        />
        {/* Map over /api/directory results here */}
      </div>
        </>
    
  ;
}