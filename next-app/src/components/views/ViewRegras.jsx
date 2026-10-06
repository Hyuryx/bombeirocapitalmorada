"use client";

export default function ViewRegras() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-regras" class="global-view active" style="display:flex; height:100%; width:100%;" >
        <div class="background-overlay bg-regras"></div>
        <main class="main-content" style="height: 100%; overflow-y: auto;">
            <section id="regras-condutas" class="content-section active">
                <header class="section-header">
                    <h1>Regras e Condutas</h1>
                    <p>Postura operacional, restrições e diretrizes do departamento.</p>
                </header>
                <div class="cards-grid">
                    <div class="card info-card blue-card">
                        <h3>Respeito e Hierarquia</h3>
                        <p>➤ Todo militar deverá respeitar superiores, subordinados e civis.<br>
                            ➤ A hierarquia deverá ser seguida em qualquer situação operacional.<br>
                            ➤ Discussões, desrespeito ou insubordinação serão punidos.<br>
                            ➤ Ordens diretas só poderão ser contestadas após a ocorrência.</p>
                    </div>

                    <div class="card info-card orange-card">
                        <h3>Conduta Operacional</h3>
                        <p>➤ É obrigatório manter postura profissional em serviço.<br>
                            ➤ O uso correto do rádio é essencial durante ocorrências.<br>
                            ➤ É proibido abandonar viaturas sem autorização.<br>
                            ➤ Todo chamado deverá ser atendido com prioridade e responsabilidade.<br>
                            ➤ Código 4 deverá ser informado ao finalizar qualquer ocorrência.<br>
                            ➤ É extremamente proibido qualquer tipo de corrupção dentro da corporação.<br>
                            ➤ Favorecimentos, abuso de autoridade, recebimento de vantagens ilegais ou quebra de conduta
                            ética resultarão em expulsão imediata.</p>
                    </div>

                    <div class="card info-card green-card">
                        <h3>Comunicação via Rádio</h3>
                        <p>➤ Evitar flood, gritos ou brincadeiras no rádio.<br>
                            ➤ Utilizar linguagem operacional e objetiva.<br>
                            ➤ Sempre identificar patente e nome ao iniciar transmissão.</p>
                    </div>

                    <div class="card info-card purple-card">
                        <h3>Viaturas e Aeronaves</h3>
                        <p>➤ Viaturas deverão ser utilizadas apenas em serviço.<br>
                            ➤ É proibido dirigir de forma irresponsável sem necessidade operacional.<br>
                            ➤ Abastecimento e organização da viatura são responsabilidade da equipe.<br>
                            ➤ Danos causados por mau uso poderão gerar punição.<br>
                            ➤ É extremamente proibido utilizar helicópteros da corporação sem possuir a
                            habilitação/licença necessária.<br>
                            ➤ O uso indevido de aeronaves poderá resultar em suspensão severa ou expulsão da corporação.
                        </p>
                    </div>

                    <div class="card info-card yellow-card">
                        <h3>Fardamento</h3>
                        <p>➤ O uso do fardamento é obrigatório em serviço.<br>
                            ➤ É proibido misturar peças inadequadas ou usar acessórios exagerados.<br>
                            ➤ O militar deverá manter aparência organizada e profissional.</p>
                    </div>

                    <div class="card info-card red-card">
                        <h3>Punições</h3>
                        <p>➤ As punições poderão incluir:</p>
                        <ul style="margin-top: 5px; margin-left: 20px;">
                            <li>Advertência verbal</li>
                            <li>Advertência escrita</li>
                            <li>Suspensão</li>
                            <li>Rebaixamento</li>
                            <li>Expulsão</li>
                        </ul>
                    </div>

                    <div class="card info-card blue-card">
                        <h3>Disposições Finais</h3>
                        <p>➤ Todo integrante do CBM deverá prezar pela disciplina, honra e compromisso.<br>
                            ➤ O desconhecimento das regras não isenta punições.<br>
                            ➤ Este regulamento poderá ser atualizado pelo Comando Geral.</p>
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