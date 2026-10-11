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
        color: '#ef4444' // red
      },
      {
        title: "O que é modulação?",
        lines: [
          "Forma correta de se comunicar pelo rádio.",
          "Significa transmitir informações de maneira clara, objetiva, organizada e compreensível para todos na ocorrência."
        ],
        color: '#10b981' // green
      },
      {
        title: "Princípios Básicos",
        lines: [
          "Clareza: Fale sem pressa e sem cortar palavras.",
          "Objetividade: Transmita somente o necessário.",
          "Organização: Identifique quem chama e quem recebe.",
          "Respeito: Postura profissional na frequência."
        ],
        color: '#3b82f6' // blue
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
        color: '#f59e0b' // orange
      }
    ];

    const cardElements = cardsData.map((card, idx) => (
      <div key={idx} style={{ width: '100%', height: '100%', padding: '15px' }}>
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
            border: `2px solid ${card.color || '#40c4ff'}`,
            '--neon-color': card.color || '#40c4ff',
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
                <span style={{ color: card.color || '#40c4ff', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
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
    <div ref={containerRef} style={{ height: '700px', width: '100%', position: 'relative', margin: '40px 0' }}>
      <style>{`
        @keyframes neonBreathe {
          0%, 100% {
            box-shadow: 0 0 5px var(--neon-color), inset 0 0 5px var(--neon-color);
            border-color: rgba(64, 196, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 25px var(--neon-color), inset 0 0 15px var(--neon-color);
            border-color: rgba(64, 196, 255, 1);
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
    </div>
  );
}
