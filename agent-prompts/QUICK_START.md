# 快速开始指南 - Agent Prompts

## 🎯 5 分钟快速上手

### 第一步：项目结构概览

```
agent-prompts/
├── 📄 首页和文档
│   ├── README.md              ← 项目说明
│   ├── PRD.md                 ← 产品需求文档（完整功能设计）
│   ├── DESIGN_SYSTEM.md       ← 设计系统文档
│   └── QUICK_START.md         ← 本文件
│
├── 🌐 网页文件
│   ├── index.html             ← 首页（Hero + 功能 + 分类）
│   ├── browse.html            ← 浏览页面（搜索 + 筛选 + 列表）
│   ├── prompt-detail.html     ← 提示词详情页
│   └── upload.html            ← 上传提示词页
```

### 第二步：本地运行

选择以下方式之一运行项目：

#### 方式 1: Python (推荐最简单)
```bash
cd /Users/jiazihui/Documents/Agent/CodeSpace/agent-prompts

# Python 3
python -m http.server 8000

# 然后在浏览器打开: http://localhost:8000
```

#### 方式 2: Node.js
```bash
cd /Users/jiazihui/Documents/Agent/CodeSpace/agent-prompts

# 全局安装 http-server (如果没有)
npm install -g http-server

# 运行
http-server

# 然后在浏览器打开: http://localhost:8080
```

#### 方式 3: VS Code Live Server
1. 在 VS Code 中打开文件夹
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 第三步：浏览页面

| 页面 | 链接 | 说明 |
|------|------|------|
| 首页 | http://localhost:8000 | 平台概况、功能、分类 |
| 浏览 | http://localhost:8000/browse.html | 搜索和浏览提示词 |
| 详情 | http://localhost:8000/prompt-detail.html | 单个提示词信息 |
| 上传 | http://localhost:8000/upload.html | 提交新提示词 |

## 📖 文档导读

### 如果你想了解...

#### 整个项目概况
→ 读 **README.md**
- 项目目标和特色
- 快速开始方法
- 文件结构说明

#### 产品功能和设计
→ 读 **PRD.md**
- 竞品分析
- 10+ 个功能模块详细说明
- 用户旅程地图
- 成功指标 (KPI)
- 发展路线图

#### 设计和 UI 规范
→ 读 **DESIGN_SYSTEM.md**
- 色彩系统 (蓝色、紫色、灰色)
- 排版规范 (大小、字体、行高)
- 间距系统 (8px 基数)
- 动画和过渡规范
- 组件规范 (按钮、输入框、卡片)
- 响应式和可访问性

#### 设计和 UI 代码
→ 查看 **HTML 文件**
- 使用 Tailwind CSS 实现
- 玻璃态效果
- 现代极简风格
- 完全响应式

## 🎨 设计亮点

### 1. 玻璃态效果 (Glassmorphism)
```html
<div class="glass rounded-xl p-6">
  <!-- 半透明背景 + 毛玻璃模糊 -->
</div>
```

### 2. 渐变色
```html
<h1 class="gradient-text">
  <!-- 蓝色到紫色的渐变文本 -->
</h1>
```

### 3. 平滑动画
```html
<div class="transition-smooth hover:shadow-lg">
  <!-- 150-300ms 的流畅过渡 -->
</div>
```

### 4. 响应式网格
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 移动端 1 列，平板 2 列，桌面 3 列 -->
</div>
```

## 🔧 自定义指南

### 修改颜色
编辑 `*.html` 文件中的 Tailwind 类：

```html
<!-- 改变主色为红色 -->
<!-- 原始: from-blue-500 to-purple-600 -->
<!-- 修改: from-red-500 to-orange-600 -->
<div class="bg-gradient-to-r from-red-500 to-orange-600">
```

### 修改文本
在 HTML 中直接编辑文本内容：

```html
<!-- 首页标题 -->
<h1 class="text-5xl font-bold">
  发现和分享 AI 提示词  ← 修改这里
</h1>
```

### 修改分类
在 `index.html` 和 `browse.html` 中修改分类按钮：

```html
<!-- 添加新分类 -->
<button class="glass rounded-lg p-6 group">
  <div class="text-3xl mb-2">🆕</div>
  <div class="font-semibold">新分类</div>
