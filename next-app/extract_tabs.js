const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // It's in node_modules!

const indexPath = path.join(__dirname, '../index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

// Create folders for tabs
const tabsDir = path.join(__dirname, 'src/components/abas');
if (!fs.existsSync(tabsDir)) fs.mkdirSync(tabsDir, { recursive: true });

function saveTab(id, name) {
    const el = $('#' + id);
    if (el.length > 0) {
        const folder = path.join(tabsDir, name);
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.writeFileSync(path.join(folder, 'index.html'), el.prop('outerHTML'));
        el.remove();
        return true;
    }
    return false;
}

saveTab('login-screen', 'login');
saveTab('view-inicio', 'inicio');
saveTab('view-cursos', 'cursos');
saveTab('view-uniformes', 'uniformes');
saveTab('view-avisos', 'avisos');
saveTab('view-planilhas', 'planilhas');
saveTab('view-modulacao', 'modulacao');
saveTab('view-viaturas', 'viaturas');
saveTab('view-regras', 'regras');
saveTab('view-hierarquia', 'hierarquia');
saveTab('view-galeria', 'galeria');

// Save the navbar
const nav = $('.global-navbar');
if (nav.length > 0) {
    const folder = path.join(tabsDir, 'navbar');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    fs.writeFileSync(path.join(folder, 'index.html'), nav.prop('outerHTML'));
    nav.remove();
}

// We also need the rest of the body (like modals) to be saved somewhere, perhaps 'modais'
const bodyChildren = $('body').children().not('script');
let modaisHtml = '';
bodyChildren.each((i, el) => {
    modaisHtml += $(el).prop('outerHTML') + '\n';
});
if (modaisHtml.trim() !== '') {
    const folder = path.join(tabsDir, 'modais');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    fs.writeFileSync(path.join(folder, 'index.html'), modaisHtml);
}

console.log("Extração concluída!");
