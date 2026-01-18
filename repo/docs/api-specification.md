# PromptGo API 接口文档

> 本文档定义 PromptGo 平台的 RESTful API 接口规范，供前端开发和第三方集成参考。

---

## 一、概述

### 1.1 基础信息

| 项目 | 说明 |
|-----|------|
| Base URL | `https://api.promptgo.com/v1` |
| 协议 | HTTPS |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |
| API 版本 | v1 |

### 1.2 请求格式

```http
Content-Type: application/json
Accept: application/json
Accept-Language: zh-CN
```

### 1.3 通用响应结构

**成功响应**：
```json
{
  "code": 0,
  "message": "success",
  "data": { ... },
  "timestamp": 1705312800000
}
```

**错误响应**：
```json
{
  "code": 40001,
  "message": "参数错误：标题不能为空",
  "data": null,
  "timestamp": 1705312800000
}
```

**分页响应**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  },
  "timestamp": 1705312800000
}
```

---

## 二、认证方式

### 2.1 公开接口

无需认证，可直接访问。有 IP 级别限流（100 次/分钟/IP）。

### 2.2 授权接口

需要在请求头中携带 API Key：

```http
Authorization: Bearer {api_key}
```

**API Key 获取方式**：
1. 用户登录后进入个人中心
2. 点击"API Key"菜单
3. 点击"生成 API Key"
4. 复制并妥善保管

**限流策略**：
- 授权接口：1000 次/分钟/Key
- 超出限制返回 HTTP 429 Too Many Requests

### 2.3 用户登录态接口

部分接口需要用户登录态（如收藏操作），通过 Session Cookie 或 JWT Token 认证：

```http
Cookie: session_id={session_id}
```

或

```http
Authorization: Bearer {jwt_token}
```

---

## 三、公开接口

### 3.1 获取 Prompt 列表

获取 Prompt 分页列表，支持分类、标签、模型筛选。

**请求**：
```http
GET /api/prompts
```

**查询参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| page | integer | ❌ | 页码，默认 1 |
| limit | integer | ❌ | 每页数量，默认 20，最大 100 |
| category | string | ❌ | 分类标识，如 `writing` |
| tags | string | ❌ | 标签，多个用逗号分隔，如 `写作,润色` |
| model | string | ❌ | 模型筛选，如 `GPT-4` |
| language | string | ❌ | 语言筛选：`zh` / `en` / `both` |
| sort | string | ❌ | 排序方式：`latest`(默认) / `popular` / `favorites` |

**请求示例**：
```http
GET /api/prompts?page=1&limit=20&category=writing&sort=popular
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "prompt_001",
        "title": "文章润色助手",
        "description": "优化文本的语法、清晰度和简洁度，提高可读性",
        "category": "writing",
        "tags": ["写作", "润色", "文章"],
        "models": ["GPT-4", "Claude"],
        "language": "zh",
        "useCount": 1234,
        "favoriteCount": 567,
        "author": {
          "id": "user_001",
          "nickname": "PromptMaster",
          "avatar": "https://example.com/avatar.jpg"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  },
  "timestamp": 1705312800000
}
```

---

### 3.2 获取单个 Prompt 详情

获取指定 Prompt 的完整信息，包括内容和变量列表。

**请求**：
```http
GET /api/prompts/{id}
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | string | ✅ | Prompt ID |

**请求示例**：
```http
GET /api/prompts/prompt_001
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "prompt_001",
    "title": "文章润色助手",
    "description": "优化文本的语法、清晰度和简洁度，提高可读性",
    "content": "作为写作改进助手，请优化以下文本的语法、清晰度和简洁度，同时分解长句、减少重复，并提供改进建议。请只提供修正后的中文版本，避免包含解释。请开始编辑以下文本：\n\n{{文章内容}}",
    "category": "writing",
    "tags": ["写作", "润色", "文章"],
    "models": ["GPT-4", "Claude"],
    "language": "zh",
    "variables": [
      {
        "name": "文章内容",
        "default": "",
        "description": "请输入需要润色的文章"
      }
    ],
    "useCount": 1234,
    "favoriteCount": 567,
    "author": {
      "id": "user_001",
      "nickname": "PromptMaster",
      "avatar": "https://example.com/avatar.jpg"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T14:20:00Z"
  },
  "timestamp": 1705312800000
}
```

