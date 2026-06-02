import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import pagesData from '../data/pages.json';
import { PageData } from '../types';

export const ArticleView: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 匹配当前路由的页面数据
  const page = (pagesData.pages as PageData[]).find(
    (p) => p.path === currentPath
  );

  if (!page) {
    // 若找不到路由，重定向到第一章 1.0 阶段导读
    return <Navigate to="/1-start/01-intro" replace />;
  }

  return (
    <article className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
};
