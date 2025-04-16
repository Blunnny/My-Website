// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
}

// Research & Projects
export const projectHeadLine = '项目经历'
export const projectIntro = '参与的学术研究和技术项目（之后有了再写）'

// 之后有了再写
export const projects: Array<ProjectItemType> = [
  {
    name: 'Student Final Project Portfolio',
    description: 'Static website portfolio',
    link: { href: 'scls-cs.com', label: 'GitHub Cards' },
    tags: ['Website', 'Next.js', 'TailwindCSS', 'DaisyUI', 'Portfolio'],
  },
  {
    name: 'AI Camp Course Development',
    description:
      'Developed a comprehensive AI curriculum for high school students, incorporating real-world projects and startup concepts.',
    link: { href: 'https://scls-cs.gitbook.io/ai-camp', label: 'View Course' },
    tags: ['Education', 'AI'],
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
export const activitiesIntro = '没事的时候喜欢...'

export const activities: Array<ActivityItemType> = [
  {
    name: '乒乓球',
    description:
      '小学三年级开始学习乒乓球，曾称霸球馆小学组，后被市队淘汰选手击碎道心，遂放弃职业之路',
    date: '2010-至今',
    location: '济南',
    // 有素材再添加链接
    // link: 'https://example.com/python-workshop',
  },
  {
    name: '钢琴',
    description:
      '初中一年级受父母所迫学习钢琴，艰难完成拜厄钢琴基础教程，最高水平可演奏《卡农》（现在仍然可以！），后因学业压力放弃钢琴',
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
