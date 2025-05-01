// education
export type EducationItemType = {
  school: string
  major: string
  image?: string
  start: string
  end: string
  website?: string
}

export const educationList: Array<EducationItemType> = [
  {
    school: '香港大学',
    major: '会计学',
    image: '/images/schools/hku.png',
    start: '2023',
    end: '2025',
    website: 'https://www.hku.hk/c_index.html',
  },
  {
    school: '厦门大学',
    major: '会计学',
    image: '/images/schools/xmu.png',
    start: '2019',
    end: '2023',
    website: 'https://www.xmu.edu.cn/',
  },
]
