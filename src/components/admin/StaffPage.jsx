import React, { useEffect, useState } from 'react';
import './admin.css';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/staff`)
      .then((res) => res.json())
      .then((data) => {
        setStaff(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching staff:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="staff-page">
      <h2 className="staff-title">Staff Dashboard</h2>
      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <div className="staff-table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td>{member.email || 'N/A'}</td>
                    <td>{member.phone || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-staff">No staff found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
