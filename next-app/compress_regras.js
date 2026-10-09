const fs = require('fs');
const path = require('path');

const regrasPath = path.join(__dirname, 'src', 'components', 'abas', 'regras', 'index.html');
if (fs.existsSync(regrasPath)) {
  let content = fs.readFileSync(regrasPath, 'utf8');
  
  // Set overflow to hidden
  content = content.replace(/overflow-y:\s*auto;?/g, 'overflow-y: hidden;');
  
  // Add inline styles to compress the content
  if (!content.includes('<style id="regras-compress">')) {
    const styleInject = `
    <style id="regras-compress">
      #view-regras .main-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      #view-regras .section-header {
        margin-bottom: 5px;
      }
      #view-regras .section-header h1 {
        font-size: 1.8rem;
        margin-bottom: 0;
      }
      #view-regras .cards-grid {
        gap: 10px;
      }
      #view-regras .card {
        padding: 10px !important;
      }
      #view-regras ul {
        gap: 4px !important;
      }
      #view-regras li span {
        font-size: 0.85rem;
      }
      #view-regras h3 {
        font-size: 1.1rem;
        margin-bottom: 5px;
      }
      #view-regras .site-footer {
        margin-top: auto;
        padding: 10px 0;
      }
    </style>
    `;
    content = content.replace('<div id="view-regras" class="global-view" style="display: none;">', '<div id="view-regras" class="global-view" style="display: none;">\n' + styleInject);
  }
  
  fs.writeFileSync(regrasPath, content, 'utf8');
  console.log('Compressed regras content to fit without scroll');
}
