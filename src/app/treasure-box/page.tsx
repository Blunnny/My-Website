'use client'

import { Container } from '@/components/layout/Container'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

// 标签类型定义
type TagType = '免费' | '无广告' | '部分免费' | '收费' | '政府网站' | '有广告'

// 网站项目类型定义
type WebsiteItem = {
  title: string
  url: string
  description: string
  tags: TagType[]
}

// 主分类类型定义
type MainCategory =
  | '实用工具'
  | '公司数据'
  | '宏观数据'
  | '艺术设计'
  | '医疗健康'
  | '终身学习'
  | '购物'
  | '游戏'
  | '其他'

// 工具子分类类型定义
type ToolSubCategory =
  | '音视频处理'
  | '图片处理'
  | '文件格式转换'
  | '小工具集合'
  | '其他工具'
  | 'AI大模型'

// 公司数据子分类类型定义
type ResourceSubCategory =
  | '证券信息'
  | '研究报告'
  | '企业信息'
  | '审计信息'
  | '会计信息'
  | '其他信息'

// 宏观数据子分类类型定义
type MacroDataSubCategory =
  | '经济数据'
  | 'APP数据'
  | '房地产数据'
  | '其他数据'
  | '电影数据'
  | '研究报告'
  | '咨询报告'

// 艺术设计子分类类型定义
type ArtDesignSubCategory =
  | '字体网站'
  | '色彩搭配'
  | '图片素材'
  | '图标素材'
  | '艺术欣赏'
  | '其他'

// 医疗健康子分类类型定义
type HealthMedSubCategory = '医疗健康' | '运动健身'

// 终身学习子分类类型定义
type LifelongLearningSubCategory =
  | '课程学习'
  | '维修与手工学习'
  | '语言学习'
  | '音乐学习'
  | '棋类学习'
  | '历史学习'
  | '书法学习'
  | '其他'

// 购物子分类类型定义
type ShoppingSubCategory = '购物指南' | '购物网站'

// 游戏子分类类型定义
type GameSubCategory = '游戏网站'

// 其他子分类类型定义
type OtherSubCategory = '世界公民' | '其他'

// 分类数据结构类型定义
type CategoriesType = {
  实用工具: Record<ToolSubCategory, WebsiteItem[]>
  公司数据: Record<ResourceSubCategory, WebsiteItem[]>
  宏观数据: Record<MacroDataSubCategory, WebsiteItem[]>
  艺术设计: Record<ArtDesignSubCategory, WebsiteItem[]>
  医疗健康: Record<HealthMedSubCategory, WebsiteItem[]>
  终身学习: Record<LifelongLearningSubCategory, WebsiteItem[]>
  购物: Record<ShoppingSubCategory, WebsiteItem[]>
  游戏: Record<GameSubCategory, WebsiteItem[]>
  其他: Record<OtherSubCategory, WebsiteItem[]>
}

// 标签样式映射
const tagStyles: Record<TagType, string> = {
  免费: 'bg-green-100 text-green-800',
  无广告: 'bg-blue-100 text-blue-800',
  部分免费: 'bg-yellow-100 text-yellow-800',
  收费: 'bg-red-100 text-red-800',
  政府网站: 'bg-purple-100 text-purple-800',
  有广告: 'bg-red-100 text-red-800',
}

