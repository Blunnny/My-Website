import { type Metadata } from 'next'
import Image from 'next/image'
import {
  aboutMeHeadline,
  aboutParagraphs,
  aboutFoodLikes,
  aboutFoodDislikes,
  aboutFoodNote,
} from '@/config/infoConfig'
import { Container } from '@/components/layout/Container'
import { AboutDashboard } from '@/components/about/AboutDashboard'
import { cn } from '@/lib/utils'

import portraitImage from '@/images/portrait.jpg'

export const metadata: Metadata = {
  title: 'About',
  description: "I'm Jin An. I live in China, where I design the future.",
}

const reportHref =
  'https://github.com/Blunnny/douban-data-analysis/blob/main/output_markdown/douban_data_analysis.md#%E6%88%91%E7%9A%84%E8%B1%86%E7%93%A3%E6%95%B0%E6%8D%AE%E6%8F%AD%E7%A7%98%E7%9C%8B%E7%89%87%E8%AF%BB%E4%B9%A6%E7%8E%A9%E6%B8%B8%E6%88%8F%E9%82%A3%E4%BA%9B%E4%BA%8B%E5%84%BF'

const inlineLink =
  'font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary'

function FoodGroup({
  mark,
  items,
  tone,
}: {
  mark: string
  items: string[]
  tone: 'like' | 'dislike'
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold',
            tone === 'like'
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground',
          )}
        >
          {mark}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {items.length} 道
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors duration-200',
              tone === 'like'
                ? 'border-primary/20 bg-primary/[0.05] text-foreground/85 hover:border-primary/50'
                : 'border-border bg-muted/40 text-muted-foreground hover:border-muted-foreground/40',
            )}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
    </div>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-28">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        {/* 自我介绍 */}
        <section className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="mx-auto w-full max-w-xs lg:order-last lg:mt-6 lg:max-w-none">
            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-2xl"
              />
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 20rem, 20rem"
                priority
                className="relative aspect-square rotate-3 rounded-3xl bg-muted object-cover shadow-xl ring-1 ring-border/60 transition-transform duration-500 ease-out motion-safe:group-hover:rotate-0"
              />
            </div>
          </div>
          <div>
            <p className="section-kicker">About</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
              {aboutMeHeadline}
            </h1>
            <ul className="mt-10 space-y-5">
              {aboutParagraphs.map((paragraph, index) => (
                <li key={index} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.9rem] h-px w-5 shrink-0 bg-primary/60"
                  />
                  <p
                    className="text-lg leading-relaxed text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 关于吃饭 */}
        <section className="mt-24 border-t border-muted pt-12">
          <p className="section-kicker">Food</p>
          <h2 className="section-title mt-3">关于吃饭</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <FoodGroup mark="喜" items={aboutFoodLikes} tone="like" />
            <FoodGroup mark="忌" items={aboutFoodDislikes} tone="dislike" />
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">
            {aboutFoodNote}
          </p>
        </section>

        {/* 数据图表 */}
        <section className="mt-24 border-t border-muted pt-12">
          <p className="section-kicker">Data</p>
          <h2 className="section-title mt-3">Some fun data about me</h2>
          <p className="section-lead mt-3">
            统计数据来自我的项目「
            <a
              href="https://github.com/Blunnny/douban-data-analysis"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              豆瓣年轮
            </a>
            」，
            <a
              href={reportHref}
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              点我
            </a>
            查看报告~
          </p>
          <AboutDashboard className="mt-10" />
        </section>
      </div>
    </Container>
  )
}
