import { SidebarItem } from '../types';

export const sidebarData: SidebarItem[] = [
  {
    text: '🚀 第一阶段：快速起步',
    collapsed: false,
    items: [
      { text: '1.0 阶段导读', link: '/1-start/01-intro' },
      { text: '1.1 收益逻辑详解', link: '/1-start/02-revenue' },
      { text: '1.2 入池概念深度拆解' },
      { text: '1.3 赛道选择与定位' },
      { text: '1.4 对标账号套用与资料准备' },
      { text: '1.5 账号注册与注意事项' },
    ],
  },
  {
    text: '💪 第二阶段：账号冷启动',
    collapsed: true,
    items: [
      { text: '2.0 阶段导读' },
      { text: '2.1 快速获取100粉丝合规技巧' },
      { text: '2.2 流量主权限开通配置' },
      { text: '2.3 起号方法一：日记起步法' },
      { text: '2.4 起号方法二：小绿书图文起号法' },
      { text: '2.5 公众号后台基础操作与排版' },
    ],
  },
  {
    text: '⚡ 第三阶段：高效创作',
    collapsed: true,
    items: [
      { text: '3.0 阶段导读' },
      { text: '3.1 流量主专用 AI 工具盘点' },
      { text: '3.2 核心方法：倒推指令法' },
      { text: '3.3 洗稿相似度检测实操' },
      { text: '3.4 AI 特征率检测与降低' },
      { text: '3.5 人工润色标准' },
    ],
  },
  {
    text: '🎯 第四阶段：爆款运营',
    collapsed: true,
    items: [
      { text: '4.0 阶段导读' },
      { text: '4.1 爆款标题逆向生成法' },
      { text: '4.2 选题与对标的日常收集' },
      { text: '4.3 垂直发文的深度认知' },
      { text: '4.4 爆款概率的细节控制' },
      { text: '4.5 场景实战专栏' },
    ],
  },
  {
    text: '🔧 第五阶段：风控与避坑',
    collapsed: true,
    items: [
      { text: '5.0 阶段导读' },
      { text: '5.1 触碰即断流的 5 条高压红线' },
      { text: '5.2 “低创作品”判罚处理流程' },
      { text: '5.3 限流与推流排查诊断' },
      { text: '5.4 零推荐/断流的全面规避' },
      { text: '5.5 财务安全与结算防延迟' },
    ],
  },
  {
    text: '📚 第六阶段：百问百答与速查工具',
    collapsed: true,
    items: [
      { text: '6.1 运营百问百答 FAQ' },
      { text: '6.2 辅助工具与模板库' },
    ],
  },
];
