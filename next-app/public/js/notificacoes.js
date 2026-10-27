/**
 * Sistema Unificado de Notificações Pop-up (Toasts Laterais) e Marcação de Abas CBM
 * Exclusivo para o site dos bombeiros (inibido no /painel-avisos)
 */

// 1. Verificação de Ambiente: NUNCA rodar nem exibir no /painel-avisos
function estaNoPainelAvisos() {
  if (typeof window === 'undefined') return true;
  return window.location.pathname.startsWith('/painel-avisos');
}

// 2. Busca de dados atualizada via API
async function fetchAvisosData() {
  if (estaNoPainelAvisos()) return [];
  try {
    const res = await fetch('/api/avisos', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.warn('Aviso: Falha ao obter dados da API /api/avisos:', e.message);
  }
  return [];
}

// 3. Mapeamento de Destinos para Global Navbar e Sidebars
const MAPA_DESTINOS_AVISOS = {
  // Abas Globais Padrão
  "Início": { globalTarget: "view-inicio" },
  "Avisos Gerais": { globalTarget: "view-avisos" },
  "Regras": { globalTarget: "view-regras" },
  "Uniformes": { globalTarget: "view-uniformes" },

  // Cursos (Global + Sub-itens)
  "Cursos": { globalTarget: "view-cursos" },
  "Curso de Piloto": { globalTarget: "view-cursos", subnavTarget: "curso-aereo" },
  "Resgate Aquático": { globalTarget: "view-cursos", subnavTarget: "curso-aquatico" },
  "Resgate Montanha": { globalTarget: "view-cursos", subnavTarget: "curso-montanha" },
  "Paraquedismo": { globalTarget: "view-cursos", subnavTarget: "curso-paraquedismo" },
  "Evoluir": { globalTarget: "view-cursos", subnavTarget: "curso-evoluir" },
  "COER": { globalTarget: "view-cursos", subnavTarget: "curso-coer" },
  "Tripulantes": { globalTarget: "view-cursos", subnavTarget: "curso-tripulantes" },
  "GTM": { globalTarget: "view-cursos", subnavTarget: "curso-gtm" },

  // Modulação (Global + Sub-itens)
  "Modulação": { globalTarget: "view-modulacao" },
  "Códigos Q": { globalTarget: "view-modulacao", subnavTarget: "codigos-q" },
  "Alfabeto Fonético": { globalTarget: "view-modulacao", subnavTarget: "alfabeto-fonetico" },
  "Numeração Fonética": { globalTarget: "view-modulacao", subnavTarget: "numeracao-fonetica" },
  "Padrão de Rádio": { globalTarget: "view-modulacao", subnavTarget: "padrao-radio" },

  // Outras Abas
  "Viaturas": { globalTarget: "view-viaturas" },
  "Hierarquia": { globalTarget: "view-hierarquia" },
  "Planilhas": { globalTarget: "view-planilhas" },
  "Galeria": { globalTarget: "view-galeria" }
};

// Funções Utilitárias de Texto e Escape
function escaparHtml(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatarTextoMarkdown(valor = "") {
  let texto = escaparHtml(valor);
  texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  texto = texto.replace(/\*(.*?)\*/g, '<em>$1</em>');
  texto = texto.replace(/_(.*?)_/g, '<em>$1</em>');
  return texto;
}

function formatarDataEncerramento(valor) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo"
    }).format(new Date(valor));
  } catch (e) {
    return String(valor);
  }
}

// Verifica se um aviso está ativo no momento
function estaAtivo(aviso, agora = new Date()) {
  if (!aviso || aviso.ativo === false) return false;
  const inicio = new Date(aviso.inicio);
  if (isNaN(inicio.getTime())) return false;

  if (aviso.fim && String(aviso.fim).trim() !== "" && String(aviso.fim) !== "null") {
    const fim = new Date(aviso.fim);
    if (!isNaN(fim.getTime())) {
      return agora >= inicio && agora < fim;
    }
  }
  return agora >= inicio;
}

// 4. Central de Notificações Toast Lateral Compacta
let containerNotificacoes = null;

