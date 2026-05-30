import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Factory, AlertTriangle, FileText, Settings } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>MIP Platform</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LayoutDashboard size={20} /> Executive
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link to="/production" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Factory size={20} /> Production
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link to="/alerts" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} /> Alerts
              </Link>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link to="/reports" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} /> Reports
              </Link>
            </li>
            <li style={{ marginTop: '2rem' }}>
              <Link to="/admin" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={20} /> Admin
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manufacturing Intelligence Platform</h3>
          <div style={{ fontSize: '0.875rem' }}>User: Principal Engineer</div>
        </header>
        {children}
      </main>
    </div>
  );
};
