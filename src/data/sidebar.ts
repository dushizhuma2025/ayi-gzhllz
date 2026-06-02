import { SidebarItem } from '../types';

export const sidebarData: SidebarItem[] = [
  {
    text: '🚀 第一阶段：快速起步',
    collapsed: false,
    items: [
      { text: '1.0 阶段导读', link: '/1-start/01-intro' },
      { text: '1.1 收益逻辑详解', link: '/1-start/02-revenue' },
      { text: '1.2 入池概念深度拆解', link: '/1-start/03-concept' },
      { text: '1.3 赛道选择与定位', link: '/1-start/04-niche' },
      { text: '1.4 对标账号套用与资料准备', link: '/1-start/05-profile' },
      { text: '1.5 账号注册与注意事项', link: '/1-start/06-register' },
    ],
  },
  {
    text: '💪 第二阶段：账号冷启动',
    collapsed: true,
    items: [
      { text: '2.0 阶段导读', link: '/2-coldstart/01-intro' },
      { text: '2.1 快速获取100粉丝合规技巧', link: '/2-coldstart/02-fans' },
      { text: '2.2 流量主权限开通配置', link: '/2-coldstart/03-permissions' },
      { text: '2.3 起号方法一：日记起步法', link: '/2-coldstart/04-diary' },
      { text: '2.4 起号方法二：小绿书起号法', link: '/2-coldstart/05-xiaolushu' },
      { text: '2.5 公众号后台基础操作与排版', link: '/2-coldstart/06-publish' },
    ],
  },
  {
    text: '⚡ 第三阶段：高效创作',
    collapsed: true,
    items: [
      { text: '3.0 阶段导读', link: '/3-ai-writing/01-intro' },
      { text: '3.1 流量主专用 AI 工具盘点', link: '/3-ai-writing/02-ai-tools' },
      { text: '3.2 核心方法：倒推指令法', link: '/3-ai-writing/03-reverse-prompt' },
      { text: '3.3 洗稿相似度检测实操', link: '/3-ai-writing/04-duplicate-check' },
      { text: '3.4 AI 特征率检测与降低', link: '/3-ai-writing/05-ai-rate' },
      { text: '3.5 人工润色标准', link: '/3-ai-writing/06-manual-polish' },
    ],
  },
  {
    text: '🎯 第四阶段：爆款运营',
    collapsed: true,
    items: [
      { text: '4.0 阶段导读', link: '/4-viral-ops/01-intro' },
      { text: '4.1 爆款标题逆向生成法', link: '/4-viral-ops/02-title-generator' },
      { text: '4.2 选题与对标的日常收集', link: '/4-viral-ops/03-topic-collection' },
      { text: '4.3 垂直发文的深度认知', link: '/4-viral-ops/04-vertical-niche' },
      { text: '4.4 爆款概率的细节控制', link: '/4-viral-ops/05-burst-control' },
      { text: '4.5 场景实战专栏', link: '/4-viral-ops/06-case-studies' },
    ],
  },
  {
    text: '🔧 第五阶段：风控与避坑',
    collapsed: true,
    items: [
      { text: '5.0 阶段导读', link: '/5-risk-control/01-intro' },
      { text: '5.1 触碰即断流的 5 条高压红线', link: '/5-risk-control/02-redlines' },
      { text: '5.2 “低创作品”判罚处理流程', link: '/5-risk-control/03-low-quality' },
      { text: '5.3 限流与推流排查诊断', link: '/5-risk-control/04-shadowban-check' },
      { text: '5.4 零推荐/断流的全面规避', link: '/5-risk-control/05-avoid-zero' },
      { text: '5.5 财务安全与结算防延迟', link: '/5-risk-control/06-finance-safety' },
    ],
  },
  {
    text: '📚 第六阶段：常见问题速查',
    collapsed: true,
    items: [
      { text: '6.1 运营百问百答 FAQ', link: '/6-faq/01-faq-list' },
      { text: '6.2 辅助工具与模板库', link: '/6-faq/02-toolkit' },
    ],
  },
];
