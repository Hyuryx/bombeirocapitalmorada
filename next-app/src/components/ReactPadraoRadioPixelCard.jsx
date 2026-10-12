'use client';

import React, { useState } from 'react';
import PixelCard from './PixelCard';

const FOTOS_RADIO = [
  {
    src: 'assets/comunicaçao de entrada e saida de serviço/comunicaçao.png',
    titulo: 'Padrão Geral CBM',
    desc: 'Guia visual completo para procedimentos de comunicação via rádio.'
  },
  {
    src: 'assets/comunicaçao de entrada e saida de serviço/radio_entrada_e_saida.png',
    titulo: 'Entrada e Saída',
    desc: 'Protocolo de modulação para início (QRV) e término de expediente (QTX).'
  },
  {
    src: 'assets/comunicaçao de entrada e saida de serviço/pausa.png',
    titulo: 'Pausa em Serviço',
    desc: 'Comunicação oficial ao entrar em pausa e ao retornar ficando disponível.'
  },
  {
    src: 'assets/comunicaçao de entrada e saida de serviço/deslocamento.png',
    titulo: 'Deslocamento',
    desc: 'Modulação de deslocamento à ocorrência (QTI) e retorno ao posto (Código 4).'
  }
];

export default function ReactPadraoRadioPixelCard() {
  const [modalImg, setModalImg] = useState(null);

  return (
    <>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px auto 35px auto',
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
          {/* Cabeçalho */}
          <div style={{
            textAlign: 'center',
            marginBottom: '25px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '14px'
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
              Diretrizes e Procedimentos de Rádio
            </h2>
            <p style={{
              margin: '6px 0 0',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.5px'
            }}>
              Modelos operacionais visuais de comunicação e conduta em serviço
            </p>
          </div>

          {/* Grid das 4 Fotos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '18px',
            marginBottom: '28px'
          }}>
            {FOTOS_RADIO.map((foto, idx) => (
              <div
                key={idx}
                onClick={() => setModalImg(foto)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(239, 68, 68, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.6)';
                }}
              >
                <div style={{ width: '100%', overflow: 'hidden' }}>
                  <img
                    src={foto.src}
                    alt={foto.titulo}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '12px 14px', background: 'rgba(20, 20, 28, 0.6)' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>
                    {foto.titulo}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4 }}>
                    {foto.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Os 2 Cards: Comunicação Voltada ao Bombeiro e Boas Práticas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {/* Card 1: Comunicação Voltada ao Bombeiro */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(15, 15, 25, 0.6) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.2)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#c084fc'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#c084fc', fontWeight: 800 }}>
                  Comunicação Voltada ao Bombeiro
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                Foco em <strong>assistência, orientação, cuidado e segurança da vítima</strong>. Diferente da comunicação policial, o contato inicial deve buscar acalmar e prestar apoio. Transmita apenas dados essenciais na rede: <span style={{ color: '#c084fc' }}>local exato, tipo da ocorrência, quantidade de vítimas, riscos iminentes e apoio necessário</span>.
              </p>
            </div>

            {/* Card 2: Boas Práticas */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(15, 15, 25, 0.6) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.35)',
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              transition: 'transform 0.25s ease, border-color 0.25s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.7)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.35)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(234, 179, 8, 0.2)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#facc15'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#facc15', fontWeight: 800 }}>
                  Boas Práticas de Operação
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                Mantenha sempre um <strong>tom calmo e firme</strong>; evite congestionar a rede com dados supérfluos; <strong>não grite e não discuta</strong> pelo rádio. Sempre confirme o recebimento com <span style={{ color: '#facc15' }}>QSL</span> e, caso a mensagem não esteja clara, solicite repetição com <span style={{ color: '#facc15' }}>QSM</span>.
              </p>
            </div>
          </div>
        </PixelCard>
      </div>

      {/* Modal / Lightbox para zoom nas fotos de rádio */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '25px',
            cursor: 'zoom-out'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(239, 68, 68, 0.4)',
              border: '2px solid rgba(239, 68, 68, 0.6)'
            }}
          >
            <button
              onClick={() => setModalImg(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                zIndex: 10
              }}
            >
              ✕
            </button>
            <img
              src={modalImg.src}
              alt={modalImg.titulo}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
