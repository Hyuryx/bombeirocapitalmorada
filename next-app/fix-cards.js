const fs = require('fs');
const path = 'src/components/abas/hierarquia/index.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/class="card info-card/g, 'style="height: max-content; align-self: flex-start;" class="card info-card');
fs.writeFileSync(path, content);
console.log('Fixed cards in hierarquia!');
