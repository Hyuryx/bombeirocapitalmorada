'use client';
import React from 'react';
import DriftWall from '@/components/ui/DriftWall';

const patentes = [
  { rank: "Recruta (RC)", color: "cyan-card", img: "recruta.png", desc: "Integrante em formação, aprendendo procedimentos e normas da corporação." },
  { rank: "Soldado (SD)", color: "blue-card", img: "soldado.png", desc: "Atua em atividades operacionais e salvamentos sob orientação dos superiores." },
  { rank: "Cabo (CB)", color: "green-card", img: "cabo.png", desc: "Militar experiente que auxilia na liderança e execução das operações." },
  { rank: "3º Sargento (3º SGT)", color: "yellow-card", img: "3 sgt.png", desc: "Supervisa equipes, orienta militares e apoia superiores nas operações." },
  { rank: "2º Sargento (2º SGT)", color: "yellow-card", img: "2 sgt.png", desc: "Auxilia na instrução e contribui para o cumprimento das missões." },
  { rank: "1º Sargento (1º SGT)", color: "orange-card", img: "1 sgt.png", desc: "Sargento de maior graduação, liderança e referência para a tropa." },
  { rank: "Subtenente (SUB TEN)", color: "orange-card", img: "sub-tenente.png", desc: "Praça de maior graduação, orienta os mais novos com sua experiência." },
  
  { rank: "Aspirante a Oficial", color: "purple-card", img: "aspirante.png", desc: "Militar em fase inicial do oficialato, desenvolvendo experiência de comando." },
  { rank: "2º Tenente (2º TEN)", color: "purple-card", img: "2 tenente.png", desc: "Exerce funções de liderança direta, coordena equipes e atividades." },
  { rank: "1º Tenente (1º TEN)", color: "blue-card", img: "1 tenente.png", desc: "Oficial com maior experiência, responsável por liderar e coordenar." },
  { rank: "Capitão (CAP)", color: "green-card", img: "capitao.png", desc: "Comando e coordenação de equipes, supervisionando missões e diretrizes." },
  { rank: "Major (MAJ)", color: "yellow-card", img: "major.png", desc: "Oficial superior responsável pela coordenação operacional e administrativa." },
  { rank: "Tenente-Coronel", color: "orange-card", img: "tenente coronel.png", desc: "Auxilia diretamente o Coronel no comando e garante as normas." },
  { rank: "Coronel (CEL)", color: "red-card", img: "coronel.png", desc: "Posto mais elevado, responsável pela liderança estratégica da corporação." },
];

const items = [
  ...patentes.map((item) => ({
    content: (
      <div className={`card info-card ${item.color}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '15px', margin: 0, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
          <img src={`assets/hierarquia/patentes bombeir/${item.img}`} alt={item.rank} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        </div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>{item.rank}</h3>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.4, textAlign: 'center', margin: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.desc}</p>
      </div>
    )
  })),
  {
    content: (
      <div className="card info-card purple-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '15px', margin: 0, boxSizing: 'border-box' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1rem', textAlign: 'center' }}>Princípios da Hierarquia</h3>
        <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.75rem' }}>
            ➤ Respeito e profissionalismo.<br/>
            ➤ Cumprir ordens e disciplina.<br/>
            ➤ Trabalho em equipe.<br/>
            ➤ Ética e responsabilidade.<br/>
            ➤ Respeito à corporação.
        </p>
      </div>
    )
  }
];

export default function ReactHierarquiaDriftWall() {
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
      
      {/* Intro Header */}
      <header className="section-header" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '50px', width: '100%' }}>
          <h1 style={{ color: '#fff', fontSize: '3rem', letterSpacing: '5px', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>Hierarquia e Patentes</h1>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginTop: '10px' }}>Estrutura organizacional e patentes do Corpo de Bombeiros.</p>
      </header>

      {/* Intro text */}
      <div className="card info-card red-card" style={{ maxWidth: '800px', margin: '40px auto 20px auto', position: 'relative', zIndex: 10 }}>
          <h3 style={{ marginBottom: '15px' }}>Hierarquia do Bombeiro</h3>
          <p>A hierarquia é um sistema de organização que distribui pessoas em diferentes níveis de autoridade e responsabilidade. Ela estabelece uma cadeia de comando em que os níveis superiores coordenam e supervisionam os inferiores, garantindo disciplina, organização, respeito e eficiência nas operações do Corpo de Bombeiro.<br/><br/>
          O respeito à hierarquia é um dos princípios fundamentais da corporação. Cada bombeiro possui funções e responsabilidades específicas, contribuindo para o trabalho em equipe e para o bom funcionamento das operações de emergência.</p>
      </div>

      {/* DriftWall Effect */}
      <div style={{ width: '100vw', height: '600px', position: 'relative', overflow: 'hidden' }}>
        <DriftWall
          items={items}
          columns={4}
          tileWidth={260}
          tileHeight={220}
          gap={24}
          tilt={12}
          turn={-8}
          perspective={1200}
          depth={80}
          speed={25}
          direction="up"
          variance={0.5}
          parallax={0.8}
          lift={40}
          fade={0.2}
          dim={1}
          overlayColor="transparent"
          radius={12}
          roll={0}
          pauseOnHover={true}
          grayscale={false}
        />
      </div>

      {/* Bottom Info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginTop: '40px', position: 'relative', zIndex: 10, width: '100%' }}>
        
        <div className="card info-card red-card card-quadro-patentes" style={{ padding: '16px', display: 'flex', flexDirection: 'column', maxWidth: '700px', width: '90%' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.15rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Quadro Geral de Patentes
            </h3>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                <img src="assets/hierarquia/patentes.png" alt="Quadro de Patentes" style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '8px' }} />
            </div>
        </div>

        <div className="card info-card blue-card" style={{ maxWidth: '800px', textAlign: 'center', marginTop: '10px' }}>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>"A hierarquia e a disciplina são os pilares que sustentam a organização, a eficiência e a excelência do Corpo de Bombeiro."</p>
        </div>

      </div>
    </div>
  );
}
