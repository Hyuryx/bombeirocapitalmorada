const fs = require('fs');
const file = 'src/app/style.css';
let content = fs.readFileSync(file, 'utf8');

const regex1 = /\.green-card, \.yellow-card, \.blue-card, \.orange-card, \.purple-card, \.cyan-card, \.rgb-card, \.card-evoluir, \.card-evoluir\.merito\s*\{[^}]*\}/g;
const regex2 = /\.card-evoluir:hover, \.card-evoluir\.merito:hover\s*\{[^}]*\}/g;

content = content.replace(regex1, '/* OVERRIDE REMOVED */');
content = content.replace(regex2, '/* HOVER OVERRIDE REMOVED */');

fs.writeFileSync(file, content);
console.log("Overrides removed");
