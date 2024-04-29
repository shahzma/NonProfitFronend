import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="sidebar">
    <Link to="/">Dashboard</Link>
    <Link to="/tasks">Tasks</Link>
    <Link to="/proposals">Proposals</Link>
  </nav>
);

export default Sidebar;
