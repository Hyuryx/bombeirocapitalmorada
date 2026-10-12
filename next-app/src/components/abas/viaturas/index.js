export default `<div id="view-viaturas" class="global-view" style="display: none;">
        <div class="background-overlay bg-viaturas"></div>
        <div class="app-container">
            <aside class="sidebar" id="sidebar-default-viaturas"></aside>
            <main class="main-content" style="height: 100%; overflow-y: auto;">
            <style>
                @keyframes neon-breathe-babyblue {
                    0% {
                        box-shadow: 0 0 2px rgba(64, 196, 255, 0.4), 0 0 10px rgba(64, 196, 255, 0.1);
                        border: 1px solid rgba(64, 196, 255, 0.3);
                    }
                    100% {
                        box-shadow: 0 0 5px rgba(64, 196, 255, 0.8), 0 0 20px rgba(64, 196, 255, 0.6), 0 0 40px rgba(64, 196, 255, 0.3);
                        border: 1px solid rgba(64, 196, 255, 1);
                    }
                }
                .neon-card-viatura {
                    background: transparent !important;
                    animation: neon-breathe-babyblue 4s infinite alternate ease-in-out;
                    border-radius: 12px;
                }
            </style>
            <section id="viaturas-qsv" class="content-section active">
                <header class="section-header">
                    <h1 class="glitch-title">Posições e Viaturas (QSV)</h1>
                    <p class="falling-subtitle" data-highlight="Funções,viatura,catálogo">Funções na viatura e catálogo oficial.</p>
                </header>
                <div id="viaturas-posicoes-grid" class="cards-grid" style="margin-bottom: 10px; gap: 10px;">
                    <div class="card info-card neon-card-viatura" style="padding: 10px 15px; min-height: unset;">
                        <h3 style="margin-bottom: 5px; font-size: 1.1rem; color: #40c4ff;">P1 - Condutor</h3>
                        <p style="font-size: 0.9rem; margin: 0; color: #fff;">Responsável pela condução segura, rota, posicionamento da viatura e atenção ao trânsito.</p>
                    </div>
                    <div class="card info-card neon-card-viatura" style="padding: 10px 15px; min-height: unset;">
                        <h3 style="margin-bottom: 5px; font-size: 1.1rem; color: #40c4ff;">P2 - Comunicação</h3>
                        <p style="font-size: 0.9rem; margin: 0; color: #fff;">Pode modular com a Central, repassar informações importantes e auxiliar na organização da
                            ocorrência.</p>
                    </div>
                    <div class="card info-card neon-card-viatura" style="padding: 10px 15px; min-height: unset;">
                        <h3 style="margin-bottom: 5px; font-size: 1.1rem; color: #40c4ff;">P3 - Apoio Operacional</h3>
                        <p style="font-size: 0.9rem; margin: 0; color: #fff;">Auxilia na sinalização, atendimento, equipamentos, segurança do local e demais funções.</p>
                    </div>
                </div>
                <div id="viaturas-carousel-grid" class="cards-grid">
                    <div class="card info-card red-card">
                        <h3>QSV-01: Protesto</h3>
                        <img src="assets/viaturas/protesto.png" alt="QSV-01" data-title="QSV-01: Protesto" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura para protesto.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações de protesto e presença preventiva em ocorrências de grande público ou risco elevado.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-02: SUV de Resgate</h3>
                        <img src="assets/viaturas/jaguar.png" alt="QSV-02" data-title="QSV-02: SUV de Resgate" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura SUV de Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de resposta rápida, ágil e versátil, com capacidade para carregar equipamentos essenciais de Suporte Básico de Vida (SBV) e trauma.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-03: Moto Resgate</h3>
                        <img src="assets/viaturas/moto.png" alt="QSV-03" data-title="QSV-03: Moto Resgate" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Moto Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de altíssima agilidade (batedor). Primeira resposta em locais de trânsito intenso, garantindo atendimento imediato até a chegada da viatura principal.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-04: Pickup Resgate</h3>
                        <img src="assets/viaturas/caminhotes.png" alt="QSV-04" data-title="QSV-04: Pickup Resgate" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Pickup Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura utilitária para transporte de pranchas longas, equipamentos pesados de desencarceramento e apoio logístico em terrenos irregulares.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-05: Aspirante</h3>
                        <img src="assets/viaturas/aspirante.png" alt="QSV-05" data-title="QSV-05: Aspirante" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Aspirante.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-06: Helicóptero</h3>
                        <img src="assets/viaturas/helicoptero.png" alt="QSV-06" data-title="QSV-06: Helicóptero" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da aeronave oficial do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em missões de resgate, busca e salvamento e transporte aeromédico em áreas de difícil acesso.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card red-card">
                        <h3>QSV-07: Tenente</h3>
                        <img src="assets/viaturas/caminhonete_tenente.png" alt="QSV-07" data-title="QSV-07: Tenente" data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Tenente.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                    <div class="card info-card yellow-card">
                        <h3>Comandos da QSV</h3>
                        <img src="assets/viaturas/comandos_da_qsv.png" alt="Comandos da QSV" data-title="Comandos da QSV" data-desc="<div class='modal-info-item'><strong>📖 INSTRUÇÃO DE QSV</strong><p>Guia visual com os atalhos e comandos oficiais para as viaturas do Corpo de Bombeiros.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Controles de giroflex, rádio, sirenes e demais sistemas integrados do veículo.</p></div>" style="width: 100%; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                    </div>
                </div>
            </section>
            <!-- Rodapé Centralizado -->
            <footer class="site-footer">
                <p>© 2026 ERREJOTA. Todos os direitos reservados.</p>
            </footer>
        </main>
    </div>
</div>`;
