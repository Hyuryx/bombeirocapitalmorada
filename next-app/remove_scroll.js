const fs = require('fs');
const path = require('path');

const abasDir = path.join(__dirname, 'src', 'components', 'abas');
const directories = fs.readdirSync(abasDir).filter(f => fs.statSync(path.join(abasDir, f)).isDirectory());

directories.forEach(dir => {
  const indexPath = path.join(abasDir, dir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    // Substitui height: 100%; overflow-y: auto; por hidden ou apenas remove
    content = content.replace(/overflow-y:\s*auto;?/g, 'overflow-y: hidden;');
    fs.writeFileSync(indexPath, content, 'utf8');
  }
});

// Update Uniformes and Viaturas heights
const uniformesPath = path.join(__dirname, 'src', 'components', 'ReactUniformesCarousel.jsx');
if (fs.existsSync(uniformesPath)) {
  let content = fs.readFileSync(uniformesPath, 'utf8');
  content = content.replace(/height:\s*'800px'/g, "height: '450px'");
  fs.writeFileSync(uniformesPath, content, 'utf8');
}

const viaturasPath = path.join(__dirname, 'src', 'components', 'ReactViaturasCarousel.jsx');
if (fs.existsSync(viaturasPath)) {
  let content = fs.readFileSync(viaturasPath, 'utf8');
  content = content.replace(/height:\s*'800px'/g, "height: '450px'");
  fs.writeFileSync(viaturasPath, content, 'utf8');
}

const cursosPath = path.join(__dirname, 'src', 'components', 'CourseFlipbook.jsx');
if (fs.existsSync(cursosPath)) {
  let content = fs.readFileSync(cursosPath, 'utf8');
  content = content.replace(/overflowY:\s*'auto'/g, "overflowY: 'hidden'");
  fs.writeFileSync(cursosPath, content, 'utf8');
}

console.log('Update complete.');
