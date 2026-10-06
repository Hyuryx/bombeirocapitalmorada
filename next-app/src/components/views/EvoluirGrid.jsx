import React from "react";
import ElectricBorder from "../animations/ElectricBorder";

export default function EvoluirGrid() {
return (
<div className="evoluir-grid">

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Contratação ➔ Aluno"
                            data-tempo="Imediato (Na Contratação)" data-tipo="Início de Carreira"
                            data-cursos="Modulação e Atendimento Externo"
                            data-detalhes="Ao ser contratado, você recebe a patente de <strong>Aluno</strong> e os cursos iniciais de <strong>Modulação e Atendimento Externo</strong>."
                            data-obs="Início da formação básica e integração às rotinas do Corpo de Bombeiros."
                            data-frase="O ponto de partida de uma nobre missão dedicada a salvar vidas com disciplina e honra.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-contrato">📌 Contratação</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 1/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Contratação ➔ Aluno</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Cursos Iniciais:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso verde">📻 Modulação</span>
                                        <span className="evoluir-tag-curso verde">🚑 Atendimento Externo</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;O ponto de partida de uma nobre missão dedicada a salvar vidas com disciplina e
                                    honra.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Aluno ➔ Soldado" data-tempo="3 dias"
                            data-tipo="Tempo de Serviço"
                            data-cursos="Modulação, Atendimento Externo, Envio de Placas e CNH"
                            data-detalhes="Ao se tornar Soldado, você deve se aperfeiçoar em <strong>Modulação e Atendimento Externo</strong>, além de enviar as <strong>Placas e a CNH</strong>."
                            data-obs="Documentação obrigatória: Placas veiculares e Carteira Nacional de Habilitação (CNH)."
                            data-frase="A base operacional e a prontidão para responder com eficiência em qualquer emergência da corporação.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 3 dias</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 2/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Aluno ➔ Soldado</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Requisitos & Documentos:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">📻 Modulação</span>
                                        <span className="evoluir-tag-curso azul">🚑 Atendimento Externo</span>
                                        <span className="evoluir-tag-curso dourado">📄 Envio de Placas & CNH</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;A base operacional e a prontidão para responder com eficiência em qualquer
                                    emergência da corporação.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Soldado ➔ Cabo" data-tempo="25 horas"
                            data-tipo="Tempo de Serviço" data-cursos="Mod/Ext OK"
                            data-detalhes="Requisito de <strong>Mod/Ext OK</strong> (aprovação e validação prática de Modulação e Atendimento Externo)."
                            data-obs="Cumprimento mínimo de 25 horas ativas com conduta disciplinar aprovada."
                            data-frase="A graduação que solidifica a postura exemplar e a liderança sobre as primeiras linhas de combate.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 25 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 3/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Soldado ➔ Cabo</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Requisito Obrigatório:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso verde">✅ Mod/Ext OK</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;A graduação que solidifica a postura exemplar e a liderança sobre as primeiras
                                    linhas de combate.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Cabo ➔ 3° Sargento" data-tempo="50 horas"
                            data-tipo="Tempo de Serviço" data-cursos="🧑✈️ Tripulante, 🪂 Paraquedista"
                            data-detalhes="Requisitos: <strong>🧑✈️ Tripulante</strong> e <strong>🪂 Paraquedista</strong> devidamente concluídos e certificados."
                            data-obs="Habilitação tática para operações aerotransportadas e salvamentos especiais."
                            data-frase="Preparado para o salto e pronto para liderar guarnições nos cenários mais desafiadores.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 50 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 4/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Cabo ➔ 3° Sargento</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Cursos Obrigatórios:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">🧑✈️ Tripulante</span>
                                        <span className="evoluir-tag-curso dourado">🪂 Paraquedista</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Preparado para o salto e pronto para liderar guarnições nos cenários mais
                                    desafiadores.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="3° Sargento ➔ 2° Sargento" data-tempo="70 horas"
                            data-tipo="Tempo de Serviço" data-cursos="🚤 COER"
                            data-detalhes="Requisito: <strong>🚤 COER</strong> (Comando de Operações de Emergência e Resgate)."
                            data-obs="Domínio avançado em manobras de emergência, controle de viaturas especiais e suporte tático."
                            data-frase="Capacitação tática de elite e comando eficiente em situações críticas de alta pressão.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 70 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 5/13</span>
                                </div>
                                <div className="evoluir-card-titulo">3° Sargento ➔ 2° Sargento</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Curso Obrigatório:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">🚤 COER</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Capacitação tática de elite e comando eficiente em situações críticas de alta
                                    pressão.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="2° Sargento ➔ 1° Sargento" data-tempo="90 horas"
                            data-tipo="Tempo de Serviço" data-cursos="Instrutor - Externo/Modulação, Instrutor Geral"
                            data-detalhes="Requisitos: <strong>Instrutor - Externo/Modulação</strong> e qualificação como <strong>Instrutor</strong>."
                            data-obs="Transmissão de conhecimento e formação pedagógica de novos recrutas e soldados."
                            data-frase="Ensinar é liderar: o conhecimento repassado com rigor e disciplina salva vidas no futuro.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 90 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 6/13</span>
                                </div>
                                <div className="evoluir-card-titulo">2° Sargento ➔ 1° Sargento</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Qualificações Obrigatórias:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso">🎓 Instrutor - Externo/Mod</span>
                                        <span className="evoluir-tag-curso">🎖️ Instrutor</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Ensinar é liderar: o conhecimento repassado com rigor e disciplina salva vidas no
                                    futuro.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="1° Sargento ➔ Sub-Tenente" data-tempo="120 horas"
                            data-tipo="Tempo de Serviço" data-cursos="🌊 Resgate Aquático, Vistoria"
                            data-detalhes="Requisitos: <strong>🌊 Resgate Aquático</strong> e formação de <strong>Vistoria</strong>."
                            data-obs="A mais alta graduação das praças, sendo referência técnica e apoio primordial ao Comando."
                            data-frase="A mais alta graduação das praças: guardião da disciplina e elo fundamental com o oficialato.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 120 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 7/13</span>
                                </div>
                                <div className="evoluir-card-titulo">1° Sargento ➔ Sub-Tenente</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Cursos Obrigatórios:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">🌊 Resgate Aquático</span>
                                        <span className="evoluir-tag-curso dourado">📋 Vistoria</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;A mais alta graduação das praças: guardião da disciplina e elo fundamental com o
                                    oficialato.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Sub-Tenente ➔ Aspirante" data-tempo="150 horas"
                            data-tipo="Tempo de Serviço" data-cursos="Instrutor - Resgate Aquático, Instrutor - COER"
                            data-detalhes="Requisitos: <strong>Instrutor - Resgate Aquático</strong> e <strong>Instrutor - COER</strong>."
                            data-obs="Ingresso no quadro de oficiais em formação, com atuação pedagógica de alto nível."
                            data-frase="Transição para o oficialato unindo a bagagem operacional à liderança estratégica da tropa.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 150 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 8/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Sub-Tenente ➔ Aspirante</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Especializações de Instrução:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">🌊 Instrutor - Aquático</span>
                                        <span className="evoluir-tag-curso">🚤 Instrutor - COER</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Transição para o oficialato unindo a bagagem operacional à liderança estratégica da
                                    tropa.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="Aspirante ➔ 2° Tenente" data-tempo="180 horas"
                            data-tipo="Tempo de Serviço" data-cursos="⛰️ Resgate em Montanhas, Recrutador"
                            data-detalhes="Requisitos: <strong>⛰️ Resgate em Montanhas</strong> e função ativa de <strong>Recrutador</strong>."
                            data-obs="Oficial subalterno apto para o comando direto de ocorrências de grande porte e expansão do efetivo."
                            data-frase="Nas alturas ou em solo, a liderança de pelotão pautada pela honra, coragem e eficácia.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 180 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 9/13</span>
                                </div>
                                <div className="evoluir-card-titulo">Aspirante ➔ 2° Tenente</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Requisitos Obrigatórios:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso verde">⛰️ Resgate em Montanha</span>
                                        <span className="evoluir-tag-curso dourado">🎯 Recrutador</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Nas alturas ou em solo, a liderança de pelotão pautada pela honra, coragem e
                                    eficácia.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir" data-titulo="2° Tenente ➔ 1° Tenente" data-tempo="210 horas"
                            data-tipo="Tempo de Serviço" data-cursos="Instrutor - Resgate em Montanha"
                            data-detalhes="Requisito: <strong>Instrutor - Resgate em Montanha</strong>."
                            data-obs="Mestria consolidada em salvamentos verticais e capacidade de avaliação técnica da tropa."
                            data-frase="Comando experiente e capacidade técnica para forjar novos especialistas de resgate vertical.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-tempo">⏱️ 210 horas</span>
                                    <span style={{"fontSize":"0.75rem","color":"#9ca3af"}}>Etapa 10/13</span>
                                </div>
                                <div className="evoluir-card-titulo">2° Tenente ➔ 1° Tenente</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Qualificação de Instrução:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso verde">⛰️ Instrutor - Montanha</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;Comando experiente e capacidade técnica para forjar novos especialistas de resgate
                                    vertical.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir merito" data-titulo="1° Tenente ➔ Capitão" data-tempo="Por Mérito"
                            data-tipo="Promoção por Mérito" data-cursos="🚁 Resgate Aéreo, Instrutor - Tripulante, Instrutor de Paraquedista"
                            data-detalhes="Promoção: <strong>Por Mérito</strong>. Requisitos técnicos: <strong>🚁 Resgate Aéreo</strong>, <strong>Instrutor - Tripulante</strong> e <strong>Instrutor de Paraquedista</strong>."
                            data-obs="Comando de companhias operacionais, exigindo conduta militar irrepreensível e aprovação do Alto Comando."
                            data-frase="O comando de companhia exige coragem, retidão moral e excelência operacional nos ares e em terra.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-merito">⭐ Por Mérito</span>
                                    <span style={{"fontSize":"0.75rem","color":"#fbbf24"}}>Oficial Intermediário</span>
                                </div>
                                <div className="evoluir-card-titulo" style={{"color":"#fbbf24"}}>⭐ 1° Tenente ➔ Capitão</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Requisitos Obrigatórios:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso azul">🚁 Resgate Aéreo</span>
                                        <span className="evoluir-tag-curso">🧑✈️ Instrutor - Tripulante</span>
                                        <span className="evoluir-tag-curso">🪂 Instrutor de Paraquedista</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;O comando de companhia exige coragem, retidão moral e excelência operacional nos
                                    ares e em terra.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir merito" data-titulo="Capitão ➔ Major" data-tempo="Por Mérito"
                            data-tipo="Promoção por Mérito" data-cursos="Comando de Batalhão & Mérito Operacional"
                            data-detalhes="Promoção: <strong>Por Mérito</strong>. Atribuição de oficial superior para coordenação de batalhões e unidades operacionais."
                            data-obs="Avaliação de liderança estratégica, responsabilidade na gestão do efetivo e lealdade institucional."
                            data-frase="A condução estratégica da tropa com sabedoria, justiça e visão de futuro.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-merito">⭐ Por Mérito</span>
                                    <span style={{"fontSize":"0.75rem","color":"#fbbf24"}}>Oficial Superior</span>
                                </div>
                                <div className="evoluir-card-titulo" style={{"color":"#fbbf24"}}>⭐ Capitão ➔ Major</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Critério de Ascensão:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso dourado">⭐ Promoção por Mérito</span>
                                        <span className="evoluir-tag-curso azul">🛡️ Comando de Batalhão</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;A condução estratégica da tropa com sabedoria, justiça e visão de futuro.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                        {/**/}
                        <ElectricBorder color="#a855f7" speed={1} chaos={0.15} borderRadius={8}>
<div className="card-evoluir merito" data-titulo="Major ➔ Tenente-Coronel" data-tempo="Por Mérito"
                            data-tipo="Promoção por Mérito" data-cursos="Estado-Maior & Alto Comando"
                            data-detalhes="Promoção: <strong>Por Mérito</strong>. Alto oficialato encarregado da supervisão geral e apoio direto ao Comando Geral."
                            data-obs="Decisão soberana do Comando Geral baseada no histórico exemplar de conduta e honra militar."
                            data-frase="No topo da hierarquia, a honra de guiar homens e mulheres que juraram salvar vidas.">
                            <div>
                                <div className="evoluir-card-header">
                                    <span className="evoluir-badge-merito">⭐ Por Mérito</span>
                                    <span style={{"fontSize":"0.75rem","color":"#fbbf24"}}>Alto Comando</span>
                                </div>
                                <div className="evoluir-card-titulo" style={{"color":"#fbbf24"}}>⭐ Major ➔ Tenente-Coronel</div>
                                <div className="evoluir-cursos-box">
                                    <div className="evoluir-cursos-label">Critério de Ascensão:</div>
                                    <div className="evoluir-tags-container">
                                        <span className="evoluir-tag-curso dourado">⭐ Promoção por Mérito</span>
                                        <span className="evoluir-tag-curso">👑 Estado-Maior</span>
                                    </div>
                                </div>
                                <div className="evoluir-frase-preview">&quot;No topo da hierarquia, a honra de guiar homens e mulheres que juraram salvar
                                    vidas.&quot;</div>
                            </div>
                            <button className="evoluir-btn-modal" type="button">
                                <span>Ver Detalhes</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
</div>
</ElectricBorder>

                    </div>
                
);
}