---

### 3.3 获取分类列表

获取所有可用的 Prompt 分类。

**请求**：
```http
GET /api/categories
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      { "id": "writing", "name": "写作辅助", "nameEn": "Writing", "icon": "✍️", "count": 45 },
      { "id": "article", "name": "文章/报告", "nameEn": "Article", "icon": "📄", "count": 32 },
      { "id": "programming", "name": "IT/编程", "nameEn": "Programming", "icon": "💻", "count": 68 },
      { "id": "ai", "name": "AI", "nameEn": "AI", "icon": "🤖", "count": 25 },
      { "id": "lifestyle", "name": "生活质量", "nameEn": "Lifestyle", "icon": "🏠", "count": 18 },
      { "id": "education", "name": "教育/学生", "nameEn": "Education", "icon": "📚", "count": 42 },
      { "id": "academic", "name": "学术/教师", "nameEn": "Academic", "icon": "🎓", "count": 28 },
      { "id": "translation", "name": "语言/翻译", "nameEn": "Translation", "icon": "🌐", "count": 35 },
      { "id": "seo", "name": "SEO", "nameEn": "SEO", "icon": "📈", "count": 12 },
      { "id": "tools", "name": "工具", "nameEn": "Tools", "icon": "??", "count": 22 },
      { "id": "games", "name": "游戏", "nameEn": "Games", "icon": "🎮", "count": 15 },
      { "id": "music", "name": "音乐", "nameEn": "Music", "icon": "🎵", "count": 8 },
      { "id": "health", "name": "医疗健康", "nameEn": "Health", "icon": "🏥", "count": 10 },
      { "id": "finance", "name": "金融顾问", "nameEn": "Finance", "icon": "💰", "count": 14 },
      { "id": "business", "name": "企业职位", "nameEn": "Business", "icon": "??", "count": 20 },
      { "id": "psychology", "name": "心理/社交", "nameEn": "Psychology", "icon": "💭", "count": 16 },
      { "id": "philosophy", "name": "哲学/宗教", "nameEn": "Philosophy", "icon": "🧘", "count": 6 },
      { "id": "creative", "name": "发散思维", "nameEn": "Creative", "icon": "💡", "count": 19 },
      { "id": "fun", "name": "趣味知识", "nameEn": "Fun", "icon": "🎯", "count": 11 },
      { "id": "other", "name": "其他", "nameEn": "Other", "icon": "📦", "count": 24 }
    ]
  },
  "timestamp": 1705312800000
}
```

---

### 3.4 获取标签列表

获取热门标签列表，支持分页和搜索。

**请求**：
```http
GET /api/tags
```

**查询参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| q | string | ❌ | 搜索关键词 |
| limit | integer | ❌ | 返回数量，默认 50 |

**请求示例**：
```http
GET /api/tags?q=写作&limit=20
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      { "name": "写作", "count": 85 },
      { "name": "润色", "count": 62 },
      { "name": "文章", "count": 48 },
      { "name": "编程", "count": 120 },
      { "name": "Python", "count": 45 },
      { "name": "翻译", "count": 38 },
      { "name": "学习", "count": 55 },
      { "name": "GPT", "count": 90 }
    ]
  },
  "timestamp": 1705312800000
}
```

---

### 3.5 搜索 Prompt

全文搜索 Prompt，支持多条件组合。

**请求**：
```http
GET /api/search
```

