import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import pagesData from '../data/pages.json';
import { PageData } from '../types';

export const ArticleView: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 使用 State 来存取当前的 Page 页面数据
  const [page, setPage] = React.useState<PageData | null>(() => {
    // 初始获取：为了让服务器端渲染或初次渲染时有内容
    if (typeof window !== 'undefined' && (window as any).__PAGE_DATA__) {
      const winData = (window as any).__PAGE_DATA__;
      if (winData.path === currentPath) {
        return winData;
      }
    }
    return (pagesData.pages as PageData[]).find((p) => p.path === currentPath) || null;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__PAGE_DATA__) {
      const winData = (window as any).__PAGE_DATA__;
      if (winData.path === currentPath) {
        setPage(winData);
        return;
      }
    }
    // 退回到 pages.json 查找对应的教程数据渲染
    const found = (pagesData.pages as PageData[]).find((p) => p.path === currentPath) || null;
    setPage(found);
  }, [currentPath]);

  if (!page) {
    // 如果当前路径已经是首篇教程，且数据源里没有它，说明 pages.json 损坏或未生成
    if (currentPath === '/1-start/01-intro') {
      return (
        <div style={{ padding: '40px 24px', maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '24px', fontWeight: 600 }}>
            数据未加载或配置错误
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '15px', lineHeight: 1.6 }}>
            未能在 <code>pages.json</code> 中找到首篇教程的数据（<code>/1-start/01-intro</code>）。这通常是因为数据转换脚本未运行或配置有误。
          </p>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid var(--border-gray)', 
            borderRadius: '12px', 
            padding: '20px', 
            textAlign: 'left',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
            fontSize: '14px',
            color: 'var(--text-secondary)'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', color: 'var(--text-primary)' }}>解决方法：</p>
            <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.6 }}>
              <li style={{ marginBottom: '8px' }}>
                请检查 <code>src/data/pages.json</code> 文件是否存在。
              </li>
              <li>
                在终端（项目根目录下）运行以下命令生成页面数据：
                <code style={{ 
                  background: '#1c1c1e', 
                  color: '#ff453a', 
                  padding: '6px 10px', 
                  borderRadius: '6px', 
                  display: 'block', 
                  marginTop: '8px', 
                  fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace' 
                }}>
                  node scripts/convert.js
                </code>
              </li>
            </ol>
          </div>
        </div>
      );
    }
    // 若找不到其他路由，重定向到第一章 1.0 阶段导读
    return <Navigate to="/1-start/01-intro" replace />;
  }

  return (
    <article className="markdown-body">
      {page.description && (
        <div style={{
          marginBottom: '24px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span>当前学习：{page.description}</span>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
};

