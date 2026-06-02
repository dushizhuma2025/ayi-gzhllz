import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarData } from '../data/sidebar';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-toggle-btn sidebar-toggle-close"
        onClick={toggleSidebar}
        title="折叠侧边栏"
        aria-label="Collapse Sidebar"
      >
        <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="14" height="14" rx="3" />
          <path d="M6 2V16" />
        </svg>
      </button>
      <nav className="sidebar-nav">
        {sidebarData.map((group, idx) => (
          <div key={idx} className="sidebar-group">
            <div className="sidebar-group-header">
              <h3 className="sidebar-group-title">{group.text}</h3>
            </div>
            
            <div className="sidebar-group-items-wrapper">
              <div className="sidebar-group-items-inner">
                {group.items && (
                  <ul className="sidebar-group-items">
                    {group.items.map((item, itemIdx) => {
                      const isActive = item.link === location.pathname;
                      return (
                        <li key={itemIdx} className="sidebar-item">
                          {item.link ? (
                            <Link
                              to={item.link}
                              className={`sidebar-link ${isActive ? 'active' : ''}`}
                            >
                              {item.text}
                            </Link>
                          ) : (
                            <span className="sidebar-link disabled" title="尚未开放">
                              {item.text}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};
