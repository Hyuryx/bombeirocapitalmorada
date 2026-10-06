const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function extractView(id) {
  const startStr = 'id="' + id + '"';
  let startIdx = html.indexOf(startStr);
  if (startIdx === -1) return '';
  startIdx = html.lastIndexOf('<', startIdx);
  
  let endIdx = html.indexOf('<div id="view-', startIdx + 10);
  if (endIdx === -1) endIdx = html.indexOf('<!-- Rodapé Centralizado -->', startIdx);
  if (endIdx === -1) endIdx = html.indexOf('</body>', startIdx);
  if (endIdx === -1) return '';
  
  let content = html.substring(startIdx, endIdx);
  // Remove possible closing tags of parent if we stopped at next view
  if (content.endsWith('</div>\r\n') || content.endsWith('</div>\n')) {
     // keep it
  } else if (!content.endsWith('</div>')) {
     content += '</div>';
  }
  return content.replace('style="display: none;"', '').replace('style="display:none;"', '');
}

const views = [
  'view-inicio', 'view-cursos', 'view-avisos', 'view-planilhas', 
  'view-regras', 'view-uniformes', 'view-modulacao', 'view-viaturas', 
  'view-hierarquia', 'view-galeria'
];

views.forEach(viewId => {
  const content = extractView(viewId);
  if (!content) return;
  
  const componentName = 'View' + viewId.replace('view-', '').charAt(0).toUpperCase() + viewId.slice(6);
  
  const jsx = `"use client";

export default function ${componentName}() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`;

  fs.writeFileSync('next-app/src/components/views/' + componentName + '.jsx', jsx);
});
console.log('All views extracted!');
