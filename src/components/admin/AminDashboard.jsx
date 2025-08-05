import React from 'react';
import Sidebar from './Sidebar'; // if you have one
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
