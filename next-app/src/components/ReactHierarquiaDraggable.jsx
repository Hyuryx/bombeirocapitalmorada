'use client';
import React, { useRef } from 'react';
import { DraggableCardContainer, DraggableCardBody } from '@/components/ui/draggable-card';

const patentes = [
  { rank: "Recruta (RC)", color: "cyan-card", img: "recruta.png", top: "10%", left: "30%", rot: -4, desc: "Integrante em período inicial de formação, responsável por aprender os procedimentos, normas e fundamentos da corporação, preparando-se para exercer as atribuições de Soldado." },
  { rank: "Soldado (SD)", color: "blue-card", img: "soldado.png", top: "15%", left: "35%", rot: 3, desc: "Atua diretamente nas atividades operacionais, atendendo ocorrências, salvamentos e demais missões, sempre sob orientação e comando dos militares de maior graduação." },
  { rank: "Cabo (CB)", color: "green-card", img: "cabo.png", top: "8%", left: "40%", rot: 6, desc: "Militar experiente que auxilia na liderança das equipes, orienta Soldados durante o serviço e contribui para a organização e execução das atividades operacionais." },
  { rank: "3º Sargento (3º SGT)", color: "yellow-card", img: "3 sgt.png", top: "20%", left: "45%", rot: -5, desc: "Primeiro nível entre os Sargentos, atua na supervisão de equipes, orientação dos militares e apoio aos superiores na organização e execução das operações." },
  { rank: "2º Sargento (2º SGT)", color: "yellow-card", img: "2 sgt.png", top: "12%", left: "50%", rot: 2, desc: "Supervisiona equipes e atividades operacionais, auxilia na instrução dos militares e contribui para o cumprimento das ordens, procedimentos e missões da unidade." },
  { rank: "1º Sargento (1º SGT)", color: "orange-card", img: "1 sgt.png", top: "25%", left: "55%", rot: -3, desc: "Sargento de maior graduação, exerce papel de liderança e referência para a tropa, auxiliando o comando na disciplina, organização e coordenação das equipes." },
  { rank: "Subtenente (SUB TEN)", color: "orange-card", img: "sub-tenente.png", top: "18%", left: "60%", rot: 4, desc: "Praça de maior graduação, atua diretamente no apoio ao comando, orientando os militares mais novos e transmitindo sua experiência técnica e operacional à tropa." },
  
  { rank: "Aspirante a Oficial (ASP)", color: "purple-card", img: "aspirante.png", top: "30%", left: "32%", rot: -2, desc: "Militar em fase inicial do oficialato, desenvolvendo experiência prática de liderança e comando enquanto se prepara para assumir plenamente as funções de Oficial." },
  { rank: "2º Tenente (2º TEN)", color: "purple-card", img: "2 tenente.png", top: "35%", left: "38%", rot: 5, desc: "Primeiro posto do oficialato, exerce funções de liderança direta, coordena equipes e auxilia no planejamento e condução das atividades operacionais da unidade." },
  { rank: "1º Tenente (1º TEN)", color: "blue-card", img: "1 tenente.png", top: "28%", left: "42%", rot: -4, desc: "Oficial com maior experiência de comando, responsável por liderar equipes, coordenar operações e apoiar seus superiores no planejamento das missões da unidade." },
  { rank: "Capitão (CAP)", color: "green-card", img: "capitao.png", top: "40%", left: "48%", rot: 3, desc: "Oficial responsável pelo comando e coordenação de equipes e unidades, planejando operações, supervisionando missões e garantindo o cumprimento das diretrizes." },
  { rank: "Major (MAJ)", color: "yellow-card", img: "major.png", top: "32%", left: "52%", rot: -6, desc: "Oficial superior responsável pela coordenação operacional e administrativa, auxiliando no planejamento, supervisão e gerenciamento das atividades da corporação." },
  { rank: "Tenente-Coronel (TCEL)", color: "orange-card", img: "tenente coronel.png", top: "45%", left: "58%", rot: 4, desc: "Oficial superior que auxilia diretamente o Coronel na administração e no comando, supervisionando unidades e garantindo o cumprimento das normas e missões." },
  { rank: "Coronel (CEL)", color: "red-card", img: "coronel.png", top: "38%", left: "65%", rot: -2, desc: "Posto mais elevado da estrutura apresentada, responsável pela liderança estratégica, planejamento, coordenação de grandes unidades e apoio à direção da corporação." },
];

