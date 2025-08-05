// src/components/admin/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './admin.css';

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="JIL Logo" />
      </div>
      <h3>Admin Panel</h3>
      <nav>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/customers">Customers</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/staff">Staff</Link></li>
          <li><Link to="/admin/menuitem">Menuitem</Link></li>
          <li><Link to="/admin/adduser">Add Admin</Link></li>
          <li><Link to="/admin/catering-events">Catering Events</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
