import React, { useEffect, useState } from 'react';
import { fetchDirectory, verifyAlumni } from '../services/api';

const UniDashboard = () => {
  const [alumni, setAlumni] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch only alumni from this uni
    fetchDirectory({ university_id: user.university_id }).then(res => setAlumni(res.data));
  }, []);

  const handleVerify = async (id) => {
    await verifyAlumni(id);
    setAlumni(alumni.map(a => a._id === id ? { ...a, is_verified: true } : a));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">University Portal: {user.name}</h1>
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Company</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map(person => (
              <tr key={person._id} className="border-t">
                <td className="p-4">{person.name}</td>
                <td className="p-4">{person.company}</td>
                <td className="p-4">
                  {person.is_verified ? <span className="text-green-600">Verified</span> : <span className="text-red-500">Pending</span>}
                </td>
                <td className="p-4">
                  {!person.is_verified && (
                    <button onClick={() => handleVerify(person._id)} className="bg-blue-500 text-white px-3 py-1 rounded">Verify</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};