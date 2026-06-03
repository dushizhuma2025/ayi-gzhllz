import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-left-container">
        <Link to="/" className="navbar-logo">
          <img src="https://n8jmply6oexq.meoo.fun/sb-api/storage/v1/object/public/ayi_oss/public/1780479992750-ayilogo.png" alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">阿一公众号流量主教程</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">
          首页
        </Link>
        <Link to="/1-start/01-intro" className="navbar-link">
          开始学习
        </Link>
        <a 
          href="https://www.ayi001.xyz" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-capsule"
        >
          阿一AI站
        </a>
        <a 
          href="https://github.com/dushizhuma2025/ayi-gzhllz" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="navbar-github-link"
          title="GitHub 仓库"
        >
          <img src="https://n8jmply6oexq.meoo.fun/sb-api/storage/v1/object/public/ayi_oss/public/1780529080070-github.png" alt="GitHub" className="navbar-github-icon" />
        </a>
      </div>
    </header>
  );
};
