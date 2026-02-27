'use client'

import { type BlogType } from '@/lib/blogs'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Category = string
type PrimaryCategory = '我的博客' | '文章收藏'

interface CategoryButtonsProps {
  blogs: BlogType[]
  onCategoryChange: (blogs: BlogType[], category: Category) => void
}

export function CategoryButtons({
  blogs,
  onCategoryChange,
}: CategoryButtonsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 从 URL 参数中读取状态，如果没有则使用默认值
  const urlPrimaryCategory =
    (searchParams.get('primaryCategory') as PrimaryCategory) || '我的博客'
  const urlCategory = (searchParams.get('category') as Category) || '全部'
  const urlSubCategory = (searchParams.get('subCategory') as Category) || '全部'

  const [activePrimaryCategory, setActivePrimaryCategory] =
    useState<PrimaryCategory>(urlPrimaryCategory)
  const [activeParentCategory, setActiveParentCategory] =
    useState<Category>(urlCategory)
  const [activeChildCategory, setActiveChildCategory] =
    useState<Category>(urlSubCategory)
  const [activeCollectionCategory, setActiveCollectionCategory] =
    useState<Category>(urlCategory)

  // 保存当前滚动位置到 sessionStorage
  const saveScrollPosition = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'blogListScrollPosition',
        window.scrollY.toString(),
      )
    }
  }

  // 更新 URL 参数
  const updateUrlParams = (
    primaryCategory: PrimaryCategory,
    category: Category,
    subCategory: Category = '全部',
    page: number = 1,
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('primaryCategory', primaryCategory)
    params.set('category', category)
    if (primaryCategory === '我的博客' && category !== '全部') {
      params.set('subCategory', subCategory)
    } else {
      params.delete('subCategory')
    }
    params.set('page', page.toString())
    router.push(`/blogs?${params.toString()}`)
  }

  const filterMyBlogs = (
    parentCategory: Category,
    childCategory: Category = '全部',
    shouldUpdateUrl: boolean = true,
  ) => {
    setActiveParentCategory(parentCategory)
    setActiveChildCategory(childCategory)

    if (shouldUpdateUrl) {
      saveScrollPosition()
      updateUrlParams('我的博客', parentCategory, childCategory)
    }

    let filteredBlogs: BlogType[] = []
    if (parentCategory === '全部') {
      filteredBlogs = blogs.filter((blog) => {
        const tags = blog.tags || []
        return !tags.includes('好文转载')
      })
    } else {
      const targetParentDir =
        Object.keys(myCategoryMapping).find(
          (key) => myCategoryMapping[key] === parentCategory,
        ) || parentCategory
      const targetChildDir =
        childCategory === '全部'
          ? undefined
          : Object.keys(mySubCategoryMapping[targetParentDir] || {}).find(
              (key) =>
                mySubCategoryMapping[targetParentDir]?.[key] === childCategory,
            ) || childCategory

      filteredBlogs = blogs.filter((blog) => {
        const tags = blog.tags || []
        if (tags.includes('好文转载')) return false
        if (blog.category !== targetParentDir) return false
        if (!targetChildDir) return true
        return blog.subCategory === targetChildDir
      })
    }

    onCategoryChange(filteredBlogs, parentCategory)
  }

  const filterCollectionBlogs = (
    category: Category,
    shouldUpdateUrl: boolean = true,
  ) => {
    setActiveCollectionCategory(category)

    if (shouldUpdateUrl) {
      saveScrollPosition()
      updateUrlParams('文章收藏', category)
    }

    let filteredBlogs: BlogType[] = []
    if (category === '全部') {
      filteredBlogs = blogs.filter((blog) => blog.tags?.includes('好文转载'))
    } else {
      const targetDir =
        Object.keys(collectionCategoryMapping).find(
          (key) => collectionCategoryMapping[key] === category,
        ) || category

      filteredBlogs = blogs.filter(
        (blog) =>
          blog.tags?.includes('好文转载') &&
          blog.category === 'collect' &&
          blog.subCategory === targetDir,
      )
    }

    onCategoryChange(filteredBlogs, category)
  }

  // 恢复滚动位置
  const restoreScrollPosition = () => {
    if (typeof window !== 'undefined') {
      const savedPosition = sessionStorage.getItem('blogListScrollPosition')
      if (savedPosition) {
        // 使用 setTimeout 确保DOM已经渲染完成
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10))
          // 清除保存的滚动位置
          sessionStorage.removeItem('blogListScrollPosition')
        }, 100)
      }
    }
  }

  // 组件初始化时应用从URL恢复的状态过滤
  useEffect(() => {
    if (urlPrimaryCategory === '我的博客') {
      filterMyBlogs(urlCategory, urlSubCategory, false)
    } else {
      filterCollectionBlogs(urlCategory, false)
    }
    // 恢复滚动位置
    restoreScrollPosition()
  }, []) // 空依赖数组，只在组件挂载时执行一次

  // handlePrimaryCategoryChange 里传递目标主分类
  const handlePrimaryCategoryChange = (primaryCategory: PrimaryCategory) => {
    setActivePrimaryCategory(primaryCategory)
    if (primaryCategory === '我的博客') {
      filterMyBlogs('全部', '全部')
    } else {
      filterCollectionBlogs('全部')
    }
  }

  const primaryCategories: PrimaryCategory[] = ['我的博客', '文章收藏']

  const myCategoryMapping: Record<string, string> = {
    accounting: '会计',
    computer: '计算机',
    cpa: 'CPA',
    essays: '随笔',
    finance: '金融',
    readingnotes: '读书笔记',
  }

  const mySubCategoryMapping: Record<string, Record<string, string>> = {
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
      valuation: '估值',
    },
  }

  // 需要排除子标签的分类
  const excludeSubTags = ['accounting', 'readingnotes', 'essays']

  const collectionCategoryMapping: Record<string, string> = {
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

  const rawMyBlogCategories = Array.from(
    new Set(
      blogs
        .filter((blog) => !blog.tags?.includes('好文转载') && blog.category)
        .map((blog) => blog.category!),
    ),
  ).sort()

  const myBlogCategories: Category[] = [
    '全部',
    ...rawMyBlogCategories.map((cat) => myCategoryMapping[cat] || cat),
  ]

  const activeParentDir =
    Object.keys(myCategoryMapping).find(
      (key) => myCategoryMapping[key] === activeParentCategory,
    ) || activeParentCategory

  const rawChildCategories = Array.from(
    new Set(
      blogs
        .filter(
          (blog) =>
            !blog.tags?.includes('好文转载') &&
            blog.category === activeParentDir &&
            blog.subCategory,
        )
        .map((blog) => blog.subCategory!),
    ),
  ).sort()

  const hasChildren =
    rawChildCategories.length > 0 && !excludeSubTags.includes(activeParentDir)
  const mappedChildren = rawChildCategories.map(
    (cat) => mySubCategoryMapping[activeParentDir]?.[cat] || cat,
  )
  const childCategories: Category[] = hasChildren
    ? rawChildCategories.length > 1
      ? ['全部', ...mappedChildren]
      : mappedChildren
    : []

  const rawCategories = Array.from(
    new Set(
      blogs
        .filter(
          (blog) =>
            blog.tags?.includes('好文转载') &&
            blog.subCategory &&
            blog.category,
        )
        .map((blog) => blog.subCategory!),
    ),
  ).sort()

  const collectionCategories: Category[] = [
    '全部',
    ...rawCategories.map((cat) => collectionCategoryMapping[cat] || cat),
  ]

  return (
    <div className="mb-8 space-y-4">
      {/* 一级分类按钮 */}
      <div className="flex flex-wrap gap-4">
        {primaryCategories.map((primaryCategory) => (
          <button
            key={primaryCategory}
            onClick={() => handlePrimaryCategoryChange(primaryCategory)}
            className={`rounded-lg border px-6 py-2 text-base font-semibold transition-all duration-300 ease-in-out ${
              activePrimaryCategory === primaryCategory
                ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                : 'border-zinc-300 bg-background text-foreground hover:border-primary hover:bg-muted hover:shadow-md dark:border-zinc-600'
            }`}
          >
            {primaryCategory}
          </button>
        ))}
      </div>

      {activePrimaryCategory === '我的博客' && (
        <>
          <div className="flex flex-wrap gap-3 pl-4">
            {myBlogCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  if (category === '计算机') {
                    filterMyBlogs(category, 'MySQL')
                  } else {
                    filterMyBlogs(category, '全部')
                  }
                }}
                className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
                  activeParentCategory === category
                    ? 'transform-none bg-primary text-primary-foreground shadow-none'
                    : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {activeParentCategory !== '全部' && childCategories.length > 0 && (
            <div className="flex flex-wrap gap-3 pl-4">
              {childCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterMyBlogs(activeParentCategory, category)}
                  className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
                    activeChildCategory === category
                      ? 'transform-none bg-pink-400 text-white shadow-none'
                      : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {activePrimaryCategory === '文章收藏' && (
        <div className="flex flex-wrap gap-3 pl-4">
          {collectionCategories.map((category) => (
            <button
              key={category}
              onClick={() => filterCollectionBlogs(category)}
              className={`rounded-full border px-4 py-1 text-sm transition-all duration-300 ease-in-out ${
                activeCollectionCategory === category
                  ? 'transform-none bg-pink-400 text-white shadow-none'
                  : 'bg-background text-foreground shadow-none hover:-translate-x-0.5 hover:-translate-y-1 hover:transform hover:bg-muted hover:shadow-[2px_5px_0_0_black] active:translate-x-0.5 active:translate-y-0.5 active:transform active:shadow-none dark:hover:shadow-[2px_5px_0_0_white]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
