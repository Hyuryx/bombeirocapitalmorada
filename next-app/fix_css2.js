const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  // First, fix the unclosed comment mistake
  content = content.replace(/\/\* url\('\.\.\/assets\//g, "url('../assets/");
  
  // Then properly comment out the entire property line
  content = content.replace(/background-image:\s*url\('\.\.\/assets\/[^)]+'\);/g, "/* background removed */");
  
  fs.writeFileSync(stylePath, content, 'utf8');
  console.log('Fixed CSS syntax error in style.css');
}
