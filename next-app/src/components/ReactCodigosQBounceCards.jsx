'use client';
import React, { useState, useEffect } from 'react';
import { TiltedGridHero } from './ui/tilted-grid-hero';

export default function ReactCodigosQBounceCards() {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const qCodes = [
      {
        title: "QAP",
        lines: [
          "Está na escuta? Verifica se alguém está ouvindo.",
          "Ex: \"Bombeiro 01, QAP?\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QSL",
        lines: [
          "Entendido / Mensagem recebida.",
          "Ex: \"QSL, em deslocamento.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QTH",
        lines: [
          "Localização / Endereço.",
          "Ex: \"Informe seu QTH.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QTI",
        lines: [
          "Rota / Deslocamento.",
          "Ex: \"Equipe em QTI sentido hospital.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QRR",
        lines: [
          "Pedido de apoio / Reforço.",
          "Ex: \"Solicito QRR no QTH.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QSM",
        lines: [
          "Repita a mensagem. Usado quando falha.",
          "Ex: \"QSM, transmissão cortada.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QRX",
        lines: [
          "Aguarde. Momento antes de responder.",
          "Ex: \"QRX, verificando a vítima.\""
        ],
        color: '#ff1a1a'
      },
      {
        title: "QTO / QTX / QRT",
        lines: [
          "QTO: Deslocando/Saindo.",
          "QTX: Manter acompanhamento.",
          "QRT: Encerrar transmissão."
        ],
        color: '#ff1a1a'
      }
    ];

    const cardElements = qCodes.map((card, idx) => (
      <div key={`txt-${idx}`} style={{ width: '100%', height: '100%', padding: '15px' }}>
        <div
          className="neon-breathing-card"
          style={{
            backgroundColor: 'rgba(15, 15, 20, 0.85)',
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            border: `2px solid ${card.color || '#ff1a1a'}`,
            '--neon-color': card.color || '#ff1a1a',
            animation: 'neonBreathe 2s ease-in-out infinite'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {card.title}
          </h2>
          <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 1rem auto' }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {card.lines.map((line, lIdx) => (
              <li key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                <span style={{ color: card.color || '#ff1a1a', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ));

    const imageCards = [
      'assets/codigos de comunicaçao/codigoq.png',
      'assets/codigos de comunicaçao/codigo_de_intensidade.png'
    ].map((imgSrc, idx) => (
      <div key={`img-${idx}`} style={{ width: '100%', height: '100%', padding: '15px' }} onClick={() => setExpandedImage(imgSrc)}>
        <div
          className="neon-breathing-card"
          style={{
            backgroundColor: 'rgba(15, 15, 20, 0.85)',
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            padding: '0',
            display: 'flex',
            overflow: 'hidden',
            cursor: 'pointer',
            boxSizing: 'border-box',
            border: `2px solid #ff1a1a`,
            '--neon-color': '#ff1a1a',
            animation: 'neonBreathe 2s ease-in-out infinite'
          }}
        >
          <img src={imgSrc} alt="Código" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    ));

    setItems([...cardElements, ...imageCards]);
  }, []);

  return (
    <div ref={containerRef} style={{ height: '700px', width: '100%', position: 'relative', margin: '40px 0' }}>
      <style>{`
        @keyframes neonBreathe {
          0%, 100% {
            box-shadow: 0 0 5px var(--neon-color), inset 0 0 5px var(--neon-color);
            border-color: rgba(255, 26, 26, 0.35);
          }
          50% {
            box-shadow: 0 0 25px var(--neon-color), inset 0 0 15px var(--neon-color);
            border-color: rgba(255, 26, 26, 1);
          }
        }
      `}</style>
      {isVisible && items.length > 0 && (
        <TiltedGridHero
          items={items}
          speed={6}
          tileHeight={65}
          aspectRatio={0.7}
          gap={10}
          axis={50}
          curve={45}
          fade={15}
          className="h-full w-full"
        />
      )}
      
      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setExpandedImage(null)}
        >
          <img 
            src={expandedImage} 
            alt="Expanded Code" 
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,255,255,0.2)'
            }} 
          />
          <div style={{ position: 'absolute', top: '20px', right: '30px', color: 'white', fontSize: '30px', fontWeight: 'bold' }}>&times;</div>
        </div>
      )}
    </div>
  );
}