// 网站分类数据
const categories: CategoriesType = {
  实用工具: {
    文件格式转换: [
      {
        title: 'convertio',
        url: 'https://convertio.co/zh/',
        description: '上百种文件格式在线转换器',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '图片格式转换器',
        url: 'https://svgtopng.com/zh/',
        description: '多种图片格式在线转换器',
        tags: ['免费', '有广告'],
      },
      {
        title: '超级PDF',
        url: 'https://lkssite.vip/',
        description: 'PDF与多种office文档的在线转换与处理工具',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '凹凸凹',
        url: 'https://www.alltoall.net/',
        description: '200多种格式文件的的在线转换器（大小不超过20MB）',
        tags: ['免费', '无广告'],
      },
      {
        title: 'ilovepdf',
        url: 'https://www.ilovepdf.com/zh-cn/pricing',
        description: 'PDF与多种office文档的在线转换与处理工具',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'aconvert',
        url: 'https://www.aconvert.com/',
        description: '超多文件格式转换与处理工具',
        tags: ['免费', '无广告'],
      },
      {
        title: 'PDF24',
        url: 'https://tools.pdf24.org/zh/all-tools',
        description: '超多PDF文件在线转换与处理工具',
        tags: ['免费', '无广告'],
      },
    ],
    图片处理: [
      {
        title: 'Magic Eraser',
        url: 'https://magicstudio.com/zh/magiceraser/',
        description: '智能消除图片中的元素',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'Bgsub',
        url: 'https://bgsub.cn/',
        description: '一个AI驱动的免费抠图网站，支持批量操作',
        tags: ['免费', '无广告'],
      },
    ],
    音视频处理: [
      {
        title: 'cobalt',
        url: 'https://cobalt.tools/',
        description: '输入视频网址即可下载视频或音频',
        tags: ['免费', '无广告'],
      },
      {
        title: '团子AI',
        url: 'https://tuanziai.com/vocal-remover',
        description: '伴奏声音与人声提取网站',
        tags: ['部分免费', '无广告'],
      },
    ],
    小工具集合: [
      {
        title: '在线工具',
        url: 'https://tool.lu/',
        description: '海量小工具合集',
        tags: ['免费', '无广告'],
      },
      {
        title: '阿虚同学的储物间',
        url: 'https://axutongxue.com/',
        description: '海量工具合集',
        tags: ['免费', '有广告'],
      },
      {
        title: '即时工具',
        url: 'https://www.67tool.com/',
        description: '海量在线工具合集',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'miku tool',
        url: 'https://tools.miku.ac/',
        description: '在线小工具合集',
        tags: ['免费', '无广告'],
      },
    ],
    AI大模型: [
      {
        title: 'chatgpt',
        url: 'https://chatgpt.com/',
        description: '最强AI大模型',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'grok',
        url: 'https://x.ai/',
        description: '马斯克X旗下的AI大模型',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'gemini',
        url: 'https://gemini.google.com/',
        description: '谷歌旗下的AI大模型',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '通义千问',
        url: 'https://chat.qwen.ai/c/1ee6ba6e-61df-44ce-972e-4030929ca6ff',
        description: '阿里旗下的AI大模型',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'deepseek',
        url: 'https://chat.deepseek.com/',
        description: '无需多言',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'AI 导航',
        url: 'https://www.jyshare.com/ai/',
        description: '汇聚AI对话、绘画、编程等多方面的AI工具',
        tags: ['部分免费', '无广告'],
      },
    ],
    其他工具: [
      {
        title: 'sms-activate',
        url: 'https://sms-activate.world/cn',
        description: '虚拟电话平台',
        tags: ['收费', '无广告'],
      },
      {
        title: 'hotkeycheatsheet',
        url: 'https://hotkeycheatsheet.com/zh',
        description: '各大软件的快捷键备忘录',
        tags: ['免费', '无广告'],
      },
      {
        title: '深言达意',
        url: 'https://www.shenyandayi.com/',
        description: '寻找同义词、同义句以及公文表述',
        tags: ['免费', '无广告'],
      },
      {
        title: 'CSP check',
        url: 'https://cps-check.com/cn/polling-rate-check',
        description: '鼠标与键盘测试工具',
        tags: ['免费', '无广告'],
      },
      {
        title: 'temp Mail',
        url: 'https://temp-mail.org/zh/',
        description: '临时邮箱工具',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '纸由我paperme',
        url: 'https://paperme.toolooz.com/?ref=www.qssily.com',
        description: '纸张模拟编辑网站',
        tags: ['免费', '无广告'],
      },
    ],
  },

  公司数据: {
    证券信息: [
      {
        title: '巨潮资讯网',
        url: 'https://www.cninfo.com.cn/new/index',
        description: '证券金融数据权威查询网站',
        tags: ['免费', '政府网站'],
      },
      {
        title: '上海证券交易所',
        url: 'https://www.sse.com.cn/',
        description: '上海证券交易所官方网站',
        tags: ['免费', '政府网站'],
      },
      {
        title: '深圳证券交易所',
        url: 'https://www.sse.org.cn/disclosure/index.html',
        description: '深圳证券交易所官方网站',
        tags: ['免费', '政府网站'],
      },
      {
        title: '中国债券信息网',
        url: 'https://www.chinabond.com.cn/',
        description: '中央国债登记结算有限责任公司官方网站',
        tags: ['免费', '政府网站'],
      },
      {
        title: '证监会',
        url: 'http://www.csrc.gov.cn/',
        description: '中国证券监督管理委员会官方官网',
        tags: ['免费', '政府网站'],
      },
      {
        title: '中国货币网',
        url: 'https://www.chinamoney.com.cn/chinese/index.html',
        description: '银行间市场、货币市场查询',
        tags: ['免费', '政府网站'],
      },
    ],
    研究报告: [
      {
        title: '萝卜投研',
        url: 'https://robo.datayes.com/v2/selection',
        description: '券商研报查询网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '发现报告',
        url: 'https://www.fxbaogao.com/rp?rt=11&keywords=AIGC&order=2&nop=-1',
        description: '券商研报、行业研究等报告查询网站',
        tags: ['部分免费', '有广告'],
      },
    ],
    企业信息: [
      {
        title: '天眼查',
        url: 'https://www.tianyancha.com/',
        description: '企业信息查询网站',
        tags: ['收费', '无广告'],
      },
      {
        title: '企查查',
        url: 'https://www.qcc.com/',
        description: '企业信息查询网站',
        tags: ['收费', '有广告'],
      },
      {
        title: '中国土地市场网',
        url: 'https://www.landchina.com/#/',
        description: '查询土地信息',
        tags: ['免费', '政府网站'],
      },
      {
        title: '中国版权保护中心',
        url: 'https://www.ccopyright.com.cn/',
        description: '著作信息查询',
        tags: ['免费', '政府网站'],
      },
    ],
    会计信息: [
      {
        title: '企业会计准则',
        url: 'https://kjs.mof.gov.cn/zt/kjzzss/kuaijizhunzeshishi/index.htm',
        description: '中华人民共和国财政部发布的官方会计准则',
        tags: ['免费', '政府网站'],
      },
      {
        title: '中国会计视野',
        url: 'https://www.esnai.com/',
        description: '会计信息交流网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '会计家园',
        url: 'https://www.mykuaiji.com/',
        description: '会计信息交流网站',
        tags: ['免费', '有广告'],
      },
    ],
    审计信息: [
      {
        title: '青藤数据',
        url: 'https://www.qingtengdata.com/audit/keyaudit',
        description: '企业审计数据、实务案例与法律法规',
        tags: ['免费', '无广告'],
      },
    ],
    其他信息: [
      {
        title: 'IT橘子-死亡公司公墓',
        url: 'https://www.itjuzi.com/deathCompany',
        description:
          '倒闭公司数据库，包含公司成立时间、赛道、倒闭原因、获投情况等',
        tags: ['免费', '无广告'],
      },
      {
        title: 'startzone',
        url: 'https://startzone.club/',
        description: '初创公司及盈利情况的数据统计网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '国家标准公开系统',
        url: 'https://openstd.samr.gov.cn/bzgk/gb/',
        description: '国家标准信息查询系统',
        tags: ['免费', '政府网站'],
      },
    ],
  },

  宏观数据: {
    经济数据: [
      {
        title: '国家统计局',
        url: 'https://www.stats.gov.cn/',
        description: '宏观数据的权威统计网站',
        tags: ['免费', '政府网站'],
      },
      {
        title: 'CEIC',
        url: 'https://www.ceicdata.com/zh-hans',
        description: '全球经济数据统计网站',
        tags: ['收费', '无广告'],
      },
      {
        title: '前瞻数据库',
        url: 'https://d.qianzhan.com/xdata/list/xfx5yyyex0xTyynHxey0.html',
        description: '宏观经济数据、行业数据与公司数据',
        tags: ['收费', '无广告'],
      },
      {
        title: 'RESSET数据库',
        url: 'https://db.resset.com/common/main.jsp',
        description: '宏观经济数据、行业数据与公司数据',
        tags: ['收费', '无广告'],
      },
      {
        title: 'CSMAR数据库',
        url: 'https://data.csmar.com/',
        description: '宏观经济数据、行业数据与公司数据',
        tags: ['收费', '无广告'],
      },
      {
        title: 'statista',
        url: 'https://www.statista.com/',
        description: '全球行业数据及分析报告',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '济南公共数据开放网',
        url: 'http://data.jinan.gov.cn/jinan/api/',
        description: '济南各类数据统计网站',
        tags: ['免费', '政府网站'],
      },
    ],
    APP数据: [
      {
        title: '七麦数据',
        url: 'https://www.qimai.cn/',
        description: 'IOS应用数据统计网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'Product Hunt',
        url: 'https://www.producthunt.com/',
        description: '各领域好用的软件',
        tags: ['免费', '无广告'],
      },
    ],
    房地产数据: [
      {
        title: '房天下',
        url: 'https://fdc.fang.com/data/',
        description: '中国房地产数据统计网站',
        tags: ['部分免费', '无广告'],
      },
    ],
    电影数据: [
      {
        title: '艺恩娱数',
        url: 'https://ys.endata.cn/DataMarket/Index',
        description: '中国电影数据统计网站',
        tags: ['部分免费', '无广告'],
      },
    ],
    其他数据: [
      {
        title: '199it大数据导航',
        url: 'https://hao.199it.com/',
        description: '各类数据的导航网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '高德数据',
        url: 'https://report.amap.com/diagnosis/index.do',
        description: '中国主要城市交通健康榜',
        tags: ['免费', '无广告'],
      },
    ],
    研究报告: [
      {
        title: '镝数聚',
        url: 'https://www.dydata.io/',
        description: '行业数据分析报告',
        tags: ['收费', '无广告'],
      },
      {
        title: '消费站',
        url: 'https://www.cbndata.com/report',
        description: '中国消费趋势分析报告',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'Quest Mobile',
        url: 'https://www.questmobile.com.cn/research-book/annualreport',
        description: '互联网数据分析报告',
        tags: ['收费', '无广告'],
      },
      {
        title: '艾媒网',
        url: 'https://www.iimedia.cn/#shuju',
        description: '行业数据分析报告',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '中研网',
        url: 'https://www.chinairn.com/yjbg/',
        description: '行业数据分析报告',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '创业邦',
        url: 'https://www.cyzone.cn/report/',
        description: '行业数据分析报告',
        tags: ['收费', '无广告'],
      },
      {
        title: '中国报告大厅',
        url: 'https://www.chinabgao.com/',
        description: '行业数据分析报告',
        tags: ['收费', '无广告'],
      },
      {
        title: '亿欧智库',
        url: 'https://www.iyiou.com/research',
        description: '行业数据分析报告',
        tags: ['收费', '无广告'],
      },
      {
        title: '中国信通院',
        url: 'https://www.caict.ac.cn/kxyj/',
        description: '新质生产力分析报告',
        tags: ['免费', '无广告', '政府网站'],
      },
      {
        title: '报告查一查',
        url: 'https://report.seedsufe.com/#/report',
        description: '行业分析报告',
        tags: ['部分免费', '无广告'],
      },
    ],
    咨询报告: [
      {
        title: '麦肯锡咨询',
        url: 'https://www.mckinsey.com.cn/',
        description: '中国各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: '贝恩咨询',
        url: 'https://www.bain.cn/',
        description: '全球各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: '普华永道咨询',
        url: 'https://www.pwccn.com/zh',
        description: '中国各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: '德勤咨询',
        url: 'https://www2.deloitte.com/cn/zh.html#',
        description: '中国各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: 'IBM咨询',
        url: 'https://www.ibm.com/cn-zh/consulting?lnk=L0G',
        description: '行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: 'BCG咨询',
        url: 'https://www.bcg.com/greater-china',
        description: '中国各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: 'LEK咨询',
        url: 'https://www.lek.com/zh-hant/lek-china',
        description: '全球各行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: '思略特咨询',
        url: 'https://www.strategyand.pwc.com/cn/zh.html',
        description: '行业分析报告',
        tags: ['免费', '无广告'],
      },
      {
        title: '安永咨询',
        url: 'https://www.ey.com/zh_cn',
        description: '全球各行业分析报告',
        tags: ['免费', '无广告'],
      },
    ],
  },

  艺术设计: {
    字体网站: [
      {
        title: '自由字体',
        url: 'https://ziyouziti.com/',
        description: '免费可商用字体大全',
        tags: ['免费', '无广告'],
      },
      {
        title: 'qiuziti',
        url: 'https://www.qiuziti.com/member.html',
        description: '字体识别与下载网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '方正字体',
        url: 'https://www.foundertype.com/index.php/Index/plusExtend/utm_source/qiuziti_newfontinfo/mid/194',
        description: '方正旗下字体下载平台',
        tags: ['免费', '无广告'],
      },
      {
        title: '字体天下',
        url: 'https://www.fonts.net.cn/commercial-free/fonts-zh-1.html',
        description: '海量字体免费高速下载',
        tags: ['免费', '无广告'],
      },
      {
        title: '字由',
        url: 'https://www.hellofont.cn/member',
        description: '字体下载网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'grid-type',
        url: 'https://www.grid-type.com/',
        description: '使用格子来打造自己的字体！',
        tags: ['免费', '无广告'],
      },
    ],
    色彩搭配: [
      {
        title: '中国色',
        url: 'https://www.zhongguose.com/#xiangyehong',
        description: '中国传统颜色大全',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Colorhunt',
        url: 'https://colorhunt.co/palettes',
        description: '设计师和艺术家的调色盘',
        tags: ['免费', '无广告'],
      },
      {
        title: 'LOLcolors',
        url: 'https://www.webdesignrankings.com/resources/lolcolors/',
        description: '精选调色盘灵感',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Paletton',
        url: 'https://paletton.com/#uid=1270u0k2ljc6hnI3vhb50fr6wdx',
        description: '每个人都可以使用的调色轮',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Adobe Color',
        url: 'https://color.adobe.com/zh/create/color-wheel',
        description: 'Adobe出品的调色盘工具',
        tags: ['免费', '无广告'],
      },
    ],
    图片素材: [
      {
        title: 'hippopx',
        url: 'https://www.hippopx.com/zh',
        description: '免版权图库',
        tags: ['免费', '有广告'],
      },
      {
        title: '摄图网',
        url: 'https://699pic.com/',
        description: '图片素材下载网站',
        tags: ['部分免费', '有广告'],
      },
      {
        title: 'pexels',
        url: 'https://www.pexels.com/zh-cn/',
        description: '免费图片素材网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'pixabay',
        url: 'https://pixabay.com/zh/',
        description: '免费图片素材网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'unsplash',
        url: 'https://unsplash.com/',
        description: '图片下载网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'visualhunt',
        url: 'https://visualhunt.com/',
        description: '产品图片网站',
        tags: ['免费', '有广告'],
      },
      {
        title: '500px摄影师社区',
        url: 'https://500px.com.cn/',
        description: '摄影师交流网站（多数图片受版权保护）',
        tags: ['免费', '无广告'],
      },
      {
        title: 'foodiesfeed',
        url: 'https://www.foodiesfeed.com/',
        description: '食物图片网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'lifeofpix',
        url: 'https://www.lifeofpix.com/',
        description: '风景大图下载网站',
        tags: ['部分免费', '无广告'],
      },
      {
        title: '天空之城',
        url: 'https://www.skypixel.com/',
        description: '城市风光的图片与视频网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '高图网',
        url: 'https://gaoimg.com/',
        description: '可商用的图片、样机与素材网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '标小智',
        url: 'https://www.logosc.cn/so/',
        description: '一键搜索多家免版权图库',
        tags: ['免费', '无广告'],
      },
      {
        title: 'stocksnap',
        url: 'https://stocksnap.com/',
        description: '聚合多个图片下载网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'pngimg',
        url: 'https://pngimg.com/',
        description: '免扣图片素材网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'shots.so',
        url: 'https://shots.so/',
        description: '样机素材网站',
        tags: ['部分免费', '无广告'],
      },
    ],
    图标素材: [
      {
        title: '阿里巴巴矢量库',
        url: 'https://www.iconfont.cn/',
        description: '免费的图标素材网站',
        tags: ['免费', '有广告'],
      },
      {
        title: 'iconfinder',
        url: 'https://www.iconfinder.com/',
        description: '多种图标下载网站',
        tags: ['收费', '无广告'],
      },
      {
        title: 'iconhub',
        url: 'https://iconhub.io/',
        description: '简单图标素材网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Font Awesome',
        url: 'https://fontawesome.dashgame.com/',
        description: '网页矢量图标网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'appicons',
        url: 'https://appicons.co/?ref=pushkeen',
        description: '获取AppStore中的应用图标',
        tags: ['免费', '无广告'],
      },
    ],
    艺术欣赏: [
      {
        title: '千年调',
        url: 'https://news.cgtn.com/event/2023/The-Song-Painted-Nature/index.html',
        description: '宋代山水画鉴赏网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '麦田艺术',
        url: 'https://www.nbfox.com/',
        description: '10w+世界名画鉴赏与下载网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '中华古籍资源库',
        url: 'http://read.nlc.cn/thematDataSearch/toGujiIndex',
        description: '中国国家数字图书馆旗下的海量古籍资料',
        tags: ['免费', '政府网站'],
      },
      {
        title: '中华珍宝馆',
        url: 'https://www.ltfc.net/home',
        description: '中华书法和绘画的欣赏和下载网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'gallerix',
        url: 'https://en.gallerix.ru/',
        description: '世界名画鉴赏与下载网站',
        tags: ['免费', '无广告'],
      },
    ],
    其他: [
      {
        title: 'CreativeMass',
        url: 'https://creativemass.cn/',
        description: '创意网站导航',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Branding Style Guides',
        url: 'https://brandingstyleguides.com/',
        description: '各大品牌的官方视觉手册',
        tags: ['免费', '无广告'],
      },
      {
        title: '米画师',
        url: 'https://www.mihuashi.com/',
        description: '画师约稿平台',
        tags: ['免费', '无广告'],
      },
      {
        title: '考拉新媒体导航',
        url: 'https://www.kaolamedia.com/',
        description: '媒体人常用工具聚合网站',
        tags: ['免费', '有广告'],
      },
    ],
  },

  医疗健康: {
    医疗健康: [
      {
        title: '中国医药信息查询平台',
        url: 'https://www.dayi.org.cn/',
        description: '中国疾病、医院、医生和药品查询平台',
        tags: ['免费', '政府网站'],
      },
      {
        title: '默沙东诊疗手册',
        url: 'https://www.msdmanuals.cn/?ruleredirectid=14#mission',
        description: '提供涵盖了医学所有领域的诊疗手册',
        tags: ['免费', '无广告'],
      },
      {
        title: 'fatsecret',
        url: 'https://www.fatsecret.cn/%E7%83%AD%E9%87%8F%E8%90%A5%E5%85%BB/',
        description: '食物的热量和营养信息',
        tags: ['免费', '无广告'],
      },
    ],
    运动健身: [
      {
        title: 'musclewiki',
        url: 'https://musclewiki.com//',
        description: '教你健身的网站',
        tags: ['免费', '有广告'],
      },
    ],
  },

  终身学习: {
    课程学习: [
      {
        title: 'coursera',
        url: 'https://www.coursera.org/',
        description: '免费学习来自世界顶级高校和公司的课程',
        tags: ['免费', '无广告'],
      },
      {
        title: '中国大学MOOC',
        url: 'https://www.icourse163.org/',
        description: '网易与高教社携手推出的在线教育平台',
        tags: ['部分免费', '有广告'],
      },
    ],
    维修与手工学习: [
      {
        title: 'wikihow',
        url: 'https://zh.wikihow.com/%E9%A6%96%E9%A1%B5',
        description: '互联网上最值得信赖的指南网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'ifixit',
        url: 'https://zh.ifixit.com/about-us-zh',
        description: '教你维修任何东西的网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'startmycar',
        url: 'https://www.startmycar.com/',
        description: '专治汽车各种疑难杂症的网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'instructables',
        url: 'https://www.instructables.com/projects',
        description: '全球最大的DIY教程网站',
        tags: ['免费', '无广告'],
      },
      {
        title: "Fold 'N Fly",
        url: 'https://www.foldnfly.com/#/1-1-1-1-1-1-1-1-2-1',
        description: '手把手教你折所有纸飞机的网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'manualslib',
        url: 'https://www.manualslib.com/',
        description: '收录海量产品使用手册的网站',
        tags: ['免费', '无广告'],
      },
    ],
    语言学习: [
      {
        title: 'Language Player',
        url: 'https://languageplayer.io/login',
        description: '学习世界的上百种语言',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'lingohut',
        url: 'https://www.lingohut.com/zh',
        description: '免费学习几十种语言',
        tags: ['免费', '无广告'],
      },
    ],
    音乐学习: [
      {
        title: 'learningmusic',
        url: 'https://learningmusic.ableton.com/zh-Hans/index.html',
        description: '乐理学习',
        tags: ['免费', '无广告'],
      },
      {
        title: 'flowkey',
        url: 'https://app.flowkey.com/home',
        description: '钢琴学习',
        tags: ['收费', '无广告'],
      },
    ],
    棋类学习: [
      {
        title: 'chess',
        url: 'https://www.chess.com/zh',
        description: '国际象棋在线学习与对弈网站',
        tags: ['免费', '无广告'],
      },
    ],
    历史学习: [
      {
        title: '全历史',
        url: 'https://www.allhistory.com/',
        description: '历史课程学习',
        tags: ['免费', '有广告'],
      },
    ],
    书法学习: [
      {
        title: 'Z2H字帖',
        url: 'https://paper.z2h.cn/',
        description: '高自由度的汉字、英文即数字字帖生成网站',
        tags: ['免费', '无广告'],
      },
    ],
    其他: [
      {
        title: 'edclub',
        url: 'https://www.edclub.com/',
        description: '电脑打字语练习网站',
        tags: ['部分免费', '无广告'],
      },
    ],
  },

  购物: {
    购物指南: [
      {
        title: '买购网',
        url: 'https://www.maigoo.com/brand/',
        description: '全行业品牌排行榜',
        tags: ['免费', '有广告'],
      },
      {
        title: '听懂一切',
        url: 'https://tingdong.cn/',
        description: '音响、耳机、乐器等设备的专业声音测评网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '耳机测评站',
        url: 'https://www.woodenears.com/',
        description: '各类耳机的详细参数测评网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'skyscanner',
        url: 'https://www.tianxun.com/',
        description: '全球机票酒店价格查询平台',
        tags: ['免费', '无广告'],
      },
    ],
    购物网站: [
      {
        title: '孔夫子旧书网',
        url: 'https://www.maigoo.com/brand/',
        description: '大型的二手旧货、古旧图书和商品交易平台',
        tags: ['免费', '无广告'],
      },
    ],
  },

  游戏: {
    游戏网站: [
      {
        title: 'emu666',
        url: 'https://www.emu666.com/',
        description: '在线玩上百款经典游戏',
        tags: ['免费', '无广告'],
      },
      {
        title: 'poki',
        url: 'https://poki.com/zh#utm_source=redirect-en-zh',
        description: '在线玩上百款经典游戏',
        tags: ['免费', '无广告'],
      },
      {
        title: 'play-cs',
        url: 'https://play-cs.com/',
        description: '在线和各国网友对战CS',
        tags: ['部分免费', '无广告'],
      },
      {
        title: 'ra2web',
        url: 'https://ra2web.com/',
        description: '在线和各国网友玩红警',
        tags: ['免费', '无广告'],
      },
    ],
  },

  其他: {
    世界公民: [
      {
        title: '全球广播',
        url: 'https://radio.garden/visit/taoyuan-city/bC9K66xZ',
        description: '可以收听全球广播的网站',
        tags: ['免费', '无广告'],
      },
      {
        title: '高速公路云实时监控',
        url: 'http://m.luodianyun.com/#%E5%B0%8F%E7%A8%8B%E5%BA%8F://e%E5%AE%B6%E5%B8%AE/WTxeLdPHrOag3ed',
        description: '可以看到全国多个省份的高速公路实时监控的网站',
        tags: ['免费', '无广告'],
      },
      {
        title: 'skylinewebcams',
        url: 'https://www.skylinewebcams.com/',
        description: '免费观看全球公开摄像头',
        tags: ['免费', '无广告'],
      },
      {
        title: '巡礼地图',
        url: 'https://anitabi.cn/map',
        description: '帮你找到全球动漫取景地',
        tags: ['免费', '无广告'],
      },
      {
        title: 'explore.org',
        url: 'https://explore.org/livecams',
        description: '免费观看全球各种动物实时直播',
        tags: ['免费', '无广告'],
      },
    ],
    其他: [
      {
        title: '时光邮局',
        url: 'https://www.hi2future.com/',
        description: '给未来的自己写一封信吧',
        tags: ['免费', '无广告'],
      },
      {
        title: 'Mobile Phone Museum',
        url: 'https://www.mobilephonemuseum.com/catalogue',
        description: '收集了有史以来所有手机的博物馆！',
        tags: ['免费', '无广告'],
      },
    ],
  },
}

