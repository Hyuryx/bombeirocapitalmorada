'use client';
import React from 'react';
import MagicBento from '@/components/ui/MagicBento';
import GlitchText from './GlitchText';
import FallingText from './FallingText';

const patentes = [
  { rank: "Recruta (RC)", color: "cyan-card", img: "recruta.png", desc: "Integrante em período inicial de formação, responsável por aprender os procedimentos e preparar-se para Soldado." },
  { rank: "Soldado (SD)", color: "blue-card", img: "soldado.png", desc: "Atua diretamente nas atividades operacionais e salvamentos sob orientação dos superiores." },
  { rank: "Cabo (CB)", color: "green-card", img: "cabo.png", desc: "Militar experiente que auxilia na liderança, orienta Soldados e contribui nas operações." },
  { rank: "3º Sargento (3º SGT)", color: "yellow-card", img: "3 sgt.png", desc: "Supervisiona equipes, orienta militares e apoia superiores na organização e execução das operações." },
  { rank: "2º Sargento (2º SGT)", color: "yellow-card", img: "2 sgt.png", desc: "Supervisiona atividades operacionais, auxilia na instrução e no cumprimento das missões." },
  { rank: "1º Sargento (1º SGT)", color: "orange-card", img: "1 sgt.png", desc: "Sargento de maior graduação, liderança e referência auxiliando na disciplina e coordenação." },
  { rank: "Subtenente (SUB TEN)", color: "orange-card", img: "sub-tenente.png", desc: "Praça de maior graduação, atua no apoio ao comando, orientando os mais novos com sua experiência." },
  
  { rank: "Aspirante a Oficial", color: "purple-card", img: "aspirante.png", desc: "Militar em fase inicial do oficialato, desenvolvendo experiência prática de liderança e comando." },
  { rank: "2º Tenente (2º TEN)", color: "purple-card", img: "2 tenente.png", desc: "Primeiro posto do oficialato, exerce liderança direta, coordena equipes e auxilia no planejamento." },
  { rank: "1º Tenente (1º TEN)", color: "blue-card", img: "1 tenente.png", desc: "Oficial com maior experiência, responsável por liderar equipes e apoiar no planejamento das missões." },
  { rank: "Capitão (CAP)", color: "green-card", img: "capitao.png", desc: "Responsável pelo comando de equipes, planejando operações e garantindo as diretrizes." },
  { rank: "Major (MAJ)", color: "yellow-card", img: "major.png", desc: "Oficial superior responsável pela coordenação operacional, administrativa e gerenciamento." },
  { rank: "Tenente-Coronel", color: "orange-card", img: "tenente coronel.png", desc: "Auxilia diretamente o Coronel na administração, supervisionando unidades e garantindo as normas." },
  { rank: "Coronel (CEL)", color: "red-card", img: "coronel.png", desc: "Posto mais elevado, responsável pela liderança estratégica, planejamento e direção da corporação." },
];

export default function ReactHierarquiaMagicBento() {
  const [expandedImg, setExpandedImg] = React.useState(false);

  const items = [
    ...patentes.map((item) => ({
      className: `info-card ${item.color}`,
      style: { background: 'transparent' },
      content: (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <img src={`assets/hierarquia/patentes bombeir/${item.img}`} alt={item.rank} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>{item.rank}</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.4, textAlign: 'center', margin: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.desc}</p>
        </div>
      )
    })),
    {
      className: 'info-card purple-card',
      style: { background: 'transparent' },
      content: (
        <div style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', padding: '15px' }}>
          <h3 style={{ marginBottom: '10px', fontSize: '1.05rem', textAlign: 'center', fontWeight: 'bold' }}>Princípios da Hierarquia</h3>
          <p style={{ margin: 0, lineHeight: 1.3, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>➤ Respeitar superiores e subordinados.</span>
              <span>➤ Cumprir ordens e manter disciplina.</span>
              <span>➤ Trabalhar em equipe pela segurança.</span>
              <span>➤ Agir com ética e responsabilidade.</span>
              <span>➤ Representar bem a corporação.</span>
          </p>
        </div>
      )
    },
    {
      className: 'info-card red-card',
      style: { background: 'transparent' },
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', height: '100%', boxSizing: 'border-box', padding: '15px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', textAlign: 'center', fontWeight: 'bold' }}>
                Quadro de Patentes
            </h3>
            <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                <img 
                  src="assets/hierarquia/patentes.png" 
                  alt="Quadro de Patentes" 
                  style={{ width: '100%', maxHeight: '100px', objectFit: 'contain', cursor: 'pointer', transition: 'transform 0.2s' }} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImg(true);
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            
            <div style={{ marginTop: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.75rem', fontStyle: 'italic', margin: 0, color: '#eee' }}>"A hierarquia e a disciplina são os pilares da excelência."</p>
            </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
      
      {expandedImg && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out'
          }}
          onClick={() => setExpandedImg(false)}
        >
          <img 
            src="assets/hierarquia/patentes.png" 
            alt="Quadro de Patentes Expandido" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(0,0,0,0.8)'
            }} 
          />
        </div>
      )}
      
      {/* Intro Header */}
      <header className="section-header" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '50px', width: '100%' }}>
          <h1 className="glitch-title"><GlitchText speed={1} enableShadows enableOnHover={false}>Hierarquia e Patentes</GlitchText></h1>
          <div style={{ width: '100%', maxWidth: '700px', height: '200px', position: 'relative', margin: '10px auto 0 auto' }}>
            <FallingText
              text="Estrutura organizacional e patentes do Corpo de Bombeiros."
              highlightWords={["Estrutura", "patentes", "Bombeiros."]}
              trigger="hover"
              backgroundColor="transparent"
              gravity={0.56}
              fontSize="1.1rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
      </header>

      {/* Neon style for Hierarquia text card */}
      <style>{`
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
        .neon-card-hierarquia {
            background: transparent !important;
            animation: neon-breathe-babyblue 4s infinite alternate ease-in-out;
            border-radius: 12px;
        }
      `}</style>

      {/* Intro text */}
      <div className="card info-card neon-card-hierarquia" style={{ maxWidth: '800px', margin: '40px auto 20px auto', position: 'relative', zIndex: 10 }}>
          <h3 style={{ marginBottom: '15px', color: '#40c4ff' }}>Hierarquia do Bombeiro</h3>
          <p style={{ color: '#fff' }}>A hierarquia é um sistema de organização que distribui pessoas em diferentes níveis de autoridade e responsabilidade. Ela estabelece uma cadeia de comando em que os níveis superiores coordenam e supervisionam os inferiores, garantindo disciplina, organização, respeito e eficiência nas operações do Corpo de Bombeiro.<br/><br/>
          O respeito à hierarquia é um dos princípios fundamentais da corporação. Cada bombeiro possui funções e responsabilidades específicas, contribuindo para o trabalho em equipe e para o bom funcionamento das operações de emergência.</p>
      </div>

      {/* Magic Bento Grid */}
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <MagicBento 
          items={items}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
      </div>

    </div>
  );
}
