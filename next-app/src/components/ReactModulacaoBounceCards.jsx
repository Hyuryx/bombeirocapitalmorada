'use client';
import React, { useState, useEffect } from 'react';
import { TiltedGridHero } from './ui/tilted-grid-hero';

export default function ReactModulacaoBounceCards() {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
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
    const cardsData = [
      {
        title: "Objetivo da Apostila",
        lines: [
          "Orientar os membros sobre como modular corretamente.",
          "Como organizar informações pelo rádio.",
          "Códigos a utilizar.",
          "Como reconhecer as principais viaturas.",
          "Guia prático atualizável."
        ],
        color: '#ff1a1a'
      },
      {
        title: "O que é modulação?",
        lines: [
          "Forma correta de se comunicar pelo rádio.",
          "Significa transmitir informações de maneira clara, objetiva, organizada e compreensível para todos na ocorrência."
        ],
        color: '#ff1a1a'
      },
      {
        title: "Princípios Básicos",
        lines: [
          "Clareza: Fale sem pressa e sem cortar palavras.",
          "Objetividade: Transmita somente o necessário.",
          "Organização: Identifique quem chama e quem recebe.",
          "Respeito: Postura profissional na frequência."
        ],
        color: '#ff1a1a'
      },
      {
        title: "Na prática, modular é informar:",
        lines: [
          "1. Quem está falando",
          "2. Para quem é a mensagem",
          "3. Qual é a situação",
          "4. Onde está acontecendo",
          "5. Qual apoio é necessário"
        ],
        color: '#ff1a1a'
      }
    ];

    const cardElements = cardsData.map((card, idx) => (
      <div key={idx} className="modulacao-card-outer">
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

    setItems(cardElements);
  }, []);

  return (
    <div ref={containerRef} className="modulacao-gallery-container">
      <style>{`
        .modulacao-gallery-container {
          height: 700px;
          width: 100%;
          position: relative;
          margin: 15px 0 40px 0;
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
    </div>
  );
}
