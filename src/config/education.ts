// education
export type EducationItemType = {
  school: string
  major: string
  image?: string
  start: string
  end: string
}

export const educationList: Array<EducationItemType> = [
  {
    school: '香港大学',
    major: '会计学',
    image: '/images/schools/hku.png',
    start: '2023',
    end: '2025',
  },
  {
    school: '厦门大学',
    major: '会计学',
    image: '/images/schools/xmu.png',
    start: '2019',
    end: '2023',
  },
]
