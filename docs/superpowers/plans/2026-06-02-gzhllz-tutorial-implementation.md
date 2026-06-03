# 微信公众号流量主实战教程网站实现计划 (WeChat Traffic Master Tutorial Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 React 18 + Webpack 5 + TypeScript 构建微信公众号流量主全方位实战教程网站，参考 OpenCode 架构并实施 Apple 风格的前端网页设计，支持独立静态页面生成以优化搜一搜 SEO。

**Architecture:** 采用基于编译转换的半静态 SPA 架构。docs/ 目录下的 Markdown 源文件会在编译时被编译转换为 JSON 配置文件；生产打包时使用 `build-static.js` 脚本为每个路径自动注入专属的 HTML 实现单页级静态渲染。

**Tech Stack:** React 18, Webpack 5, TypeScript, react-router-dom v6, marked.js, pnpm

---

### Task 1: 项目基础配置文件搭建

**Files:**
- Create: `package.json`
- Create: `webpack.config.js`
- Create: `tsconfig.json`
- Create: `public/index.html`

- [ ] **Step 1: 创建 `package.json` 并配置依赖**
  在项目根目录下创建 `package.json`，写入以下完整代码：
  ```json
  {
    "name": "ayi-learn-gzhllz",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "node scripts/convert.js && webpack serve --mode development",
      "build": "node scripts/convert.js && webpack --mode production && node scripts/build-static.js"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.20.0"
    },
    "devDependencies": {
      "@types/node": "^25.7.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "css-loader": "^6.8.0",
      "html-webpack-plugin": "^5.6.0",
      "marked": "^11.0.0",
      "style-loader": "^3.3.0",
      "ts-loader": "^9.5.0",
      "typescript": "^5.3.0",
      "webpack": "^5.89.0",
      "webpack-cli": "^5.1.0",
      "webpack-dev-server": "^4.15.0"
    }
  }
  ```

- [ ] **Step 2: 创建 `webpack.config.js` 编译配置**
  在项目根目录下创建 `webpack.config.js`，写入以下完整代码：
  ```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
      entry: './src/index.tsx',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/bundle.[contenthash:8].js',
        publicPath: '/',
        clean: true,
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name].[contenthash:8][ext]',
            },
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html',
        }),
      ],
      devServer: {
        port: 5173,
        hot: true,
        historyApiFallback: true,
        static: [
          { directory: path.resolve(__dirname, 'docs/public'), publicPath: '/' },
        ],
      },
      devtool: isDev ? 'eval-source-map' : false,
    };
  };
  ```

- [ ] **Step 3: 创建 `tsconfig.json` 配置**
  在项目根目录下创建 `tsconfig.json`，写入以下完整代码：
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": ["src"]
  }
  ```

- [ ] **Step 4: 创建 `public/index.html` 基础模板**
  创建 `public` 文件夹，并在该目录下创建 `index.html`，写入以下完整代码：
  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信公众号流量主实战教程 - 2026最新保姆级起号与AI写作指南</title>
    <meta name="description" content="面向自媒体新人的系统化微信公众号流量主教程，涵盖零基础定位建号、快速过100粉丝门槛、AI写作降相似度去同质化以及限流风控避坑实操。">
    <link rel="icon" href="https://n8jmply6oexq.meoo.fun/sb-api/storage/v1/object/public/ayi_oss/public/1780479992747-favicon.ico" type="image/x-icon">
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>
  ```

- [ ] **Step 5: 安装依赖并验证环境**
  在终端中运行 `pnpm install`。
  Expected: 成功创建 `node_modules` 并下载所有依赖项，未报错。

---

### Task 2: 编写 Markdown 转换脚本与存放初始教程文档

**Files:**
- Create: `scripts/convert.js`
- Create: `docs/1-start/01-intro.md`
- Create: `docs/1-start/02-revenue.md`
- Create: `src/types.ts`

