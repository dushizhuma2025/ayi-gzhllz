import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  showToggle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  sidebarCollapsed,
  showToggle = false
}) => {
  return (
    <header className="navbar">
      <div className="navbar-left-container">
        {showToggle && (
          <button 
            className={`navbar-toggle-btn ${sidebarCollapsed ? 'collapsed' : ''}`}
            onClick={toggleSidebar}
            title={sidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
            aria-label="Toggle Sidebar"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="14" height="14" rx="3" />
              <path d="M6 2V16" />
            </svg>
          </button>
        )}
        <Link to="/" className="navbar-logo">
          <img src="/ayilogo.png" alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">阿一公众号流量主教程</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/1-start/01-intro" className="navbar-link">
          开始学习
        </Link>
        <a 
          href="https://mp.weixin.qq.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-capsule"
        >
          公众号后台
        </a>
      </div>
    </header>
  );
};
