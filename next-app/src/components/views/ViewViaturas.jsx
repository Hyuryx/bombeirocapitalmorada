"use client";
import React from "react";
import ElectricBorder from "../animations/ElectricBorder";

export default function ViewViaturas() {
  return (
    <div id="view-viaturas" className="global-view" style={{ display: "none" }}>
      <div className="background-overlay bg-viaturas"></div>
      <main className="main-content" style={{ height: "100%", overflowY: "auto" }}>
        <section id="viaturas-qsv" className="content-section active">
          <header className="section-header">
            <h1>Posições e Viaturas (QSV)</h1>
            <p>Funções na viatura e catálogo oficial.</p>
          </header>
          
          <div className="cards-grid" style={{ marginBottom: "20px" }}>
            <ElectricBorder color="#60a5fa" speed={1} chaos={0.15} borderRadius={8}>
              <div className="card info-card blue-card" style={{ height: "100%", border: "none" }}>
                <h3>P1 - Condutor</h3>
                <p>Responsável pela condução segura, rota, posicionamento da viatura e atenção ao trânsito.</p>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#fb923c" speed={1} chaos={0.15} borderRadius={8}>
              <div className="card info-card orange-card" style={{ height: "100%", border: "none" }}>
                <h3>P2 - Comunicação</h3>
                <p>Pode modular com a Central, repassar informações importantes e auxiliar na organização da ocorrência.</p>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#4ade80" speed={1} chaos={0.15} borderRadius={8}>
              <div className="card info-card green-card" style={{ height: "100%", border: "none" }}>
                <h3>P3 - Apoio Operacional</h3>
                <p>Auxilia na sinalização, atendimento, equipamentos, segurança do local e demais funções.</p>
              </div>
            </ElectricBorder>
          </div>

          <div className="cards-grid">
            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-01: Protesto</h3>
                <img src="assets/viaturas/protesto.png" alt="QSV-01" data-title="QSV-01: Protesto"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura para protesto.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações de protesto e presença preventiva em ocorrências de grande público ou risco elevado.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-02: SUV de Resgate</h3>
                <img src="assets/viaturas/jaguar.png" alt="QSV-02" data-title="QSV-02: SUV de Resgate"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura SUV de Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de resposta rápida, ágil e versátil, com capacidade para carregar equipamentos essenciais de Suporte Básico de Vida (SBV) e trauma.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-03: Moto Resgate</h3>
                <img src="assets/viaturas/moto.png" alt="QSV-03" data-title="QSV-03: Moto Resgate"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Moto Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de altíssima agilidade (batedor). Primeira resposta em locais de trânsito intenso, garantindo atendimento imediato até a chegada da viatura principal.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-04: Pickup Resgate</h3>
                <img src="assets/viaturas/caminhotes.png" alt="QSV-04" data-title="QSV-04: Pickup Resgate"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Pickup Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura utilitária para transporte de pranchas longas, equipamentos pesados de desencarceramento e apoio logístico em terrenos irregulares.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-05: Aspirante</h3>
                <img src="assets/viaturas/aspirante.png" alt="QSV-05" data-title="QSV-05: Aspirante"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Aspirante.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-06: Helicóptero</h3>
                <img src="assets/viaturas/helicoptero.png" alt="QSV-06" data-title="QSV-06: Helicóptero"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da aeronave oficial do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em missões de resgate, busca e salvamento e transporte aeromédico em áreas de difícil acesso.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#f87171" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card red-card" style={{ height: "100%", border: "none" }}>
                <h3>QSV-07: Tenente</h3>
                <img src="assets/viaturas/caminhonete_tenente.png" alt="QSV-07" data-title="QSV-07: Tenente"
                     data-desc="<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Tenente.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

            <ElectricBorder color="#facc15" speed={1.5} chaos={0.2} borderRadius={8}>
              <div className="card info-card yellow-card" style={{ height: "100%", border: "none" }}>
                <h3>Comandos da QSV</h3>
                <img src="assets/viaturas/comandos_da_qsv.png" alt="Comandos da QSV" data-title="Comandos da QSV"
                     data-desc="<div class='modal-info-item'><strong>📖 INSTRUÇÃO DE QSV</strong><p>Guia visual com os atalhos e comandos oficiais para as viaturas do Corpo de Bombeiros.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Controles de giroflex, rádio, sirenes e demais sistemas integrados do veículo.</p></div>"
                     style={{ width: "100%", borderRadius: "8px", marginTop: "10px", cursor: "pointer" }} />
              </div>
            </ElectricBorder>

          </div>
        </section>
        <footer className="site-footer">
          <p>&copy; 2026 ERREJOTA. Todos os direitos reservados.</p>
        </footer>
      </main>
    </div>
  );
}