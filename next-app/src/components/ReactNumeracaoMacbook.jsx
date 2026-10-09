'use client';
import React from 'react';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

export default function ReactNumeracaoMacbook() {
  const content = (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '10px', gap: '10px' }}>
      {/* Left side: Image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src="assets/codigos de comunicaçao/numeros.png" 
          alt="Guia Numeração Fonética" 
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', objectFit: 'contain' }}
        />
      </div>
      
      {/* Right side: Numbers Table */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
        <div className="card info-card blue-card" style={{ padding: '10px', margin: 0, minHeight: '100%' }}>
            <h2 style={{ margin: '0 0 10px', fontSize: '1rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Tabela Numérica</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', fontSize: '0.85rem' }}>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>1</strong><br/>Primeiro</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>2</strong><br/>Segundo</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>3</strong><br/>Terceiro</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>4</strong><br/>Quarto</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>5</strong><br/>Quinto</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>6</strong><br/>Sexto</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>7</strong><br/>Sétimo</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>8</strong><br/>Oitavo</div>
                <div><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>9</strong><br/>Nono</div>
                <div style={{ gridColumn: 'span 3' }}><strong style={{ color: 'var(--primary-green)', fontSize: '1.2rem' }}>0</strong><br/>Nulo / Negativo</div>
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
            <strong style={{ color: '#ff8c00' }}>Numeração Fonética</strong>
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
