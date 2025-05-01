import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/shared/Card'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { type BlogType, getAllBlogs } from '@/lib/blogs'
import { formatDate } from '@/lib/formatDate'
import { blogHeadLine, blogIntro } from '@/config/infoConfig'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

function Blog({ blog }: { blog: BlogType }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/${blog.slug}`}>{blog.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {formatDate(blog.date)}
        </Card.Eyebrow>
        <Card.Description>{blog.description}</Card.Description>
        <Card.Cta>Read blog</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(blog.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Blogs',
  description: blogIntro,
}

export default async function BlogsIndex() {
  const blogs = await getAllBlogs()

  return (
    <SimpleLayout
      title={blogHeadLine}
      intro={
        <div className="space-y-6">
          <p>{blogIntro}</p>
          <div className="flex items-center gap-8">
            <Image
              src="/images/wechat/WeChatOfficialAccount.png"
              alt="微信公众号二维码"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
              <p>☚ 关注微信公众号</p>
              <p>第一时间获得新内容推送！</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {blogs.map((blog: BlogType) => (
            <Blog key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
