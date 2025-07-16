import { compileMDX } from 'next-mdx-remote/rsc'
import { promises as fs } from 'fs'
import path from 'path'
import { mdxComponents } from '@/components/shared/MdxComponents'

export async function getMDXContent(slug: string) {
  // 解码 slug 以支持中文文件名
  const decodedSlug = decodeURIComponent(slug)
  const filePath = path.join(
    process.cwd(),
    'src/content/blog',
    `${decodedSlug}.mdx`,
  )
  const source = await fs.readFile(filePath, 'utf-8')

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  })

  return content
}
