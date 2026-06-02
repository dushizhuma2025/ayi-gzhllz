import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <span className="footer-title">友情链接：</span>
          <a href="https://ayi.ai" target="_blank" rel="noopener noreferrer">
            阿一 AI 站
          </a>
          <span className="divider">|</span>
          <a href="https://mp.weixin.qq.com" target="_blank" rel="noopener noreferrer">
            微信公众平台
          </a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} 阿一 AI. All rights reserved. 版权所有。
        </div>
      </div>
    </footer>
  );
};
