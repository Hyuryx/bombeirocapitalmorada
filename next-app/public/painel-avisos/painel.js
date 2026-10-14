// Proteção Anti-Clone Front-end
(function() {
    const host = window.location.hostname;
    const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '' || host.endsWith('.local') || host.startsWith('192.168.') || host.startsWith('10.');
    const isAllowedDomain = host.includes('bombeirocapitalmorada.vercel.app');

    if (!isLocalhost && !isAllowedDomain) {
        document.body.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;height:100vh;background-color:#111;color:#ff3333;font-family:sans-serif;text-align:center;padding:20px;">
                <div>
                    <h1 style="font-size:3em;margin-bottom:10px;">⚠️ ACESSO NEGADO</h1>
                    <p style="font-size:1.5em;color:#fff;">Cópia Pirata ou Domínio Não Autorizado.</p>
                </div>
            </div>
        `;
        throw new Error("Execução bloqueada por proteção anti-clone.");
    }
})();

const formulario = document.getElementById("formularioAviso");
const listaAvisos = document.getElementById("listaAvisos");
const statusServidor = document.getElementById("statusServidor");
const quantidadeAvisos = document.getElementById("quantidadeAvisos");
const tituloFormulario = document.getElementById("tituloFormulario");
const cancelarEdicao = document.getElementById("cancelarEdicao");
const salvarArquivo = document.getElementById("salvarArquivo");
const semFimCheckbox = document.getElementById("semFim");
const fimInput = document.getElementById("fim");
const inicioInput = document.getElementById("inicio");
const imagemInput = document.getElementById("imagem");
const previewImagem = document.getElementById("previewImagem");

let imagemBase64 = "";

if (imagemInput) {
  imagemInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      imagemBase64 = "";
      previewImagem.style.display = "none";
      return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        // Redimensionar e comprimir a imagem
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        
        // Comprimir para JPEG 70% qualidade
        imagemBase64 = canvas.toDataURL("image/jpeg", 0.7);
        previewImagem.src = imagemBase64;
        previewImagem.style.display = "block";
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

semFimCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    fimInput.disabled = true;
    fimInput.removeAttribute("required");
  } else {
    fimInput.disabled = false;
    fimInput.setAttribute("required", "required");
  }
});

let avisos = [];
let idEmEdicao = null;

function escaparHtml(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function criarId(titulo) {
  const slug = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${slug}-${Date.now()}`;
}

function converterParaISOComFuso(valor) {
  if (!valor) {
    return "";
  }

  return `${valor}:00-03:00`;
}

function converterParaCampoData(valor) {
  if (!valor) {
    return "";
  }

  return valor.substring(0, 16);
}

function formatarData(valor) {
  if (!valor) {
    return "Não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo"
  }).format(new Date(valor));
}

function prioridadePeso(prioridade) {
  const pesos = {
    urgente: 1,
    importante: 2,
    normal: 3
  };

  return pesos[prioridade] || 99;
}

async function carregarAvisos() {
  try {
    const resposta = await fetch("/api/avisos");

    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os avisos.");
    }

    avisos = await resposta.json();

    statusServidor.textContent = "Arquivo carregado";
    statusServidor.className = "status sucesso";

    removerAvisosExpirados();
    renderizarAvisos();
  } catch (erro) {
    statusServidor.textContent = erro.message;
    statusServidor.className = "status erro";
  }
}

