const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  // Match `/* background removed */ url('...');` and turn it into `/* background removed */`
  content = content.replace(/\/\*\s*background removed\s*\*\/\s*url\([^)]+\);?/g, "/* background removed */");
  fs.writeFileSync(stylePath, content, 'utf8');
  console.log('Fixed CSS syntax error in style.css');
}
