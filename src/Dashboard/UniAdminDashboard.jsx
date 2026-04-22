import React from "react";
import DashboardLayout from "./DashboardLayout";

export default function UniAdminDashboard() {
  return (
    <DashboardLayout title="University Management">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Pending Verifications</h3>
          <p className="text-gray-600">Review and verify new alumni registrations.</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Review Now</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Manage Students</h3>
          <p className="text-gray-600">View and manage currently enrolled students.</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">View Students</button>
        </div>
      </div>
      {/* Add tables to map over your specific University's alumni/students */}
    </DashboardLayout>
  );
}