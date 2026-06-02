import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarData } from '../data/sidebar';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  // 根据 sidebarData 初始化折叠状态
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    sidebarData.forEach((group, idx) => {
      // 默认展开配置了 collapsed: false 的组，其余默认折叠
      initial[idx] = group.collapsed !== undefined ? group.collapsed : true;
    });
    return initial;
  });

  // 路由变化时，自动展开当前活跃页面所属的 Group
  useEffect(() => {
    const activeGroupIdx = sidebarData.findIndex(group =>
      group.items?.some(item => item.link === location.pathname)
    );
    if (activeGroupIdx !== -1) {
      setCollapsedGroups(prev => ({
        ...prev,
        [activeGroupIdx]: false
      }));
    }
  }, [location.pathname]);

  const toggleGroup = (idx: number) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {sidebarData.map((group, idx) => {
          const isCollapsed = collapsedGroups[idx];
          return (
            <div 
              key={idx} 
              className={`sidebar-group ${isCollapsed ? 'collapsed' : ''}`}
            >
              <div 
                className="sidebar-group-header" 
                onClick={() => toggleGroup(idx)}
              >
                <h3 className="sidebar-group-title">{group.text}</h3>
                <span className="sidebar-group-arrow">
                  <svg viewBox="0 0 10 6">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </span>
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
          );
        })}
      </nav>
    </aside>
  );
};
