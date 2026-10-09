const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  // Fix the orphaned !important
  content = content.replace(/\/\* background removed \*\/\s*!important;/g, "/* background removed */");
  fs.writeFileSync(stylePath, content, 'utf8');
  console.log('Fixed orphan !important in style.css');
}
