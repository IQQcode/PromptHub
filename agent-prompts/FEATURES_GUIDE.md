# Agent Prompts - 新功能完整使用指南

## 🎉 新增功能总览

本次更新为 Agent Prompts 增加了以下核心功能：

### ✨ 1. Hash 路由系统 - 完整的单页应用

- **功能详情页** - `/#/feature/1` ~ `/#/feature/6`
- **分类详情页** - `/#/category/{categoryId}`
- **提示词详情页** - `/#/prompt/{promptId}`
- **浏览页** - `/#/browse`
- **上传页** - `/#/upload`
- **首页** - `/#/home` 或 `/`

### 🌙 2. 暗黑模式支持

- 手动切换按钮（导航栏右上角）
- 自动检测系统偏好
- localStorage 记忆用户选择
- 所有页面完整的暗黑模式样式

### 📱 3. 移动响应式设计

- 完全自适应布局
- 手机端（375px+）、平板端（768px+）、桌面端（1024px+）完美支持
- 优化的字体大小和间距
- 触摸友好的按钮尺寸

### 🖱️ 4. 全页面交互支持

所有入口都已可点击，支持的操作包括：
- 功能卡片点击 → 跳转到功能详情页
- 分类卡片点击 → 跳转到分类详情页
- 提示词卡片点击 → 跳转到提示词详情页
- 上传按钮 → 跳转到上传页面
- 浏览按钮 → 跳转到浏览页面
- 立即开始按钮 → 跳转到浏览页面
- 返回按钮 → 返回上一页

---

## 🚀 快速开始

### 本地运行

```bash
# 进入项目目录
cd /Users/jiazihui/Documents/Agent/CodeSpace/agent-prompts

# 启动本地服务器
python -m http.server 8000

# 在浏览器打开
http://localhost:8000
```

### 测试路由

在浏览器中尝试以下链接：

| 功能 | URL |
|------|-----|
| 首页 | `http://localhost:8000/` |
| 功能详情 1 | `http://localhost:8000/#/feature/1` |
| 功能详情 2 | `http://localhost:8000/#/feature/2` |
| 分类详情 (AI工具) | `http://localhost:8000/#/category/ai-tools` |
| 分类详情 (文案) | `http://localhost:8000/#/category/copywriting` |
| 提示词详情 1 | `http://localhost:8000/#/prompt/1` |
| 浏览页 | `http://localhost:8000/#/browse` |
| 上传页 | `http://localhost:8000/#/upload` |

---

## 🎨 暗黑模式测试

### 启用暗黑模式

1. 打开网页
2. 点击导航栏右上角的 🌙 图标
3. 页面将切换到暗黑模式

### 功能说明

- **自动记忆** - 关闭浏览器后，再次打开会保持上次的主题选择
- **系统偏好** - 首次访问时会自动检测系统暗黑模式设置
- **完整支持** - 所有页面（包括动态生成的详情页）都支持暗黑模式

---

## 📱 响应式设计测试

### 测试各个断点

在浏览器开发者工具中测试以下设备尺寸：

| 设备 | 宽度 | 特点 |
|------|------|------|
| 小手机 | 375px | 单列、简化导航 |
| 手机 | 568px | 单列、优化间距 |
| 平板 | 768px | 双列布局 |
| 小屏 | 1024px | 三列布局 |
| 桌面 | 1440px | 完整布局 |

**测试方式：**
```
Chrome DevTools → 点击设备工具栏 → 选择不同设备或自定义宽度
```

---

## 🔗 路由系统详解

### 核心文件

#### 1. `app.js` (核心应用程序)

包含以下模块：

**AppData** - 模拟数据层
- `features[]` - 6个功能模块数据
- `categories[]` - 10个分类数据  
- `prompts[]` - 提示词样本数据

**ThemeManager** - 主题管理
- `init()` - 初始化主题
- `setTheme(theme)` - 设置主题
- `toggle()` - 切换主题
- `isDark()` - 检查是否暗黑模式

**AppRouter** - 路由管理
- `navigate(page, params)` - 导航到页面
- `handleRouteChange()` - 处理路由变化

**AppUI** - UI 渲染引擎
- `render(page, params)` - 渲染页面
- `renderFeatureDetail()` - 渲染功能详情
- `renderCategoryDetail()` - 渲染分类详情
- `renderPromptDetail()` - 渲染提示词详情
- 等等...

#### 2. `index.html` (主页面)

- 导航栏（包含主题切换按钮）
- Hero 部分
- 功能卡片（6个，都可点击）
- 分类网格（10个，都可点击）
- 最新提示词列表（3个示例，都可点击）
- CTA 和页脚

**数据属性：**
```html
data-feature-id="1"        <!-- 功能卡片 -->
data-category-id="ai-tools" <!-- 分类卡片 -->
data-prompt-id="1"         <!-- 提示词卡片 -->
data-action="upload"       <!-- 上传按钮 -->
data-action="browse"       <!-- 浏览按钮 -->
data-action="start"        <!-- 立即开始按钮 -->
```

---

## 🛠️ 后端接口预留

