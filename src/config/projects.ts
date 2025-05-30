// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
  logo?: string // 只有"我做的小项目"有
  category: 'my' | 'watching'
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
}

// 项目分类类型定义，注意添加时还要在page.tsx中添加
export type WatchingCategory =
  | 'LLM'
  | '金融'
  | '数据分析'
  | '爬虫'
  | '自动化'
  | '音视频处理'
  | '技术学习'
  | '文件处理'
  | '小工具'
  | '娱乐'

// 项目数据结构类型定义
export type ProjectsType = {
  my: ProjectItemType[]
  watching: Record<WatchingCategory, ProjectItemType[]>
}

// Research & Projects
export const projectHeadLine = '我做的小项目'
export const projectIntro = '此中有真意，bug已忘言。'
export const watchingIntro = '观千剑而后识器，追开源而觅真知。'

// 项目的详细信息
export const projects: ProjectsType = {
  my: [
    {
      name: 'TimeVault',
      description: '随机生成地牢探险，限时挑战闯五关，金币钥匙全收集！',
      link: { href: 'github.com/Blunnny/TimeVault', label: 'GitHub' },
      tags: ['Java', 'Maven', 'TileEngine'],
      logo: '/images/icon/TimeVault.png',
      category: 'my',
    },
    {
      name: '个人网站开发',
      description: '本网站的所有资料都可以在这里找到！',
      link: { href: 'github.com/Blunnny/My-Website', label: 'GitHub' },
      tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
      logo: '/images/icon/My-Website.png',
      category: 'my',
    },
    {
      name: '豆瓣年轮',
      description: '个人豆瓣数据的可视化分析工具。',
      link: {
        href: 'github.com/Blunnny/douban-data-analysis',
        label: 'GitHub',
      },
      tags: ['Jupyter Notebook', 'Python'],
      logo: '/images/icon/douban-data-analysis.webp',
      category: 'my',
    },
    {
      name: 'TasteBuddy',
      description: '到底看点啥？预测自己对于影视作品的评分。',
      link: {
        href: 'github.com/Blunnny/TasteBuddy',
        label: 'GitHub',
      },
      tags: ['Jupyter Notebook', 'Python'],
      logo: '/images/icon/TasteBuddy.png',
      category: 'my',
    },
  ],
  watching: {
    LLM: [
      {
        name: 'minimind',
        link: { href: 'github.com/jingyaogong/minimind', label: 'AI minimind' },
        description: '从0开始训练一个超小语言模型 MiniMind！',
        tags: ['PyTorch', 'transformers'],
        category: 'watching',
      },
      {
        name: 'WeClone',
        link: {
          href: 'github.com/xming521/WeClone?tab=readme-ov-file',
          label: 'WeClone',
        },
        description: '使用聊天记录创建数字分身！',
        tags: ['Python'],
        category: 'watching',
      },
      {
        name: 'agenticSeek',
        link: {
          href: 'github.com/Fosowl/agenticSeek',
          label: 'agenticSeek',
        },
        description: '完全本地化的AI助手（配置要求较高，显存至少需要12GB）',
        tags: ['Python', 'JavaScript', 'LLM'],
        category: 'watching',
      },
    ],
    金融: [
      {
        name: 'AI Hedge Fund',
        link: {
          href: 'github.com/virattt/ai-hedge-fund',
          label: 'AI Hedge Fund',
        },
        description: 'AI 驱动的对冲基金',
        tags: ['Python', 'Docker', 'AI', 'Stockmarket'],
        category: 'watching',
      },
      {
        name: 'qlib',
        link: {
          href: 'github.com/microsoft/qlib',
          label: 'qlib',
        },
        description: '微软出品的AI量化投资平台',
        tags: ['Python', 'AI'],
        category: 'watching',
      },
    ],
    数据分析: [
      {
        name: 'metabase',
        link: { href: 'github.com/metabase/metabase', label: 'metabase' },
        description:
          '无需 SQL 知识，即可实现数据分析的开源商业智能和嵌入式分析工具',
        tags: ['Clojure', 'typescript', 'SQL', 'BI'],
        category: 'watching',
      },
    ],
    爬虫: [
      {
        name: 'MediaCrawler',
        link: { href: 'github.com/NanmiCoder/MediaCrawler', label: 'scrapy' },
        description: '一个适用于国内主要社交媒体平台的爬虫工具',
        tags: ['Python'],
        category: 'watching',
      },
    ],
    自动化: [
      {
        name: 'browser-use',
        link: {
          href: 'github.com/browser-use/browser-use',
          label: 'browser-use',
        },
        description: '让 AI 来操控浏览器!',
        tags: ['Python', 'web', 'ChromeDriver', 'AI'],
        category: 'watching',
      },
      {
        name: 'n8n',
        link: {
          href: 'github.com/n8n-io/n8n',
          label: 'n8n',
        },
        description: '安全的工作流程自动化平台',
        tags: ['Typescript', 'Vue', 'Python', 'AI'],
        category: 'watching',
      },
    ],
    音视频处理: [
      {
        name: 'video-subtitle-remover',
        description:
          '基于AI的图片/视频硬字幕去除、文本水印去除的本地视频处理工具',
        link: {
          href: 'github.com/Blunnny/video-subtitle-remover',
          label: 'video-subtitle-remover',
        },
        tags: ['Python', 'AI'],
        category: 'watching',
      },
      {
        name: 'aigcpanel',
        description: '一站式AI数字人系统，支持视频合成、声音合成、声音克隆',
        link: {
          href: 'github.com/modstart-lib/aigcpanel?tab=readme-ov-file',
          label: 'aigcpanel',
        },
        tags: ['Python', 'Typescript', 'Vue'],
        category: 'watching',
      },
      {
        name: 'Deep-Live-Cam',
        description: '实时人脸交换和单图一键视频深度伪造',
        link: {
          href: 'github.com/hacksider/Deep-Live-Cam',
          label: 'Deep-Live-Cam',
        },
        tags: ['Python', 'CUDA'],
        category: 'watching',
      },
      {
        name: 'Spark-TTS',
        description: '基于qwen2.5的高质量人声克隆工具',
        link: {
          href: 'github.com/SparkAudio/Spark-TTS?tab=readme-ov-file',
          label: 'Spark-TTS',
        },
        tags: ['Python', 'CUDA'],
        category: 'watching',
      },
      {
        name: 'KrillinAI',
        description: '大模型驱动的视频翻译和配音工具',
        link: {
          href: 'github.com/krillinai/KrillinAI?tab=readme-ov-file',
          label: 'KrillinAI',
        },
        tags: ['GO', 'HTML', 'Docker'],
        category: 'watching',
      },
      {
        name: 'LivePortrait',
        description: '让照片动起来（猫也可以！）',
        link: {
          href: 'github.com/KwaiVGI/LivePortrait',
          label: 'LivePortrait',
        },
        tags: ['Python', 'CUDA', 'C++'],
        category: 'watching',
      },
    ],
    技术学习: [
      {
        name: 'Anime.js',
        description: '前端开发中实现复杂动画的首选工具！',
        link: {
          href: 'github.com/juliangarnier/anime',
          label: 'Anime.js',
        },
        tags: ['JavaScript', 'CSS', 'HTML'],
        category: 'watching',
      },
      {
        name: 'developer-roadmap',
        description: '涵盖几乎所有方向的开发者路线图！',
        link: {
          href: 'github.com/kamranahmedse/developer-roadmap',
          label: 'developer-roadmap',
        },
        tags: ['JavaScript', 'TypeScript', 'Astro'],
        category: 'watching',
      },
      {
        name: 'Python-100-Days',
        description: 'Python - 100天从新手到大师（其实内容远远不止python）',
        link: {
          href: 'github.com/jackfrued/Python-100-Days',
          label: 'Python-100-Days',
        },
        tags: ['Python', 'Jupyter Notebook'],
        category: 'watching',
      },
      {
        name: 'toga',
        description: '一个 Python 与操作系统原生 GUI 工具包。',
        link: {
          href: 'github.com/beeware/toga',
          label: 'toga',
        },
        tags: ['Python', 'GUI', 'CSS'],
        category: 'watching',
      },
    ],
    文件处理: [
      {
        name: 'MinerU',
        description:
          '将PDF转换成Markdown和JSON格式的一站式开源高质量数据提取工具',
        link: {
          href: 'github.com/opendatalab/MinerU',
          label: 'MinerU',
        },
        tags: ['Python', 'Typescript'],
        category: 'watching',
      },
    ],
    小工具: [
      {
        name: 'newsnow',
        description: '优雅地阅读实时热门新闻',
        link: {
          href: 'github.com/ourongxing/newsnow',
          label: 'newsnow',
        },
        tags: ['Node.js', 'Docker', 'Typescript'],
        category: 'watching',
      },
      {
        name: 'glance',
        description: '一个将所有源订阅集中在一个地方的托管仪表板',
        link: {
          href: 'github.com/glanceapp/glance',
          label: 'glance',
        },
        tags: ['Go', 'HTML', 'CSS', 'JavaScript'],
        category: 'watching',
      },
      {
        name: 'ContextMenuManager',
        description: '管理鼠标右键内容，让右键菜单不再冗长！',
        link: {
          href: 'github.com/BluePointLilac/ContextMenuManager',
          label: 'ContextMenuManager',
        },
        tags: ['C#'],
        category: 'watching',
      },
      {
        name: 'KeyCastOW',
        description: '在电脑屏幕上实时显示按键的开源软件，用于录制视频',
        link: {
          href: 'github.com/brookhong/KeyCastOW',
          label: 'KeyCastOW',
        },
        tags: ['C', 'C++'],
        category: 'watching',
      },
    ],
    娱乐: [
      {
        name: 'IPTV',
        link: { href: 'github.com/iptv-org/iptv', label: 'IPTV' },
        description: '收看来自全世界的电视节目！',
        tags: ['JavaScript', 'TypeScript'],
        category: 'watching',
      },
      {
        name: 'stardroid(sky map)',
        description: '带你在晚上看星星！（免费无广告）',
        link: {
          href: 'github.com/sky-map-team/stardroid?tab=readme-ov-file',
          label: 'stardroid',
        },
        tags: ['Android', 'Java', 'Kotlin'],
        category: 'watching',
      },
    ],
  },
}

