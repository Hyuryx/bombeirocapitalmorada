const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const indexPath = path.join(__dirname, '../index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

// Strip unwanted tags from the whole document before extracting
$('head').remove();
$('script, link, meta, title').remove();

const tabsDir = path.join(__dirname, 'src/components/abas');
if (!fs.existsSync(tabsDir)) fs.mkdirSync(tabsDir, { recursive: true });

function saveTab(id, name) {
    const el = $('#' + id);
    if (el.length > 0) {
        const folder = path.join(tabsDir, name);
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.writeFileSync(path.join(folder, 'index.html'), el.prop('outerHTML'), 'utf8');
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

const nav = $('.global-navbar');
if (nav.length > 0) {
    const folder = path.join(tabsDir, 'navbar');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    fs.writeFileSync(path.join(folder, 'index.html'), nav.prop('outerHTML'), 'utf8');
    nav.remove();
}

const bodyChildren = $('body').children();
let modaisHtml = '';
bodyChildren.each((i, el) => {
    const out = $(el).prop('outerHTML');
    if (out) modaisHtml += out + '\n';
});
if (modaisHtml.trim() !== '') {
    const folder = path.join(tabsDir, 'modais');
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    fs.writeFileSync(path.join(folder, 'index.html'), modaisHtml, 'utf8');
}

console.log("Re-extração limpa concluída!");
