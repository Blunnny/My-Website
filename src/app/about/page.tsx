import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { aboutMeHeadline, aboutParagraphs } from '@/config/infoConfig'
import { Container } from '@/components/layout/Container'
import { activities } from '@/config/projects'
import { ActivityCard } from '@/components/home/ActivityCard'
import { Book, Clapperboard, Gamepad2, LineChart, Calendar } from 'lucide-react'
import PlotlyCharts from '@/components/about/PlotlyCharts'

import portraitImage from '@/images/portrait.jpg'
import SocialLinks from '@/components/about/SocialLinks'

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Spencer Sharp. I live in New York City, where I design the future.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {aboutMeHeadline}
          </h1>
          <div className="mt-6 space-y-7 text-xl text-zinc-700 dark:text-zinc-300">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto my-16 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
        <h2 className="mb-4 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
          <Calendar size={28} />
          兴趣爱好
        </h2>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
        >
          {activities.map((activity) => (
            <ActivityCard
              key={activity.name}
              activity={activity}
              titleAs="h3"
            />
          ))}
        </ul>
      </div>

      <div className="mx-auto my-16 flex max-w-xl flex-col gap-6 border-t border-muted py-8 lg:max-w-none">
        <h2 className="mb-4 flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight opacity-80 md:text-3xl">
          <LineChart size={28} />
          Some fun data about me
        </h2>
        <h3>
          统计数据来自我的项目「
          <a
            href="https://github.com/Blunnny/douban-data-analysis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            豆瓣年轮
          </a>
          」，
          <a
            href="https://github.com/Blunnny/douban-data-analysis/blob/main/output_markdown/douban_data_analysis.md#%E6%88%91%E7%9A%84%E8%B1%86%E7%93%A3%E6%95%B0%E6%8D%AE%E6%8F%AD%E7%A7%98%E7%9C%8B%E7%89%87%E8%AF%BB%E4%B9%A6%E7%8E%A9%E6%B8%B8%E6%88%8F%E9%82%A3%E4%BA%9B%E4%BA%8B%E5%84%BF"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            点我
          </a>
          查看报告~
        </h3>
        <PlotlyCharts />
      </div>
    </Container>
  )
}
