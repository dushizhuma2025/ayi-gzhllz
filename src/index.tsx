import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ArticleView } from './components/ArticleView';
import './styles/main.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 默认首页重定向到 1.0 阶段导读 */}
          <Route index element={<Navigate to="/1-start/01-intro" replace />} />
          {/* 动态匹配所有文章路径 */}
          <Route path="*" element={<ArticleView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
