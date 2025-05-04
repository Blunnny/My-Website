// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
  icon?: string // 可选的图标路径
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
}

// Research & Projects
export const projectHeadLine = '我做的小项目'
export const projectIntro = '此中有真意，bug已忘言。'

// 项目的详细信息
export const projects: Array<ProjectItemType> = [
  {
    name: 'TimeVault',
    description: '随机生成地牢探险，限时挑战闯五关，金币钥匙全收集！',
    link: { href: 'github.com/Blunnny/TimeVault', label: 'GitHub' },
    tags: ['Java', 'Maven', 'TileEngine '],
    icon: '/images/icon/TimeVault.png', // 添加自定义图标
  },
  {
    name: '个人网站开发',
    description: '本网站的所有资料都可以在这里找到！',
    link: { href: 'github.com/Blunnny/My-Website', label: 'GitHub' },
    tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
    icon: '/images/icon/My-Website.png', // 添加自定义图标
  },
]

// Awards
export const awardsHeadLine = '所获奖项'
export const awardsIntro = '学术和职业成就的认可。'

export const awards: Array<ActivityItemType> = [
  {
    name: '互联网+大学生创新创业大赛国赛铜奖（主赛道）',
    description: '“智”预癌症',
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
    // 有素材再添加链接
    // link: 'https://example.com/python-workshop',
  },
  {
    name: '钢琴',
    description:
      '初中一年级开始学习钢琴，艰难完成拜厄钢琴基础教程，最高水平可演奏《卡农》（现在仍然可以！），后因学业压力放弃钢琴。',
    date: '2013-至今',
    location: '济南',
    // 有素材再添加链接
    // link: 'https://example.com/ai-ethics',
  },
  {
    name: '旅游',
    description:
      '已探索地区：法国、德国、意大利、奥地利、瑞士、梵蒂冈、新加坡、日本、香港、澳门，更多地区探索中...',
    date: '2001-未来',
    location: '全世界！',
    // 有素材再添加链接
    // link: 'https://example.com/ai-ethics',
  },
]

export const watchingProjectHeadLine = '我正在关注的项目'
export const watchingProjectIntro = '观千剑而后识器，追开源以觅真知。'
export const watchingProjects: Array<ProjectItemType> = [
  {
    name: 'minimind',
    description: '从0开始训练一个超小语言模型 MiniMind！',
    link: {
      href: 'github.com/jingyaogong/minimind',
      label: 'minimind',
    },
    tags: ['PyTorch', 'LLM', 'transformers'],
  },
  {
    name: 'newsnow',
    description: '优雅地阅读实时热门新闻',
    link: {
      href: 'github.com/ourongxing/newsnow',
      label: 'newsnow',
    },
    tags: ['Node.js', 'Docker', 'Typescript'],
  },
  {
    name: 'browser-use',
    description: '让 AI 来操控浏览器!',
    link: {
      href: 'github.com/browser-use/browser-use',
      label: 'browser-use',
    },
    tags: ['Python', 'web', 'ChromeDriver', 'AI'],
  },
  {
    name: 'AI Hedge Fund',
    description: 'AI 驱动的对冲基金',
    link: {
      href: 'github.com/virattt/ai-hedge-fund',
      label: 'AI Hedge Fund',
    },
    tags: ['Python', 'Docker', 'AI', 'Stockmarket'],
  },
  {
    name: 'metabase',
    description:
      '无需 SQL 知识，即可实现数据分析的开源商业智能和嵌入式分析工具',
    link: {
      href: 'github.com/metabase/metabase',
      label: 'metabase',
    },
    tags: ['Clojure', 'typescript', 'SQL', 'BI'],
  },
  {
    name: 'n8n',
    description: '安全的工作流程自动化平台',
    link: {
      href: 'github.com/n8n-io/n8n',
      label: 'n8n',
    },
    tags: ['Typescript', 'Vue', 'Python', 'AI'],
  },
  {
    name: 'glance',
    description: '一个将所有源订阅集中在一个地方的托管仪表板',
    link: {
      href: 'github.com/glanceapp/glance',
      label: 'glance',
    },
    tags: ['Go', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    name: 'toga',
    description: '一个 Python 与操作系统原生 GUI 工具包。',
    link: {
      href: 'github.com/beeware/toga',
      label: 'toga',
    },
    tags: ['Python', 'GUI', 'CSS'],
  },
  {
    name: 'MinerU',
    description: '将PDF转换成Markdown和JSON格式的一站式开源高质量数据提取工具',
    link: {
      href: 'github.com/opendatalab/MinerU',
      label: 'MinerU',
    },
    tags: ['Python', 'Typescript'],
  },
  {
    name: 'video-subtitle-remover',
    description: '基于AI的图片/视频硬字幕去除、文本水印去除的本地视频处理工具',
    link: {
      href: 'github.com/Blunnny/video-subtitle-remover',
      label: 'video-subtitle-remover',
    },
    tags: ['Python', 'AI'],
  },
  {
    name: 'aigcpanel',
    description: '一站式AI数字人系统，支持视频合成、声音合成、声音克隆',
    link: {
      href: 'github.com/modstart-lib/aigcpanel?tab=readme-ov-file',
      label: 'aigcpanel',
    },
    tags: ['Python', 'Typescript', 'Vue'],
  },
  {
    name: 'Deep-Live-Cam',
    description: '实时人脸交换和单图一键视频深度伪造',
    link: {
      href: 'github.com/hacksider/Deep-Live-Cam',
      label: 'Deep-Live-Cam',
    },
    tags: ['Python', 'CUDA'],
  },
  {
    name: 'Spark-TTS',
    description: '基于qwen2.5的高质量人声克隆工具',
    link: {
      href: 'github.com/SparkAudio/Spark-TTS?tab=readme-ov-file',
      label: 'Spark-TTS',
    },
    tags: ['Python', 'CUDA'],
  },
  {
    name: 'stardroid(sky map)',
    description: '带你在晚上看星星！（免费且无广告）',
    link: {
      href: 'github.com/sky-map-team/stardroid?tab=readme-ov-file',
      label: 'stardroid',
    },
    tags: ['Android', 'Java', 'Kotlin'],
  },
]
