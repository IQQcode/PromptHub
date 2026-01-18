# Agent Prompts - 设计系统文档

基于 ui-ux-pro-max 技能生成的完整设计系统指南。

## 📐 设计原则

### 1. 现代极简 (Minimalism)
- 移除不必要的视觉元素
- 清晰的信息层级
- 充足的留白和间距
- 最小化设计，最大化功能

### 2. 玻璃态效果 (Glassmorphism)
- 半透明的卡片和背景
- 毛玻璃模糊效果
- 分层感的视觉深度
- 现代高级感

### 3. 用户中心设计
- 任务流程清晰
- 操作反馈及时
- 加载状态明确
- 错误提示友好

## 🎨 色彩系统

### 主色板

```css
/* 蓝色系 - 主色 */
--color-blue-50: #F0F9FF
--color-blue-100: #E0F2FE
--color-blue-200: #BAE6FD
--color-blue-300: #7DD3FC
--color-blue-400: #38BDF8
--color-blue-500: #3B82F6  /* 主色 */
--color-blue-600: #2563EB
--color-blue-700: #1D4ED8
--color-blue-800: #1E40AF
--color-blue-900: #1E3A8A

/* 紫色系 - 辅助色 */
--color-purple-500: #A855F7
--color-purple-600: #9333EA

/* 灰色系 - 中性色 */
--color-slate-50: #F9FAFB
--color-slate-100: #F3F4F6
--color-slate-200: #E5E7EB
--color-slate-300: #D1D5DB
--color-slate-400: #9CA3AF
--color-slate-500: #6B7280
--color-slate-600: #475569
--color-slate-700: #374151
--color-slate-800: #1F2937
--color-slate-900: #111827

/* 功能色 */
--color-success: #10B981
--color-warning: #F59E0B
--color-error: #EF4444
--color-info: #3B82F6
```

### 使用场景

| 组件 | 颜色 | 说明 |
|------|------|------|
| Primary Button | Blue-500 | 主要行动按钮 |
| Primary Button Hover | Blue-600 | 按钮悬停状态 |
| Secondary Button | Slate-100 | 次要行动按钮 |
| Active State | Blue-600 | 激活/选中状态 |
| Success | Green-500 | 成功提示 |
| Warning | Amber-500 | 警告提示 |
| Error | Red-500 | 错误提示 |
| Text Primary | Slate-900 | 正文（亮色） |
| Text Secondary | Slate-600 | 辅助文本 |
| Border | Slate-300 | 边框（亮色） |
| Background | White / Slate-50 | 背景 |

## 📝 排版系统

### 字体栈

```css
/* 标题和正文 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 代码和单行显示 */
font-family: 'JetBrains Mono', 'Monaco', monospace;
```

### 大小规模

| 层级 | 尺寸 | 行高 | 用途 |
|------|------|------|------|
| H1 | 32px / 2rem | 1.2 | 页面标题 |
| H2 | 24px / 1.5rem | 1.3 | 章节标题 |
| H3 | 20px / 1.25rem | 1.4 | 子标题 |
| H4 | 18px / 1.125rem | 1.4 | 小标题 |
| Body | 16px / 1rem | 1.5-1.75 | 正文内容 |
| Small | 14px / 0.875rem | 1.5 | 辅助信息 |
| Micro | 12px / 0.75rem | 1.5 | 标签、计数 |

### 字体权重

| 权重 | 用途 |
|------|------|
| 400 (Normal) | 正文、默认文本 |
| 500 (Medium) | 副标题、强调 |
| 600 (Semibold) | 小标题、导航 |
| 700 (Bold) | 页面标题 |

## 📏 间距系统

基于 8px 基数的间距规模：

```css
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-5: 20px
--spacing-6: 24px
--spacing-7: 28px
--spacing-8: 32px
--spacing-10: 40px
--spacing-12: 48px
--spacing-16: 64px
```

### 使用规则

- **组件内部**: 使用小间距 (4-8px)
- **组件之间**: 使用中间距 (16-24px)
- **区块之间**: 使用大间距 (32-48px)
- **页面边距**: 移动端 16px，桌面端 24px+

