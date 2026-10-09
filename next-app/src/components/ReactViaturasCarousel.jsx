'use client';

import React from 'react';
import CircularCarousel from './CircularCarousel';

const viaturaItems = [
  { 
    src: 'assets/viaturas/protesto.png', 
    title: 'QSV-01: Protesto',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura para protesto.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações de protesto e presença preventiva em ocorrências de grande público ou risco elevado.</p></div>`
  },
  { 
    src: 'assets/viaturas/jaguar.png', 
    title: 'QSV-02: SUV de Resgate',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura SUV de Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de resposta rápida, ágil e versátil, com capacidade para carregar equipamentos essenciais de Suporte Básico de Vida (SBV) e trauma.</p></div>`
  },
  { 
    src: 'assets/viaturas/moto.png', 
    title: 'QSV-03: Moto Resgate',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Moto Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura de altíssima agilidade (batedor). Primeira resposta em locais de trânsito intenso, garantindo atendimento imediato até a chegada da viatura principal.</p></div>`
  },
  { 
    src: 'assets/viaturas/caminhotes.png', 
    title: 'QSV-04: Pickup Resgate',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Pickup Resgate.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Viatura utilitária para transporte de pranchas longas, equipamentos pesados de desencarceramento e apoio logístico em terrenos irregulares.</p></div>`
  },
  { 
    src: 'assets/viaturas/aspirante.png', 
    title: 'QSV-05: Aspirante',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Aspirante.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>`
  },
  { 
    src: 'assets/viaturas/helicoptero.png', 
    title: 'QSV-06: Helicóptero',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da aeronave oficial do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em missões de resgate, busca e salvamento e transporte aeromédico em áreas de difícil acesso.</p></div>`
  },
  { 
    src: 'assets/viaturas/caminhonete_tenente.png', 
    title: 'QSV-07: Tenente',
    desc: `<div class='modal-info-item'><strong>📖 CATÁLOGO DE QSV</strong><p>Registro visual oficial dos veículos operacionais do Corpo de Bombeiros Capital Morada.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Imagem padrão para identificação da viatura Tenente.</p></div><div class='modal-info-item'><strong>🔥 USO OPERACIONAL</strong><p>Empregada em ações estratégicas, coordenação de ocorrências e apoio à tomada de decisão.</p></div>`
  },
  { 
    src: 'assets/viaturas/comandos_da_qsv.png', 
    title: 'Comandos da QSV',
    desc: `<div class='modal-info-item'><strong>📖 INSTRUÇÃO DE QSV</strong><p>Guia visual com os atalhos e comandos oficiais para as viaturas do Corpo de Bombeiros.</p></div><div class='modal-info-item'><strong>👁️ REFERÊNCIA VISUAL</strong><p>Controles de giroflex, rádio, sirenes e demais sistemas integrados do veículo.</p></div>`
  }
];

export default function ReactViaturasCarousel() {
  const [selectedViatura, setSelectedViatura] = React.useState(null);

  const handleItemClick = (item, index) => {
    setSelectedViatura(item);
  };

  const closeModal = () => {
    setSelectedViatura(null);
  };

  return (
    <>
      <div style={{ width: '100%', height: '550px', position: 'relative', marginTop: '10px' }}>
        <CircularCarousel
          items={viaturaItems}
          preset="cylinder"
          intro="rise"
          cardWidth={360}
          aspectRatio={0.65}
          speed={14}
          captions={true}
          gap={25}
          tilt={-5}
          curve={1}
          perspective={2500}
          autoplay="drift"
          interval={3}
          direction="left"
          momentum={0.6}
          snap
          pauseOnHover
          focusOnClick
          draggable
          parallax={0.3}
          stretch={0.5}
          fadeColor="#000000"
          depthFade={0.55}
          innerShade={0.6}
          cornerRadius={12}
          onItemClick={handleItemClick}
        />
      </div>

      {selectedViatura && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          animation: 'fadeIn 0.3s forwards',
          padding: '2rem'
        }}>
          {/* Blurred Background */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${selectedViatura.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(30px)',
            transform: 'scale(1.1)',
            zIndex: -2
          }} />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(18, 15, 23, 0.85)',
            zIndex: -1
          }} onClick={closeModal} />

          {/* Modal Container */}
          <div style={{
            display: 'flex',
            width: '90%',
            maxWidth: '1200px',
            height: '85vh',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
            overflow: 'hidden',
            position: 'relative',
            animation: 'slideUp 0.4s ease-out forwards'
          }}>
            {/* Close Button */}
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '20px', right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              width: '40px', height: '40px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ✕
            </button>

            {/* Left Side: Parallax Image */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              position: 'relative'
            }}>
              {/* Glow behind image */}
              <div style={{
                position: 'absolute',
                width: '60%', height: '80%',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0
              }} />
              <img 
                src={selectedViatura.src} 
                alt={selectedViatura.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  zIndex: 1,
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                  animation: 'floatImage 6s ease-in-out infinite'
                }} 
              />
            </div>

            {/* Right Side: Data Panel */}
            <div style={{
              flex: 1,
              padding: '3rem',
              overflowY: 'auto',
              borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 'bold',
                marginBottom: '2rem',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                background: 'linear-gradient(to right, #c084fc, #f472b6, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(192, 132, 252, 0.3)'
              }}>
                {selectedViatura.title}
              </h2>
              
              <div 
                className="futuristic-modal-desc"
                dangerouslySetInnerHTML={{ __html: selectedViatura.desc }} 
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#e2e8f0'
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes floatImage {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .futuristic-modal-desc .modal-info-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .futuristic-modal-desc .modal-info-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(192, 132, 252, 0.5);
          box-shadow: 0 0 20px rgba(192, 132, 252, 0.2);
          transform: translateX(5px);
        }
        .futuristic-modal-desc strong {
          display: block;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      `}} />
    </>
  );
}
