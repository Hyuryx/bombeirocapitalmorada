const fs = require('fs');
const path = require('path');

const uniformesPath = path.join(__dirname, 'src', 'components', 'abas', 'uniformes', 'index.html');
if (fs.existsSync(uniformesPath)) {
  let content = fs.readFileSync(uniformesPath, 'utf8');
  
  // Revert overflow to auto
  content = content.replace(/overflow-y:\s*hidden;?/g, 'overflow-y: auto;');
  
  // Remove the injected style block
  content = content.replace(/<style id="uniformes-compress">[\s\S]*?<\/style>\s*/, '');
  
  fs.writeFileSync(uniformesPath, content, 'utf8');
  console.log('Reverted uniformes tab compression');
}
