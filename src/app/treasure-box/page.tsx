'use client'

import { Container } from '@/components/layout/Container'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

// 标签类型定义
type TagType = '免费' | '无广告' | '免费额度' | '收费' | '政府网站' | '有广告'

// 网站项目类型定义
type WebsiteItem = {
  title: string
  url: string
  description: string
  tags: TagType[]
}

// 主分类类型定义
type MainCategory = '工具' | '学习资源'

// 工具子分类类型定义
type ToolSubCategory =
  | '音视频处理'
  | '文件格式转换'
  | '字体下载'
  | '小工具集合'
  | '其他工具'
  | '色彩搭配'
  | 'AI大模型'

// 学习资源子分类类型定义
type ResourceSubCategory = '示例分类'

// 分类数据结构类型定义
type CategoriesType = {
  工具: Record<ToolSubCategory, WebsiteItem[]>
  学习资源: Record<ResourceSubCategory, WebsiteItem[]>
}

// 标签样式映射
const tagStyles: Record<TagType, string> = {
  免费: 'bg-green-100 text-green-800',
  无广告: 'bg-blue-100 text-blue-800',
  免费额度: 'bg-yellow-100 text-yellow-800',
  收费: 'bg-red-100 text-red-800',
  政府网站: 'bg-purple-100 text-purple-800',
  有广告: 'bg-red-100 text-red-800',
}

// 网站分类数据
const categories: CategoriesType = {
  工具: {
    音视频处理: [
      {
        title: 'cobalt',
        url: 'https://cobalt.tools/',
        description: '输入视频网址即可下载视频或音频',
        tags: ['免费', '无广告'],
      },
    ],
    文件格式转换: [
      {
        title: 'convertio',
        url: 'https://convertio.co/zh/',
        description: '上百种文件格式在线转换器',
        tags: ['免费额度', '无广告'],
      },
      {
        title: '图片格式转换器',
        url: 'https://svgtopng.com/zh/',
        description: '多种图片格式在线转换器',
        tags: ['免费', '有广告'],
      },
      {
        title: '超级PDF',
        url: 'https://lkssite.vip/',
        description: 'PDF与多种office文档的在线转换与处理工具',
        tags: ['免费额度', '无广告'],
      },
      {
        title: '凹凸凹',
        url: 'https://www.alltoall.net/',
        description: '200多种格式文件的的在线转换器（大小不超过20MB）',
        tags: ['免费', '无广告'],
      },
      {
        title: 'ilovepdf',
        url: 'https://www.ilovepdf.com/zh-cn/pricing',
        description: 'PDF与多种office文档的在线转换与处理工具',
        tags: ['免费额度', '无广告'],
      },
    ],
    字体下载: [
      {
        title: '自由字体',
        url: 'https://ziyouziti.com/',
        description: '免费可商用字体大全',
        tags: ['免费', '无广告'],
      },
      {
        title: 'qiuziti',
        url: 'https://www.qiuziti.com/member.html',
        description: '字体识别与下载网站',
        tags: ['免费额度', '无广告'],
      },
      {
        title: '方正字体',
        url: 'https://www.foundertype.com/index.php/Index/plusExtend/utm_source/qiuziti_newfontinfo/mid/194',
        description: '方正旗下字体下载平台',
        tags: ['免费', '无广告'],
      },
      {
        title: '字体天下',
        url: 'https://www.fonts.net.cn/commercial-free/fonts-zh-1.html',
        description: '海量字体免费高速下载',
        tags: ['免费', '无广告'],
      },
      {
        title: '字由',
        url: 'https://www.hellofont.cn/member',
        description: '字体下载网站',
        tags: ['免费额度', '无广告'],
      },
    ],
    小工具集合: [
      {
        title: '在线工具',
        url: 'https://tool.lu/',
        description: '海量小工具合集',
        tags: ['免费', '无广告'],
      },
      {
        title: '阿虚同学的储物间',
        url: 'https://axutongxue.com/',
        description: '海量工具合集',
        tags: ['免费', '有广告'],
      },
    ],
    色彩搭配: [
      {
        title: '中国色',
        url: 'https://www.zhongguose.com/#xiangyehong',
        description: '中国传统颜色大全',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Colorhunt',
        url: 'https://colorhunt.co/palettes',
        description: '设计师和艺术家的调色盘',
        tags: ['免费', '无广告'],
      },
      {
        title: 'LOLcolors',
        url: 'https://www.webdesignrankings.com/resources/lolcolors/',
        description: '精选调色盘灵感',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Paletton',
        url: 'https://paletton.com/#uid=1270u0k2ljc6hnI3vhb50fr6wdx',
        description: '每个人都可以使用的调色轮',
        tags: ['免费', '无广告'],
      },
    ],
    AI大模型: [
      {
        title: 'chatgpt',
        url: 'https://chatgpt.com/',
        description: '最强AI大模型',
        tags: ['免费额度', '无广告'],
      },
      {
        title: 'grok',
        url: 'https://x.ai/',
        description: '马斯克X旗下的AI大模型',
        tags: ['免费额度', '无广告'],
      },
      {
        title: 'gemini',
        url: 'https://gemini.google.com/',
        description: '谷歌旗下的AI大模型',
        tags: ['免费额度', '无广告'],
      },
      {
        title: '通义千问',
        url: 'https://chat.qwen.ai/c/1ee6ba6e-61df-44ce-972e-4030929ca6ff',
        description: '阿里旗下的AI大模型',
        tags: ['免费额度', '无广告'],
      },
      {
        title: 'deepseek',
        url: 'https://chat.deepseek.com/',
        description: '无需多言',
        tags: ['免费额度', '无广告'],
      },
      {
        title: 'AI 导航',
        url: 'https://www.jyshare.com/ai/',
        description: '汇聚AI对话、绘画、编程等多方面的AI工具',
        tags: ['免费额度', '无广告'],
      },
    ],
    其他工具: [
      {
        title: 'sms-activate',
        url: 'https://sms-activate.world/cn',
        description: '虚拟电话平台',
        tags: ['收费', '无广告'],
      },
    ],
  },

  学习资源: {
    示例分类: [
      {
        title: '示例学习网站',
        url: 'https://learn.example.com',
        description: '这是一个示例学习网站的描述',
        tags: ['免费'],
      },
    ],
  },
}

