// 我的足迹

export type FootprintVisit = {
  // 时间，支持两种格式：
  //   1) 'YYYY-MM'，例如 '2024-08'
  //   2) 'YYYY'，例如 '2024'（只记得到访年份的情况）
  yearMonth: string
  note?: string // 一句话备注
}

export type FootprintItemType = {
  id: string // 唯一标识，例如 'tokyo'
  city: string // 城市中文名，例如 '东京'
  country: string // 国家中文名，例如 '日本'，需要在下方 countryNameToIsoCode 中存在映射
  coordinates: [number, number] // [经度, 纬度]
  visits: FootprintVisit[]
}

// 中文国家名 → ISO 3166-1 numeric code（字符串）
// 用于在地图上自动高亮已到访过的国家。
// 添加新国家时，到 https://en.wikipedia.org/wiki/ISO_3166-1_numeric 查代码即可。
export const countryNameToIsoCode: Record<string, string> = {
  中国: '156',
  日本: '392',
  韩国: '410',
  朝鲜: '408',
  新加坡: '702',
  马来西亚: '458',
  泰国: '764',
  越南: '704',
  印度: '356',
  印度尼西亚: '360',
  菲律宾: '608',
  柬埔寨: '116',
  老挝: '418',
  缅甸: '104',
  蒙古: '496',
  俄罗斯: '643',
  哈萨克斯坦: '398',
  土耳其: '792',
  伊朗: '364',
  阿联酋: '784',
  沙特阿拉伯: '682',
  以色列: '376',
  埃及: '818',
  南非: '710',
  肯尼亚: '404',
  摩洛哥: '504',
  英国: '826',
  法国: '250',
  德国: '276',
  意大利: '380',
  西班牙: '724',
  葡萄牙: '620',
  荷兰: '528',
  比利时: '056',
  瑞士: '756',
  奥地利: '040',
  希腊: '300',
  瑞典: '752',
  挪威: '578',
  丹麦: '208',
  芬兰: '246',
  冰岛: '352',
  爱尔兰: '372',
  波兰: '616',
  捷克: '203',
  匈牙利: '348',
  乌克兰: '804',
  梵蒂冈: '336', // 在 110m 简化地图中通常被并入意大利
  美国: '840',
  加拿大: '124',
  墨西哥: '484',
  巴西: '076',
  阿根廷: '032',
  智利: '152',
  秘鲁: '604',
  古巴: '192',
  澳大利亚: '036',
  新西兰: '554',
  斐济: '242',
}

// 顶部文案
export const footprintHeadLine = '我的足迹'
export const footprintIntro =
  '万水千山。'

// 足迹数据：一个城市一条记录，多次访问写在 visits 中
export const footprints: FootprintItemType[] = [
  {
    id: 'jinan',
    city: '济南',
    country: '中国',
    coordinates: [116.9800, 36.6758],
    visits: [{ yearMonth: '2001-01', note: '出生长大在这里。' }],
  },
  {
    id: 'paris',
    city: '巴黎',
    country: '法国',
    coordinates: [2.3522, 48.8566],
    visits: [{ yearMonth: '2016-07', note: '埃菲尔铁塔, 卢浮宫和世界杯。' }],
  },
  {
    id: 'rome',
    city: '罗马',
    country: '意大利',
    coordinates: [12.4964, 41.9028],
    visits: [{ yearMonth: '2016-07', note: "罗马斗兽场, 特雷维喷泉和超级好吃的方形披萨。" }],
  },
  {
    id: 'munich',
    city: '慕尼黑',
    country: '德国',
    coordinates: [11.582, 48.1351],
    visits: [{ yearMonth: '2016-07', note: '好多好多的教堂。' }],
  },
  {
    id: 'Berlin',
    city: '柏林',
    country: '德国',
    coordinates: [13.23, 52.31],
    visits: [{ yearMonth: '2016-07', note: '好多的教堂和博物馆。' }],
  },
  {
    id: 'zurich',
    city: '苏黎世',
    country: '瑞士',
    coordinates: [8.5417, 47.3769],
    visits: [{ yearMonth: '2016-07', note: '少女峰和超级高的物价。' }],
  },
  {
    id: 'moscow',
    city: '莫斯科',
    country: '俄罗斯',
    coordinates: [37.6156, 55.7558],
    visits: [{ yearMonth: '2019-07', note: '红场与很特别的地铁。' }],
  },
  {
    id: 'St.Petersburg',
    city: '圣彼得堡',
    country: '俄罗斯',
    coordinates: [30.3141, 59.9387],
    visits: [{ yearMonth: '2019-07', note: '特别漂亮的教堂。' }],
  },
  {
    id: 'xiamen',
    city: '厦门',
    country: '中国',
    coordinates: [118.0894, 24.4798],
    visits: [{ yearMonth: '2019-10', note: '大学生活开始了！' }],
  },
  {
    id: 'hongkong',
    city: '香港',
    country: '中国',
    coordinates: [114.1694, 22.3193],
    visits: [{ yearMonth: '2023-8', note: '研究生生活开始了！' }],
  },
  {
    id: 'shenzhen',
    city: '深圳',
    country: '中国',
    coordinates: [114.0579, 22.5431],
    visits: [{ yearMonth: '2024-04', note: '开始实习！' }],
  },

  {
    id: 'macau',
    city: '澳门',
    country: '中国',
    coordinates: [113.5439, 22.1987],
    visits: [{ yearMonth: '2024-12', note: '大三巴牌坊、威尼斯人和蛋挞。' }],
  },
  {
    id: 'singapore',
    city: '新加坡',
    country: '新加坡',
    coordinates: [103.8198, 1.3521],
    visits: [{ yearMonth: '2024-07', note: '金沙酒店、圣淘沙和NTU。' }],
  },
  {
    id: 'tokyo',
    city: '东京',
    country: '日本',
    coordinates: [139.6917, 35.6895],
    visits: [{ yearMonth: '2025-02', note: '浅草寺、秋叶原和银座。' }],
  },
  {
    id: 'osaka',
    city: '大阪',
    country: '日本',
    coordinates: [135.5022, 34.6937],
    visits: [{ yearMonth: '2025-02', note: '大阪城、心斋桥和道顿堀。' }],
  },
  {
    id: 'nara',
    city: '奈良',
    country: '日本',
    coordinates: [135.8384, 34.6852],
    visits: [{ yearMonth: '2025-02', note: '没素质的小鹿。' }],
  },
  {
    id: 'kyoto',
    city: '京都',
    country: '日本',
    coordinates: [135.7681, 35.0116],
    visits: [{ yearMonth: '2025-02', note: '很好吃的抹茶。' }],
  },
  {
    id: 'dali',
    city: '大理',
    country: '中国',
    coordinates: [100.2330, 25.0430],
    visits: [{ yearMonth: '2025-06', note: '计划退休后定居于此。' }],
  },
  {
    id: 'bangkok',
    city: '曼谷',
    country: '泰国',
    coordinates: [100.5018, 13.7563],
    visits: [{ yearMonth: '2026-05', note: '还想再去！' }],
  },
  {
    id: 'pattaya',
    city: '芭提雅',
    country: '泰国',
    coordinates: [100.88, 12.9319],
    visits: [{ yearMonth: '2026-05', note: '很漂亮的海滩，很好喝的711。' }],
  },
]
