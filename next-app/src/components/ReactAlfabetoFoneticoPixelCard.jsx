'use client';

import React from 'react';
import PixelCard from './PixelCard';

const ALFABETO = [
  { letra: 'A', nome: 'Alfa' },
  { letra: 'B', nome: 'Bravo' },
  { letra: 'C', nome: 'Charlie' },
  { letra: 'D', nome: 'Delta' },
  { letra: 'E', nome: 'Echo' },
  { letra: 'F', nome: 'Fox' },
  { letra: 'G', nome: 'Golf' },
  { letra: 'H', nome: 'Hotel' },
  { letra: 'I', nome: 'Índia' },
  { letra: 'J', nome: 'Juliet' },
  { letra: 'K', nome: 'Kilo' },
  { letra: 'L', nome: 'Lima' },
  { letra: 'M', nome: 'Mike' },
  { letra: 'N', nome: 'November' },
  { letra: 'O', nome: 'Oscar' },
  { letra: 'P', nome: 'Papa' },
  { letra: 'Q', nome: 'Quebec' },
  { letra: 'R', nome: 'Romeu' },
  { letra: 'S', nome: 'Sierra' },
  { letra: 'T', nome: 'Tango' },
  { letra: 'U', nome: 'Uniform' },
  { letra: 'V', nome: 'Victor' },
  { letra: 'W', nome: 'Whiskey' },
  { letra: 'X', nome: 'X-Ray' },
  { letra: 'Y', nome: 'Yankee', colSpan: '3' },
  { letra: 'Z', nome: 'Zulu', colSpan: '4' }
];

export default function ReactAlfabetoFoneticoPixelCard() {
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
              src="assets/codigos de comunicaçao/fonetico.png"
              alt="Guia Alfabeto Fonético"
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

          {/* Metade da Tabela Fonética em 6 Colunas */}
          <div style={{
            flex: '1.4 1 480px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '22px',
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
                Tabela Fonética
              </h2>
              <p style={{
                margin: '5px 0 0',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.5px'
              }}>
                Padrão operacional para soletração clara pelo rádio
              </p>
            </div>

            {/* Grid com 6 Colunas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '10px',
              width: '100%'
            }}>
              {ALFABETO.map(item => (
                <div
                  key={item.letra}
                  className="fonetico-card-item"
                  style={item.colSpan ? { gridColumn: item.colSpan } : undefined}
                >
                  <strong style={{
                    color: '#ef4444',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    textShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                    lineHeight: 1
                  }}>
                    {item.letra}
                  </strong>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginTop: '5px',
                    letterSpacing: '0.2px'
                  }}>
                    {item.nome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PixelCard>
    </div>
  );
}