function CategorySection({
  title,
  items,
}: {
  title: string
  items: WebsiteItem[]
}) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <ul className="divide-y divide-muted-foreground/10">
        {items.map((item) => (
          <li key={item.title} className="py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold hover:text-primary"
                  >
                    {item.title}
                    <ExternalLink className="ml-1 inline-block h-4 w-4" />
                  </a>
                  <div className="flex gap-2">
                    {item.tags?.map((tag: TagType) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TreasureBoxPage() {
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>('工具')
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>('音视频处理')

  const mainCategories = Object.keys(categories) as MainCategory[]
  const subCategories = Object.keys(categories[selectedMainCategory])

  // 添加调试信息
  const currentItems =
    categories[selectedMainCategory][
      selectedSubCategory as keyof (typeof categories)[typeof selectedMainCategory]
    ]

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          百宝箱
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">有用或有趣的网站。</p>

        {/* 主分类按钮 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedMainCategory(category)
                setSelectedSubCategory(Object.keys(categories[category])[0])
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedMainCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 子分类按钮 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {subCategories.map((subCategory) => (
            <button
              key={subCategory}
              onClick={() => setSelectedSubCategory(subCategory)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedSubCategory === subCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {subCategory}
            </button>
          ))}
        </div>

        {/* 显示选中的分类内容 */}
        <CategorySection title={selectedSubCategory} items={currentItems} />
      </div>
    </Container>
  )
}
