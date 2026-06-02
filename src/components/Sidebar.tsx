import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarData } from '../data/sidebar';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {sidebarData.map((group, idx) => (
          <div key={idx} className="sidebar-group">
            <h3 className="sidebar-group-title">{group.text}</h3>
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
        ))}
      </nav>
    </aside>
  );
};
