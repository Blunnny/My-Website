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
  '在南方上学的北方人，<del>可从容应对北方的雾霾与暴雪，南方的回南天和大蟑螂。</del>',
  '误入会计的理科生，刚入门<del>但已被技术革命叙事洗脑的</del>新手程序员。',
  '曾经得到过无数人的帮助，希望未来也能帮助更多的人！',
  '理想是推动人类进步，愿望是世界和平。',
  'Make the world a better place!',
]

export const aboutFood = [
  '喜：' +
    [
      '锅包肉',
      '把子肉',
      '肉夹馍',
      '凉皮',
      '豆腐脑（咸的！）',
      '羊肉串',
      '大盘鸡',
      '北京烤鸭',
      '老北京火锅',
      '卤煮',
      '炸酱面',
      '鸭血粉丝汤',
      '小笼包',
      '生煎包',
      '西湖醋鱼（是的你没看错）',
      '东坡肉',
      '福州鱼丸',
      '海蛎煎',
      '四果汤',
      '五香卷',
      '三杯鸡',
      '卤肉饭',
      '小龙虾',
      '辣椒炒肉',
      '剁椒鱼头',
      '早茶（的一切！）',
      '潮汕牛肉火锅',
      '炒牛河',
      '顺德双皮奶',
      '湛江生蚝',
      '椰子鸡火锅',
      '重庆火锅',
      '重庆小面',
      '红油抄手',
      '辣子鸡',
      '毛血旺',
      '冷吃兔',
      '过桥米线',
      '菌子火锅',
      '寿司',
      '三文鱼',
      '牛排',
      '披萨',
      '汉堡',
      '炸鸡',
      '烤肉',
    ].join('、'),
  '忌：' +
    [
      '虾皮（吃馄饨时的最大阻力）',
      '甜豆腐脑（异端！）',
      '韭菜',
      '煎饼卷大葱<del>（不是山东人都爱吃大葱的！）</del>',
      '保留了一部分味道的九转大肠',
      '土笋冻（真的有人爱吃🐛吗？？）',
      '<del>香港大学的各个餐厅</del>',
    ].join('、'),
  'to be continued...',
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