function feePriority(tags: TagType[]) {
  if (tags.includes('免费')) return 1
  if (tags.includes('部分免费')) return 2
  if (tags.includes('收费')) return 3
  return 4
}

function adPriority(tags: TagType[]) {
  if (tags.includes('无广告')) return 1
  if (tags.includes('有广告')) return 2
  return 3
}

function CategorySection({
  title,
  items,
}: {
  title: string
  items: WebsiteItem[]
}) {
  // 排序
  const sortedItems = [...items].sort((a, b) => {
    // 1. 政府网站优先
    const aGov = a.tags.includes('政府网站')
    const bGov = b.tags.includes('政府网站')
    if (aGov && !bGov) return -1
    if (!aGov && bGov) return 1

    // 2. 费用优先级
    const feeDiff = feePriority(a.tags) - feePriority(b.tags)
    if (feeDiff !== 0) return feeDiff

    // 3. 广告优先级
    return adPriority(a.tags) - adPriority(b.tags)
  })

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <ul className="divide-y divide-muted-foreground/10">
        {sortedItems.map((item) => (
          <li key={item.title} className="py-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold hover:text-primary"
                  >
                    {item.title}
                    <ExternalLink className="ml-1 inline-block h-4 w-4" />
                  </a>
                  <div className="flex gap-2">
                    {item.tags?.map((tag: TagType) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TreasureBoxPage() {
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>('实用工具')
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>('音视频处理')

  const mainCategories = Object.keys(categories) as MainCategory[]
  const subCategories = Object.keys(categories[selectedMainCategory])

  // 添加调试信息
  const currentItems =
    categories[selectedMainCategory][
      selectedSubCategory as keyof (typeof categories)[typeof selectedMainCategory]
    ]

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          百川驿
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          万维网罗，百宝归藏。
        </p>

        {/* 主分类按钮 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedMainCategory(category)
                setSelectedSubCategory(Object.keys(categories[category])[0])
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedMainCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 子分类按钮 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {subCategories.map((subCategory) => (
            <button
              key={subCategory}
              onClick={() => setSelectedSubCategory(subCategory)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedSubCategory === subCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {subCategory}
            </button>
          ))}
        </div>

        {/* 显示选中的分类内容 */}
        <CategorySection title={selectedSubCategory} items={currentItems} />
      </div>
    </Container>
  )
}