**查询参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| q | string | ✅ | 搜索关键词 |
| page | integer | ❌ | 页码，默认 1 |
| limit | integer | ❌ | 每页数量，默认 20 |
| category | string | ❌ | 分类筛选 |
| tags | string | ❌ | 标签筛选，多个用逗号分隔 |
| model | string | ❌ | 模型筛选 |
| language | string | ❌ | 语言筛选 |

**请求示例**：
```http
GET /api/search?q=文章润色&category=writing&limit=10
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "prompt_001",
        "title": "文章润色助手",
        "description": "优化文本的语法、清晰度和简洁度，提高可读性",
        "category": "writing",
        "tags": ["写作", "润色", "文章"],
        "models": ["GPT-4", "Claude"],
        "language": "zh",
        "useCount": 1234,
        "favoriteCount": 567,
        "highlight": {
          "title": "<em>文章润色</em>助手",
          "description": "优化文本的语法、清晰度和简洁度..."
        },
        "author": {
          "id": "user_001",
          "nickname": "PromptMaster",
          "avatar": "https://example.com/avatar.jpg"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  },
  "timestamp": 1705312800000
}
```

---

### 3.6 记录使用次数

当用户复制 Prompt 时调用，增加使用次数统计。

**请求**：
```http
POST /api/prompts/{id}/use
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | string | ✅ | Prompt ID |

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "useCount": 1235
  },
  "timestamp": 1705312800000
}
```

---

## 四、授权接口（需 API Key）

### 4.1 创建 Prompt

创建新的 Prompt。

**请求**：
```http
POST /api/prompts
Authorization: Bearer {api_key}
Content-Type: application/json
```

**请求体**：
```json
{
  "title": "文章润色助手",
  "description": "优化文本的语法、清晰度和简洁度，提高可读性",
  "content": "作为写作改进助手，请优化以下文本的语法、清晰度和简洁度...\n\n{{文章内容}}",
  "category": "writing",
  "tags": ["写作", "润色", "文章"],
  "models": ["GPT-4", "Claude"],
  "language": "zh"
}
```

**请求体参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| title | string | ✅ | 标题，1-50 字符 |
| description | string | ✅ | 描述，1-200 字符 |
| content | string | ✅ | Prompt 内容，1-5000 字符 |
| category | string | ✅ | 分类标识 |
| tags | string[] | ✅ | 标签列表，1-5 个 |
| models | string[] | ❌ | 适配模型列表，默认 ["通用"] |
| language | string | ✅ | 语言：`zh` / `en` / `both` |

**响应示例**：
```json
{
  "code": 0,
  "message": "创建成功",
  "data": {
    "id": "prompt_002",
    "title": "文章润色助手",
    "description": "优化文本的语法、清晰度和简洁度，提高可读性",
    "content": "作为写作改进助手，请优化以下文本的语法、清晰度和简洁度...\n\n{{文章内容}}",
    "category": "writing",
    "tags": ["写作", "润色", "文章"],
    "models": ["GPT-4", "Claude"],
    "language": "zh",
    "variables": [
      { "name": "文章内容", "default": "", "description": "" }
    ],
    "useCount": 0,
    "favoriteCount": 0,
    "author": {
      "id": "user_001",
      "nickname": "PromptMaster",
      "avatar": "https://example.com/avatar.jpg"
    },
    "createdAt": "2024-01-18T10:30:00Z",
    "updatedAt": "2024-01-18T10:30:00Z"
  },
  "timestamp": 1705312800000
}
```

---

### 4.2 更新 Prompt

更新已有的 Prompt（仅作者可更新）。

