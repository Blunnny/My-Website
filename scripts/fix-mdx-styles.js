const fs = require('fs')
const path = require('path')

const contentDir = path.join(__dirname, '../src/content/blog')

// 读取所有 MDX 文件
const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'))

files.forEach((file) => {
  const filePath = path.join(contentDir, file)
  let content = fs.readFileSync(filePath, 'utf8')

  // 替换对象形式的样式属性为字符串形式
  content = content.replace(/style=\{\{([^}]+)\}\}/g, (match, styleContent) => {
    // 将对象形式的样式转换为字符串形式
    const styleString = styleContent
      .split(',')
      .map((style) => {
        const [key, value] = style.split(':').map((s) => s.trim())
        return `${key}: ${value}`
      })
      .join('; ')
    return `style="${styleString}"`
  })

  // 写回文件
  fs.writeFileSync(filePath, content)
  console.log(`Fixed styles in ${file}`)
})