function obterContainerCentral() {
  if (estaNoPainelAvisos()) {
    const centralExistente = document.getElementById("central-notificacoes");
    if (centralExistente) centralExistente.remove();
    return null;
  }

  if (containerNotificacoes && document.getElementById("central-notificacoes")) {
    return containerNotificacoes;
  }
  let central = document.getElementById("central-notificacoes");
  if (!central) {
    central = document.createElement("aside");
    central.id = "central-notificacoes";
    central.setAttribute("aria-label", "Avisos Operacionais Bombeiros");
    document.body.appendChild(central);
  }
  containerNotificacoes = central;
  return containerNotificacoes;
}

function obterAvisosFechadosSessao() {
  try {
    const raw = sessionStorage.getItem('cbm_avisos_fechados');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function salvarAvisoFechadoSessao(id) {
  try {
    const set = obterAvisosFechadosSessao();
    set.add(id);
    sessionStorage.setItem('cbm_avisos_fechados', JSON.stringify([...set]));
  } catch (e) {}
}

function montarCardToast(aviso) {
  const elemento = document.createElement("article");

  // Configuração de cores por intensidade/prioridade
  const prioridade = String(aviso.prioridade || 'normal').toLowerCase();
  let prioridadeCor = '#22c55e'; // Verde para normal
  let prioridadeBg = 'rgba(34, 197, 94, 0.16)';
  let prioridadeBorder = 'rgba(34, 197, 94, 0.45)';
  let prioridadeNome = 'Normal';

  if (prioridade === 'importante') {
    prioridadeCor = '#f59e0b'; // Amarelo/Laranja para importante
    prioridadeBg = 'rgba(245, 158, 11, 0.16)';
    prioridadeBorder = 'rgba(245, 158, 11, 0.45)';
    prioridadeNome = 'Importante';
  } else if (prioridade === 'urgente') {
    prioridadeCor = '#ef4444'; // Vermelho para urgente
    prioridadeBg = 'rgba(239, 68, 68, 0.2)';
    prioridadeBorder = 'rgba(239, 68, 68, 0.55)';
    prioridadeNome = 'Urgente';
  }

  elemento.className = [
    "notificacao-site",
    `notificacao-${prioridade}`,
    aviso.piscar ? "notificacao-destaque" : ""
  ].filter(Boolean).join(" ");

  elemento.dataset.avisoId = aviso.id;
  elemento.style.borderLeft = `3.5px solid ${prioridadeCor}`;

  const destinoInfo = MAPA_DESTINOS_AVISOS[aviso.titulo] || {};
  const globalTarget = destinoInfo.globalTarget || (aviso.mostrarAvisosGerais ? "view-avisos" : "");

  elemento.innerHTML = `
    <!-- Fundo Estrelado Parallax NASA -->
    <div class="toast-bg-stars"></div>

    <!-- Bolinhas Vermelhas NASA Flutuantes -->
    <div class="toast-nasa-dots">
      <span class="dot d1"></span>
      <span class="dot d2"></span>
      <span class="dot d3"></span>
      <span class="dot d4"></span>
      <span class="dot d5"></span>
    </div>

    <!-- Cantoneiras Táticas HUD nos Cantos -->
    <span class="toast-hud-corner tl"></span>
    <span class="toast-hud-corner br"></span>

    <!-- Conteúdo Interno Estruturado e Compacto -->
    <div style="padding: 8px 10px; display: flex; flex-direction: column; position: relative; z-index: 2;">
      <button
        type="button"
        class="notificacao-fechar"
        aria-label="Fechar aviso"
        style="position: absolute; top: 4px; right: 4px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; width: 18px; height: 18px; border-radius: 50%; font-size: 10px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
      >
        ✕
      </button>

      <div class="notificacao-cabecalho" style="display: flex; gap: 5px; margin-bottom: 4px; align-items: center; padding-right: 20px;">
        <span class="notificacao-prioridade" style="background: ${prioridadeBg}; border: 1px solid ${prioridadeBorder}; color: ${prioridadeCor}; padding: 1.5px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px;">
          ${escaparHtml(prioridadeNome)}
        </span>
        <span class="notificacao-categoria" style="background: rgba(255,255,255,0.08); color: #94a3b8; padding: 1.5px 5px; border-radius: 4px; font-size: 9px; font-weight: 600; text-transform: uppercase;">
          ${escaparHtml(aviso.categoria || 'Aviso')}
        </span>
      </div>

      <h2 style="font-size: 13px; font-weight: 700; margin: 0 0 3px 0; color: #ffffff; font-family: 'Rajdhani', sans-serif; letter-spacing: 0.3px; line-height: 1.25;">
        ${escaparHtml(aviso.titulo)}
      </h2>

      <p style="font-size: 11px; line-height: 1.35; margin: 0; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
        ${formatarTextoMarkdown(aviso.resumo || aviso.descricao)}
      </p>

      ${aviso.fim ? `
      <div class="notificacao-rodape" style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px; font-size: 9.5px; color: #64748b;">
        <small>Até ${formatarDataEncerramento(aviso.fim)}</small>
        <small class="cronometro-aviso" data-fim="${aviso.fim}" style="font-weight: bold; color: ${prioridadeCor};"></small>
      </div>` : ''}

      <div class="toast-btn-acessar" style="margin-top: 6px; padding: 3px 8px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 5px; font-size: 10px; color: #38bdf8; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; align-self: flex-start; cursor: pointer; transition: all 0.2s;">
        <span>Clique aqui para acessar</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </div>
  `;

  // Fechar aviso individual
  const btnClose = elemento.querySelector(".notificacao-fechar");
  if (btnClose) {
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      elemento.style.display = "none";
      salvarAvisoFechadoSessao(aviso.id);
      verificarVisibilidadeCentral();
    });
  }

  // Ação de navegar até a aba ou sub-aba
  const triggerNavegacao = () => {
    if (globalTarget && typeof window.switchGlobalView === 'function') {
      window.switchGlobalView(globalTarget);
    } else {
      const navItem = document.querySelector(`.nav-item[data-global-target='${globalTarget}']`);
      if (navItem) navItem.click();
    }
    if (destinoInfo.subnavTarget) {
      setTimeout(() => {
        const subBtn = document.querySelector(`[data-target='${destinoInfo.subnavTarget}']`);
        if (subBtn) subBtn.click();
      }, 120);
    }
  };

  const btnAcessar = elemento.querySelector('.toast-btn-acessar');
  if (btnAcessar) {
    btnAcessar.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerNavegacao();
    });
  }

  elemento.addEventListener("click", (e) => {
    if (e.target.closest('.notificacao-fechar')) return;
    triggerNavegacao();
  });

  return elemento;
}

