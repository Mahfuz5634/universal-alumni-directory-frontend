import React from "react";
import DashboardLayout from "./DashboardLayout";

export default function SystemAdminDashboard() {
  return (
    <DashboardLayout title="System Administration">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Manage Universities" value="12" color="bg-blue-500" />
        <Card title="University Admins" value="24" color="bg-green-500" />
        <Card title="Total Alumni Platform-wide" value="1,204" color="bg-purple-500" />
      </div>
      {/* Add your tables for GET /api/admin/system/all-alumni here */}
    </DashboardLayout>
  );
}

// Simple Card Component for reuse
const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center ${color}`}>
       {/* Icon placeholder */}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);