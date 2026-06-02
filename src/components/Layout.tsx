import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Navbar />
      <div className={`layout-body ${isHomePage ? 'home-layout' : ''}`}>
        {!isHomePage && (
          <Sidebar 
            collapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
          />
        )}
        
        {sidebarCollapsed && !isHomePage && (
          <button 
            className="sidebar-toggle-btn sidebar-toggle-open"
            onClick={toggleSidebar}
            title="展开侧边栏"
            aria-label="Expand Sidebar"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="14" height="14" rx="3" />
              <path d="M6 2V16" />
            </svg>
          </button>
        )}

        <main className="layout-main">
          <div className="content-wrapper">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

