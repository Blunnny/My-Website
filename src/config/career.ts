// career
export type CareerItemType = {
  company: string
  title: string
  image?: string
  start: string
  end: string
  website?: string
}

export const careerList: Array<CareerItemType> = [
  {
    company: '吉比特&雷霆游戏',
    title: '财务部 实习生',
    image: '/images/companies/gigame.png',
    start: '2024.10',
    end: '2025.2',
    website: 'https://www.g-bits.com/zh/',
  },
  {
    company: '深圳市高斯全球信息技术有限公司',
    title: '财务部 实习生',
    image: '/images/companies/gauss.png',
    start: '2024.4',
    end: '2024.7',
    website: 'https://www.gsrtech.com/',
  },
  {
    company: '海通证券股份有限公司(sadly, it is gone)',
    title: '研究所 实习生',
    image: '/images/companies/haitong.png',
    start: '2024.1',
    end: '2024.4',
    website: 'https://www.gtht.com/',
  },
  {
    company: '国海证券股份有限公司',
    title: '研究所 实习生',
    image: '/images/companies/guohai.png',
    start: '2023.4',
    end: '2023.7',
    website: 'https://www.ghzq.com.cn/',
  },
  {
    company: '天职国际会计师事务所（特殊普通合伙）',
    title: '质检部 实习生',
    image: '/images/companies/tianZhi.png',
    start: '2021.10',
    end: '2022.2',
    website: 'https://www.tzcpa.com/',
  },
]
