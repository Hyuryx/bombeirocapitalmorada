const fs = require('fs');
const views = [
  'ViewInicio.jsx', 'ViewCursos.jsx', 'ViewAvisos.jsx', 'ViewPlanilhas.jsx', 
  'ViewRegras.jsx', 'ViewUniformes.jsx', 'ViewModulacao.jsx', 'ViewViaturas.jsx', 
  'ViewHierarquia.jsx', 'ViewGaleria.jsx'
];
views.forEach(v => {
  const p = 'next-app/src/components/views/' + v;
  if (!fs.existsSync(p)) return;
  let code = fs.readFileSync(p, 'utf8');
  code = code.replace(/class="global-view[^"]*"/g, 'class="global-view active" style="display:flex; height:100%; width:100%;"');
  code = code.replace(/style="display:\s*none;/g, 'style="');
  code = code.replace(/style="display:none;"/g, '');
  fs.writeFileSync(p, code);
});
console.log('Fixed CSS hide!');