## 🎯 圆角系统

```css
--radius-none: 0px
--radius-sm: 4px        /* 小按钮、输入框 */
--radius-md: 8px        /* 卡片、模态框 */
--radius-lg: 12px       /* 大卡片、面板 */
--radius-full: 9999px   /* 胶囊形、头像 */
```

## 💫 阴影系统

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

## 🎬 动画系统

### 过渡时间

```css
--duration-75: 75ms     /* 极快 */
--duration-100: 100ms   /* 快速 */
--duration-150: 150ms   /* 标准 */
--duration-200: 200ms   /* 缓慢 */
--duration-300: 300ms   /* 较慢 */
--duration-500: 500ms   /* 很慢 */
```

### 缓动函数

```css
--easing-linear: linear
--easing-in: cubic-bezier(0.4, 0, 1, 1)
--easing-out: cubic-bezier(0, 0, 0.2, 1)
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### 常见动画

| 动画 | 用途 | 时间 | 缓动 |
|------|------|------|------|
| Fade In/Out | 元素出现/消失 | 200ms | ease-in-out |
| Slide In | 侧边菜单、模态框 | 300ms | ease-out |
| Scale | 按钮、卡片悬停 | 150ms | ease-in-out |
| Bounce | 加载、通知 | 400ms | ease-out |

## 🔲 组件规范

### 按钮 (Button)

#### 主按钮 (Primary)
```html
<button class="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
  按钮文本
</button>
```

**尺寸规范**:
- 小: 32px 高度
- 中: 40px 高度（默认）
- 大: 48px 高度

**状态**:
- 默认: Blue-500
- 悬停: Blue-600
- 激活: Blue-700
- 禁用: Gray-300，opacity 0.5

#### 次级按钮 (Secondary)
```html
<button class="px-5 py-2.5 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors">
  按钮文本
</button>
```

### 输入框 (Input)

```html
<input 
  type="text"
  class="px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  placeholder="输入内容..."
>
```

**状态样式**:
- 默认: border-slate-300
- 聚焦: ring-2 ring-blue-500
- 错误: ring-2 ring-red-500
- 禁用: bg-slate-100, opacity 0.5

### 卡片 (Card)

#### 普通卡片
```html
<div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
  <!-- 内容 -->
</div>
```

#### 玻璃态卡片
```html
<div class="glass rounded-lg p-6">
  <!-- 内容 -->
</div>
```

**Glass 类定义**:
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 标签 (Tag)

```html
<span class="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
  标签
</span>
```

**变体**:
- 蓝色: bg-blue-100, text-blue-700
- 绿色: bg-green-100, text-green-700
- 紫色: bg-purple-100, text-purple-700
- 灰色: bg-gray-100, text-gray-700

## 📱 响应式设计

### 断点系统

```css
--breakpoint-sm: 640px    /* 小屏幕 */
--breakpoint-md: 768px    /* 平板 */
--breakpoint-lg: 1024px   /* 桌面 */
--breakpoint-xl: 1280px   /* 大屏幕 */
--breakpoint-2xl: 1536px  /* 超大屏幕 */
```

### 内容宽度

```css
--max-width-sm: 640px
--max-width-md: 768px
--max-width-lg: 1024px
--max-width-xl: 1280px
--max-width-2xl: 1536px
/* 推荐使用 max-w-6xl (1152px) 或 max-w-7xl (1280px) */
```

### 栅格系统

```html
<!-- 两列布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>列1</div>
  <div>列2</div>
</div>

<!-- 三列布局 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>列1</div>
  <div>列2</div>
  <div>列3</div>
