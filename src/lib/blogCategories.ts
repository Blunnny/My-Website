import type { BlogType } from '@/lib/blogs'

export const COLLECT_TAG = '好文转载'
export const ALL = '全部'

export type PrimaryCategory = '我的博客' | '文章收藏'
export const primaryCategories: PrimaryCategory[] = ['我的博客', '文章收藏']

export const myCategoryLabels: Record<string, string> = {
  accounting: '会计',
  computer: '计算机',
  cpa: 'CPA',
  essays: '随笔',
  finance: '金融',
  readingnotes: '读书笔记',
}

export const mySubCategoryLabels: Record<string, Record<string, string>> = {
  cpa: {
    Accounting: '会计',
    Audit: '审计',
    EconomicLaw: '经济法',
    FinancialManagement: '财务管理',
    Strategy: '战略',
    Tax: '税法',
  },
  computer: {
    MYSQL: 'MySQL',
  },
  finance: {
    bonds: '债券',
    forecasting: '财务预测',
    'quantitative-investment': '量化投资',
    valuation: '估值',
  },
}

// 这些分类下的文章直接放在分类目录里，subCategory 实际是文件名
export const flatCategoryDirs = ['accounting', 'readingnotes', 'essays']

export const collectionCategoryLabels: Record<string, string> = {
  education: '教育',
  finance: '金融',
  game: '游戏',
  growth: '成长',
  love: '爱情',
  meaning: '意义',
  nation: '家国',
  society: '社会',
  technology: '技术',
}

export function isCollected(blog: BlogType) {
  return blog.tags?.includes(COLLECT_TAG) ?? false
}

export function labelToDir(labels: Record<string, string>, label: string) {
  return Object.keys(labels).find((dir) => labels[dir] === label) ?? label
}

export function categoryPath(blog: BlogType) {
  if (isCollected(blog)) {
    const dir = blog.subCategory ?? ''
    return {
      primary: '文章收藏' as PrimaryCategory,
      category: collectionCategoryLabels[dir] ?? dir,
      sub: undefined as string | undefined,
    }
  }
  const dir = blog.category ?? ''
  const subDir =
    blog.subCategory && !flatCategoryDirs.includes(dir)
      ? blog.subCategory
      : undefined
  return {
    primary: '我的博客' as PrimaryCategory,
    category: myCategoryLabels[dir] ?? dir,
    sub: subDir ? (mySubCategoryLabels[dir]?.[subDir] ?? subDir) : undefined,
  }
}

export function categoryHref(blog: BlogType) {
  const { primary, category, sub } = categoryPath(blog)
  const params = new URLSearchParams({ primaryCategory: primary, category })
  if (sub) params.set('subCategory', sub)
  params.set('page', '1')
  return `/blogs?${params.toString()}`
}

export function displayTags(blog: BlogType) {
  return (blog.tags ?? []).filter((tag) => tag !== COLLECT_TAG)
}

export function formatDateDot(date: string) {
  return date ? date.slice(0, 10).replace(/-/g, '.') : ''
}