function renderizarAvisos() {
  const avisosOrdenados = avisos
    .map((aviso, indiceOriginal) => ({
      aviso,
      indiceOriginal
    }))
    .sort((a, b) => {
      return (
        prioridadePeso(a.aviso.prioridade) -
        prioridadePeso(b.aviso.prioridade)
      );
    });

  quantidadeAvisos.textContent =
    avisos.length === 1
      ? "1 aviso cadastrado"
      : `${avisos.length} avisos cadastrados`;

  if (avisos.length === 0) {
    listaAvisos.innerHTML = `
      <div class="lista-vazia">
        Nenhum aviso foi cadastrado.
      </div>
    `;

    return;
  }

  listaAvisos.innerHTML = avisosOrdenados
    .map(({ aviso, indiceOriginal }) => {
      return `
        <article class="item-aviso prioridade-${aviso.prioridade}">
          <div class="item-conteudo">
            <div class="item-topo">
              <span class="categoria">
                ${escaparHtml(aviso.categoria)}
              </span>

              <span class="prioridade">
                ${escaparHtml(aviso.prioridade)}
              </span>

              ${
                aviso.ativo
                  ? (new Date(aviso.inicio) > new Date() ? '<span class="situacao ativo" style="background-color: #f59e0b; color: #fff;">Programado</span>' : '<span class="situacao ativo">Ativo</span>')
                  : '<span class="situacao inativo">Inativo</span>'
              }
            </div>

            <h3>${escaparHtml(aviso.titulo)}</h3>

            <p>${escaparHtml(aviso.descricao)}</p>

            <div class="datas">
              <span>
                <strong>Início:</strong>
                ${formatarData(aviso.inicio)}
              </span>
              ${["curso", "evento", "manutencao"].includes(aviso.categoria) ? `
              <span>
                <strong>Fim:</strong>
                ${aviso.fim ? formatarData(aviso.fim) : "Sem limite"}
              </span>
              ` : ''}
            </div>

            <div class="formas-exibicao">
              ${aviso.mostrarPopup ? "<span>Pop-up</span>" : ""}
              ${
                aviso.mostrarAvisosGerais
                  ? "<span>Avisos Gerais</span>"
                  : ""
              }
              ${aviso.piscar ? "<span>Destacado</span>" : ""}
            </div>
          </div>

          <div class="item-acoes">
            <button
              type="button"
              onclick="editarAviso('${aviso.id}')"
              class="botao secundario"
            >
              Editar
            </button>

            <button
              type="button"
              onclick="excluirAviso('${aviso.id}')"
              class="botao perigo"
            >
              Excluir
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const inicio = document.getElementById("inicio").value;
  let fim = document.getElementById("fim").value;
  const semFim = document.getElementById("semFim").checked;

  if (semFim) {
    fim = "";
  } else {
    if (new Date(inicio) >= new Date(fim)) {
      alert(
        "A data de encerramento precisa ser posterior à data inicial."
      );
  
      return;
    }
  
    if (new Date(fim) <= new Date()) {
      alert(
        "A data e hora de encerramento já passou. O sistema não permite publicar avisos expirados."
      );
  
      return;
    }
  }

  const titulo = document.getElementById("titulo").value.trim();

  const avisoExistente =
    idEmEdicao !== null ? avisos.find((a) => a.id === idEmEdicao) : null;

  const aviso = {
    id: avisoExistente?.id || criarId(titulo),
    titulo,
    resumo: document.getElementById("resumo").value.trim(),
    descricao: document
      .getElementById("descricao")
      .value
      .trim(),
    imagem: imagemBase64,
    categoria: document.getElementById("categoria").value,
    prioridade: document.getElementById("prioridade").value,
    inicio: converterParaISOComFuso(inicio),
    fim: semFim ? null : converterParaISOComFuso(fim),
    link: document.getElementById("link").value.trim(),
    mostrarPopup: document
      .getElementById("mostrarPopup")
      .checked,
    mostrarAvisosGerais: document
      .getElementById("mostrarAvisosGerais")
      .checked,
    piscar: document.getElementById("piscar").checked,
    ativo: document.getElementById("ativo").checked
  };

  if (idEmEdicao === null) {
    avisos.push(aviso);
  } else {
    const index = avisos.findIndex((a) => a.id === idEmEdicao);
    if (index !== -1) {
      avisos[index] = aviso;
    }
  }

  limparFormulario();
  renderizarAvisos();
  salvarAvisosNoServidor(true); // Auto-save silencioso
});

window.editarAviso = function(id) {
  const aviso = avisos.find((a) => a.id === id);
  if (!aviso) return;

  idEmEdicao = id;

  document.getElementById("avisoId").value = aviso.id;
  document.getElementById("titulo").value = aviso.titulo;
  document.getElementById("resumo").value = aviso.resumo || "";
  document.getElementById("descricao").value = aviso.descricao;
  
  imagemBase64 = aviso.imagem || "";
  if (imagemBase64) {
    document.getElementById("previewImagem").src = imagemBase64;
    document.getElementById("previewImagem").style.display = "block";
  } else {
    document.getElementById("previewImagem").style.display = "none";
  }
  document.getElementById("imagem").value = ""; // Reseta o input file visualmente

  document.getElementById("categoria").value = aviso.categoria;
  document.getElementById("prioridade").value = aviso.prioridade;
  document.getElementById("inicio").value =
    converterParaCampoData(aviso.inicio);
  if (aviso.fim) {
    document.getElementById("fim").value = converterParaCampoData(aviso.fim);
    document.getElementById("semFim").checked = false;
    document.getElementById("fim").disabled = false;
    document.getElementById("fim").setAttribute("required", "required");
  } else {
    document.getElementById("fim").value = "";
    document.getElementById("semFim").checked = true;
    document.getElementById("fim").disabled = true;
    document.getElementById("fim").removeAttribute("required");
  }
  document.getElementById("link").value = aviso.link || "";
  document.getElementById("mostrarPopup").checked =
    aviso.mostrarPopup;
  document.getElementById("mostrarAvisosGerais").checked =
    aviso.mostrarAvisosGerais;
  document.getElementById("piscar").checked = aviso.piscar;
  document.getElementById("ativo").checked = aviso.ativo;

  tituloFormulario.textContent = "Editar aviso";
  cancelarEdicao.hidden = false;

  document.getElementById("categoria").dispatchEvent(new Event("change"));

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.excluirAviso = function(id) {
  const aviso = avisos.find((a) => a.id === id);
  if (!aviso) return;

  const confirmou = confirm(
    `Deseja excluir o aviso "${aviso.titulo}"?`
  );

  if (!confirmou) {
    return;
  }

  avisos = avisos.filter((a) => a.id !== id);

  if (idEmEdicao === id) {
    limparFormulario();
  }

  renderizarAvisos();
  salvarAvisosNoServidor(true); // Auto-save silencioso
}

function limparFormulario() {
  idEmEdicao = null;
  document.getElementById("avisoId").value = "";
  document.getElementById("resumo").value = "";
  document.getElementById("imagem").value = "";
  imagemBase64 = "";
  document.getElementById("previewImagem").style.display = "none";

  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  document.getElementById("inicio").value = agora.toISOString().slice(0, 16);

  document.getElementById("semFim").checked = false;
  document.getElementById("fim").disabled = false;
  document.getElementById("fim").setAttribute("required", "required");
  document.getElementById("fim").value = "";

  tituloFormulario.textContent = "Novo aviso";
  cancelarEdicao.hidden = true;
  document.getElementById("categoria").dispatchEvent(new Event("change"));
}

cancelarEdicao.addEventListener("click", limparFormulario);

async function salvarAvisosNoServidor(silencioso = false) {
  try {
    salvarArquivo.disabled = true;
    salvarArquivo.textContent = "Salvando...";

    const resposta = await fetch("/api/avisos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(avisos)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        resultado.erro || "Não foi possível salvar."
      );
    }

    statusServidor.textContent = "Arquivo salvo com sucesso";
    statusServidor.className = "status sucesso";

    if (!silencioso) {
      alert("Os avisos foram salvos e um backup foi criado.");
    }
  } catch (erro) {
    statusServidor.textContent = erro.message;
    statusServidor.className = "status erro";
  } finally {
    salvarArquivo.disabled = false;
    salvarArquivo.textContent = "Salvar avisos.json";
  }
}

salvarArquivo.addEventListener("click", () => salvarAvisosNoServidor(false));

function removerAvisosExpirados() {
  const agora = new Date();
  const tamanhoAnterior = avisos.length;
  
  avisos = avisos.filter(a => {
    if (!a.fim || String(a.fim).trim() === "" || String(a.fim) === "null") return true;
    
    const dataFim = new Date(a.fim);
    // Se a data for inválida por algum motivo bizarro de navegador, não exclui!
    if (isNaN(dataFim.getTime())) return true;
    
    return dataFim > agora;
  });
  
  if (avisos.length !== tamanhoAnterior) {
    if (idEmEdicao !== null && !avisos.some(a => a.id === idEmEdicao)) {
      limparFormulario();
    }
    renderizarAvisos();
    salvarAvisosNoServidor(true);
  }
}

carregarAvisos();
window.setInterval(removerAvisosExpirados, 60000);

document.getElementById("categoria").addEventListener("change", (e) => {
  const categoria = e.target.value;
  const mostrarTempo = ["curso", "evento", "manutencao"].includes(categoria);
  const grupoEncerramento = document.getElementById("grupoEncerramento");
  
  if (mostrarTempo) {
    grupoEncerramento.style.display = "flex"; // or block depending on CSS, it's a div class="campo" which is usually flex col
  } else {
    grupoEncerramento.style.display = "none";
    document.getElementById("semFim").checked = true;
    document.getElementById("fim").disabled = true;
    document.getElementById("fim").removeAttribute("required");
  }
});
// Run once on load to set initial state
document.getElementById("categoria").dispatchEvent(new Event("change"));

// ==========================================================================
// SISTEMA DE SEGURANÇA E LOGIN MILITAR FUTURISTA (CRACHÁ, PARALLAX, CARGO SYSTEM)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Efeito Parallax Dinâmico
    const bgWrapper = document.getElementById('cbm-parallax-bg');
    const lightRays = document.getElementById('cbm-light-rays');
    if (bgWrapper) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            if (lightRays) {
                lightRays.style.transform = `translateX(calc(-50% + ${x * 0.8}px)) translateY(${y * 0.5}px)`;
            }
        });
    }

    // 2. Efeito Sonoro de Cordão Retrátil (Web Audio API)
    function playTacticalPullSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(340, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.16);
            gain.gain.setValueAtTime(0.09, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.18);
        } catch (e) {}
    }

    // 2.1 Inicialização das Partículas NASA (Formato oficial com partículas vermelhas caindo)
    function initNasaParticles() {
        if (typeof window.particlesJS === 'function') {
            const nasaConfig = {
                particles: {
                    number: { value: 130, density: { enable: true, value_area: 800 } },
                    color: { value: "#ff1f35" },
                    shape: { type: "circle" },
                    opacity: { value: 0.85, random: true, anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false } },
                    size: { value: 3.2, random: true, anim: { enable: false } },
                    line_linked: { enable: false },
                    move: {
                        enable: true,
                        speed: 1.4,
                        direction: "bottom", // Formato NASA: partículas caindo verticalmente
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "bubble" },
                        onclick: { enable: true, mode: "repulse" },
                        resize: true
                    },
                    modes: {
                        bubble: { distance: 180, size: 0, duration: 2, opacity: 0, speed: 3 },
                        repulse: { distance: 220, duration: 0.35 }
                    }
                },
                retina_detect: true
            };

            try {
                if (document.getElementById('particles-cracha')) {
                    window.particlesJS('particles-cracha', JSON.parse(JSON.stringify(nasaConfig)));
                }
                if (document.getElementById('particles-login')) {
                    window.particlesJS('particles-login', JSON.parse(JSON.stringify(nasaConfig)));
                }
            } catch (err) {
                console.warn('Erro ao carregar partículas NASA:', err);
            }
        } else {
            setTimeout(initNasaParticles, 80);
        }
    }
    initNasaParticles();

    // 3. Controle do Crachá (Lanyard Badge Screen com Física e Puxar)
    const lanyardOverlay = document.getElementById('cbm-lanyard-overlay');
    const lanyardStage = document.getElementById('lanyard-stage');
    const btnShowCracha = document.getElementById('btn-show-cracha');
    const btnLockScreen = document.getElementById('btn-lock-screen');
    const loginPassword = document.getElementById('login-password');

    function dismissCracha() {
        if (!lanyardOverlay || lanyardOverlay.classList.contains('is-hiding')) return;
        playTacticalPullSound();
        lanyardOverlay.classList.add('is-hiding');
        setTimeout(() => {
            if (loginPassword) loginPassword.focus();
        }, 500);
    }

    function showCracha() {
        if (!lanyardOverlay) return;
        lanyardOverlay.classList.remove('is-hiding');
        if (lanyardStage) {
            lanyardStage.style.transform = 'translateY(0) rotate(0deg)';
        }
    }

    if (lanyardStage) {
        let isDragging = false;
        let startY = 0;
        let startX = 0;
        let currentY = 0;
        let currentX = 0;
        let dragStartTime = 0;

        const onPointerDown = (e) => {
            isDragging = true;
            dragStartTime = Date.now();
            startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
            startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            currentY = 0;
            currentX = 0;
            lanyardStage.style.transition = 'none';
            if (e.target && e.target.setPointerCapture && e.pointerId) {
                try { e.target.setPointerCapture(e.pointerId); } catch(err) {}
            }
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
            const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const deltaY = clientY - startY;
            const deltaX = clientX - startX;

            if (deltaY > 0) {
                // Resistência elástica
                currentY = Math.min(deltaY * 0.85, 180);
                currentX = Math.max(-40, Math.min(40, deltaX * 0.35));
                const rotZ = currentX * 0.15;
                const rotX = Math.min(18, currentY * 0.1);
                lanyardStage.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotZ}deg) rotateX(${-rotX}deg)`;
            }
        };

        const onPointerUp = (e) => {
            if (!isDragging) return;
            isDragging = false;
            const duration = Date.now() - dragStartTime;
            lanyardStage.style.transition = 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Puxou para baixo (> 38px) OU foi um clique rápido (< 250ms com pouco movimento)
            if (currentY > 38 || (duration < 280 && currentY < 10 && Math.abs(currentX) < 10)) {
                lanyardStage.style.transform = 'translateY(120px) scale(0.96)';
                dismissCracha();
            } else {
                lanyardStage.style.transform = 'translateY(0) rotate(0deg)';
            }
            currentY = 0;
            currentX = 0;
        };

        // Suporte moderno unificado a PointerEvents (mouse, touch, stylus)
        lanyardStage.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        // Fallback touch para dispositivos específicos
        lanyardStage.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        // Clique na seta ou tag inferior também puxa o crachá
        const pullHint = document.querySelector('.lanyard-pull-hint');
        if (pullHint) {
            pullHint.style.cursor = 'pointer';
            pullHint.style.pointerEvents = 'auto';
            pullHint.addEventListener('click', dismissCracha);
        }
    }

    if (btnShowCracha) {
        btnShowCracha.addEventListener('click', showCracha);
    }

    if (btnLockScreen) {
        btnLockScreen.addEventListener('click', () => {
            sessionStorage.removeItem('cbm_system_unlocked');
            sessionStorage.removeItem('cbm_system_time');
            document.documentElement.classList.remove('cbm-unlocked');
            showCracha();
            resetLoginViews();
        });
    }

    // 4. Relógio HUD Militar em Tempo Real
    const loginTime = document.getElementById('login-time');
    const loginDate = document.getElementById('login-date');
    function updateHudClock() {
        if (loginTime && loginDate) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            loginTime.textContent = `${hours}:${minutes}:${seconds}`;

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            loginDate.textContent = now.toLocaleDateString('pt-BR', options);
        }
    }
    setInterval(updateHudClock, 1000);
    updateHudClock();

    // 5. Fluxo de Autenticação Militar (CARGO SYSTEM)
    const formView = document.getElementById('cbm-form-view');
    const stepsView = document.getElementById('cbm-steps-view');
    const successView = document.getElementById('cbm-success-view');
    const deniedView = document.getElementById('cbm-denied-view');
    const loginSubmit = document.getElementById('login-submit');
    const loginError = document.getElementById('login-error');
    const btnAuthRetry = document.getElementById('btn-auth-retry');
    const militarNameSpan = document.getElementById('cbm-auth-militar-name');

    function resetLoginViews() {
        if (formView) formView.style.display = 'flex';
        if (stepsView) stepsView.style.display = 'none';
        if (successView) successView.style.display = 'none';
        if (deniedView) deniedView.style.display = 'none';
        if (loginSubmit) loginSubmit.disabled = false;
        if (loginError) loginError.style.display = 'none';
        for (let s = 1; s <= 6; s++) {
            setStepState(s, 'pending');
        }
    }

    if (btnAuthRetry) {
        btnAuthRetry.addEventListener('click', resetLoginViews);
    }

    function setStepState(stepNum, state, detailText) {
        const item = document.getElementById(`step-${stepNum}`);
        if (!item) return;
        item.classList.remove('pending', 'loading', 'success', 'error', 'skipped');
        item.classList.add(state);

        if (detailText) {
            const titleEl = item.querySelector('.cbm-step-title');
            if (titleEl) titleEl.textContent = detailText;
        }
    }

    async function handleLogin() {
        const enteredId = String(loginPassword.value || '').trim();
        const cleanId = enteredId.replace(/^[#\s]+/, '').trim();

        if (!cleanId) {
            if (loginError) {
                loginError.textContent = "Por favor, digite seu ID militar.";
                loginError.style.display = 'block';
            }
            if (loginPassword) loginPassword.focus();
            return;
        }

        if (loginError) loginError.style.display = 'none';
        if (loginSubmit) loginSubmit.disabled = true;

        // Troca para visualização de etapas
        if (formView) formView.style.display = 'none';
        if (stepsView) stepsView.style.display = 'flex';
        if (deniedView) deniedView.style.display = 'none';
        if (successView) successView.style.display = 'none';

        for (let s = 1; s <= 6; s++) {
            setStepState(s, 'pending');
        }

        // Coleta identificação e HWID da máquina
        let deviceInfo = { hwid: 'default_hwid', deviceType: 'desktop' };
        try {
            if (typeof window.generateDeviceFingerprint === 'function') {
                deviceInfo = await window.generateDeviceFingerprint();
            }
        } catch (e) {
            console.warn('Erro ao gerar HWID:', e);
        }

        // Dispara requisição real para o backend com painel avisos (CARGO SYSTEM!)
        const authPromise = fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: cleanId,
                hwid: deviceInfo.hwid,
                deviceType: deviceInfo.deviceType,
                panel: 'avisos' // Exige validação do CARGO SYSTEM
            })
        }).then(async res => {
            const data = await res.json().catch(() => ({}));
            return { ok: res.ok, status: res.status, data };
        }).catch(err => {
            console.error("Falha ao comunicar com o servidor de auth:", err);
            return {
                ok: false,
                status: 503,
                data: {
                    sucesso: false,
                    failedAtStep: 1,
                    erro: 'Falha de comunicação segura com o servidor.'
                }
            };
        });

        // Execução sequencial visual com cadência tática (~800ms por etapa)
        let authResult = null;
        let hadFailure = false;

        for (let stepIndex = 1; stepIndex <= 6; stepIndex++) {
            setStepState(stepIndex, 'loading');
            await new Promise(r => setTimeout(r, 780));

            if (!authResult) {
                authResult = await authPromise;
            }

            const data = authResult.data || {};
            const failedAt = data.failedAtStep;
            const stepFailed = (failedAt === stepIndex) || (!authResult.ok && !data.steps && stepIndex === 1);

            if (stepFailed) {
                hadFailure = true;
                const errorMsg = data.erro || 'Falha na validação desta etapa.';
                setStepState(stepIndex, 'error', errorMsg);

                for (let rem = stepIndex + 1; rem <= 6; rem++) {
                    setStepState(rem, 'skipped');
                }

                await new Promise(r => setTimeout(r, 1400));

                if (stepsView) stepsView.style.display = 'none';
                if (deniedView) deniedView.style.display = 'flex';

                const deniedMsg = document.getElementById('cbm-denied-msg');
                const deniedDetail = document.getElementById('cbm-denied-detail');
                const actionBtn = document.getElementById('btn-auth-action');
                const actionBtnText = document.getElementById('btn-auth-action-text');

                if (deniedMsg) {
                    deniedMsg.textContent = data.erro || "Acesso restrito ao Painel de Avisos.";
                }

                if (deniedDetail) {
                    deniedDetail.textContent = data.detail || "Verifique sua identificação militar ou solicite a atribuição do cargo SYSTEM ao Comando.";
                }

                if (data.action && data.actionUrl && actionBtn) {
                    actionBtn.href = data.actionUrl;
                    if (data.actionUrl.startsWith('http')) {
                        actionBtn.target = '_blank';
                        actionBtn.rel = 'noopener noreferrer';
                    } else {
                        actionBtn.removeAttribute('target');
                    }
                    actionBtn.style.display = 'flex';
                    if (actionBtnText) {
                        actionBtnText.textContent = data.actionLabel || 'PROSSEGUIR';
                    }
                } else if (actionBtn) {
                    actionBtn.style.display = 'none';
                }

                break;
            } else {
                let okDetail = null;
                if (data.steps && data.steps[stepIndex - 1]?.detail) {
                    okDetail = data.steps[stepIndex - 1].detail;
                }
                setStepState(stepIndex, 'success', okDetail);
            }
        }

        // Se passou em todas as 6 etapas com sucesso:
        if (!hadFailure && authResult && authResult.ok) {
            await new Promise(r => setTimeout(r, 500));
            if (stepsView) stepsView.style.display = 'none';
            if (successView) successView.style.display = 'flex';

            const userName = authResult.data?.userName || authResult.data?.displayName || 'Militar';
            if (militarNameSpan) militarNameSpan.textContent = userName;

            // Salva a sessão autenticada com cargo SYSTEM
            sessionStorage.setItem('cbm_system_unlocked', 'true');
            sessionStorage.setItem('cbm_system_time', Date.now().toString());

            setTimeout(() => {
                document.documentElement.classList.add('cbm-unlocked');
                const digitalClock = document.getElementById('digital-clock');
                if (digitalClock) digitalClock.style.display = 'block';
                // Atualiza listas do painel administrativo
                if (typeof window.carregarMilitaresAdmin === 'function') {
                    window.carregarMilitaresAdmin();
                }
            }, 1400);
        }
    }

    if (loginSubmit) loginSubmit.addEventListener('click', handleLogin);
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
    }

    // Tratar retornos automáticos via URL (?discord_auth=success&militar_id=35904)
    const urlParams = new URLSearchParams(window.location.search);
    const returnMilitarId = urlParams.get('militar_id');
    const isDiscordSuccess = urlParams.get('discord_auth') === 'success';
    if (isDiscordSuccess && returnMilitarId && loginPassword) {
        dismissCracha();
        loginPassword.value = returnMilitarId;
        setTimeout(() => {
            handleLogin();
        }, 600);
    }
});