</div>
```

## ♿ 可访问性 (A11y)

### 颜色对比度
- 普通文本: 4.5:1 以上
- 大型文本: 3:1 以上
- 组件边框: 3:1 以上

### 键盘导航
- Tab 顺序与视觉顺序一致
- 焦点状态清晰可见
- 所有交互元素都可用键盘操作

### 焦点样式

```css
/* 推荐焦点样式 */
:focus-visible {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
```

### ARIA 标签

```html
<!-- 图标按钮需要 aria-label -->
<button aria-label="关闭" class="p-2">
  <i class="fas fa-times"></i>
</button>

<!-- 表单输入需要关联标签 -->
<label for="email">邮箱</label>
<input id="email" type="email">

<!-- 列表和导航需要语义标签 -->
<nav aria-label="主导航">
  <ul>
    <li><a href="#">链接1</a></li>
  </ul>
</nav>
```

## 🎭 暗色模式支持

### 暗色模式色彩

```css
/* 暗色模式背景 */
--dark-bg-primary: #0F172A
--dark-bg-secondary: #1E293B
--dark-bg-tertiary: #334155

/* 暗色模式文本 */
--dark-text-primary: #F8FAFC
--dark-text-secondary: #CBD5E1
--dark-text-tertiary: #94A3B8

/* 暗色模式卡片 */
--dark-card: #1E293B
--dark-border: #334155
```

### 实现方式

```html
<html class="dark">
  <!-- 使用 dark: 前缀 -->
  <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
    内容
  </div>
</html>
```

## 🔌 组件库推荐

### 现成组件库
- **shadcn/ui** - React 组件库（推荐）
- **Headless UI** - React 无样式组件
- **Radix UI** - 无状态原始 UI 组件

### 图标库
- **Font Awesome** - 当前使用
- **Heroicons** - Tailwind 官方推荐
- **Lucide** - 现代、轻量的图标库

### 动画库
- **Framer Motion** - React 动画库
- **Tailwind CSS** - 内置基础动画
- **AOS** - 滚动触发动画

## 📋 设计检查清单

### 视觉设计
- [ ] 颜色对比度 ≥ 4.5:1
- [ ] 使用 Tailwind 定义的颜色
- [ ] 圆角值从系统规模选择
- [ ] 间距使用 8px 的倍数
- [ ] 阴影使用系统定义的阴影
- [ ] 没有使用 Emoji 作为 UI 图标
- [ ] 所有图标来自一致的图标库

### 交互设计
- [ ] 悬停状态清晰可见
- [ ] 焦点状态清晰可见
- [ ] 加载状态明确
- [ ] 错误提示友好
- [ ] 所有可交互元素有 cursor-pointer
- [ ] 过渡时间 150-300ms
- [ ] 使用 transform/opacity，不用 width/height

### 响应式设计
- [ ] 在 375px 宽度下正常显示
- [ ] 在 768px 宽度下正常显示
- [ ] 在 1024px 宽度下正常显示
- [ ] 在 1440px 宽度下正常显示
- [ ] 没有水平滚动条
- [ ] 文本可读性良好
- [ ] 图片自适应缩放

### 可访问性
- [ ] 所有图像都有 alt 文本
- [ ] 表单输入都有 label
- [ ] 按钮有清晰的文本标签
- [ ] 颜色不是唯一的信息指示
- [ ] 键盘可以访问所有功能
- [ ] 屏幕阅读器友好
- [ ] 支持 prefers-reduced-motion

### 性能
- [ ] 图片已优化（WebP、srcset、lazy loading）
- [ ] 没有阻塞渲染的脚本
- [ ] CSS 已压缩
- [ ] 不必要的动画已禁用
- [ ] 加载时间 < 3 秒

## 🚀 落地建议

### 阶段 1: 静态网页 (当前)
- HTML + Tailwind CSS + 原生 JavaScript
- 硬编码数据
- 本地运行

### 阶段 2: 动态化 (3-4 周)
- 迁移到 React 或 Vue
- 实现状态管理
- 连接 mock API
- 添加用户认证

### 阶段 3: 后端集成 (4 周)
- 构建真实 API
- 数据库设计
- 搜索功能实现
- 推荐算法

### 阶段 4: 上线部署 (进行中)
- 部署到 Vercel / AWS
- 配置 CDN
- 监控和分析
- 性能优化

---

**版本**: 1.0  
**基于**: ui-ux-pro-max 技能  
**最后更新**: 2024年  
**维护者**: Agent Prompts Team
