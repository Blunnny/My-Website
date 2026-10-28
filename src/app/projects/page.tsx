'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectBento } from '@/components/project/ProjectBento'
import { FilterPill } from '@/components/ui/filter-pill'
import { projects, WatchingCategory } from '@/config/projects'

// 分类列表
const watchingCategoryList: WatchingCategory[] = [
  'AI',
  '金融',
  '数据分析',
  '爬虫',
  '自动化',
  '音视频处理',
  '技术学习',
  '文件处理',
  '小工具',
  '娱乐',
  '艺术设计',
  '资源',
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<WatchingCategory>('AI')

  return (
    <Container className="mt-16 sm:mt-28">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <header className="mb-14">
          <p className="section-kicker">Projects</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
            我的项目
          </h1>
        </header>

        {/* 我做的小项目 */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="section-kicker">Made by me</p>
            <h2 className="section-title mt-3">我做的小项目</h2>
            <p className="section-lead mt-3">此中有真意，bug已忘言。</p>
          </div>
          <ProjectBento projects={projects.my} />
        </section>

        {/* 我正在关注的项目 */}
        <section className="border-t border-muted pt-12">
          <div className="mb-8">
            <p className="section-kicker">Watching</p>
            <h2 className="section-title mt-3">我正在关注的项目</h2>
            <p className="section-lead mt-3">
              观千剑而后识器，追开源而觅真知。
            </p>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {watchingCategoryList.map((category) => (
              <FilterPill
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <span className="ml-1.5 text-xs tabular-nums opacity-60">
                  {projects.watching[category].length}
                </span>
              </FilterPill>
            ))}
          </div>
          <ul
            key={selectedCategory}
            role="list"
            className="grid grid-cols-1 gap-3 motion-safe:duration-300 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.watching[selectedCategory].map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                titleAs="h3"
                variant="compact"
              />
            ))}
          </ul>
        </section>
      </div>
    </Container>
  )
}
