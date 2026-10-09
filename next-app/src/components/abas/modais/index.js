export default `
<div id="modal-destaque" class="modal-destaque">
        <div class="modal-destaque-content">
            <button class="modal-destaque-close" aria-label="Fechar">×</button>
            <img id="modal-destaque-img" src="" alt="Imagem Destaque" class="modal-destaque-img">
            <div id="modal-destaque-overlay" class="modal-destaque-text-overlay">
                <button class="modal-destaque-text-close" aria-label="Fechar texto">×</button>
                <div id="modal-destaque-text" class="modal-destaque-text-content">
                </div>
            </div>
        </div>
    </div>
<div id="modal-evento-precos" class="modal-evento-precos" aria-hidden="true">
        <div class="modal-evento-backdrop"></div>
        <div class="modal-evento-container">
            <button id="modal-evento-close" class="modal-evento-close" title="Fechar aviso (ESC)" aria-label="Fechar">×</button>
            <div class="modal-evento-img-wrapper">
                <img src="assets/eventos/precos1.png" alt="Aviso de Preços e Eventos" class="modal-evento-img" loading="eager">
            </div>
        </div>
    </div>
<div id="image-modal" class="modal">
        <span class="modal-close">×</span>
        <div class="modal-wrapper">
            <div class="modal-image-container">
                <img class="modal-content" id="modal-img">
            </div>
            <div class="modal-info-panel" id="modal-info-panel">
                <h2 id="modal-title"></h2>
                <p id="modal-desc"></p>
            </div>
        </div>
    </div>
<div id="modal-evoluir" class="modal-evoluir" aria-hidden="true">
        <div class="modal-evoluir-container">
            <button id="modal-evoluir-close" class="modal-evoluir-close" title="Fechar (ESC)" aria-label="Fechar">×</button>
            <div class="modal-evoluir-header">
                <span id="modal-evoluir-tag" class="evoluir-badge-tempo">Etapa</span>
                <h2 id="modal-evoluir-titulo" class="modal-evoluir-titulo">Título da Promoção</h2>
            </div>

            <div class="modal-evoluir-section">
                <div class="modal-evoluir-section-label">
                    <span>⏱️</span> Tempo Mínimo de Serviço
                </div>
                <div class="modal-evoluir-box">
                    <p id="modal-evoluir-tempo" style="color: #60a5fa; font-size: 1.1rem; font-weight: 700; margin: 0;">
                    </p>
                </div>
            </div>

            <div class="modal-evoluir-section">
                <div class="modal-evoluir-section-label">
                    <span>📚</span> Cursos &amp; Especializações Obrigatórias
                </div>
                <div class="modal-evoluir-box">
                    <div id="modal-evoluir-cursos" class="evoluir-tags-container"></div>
                </div>
            </div>

            <div class="modal-evoluir-section" id="modal-evoluir-obs-wrapper">
                <div class="modal-evoluir-section-label">
                    <span>📋</span> Requisitos e Diretrizes Adicionais
                </div>
                <div class="modal-evoluir-box">
                    <p id="modal-evoluir-detalhes" style="color: #cbd5e1; margin: 0; line-height: 1.5; font-size: 0.92rem;"></p>
                    <p id="modal-evoluir-obs" style="color: #94a3b8; margin-top: 8px; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
                    </p>
                </div>
            </div>

            <div class="modal-evoluir-frase-box">
                <div style="font-size: 0.75rem; color: #c084fc; text-transform: uppercase; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">
                    ✨ Lema &amp; Compromisso Operacional:
                </div>
                <p id="modal-evoluir-frase" class="modal-evoluir-frase-texto"></p>
            </div>

            <button id="modal-evoluir-btn-fechar" class="modal-evoluir-footer-btn" type="button">
                Entendido / Fechar
            </button>
        </div>
    </div>
`;