**请求**：
```http
PUT /api/prompts/{id}
Authorization: Bearer {api_key}
Content-Type: application/json
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | string | ✅ | Prompt ID |

**请求体**：
```json
{
  "title": "文章润色助手（升级版）",
  "description": "优化文本的语法、清晰度和简洁度，提高可读性，支持多种风格",
  "content": "...",
  "category": "writing",
  "tags": ["写作", "润色", "文章", "风格"],
  "models": ["GPT-4", "Claude", "文心一言"],
  "language": "zh"
}
```

**响应示例**：
```json
{
  "code": 0,
  "message": "更新成功",
  "data": {
    "id": "prompt_001",
    "title": "文章润色助手（升级版）",
    "updatedAt": "2024-01-18T14:30:00Z"
  },
  "timestamp": 1705312800000
}
```

---

### 4.3 删除 Prompt

删除指定 Prompt（仅作者可删除）。

**请求**：
```http
DELETE /api/prompts/{id}
Authorization: Bearer {api_key}
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | string | ✅ | Prompt ID |

**响应示例**：
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null,
  "timestamp": 1705312800000
}
```

---

## 五、用户相关接口（需登录态）

### 5.1 获取收藏列表

获取当前用户的收藏 Prompt 列表。

**请求**：
```http
GET /api/user/favorites
Authorization: Bearer {jwt_token}
```

**查询参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| page | integer | ❌ | 页码，默认 1 |
| limit | integer | ❌ | 每页数量，默认 20 |

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "prompt_001",
        "title": "文章润色助手",
        "description": "优化文本的语法、清晰度和简洁度...",
        "category": "writing",
        "tags": ["写作", "润色"],
        "favoritedAt": "2024-01-17T09:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    }
  },
  "timestamp": 1705312800000
}
```

---

### 5.2 添加收藏

收藏指定 Prompt。

**请求**：
```http
POST /api/user/favorites/{promptId}
Authorization: Bearer {jwt_token}
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| promptId | string | ✅ | Prompt ID |

**响应示例**：
```json
{
  "code": 0,
  "message": "收藏成功",
  "data": {
    "promptId": "prompt_001",
    "favoriteCount": 568
  },
  "timestamp": 1705312800000
}
```

---

### 5.3 取消收藏

取消收藏指定 Prompt。

**请求**：
```http
DELETE /api/user/favorites/{promptId}
Authorization: Bearer {jwt_token}
```

**路径参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| promptId | string | ✅ | Prompt ID |

**响应示例**：
```json
{
  "code": 0,
  "message": "取消收藏成功",
  "data": {
    "promptId": "prompt_001",
    "favoriteCount": 567
  },
  "timestamp": 1705312800000
}
```

---

### 5.4 获取我上传的 Prompt

获取当前用户上传的 Prompt 列表。

**请求**：
```http
GET /api/user/prompts
Authorization: Bearer {jwt_token}
```

**查询参数**：
| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| page | integer | ❌ | 页码，默认 1 |
| limit | integer | ❌ | 每页数量，默认 20 |

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [
      {
        "id": "prompt_001",
        "title": "文章润色助手",
        "description": "优化文本的语法、清晰度和简洁度...",
        "category": "writing",
        "tags": ["写作", "润色"],
        "useCount": 1234,
        "favoriteCount": 567,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  },
  "timestamp": 1705312800000
}
```

---

### 5.5 获取用户统计

获取当前用户的使用统计数据。

