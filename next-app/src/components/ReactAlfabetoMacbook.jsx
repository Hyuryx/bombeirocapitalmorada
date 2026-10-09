'use client';
import React from 'react';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

export default function ReactAlfabetoMacbook() {
  const content = (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '10px', gap: '10px' }}>
      {/* Left side: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src="assets/codigos de comunicaçao/fonetico.png" 
          alt="Guia Alfabeto Fonético" 
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }}
        />
      </div>
      
      {/* Right side: Alphabet Table */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
        <div className="card info-card purple-card" style={{ padding: '10px', margin: 0, minHeight: '100%' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: '1rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Tabela Fonética</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', textAlign: 'center', fontSize: '0.75rem' }}>
                <div><strong style={{ color: 'var(--primary-green)' }}>A</strong><br/>Alfa</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>B</strong><br/>Bravo</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>C</strong><br/>Charlie</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>D</strong><br/>Delta</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>E</strong><br/>Echo</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>F</strong><br/>Fox</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>G</strong><br/>Golf</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>H</strong><br/>Hotel</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>I</strong><br/>Índia</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>J</strong><br/>Juliet</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>K</strong><br/>Kilo</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>L</strong><br/>Lima</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>M</strong><br/>Mike</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>N</strong><br/>November</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>O</strong><br/>Oscar</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>P</strong><br/>Papa</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>Q</strong><br/>Quebec</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>R</strong><br/>Romeu</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>S</strong><br/>Sierra</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>T</strong><br/>Tango</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>U</strong><br/>Uniform</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>V</strong><br/>Victor</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>W</strong><br/>Whiskey</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>X</strong><br/>X-Ray</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>Y</strong><br/>Yankee</div>
                <div><strong style={{ color: 'var(--primary-green)' }}>Z</strong><br/>Zulu</div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-hidden" style={{ minHeight: '200vh' }}>
      <MacbookScroll
        title={
          <span>
            <strong style={{ color: '#b142ff' }}>Alfabeto Fonético</strong>
            <br />
            <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.8 }}>Role para abrir o notebook</span>
          </span>
        }
        src={content}
        showGradient={false} 
      />
    </div>
  );
}
