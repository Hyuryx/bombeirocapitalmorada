const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  content = content.replace(/background-image:\s*url\('\.\.\/assets\//g, "/* background removed */ /* url('../assets/");
  fs.writeFileSync(stylePath, content, 'utf8');
  console.log('Fixed background paths in style.css');
}