</button>
```

## 📱 浏览器兼容性

| 浏览器 | 支持 | 说明 |
|--------|------|------|
| Chrome | ✅ | 完全支持 |
| Firefox | ✅ | 完全支持 |
| Safari | ✅ | 完全支持 |
| Edge | ✅ | 完全支持 |
| IE 11 | ❌ | 不支持 (毛玻璃) |

## 🚀 后续开发步骤

### Phase 1: 功能完善 (当前阶段)
- [x] 响应式首页
- [x] 浏览和搜索页面
- [x] 提示词详情页
- [x] 上传表单页
- [ ] 添加交互功能 (JavaScript)
- [ ] 实现本地存储

### Phase 2: 动态化 (2-4 周)
- [ ] 迁移到 React/Vue
- [ ] 实现状态管理
- [ ] 连接 mock API
- [ ] 用户认证系统

### Phase 3: 后端集成 (4 周)
- [ ] Node.js/Python 后端
- [ ] PostgreSQL 数据库
- [ ] 搜索引擎 (Elasticsearch)
- [ ] 用户系统

### Phase 4: 上线运营 (进行中)
- [ ] 部署到 Vercel
- [ ] 监控和分析
- [ ] 性能优化
- [ ] SEO 优化

## 🎓 学习资源

### Tailwind CSS
- 官方文档: https://tailwindcss.com
- 最常用的 Tailwind 类速查表

### Glassmorphism 设计
- 参考网站: https://glassmorphism.com
- CSS 毛玻璃效果实现

### 响应式设计
- 移动优先设计原则
- Tailwind 断点系统 (sm, md, lg, xl)

### 可访问性 (A11y)
- Web Content Accessibility Guidelines (WCAG)
- 颜色对比度检查: https://contrast-ratio.com

## 💡 代码示例

### 创建新卡片
```html
<div class="glass rounded-lg p-6 hover:shadow-lg transition-smooth cursor-pointer">
  <h3 class="text-lg font-bold text-slate-900 mb-2">标题</h3>
  <p class="text-slate-600 line-clamp-2">描述文本...</p>
  <div class="flex justify-between mt-4 text-sm text-slate-500">
    <span><i class="fas fa-heart text-red-400"></i> 123</span>
    <span><i class="fas fa-star text-yellow-400"></i> 4.8</span>
  </div>
</div>
```

### 创建响应式网格
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div><!-- 卡片 1 --></div>
  <div><!-- 卡片 2 --></div>
  <div><!-- 卡片 3 --></div>
</div>
```

### 创建悬停效果
```html
<div class="
  glass rounded-lg p-6
  hover:shadow-lg hover:bg-white/80
  transition-smooth
  cursor-pointer
">
  内容
</div>
```

## 🐛 常见问题

### Q: 如何在本地预览？
A: 使用 `python -m http.server 8000` 然后访问 localhost:8000

### Q: 毛玻璃效果不显示？
A: 检查浏览器是否支持 `backdrop-filter`，Chrome/Firefox/Safari 都支持

### Q: 如何修改字体？
A: 编辑 HTML 头部的 `font-family`，或在 Tailwind 配置中修改

### Q: 如何添加新页面？
A: 复制现有的 HTML 文件，修改内容和链接即可

### Q: 能否在手机上预览？
A: 可以，但需要在同一 Wi-Fi 网络，使用设备 IP 访问

## 📞 获取帮助

### 遇到问题？
1. 检查浏览器控制台 (F12) 是否有错误
2. 查看 PRD.md 的功能说明
3. 参考 DESIGN_SYSTEM.md 的设计规范

### 需要修改？
- 基础文本: 直接编辑 HTML
- 样式调整: 修改 Tailwind 类
- 交互功能: 编写 JavaScript

## ✅ 检查清单

部署前检查：

- [ ] 所有链接都能点击
- [ ] 页面在手机上显示正常
- [ ] 文本清晰可读
- [ ] 没有拼写错误
- [ ] 图标正确显示
- [ ] 按钮有悬停效果
- [ ] 加载时间 < 2 秒

## 🎉 下一步

1. **本地运行**: `python -m http.server 8000`
2. **浏览页面**: 点击各个链接体验
3. **阅读文档**: 查看 PRD.md 了解功能
4. **开始开发**: 修改代码并实现功能

---

**需要帮助？** 查看 README.md 了解更多  
**想要学习设计？** 查看 DESIGN_SYSTEM.md  
**需要功能细节？** 查看 PRD.md  

祝你开发愉快！🚀
