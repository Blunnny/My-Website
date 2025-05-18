// education
export type EducationItemType = {
  school: string
  major?: string
  image?: string
  start: string
  end: string
  website?: string
}

export const educationList: Array<EducationItemType> = [
  {
    school: '香港大学',
    major: '会计学·硕士',
    image: '/images/schools/hku.png',
    start: '2023',
    end: '2025',
    website: 'https://www.hku.hk/c_index.html',
  },
  {
    school: '厦门大学',
    major: '会计学·本科',
    image: '/images/schools/xmu.png',
    start: '2019',
    end: '2023',
    website: 'https://www.xmu.edu.cn/',
  },
  {
    school: '济南市历城第二中学',
    image: '/images/schools/历城二中.webp',
    major: '理科·高中',
    start: '2016',
    end: '2019',
    website: 'https://www.lcez.cn/index.html',
  },
]
