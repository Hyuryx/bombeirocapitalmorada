const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  let lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('.section-header')) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  });
}
