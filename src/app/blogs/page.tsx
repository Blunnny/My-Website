import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { blogHeadLine, blogIntro } from '@/config/infoConfig'
import { getAllBlogs } from '@/lib/blogs'
import Image from 'next/image'
import { BlogList } from '@/components/blogs/BlogList'

export const runtime = process.env.NEXT_RUNTIME === 'edge' ? 'edge' : 'nodejs'

export const metadata: Metadata = {
  title: '博客',
  description: '关于会计、计算机、哲学以及最重要的——人生。',
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
        <BlogList initialBlogs={blogs} />
      </div>
    </SimpleLayout>
  )
}
