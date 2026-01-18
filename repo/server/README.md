# PromptGo 后端 API 服务

> 本文档说明 PromptGo 后端 API 的目录结构规划、待实现接口清单和数据库表结构设计建议。

---

## 一、目录结构规划

```
server/
├── src/
│   ├── controllers/           # 控制器层
│   │   ├── prompt.controller.ts
│   │   ├── user.controller.ts
│   │   ├── category.controller.ts
│   │   ├── tag.controller.ts
│   │   └── search.controller.ts
│   │
│   ├── services/              # 业务逻辑层
│   │   ├── prompt.service.ts
│   │   ├── user.service.ts
│   │   ├── auth.service.ts
│   │   ├── favorite.service.ts
│   │   └── search.service.ts
│   │
│   ├── models/                # 数据模型层
│   │   ├── prompt.model.ts
│   │   ├── user.model.ts
│   │   ├── favorite.model.ts
│   │   ├── category.model.ts
│   │   └── tag.model.ts
│   │
│   ├── middlewares/           # 中间件
│   │   ├── auth.middleware.ts       # 用户认证
│   │   ├── apiKey.middleware.ts     # API Key 验证
│   │   ├── rateLimit.middleware.ts  # 限流
│   │   └── validator.middleware.ts  # 参数校验
│   │
│   ├── routes/                # 路由定义
│   │   ├── index.ts
│   │   ├── prompt.routes.ts
│   │   ├── user.routes.ts
│   │   └── search.routes.ts
│   │
│   ├── utils/                 # 工具函数
│   │   ├── response.ts        # 统一响应格式
│   │   ├── validator.ts       # 变量解析等
│   │   └── pagination.ts      # 分页处理
│   │
│   ├── config/                # 配置文件
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── app.ts
│   │
│   └── app.ts                 # 应用入口
│
├── prisma/                    # Prisma ORM (可选)
│   └── schema.prisma
│
├── tests/                     # 测试文件
│   ├── prompt.test.ts
│   └── user.test.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 二、待实现接口清单

### 2.1 公开接口（无需认证）

| 接口 | 方法 | 说明 | 优先级 |
|-----|------|------|-------|
| `GET /api/prompts` | GET | 获取 Prompt 列表（分页、筛选） | P0 |
| `GET /api/prompts/:id` | GET | 获取单个 Prompt 详情 | P0 |
| `GET /api/categories` | GET | 获取分类列表 | P0 |
| `GET /api/tags` | GET | 获取标签列表 | P1 |
| `GET /api/search` | GET | 全文搜索 Prompt | P0 |
| `POST /api/prompts/:id/use` | POST | 记录使用次数 | P1 |

### 2.2 用户认证接口

| 接口 | 方法 | 说明 | 优先级 |
|-----|------|------|-------|
| `POST /api/auth/register` | POST | 邮箱注册 | P0 |
| `POST /api/auth/login` | POST | 邮箱登录 | P0 |
| `POST /api/auth/logout` | POST | 退出登录 | P1 |
| `POST /api/auth/refresh` | POST | 刷新 Token | P1 |
| `GET /api/auth/github` | GET | GitHub OAuth | P2 |
| `GET /api/auth/google` | GET | Google OAuth | P2 |

### 2.3 授权接口（需登录态）

| 接口 | 方法 | 说明 | 优先级 |
|-----|------|------|-------|
| `POST /api/prompts` | POST | 创建 Prompt | P0 |
| `PUT /api/prompts/:id` | PUT | 更新 Prompt（仅作者） | P0 |
| `DELETE /api/prompts/:id` | DELETE | 删除 Prompt（仅作者） | P0 |
| `GET /api/user/favorites` | GET | 获取收藏列表 | P0 |
| `POST /api/user/favorites/:id` | POST | 添加收藏 | P0 |
| `DELETE /api/user/favorites/:id` | DELETE | 取消收藏 | P0 |
| `GET /api/user/prompts` | GET | 获取我上传的 | P1 |
| `GET /api/user/stats` | GET | 获取使用统计 | P2 |
| `PUT /api/user/profile` | PUT | 更新个人信息 | P1 |

### 2.4 API Key 接口（需 API Key）

| 接口 | 方法 | 说明 | 优先级 |
|-----|------|------|-------|
| `POST /api/v1/prompts` | POST | 通过 API 创建 Prompt | P1 |
| `PUT /api/v1/prompts/:id` | PUT | 通过 API 更新 Prompt | P1 |
| `DELETE /api/v1/prompts/:id` | DELETE | 通过 API 删除 Prompt | P1 |
| `GET /api/user/apikey` | GET | 获取 API Key | P1 |
| `POST /api/user/apikey` | POST | 生成 API Key | P1 |
| `DELETE /api/user/apikey` | DELETE | 重置 API Key | P2 |

---

## 三、数据库表结构设计

### 3.1 prompts 表 - Prompt 数据

```sql
CREATE TABLE prompts (
    id              VARCHAR(36) PRIMARY KEY,           -- UUID
    title           VARCHAR(50) NOT NULL,              -- 标题
    description     VARCHAR(200) NOT NULL,             -- 描述
    content         TEXT NOT NULL,                     -- Prompt 内容
    category_id     VARCHAR(36) NOT NULL,              -- 分类 ID
    language        ENUM('zh', 'en', 'both') NOT NULL, -- 语言
    variables       JSON,                              -- 解析出的变量 [{ name, default, description }]
    use_count       INT DEFAULT 0,                     -- 使用次数
    favorite_count  INT DEFAULT 0,                     -- 收藏次数
    author_id       VARCHAR(36) NOT NULL,              -- 作者 ID
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_created (created_at DESC),
    INDEX idx_use_count (use_count DESC),
    INDEX idx_favorite_count (favorite_count DESC),
    FULLTEXT INDEX idx_fulltext (title, description, content)
);
```

### 3.2 prompt_tags 表 - Prompt 与标签关联

```sql
CREATE TABLE prompt_tags (
    prompt_id   VARCHAR(36) NOT NULL,
    tag_id      VARCHAR(36) NOT NULL,
    
    PRIMARY KEY (prompt_id, tag_id),
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

### 3.3 prompt_models 表 - Prompt 与模型关联

```sql
CREATE TABLE prompt_models (
    prompt_id   VARCHAR(36) NOT NULL,
    model_name  VARCHAR(50) NOT NULL,              -- GPT-4, Claude, 文心一言 等
    
    PRIMARY KEY (prompt_id, model_name),
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE
);
```

### 3.4 users 表 - 用户数据

```sql
CREATE TABLE users (
    id              VARCHAR(36) PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255),                  -- 第三方登录可为空
    nickname        VARCHAR(50) NOT NULL,
    avatar          VARCHAR(500),
    provider        ENUM('email', 'github', 'google', 'wechat') DEFAULT 'email',
    provider_id     VARCHAR(255),                  -- 第三方 ID
    api_key         VARCHAR(64) UNIQUE,            -- API Key
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE INDEX idx_provider (provider, provider_id)
);
```

### 3.5 favorites 表 - 收藏关系

```sql
CREATE TABLE favorites (
    id          VARCHAR(36) PRIMARY KEY,
    user_id     VARCHAR(36) NOT NULL,
    prompt_id   VARCHAR(36) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE INDEX idx_user_prompt (user_id, prompt_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE
);
```

### 3.6 categories 表 - 分类数据

```sql
CREATE TABLE categories (
    id          VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(50) NOT NULL,              -- 中文名称
    name_en     VARCHAR(50) NOT NULL,              -- 英文名称
    slug        VARCHAR(50) UNIQUE NOT NULL,       -- URL 标识 (writing, programming 等)
    icon        VARCHAR(10),                       -- Emoji 图标
    sort_order  INT DEFAULT 0,                     -- 排序权重
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初始分类数据
INSERT INTO categories (id, name, name_en, slug, icon, sort_order) VALUES
('cat_001', '写作辅助', 'Writing', 'writing', '✍️', 1),
('cat_002', '文章/报告', 'Article', 'article', '📄', 2),
('cat_003', 'IT/编程', 'Programming', 'programming', '💻', 3),
('cat_004', 'AI', 'AI', 'ai', '🤖', 4),
('cat_005', '生活质量', 'Lifestyle', 'lifestyle', '🏠', 5),
('cat_006', '教育/学生', 'Education', 'education', '📚', 6),
('cat_007', '学术/教师', 'Academic', 'academic', '🎓', 7),
('cat_008', '语言/翻译', 'Translation', 'translation', '🌐', 8),
('cat_009', 'SEO', 'SEO', 'seo', '📈', 9),
('cat_010', '工具', 'Tools', 'tools', '🔧', 10),
('cat_011', '游戏', 'Games', 'games', '🎮', 11),
('cat_012', '音乐', 'Music', 'music', '🎵', 12),
('cat_013', '医疗健康', 'Health', 'health', '🏥', 13),
('cat_014', '金融顾问', 'Finance', 'finance', '💰', 14),
('cat_015', '企业职位', 'Business', 'business', '💼', 15),
('cat_016', '心理/社交', 'Psychology', 'psychology', '💭', 16),
('cat_017', '哲学/宗教', 'Philosophy', 'philosophy', '🧘', 17),
('cat_018', '发散思维', 'Creative', 'creative', '💡', 18),
('cat_019', '趣味知识', 'Fun', 'fun', '🎯', 19),
('cat_020', '其他', 'Other', 'other', '📦', 20);
```

### 3.7 tags 表 - 标签数据

```sql
CREATE TABLE tags (
    id          VARCHAR(36) PRIMARY KEY,
    name        VARCHAR(50) UNIQUE NOT NULL,
    use_count   INT DEFAULT 0,                     -- 使用次数（用于热门排序）
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.8 sessions 表 - 会话管理（可选，使用 Redis 替代）

```sql
CREATE TABLE sessions (
    id          VARCHAR(64) PRIMARY KEY,
    user_id     VARCHAR(36) NOT NULL,
    expires_at  TIMESTAMP NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_expires (expires_at)
);
```

---

## 四、ER 关系图

```
+-------------+       +---------------+       +------------+
|   users     |       |   prompts     |       | categories |
+-------------+       +---------------+       +------------+
| id (PK)     |<──┐   | id (PK)       |   ┌──>| id (PK)    |
| email       |   │   | title         |   │   | name       |
| nickname    |   │   | description   |   │   | name_en    |
| avatar      |   │   | content       |   │   | slug       |
| api_key     |   │   | category_id --+───┘   | icon       |
+-------------+   │   | author_id ----+───┘   +------------+
       │          │   | language      |
       │          │   | variables     |
       ▼          │   | use_count     |
+-------------+   │   | favorite_count|
| favorites   |   │   +---------------+
+-------------+   │          │
| id (PK)     |   │          │
| user_id ----+───┘          │
| prompt_id --+──────────────┘
+-------------+              │
                             │
+---------------+            │        +------------+
| prompt_tags   |            │        |    tags    |
+---------------+            │        +------------+
| prompt_id ----+────────────┘    ┌──>| id (PK)    |
| tag_id -------+─────────────────┘   | name       |
+---------------+                     | use_count  |
                                      +------------+
+---------------+
| prompt_models |
+---------------+
| prompt_id ----+──────────────────────┐
| model_name    |                      │
+---------------+                      │
        (关联至 prompts.id)─────────────┘
```

---

## 五、技术选型建议

### 5.1 运行时 & 框架

| 选项 | 说明 |
|-----|------|
| Node.js + Express | 成熟稳定，生态丰富 |
| Node.js + Fastify | 高性能，TypeScript 友好 |
| Go + Gin | 高性能，适合高并发 |
| Python + FastAPI | 快速开发，异步支持好 |

### 5.2 数据库

| 选项 | 说明 |
|-----|------|
| PostgreSQL | 功能全面，支持 JSON，推荐 |
| MySQL | 成熟稳定，社区资源多 |
| MongoDB | 灵活 Schema，适合快速迭代 |

### 5.3 缓存 & Session

| 选项 | 说明 |
|-----|------|
| Redis | 缓存、Session、限流一站式 |

### 5.4 搜索（可选）

| 选项 | 说明 |
|-----|------|
| Elasticsearch | 全文搜索，高亮支持 |
| Meilisearch | 轻量级，易部署 |
| 数据库 FULLTEXT | 简单场景可用 |

### 5.5 ORM

| 选项 | 说明 |
|-----|------|
| Prisma | TypeScript 原生，类型安全 |
| TypeORM | 功能全面，装饰器风格 |
| Drizzle | 轻量级，SQL-like |

---

## 六、开发路线图

### Phase 1: MVP（2-3 周）
- [ ] 项目初始化（Express/Fastify + TypeScript + Prisma）
- [ ] 数据库设计与迁移
- [ ] Prompt CRUD 接口
- [ ] 分类与标签接口
- [ ] 基础搜索功能

### Phase 2: 用户系统（1-2 周）
- [ ] 邮箱注册登录
- [ ] JWT 认证
- [ ] 收藏功能
- [ ] 用户个人中心

### Phase 3: 增强功能（2 周）
- [ ] API Key 机制
- [ ] 限流中间件
- [ ] 全文搜索优化
- [ ] 使用统计

### Phase 4: 第三方登录（1 周）
- [ ] GitHub OAuth
- [ ] Google OAuth
- [ ] 微信登录（可选）

---

## 七、快速开始

```bash
# 进入目录
cd prompt-go/server

# 安装依赖 (待实现后)
npm install

# 配置环境变量
cp .env.example .env

# 数据库迁移
npx prisma migrate dev

# 启动开发服务
npm run dev

# 运行测试
npm run test
```

---

本文档为 PromptGo 后端 API 开发提供了完整的结构规划和设计参考，可作为后续实现的蓝图。