import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        阿一公众号流量主教程
      </Link>
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
