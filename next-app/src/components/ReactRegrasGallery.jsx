'use client';

import React, { useState, useEffect } from 'react';
import ElectricBorder from './ui/ElectricBorder';
import { TiltedGridHero } from './ui/tilted-grid-hero';

export default function ReactRegrasGallery() {
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
    const rules = [
      {
        title: "Regras Gerais",
        lines: [
          "O desrespeito com qualquer membro ou superior resultará em punições severas.",
          "É proibido o uso de palavras de baixo calão nos canais de comunicação oficiais.",
          "As viaturas e equipamentos devem ser utilizados apenas em serviço ativo.",
          "Em caso de ausência prolongada, o membro deve notificar seus superiores."
        ],
        borderColor: '#ff1a1a'
      },
      {
        title: "Regras de Punição",
        lines: [
          "Faltas injustificadas levarão a advertências formais.",
          "O acúmulo de advertências pode resultar em rebaixamento de patente.",
          "Uso indevido de equipamentos do Corpo de Bombeiros gerará punição imediata.",
          "A subordinação é vital. Recusar ordens diretas é passível de expulsão."
        ],
        borderColor: '#ff1a1a'
      },
      {
        title: "Conduta em Operação",
        lines: [
          "A segurança da equipe e das vítimas é sempre a prioridade máxima.",
          "Mantenha comunicação constante e clara pelo rádio durante ocorrências.",
          "Siga os Códigos Q estritamente para manter a padronização e objetividade.",
          "Nunca abandone um colega em situação de risco durante resgates."
        ],
        borderColor: '#ff1a1a'
      },
      {
        title: "Manutenção e Equipamentos",
        lines: [
          "Cada bombeiro é responsável pelo estado de seu equipamento de proteção individual.",
          "As viaturas devem ser inspecionadas antes e depois de cada turno de serviço.",
          "Danos ao patrimônio por negligência serão cobrados e punidos.",
          "Relate qualquer defeito ou falta de material imediatamente ao oficial de dia."
        ],
        borderColor: '#ff1a1a'
      },
      {
        title: "Apresentação Pessoal",
        lines: [
          "O uniforme deve estar sempre limpo, passado e em perfeitas condições.",
          "Cabelos, barba e unhas devem seguir o regulamento interno da corporação.",
          "É proibido o uso de acessórios chamativos durante o serviço.",
          "O porte e a postura do bombeiro devem sempre refletir profissionalismo."
        ],
        borderColor: '#ff1a1a'
      },
      {
        title: "Uso do Rádio",
        lines: [
          "Apenas informações vitais para a operação devem ser transmitidas.",
          "Identifique-se corretamente antes de iniciar qualquer transmissão.",
          "Evite conversas paralelas ou brincadeiras no canal principal.",
          "Em situações de emergência grave, use o código de prioridade máxima."
        ],
        borderColor: '#ff1a1a'
      }
    ];

    const cardElements = rules.map((rule, idx) => (
      <div key={idx} className="regras-card-outer">
        <div
          className="neon-breathing-card regras-card-inner"
          style={{
            '--neon-color': rule.borderColor,
            border: `2px solid ${rule.borderColor}`
          }}
        >
          <h2 className="regras-card-title">
            {rule.title}
          </h2>
          <div className="regras-card-divider" />
          <ul className="regras-card-list">
            {rule.lines.map((line, lIdx) => (
              <li key={lIdx} className="regras-card-item">
                <span className="regras-card-bullet" style={{ color: rule.borderColor }}>•</span>
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
    <div ref={containerRef} className="regras-gallery-container">
      <style>{`
        .regras-gallery-container {
          height: 700px;
          width: 100%;
          position: relative;
        }
        @media (max-width: 768px) {
          .regras-gallery-container {
            height: clamp(560px, 80vh, 700px);
          }
        }
        .regras-card-outer {
          width: 100%;
          height: 100%;
          padding: 10px;
          box-sizing: border-box;
        }
        .regras-card-inner {
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
        body.light-theme .regras-card-inner,
        html.light-theme .regras-card-inner {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .regras-card-title {
          color: #ffffff;
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.25;
        }
        body.light-theme .regras-card-title,
        html.light-theme .regras-card-title {
          color: #0f172a;
        }
        .regras-card-divider {
          width: 80%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 0 auto 0.85rem auto;
        }
        body.light-theme .regras-card-divider,
        html.light-theme .regras-card-divider {
          background-color: rgba(0, 0, 0, 0.12);
        }
        .regras-card-list {
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
        .regras-card-list::-webkit-scrollbar {
          width: 4px;
        }
        .regras-card-list::-webkit-scrollbar-thumb {
          background: rgba(255, 26, 26, 0.3);
          border-radius: 4px;
        }
        .regras-card-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: clamp(0.82rem, 2.2vw, 0.94rem);
          color: #e2e8f0;
          line-height: 1.45;
        }
        body.light-theme .regras-card-item,
        html.light-theme .regras-card-item {
          color: #334155;
        }
        .regras-card-bullet {
          font-size: 1.2rem;
          line-height: 1;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .regras-card-outer {
            padding: 6px;
          }
          .regras-card-inner {
            padding: 1rem 0.9rem;
            border-radius: 16px;
          }
          .regras-card-title {
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
          }
          .regras-card-divider {
            margin-bottom: 0.5rem;
          }
          .regras-card-item {
            font-size: 0.82rem;
            line-height: 1.35;
            gap: 6px;
          }
          .regras-card-list {
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
