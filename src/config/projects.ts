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
  | 'AI'
  | '金融'
  | '数据分析'
  | '爬虫'
  | '自动化'
  | '音视频处理'
  | '技术学习'
  | '文件处理'
  | '小工具'
  | '娱乐'
  | '艺术设计'
  | '资源'

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
    {
      name: '智能财务评分系统',
      description: '可以实现一键对财报的分析！',
      link: {
        href: 'github.com/Blunnny/Smart-Finance-Rating',
        label: 'GitHub',
      },
      tags: ['AI', 'Python'],
      logo: '/images/icon/Smart-Finance-Rating.png',
      category: 'my',
    },
    {
      name: '增值税发票识别器',
      description: '我不想再看发票了！',
      link: {
        href: 'github.com/Blunnny/Invoice-Recognizer',
        label: 'GitHub',
      },
      tags: ['AI', 'Python'],
      logo: '/images/icon/identifier.png',
      category: 'my',
    },
    {
      name: '浅草缘签',
      description: '在浅草寺实现赛博占卜！',
      link: {
        href: 'github.com/Blunnny/Sensoji-Temple-fortune',
        label: 'GitHub',
      },
      tags: ['TypeScript', 'CSS', 'HTML'],
      logo: '/images/icon/temple.png',
      category: 'my',
    },
    {
      name: 'FUCK_BEISEN',
      description: '北森题库自动化填写工具',
      link: {
        href: 'github.com/Blunnny/FUCK_BEISEN',
        label: 'GitHub',
      },
      tags: ['Python'],
      logo: '/images/icon/beisen.png',
      category: 'my',
    },
  ],
  watching: {
    AI: [
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
      {
        name: 'Twocast',
        link: {
          href: 'github.com/panyanyany/Twocast',
          label: 'Twocast',
        },
        description: 'AI生成双人播客',
        tags: ['TypeScript', 'JavaScript', 'LLM'],
        category: 'watching',
      },
      {
        name: 'hermes-agent',
        link: {
          href: 'github.com/NousResearch/hermes-agent',
          label: 'hermes-agent',
        },
        description: '小龙虾之后又一爆火Agent',
        tags: ['TypeScript', 'Pyhton'],
        category: 'watching',
      },
      {
        name: 'models.dev',
        link: {
          href: 'github.com/anomalyco/models.dev',
          label: 'models.dev',
        },
        description: '一个开源的AI模型数据库',
        tags: ['TypeScript'],
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
      {
        name: 'nautilus_trader',
        link: {
          href: 'github.com/nautechsystems/nautilus_trader',
          label: 'nautilus_trader',
        },
        description: '一个高性能算法交易平台和事件驱动回测器',
        tags: ['Python', 'Rust', 'Cpython'],
        category: 'watching',
      },
      {
        name: 'TradingAgents',
        link: {
          href: 'github.com/TauricResearch/TradingAgents',
          label: 'TradingAgents',
        },
        description: '一个多智能体大语言模型金融交易框架',
        tags: ['Python', 'LLM'],
        category: 'watching',
      },
      {
        name: 'TradingAgents-CN',
        link: {
          href: 'github.com/hsliuping/TradingAgents-CN',
          label: 'TradingAgents-CN',
        },
        description: 'TradingAgents的中文增强版',
        tags: ['Python', 'LLM'],
        category: 'watching',
      },
      {
        name: 'stock-sdk',
        link: {
          href: 'github.com/chengzuopeng/stock-sdk',
          label: 'stock-sdk',
        },
        description: '为前端设计的JavaScript SDK。',
        tags: ['TypeScript'],
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
      {
        name: 'BettaFish 微舆',
        link: {
          href: 'github.com/666ghj/BettaFish?tab=readme-ov-file',
          label: 'BettaFish',
        },
        description: '人人可用的多Agent舆情分析助手',
        tags: ['Python', 'HTML'],
        category: 'watching',
      },
      {
        name: 'TrendRadar',
        link: {
          href: 'github.com/sansan0/TrendRadar',
          label: 'TrendRadar',
        },
        description: '开源的新闻热点分析助手',
        tags: ['Python', 'HTML'],
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
      {
        name: 'scrapy',
        link: { href: 'github.com/scrapy/scrapy', label: 'scrapy' },
        description: '最主流的Python爬虫框架',
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
      {
        name: 'terminator',
        link: {
          href: 'github.com/mediar-ai/terminator/tree/main',
          label: 'terminator',
        },
        description: '通过实时分析屏幕内容实现AI代理',
        tags: ['Rust', 'Javascript', 'Python', 'AI'],
        category: 'watching',
      },
      {
        name: 'WebRPA',
        link: {
          href: 'github.com/pmh1314520/WebRPA',
          label: 'WebRPA',
        },
        description: '一款功能强大的可视化网页自动化工具',
        tags: ['Typescript', 'Javascript', 'Python'],
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
      {
        name: '卡卡字幕助手',
        description: '通过语音识别来生成视频字幕',
        link: {
          href: 'github.com/WEIFENG2333/VideoCaptioner',
          label: 'VideoCaptioner',
        },
        tags: ['Python'],
        category: 'watching',
      },
      {
        name: 'spleeter',
        description: '一个音频分离工具（人声、音乐声、背景声）',
        link: {
          href: 'github.com/deezer/spleeter',
          label: 'spleeter',
        },
        tags: ['Python', 'Dockerfile'],
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
        description: 'Python - 100天从新手到大师（当然了这是不可能的）',
        link: {
          href: 'github.com/jackfrued/Python-100-Days',
          label: 'Python-100-Days',
        },
        tags: ['Python', 'Jupyter Notebook'],
        category: 'watching',
      },
      {
        name: 'python-mastery',
        description: 'python进阶教程',
        link: {
          href: 'github.com/dabeaz-course/python-mastery',
          label: 'python-mastery',
        },
        tags: ['Python'],
        category: 'watching',
      },
      {
        name: 'Hello-CTF',
        description: 'CTF网络攻防入门教程',
        link: {
          href: 'github.com/ProbiusOfficial/Hello-CTF',
          label: 'Hello-CTF',
        },
        tags: ['Python', 'PHP', 'HTML'],
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
      {
        name: 'quarkdown',
        description: '用markdown写出漂亮排版的工具（跟夸克没关系！）',
        link: {
          href: 'github.com/iamgio/quarkdown',
          label: 'quarkdown',
        },
        tags: ['Kotlin', 'HTML', 'CSS'],
        category: 'watching',
      },
      {
        name: 'Imagine',
        description: '一个适用于各种系统的PNG/JPEG图片压缩工具',
        link: {
          href: 'github.com/meowtec/Imagine',
          label: 'Imagine',
        },
        tags: ['Typescript'],
        category: 'watching',
      },
      {
        name: 'FileConverter',
        description: '一个可以转换几乎所有主流文件格式的开源工具',
        link: {
          href: 'github.com/Tichau/FileConverter',
          label: 'FileConverter',
        },
        tags: ['C#'],
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
        description: '带你在晚上看星星！',
        link: {
          href: 'github.com/sky-map-team/stardroid?tab=readme-ov-file',
          label: 'stardroid',
        },
        tags: ['Android', 'Java', 'Kotlin'],
        category: 'watching',
      },
      {
        name: 'HowToCook',
        description: '程序员做饭指南',
        link: {
          href: 'github.com/Anduin2017/HowToCook',
          label: 'HowToCook',
        },
        tags: ['Dockerfile'],
        category: 'watching',
      },
      {
        name: 'MoonTV',
        description: '一个开箱即用的、跨平台的影视聚合播放站',
        link: {
          href: 'github.com/LunaTechLab/MoonTV',
          label: 'MoonTV',
        },
        tags: ['TypeScript', 'CSS'],
        category: 'watching',
      },
      {
        name: 'CookLikeHOC',
        description: '像老乡鸡那样做饭-《老乡鸡菜品溯源报告》的电子版',
        link: {
          href: 'github.com/Gar-b-age/CookLikeHOC',
          label: 'CookLikeHOC',
        },
        tags: ['TypeScript', 'JavaScript', 'Dockerfile'],
        category: 'watching',
      },
      {
        name: 'preserve-cd',
        description: '绝版游戏保护工程',
        link: {
          href: 'github.com/skywind3000/preserve-cd',
          label: 'preserve-cd',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: 'mimotion',
        description: '小米运动刷步数！',
        link: {
          href: 'github.com/TonyJiangWJ/mimotion',
          label: 'mimotion',
        },
        tags: ['Python', 'Shell'],
        category: 'watching',
      },
    ],
    艺术设计: [
      {
        name: 'onlook',
        link: { href: 'github.com/onlook-dev/onlook', label: 'onlook' },
        description: '设计师的cursor！',
        tags: ['TypeScript'],
        category: 'watching',
      },
      {
        name: 'postiz-app',
        link: { href: 'github.com/gitroomhq/postiz-app', label: 'postiz-app' },
        description: 'AI驱动的社交媒体排期工具',
        tags: ['TypeScript', 'JavaScript', 'CSS'],
        category: 'watching',
      },
      {
        name: 'awesome-design-md',
        link: { href: 'github.com/VoltAgent/awesome-design-md', label: 'awesome-design-md' },
        description: '网页设计灵感收集库',
        tags: ['Markdown'],
        category: 'watching',
      },
      {
        name: 'github.com/ianho7/maptoposter-online',
        link: { href: 'github.com/ianho7/maptoposter-online', label: 'maptoposter-online' },
        description: '做漂亮城市海报的小工具',
        tags: ['TypeScript','Rust'],
        category: 'watching',
      },
      {
        name: 'github.com/helloianneo/ian-xiaohei-illustrations',
        link: { href: 'github.com/helloianneo/ian-xiaohei-illustrations', label: 'ian-xiaohei-illustrations' },
        description: '一个帮文章配图的skill',
        tags: ['-'],
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
      {
        name: '163MusicLyrics',
        description: '网易云、QQ音乐下载工具',
        link: {
          href: 'github.com/jitwxs/163MusicLyrics',
          label: '163MusicLyrics',
        },
        tags: ['C#'],
        category: 'watching',
      },
      {
        name: 'B2Y',
        description: '在YouTube上自动同步显示B站弹幕',
        link: {
          href: 'github.com/ahaduoduoduo/bilibili-youtube-danmaku',
          label: 'B2Y',
        },
        tags: ['JavaScript', 'HTML', 'CSS'],
        category: 'watching',
      },
      {
        name: '白板',
        description: '开源的白板工具',
        link: {
          href: 'github.com/plait-board/drawnix',
          label: '白板',
        },
        tags: ['TypeScript', 'SCSS', 'HTML'],
        category: 'watching',
      },
      {
        name: '哔哔君',
        description:
          '哩哔哩字幕列表浏览器扩展，功能包括下载、总结、翻译字幕等。',
        link: {
          href: 'github.com/IndieKKY/bilibili-subtitle',
          label: '哔哔君',
        },
        tags: ['TypeScript', 'JavaScript'],
        category: 'watching',
      },
      {
        name: 'EcoPaste',
        description: '跨平台的剪贴板管理工具',
        link: {
          href: 'github.com/EcoPasteHub/EcoPaste',
          label: 'EcoPaste',
        },
        tags: ['TypeScript', 'Rust'],
        category: 'watching',
      },
      {
        name: 'fuck-u-code',
        description: '屎山代码检测器，来看看你的代码有多烂？',
        link: {
          href: 'github.com/Done-0/fuck-u-code',
          label: 'fuck-u-code',
        },
        tags: ['Go'],
        category: 'watching',
      },
      {
        name: 'ExplorerPatcher',
        description: 'Win11页面优化工具',
        link: {
          href: 'github.com/valinet/ExplorerPatcher',
          label: 'ExplorerPatcher',
        },
        tags: ['C', 'C++'],
        category: 'watching',
      },
      {
        name: 'codebox',
        description: '解除CSDN/知乎等平台的代码复制限制与登录弹窗',
        link: {
          href: 'github.com/027xiguapi/code-box',
          label: 'codebox',
        },
        tags: ['TypeScript', 'HTML'],
        category: 'watching',
      },
      {
        name: 'LazyCat-Bookmark-Cleaner',
        description: '智能清理和整理浏览器书签',
        link: {
          href: 'github.com/Alanrk/LazyCat-Bookmark-Cleaner?tab=readme-ov-file',
          label: 'LazyCat-Bookmark-Cleaner',
        },
        tags: ['JavaScript', 'CSS', 'HTML'],
        category: 'watching',
      },
      {
        name: 'HQ-ICON',
        description: '从 App Store 上获取应用图标',
        link: {
          href: 'github.com/YuKongA/HQ-ICON',
          label: 'HQ-ICON',
        },
        tags: ['JavaScript', 'CSS', 'HTML'],
        category: 'watching',
      },
      {
        name: 'snow-shot',
        description: '超好用的截图工具',
        link: {
          href: 'github.com/mg-chao/snow-shot',
          label: 'snow-shot',
        },
        tags: ['Rust', 'TypeScript'],
        category: 'watching',
      },
      {
        name: 'VidBee',
        description: '一个几乎可以从全球任何网站下载视频的工具',
        link: {
          href: 'github.com/nexmoe/VidBee',
          label: 'VidBee',
        },
        tags: ['JavaScript', 'TypeScript'],
        category: 'watching',
      },
      {
        name: 'tiez-clipboard',
        description: '一款基于 Tauri 的跨平台剪贴板管理器',
        link: {
          href: 'github.com/jimuzhe/tiez-clipboard',
          label: 'tiz-clipboarde',
        },
        tags: ['Rust', 'TypeScript', 'CSS'],
        category: 'watching',
      },
    ],
    资源: [
      {
        name: 'free-for-dev',
        description: '开发者的白嫖资源库',
        link: {
          href: 'github.com/ripienaar/free-for-dev',
          label: 'free-for-dev',
        },
        tags: ['HTML'],
        category: 'watching',
      },
      {
        name: 'Interview_questions',
        description: '大厂技术岗的面经汇总',
        link: {
          href: 'github.com/0voice/Campus_recruitment_interview_questions',
          label: 'Campus_recruitment_interview_questions',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: '60s',
        description: '全球CDN加速的开放API集合',
        link: {
          href: 'github.com/vikiboss/60s',
          label: '60s',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: 'ossnav',
        description: '收录了大量开源免费资源的仓库',
        link: {
          href: 'github.com/maxiaobang7/ossnav',
          label: 'ossnav',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: 'free-font',
        description:
          '收录了大量可免费商用的字体，覆盖中文、英文、日文等常用语言',
        link: {
          href: 'github.com/jaywcjlove/free-font',
          label: 'free-font',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: 'open-meteo',
        description: '非商业用途的免费天气预报 API，提供全球范围内的天气数据',
        link: {
          href: 'github.com/open-meteo/open-meteo',
          label: 'open-meteo',
        },
        tags: ['swift'],
        category: 'watching',
      },
      {
        name: 'motrix-next',
        description: '一个开源的全能下载工具',
        link: {
          href: 'github.com/AnInsomniacy/motrix-next',
          label: 'motrix-next',
        },
        tags: ['TypeScript', 'JavaScript', 'Rust'],
        category: 'watching',
      },
      {
        name: 'gaokaomath',
        description: '历年高考数学真题汇总',
        link: {
          href: 'github.com/deekur/gaokaomath',
          label: 'gaokaomath',
        },
        tags: ['-'],
        category: 'watching',
      },
      {
        name: 'TorrentSearch',
        description: '一个开源的种子搜索APP',
        link: {
          href: 'github.com/prajwalch/TorrentSearch',
          label: 'TorrentSearch',
        },
        tags: ['Kotlin'],
        category: 'watching',
      },
      {
        name: 'mediary-scout',
        description: '一个开源的影视搜索agnet',
        link: {
          href: 'github.com/fancydirty/mediary-scout',
          label: 'mediary-scout',
        },
        tags: ['TypeScript','JavaScript'],
        category: 'watching',
      },
      {
        name: 'exercises-dataset',
        description: '健身动作的数据集',
        link: {
          href: 'github.com/hasaneyldrm/exercises-dataset',
          label: 'exercises-dataset',
        },
        tags: ['HTML'],
        category: 'watching',
      },
      {
        name: 'awesome-zhuiju-free',
        description: '免费无广告的追剧资源指南',
        link: {
          href: 'github.com/laoma2053/awesome-zhuiju-free',
          label: 'awesome-zhuiju-free',
        },
        tags: ['JavaScript'],
        category: 'watching',
      },
    ],
  },
}




