import { type Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { BlogHeader } from '@/components/blogs/BlogHeader'
import { BlogList } from '@/components/blogs/BlogList'
import { getAllBlogs } from '@/lib/blogs'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

export const metadata: Metadata = {
  title: '博客',
  description: '关于会计、计算机、哲学以及最重要的——人生。',
}

export default async function BlogsIndex() {
  const blogs = await getAllBlogs()

  return (
    <Container className="mt-16 sm:mt-28">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <BlogHeader showQrcode />
        <BlogList initialBlogs={blogs} />
      </div>
    </Container>
  )
}