// Awards
export const awardsHeadLine = '所获奖项'
export const awardsIntro = '学术和职业成就的认可。'

export const awards: Array<ActivityItemType> = [
  {
    name: '互联网+大学生创新创业大赛国赛铜奖（主赛道）',
    description: '"智"预癌症',
    date: '2021',
    location: '中国, 厦门',
  },
  {
    name: '互联网+大学生创新创业大赛校赛金奖（红旅赛道）',
    description: '红树林校园公益教育',
    date: '2021',
    location: '中国, 厦门',
  },
]

// Hobbies & Volunteer
export const activitiesHeadLine = '兴趣爱好'
export const activitiesIntro = '琴棋书画诗酒花，代码咖啡猫与茶。'

export const activities: Array<ActivityItemType> = [
  {
    name: '乒乓球',
    description:
      '小学三年级开始学习乒乓球，曾称霸球馆小学组，后被市队淘汰选手击碎道心，遂放弃职业之路。',
    date: '2010-至今',
    location: '济南',
  },
  {
    name: '钢琴',
    description:
      '初中一年级开始学习钢琴，艰难完成拜厄钢琴基础教程，最高水平可演奏《卡农》（现在仍然可以！），后因学业压力放弃钢琴。',
    date: '2013-至今',
    location: '济南',
  },
  {
    name: '旅游',
    description:
      '已探索地区：法国、德国、意大利、奥地利、瑞士、梵蒂冈、新加坡、日本、香港、澳门，更多地区探索中...',
    date: '2001-未来',
    location: '全世界！',
  },
]
