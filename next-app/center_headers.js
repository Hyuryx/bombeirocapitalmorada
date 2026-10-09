const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'src', 'app', 'style.css');
if (fs.existsSync(stylePath)) {
  let content = fs.readFileSync(stylePath, 'utf8');
  
  const searchPattern = /\.section-header\s*{\s*margin-bottom:\s*40px;\s*}\s*\.section-header\s*h1\s*{\s*font-size:\s*clamp\(2rem,\s*4vw,\s*3\.5rem\);\s*font-weight:\s*800;\s*margin-bottom:\s*15px;\s*letter-spacing:\s*-1px;\s*background:\s*linear-gradient\(to\s*right,\s*#fff,\s*#9ca3af\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*}/;
  
  const replacement = `.section-header {
    margin-bottom: 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section-header h1 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 15px;
    letter-spacing: -1px;
    background: linear-gradient(to right, #fff, #9ca3af);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}`;
  
  if (searchPattern.test(content)) {
    content = content.replace(searchPattern, replacement);
    fs.writeFileSync(stylePath, content, 'utf8');
    console.log('Successfully updated section-header');
  } else {
    console.log('Could not find section-header pattern');
  }
}