- [ ] **Step 1: 创建 Markdown 批量转换脚本 `scripts/convert.js`**
  创建 `scripts` 文件夹，在目录下新建 `convert.js`，写入以下完整代码：
  ```javascript
  const fs = require('fs');
  const path = require('path');
  const { marked } = require('marked');

  const DOCS_DIR = path.resolve(__dirname, '..', 'docs');
  const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'data');
  const OUTPUT_FILE = path.join(OUTPUT_DIR, 'pages.json');

  marked.setOptions({
    gfm: true,
    breaks: false,
  });

  function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: content };

    const meta = {};
    const frontmatter = match[1];
    const body = match[2];

    const lines = frontmatter.split('\n');
    let currentKey = '';
    let currentValue = '';

    for (const line of lines) {
      const keyMatch = line.match(/^(\w+):\s*(.*)/);
      if (keyMatch) {
        if (currentKey) meta[currentKey] = currentValue.trim();
        currentKey = keyMatch[1];
        currentValue = keyMatch[2];
      } else if (currentKey && line.trim()) {
        currentValue += ' ' + line.trim();
      }
    }
    if (currentKey) meta[currentKey] = currentValue.trim();

    for (const key in meta) {
      meta[key] = meta[key].replace(/^['"](.*)['"]$/, '$1');
    }

    return { meta, body };
  }

  function getMdFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.name === '.vitepress' || entry.name === 'node_modules') continue;
      if (entry.isDirectory()) {
        files.push(...getMdFiles(fullPath));
      } else if (entry.name.endsWith('.md') && !entry.name.startsWith('README')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  function getTitleFromHtml(html) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (h1Match) return h1Match[1].replace(/<[^>]+>/g, '');
    return '';
  }

  function main() {
    const mdFiles = getMdFiles(DOCS_DIR);
    const pages = [];

    for (const filePath of mdFiles) {
      const relative = path.relative(DOCS_DIR, filePath);
      const ext = path.extname(relative);
      let urlPath = '/' + relative.slice(0, -ext.length).replace(/\\/g, '/');

      if (urlPath.endsWith('/index')) {
        urlPath = urlPath.slice(0, -'/index'.length) + '/';
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const { meta, body } = parseFrontmatter(content);

      let html = '';
      try {
        html = marked.parse(body);
      } catch (e) {
        console.error(`Error parsing ${relative}: ${e.message}`);
        html = `<p>Error rendering content</p>`;
      }

      const title = meta.title || getTitleFromHtml(html) || relative;

      pages.push({
        path: urlPath,
        title,
        description: meta.description || '',
        html,
      });
    }

    pages.sort((a, b) => a.path.localeCompare(b.path));

    const output = { pages };

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`✓ Converted ${pages.length} markdown files to ${OUTPUT_FILE}`);
  }

  main();
  ```

- [ ] **Step 2: 创建初始文档 `docs/1-start/01-intro.md`**
  创建 `docs/1-start` 文件夹，并写入简介 Markdown：
  ```markdown
  ---
  title: "1.0 阶段导读：自媒体变现新风口"
  description: "了解公众号流量主的背景，以及为什么它在2026年依然是个人创作者最稳健的变现途径。"
  ---

  # 1.0 阶段导读：自媒体变现新风口

  在 2026 年的自媒体赛道中，虽然短视频火热，但对于绝大多数文字创作者或希望通过 AI 降本增效的普通人来说，**微信公众号流量主**依然是单价最高、变现最持久的阵地。

  本教程将带你从零起步，剖析流量机制，全面掌握这套流程。
  ```

- [ ] **Step 3: 创建初始文档 `docs/1-start/02-revenue.md`**
  写入收益逻辑 Markdown：
  ```markdown
  ---
  title: "1.1 收益逻辑详解：钱从哪里来？"
  description: "深度剖析公众号流量主的商业闭环，以及文中广告、底部广告与留言区广告的收益差异。"
  ---

  # 1.1 收益逻辑详解：钱从哪里来？

  公众号流量主是通过在发表的文章中插入腾讯广告联盟的广告，根据曝光和点击来获取广告收益的分成。

  ## 广告位与收益单价排序
  1. **文中广告**：由系统在正文中间自动插入，最多两条。
  2. **底部广告**：显示在正文最底部。
  3. **留言区广告**：位于评论区下方，是单价最高、曝光含金量最足的黄金广告位。
  ```

- [ ] **Step 4: 创建 `src/types.ts` 定义数据结构**
  创建 `src` 文件夹，并新建 `types.ts`，写入类型：
  ```typescript
  export interface PageData {
    path: string;
    title: string;
    description: string;
    html: string;
  }

  export interface SidebarItem {
    text: string;
    link?: string;
    collapsed?: boolean;
    items?: SidebarItem[];
  }
  ```

