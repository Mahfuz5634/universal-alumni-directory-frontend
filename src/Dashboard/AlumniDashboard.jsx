import React from "react";


export default function AlumniDashboard() {
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-xl font-semibold mb-4">My Profile</h3>
        <p className="text-gray-600">Update your current company, position, and contact information.</p>
        {/* Fetch and display data from /api/alumni/profile/:id */}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Alumni Directory</h3>
        <p className="text-gray-600 mb-4">Search for fellow graduates from your university.</p>
        <input 
          type="text" 
          placeholder="Search by department, company, or year..." 
          className="w-full p-3 border rounded-lg"
        />
        {/* Fetch from /api/directory */}
      </div>
    </>
  );
}