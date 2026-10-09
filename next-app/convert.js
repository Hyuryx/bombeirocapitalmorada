const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/components/abas'));
files.forEach(file => {
  if (file.endsWith('.html')) {
    const content = fs.readFileSync(file, 'utf8');
    // Escape backticks and ${} for JS template literals
    const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    const jsContent = `export default \`${escapedContent}\`;\n`;
    const newPath = file.replace(/\.html$/, '.js');
    fs.writeFileSync(newPath, jsContent);
    console.log(`Converted ${file} to ${newPath}`);
  }
});