- [ ] **Step 5: 运行 convert 脚本生成 `pages.json`**
  在根目录下运行：`node scripts/convert.js`
  Expected: 控制台输出 `✓ Converted 2 markdown files to .../src/data/pages.json`，且生成的文件中包含上述两篇文章的数据。

---

### Task 3: 建立核心导航、侧边栏及布局组件 (Apple 风格)

**Files:**
- Create: `src/styles/main.css`
- Create: `src/data/sidebar.ts`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: 创建全局样式 `src/styles/main.css`**
  创建 `src/styles` 目录并新建 `main.css`，写入以下完整代码：
  ```css
  /* 全局样式 - 借鉴 Apple 风格 */
  :root {
    --bg-black: #000000;
    --bg-gray: #f5f5f7;
    --bg-white: #ffffff;
    --text-primary: #1d1d1f;
    --text-secondary: #6e6e73;
    --action-blue: #0071e3;
    --link-blue: #0066cc;
    --border-gray: #d2d2d7;
    --border-mid: #86868b;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-white);
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: var(--link-blue);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 导航栏毛玻璃 */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-gray);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  /* 胶囊按钮 */
  .btn-capsule {
    display: inline-block;
    padding: 8px 20px;
    background-color: var(--action-blue);
    color: #ffffff;
    border-radius: 980px;
    font-weight: 500;
    transition: background-color 0.2s, transform 0.1s;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }

  .btn-capsule:hover {
    background-color: #0077ed;
    text-decoration: none;
  }

  .btn-capsule:active {
    transform: scale(0.97);
  }

  /* 详情页侧边栏 */
  .sidebar {
    width: 260px;
    background-color: var(--bg-gray);
    border-right: 1px solid var(--border-gray);
    padding: 20px 15px;
    box-sizing: border-box;
    overflow-y: auto;
    position: sticky;
    top: 48px;
    height: calc(100vh - 48px);
  }
  ```

- [ ] **Step 2: 创建侧边栏数据 `src/data/sidebar.ts`**
  新建 `src/data/sidebar.ts`，写入以下完整代码：
  ```typescript
  import { SidebarItem } from '../types';

  export const sidebarData: SidebarItem[] = [
    {
      text: '🚀 第一阶段：快速起步',
      collapsed: false,
      items: [
        { text: '1.0 阶段导读', link: '/1-start/01-intro' },
        { text: '1.1 收益逻辑详解', link: '/1-start/02-revenue' }
      ]
    }
  ];
  ```

- [ ] **Step 3: 创建 `src/components/Navbar.tsx` 导航栏**
  创建 `src/components` 目录，新建 `Navbar.tsx`：
  ```typescript
  import React from 'react';
  import { Link } from 'react-router-dom';

  export const Navbar: React.FC = () => {
    return (
      <header className="navbar">
        <div style={{ fontWeight: 600, fontSize: '16px' }}>
          <Link to="/" style={{ color: '#1d1d1f', textDecoration: 'none' }}>
             公众号流量主实战教程
          </Link>
        </div>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#1d1d1f', fontSize: '14px' }}>首页</Link>
          <Link to="/1-start/01-intro" style={{ color: '#1d1d1f', fontSize: '14px' }}>开始学习</Link>
          <a href="https://mp.weixin.qq.com" target="_blank" rel="noopener noreferrer" className="btn-capsule" style={{ color: '#fff' }}>
            公众号后台 ↗
          </a>
        </nav>
      </header>
    );
  };
  ```

- [ ] **Step 4: 创建 `src/components/Footer.tsx` 页脚**
  新建 `Footer.tsx`，写入页脚代码：
  ```typescript
  import React from 'react';

  export const Footer: React.FC = () => {
    return (
      <footer style={{
        backgroundColor: '#f5f5f7',
        borderTop: '1px solid #d2d2d7',
        padding: '30px 20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#6e6e73',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <p>© 2026 阿一AI站. 本教程内容基于公域算法及原创经验整理。保留所有权利。</p>
          <p style={{ marginTop: '10px' }}>
            友情链接：<a href="https://ayi001.xyz" target="_blank" rel="noopener noreferrer">阿一AI站</a> | 
            微信公众平台（mp.weixin.qq.com）
          </p>
        </div>
      </footer>
    );
  };
  ```