### API 端点设计

所有应用程序已为以下后端接口预留了位置：

```javascript
// 后端 API 调用示例 (在 app.js 中添加)

// 获取功能列表
// GET /api/features
AppData.features = await fetch('/api/features').then(r => r.json());

// 获取分类列表
// GET /api/categories
AppData.categories = await fetch('/api/categories').then(r => r.json());

// 获取提示词列表
// GET /api/prompts?category={id}&sort={sort}
AppData.prompts = await fetch('/api/prompts').then(r => r.json());

// 搜索提示词
// GET /api/prompts/search?q={query}
const results = await fetch(`/api/prompts/search?q=${query}`).then(r => r.json());

// 上传提示词
// POST /api/prompts
const newPrompt = await fetch('/api/prompts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(promptData)
}).then(r => r.json());
```

### 集成后端的步骤

1. 在 `app.js` 中的 `init()` 函数中添加 API 调用
2. 将模拟数据替换为真实 API 响应
3. 添加加载状态和错误处理
4. 更新搜索和筛选逻辑

---

## 📋 功能清单

### ✅ 已实现

- [x] Hash 路由系统（6 个路由页面）
- [x] 主题切换（亮色 / 暗黑）
- [x] 所有页面响应式设计
- [x] 功能详情页（含相关推荐）
- [x] 分类详情页（含提示词列表）
- [x] 提示词详情页（含复制功能）
- [x] 浏览页面（含分类网格）
- [x] 上传页面（含表单）
- [x] 所有按钮可点击
- [x] localStorage 主题保存
- [x] 系统暗黑模式检测

### 🔄 后续可实现

- [ ] 集成真实后端 API
- [ ] 用户认证系统
- [ ] 实时搜索和筛选
- [ ] 收藏和历史记录
- [ ] 评分和评论系统
- [ ] 提示词上传审核
- [ ] 数据分析和统计
- [ ] 社交分享功能

---

## 🐛 调试技巧

### 1. 查看当前路由

打开浏览器控制台：
```javascript
console.log(AppRouter.currentRoute);
```

### 2. 查看主题状态

```javascript
console.log(ThemeManager.isDark()); // true 或 false
```

### 3. 手动导航

```javascript
AppRouter.navigate('feature', [1]); // 跳转到功能详情页 1
AppRouter.navigate('category', ['ai-tools']); // 跳转到分类详情页
AppRouter.navigate('prompt', [1]); // 跳转到提示词详情页 1
```

### 4. 切换主题

```javascript
ThemeManager.toggle(); // 切换亮色/暗黑
ThemeManager.setTheme('dark'); // 设置为暗黑
ThemeManager.setTheme('light'); // 设置为亮色
```

### 5. 查看模拟数据

```javascript
console.log(AppData.features); // 功能数据
console.log(AppData.categories); // 分类数据
console.log(AppData.prompts); // 提示词数据
```

---

## 📊 文件统计

| 文件 | 大小 | 行数 | 说明 |
|------|------|------|------|
| index.html | 36KB | 600+ | 主页面（更新版） |
| app.js | 27KB | 620+ | 应用程序核心 |
| 其他文件 | - | - | 保留原有页面 |

**总计：** 100KB+ 的功能完整的单页应用

---

## 🎯 下一步

1. **测试所有路由** - 确保每个链接都能工作
2. **测试暗黑模式** - 在不同设备上验证
3. **测试响应式** - 在各个断点验证布局
4. **准备后端** - 设计并实现 API 端点
5. **集成后端** - 将模拟数据替换为 API 调用
6. **用户测试** - 收集反馈并优化

---

## 💡 关键设计决策

### 为什么选择 Hash 路由？

✅ **优势：**
- 无需后端服务器支持
- 即插即用，无构建过程
- 兼容所有浏览器
- 对 SEO 无负面影响

❌ **局限：**
- URL 中带有 `#` 符号
- 不能在服务器端渲染

### 为什么使用模拟数据？

✅ **优势：**
- 快速原型开发
- 后端接口可自由设计
- 便于测试各种场景

### 暗黑模式实现方案

✅ **亮点：**
- 系统偏好自动检测
- 用户偏好记忆保存
- 所有元素全面覆盖
- 性能无损（纯 CSS 切换）

---

## 📞 常见问题

**Q: 如何添加新的提示词？**  
A: 在 `app.js` 的 `AppData.prompts[]` 中添加新对象

**Q: 如何修改分类？**  
A: 在 `app.js` 的 `AppData.categories[]` 中编辑

**Q: 如何连接后端？**  
A: 在 `app.js` 中的各个 `render*()` 函数中添加 API 调用

**Q: 暗黑模式为什么在某些地方显示不对？**  
A: 检查是否为所有 `bg-*` 和 `text-*` 类添加了 `dark:` 前缀

**Q: 如何部署到服务器？**  
A: 将所有文件上传到服务器，设置 `index.html` 作为默认文件，配置所有 URL 重定向到 `index.html`

---

**版本：** 2.0  
**更新日期：** 2024年  
**状态：** 功能完整，可继续开发
