const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  content = content.replace(/border-top:\s*1px\s*solid\s*var\(--border-color\);/g, 'border-top: none;');
  fs.writeFileSync(stylePath, content, 'utf8');
  console.log('Removed top border from site-footer');
}
