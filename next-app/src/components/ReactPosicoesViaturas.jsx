'use client';

import React from 'react';
import Carousel from './Carousel';

export default function ReactPosicoesViaturas() {
  const items = [
    {
      id: 1,
      title: 'P1 - Condutor',
      description: 'Responsável pela condução segura, rota, posicionamento da viatura e atenção ao trânsito.',
      neonColor: '#ff1a1a',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M12 2v8"/>
          <path d="M12 14v8"/>
          <path d="m4.93 4.93 5.66 5.66"/>
          <path d="m13.41 13.41 5.66 5.66"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'P2 - Comunicação',
      description: 'Pode modular com a Central, repassar informações importantes e auxiliar na organização da ocorrência.',
      neonColor: '#ff1a1a',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
          <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
          <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'P3 - Apoio Operacional',
      description: 'Auxilia na sinalização, atendimento, equipamentos, segurança do local e demais funções.',
      neonColor: '#ff1a1a',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0 40px 0' }}>
      <Carousel
        items={items}
        baseWidth={320}
        aspectRatio={1}
        effect="tilt"
        indicator="dots"
        frame
        arrows={false}
        loop={false}
        autoplay={false}
        pauseOnHover={false}
        theme="dark"
        peek={0}
        gap={16}
        radius={12}
        draggable
        round={true}
      />
    </div>
  );
}
