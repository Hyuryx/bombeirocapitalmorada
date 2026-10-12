'use client';

import React from 'react';
import PixelCard from './PixelCard';

const NUMEROS = [
  { num: '1', nome: 'Primeiro' },
  { num: '2', nome: 'Segundo' },
  { num: '3', nome: 'Terceiro' },
  { num: '4', nome: 'Quarto' },
  { num: '5', nome: 'Quinto' },
  { num: '6', nome: 'Sexto' },
  { num: '7', nome: 'Sétimo' },
  { num: '8', nome: 'Oitavo' },
  { num: '9', nome: 'Nono' },
  { num: '0', nome: 'Nulo' }
];

export default function ReactNumeracaoFoneticaPixelCard() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '25px auto 45px auto',
      padding: '0 15px'
    }}>
      <PixelCard
        variant="red"
        speed={40}
        gap={8}
        style={{
          width: '100%',
          maxWidth: '1050px',
          padding: '25px 28px',
          background: 'rgba(10, 11, 16, 0.85)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(239, 68, 68, 0.2)'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {/* Metade da Foto em pé */}
          <div style={{
            flex: '1 1 320px',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src="assets/codigos de comunicaçao/numeros.png"
              alt="Guia Numeração Fonética"
              style={{
                width: '100%',
                maxHeight: '460px',
                objectFit: 'contain',
                borderRadius: '16px',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(239, 68, 68, 0.25)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          {/* Metade da Tabela Numérica */}
          <div style={{
            flex: '1.4 1 480px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '25px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '12px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '2px',
                color: '#ffffff',
                textTransform: 'uppercase',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
              }}>
                Tabela Numérica
              </h2>
              <p style={{
                margin: '5px 0 0',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.5px'
              }}>
                Padronização oficial da transmissão de números pelo rádio
              </p>
            </div>

            {/* Grid de 5 colunas com os 10 números */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px',
              width: '100%'
            }}>
              {NUMEROS.map(item => (
                <div
                  key={item.num}
                  className="fonetico-card-item"
                  style={{ padding: '16px 8px' }}
                >
                  <strong style={{
                    color: '#ef4444',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                    lineHeight: 1
                  }}>
                    {item.num}
                  </strong>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginTop: '8px',
                    letterSpacing: '0.3px'
                  }}>
                    {item.nome}
                  </span>
                </div>
              ))}
            </div>

            {/* Caixa de Exemplo e Diretriz Operacional */}
            <div style={{
              marginTop: '25px',
              padding: '16px 20px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.2)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                  <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
                </svg>
              </div>
              <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                <strong style={{ color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Exemplo Prático:</strong>
                <br />
                <span>Para identificar a <strong>VTR 7</strong>, module: <em>"Viatura Sétimo"</em>. Para o número zero, utilize <em>"Nulo"</em> ou <em>"Negativo"</em>.</span>
              </div>
            </div>
          </div>
        </div>
      </PixelCard>
    </div>
  );
}
