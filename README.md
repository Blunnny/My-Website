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
   - 在 `src/content/blog/` 目录下创建 MDX 文件
   - 在文首使用 Frontmatter 配置标题、描述、日期、标签等元信息
   - 使用 Markdown 语法和 MDX 组件编写文章

### 博客内容与图片管理

- 文章内容
  - 所有博客文章位于 `src/content/blog` 目录（支持子目录，例如 `collect/` 用于转载文章）  
  - 文章文件名与访问路径一一对应，例如 `CPA-Audit-Special-Considerations.mdx` 对应 `/blogs/CPA-Audit-Special-Considerations`
  - 列表页只依赖 Frontmatter 中的元信息，正文内容通过 MDX 单独编译渲染

- 图片存放
  - 所有博客图片统一放在 `public/images/blog` 目录下  
  - 建议按文章 slug 建立子目录，例如：  
    - 文章：`CPA-Audit-Special-Considerations.mdx`  
      图片：`public/images/blog/CPA-Audit-Special-Considerations/1.webp`
  - 在 MDX 中引用图片时使用绝对路径，例如：  
    - `!/[](/images/blog/CPA-Audit-Special-Considerations/1.webp)`

- 图片样式与组件
  - 文章中的图片默认通过全局样式控制基本展示效果
  - 对于需要居中展示、统一边距和可选说明文字的图片，可以在 MDX 中使用 `BlogImage` 组件：

    ```mdx
    <BlogImage
      src="/images/blog/CPA-Audit-Special-Considerations/1.webp"
      alt="点估计与区间估计"
      caption="点估计与区间估计示意图"
    />
    ```

  - `BlogImage` 组件会自动：
    - 居中显示图片
    - 设置合适的上下边距和自适应宽度
    - 在需要时渲染图片下方的说明文字

## 许可证

本模板由 Corey Chiu 创建。查看他的作品：[coreychiu.com](https://coreychiu.com)