// 5. Verificação Robusta de Visibilidade da Central
function isSiteDesbloqueado() {
  if (typeof window === 'undefined') return false;
  if (estaNoPainelAvisos()) return false;

  // 1. Session Storage desbloqueado
  if (sessionStorage.getItem('cbm_auth_unlocked') === 'true') {
    return true;
  }

  // 2. Classe cbm-unlocked no html ou body
  if (document.documentElement.classList.contains('cbm-unlocked') || document.body.classList.contains('cbm-unlocked')) {
    return true;
  }

  // 3. Se estiver locked no body
  if (document.body.classList.contains('locked')) {
    return false;
  }

  // 4. Se tiver crachá ou tela de login ativa
  const lanyard = document.getElementById('lanyard-screen');
  if (lanyard && window.getComputedStyle(lanyard).display !== 'none' && lanyard.style.opacity !== '0') {
    return false;
  }
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen && window.getComputedStyle(loginScreen).display !== 'none' && loginScreen.style.opacity !== '0') {
    return false;
  }

  return true;
}

function verificarVisibilidadeCentral() {
  if (estaNoPainelAvisos()) {
    const central = document.getElementById("central-notificacoes");
    if (central) central.remove();
    return;
  }

  const central = obterContainerCentral();
  if (!central) return;

  const temVisiveis = Array.from(central.children).some(el => el.style.display !== 'none');
  const unlocked = isSiteDesbloqueado();

  if (!temVisiveis || !unlocked) {
    central.style.display = 'none';
  } else {
    central.style.display = 'flex';
  }
}

function renderizarCentralToasts(avisosAtivos) {
  if (estaNoPainelAvisos()) return;

  const central = obterContainerCentral();
  if (!central) return;
  central.innerHTML = "";

  const fechados = obterAvisosFechadosSessao();
  const avisosComPopup = avisosAtivos.filter(a => a.mostrarPopup !== false);

  avisosComPopup.forEach(aviso => {
    const card = montarCardToast(aviso);
    if (fechados.has(aviso.id)) {
      card.style.display = 'none';
    }
    central.appendChild(card);
  });

  verificarVisibilidadeCentral();
}

