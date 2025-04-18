# 个人网站

欢迎光临我的个人网站，用于展示我的项目、经历和博客文章。

## 技术栈

- **前端框架**：Next.js 14 + React 18
- **样式处理**：TailwindCSS
- **类型系统**：TypeScript
- **UI组件**：
  - HeadlessUI
  - Radix UI
  - Phosphor Icons
  - Lucide React
- **内容管理**：MDX
- **代码高亮**：Prism
- **工具**：
  - ESLint
  - Prettier
  - PostCSS

## 功能特性

- 响应式设计
- 暗色/亮色主题切换
- 项目展示
- 博客系统
- 教育经历展示
- 实习经历展示
- 兴趣爱好展示
- 社交媒体链接
- 技能图标云展示

## 项目结构

```
src/
├── app/                # Next.js 应用路由
├── components/         # React 组件
├── config/            # 配置文件
├── lib/               # 工具函数
└── styles/            # 全局样式
```

## 开发

1. 克隆项目

```bash
git clone [your-repo-url]
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

4. 构建生产版本

```bash
pnpm build
```

5. 启动生产服务器

```bash
pnpm start
```

## 配置

主要配置文件位于 `src/config/` 目录下：

- `infoConfig.ts` - 个人信息配置
- `projects.ts` - 项目配置
- `education.ts` - 教育经历配置
- `career.ts` - 实习经历配置

## 自定义

1. 修改个人信息：

   - 编辑 `src/config/infoConfig.ts`
   - 更新个人介绍、社交媒体链接等

2. 添加项目：

   - 在 `src/config/projects.ts` 中添加项目信息
   - 添加项目图片到 `public/images/projects/`

3. 添加博客文章：
   - 在 `src/content/blogs/` 目录下创建 MDX 文件
   - 使用 Markdown 语法编写文章

## 许可证

MIT