// ==========================================================================
// CONTROLE DAS ABAS (MONITORES) E PAINEL ADMINISTRATIVO DE HWID
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const tabAvisos = document.getElementById("tab-btn-avisos");
    const tabAdmin = document.getElementById("tab-btn-admin");
    const conteudoAvisos = document.getElementById("aba-conteudo-avisos");
    const conteudoAdmin = document.getElementById("aba-conteudo-admin");

    const statMilitares = document.getElementById("admin-stat-militares");
    const statDesktops = document.getElementById("admin-stat-desktops");
    const statMobiles = document.getElementById("admin-stat-mobiles");
    const statBots = document.getElementById("admin-stat-bots");

    const searchInput = document.getElementById("admin-search-input");
    const btnRefresh = document.getElementById("admin-btn-refresh");
    const containerLista = document.getElementById("admin-militares-lista");

    const modalConfirm = document.getElementById("modal-confirm-reset");
    const modalTitle = document.getElementById("modal-reset-title");
    const modalDesc = document.getElementById("modal-reset-desc");
    const modalBtnCancel = document.getElementById("modal-btn-cancel");
    const modalBtnConfirm = document.getElementById("modal-btn-confirm");

    // Modal Exclusão de Cadastro
    const modalDelete = document.getElementById("modal-confirm-delete");
    const modalDeleteTitle = document.getElementById("modal-delete-title");
    const modalDeleteDesc = document.getElementById("modal-delete-desc");
    const modalBtnDeleteCancel = document.getElementById("modal-btn-delete-cancel");
    const modalBtnDeleteConfirm = document.getElementById("modal-btn-delete-confirm");

    // Modal de Logs de Acesso
    const modalLogs = document.getElementById("modal-logs-militar");
    const modalLogsTitle = document.getElementById("modal-logs-militar-title");
    const modalLogsSubtitle = document.getElementById("modal-logs-militar-subtitle");
    const modalLogsTimeline = document.getElementById("modal-logs-timeline");
    const modalLogsBtnClose = document.getElementById("modal-logs-btn-close");
    const modalLogsBtnFechar = document.getElementById("modal-logs-btn-fechar");

    let militaresData = [];
    let pendingResetPayload = null;
    let pendingDeletePayload = null;

    // Alternância de Abas
    function switchTab(target) {
        if (target === 'admin') {
            if (tabAvisos) tabAvisos.classList.remove('active');
            if (tabAdmin) tabAdmin.classList.add('active');
            if (conteudoAvisos) conteudoAvisos.style.display = 'none';
            if (conteudoAdmin) conteudoAdmin.style.display = 'block';
            carregarMilitares();
        } else {
            if (tabAdmin) tabAdmin.classList.remove('active');
            if (tabAvisos) tabAvisos.classList.add('active');
            if (conteudoAdmin) conteudoAdmin.style.display = 'none';
            if (conteudoAvisos) conteudoAvisos.style.display = 'block';
        }
    }

    if (tabAvisos) tabAvisos.addEventListener('click', () => switchTab('avisos'));
    if (tabAdmin) tabAdmin.addEventListener('click', () => switchTab('admin'));

    // Carregar lista de militares do backend
    async function carregarMilitares() {
        if (!containerLista) return;
        containerLista.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #66707c; background: #fff; border-radius: 14px;">
                <div style="font-weight: 700; font-size: 15px; margin-bottom: 6px;">Consultando banco de dados militar...</div>
                <div style="font-size: 13px;">Carregando registros e vínculos de máquinas</div>
            </div>
        `;

        try {
            const res = await fetch('/api/admin/devices');
            const data = await res.json();

            if (data.sucesso && Array.isArray(data.militares)) {
                militaresData = data.militares;
                atualizarEstatisticas(militaresData);
                renderizarMilitares(militaresData);
            } else {
                containerLista.innerHTML = `
                    <div style="padding: 30px; text-align: center; color: #b91c1c; background: #fff5f5; border-radius: 14px;">
                        Erro ao carregar dados: ${data.erro || 'Falha na resposta do servidor'}
                    </div>
                `;
            }
        } catch (err) {
            console.error('Erro ao buscar militares:', err);
            containerLista.innerHTML = `
                <div style="padding: 30px; text-align: center; color: #b91c1c; background: #fff5f5; border-radius: 14px;">
                    Falha na comunicação com o servidor de dispositivos.
                </div>
            `;
        }
    }

    // Atualizar números no topo
    function atualizarEstatisticas(lista) {
        if (!statMilitares) return;
        const total = lista.length;
        const desktops = lista.filter(m => !!m.desktopHwid).length;
        const mobiles = lista.filter(m => !!m.mobileHwid).length;
        const bots = lista.filter(m => m.isBotAuthorized === true).length;

        statMilitares.textContent = total;
        if (statDesktops) statDesktops.textContent = desktops;
        if (statMobiles) statMobiles.textContent = mobiles;
        if (statBots) statBots.textContent = bots;
    }

    // Renderizar Cards de Militares
    function renderizarMilitares(lista) {
        if (!containerLista) return;

        const termo = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const filtrados = lista.filter(m => {
            if (!termo) return true;
            const id = String(m.militarId || '').toLowerCase();
            const nick = String(m.nick || m.globalName || '').toLowerCase();
            const tag = String(m.discordTag || '').toLowerCase();
            return id.includes(termo) || nick.includes(termo) || tag.includes(termo);
        });

        if (filtrados.length === 0) {
            containerLista.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #66707c; background: #fff; border-radius: 14px; border: 1px dashed #d2d8e0;">
                    <div style="font-size: 28px; margin-bottom: 8px;">🛡️</div>
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">Nenhum registro militar encontrado</div>
                    <div style="font-size: 13px;">${termo ? 'Tente buscar com outro termo ou limpe o filtro.' : 'Nenhum militar registrou máquina no sistema até o momento.'}</div>
                </div>
            `;
            return;
        }

        containerLista.innerHTML = filtrados.map(m => {
            const hasDesktop = !!m.desktopHwid;
            const hasMobile = !!m.mobileHwid;
            const isBotOk = m.isBotAuthorized === true;

            const formatHwid = (hwid) => {
                if (!hwid) return 'Não registrado';
                return hwid.length > 28 ? `${hwid.substring(0, 14)}...${hwid.substring(hwid.length - 10)}` : hwid;
            };

            const formatDate = (iso) => {
                if (!iso) return 'Ainda não registrado';
                try {
                    const d = new Date(iso);
                    return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                } catch(e) {
                    return iso;
                }
            };

            return `
                <div class="militar-admin-card" data-militar-id="${m.militarId}">
                    <div class="militar-card-header">
                        <div class="militar-identity-group">
                            <span class="militar-id-badge">ID #${m.militarId}</span>
                            <div>
                                <h3 class="militar-name-title">${escaparHtml(m.nick || m.globalName || 'Militar')}</h3>
                                <div class="militar-discord-tag">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                    <span>${escaparHtml(m.discordTag || 'Discord não vinculado')}</span>
                                </div>
                            </div>
                        </div>

                        <span class="bot-status-badge ${isBotOk ? 'authorized' : 'pending'}">
                            ${isBotOk ? '✓ Bot Autorizado' : '⚠️ Autorização Pendente'}
                        </span>
                    </div>

                    <div class="militar-devices-grid">
                        <!-- Slot Desktop -->
                        <div class="device-slot-card ${hasDesktop ? 'has-device' : ''}">
                            <div>
                                <div class="device-slot-top">
                                    <div class="device-slot-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                    </div>
                                    <div class="device-slot-header">
                                        <h4>Computador (Desktop)</h4>
                                        <span class="device-status-pill ${hasDesktop ? 'bound' : 'unbound'}">
                                            ${hasDesktop ? '✓ Vinculado' : 'Livre para Registro'}
                                        </span>
                                    </div>
                                </div>

                                <div class="device-hwid-box" title="${m.desktopHwid || ''}">
                                    <span>HWID: ${formatHwid(m.desktopHwid)}</span>
                                </div>
                                <div class="device-meta-date">
                                    Último login: ${formatDate(m.lastDesktopLogin || m.lastLogin)}
                                </div>
                            </div>

                            <button
                                type="button"
                                class="btn-reset-device"
                                ${!hasDesktop ? 'disabled' : ''}
                                onclick="window.solicitarResetHwid('${m.militarId}', 'desktop', '${escaparHtml(m.nick || m.militarId)}')"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
                                <span>Resetar HWID do PC</span>
                            </button>
                        </div>

                        <!-- Slot Mobile -->
                        <div class="device-slot-card ${hasMobile ? 'has-device' : ''}">
                            <div>
                                <div class="device-slot-top">
                                    <div class="device-slot-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                        </svg>
                                    </div>
                                    <div class="device-slot-header">
                                        <h4>Dispositivo Móvel</h4>
                                        <span class="device-status-pill ${hasMobile ? 'bound' : 'unbound'}">
                                            ${hasMobile ? '✓ Vinculado' : 'Livre para Registro'}
                                        </span>
                                    </div>
                                </div>

                                <div class="device-hwid-box" title="${m.mobileHwid || ''}">
                                    <span>HWID: ${formatHwid(m.mobileHwid)}</span>
                                </div>
                                <div class="device-meta-date">
                                    Último login: ${formatDate(m.lastMobileLogin || m.lastLogin)}
                                </div>
                            </div>

                            <button
                                type="button"
                                class="btn-reset-device"
                                ${!hasMobile ? 'disabled' : ''}
                                onclick="window.solicitarResetHwid('${m.militarId}', 'mobile', '${escaparHtml(m.nick || m.militarId)}')"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
                                <span>Resetar HWID do Celular</span>
                            </button>
                        </div>
                    </div>

                    <div class="militar-card-footer">
                        <span style="font-size: 12px; color: #8c97a8;">
                            Regra ativa: 1 PC + 1 Mobile por militar
                        </span>
                        <div class="militar-card-footer-actions">
                            <button
                                type="button"
                                class="btn-view-logs"
                                onclick="window.abrirLogsMilitar('${m.militarId}')"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                <span>Ver Logs (${(m.logs && m.logs.length) || 0})</span>
                            </button>
                            <button
                                type="button"
                                class="btn-reset-all"
                                onclick="window.solicitarResetHwid('${m.militarId}', 'all', '${escaparHtml(m.nick || m.militarId)}')"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                <span>Resetar HWIDs</span>
                            </button>
                            <button
                                type="button"
                                class="btn-delete-militar"
                                onclick="window.solicitarExcluirMilitar('${m.militarId}', '${escaparHtml(m.nick || m.militarId)}')"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                <span>Excluir Cadastro</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Modal de Confirmação de Reset
    window.solicitarResetHwid = function(militarId, target, nome) {
        pendingResetPayload = { militarId, target, nome };
        if (!modalConfirm) return;

        let targetLabel = 'Todos os Dispositivos';
        if (target === 'desktop') targetLabel = 'Computador (Desktop)';
        if (target === 'mobile') targetLabel = 'Dispositivo Móvel (Celular)';

        if (modalTitle) modalTitle.textContent = `Resetar HWID do ${targetLabel}?`;
        if (modalDesc) {
            modalDesc.textContent = `Você está liberando o vínculo do ${targetLabel} para o militar #${militarId} (${nome}). No próximo acesso, um novo dispositivo poderá ser registrado normalmente.`;
        }
        modalConfirm.style.display = 'flex';
    };

    if (modalBtnCancel) {
        modalBtnCancel.addEventListener('click', () => {
            if (modalConfirm) modalConfirm.style.display = 'none';
            pendingResetPayload = null;
        });
    }

    if (modalBtnConfirm) {
        modalBtnConfirm.addEventListener('click', async () => {
            if (!pendingResetPayload) return;
            const { militarId, target } = pendingResetPayload;
            modalBtnConfirm.disabled = true;
            modalBtnConfirm.textContent = 'Resetando...';

            try {
                const res = await fetch('/api/admin/devices', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ militarId, target })
                });
                const data = await res.json();

                if (data.sucesso) {
                    alert(data.mensagem || 'HWID resetado com sucesso!');
                    if (modalConfirm) modalConfirm.style.display = 'none';
                    pendingResetPayload = null;
                    carregarMilitares();
                } else {
                    alert('Erro ao resetar: ' + (data.erro || 'Falha no servidor'));
                }
            } catch (err) {
                console.error('Erro na requisição de reset:', err);
                alert('Erro de conexão ao solicitar o reset de HWID.');
            } finally {
                modalBtnConfirm.disabled = false;
                modalBtnConfirm.textContent = 'Confirmar Reset';
            }
        });
    }

    // Modal de Confirmação de Exclusão de Cadastro
    window.solicitarExcluirMilitar = function(militarId, nome) {
        pendingDeletePayload = { militarId, nome };
        if (!modalDelete) return;

        if (modalDeleteTitle) modalDeleteTitle.textContent = `Excluir Cadastro do Militar #${militarId}?`;
        if (modalDeleteDesc) {
            modalDeleteDesc.innerHTML = `Tem certeza que deseja apagar permanentemente o registro de <strong>#${militarId} (${nome})</strong>?<br><br>Isso removerá a vinculação com a conta do Discord antiga, apagará a trava de HWID do Computador e do Celular, e limpará todos os logs. O militar precisará refazer o vínculo com novo Discord/máquina do zero.`;
        }
        modalDelete.style.display = 'flex';
    };

    if (modalBtnDeleteCancel) {
        modalBtnDeleteCancel.addEventListener('click', () => {
            if (modalDelete) modalDelete.style.display = 'none';
            pendingDeletePayload = null;
        });
    }

    if (modalBtnDeleteConfirm) {
        modalBtnDeleteConfirm.addEventListener('click', async () => {
            if (!pendingDeletePayload) return;
            const { militarId, nome } = pendingDeletePayload;
            modalBtnDeleteConfirm.disabled = true;
            modalBtnDeleteConfirm.textContent = 'Excluindo...';

            try {
                const res = await fetch('/api/admin/devices', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ militarId, action: 'delete' })
                });
                const data = await res.json();

                if (data.sucesso) {
                    alert(data.mensagem || `Cadastro do militar #${militarId} excluído com sucesso!`);
                    if (modalDelete) modalDelete.style.display = 'none';
                    pendingDeletePayload = null;
                    carregarMilitares();
                } else {
                    alert('Erro ao excluir registro: ' + (data.erro || 'Falha no servidor'));
                }
            } catch (err) {
                console.error('Erro na requisição de exclusão:', err);
                alert('Erro de conexão ao solicitar exclusão do cadastro militar.');
            } finally {
                modalBtnDeleteConfirm.disabled = false;
                modalBtnDeleteConfirm.textContent = 'Sim, Excluir Cadastro';
            }
        });
    }

    // Modal de Histórico e Auditoria de Logs
    window.abrirLogsMilitar = function(militarId) {
        const militar = militaresData.find(m => String(m.militarId) === String(militarId));
        if (!militar || !modalLogs) return;

        const nome = militar.nick || militar.globalName || `Militar #${militarId}`;
        if (modalLogsTitle) modalLogsTitle.textContent = `Logs de Acesso - #${militarId} (${nome})`;
        if (modalLogsSubtitle) {
            modalLogsSubtitle.textContent = `Histórico de segurança, tentativas com HWID divergente e autorizações.`;
        }

        const logs = Array.isArray(militar.logs) ? militar.logs : [];

        if (logs.length === 0) {
            modalLogsTimeline.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
                    <div style="font-size: 26px; margin-bottom: 6px;">📋</div>
                    <div style="font-weight: 700; font-size: 14px; margin-bottom: 2px;">Nenhum evento registrado ainda</div>
                    <div style="font-size: 12px;">Os acessos, tentativas com outros dispositivos e resets de HWID aparecerão aqui.</div>
                </div>
            `;
        } else {
            modalLogsTimeline.innerHTML = logs.map(log => {
                let badgeClass = 'info';
                let badgeLabel = 'Info';
                if (log.type === 'LOGIN_SUCCESS') {
                    badgeClass = 'success';
                    badgeLabel = 'Sucesso';
                } else if (log.type === 'HWID_BLOCKED') {
                    badgeClass = 'blocked';
                    badgeLabel = 'HWID Bloqueado';
                } else if (log.type === 'ROLE_MISSING' || log.type === 'DISCORD_NOT_FOUND') {
                    badgeClass = 'blocked';
                    badgeLabel = 'Discord Negado';
                } else if (log.type === 'HWID_RESET') {
                    badgeClass = 'warning';
                    badgeLabel = 'HWID Resetado';
                } else if (log.type === 'DISCORD_LINKED') {
                    badgeClass = 'info';
                    badgeLabel = 'Discord Vinculado';
                } else if (log.type === 'BOT_PENDING') {
                    badgeClass = 'warning';
                    badgeLabel = 'Bot Pendente';
                }

                let timeFormatted = log.timestamp;
                try {
                    const d = new Date(log.timestamp);
                    timeFormatted = d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR');
                } catch(e) {}

                return `
                    <div class="log-entry-item">
                        <div class="log-entry-top">
                            <span class="log-badge-status ${badgeClass}">
                                ${badgeLabel}
                            </span>
                            <span class="log-entry-time">${timeFormatted}</span>
                        </div>
                        <h4 class="log-entry-title">${escaparHtml(log.title || 'Evento do Sistema')}</h4>
                        <p class="log-entry-detail">${escaparHtml(log.detail || '')}</p>
                        ${log.hwid ? `<div class="log-entry-hwid">HWID Registrado: ${escaparHtml(log.hwid)}</div>` : ''}
                    </div>
                `;
            }).join('');
        }

        modalLogs.style.display = 'flex';
    };

    const fecharModalLogs = () => {
        if (modalLogs) modalLogs.style.display = 'none';
    };
    if (modalLogsBtnClose) modalLogsBtnClose.addEventListener('click', fecharModalLogs);
    if (modalLogsBtnFechar) modalLogsBtnFechar.addEventListener('click', fecharModalLogs);

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderizarMilitares(militaresData);
        });
    }

    if (btnRefresh) {
        btnRefresh.addEventListener('click', carregarMilitares);
    }
});
