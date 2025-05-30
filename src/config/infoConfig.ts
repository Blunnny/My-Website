export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = '靳安和'
export const headline = '欢迎访问我的个人网站！'
export const introduction = '编译生活，调试人生，为思想找寻一席之地。'
export const email = 'jah22956@163.com'
export const githubUsername = 'Blunnny'

// about page
export const aboutMeHeadline = 'Who am I?'
export const aboutParagraphs = [
  'INTJ+双子座+山东济南',
  '我一直以来学习的都是会计学，但我同时对于计算机抱有极大的兴趣，我始终相信技术将改变会计，也将改变世界！',
  'Make the world a better place!',
]

// blog
export const blogHeadLine = '字耕墨耘，且记浮生'
export const blogIntro = '关于会计、计算机、哲学以及最重要的——人生。'

// social links
export type SocialLinkType = {
  name: string
  ariaLabel?: string
  icon: string
  href: string
}

// 微信公众号以及 bilibili 链接
export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Wechat',
    icon: 'wechat',
    href: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg5NTU4MzE1Ng==&scene=124#wechat_redirect',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/17405856',
  },
]

// https://simpleicons.org/
export const techIcons = [
  'steam',
  'python',
  'javascript',
  'tesla',
  'xiaomi',
  'css',
  'git',
  'github',
  'apple',
  'rockstargames',
  'wechat',
  'nvidia',
  'kfc',
  'mcdonalds',
  'gamescience',
  'bilibili',
  'mysql',
  'openai',
  'samsung',
]

export const projectHeadLine = '我的项目'