export default function ReactHierarquiaDraggable() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '2000px', paddingBottom: '200px' }}>
      <header className="section-header" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '50px' }}>
          <h1 style={{ color: '#fff', fontSize: '3rem', letterSpacing: '5px', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>Hierarquia e Patentes</h1>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '10px' }}>Estrutura organizacional e patentes do Corpo de Bombeiros.</p>
      </header>

      {/* Intro text */}
      <div className="card info-card red-card" style={{ maxWidth: '800px', margin: '40px auto', position: 'relative', zIndex: 10 }}>
          <h3 style={{ marginBottom: '15px' }}>Hierarquia do Bombeiro</h3>
          <p>A hierarquia é um sistema de organização que distribui pessoas em diferentes níveis de autoridade e responsabilidade. Ela estabelece uma cadeia de comando em que os níveis superiores coordenam e supervisionam os inferiores, garantindo disciplina, organização, respeito e eficiência nas operações do Corpo de Bombeiro.<br/><br/>
          O respeito à hierarquia é um dos princípios fundamentais da corporação. Cada bombeiro possui funções e responsabilidades específicas, contribuindo para o trabalho em equipe e para o bom funcionamento das operações de emergência.</p>
      </div>

      <DraggableCardContainer className="w-full relative flex items-center justify-center overflow-visible" style={{ height: '800px', marginTop: '20px' }}>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold text-neutral-500 opacity-50 pointer-events-none">
          Arraste as patentes
        </p>
        {patentes.map((item, index) => (
          <DraggableCardBody 
            key={index}
            className="bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden border border-white/10"
            style={{
              top: item.top,
              left: item.left,
              rotate: `${item.rot}deg`,
              width: '280px',
              padding: '16px',
              cursor: 'grab',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}
          >
            <div className={`card info-card ${item.color}`} style={{ height: '240px', display: 'flex', flexDirection: 'column', padding: '20px', margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  <img 
                    src={`assets/hierarquia/patentes bombeir/${item.img}`} 
                    alt={item.rank} 
                    style={{ width: '60px', height: '60px', objectFit: 'contain', pointerEvents: 'none' }} 
                  />
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.5, pointerEvents: 'none', textAlign: 'center', margin: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.desc}
                </p>
            </div>
            <h3 style={{ margin: '16px 0 0 0', fontSize: '1.2rem', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
              {item.rank}
            </h3>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>

      {/* Bottom info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginTop: '50px', position: 'relative', zIndex: 10 }}>
        
        <div className="card info-card purple-card card-principios-hierarquia" style={{ maxWidth: '700px', padding: '30px' }}>
            <h3 style={{ marginBottom: '14px' }}>Princípios da Hierarquia</h3>
            <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.95rem' }}>
                ➤ Respeitar os superiores e tratar os subordinados com profissionalismo.<br/>
                ➤ Cumprir ordens legais e manter a disciplina.<br/>
                ➤ Trabalhar em equipe para garantir a segurança de todos.<br/>
                ➤ Agir com ética, responsabilidade e comprometimento.<br/>
                ➤ Representar a corporação com respeito dentro e fora do serviço.
            </p>
        </div>

        <div className="card info-card red-card card-quadro-patentes" style={{ padding: '16px', display: 'flex', flexDirection: 'column', maxWidth: '800px', width: '90%' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                Quadro Geral de Patentes
            </h3>
            <div style={{ width: '100%', flex: 1, minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                <img src="assets/hierarquia/patentes.png" alt="Quadro de Patentes" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
            </div>
        </div>

        <div className="card info-card blue-card" style={{ maxWidth: '800px', textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '1.15rem', fontStyle: 'italic' }}>"A hierarquia e a disciplina são os pilares que sustentam a organização, a eficiência e a excelência do Corpo de Bombeiro."</p>
        </div>

      </div>
    </div>
  );
}