- [ ] **Step 5: 创建 `src/components/Layout.tsx` 布局框架**
  新建 `Layout.tsx`，合并头部和页脚布局：
  ```typescript
  import React from 'react';
  import { Navbar } from './Navbar';
  import { Footer } from './Footer';

  interface LayoutProps {
    children: React.ReactNode;
  }

  export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ marginTop: '48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </div>
    );
  };
  ```

---

---

### Task 4: 优化教程阅读渲染器 (ArticleView) 与 Markdown 样式排版

**Files:**
- Modify: `src/components/ArticleView.tsx`
- Modify: `src/styles/main.css`

- [ ] **Step 1: 升级 ArticleView.tsx 的加载机制**
  修改 `src/components/ArticleView.tsx`，支持静态编译生成的 window 注入变量，添加 metadata 渲染：
  ```typescript
  import React, { useEffect, useState } from 'react';
  import { useLocation, Navigate } from 'react-router-dom';
  import pagesData from '../data/pages.json';
  import { PageData } from '../types';

  export const ArticleView: React.FC = () => {
    const location = useLocation();
    const [page, setPage] = useState<PageData | null>(null);

    useEffect(() => {
      const win = window as any;
      if (win.__PAGE_DATA__ && win.__PAGE_DATA__.path === location.pathname) {
        setPage(win.__PAGE_DATA__);
        return;
      }

      const found = pagesData.pages.find((p) => p.path === location.pathname);
      if (found) {
        setPage(found as PageData);
      } else {
        setPage(null);
      }
    }, [location.pathname]);

    // 如果是访问根路由且没有匹配到（/），或者路由不存在，直接重定向到第一课
    if (location.pathname === '/' || !page) {
      if (location.pathname === '/') {
        return <Navigate to="/1-start/01-intro" replace />;
      }
      const hasChecked = pagesData.pages.some(p => p.path === location.pathname);
      if (hasChecked) {
        return <Navigate to="/1-start/01-intro" replace />;
      }
      return <div style={{ padding: '40px' }}>加载中...</div>;
    }

    return (
      <article className="markdown-body">
        {page.description && (
          <div className="article-meta">
            <span>当前学习：{page.description}</span>
            {page.created && <span style={{ marginLeft: '15px' }}>发布时间：{page.created}</span>}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </article>
    );
  };
  ```

- [ ] **Step 2: 补充 Markdown 渲染排版样式到 `src/styles/main.css`**
  在 `src/styles/main.css` 的末尾追加高质感的排版：
  ```css
  /* Markdown 内容呼吸感排版 */
  .markdown-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px 40px;
    color: var(--text-primary);
    font-size: 17px;
    line-height: 1.62;
  }

  .article-meta {
    font-size: 13px;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-gray);
    padding-bottom: 12px;
    margin-bottom: 30px;
  }

  .markdown-body h1 {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.8px;
    margin-top: 0;
    margin-bottom: 24px;
  }

  .markdown-body h2 {
    font-size: 24px;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border-gray);
    padding-bottom: 8px;
  }

  .markdown-body p {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .markdown-body blockquote {
    margin: 20px 0;
    padding: 0 15px;
    color: var(--text-secondary);
    border-left: 4px solid var(--action-blue);
    background-color: var(--bg-gray);
    border-radius: 0 8px 8px 0;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 15px;
  }

  .markdown-body th {
    background-color: var(--bg-gray);
    font-weight: 600;
    text-align: left;
    padding: 10px 12px;
    border-bottom: 2px solid var(--border-gray);
  }

  .markdown-body td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-gray);
  }
  ```

---

### Task 5: 开发右侧 TOC (Table of Contents) 目录与滚动高亮组件

**Files:**
- Create: `src/components/TOC.tsx`
- Modify: `src/components/Layout.tsx`
- Modify: `src/styles/main.css`

