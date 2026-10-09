const fs = require('fs');
const lines = fs.readFileSync('C:/Users/ErreJota/.gemini/antigravity-ide/brain/6d869bb0-a7a0-4a9d-98c3-4cf78a51b42e/.system_generated/steps/602/content.md', 'utf8').split('\n');
let j = lines.findIndex(l => l.startsWith('{'));
const json = JSON.parse(lines.slice(j).join('\n'));
let code = json.files[0].content;

fs.mkdirSync('src/components/ui', { recursive: true });
fs.writeFileSync('src/components/ui/container-scroll-animation.tsx', code);
