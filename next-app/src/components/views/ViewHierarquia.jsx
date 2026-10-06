"use client";

export default function ViewHierarquia() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-hierarquia" class="global-view active" style="display:flex; height:100%; width:100%;" >
        <div class="background-overlay bg-hierarquia"></div>
        <main class="main-content" style="height: 100%; overflow-y: auto;">
            <section id="hierarquia-lista" class="content-section active">
                <header class="section-header">
                    <h1>Hierarquia e Patentes</h1>
                    <p>Estrutura organizacional e patentes do Corpo de Bombeiros.</p>
                </header>
                <div class="cards-grid">
                    <div class="card info-card red-card" style="grid-column: 1 / -1;">
                        <h3>Hierarquia do Bombeiro</h3>
                        <p>A hierarquia é um sistema de organização que distribui pessoas em diferentes níveis de
                            autoridade e responsabilidade. Ela estabelece uma cadeia de comando em que os níveis
                            superiores coordenam e supervisionam os inferiores, garantindo disciplina, organização,
                            respeito e eficiência nas operações do Corpo de Bombeiro.<br><br>
                            O respeito à hierarquia é um dos princípios fundamentais da corporação. Cada bombeiro possui
                            funções e responsabilidades específicas, contribuindo para o trabalho em equipe e para o bom
                            funcionamento das operações de emergência.</p>
                    </div>

                    <div class="card info-card cyan-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Recruta <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(RC)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/recruta.png" alt="Recruta"
                                class="card-insignia" data-title="Recruta (RC)"
                                data-desc="Insígnia oficial de Recruta do Corpo de Bombeiros.">
                        </div>
                        <p>Integrante em período inicial de formação, responsável por aprender os procedimentos, normas
                            e fundamentos da corporação, preparando-se para exercer as atribuições de Soldado.</p>
                    </div>

                    <div class="card info-card blue-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Soldado <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(SD)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/soldado.png" alt="Soldado"
                                class="card-insignia" data-title="Soldado (SD)"
                                data-desc="Insígnia oficial de Soldado do Corpo de Bombeiros.">
                        </div>
                        <p>Atua diretamente nas atividades operacionais, atendendo ocorrências, salvamentos e demais
                            missões, sempre sob orientação e comando dos militares de maior graduação.</p>
                    </div>

                    <div class="card info-card green-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Cabo <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(CB)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/cabo.png" alt="Cabo" class="card-insignia"
                                data-title="Cabo (CB)" data-desc="Insígnia oficial de Cabo do Corpo de Bombeiros.">
                        </div>
                        <p>Militar experiente que auxilia na liderança das equipes, orienta Soldados durante o serviço e
                            contribui para a organização e execução das atividades operacionais.</p>
                    </div>

                    <div class="card info-card yellow-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">3º Sargento <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(3º
                                    SGT)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/3 sgt.png" alt="3º Sargento"
                                class="card-insignia" data-title="3º Sargento (3º SGT)"
                                data-desc="Insígnia oficial de 3º Sargento do Corpo de Bombeiros.">
                        </div>
                        <p>Primeiro nível entre os Sargentos, atua na supervisão de equipes, orientação dos militares e
                            apoio aos superiores na organização e execução das operações.</p>
                    </div>

                    <div class="card info-card yellow-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">2º Sargento <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(2º
                                    SGT)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/2 sgt.png" alt="2º Sargento"
                                class="card-insignia" data-title="2º Sargento (2º SGT)"
                                data-desc="Insígnia oficial de 2º Sargento do Corpo de Bombeiros.">
                        </div>
                        <p>Supervisiona equipes e atividades operacionais, auxilia na instrução dos militares e
                            contribui para o cumprimento das ordens, procedimentos e missões da unidade.</p>
                    </div>

                    <div class="card info-card orange-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">1º Sargento <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(1º
                                    SGT)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/1 sgt.png" alt="1º Sargento"
                                class="card-insignia" data-title="1º Sargento (1º SGT)"
                                data-desc="Insígnia oficial de 1º Sargento do Corpo de Bombeiros.">
                        </div>
                        <p>Sargento de maior graduação, exerce papel de liderança e referência para a tropa, auxiliando
                            o comando na disciplina, organização e coordenação das equipes.</p>
                    </div>

                    <div class="card info-card orange-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Subtenente <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(SUB
                                    TEN)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/sub-tenente.png" alt="Subtenente"
                                class="card-insignia" data-title="Subtenente (SUB TEN)"
                                data-desc="Insígnia oficial de Subtenente do Corpo de Bombeiros.">
                        </div>
                        <p>Praça de maior graduação, atua diretamente no apoio ao comando, orientando os militares mais
                            novos e transmitindo sua experiência técnica e operacional à tropa.</p>
                    </div>

                    <div class="card info-card purple-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Aspirante a Oficial <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(ASP)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/aspirante.png" alt="Aspirante a Oficial"
                                class="card-insignia" data-title="Aspirante a Oficial (ASP)"
                                data-desc="Insígnia oficial de Aspirante a Oficial do Corpo de Bombeiros.">
                        </div>
                        <p>Militar em fase inicial do oficialato, desenvolvendo experiência prática de liderança e
                            comando enquanto se prepara para assumir plenamente as funções de Oficial.</p>
                    </div>

                    <div class="card info-card purple-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">2º Tenente <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(2º
                                    TEN)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/2 tenente.png" alt="2º Tenente"
                                class="card-insignia" data-title="2º Tenente (2º TEN)"
                                data-desc="Insígnia oficial de 2º Tenente do Corpo de Bombeiros.">
                        </div>
                        <p>Primeiro posto do oficialato, exerce funções de liderança direta, coordena equipes e auxilia
                            no planejamento e condução das atividades operacionais da unidade.</p>
                    </div>

                    <div class="card info-card blue-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">1º Tenente <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(1º
                                    TEN)</span></h3>
                            <img src="assets/hierarquia/patentes bombeir/1 tenente.png" alt="1º Tenente"
                                class="card-insignia" data-title="1º Tenente (1º TEN)"
                                data-desc="Insígnia oficial de 1º Tenente do Corpo de Bombeiros.">
                        </div>
                        <p>Oficial com maior experiência de comando, responsável por liderar equipes, coordenar
                            operações e apoiar seus superiores no planejamento das missões da unidade.</p>
                    </div>

                    <div class="card info-card green-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Capitão <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(CAP)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/capitao.png" alt="Capitão"
                                class="card-insignia" data-title="Capitão (CAP)"
                                data-desc="Insígnia oficial de Capitão do Corpo de Bombeiros.">
                        </div>
                        <p>Oficial responsável pelo comando e coordenação de equipes e unidades, planejando operações,
                            supervisionando missões e garantindo o cumprimento das diretrizes.</p>
                    </div>

                    <div class="card info-card yellow-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Major <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(MAJ)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/major.png" alt="Major" class="card-insignia"
                                data-title="Major (MAJ)" data-desc="Insígnia oficial de Major do Corpo de Bombeiros.">
                        </div>
                        <p>Oficial superior responsável pela coordenação operacional e administrativa, auxiliando no
                            planejamento, supervisão e gerenciamento das atividades da corporação.</p>
                    </div>

                    <div class="card info-card orange-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Tenente-Coronel <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(TCEL)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/tenente coronel.png" alt="Tenente-Coronel"
                                class="card-insignia" data-title="Tenente-Coronel (TCEL)"
                                data-desc="Insígnia oficial de Tenente-Coronel do Corpo de Bombeiros.">
                        </div>
                        <p>Oficial superior que auxilia diretamente o Coronel na administração e no comando,
                            supervisionando unidades e garantindo o cumprimento das normas e missões.</p>
                    </div>

                    <div class="card info-card red-card">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px;">
                            <h3 style="margin: 0; font-size: 1.35rem;">Coronel <span
                                    style="font-size: 0.7em; opacity: 0.6; font-weight: normal; margin-left: 4px;">(CEL)</span>
                            </h3>
                            <img src="assets/hierarquia/patentes bombeir/coronel.png" alt="Coronel"
                                class="card-insignia" data-title="Coronel (CEL)"
                                data-desc="Insígnia oficial de Coronel do Corpo de Bombeiros.">
                        </div>
                        <p>Posto mais elevado da estrutura apresentada, responsável pela liderança estratégica,
                            planejamento, coordenação de grandes unidades e apoio à direção da corporação.</p>
                    </div>

                    <div class="card info-card red-card card-quadro-patentes"
                        style="padding: 16px; display: flex; flex-direction: column;">
                        <h3
                            style="margin: 0 0 12px 0; font-size: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                            Quadro Geral de Patentes
                            <span style="font-size: 0.65em; opacity: 0.7; font-weight: normal; color: #ef4444;">🔍
                                Clique para ampliar</span>
                        </h3>
                        <div
                            style="width: 100%; flex: 1; min-height: 380px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 8px; position: relative;">
                            <img src="assets/hierarquia/patentes.png" alt="Quadro de Patentes do Corpo de Bombeiros"
                                data-title="CORPO DE BOMBEIROS - PATENTES DA MENOR À MAIOR"
                                data-desc="Estrutura completa das patentes e insígnias do Corpo de Bombeiros: Praças e Oficiais."
                                style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 8px; cursor: pointer; display: block; transition: transform 0.3s ease, filter 0.3s ease;"
                                onmouseover="this.style.transform='scale(1.02)'; this.style.filter='brightness(1.08)';"
                                onmouseout="this.style.transform='scale(1)'; this.style.filter='brightness(1)';">
                        </div>
                    </div>

                    <div class="card info-card purple-card card-principios-hierarquia"
                        style="display: flex; flex-direction: column; justify-content: center;">
                        <h3 style="margin-bottom: 14px;">Princípios da Hierarquia</h3>
                        <p style="margin: 0; line-height: 1.8; font-size: 0.95rem;">
                            ➤ Respeitar os superiores e tratar os subordinados com profissionalismo.<br>
                            ➤ Cumprir ordens legais e manter a disciplina.<br>
                            ➤ Trabalhar em equipe para garantir a segurança de todos.<br>
                            ➤ Agir com ética, responsabilidade e comprometimento.<br>
                            ➤ Representar a corporação com respeito dentro e fora do serviço.
                        </p>
                    </div>

                    <div class="card info-card blue-card" style="grid-column: 1 / -1; text-align: center;">
                        <p style="font-size: 1.15rem; font-style: italic;">"A hierarquia e a disciplina são os pilares
                            que sustentam a organização, a eficiência e a excelência do Corpo de Bombeiro."</p>
                    </div>
                </div>
            </section>
            <!-- Rodapé Centralizado -->
            <footer class="site-footer">
                <p>&copy; 2026 ERREJOTA. Todos os direitos reservados.</p>
            </footer>
        </main>
    </div>

    </div>` }} />
  );
}