- [ ] **Step 1: 创建 `src/components/TOC.tsx` 组件**
  利用 DOM 查询和 IntersectionObserver 实现自动高亮右侧目录：
  ```typescript
  import React, { useEffect, useState } from 'react';
  import { useLocation } from 'react-router-dom';

  interface TOCItem {
    id: string;
    text: string;
    level: number;
  }

  export const TOC: React.FC = () => {
    const [list, setList] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
      const article = document.querySelector('.markdown-body');
      if (!article) return;

      const headings = article.querySelectorAll('h2, h3');
      const items: TOCItem[] = [];

      headings.forEach((heading, idx) => {
        let id = heading.id;
        if (!id) {
          id = `heading-${idx}`;
          heading.setAttribute('id', id);
        }
        items.push({
          id,
          text: heading.textContent || '',
          level: heading.tagName === 'H2' ? 2 : 3
        });
      });

      setList(items);

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: '-48px 0px -40% 0px' }
      );

      headings.forEach((h) => observer.observe(h));
      return () => observer.disconnect();
    }, [location.pathname]);

    if (list.length === 0) return null;

    return (
      <nav className="toc-container">
        <h4 style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', marginBottom: '10px' }}>本文目录</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {list.map((item) => (
            <li
              key={item.id}
              style={{
                marginLeft: item.level === 3 ? '12px' : '0',
                margin: '8px 0'
              }}
            >
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : ''}
                style={{
                  fontSize: '13px',
                  color: activeId === item.id ? '#0071e3' : '#6e6e73',
                  fontWeight: activeId === item.id ? 600 : 400
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  ```

- [ ] **Step 2: 在 `src/components/Layout.tsx` 整合右侧 TOC 并渲染**
  修改 Layout，支持左右三栏布局：
  ```typescript
  import React from 'react';
  import { Outlet } from 'react-router-dom';
  import { Navbar } from './Navbar';
  import { Footer } from './Footer';
  import { Sidebar } from './Sidebar';
  import { TOC } from './TOC';

  export const Layout: React.FC = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1, marginTop: '48px', position: 'relative' }}>
          <Sidebar />
          <main style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
            <Outlet />
          </main>
          <TOC />
        </div>
        <Footer />
      </div>
    );
  };
  ```

- [ ] **Step 3: 添加 TOC 侧边容器样式到 `src/styles/main.css`**
  ```css
  /* TOC 容器样式 */
  .toc-container {
    width: 200px;
    padding: 30px 15px;
    box-sizing: border-box;
    position: sticky;
    top: 48px;
    height: calc(100vh - 48px);
    overflow-y: auto;
    border-left: 1px solid var(--border-gray);
  }

  .toc-container a:hover {
    color: var(--action-blue) !important;
    text-decoration: none;
  }
  ```

---

### Task 6: 编写静态 HTML 构建脚本与验证静态编译

**Files:**
- Create: `scripts/build-static.js`

- [ ] **Step 1: 创建静态页面生成脚本 `scripts/build-static.js`**
  在 `scripts` 目录下新建 `build-static.js`：
  ```javascript
  const fs = require('fs');
  const path = require('path');

  const DIST_DIR = path.resolve(__dirname, '..', 'dist');
  const PAGES_JSON = path.resolve(__dirname, '..', 'src', 'data', 'pages.json');

  function main() {
    if (!fs.existsSync(PAGES_JSON)) {
      console.error('src/data/pages.json not found. Run scripts/convert.js first.');
      process.exit(1);
    }
    const { pages } = JSON.parse(fs.readFileSync(PAGES_JSON, 'utf-8'));
    const indexPath = path.join(DIST_DIR, 'index.html');

    if (!fs.existsSync(indexPath)) {
      console.error('dist/index.html not found. Run webpack build first.');
      process.exit(1);
    }

    const baseHtml = fs.readFileSync(indexPath, 'utf-8');
    let count = 0;

    for (const page of pages) {
      const routePath = page.path;
      // 获得 dist/1-start/01-intro
      const dirPath = path.join(DIST_DIR, routePath.replace(/^\//, ''));
      const filePath = path.join(dirPath, 'index.html');

      fs.mkdirSync(dirPath, { recursive: true });

      const pageData = JSON.stringify(page);
      const injected = baseHtml.replace(
        '</head>',
        `<script>window.__PAGE_DATA__ = ${pageData};</script>\n</head>`
      );

      fs.writeFileSync(filePath, injected, 'utf-8');
      count++;
    }

    console.log(`✓ Generated ${count} static HTML pages in dist`);
  }

  main();
  ```

- [ ] **Step 2: 运行编译并验证多静态页面生成**
  在终端中执行打包命令：
  `pnpm run build`
  Expected: 
  1. 编译成功并输出 bundle 文件到 `dist/` 目录。
  2. 控制台输出 `✓ Generated 2 static HTML pages in dist`。
  3. 在资源管理器中可以看到 `dist/1-start/01-intro/index.html` 存在，且打开该文件能搜索到 `window.__PAGE_DATA__` 的注入代码。
