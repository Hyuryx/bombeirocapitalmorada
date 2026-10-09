const fs = require('fs');
const path = require('path');

const uniformesPath = path.join(__dirname, 'src', 'components', 'abas', 'uniformes', 'index.html');
if (fs.existsSync(uniformesPath)) {
  let content = fs.readFileSync(uniformesPath, 'utf8');
  
  // Set overflow to hidden
  content = content.replace(/overflow-y:\s*auto;?/g, 'overflow-y: hidden;');
  
  // Add inline styles to compress the content
  if (!content.includes('<style id="uniformes-compress">')) {
    const styleInject = `
    <style id="uniformes-compress">
      #view-uniformes .main-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      #view-uniformes .section-header {
        margin-bottom: 5px;
      }
      #view-uniformes .section-header h1 {
        font-size: 1.8rem;
        margin-bottom: 0;
      }
      #view-uniformes .cards-grid {
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      #view-uniformes .card {
        padding: 10px !important;
      }
      #view-uniformes img {
        max-height: 140px;
        object-fit: contain;
      }
      #view-uniformes h3 {
        font-size: 1.0rem;
        margin-bottom: 5px;
        text-align: center;
      }
      #view-uniformes .site-footer {
        margin-top: auto;
        padding: 10px 0;
      }
    </style>
    `;
    content = content.replace('<div id="view-uniformes" class="global-view" style="display: none;">', '<div id="view-uniformes" class="global-view" style="display: none;">\n' + styleInject);
  }
  
  fs.writeFileSync(uniformesPath, content, 'utf8');
  console.log('Compressed uniformes content to fit without scroll');
}
