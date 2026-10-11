const fs = require('fs');
const file = 'src/app/style.css';
let content = fs.readFileSync(file, 'utf8');

const classes = ['.red-card', '.green-card', '.yellow-card', '.blue-card', '.orange-card', '.purple-card', '.cyan-card'];

classes.forEach(cls => {
    const regex = new RegExp(cls + '\\s*\\{[^}]*\\}', 'g');
    content = content.replace(regex, cls + ' { }');
});

const defaultRegex = /\.card:not\(\.red-card\)[^\{]*\{[^}]*\}/g;
content = content.replace(defaultRegex, '.card:not(.red-card):not(.green-card):not(.blue-card):not(.yellow-card):not(.orange-card):not(.purple-card):not(.cyan-card) { }');

fs.writeFileSync(file, content);
console.log("Done");
