/**
 * Agent Prompts - 前端应用程序
 * 功能：路由管理、状态管理、模拟数据、暗黑模式
 */

// ============================================================================
// 1. 数据管理层 (模拟数据 + 后端接口预留)
// ============================================================================

const AppData = {
  // 功能模块列表
  features: [
    {
      id: 1,
      title: '智能搜索',
      icon: 'fas fa-search',
      color: 'from-blue-500 to-blue-600',
      description: '支持中英文、模糊匹配、拼音搜索。秒级返回相关结果，找到你需要的提示词。',
      fullDescription: '我们的智能搜索系统采用先进的NLP技术，支持中文、英文、拼音等多种搜索方式。无论您输入完整的关键词还是模糊的描述，系统都能在毫秒级内返回最相关的结果。',
      features: ['中英文混合搜索', '拼音搜索支持', '模糊匹配算法', '搜索历史记录', '热门搜索建议']
    },
    {
      id: 2,
      title: '自由上传',
      icon: 'fas fa-upload',
      color: 'from-purple-500 to-purple-600',
      description: '分享你的提示词创意。支持批量导入、模板选择、实时预览。让优质内容被看见。',
      fullDescription: '允许用户上传高质量的提示词。系统提供智能分类建议、格式验证、内容检测等功能，确保所有上传的内容都符合质量标准。',
      features: ['智能分类建议', '格式自动检测', '批量导入功能', '实时预览', '内容质量检测']
    },
    {
      id: 3,
      title: '收藏管理',
      icon: 'fas fa-heart',
      color: 'from-pink-500 to-pink-600',
      description: '创建个人收藏夹。同步到云端，随时随地访问你的提示词库。支持多设备同步。',
      fullDescription: '建立你个人的提示词库。创建多个收藏夹进行分类管理，支持云端同步和多设备访问。',
      features: ['多个收藏夹', '云端同步', '标签管理', '分享收藏', '导出功能']
    },
    {
      id: 4,
      title: '一键复制',
      icon: 'fas fa-copy',
      color: 'from-green-500 to-green-600',
      description: '极速复制提示词内容。直接粘贴到 ChatGPT、Claude 等 AI 工具。提高效率 10 倍。',
      fullDescription: '快速复制提示词内容到剪贴板。支持格式保留、批量复制、复制历史等功能。',
      features: ['秒级复制', '格式保留', '复制计数', '复制历史', '快捷键支持']
    },
    {
      id: 5,
      title: '评分评论',
      icon: 'fas fa-star',
      color: 'from-orange-500 to-orange-600',
      description: '社区驱动的质量评估。用户评分和评论帮助发现最佳提示词。高质量内容浮出水面。',
      fullDescription: '用户可以对提示词进行五星评分和留言评论。系统根据评分和评论质量进行排序和推荐。',
      features: ['五星评分', '用户评论', '评论点赞', '审核机制', '热门评论']
    },
    {
      id: 6,
      title: '数据分析',
      icon: 'fas fa-chart-line',
      color: 'from-cyan-500 to-cyan-600',
      description: '查看提示词使用统计。热度排行、版本历史、个人贡献统计。了解内容表现。',
      fullDescription: '详细的数据分析和统计。查看提示词的使用趋势、热度排名、版本历史等数据。',
      features: ['使用统计', '热度排行', '版本历史', '趋势分析', '导出报告']
    }
  ],

  // 分类列表
  categories: [
    {
      id: 'ai-tools',
      name: 'AI 工具',
      icon: '🤖',
      count: 2456,
      description: 'ChatGPT、Claude、Midjourney 等 AI 工具的提示词'
    },
    {
      id: 'copywriting',
      name: '文案创意',
      icon: '✍️',
      count: 1834,
      description: '营销、品牌、社交媒体文案相关提示词'
    },
    {
      id: 'coding',
      name: '代码编程',
      icon: '💻',
      count: 3021,
      description: '代码开发、调试、优化相关提示词'
    },
    {
      id: 'education',
      name: '学习教育',
      icon: '📚',
      count: 2145,
      description: '笔记、总结、讲解相关提示词'
    },
    {
      id: 'data',
      name: '数据分析',
      icon: '📊',
      count: 1567,
      description: '数据统计、可视化、洞察相关提示词'
    },
    {
      id: 'content',
      name: '内容创作',
      icon: '🎨',
      count: 1789,
      description: '写作、视频、设计相关提示词'
    },
    {
      id: 'business',
      name: '商业策略',
      icon: '💼',
      count: 1432,
      description: '产品、运营、增长相关提示词'
    },
    {
      id: 'productivity',
      name: '生产力工具',
      icon: '⚡',
      count: 2678,
      description: '效率、时间管理相关提示词'
    },
    {
      id: 'professional',
      name: '专业领域',
      icon: '🏥',
      count: 890,
      description: '医疗、法律、财务相关提示词'
    },
    {
      id: 'featured',
      name: '精选推荐',
      icon: '🌟',
      count: 412,
      description: '编辑精心推荐的优质提示词'
    }
  ],

  // 提示词列表 (样本数据)
  prompts: [
    {
      id: 1,
      title: '专业内容营销文案生成器',
      category: 'copywriting',
      description: '用这个提示词指示 AI 生成高转化率的营销文案。适用于产品介绍、广告文案、电商描述等场景...',
      tags: ['文案创意', '中级'],
      likes: 234,
      rating: 4.8,
      comments: 12,
      author: '用户名',
      content: `你是一位经验丰富的市场营销专家和内容创意大师。你的任务是根据以下信息为品牌或产品创作高转化率的营销文案。

**要求：**
- 文案要简洁有力，避免冗余
- 突出产品的核心价值和独特卖点
- 使用吸引人的词汇和情感共鸣的表达
- 针对目标用户进行定制
- 包含明确的行动召唤 (CTA)

**输入信息：**
- 产品名称：{产品名称}
- 产品类型：{产品类型}
- 目标用户：{目标用户描述}
- 核心特性：{列出3-5个特性}
- 预期用途：{用途描述}

现在，请开始为我创作营销文案。`
    },
    {
      id: 2,
      title: '代码审查助手 - 深度分析',
      category: 'coding',
      description: '让 AI 扮演资深代码审查专家，对你的代码进行深度分析、提出改进建议、找出潜在 bug...',
      tags: ['代码编程', '高级'],
      likes: 567,
      rating: 4.9,
      comments: 45,
      author: '开发者',
      content: `你是一位资深的代码审查专家，拥有 15 年以上的开发经验。你的任务是对提供的代码进行深度分析...`
    },
    {
      id: 3,
      title: '学习笔记自动生成',
      category: 'education',
      description: '输入课程内容或文章，AI 自动生成结构清晰的学习笔记、思维导图和重点总结...',
      tags: ['学习教育', '初级'],
      likes: 892,
      rating: 4.7,
      comments: 78,
      author: '学生',
      content: `你是一位专业的教育顾问和笔记整理专家。你的任务是根据用户提供的课程内容或文章...`
    }
  ]
};

