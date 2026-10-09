const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  
  // Find the last good block
  const anchor = '.card:hover::before, .card-evoluir:hover::before, .info-card:hover::before {\r\n    opacity: 1;\r\n}';
  const anchorUnix = '.card:hover::before, .card-evoluir:hover::before, .info-card:hover::before {\n    opacity: 1;\n}';
  
  let idx = content.indexOf(anchor);
  let length = anchor.length;
  
  if (idx === -1) {
    idx = content.indexOf(anchorUnix);
    length = anchorUnix.length;
  }
  
  if (idx !== -1) {
    content = content.substring(0, idx + length);
    content += '\n\n.no-scrollbar {\n    -ms-overflow-style: none;\n    scrollbar-width: none;\n}\n.no-scrollbar::-webkit-scrollbar {\n    display: none;\n}\n';
    fs.writeFileSync(stylePath, content, 'utf8');
    console.log('Fixed UTF-16 corruption in style.css');
  } else {
    console.log('Could not find anchor');
  }
}
