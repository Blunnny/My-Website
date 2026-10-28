import Image from 'next/image'
import { blogHeadLine, blogIntro } from '@/config/infoConfig'

export function BlogHeader({ showQrcode = false }: { showQrcode?: boolean }) {
  return (
    <header className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div>
        <p className="section-kicker">Writing</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15] lg:whitespace-nowrap">
          {blogHeadLine}
        </h1>
        <p className="section-lead mt-4">{blogIntro}</p>
      </div>
      {showQrcode && (
        <div className="flex w-fit flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card/50 p-3">
          <Image
            src="/images/wechat/WeChatOfficialAccount.png"
            alt="微信公众号二维码"
            width={1816}
            height={624}
            className="h-[4.5rem] w-auto rounded-lg"
          />
          <div className="px-1 text-sm">
            <p className="font-medium text-foreground">关注微信公众号</p>
            <p className="mt-0.5 text-muted-foreground">第一时间获得新内容推送！</p>
          </div>
        </div>
      )}
    </header>
  )
}
