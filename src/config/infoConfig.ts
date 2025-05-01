export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = '靳安和'
export const headline = '探索技术无限可能！'
export const introduction =
  'Hello! 我是靳安和，来自山东济南，欢迎访问我的个人网站！'
export const email = 'jah22956@163.com'
export const githubUsername = 'Blunnny'

// about page
export const aboutMeHeadline = 'Who am I?'
export const aboutParagraphs = [
  'Hello! 我是靳安和，来自山东济南，本科毕业于厦门大学会计学专业，目前就读于香港大学会计学专业。',
  '虽然我一直以来学习的都是会计学，但我对于计算机有着极大的兴趣，我始终相信技术将改变会计，也将改变世界！',
  'Make the world a better place!',
]

// blog
export const blogHeadLine = '字耕墨耘，且记浮生'
export const blogIntro = '关于会计、计算机、哲学以及最重要的——人生'

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
