const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const DOCS_DIR = path.resolve(__dirname, '..', 'docs');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'pages.json');

marked.setOptions({
  gfm: true,
  breaks: false,
});

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta = {};
  const frontmatter = match[1];
  const body = match[2];

  const lines = frontmatter.split(/\r?\n/);
  let currentKey = '';
  let currentValue = '';

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (keyMatch) {
      if (currentKey) meta[currentKey] = currentValue.trim();
      currentKey = keyMatch[1];
      currentValue = keyMatch[2];
    } else if (currentKey && line.trim()) {
      currentValue += ' ' + line.trim();
    }
  }
  if (currentKey) meta[currentKey] = currentValue.trim();

  for (const key in meta) {
    meta[key] = meta[key].replace(/^['"](.*)['"]$/, '$1');
  }

  return { meta, body };
}

function getMdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // 排除无关的特殊文件夹
    if (entry.name === '.vitepress' || entry.name === 'node_modules' || entry.name === 'superpowers') continue;
    if (entry.isDirectory()) {
      files.push(...getMdFiles(fullPath));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('README')) {
      files.push(fullPath);
    }
  }

  return files;
}

function getTitleFromHtml(html) {
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (h1Match) return h1Match[1].replace(/<[^>]+>/g, '');
  return '';
}

function main() {
  const mdFiles = getMdFiles(DOCS_DIR);
  const pages = [];

  for (const filePath of mdFiles) {
    const relative = path.relative(DOCS_DIR, filePath);
    const ext = path.extname(relative);
    let urlPath = '/' + relative.slice(0, -ext.length).replace(/\\/g, '/');

    if (urlPath.endsWith('/index')) {
      urlPath = urlPath.slice(0, -'/index'.length) + '/';
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(content);

    let html = '';
    try {
      html = marked.parse(body);
    } catch (e) {
      console.error(`Error parsing ${relative}: ${e.message}`);
      html = `<p>Error rendering content</p>`;
    }

    const title = meta.title || getTitleFromHtml(html) || relative;

    pages.push({
      path: urlPath,
      title,
      description: meta.description || '',
      html,
    });
  }

  pages.sort((a, b) => a.path.localeCompare(b.path));

  const output = { pages };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✓ Converted ${pages.length} markdown files to ${OUTPUT_FILE}`);
}

main();
