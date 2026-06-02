const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// 项目目录配置
const docsDir = path.join(__dirname, '../docs');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'pages.json');

// 递归获取所有 .md 文件
function getMdFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) {
    return filesList;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // 排除无关的隐藏文件夹，或 node_modules, superpowers
    if (file === 'node_modules' || file === '.git' || file === 'superpowers' || file.startsWith('.')) {
      continue;
    }
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMdFiles(filePath, filesList);
    } else if (filePath.endsWith('.md')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

// 解析 Frontmatter (YAML metadata)
function parseFrontmatter(content) {
  const result = {
    data: {},
    content: content
  };
  // 匹配以 --- 开头并以 --- 结尾的 Frontmatter 块
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n/);
  if (match) {
    const yamlBlock = match[1];
    result.content = content.slice(match[0].length);
    const lines = yamlBlock.split(/\r?\n/);
    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // 去除前后包裹的引号
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // 特殊处理 tags 数组形式，例如 tags: [a, b, c] 或 tags: a, b
        if (key === 'tags') {
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(t => t.trim().replace(/^['"]|['"]$/g, ''));
          } else {
            value = value.split(',').map(t => t.trim());
          }
        }
        
        result.data[key] = value;
      }
    });
  }
  return result;
}

// 执行转换
function run() {
  console.log('开始转换 Markdown 文件...');
  const mdFiles = getMdFiles(docsDir);
  console.log(`共找到 ${mdFiles.length} 个 Markdown 文件。`);
  
  const pages = [];
  
  for (const filePath of mdFiles) {
    const relativePath = path.relative(docsDir, filePath);
    console.log(`正在处理: ${relativePath}`);
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);
    
    // 生成 urlPath (如果是 /index 则转为 /)
    let urlPath = '/' + relativePath.replace(/\\/g, '/').replace(/\.md$/, '');
    if (urlPath === '/index') {
      urlPath = '/';
    }
    
    // 使用 marked 转换 html
    const html = marked.parse(content);
    
    const pageData = {
      urlPath,
      title: data.title || path.basename(filePath, '.md'),
      description: data.description || '',
      html,
      ...data // 保留其他可能需要的 Frontmatter 字段，例如 tags 或 created 等
    };
    
    pages.push(pageData);
  }
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 写入 JSON 文件
  fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2), 'utf-8');
  console.log(`转换完成！数据已保存至: ${outputFile}`);
}

run();
