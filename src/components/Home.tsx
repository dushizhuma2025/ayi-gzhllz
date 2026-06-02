import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  // 六个阶段的信息，用于在大纲卡片中展示
  const stages = [
    {
      title: '🚀 第一阶段：快速起步',
      desc: '零基础新手起步，系统拆解流量主收益底层逻辑，选定高收益赛道并完成合规账号建号与定位。',
      tags: ['收益逻辑', '入池概念', '赛道选择', '建号准备'],
      active: true,
    },
    {
      title: '💪 第二阶段：账号冷启动',
      desc: '快速攻克 100 粉丝流量主门槛，开通各项收益展示权限，掌握日记起步法与小绿书图文高效运营。',
      tags: ['百粉门槛', '权限开通', '日记起步', '小绿书图文'],
    },
    {
      title: '⚡ 第三阶段：高效创作',
      desc: '盘点国内外前沿 AI 工具（豆包、Claude），独家拆解倒推指令法，深度掌握洗稿、检测、降重与人工作品润色。',
      tags: ['AI 创作', '倒推指令', '降重洗稿', '去 AI 味'],
    },
    {
      title: '🎯 第四阶段：爆款运营',
      desc: '精通微信搜一搜筛选低粉爆款标题方法，逆向生成高点击率爆款，控制垂直度实现多赛道矩阵式复制。',
      tags: ['逆向标题', '爆款选题', '多赛道实战', '完读率控制'],
    },
    {
      title: '🔧 第五阶段：风控与避坑',
      desc: '全面规避 5 条断流高压红线，快速应对并处理低创警告与限流判罚，确保财务结算合规无延迟。',
      tags: ['限流排查', '低创申诉', '断流避坑', '财务结算'],
    },
    {
      title: '📚 第六阶段：百问百答',
      desc: '精选数十项高频实战 FAQ，提供违禁词规避与高阶提示词工具包，确保全程少走弯路。',
      tags: ['FAQ 问答', '辅助工具', '提示词模板'],
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="badge">从入门到提现</span>
          <h1 className="hero-title">
            微信公众号流量主<br />
            <span className="gradient-text">从零起步到 AI 高效创作指南</span>
          </h1>
          <p className="hero-subtitle">
            这是一套系统化的公众号运营与变现教程。面向零基础新手，提供从起步建号、冷启动、AI 高效写作、爆款选题到风控避坑的完整实战闭环。
          </p>
          <div className="hero-actions">
            <Link to="/1-start/01-intro" className="btn-capsule hero-cta">
              开始学习课程
            </Link>
            <a 
              href="https://www.ayi001.xyz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-capsule hero-secondary"
            >
              阿一公众号AI工具
            </a>
          </div>
        </div>

        {/* Hero Image Container with a high-fidelity placeholder */}
        <div className="hero-image-container">
          <div className="placeholder-image-wrapper">
            <img 
              src="/gzhllzad.png" 
              alt="微信公众号流量主从零起步到 AI 高效创作指南" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Core Features / Highlights */}
      <section className="home-highlights">
        <h2 className="section-title">为什么选择这套教程？</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">🎯</div>
            <h3>直击痛点，零基础起步</h3>
            <p>从注册个人号开始，手把手带你解决起号无粉丝、无阅读量的冷启动困境。</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">⚡</div>
            <h3>AI 辅助与降重降重</h3>
            <p>使用先进的 AI 工具结合独特的倒推指令，高效率原创文章，并详解降重、润色流程。</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">🛡️</div>
            <h3>健全的风控防线</h3>
            <p>总结了 5 条断流红线与低创处理机制，保护账号安全，确保持续获得推荐收益。</p>
          </div>
        </div>
      </section>

      {/* Course Outline Section */}
      <section className="home-outline">
        <h2 className="section-title">课程体系大纲</h2>
        <div className="outline-grid">
          {stages.map((stage, idx) => (
            <div key={idx} className={`outline-card ${stage.active ? 'active' : ''}`}>
              <div className="card-header">
                <h3>{stage.title}</h3>
                {stage.active && <span className="active-badge">已开放</span>}
              </div>
              <p className="card-desc">{stage.desc}</p>
              <div className="card-tags">
                {stage.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="card-tag">{tag}</span>
                ))}
              </div>
              {stage.active ? (
                <Link to="/1-start/01-intro" className="card-link">
                  进入学习 &rarr;
                </Link>
              ) : (
                <span className="card-link disabled">尚未开放，敬请期待</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