**请求**：
```http
GET /api/user/stats
Authorization: Bearer {jwt_token}
```

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "promptCount": 10,
    "totalUseCount": 5000,
    "totalFavoriteCount": 800,
    "favoriteCount": 12
  },
  "timestamp": 1705312800000
}
```

---

## 六、错误码定义

### 6.1 错误码分类

| 范围 | 类型 |
|-----|------|
| 0 | 成功 |
| 40000-40999 | 客户端错误 |
| 50000-50999 | 服务端错误 |

### 6.2 详细错误码

| 错误码 | HTTP 状态码 | 说明 |
|-------|------------|------|
| 0 | 200 | 成功 |
| 40001 | 400 | 参数错误 |
| 40002 | 400 | 参数格式错误 |
| 40003 | 400 | 必填参数缺失 |
| 40101 | 401 | 未登录 |
| 40102 | 401 | 登录已过期 |
| 40103 | 401 | API Key 无效 |
| 40301 | 403 | 无权限操作 |
| 40401 | 404 | 资源不存在 |
| 40901 | 409 | 资源已存在（如邮箱已注册） |
| 42901 | 429 | 请求过于频繁 |
| 50001 | 500 | 服务器内部错误 |
| 50002 | 500 | 数据库错误 |
| 50301 | 503 | 服务暂时不可用 |

### 6.3 错误响应示例

```json
{
  "code": 40001,
  "message": "参数错误：标题不能为空",
  "data": {
    "field": "title",
    "reason": "required"
  },
  "timestamp": 1705312800000
}
```

```json
{
  "code": 40401,
  "message": "Prompt 不存在",
  "data": {
    "id": "prompt_999"
  },
  "timestamp": 1705312800000
}
```

```json
{
  "code": 42901,
  "message": "请求过于频繁，请稍后再试",
  "data": {
    "retryAfter": 60
  },
  "timestamp": 1705312800000
}
```

---

## 七、数据模型

### 7.1 Prompt 对象

```typescript
interface Prompt {
  id: string;                  // 唯一标识
  title: string;               // 标题
  description: string;         // 描述
  content: string;             // Prompt 内容
  category: string;            // 分类标识
  tags: string[];              // 标签列表
  models: string[];            // 适配模型
  language: 'zh' | 'en' | 'both';  // 语言
  variables: Variable[];       // 变量列表（自动解析）
  useCount: number;            // 使用次数
  favoriteCount: number;       // 收藏次数
  author: UserSummary;         // 作者信息
  createdAt: string;           // 创建时间 (ISO 8601)
  updatedAt: string;           // 更新时间 (ISO 8601)
}
```

### 7.2 Variable 对象

```typescript
interface Variable {
  name: string;           // 变量名
  default?: string;       // 默认值
  description?: string;   // 描述
}
```

### 7.3 User 对象

```typescript
interface User {
  id: string;              // 用户 ID
  email: string;           // 邮箱
  nickname: string;        // 昵称
  avatar: string;          // 头像 URL
  createdAt: string;       // 注册时间
}

interface UserSummary {
  id: string;
  nickname: string;
  avatar: string;
}
```

### 7.4 Category 对象

```typescript
interface Category {
  id: string;        // 分类标识
  name: string;      // 中文名称
  nameEn: string;    // 英文名称
  icon: string;      // 图标（emoji）
  count: number;     // Prompt 数量
}
```

---

## 八、使用示例

### 8.1 获取 Prompt 列表（JavaScript）

```javascript
async function getPrompts(options = {}) {
  const params = new URLSearchParams({
    page: options.page || 1,
    limit: options.limit || 20,
    ...(options.category && { category: options.category }),
    ...(options.tags && { tags: options.tags.join(',') }),
    sort: options.sort || 'latest'
  });

  const response = await fetch(`https://api.promptgo.com/v1/prompts?${params}`);
  const data = await response.json();
  
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}
```

### 8.2 创建 Prompt（JavaScript）

```javascript
async function createPrompt(promptData, apiKey) {
  const response = await fetch('https://api.promptgo.com/v1/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(promptData)
  });
  
  const data = await response.json();
  
  if (data.code === 0) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}
```

### 8.3 cURL 示例

```bash
# 获取 Prompt 列表
curl -X GET "https://api.promptgo.com/v1/prompts?category=writing&limit=10"

# 搜索 Prompt
curl -X GET "https://api.promptgo.com/v1/search?q=文章润色"

# 创建 Prompt
curl -X POST "https://api.promptgo.com/v1/prompts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "title": "文章润色助手",
    "description": "优化文本的语法、清晰度和简洁度",
    "content": "请优化以下文本：\n\n{{文章内容}}",
    "category": "writing",
    "tags": ["写作", "润色"],
    "language": "zh"
  }'
```

---

本 API 文档为 PromptGo 平台的接口开发提供了完整的规范定义，可作为前后端开发的直接参考依据。