// ============================================================================
// 2. 路由和状态管理
// ============================================================================

const AppRouter = {
  currentRoute: 'home',
  
  init() {
    // 初始化路由
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  },

  handleRouteChange() {
    const hash = window.location.hash.slice(1) || 'home';
    const [page, ...params] = hash.split('/');
    this.currentRoute = page;
    
    AppUI.render(page, params);
  },

  navigate(page, params = []) {
    const hash = params.length > 0 ? `${page}/${params.join('/')}` : page;
    window.location.hash = hash;
  }
};

// ============================================================================
// 3. 主题管理 (暗黑模式)
// ============================================================================

const ThemeManager = {
  init() {
    // 从 localStorage 读取主题偏好
    const savedTheme = localStorage.getItem('app-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  },

  setTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('app-theme', theme);
  },

  toggle() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  },

  isDark() {
    return document.documentElement.classList.contains('dark');
  }
};

// ============================================================================
// 4. UI 渲染引擎
// ============================================================================

const AppUI = {
  render(page, params) {
    const container = document.getElementById('app-container');
    
    switch(page) {
      case 'home':
        this.renderHome(container);
        break;
      case 'feature':
        this.renderFeatureDetail(container, params[0]);
        break;
      case 'category':
        this.renderCategoryDetail(container, params[0]);
        break;
      case 'prompt':
        this.renderPromptDetail(container, params[0]);
        break;
      case 'browse':
        this.renderBrowse(container);
        break;
      case 'upload':
        this.renderUpload(container);
        break;
      default:
        this.renderHome(container);
    }

    // 滚动到顶部
    window.scrollTo(0, 0);
  },

  renderHome(container) {
    // 首页已在 HTML 中静态定义，这里只需要重新初始化事件
    this.initHomeEvents();
  },

  renderFeatureDetail(container, featureId) {
    const feature = AppData.features.find(f => f.id == featureId);
    if (!feature) {
      this.renderHome(container);
      return;
    }

    container.innerHTML = `
      <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <!-- 导航 -->
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">${feature.title}</h1>
            <div class="w-12"></div>
          </div>
        </nav>

        <!-- 内容 -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <!-- 标题区 -->
          <div class="mb-12">
            <div class="inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6">
              <i class="${feature.icon} text-white text-3xl"></i>
            </div>
            <h1 class="text-5xl font-bold text-slate-900 dark:text-white mb-4">${feature.title}</h1>
            <p class="text-xl text-slate-600 dark:text-slate-300">${feature.fullDescription}</p>
          </div>

          <!-- 功能列表 -->
          <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 mb-12">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">核心功能</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${feature.features.map(f => `
                <div class="flex items-start gap-3">
                  <i class="fas fa-check text-green-500 mt-1 flex-shrink-0"></i>
                  <span class="text-slate-700 dark:text-slate-300">${f}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 相关提示词 -->
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">相关提示词</h2>
            <div class="space-y-4">
              ${AppData.prompts.slice(0, 3).map(p => `
                <div class="glass dark:glass-dark rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all" onclick="AppRouter.navigate('prompt', ['${p.id}'])">
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-2">${p.title}</h3>
                  <p class="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">${p.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCategoryDetail(container, categoryId) {
    const category = AppData.categories.find(c => c.id === categoryId);
    if (!category) {
      this.renderHome(container);
      return;
    }

    // 过滤该分类下的提示词 (模拟数据)
    const categoryPrompts = AppData.prompts.filter(p => p.category === categoryId);

    container.innerHTML = `
      <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <!-- 导航 -->
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">${category.name}</h1>
            <div class="w-12"></div>
          </div>
        </nav>

        <!-- 内容 -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <!-- 分类头部 -->
          <div class="mb-12">
            <div class="text-6xl mb-4">${category.icon}</div>
            <h1 class="text-5xl font-bold text-slate-900 dark:text-white mb-3">${category.name}</h1>
            <p class="text-lg text-slate-600 dark:text-slate-300 mb-4">${category.description}</p>
            <div class="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              ${category.count} 个提示词
            </div>
          </div>

          <!-- 提示词列表 -->
          <div class="space-y-4">
            ${categoryPrompts.length > 0 ? categoryPrompts.map(p => `
              <div class="glass dark:glass-dark rounded-lg p-6 card-hover cursor-pointer group transition-all" onclick="AppRouter.navigate('prompt', ['${p.id}'])">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">${p.title}</h3>
                  <i class="fas fa-arrow-right text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>
                <p class="text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">${p.description}</p>
                <div class="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-4">
                    <span><i class="fas fa-heart text-red-400 mr-1"></i> ${p.likes}</span>
                    <span><i class="fas fa-star text-yellow-400 mr-1"></i> ${p.rating}</span>
                    <span><i class="fas fa-comment text-slate-400 mr-1"></i> ${p.comments}</span>
                  </div>
                  <span>by @${p.author}</span>
                </div>
              </div>
            `).join('') : `
              <div class="text-center py-12">
                <p class="text-slate-600 dark:text-slate-300 text-lg">该分类暂无提示词，敬请期待</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  },

  renderPromptDetail(container, promptId) {
    const prompt = AppData.prompts.find(p => p.id == promptId);
    if (!prompt) {
      this.renderHome(container);
      return;
    }

    container.innerHTML = `
      <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <!-- 导航 -->
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">提示词详情</h1>
            <div class="w-12"></div>
          </div>
        </nav>

        <!-- 内容 -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <!-- 标题 -->
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">${prompt.title}</h1>
            <div class="flex flex-wrap gap-2 mb-6">
              ${prompt.tags.map(tag => `
                <span class="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">${tag}</span>
              `).join('')}
            </div>
            <div class="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div>作者：<strong>@${prompt.author}</strong></div>
              <div><i class="fas fa-heart text-red-400 mr-1"></i> ${prompt.likes}</div>
              <div><i class="fas fa-star text-yellow-400 mr-1"></i> ${prompt.rating}</div>
              <div><i class="fas fa-comment text-slate-400 mr-1"></i> ${prompt.comments}</div>
            </div>
          </div>

          <!-- 提示词内容 -->
          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 mb-8 border border-slate-200 dark:border-slate-700">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">提示词内容</h2>
            <pre class="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">${prompt.content}</pre>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button onclick="navigator.clipboard.writeText(\`${prompt.content.replace(/`/g, '\\`')}\`); alert('已复制到剪贴板')" class="px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors flex items-center gap-2">
              <i class="fas fa-copy"></i>
              复制提示词
            </button>
            <button class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
              <i class="fas fa-heart"></i>
              收藏
            </button>
            <button class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
              <i class="fas fa-share"></i>
              分享
            </button>
          </div>

          <!-- 相关提示词 -->
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">相关提示词</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${AppData.prompts.filter(p => p.id !== prompt.id).slice(0, 2).map(p => `
                <div class="glass dark:glass-dark rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all" onclick="AppRouter.navigate('prompt', ['${p.id}'])">
                  <h3 class="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">${p.title}</h3>
                  <p class="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">${p.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderBrowse(container) {
    container.innerHTML = `
      <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">浏览提示词</h1>
            <div class="w-12"></div>
          </div>
        </nav>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">所有分类</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            ${AppData.categories.map(cat => `
              <button onclick="AppRouter.navigate('category', ['${cat.id}'])" class="glass dark:glass-dark rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                <div class="text-4xl mb-3">${cat.icon}</div>
                <h3 class="font-semibold text-slate-900 dark:text-white mb-2">${cat.name}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-300">${cat.count} 个</p>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderUpload(container) {
    container.innerHTML = `
      <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button onclick="window.history.back()" class="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <i class="fas fa-arrow-left"></i>
              <span>返回</span>
            </button>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">上传提示词</h1>
            <div class="w-12"></div>
          </div>
        </nav>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-900 dark:text-white mb-2">标题</label>
              <input type="text" placeholder="请输入提示词标题" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-900 dark:text-white mb-2">描述</label>
              <textarea placeholder="请输入提示词简要描述" rows="3" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-900 dark:text-white mb-2">完整内容</label>
              <textarea placeholder="请输入完整的提示词内容" rows="8" class="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors font-mono text-sm resize-none"></textarea>
            </div>
            <div class="flex gap-4">
              <button type="submit" class="px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors">提交</button>
              <button type="button" onclick="window.history.back()" class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">取消</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  initHomeEvents() {
    // 功能卡片点击事件
    document.querySelectorAll('[data-feature-id]').forEach(el => {
      el.addEventListener('click', () => {
        const featureId = el.getAttribute('data-feature-id');
        AppRouter.navigate('feature', [featureId]);
      });
    });

    // 分类卡片点击事件
    document.querySelectorAll('[data-category-id]').forEach(el => {
      el.addEventListener('click', () => {
        const categoryId = el.getAttribute('data-category-id');
        AppRouter.navigate('category', [categoryId]);
      });
    });

    // 提示词卡片点击事件
    document.querySelectorAll('[data-prompt-id]').forEach(el => {
      el.addEventListener('click', () => {
        const promptId = el.getAttribute('data-prompt-id');
        AppRouter.navigate('prompt', [promptId]);
      });
    });

    // 上传按钮
    document.querySelectorAll('[data-action="upload"]').forEach(el => {
      el.addEventListener('click', () => {
        AppRouter.navigate('upload');
      });
    });

    // 浏览按钮
    document.querySelectorAll('[data-action="browse"]').forEach(el => {
      el.addEventListener('click', () => {
        AppRouter.navigate('browse');
      });
    });

    // 立即开始按钮
    document.querySelectorAll('[data-action="start"]').forEach(el => {
      el.addEventListener('click', () => {
        AppRouter.navigate('browse');
      });
    });

    // 搜索功能
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          console.log('搜索:', searchInput.value);
          // TODO: 连接后端搜索 API
        }
      });
    }
  }
};

// ============================================================================
// 5. 应用初始化
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  AppRouter.init();
  AppUI.initHomeEvents();
});
