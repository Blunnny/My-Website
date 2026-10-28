import glob from 'fast-glob'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogType = {
  title: string
  description: string
  author: string
  date: string
  slug: string
  tags?: string[]
  content: string
  source?: string
  category?: string
  subCategory?: string
  readingTime?: number
}

const CJK_CHAR = /[\u3400-\u9fff\uf900-\ufaff]/g

// 中文按每分钟 400 字、英文按每分钟 200 词估算
function estimateReadingMinutes(text: string) {
  const cjk = text.match(CJK_CHAR)?.length ?? 0
  const words = text.replace(CJK_CHAR, ' ').match(/[A-Za-z0-9]+/g)?.length ?? 0
  return Math.max(1, Math.round(cjk / 400 + words / 200))
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function getFileSlug(blogFilename: string) {
  return blogFilename.replace(/\\/g, '/').replace(/\.mdx$/, '')
}

function getCategory(blogFilename: string) {
  const parts = blogFilename.replace(/\\/g, '/').split('/')
  return parts[0]
}

function getSubCategory(blogFilename: string) {
  const parts = blogFilename.replace(/\\/g, '/').split('/')
  return parts.length > 1 ? parts[1] : undefined
}

type BlogEntry = {
  blog: BlogType
  filePath: string
  slug: string
}

async function getBlogEntries(): Promise<BlogEntry[]> {
  const blogFileNames = await glob('**/*.mdx', {
    cwd: BLOG_DIR,
  })

  const entries = await Promise.all(
    blogFileNames.map(async (blogFilename) => {
      const fullPath = path.join(BLOG_DIR, blogFilename)
      const source = await fs.readFile(fullPath, 'utf-8')

      const { data, content } = matter(source)
      const dataAny = data as any

      const fileSlug = getFileSlug(blogFilename)
      const category = getCategory(blogFilename)
      const subCategory = getSubCategory(blogFilename)

      return {
        blog: {
          slug: fileSlug,
          category,
          subCategory,
          ...dataAny,
          readingTime: estimateReadingMinutes(content),
        },
        filePath: fullPath,
        slug: fileSlug,
      }
    }),
  )

  return entries
}

export async function getAllBlogs() {
  const entries = await getBlogEntries()
  const blogs = entries.map((entry) => entry.blog)

  return blogs.sort((a, z) => {
    const aDate = a.date ? +new Date(a.date) : 0
    const zDate = z.date ? +new Date(z.date) : 0
    return zDate - aDate
  })
}

export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
  const cleanSlug = slug.replace(/\.mdx$/, '')

  try {
    const entries = await getBlogEntries()
    const entry = entries.find((item) => item.slug === cleanSlug)
    return entry ? entry.blog : null
  } catch (error) {
    console.error(`Failed to load blog with slug: ${slug}`, error)
    return null
  }
}

export async function resolveBlogFilePathBySlug(slug: string) {
  const cleanSlug = slug.replace(/\.mdx$/, '')
  const entries = await getBlogEntries()
  const entry = entries.find((item) => item.slug === cleanSlug)
  return entry ? entry.filePath : null
}

export async function getAllBlogSlugs() {
  const entries = await getBlogEntries()
  return entries.map((entry) => entry.slug)
}
