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
      <Navbar 
        toggleSidebar={toggleSidebar} 
        sidebarCollapsed={sidebarCollapsed}
        showToggle={!isHomePage}
      />
      <div className={`layout-body ${isHomePage ? 'home-layout' : ''}`}>
        {!isHomePage && <Sidebar collapsed={sidebarCollapsed} />}
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