// 6. Marcação Visual Tática nas Abas e Sub-abas
function aplicarMarcacaoAbas(avisosAtivos) {
  if (estaNoPainelAvisos()) return;

  // Limpar marcações anteriores
  document.querySelectorAll('.tem-aviso').forEach(el => el.classList.remove('tem-aviso'));
  document.querySelectorAll('.aviso-card-piscar').forEach(el => el.classList.remove('aviso-card-piscar'));
  document.querySelectorAll('.aviso-curso-banner').forEach(el => el.remove());

  // Aplicar novas marcações
  avisosAtivos.forEach(aviso => {
    if (aviso.mostrarAvisosGerais !== false) {
      const navItemGeral = document.querySelector(".nav-item[data-global-target='view-avisos']");
      if (navItemGeral) navItemGeral.classList.add('tem-aviso');
    }

    const destino = MAPA_DESTINOS_AVISOS[aviso.titulo];
    if (destino) {
      if (destino.globalTarget) {
        const navGlobal = document.querySelector(`.nav-item[data-global-target='${destino.globalTarget}']`);
        if (navGlobal) navGlobal.classList.add('tem-aviso');
      }

      if (destino.subnavTarget) {
        const sideItems = document.querySelectorAll(`[data-target='${destino.subnavTarget}']`);
        sideItems.forEach(el => {
          el.classList.add('tem-aviso');
          if (aviso.piscar) el.classList.add('aviso-card-piscar');
        });
      }
    }
  });
}

// 7. Atualização Geral Periódica
async function atualizarSistemaAvisos() {
  if (estaNoPainelAvisos()) {
    const central = document.getElementById("central-notificacoes");
    if (central) central.remove();
    return;
  }

  try {
    const avisos = await fetchAvisosData();
    const agora = new Date();
    const ativos = avisos.filter(a => estaAtivo(a, agora));

    aplicarMarcacaoAbas(ativos);
    renderizarCentralToasts(ativos);

    // Certificar de que o modal grande de destaque NUNCA abra automaticamente
    const modalDestaque = document.getElementById('modal-destaque');
    if (modalDestaque) {
      modalDestaque.style.display = 'none';
    }
  } catch (err) {
    console.error("Erro na rotina de atualização de avisos:", err);
  }
}

// Atualização de Cronômetros
function tickCronometros() {
  if (estaNoPainelAvisos()) return;
  const cronometros = document.querySelectorAll('.cronometro-aviso');
  const agora = Date.now();

  cronometros.forEach(cron => {
    const fim = new Date(cron.dataset.fim).getTime();
    const diff = fim - agora;
    if (diff <= 0) {
      cron.textContent = "Encerrado";
    } else {
      const totalHoras = Math.floor(diff / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      if (totalHoras >= 24) {
        const dias = Math.floor(totalHoras / 24);
        cron.textContent = `${dias}d ${totalHoras % 24}h ${minutos}m`;
      } else {
        cron.textContent = `${String(totalHoras).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
      }
    }
  });
}

// Event Listeners Globais
window.addEventListener('tabChanged', () => {
  verificarVisibilidadeCentral();
});

window.addEventListener('cbm_auth_unlocked', () => {
  setTimeout(() => {
    atualizarSistemaAvisos();
    verificarVisibilidadeCentral();
  }, 200);
});

// Observador para detectar desbloqueio dinâmico imediato
if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
  const observer = new MutationObserver(() => {
    verificarVisibilidadeCentral();
  });
  if (document.documentElement) {
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }
  if (document.body) {
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
}

// Inicialização segura com controle de execução única
if (!window.notificacoesSistemaIniciado) {
  window.notificacoesSistemaIniciado = true;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      atualizarSistemaAvisos();
      setInterval(atualizarSistemaAvisos, 30000);
      setInterval(tickCronometros, 1000);
      setInterval(verificarVisibilidadeCentral, 3000);
    });
  } else {
    atualizarSistemaAvisos();
    setInterval(atualizarSistemaAvisos, 30000);
    setInterval(tickCronometros, 1000);
    setInterval(verificarVisibilidadeCentral, 3000);
  }
}
