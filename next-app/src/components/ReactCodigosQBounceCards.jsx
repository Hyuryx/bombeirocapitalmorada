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
      <div key={`txt-${idx}`} className="modulacao-card-outer">
        <div
          className="neon-breathing-card modulacao-card-inner"
          style={{
            '--neon-color': card.color || '#ff1a1a',
            border: `2px solid ${card.color || '#ff1a1a'}`
          }}
        >
          <h2 className="modulacao-card-title">
            {card.title}
          </h2>
          <div className="modulacao-card-divider" />
          <ul className="modulacao-card-list">
            {card.lines.map((line, lIdx) => (
              <li key={lIdx} className="modulacao-card-item">
                <span className="modulacao-card-bullet" style={{ color: card.color || '#ff1a1a' }}>•</span>
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
      <div key={`img-${idx}`} className="modulacao-card-outer" onClick={() => setExpandedImage(imgSrc)}>
        <div
          className="neon-breathing-card modulacao-card-inner"
          style={{
            padding: '0',
            overflow: 'hidden',
            cursor: 'pointer',
            border: `2px solid #ff1a1a`,
            '--neon-color': '#ff1a1a'
          }}
        >
          <img src={imgSrc} alt="Código" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    ));

    setItems([...cardElements, ...imageCards]);
  }, []);

  return (
    <div ref={containerRef} className="modulacao-gallery-container">
      <style>{`
        .modulacao-gallery-container {
          height: 700px;
          width: 100%;
          position: relative;
          margin: 40px 0;
        }
        @media (max-width: 768px) {
          .modulacao-gallery-container {
            height: clamp(560px, 80vh, 700px);
          }
        }
        .modulacao-card-outer {
          width: 100%;
          height: 100%;
          padding: 10px;
          box-sizing: border-box;
        }
        .modulacao-card-inner {
          background-color: rgba(15, 15, 20, 0.92);
          width: 100%;
          height: 100%;
          border-radius: 20px;
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          animation: neonBreathe 2.5s ease-in-out infinite;
          overflow: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        body.light-theme .modulacao-card-inner,
        html.light-theme .modulacao-card-inner {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .modulacao-card-title {
          color: #ffffff;
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.25;
        }
        body.light-theme .modulacao-card-title,
        html.light-theme .modulacao-card-title {
          color: #0f172a;
        }
        .modulacao-card-divider {
          width: 80%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 auto 0.85rem auto;
        }
        body.light-theme .modulacao-card-divider,
        html.light-theme .modulacao-card-divider {
          background-color: rgba(0, 0, 0, 0.12);
        }
        .modulacao-card-list {
          list-style: none;
          padding: 0 4px 0 0;
          margin: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justifyContent: space-evenly;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          gap: 10px;
        }
        .modulacao-card-list::-webkit-scrollbar {
          width: 4px;
        }
        .modulacao-card-list::-webkit-scrollbar-thumb {
          background: rgba(255, 26, 26, 0.3);
          border-radius: 4px;
        }
        .modulacao-card-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: clamp(0.82rem, 2.2vw, 0.94rem);
          color: #e2e8f0;
          line-height: 1.45;
        }
        body.light-theme .modulacao-card-item,
        html.light-theme .modulacao-card-item {
          color: #334155;
        }
        .modulacao-card-bullet {
          font-size: 1.2rem;
          line-height: 1;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .modulacao-card-outer {
            padding: 6px;
          }
          .modulacao-card-inner {
            padding: 1rem 0.9rem;
            border-radius: 16px;
          }
          .modulacao-card-title {
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
          }
          .modulacao-card-divider {
            margin-bottom: 0.5rem;
          }
          .modulacao-card-item {
            font-size: 0.82rem;
            line-height: 1.35;
            gap: 6px;
          }
          .modulacao-card-list {
            gap: 8px;
          }
        }
        @keyframes neonBreathe {
          0%, 100% {
            box-shadow: 0 0 5px var(--neon-color), inset 0 0 5px var(--neon-color);
            border-color: rgba(255, 26, 26, 0.35);
          }
          50% {
            box-shadow: 0 0 22px var(--neon-color), inset 0 0 12px var(--neon-color);
            border-color: rgba(255, 26, 26, 1);
          }
        }
      `}</style>
      {isVisible && items.length > 0 && (
        <TiltedGridHero
          items={items}
          speed={6}
          tileHeight={68}
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
