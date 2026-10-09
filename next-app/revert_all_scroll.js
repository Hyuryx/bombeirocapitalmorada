const fs = require('fs');
const path = require('path');

const abasDir = path.join(__dirname, 'src', 'components', 'abas');
const directories = fs.readdirSync(abasDir).filter(f => fs.statSync(path.join(abasDir, f)).isDirectory());

directories.forEach(dir => {
  const indexPath = path.join(abasDir, dir, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    // Remove qualquer hidden para voltar ao padrão de auto
    content = content.replace(/overflow-y:\s*hidden;?/g, 'overflow-y: auto;');
    fs.writeFileSync(indexPath, content, 'utf8');
  }
});

// Revert Uniformes and Viaturas heights to 800px if they are 450px
const uniformesPath = path.join(__dirname, 'src', 'components', 'ReactUniformesCarousel.jsx');
if (fs.existsSync(uniformesPath)) {
  let content = fs.readFileSync(uniformesPath, 'utf8');
  content = content.replace(/height:\s*'450px'/g, "height: '800px'");
  fs.writeFileSync(uniformesPath, content, 'utf8');
}

const viaturasPath = path.join(__dirname, 'src', 'components', 'ReactViaturasCarousel.jsx');
if (fs.existsSync(viaturasPath)) {
  let content = fs.readFileSync(viaturasPath, 'utf8');
  content = content.replace(/height:\s*'450px'/g, "height: '800px'");
  fs.writeFileSync(viaturasPath, content, 'utf8');
}

// Revert CourseFlipbook
const cursosPath = path.join(__dirname, 'src', 'components', 'CourseFlipbook.jsx');
if (fs.existsSync(cursosPath)) {
  let content = fs.readFileSync(cursosPath, 'utf8');
  content = content.replace(/overflowY:\s*'hidden'/g, "overflowY: 'auto'");
  fs.writeFileSync(cursosPath, content, 'utf8');
}

console.log('Revert completely done.');
