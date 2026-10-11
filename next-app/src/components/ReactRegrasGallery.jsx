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
            border: `2px solid ${rule.borderColor}`,
            '--neon-color': rule.borderColor,
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
            {rule.title}
          </h2>
          <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 1rem auto' }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            {rule.lines.map((line, lIdx) => (
              <li key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                <span style={{ color: rule.borderColor, fontSize: '1.2rem', lineHeight: 1 }}>•</span>
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
    <div ref={containerRef} style={{ height: '700px', width: '100%', position: 'relative' }}>
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
    </div>
  );
}
