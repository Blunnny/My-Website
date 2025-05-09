'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/project/ProjectCard'
import { projects, WatchingCategory } from '@/config/projects'

// 分类列表
const watchingCategoryList: WatchingCategory[] = [
  'LLM',
  '金融',
  '数据分析',
  '自动化',
  '音视频处理',
  '技术学习',
  '文件处理',
  '有趣的小工具',
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<WatchingCategory>('LLM')

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          我的项目
        </h1>

        {/* 我做的小项目 */}
        <h2 className="mb-2 text-xl font-semibold">我做的小项目</h2>
        <div className="mb-6 text-base text-muted-foreground">
          此中有真意，bug已忘言。
        </div>
        <ul className="mb-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.my.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>

        {/* 我正在关注的项目 */}
        <h2 className="mb-4 text-xl font-semibold">我正在关注的项目</h2>
        <div className="mb-6 text-base text-muted-foreground">
          观千剑而后识器，追开源而觅真知。
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {watchingCategoryList.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.watching[selectedCategory].map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>
      </div>
    </Container>
  )
}
