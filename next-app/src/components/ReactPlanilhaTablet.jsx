'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import GlitchText from './GlitchText';

export default function ReactPlanilhaTablet() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const planilhaUrl = "https://docs.google.com/spreadsheets/d/1rnK19wQkGAWG907tO530ReVBcpRFu-4VN7QzdbIFgbo/htmlembed?widget=true&headers=false";
  const planilhaDirectUrl = "https://docs.google.com/spreadsheets/d/1rnK19wQkGAWG907tO530ReVBcpRFu-4VN7QzdbIFgbo/edit?usp=sharing";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenFullscreen = () => {
    setIsFullscreen(true);
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  // Travar o scroll do body e esconder navbar quando em tela cheia
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('planilha-fullscreen-active');
      document.documentElement.classList.add('planilha-fullscreen-active');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('planilha-fullscreen-active');
      document.documentElement.classList.remove('planilha-fullscreen-active');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleCloseFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('planilha-fullscreen-active');
      document.documentElement.classList.remove('planilha-fullscreen-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  const fullscreenModal = isFullscreen && mounted ? (
    createPortal(
      <div 
        id="cbm-planilha-fullscreen-modal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          height: '100dvh',
          zIndex: 2147483647,
          background: '#0d0f15',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {/* Barra superior de controle */}
        <div
          style={{
            flex: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 18px',
            background: '#161922',
            borderBottom: '2px solid #ef4444',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            zIndex: 2147483647,
            minHeight: '56px',
            boxSizing: 'border-box',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', display: 'inline-block', flexShrink: 0 }} />
            <div>
              <h2 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>CB Morada Valley — Planilha Operacional</h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Corpo de Bombeiros Capital Morada</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <a
              href={planilhaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              ↗ Abrir Nova Aba
            </a>
            <button
              type="button"
              onClick={handleCloseFullscreen}
              style={{
                fontSize: '0.88rem',
                fontWeight: 800,
                padding: '8px 18px',
                borderRadius: '8px',
                background: '#ef4444',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.7)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ✕ Sair da Tela Cheia
            </button>
          </div>
        </div>

        {/* Container do Iframe ocupando 100% da altura restante */}
        <div style={{ flex: 1, width: '100%', height: 'calc(100% - 56px)', background: '#ffffff', position: 'relative' }}>
          <iframe
            src={planilhaUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="fullscreen"
            title="Planilha Operacional em Tela Cheia"
            style={{ width: '100%', height: '100%', border: 'none', background: 'white', display: 'block' }}
          />
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      <div className="flex flex-col" style={{ zIndex: 10, width: '100%', maxWidth: '1200px', alignSelf: 'center' }}>
        <ContainerScroll
          titleComponent={
            <h1 className="glitch-title" style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <GlitchText speed={1} enableShadows enableOnHover={false}>PLANILHAS</GlitchText>
            </h1>
          }
        >
          <div className="cbm-tablet-inner-container">
            {/* Barra de controle / Header do Tablet CBM (Não sobrepõe o conteúdo da tabela) */}
            <div className="cbm-tablet-header-bar">
              <div className="cbm-tablet-status">
                <span className="cbm-status-pulse" />
                <span className="cbm-tablet-status-title">CB Morada Valley</span>
                <span className="cbm-tablet-badge">Oficial</span>
              </div>

              <div className="cbm-tablet-actions">
                <a
                  href={planilhaDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cbm-tablet-btn cbm-ext-btn"
                  title="Abrir no Google Planilhas"
                >
                  ↗ Abrir
                </a>
                <button
                  type="button"
                  onClick={handleOpenFullscreen}
                  className="cbm-tablet-btn cbm-fullscreen-btn"
                >
                  ⛶ Expandir Tela Cheia
                </button>
              </div>
            </div>

            {/* Iframe da Planilha dentro do Tablet */}
            <div className="cbm-tablet-iframe-wrapper">
              <iframe
                id="planilha-iframe"
                src={planilhaUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="fullscreen"
                title="Planilha Operacional CB Morada Valley"
                style={{ background: 'white', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* Renderiza via Portal no document.body para ficar absoluto acima da navbar global */}
      {fullscreenModal}

      <style jsx global>{`
        /* Esconder completamente a barra de navegação global quando em tela cheia */
        body.planilha-fullscreen-active .global-navbar,
        html.planilha-fullscreen-active .global-navbar {
          display: none !important;
          pointer-events: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          z-index: -9999 !important;
        }
      `}</style>

      <style jsx>{`
        .cbm-tablet-inner-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .cbm-tablet-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: #11141c;
          border-bottom: 2px solid rgba(255, 26, 26, 0.45);
          gap: 10px;
          flex-wrap: wrap;
        }

        :global(body.light-theme) .cbm-tablet-header-bar,
        :global(html.light-theme) .cbm-tablet-header-bar {
          background: #f1f5f9;
          border-bottom: 2px solid rgba(239, 68, 68, 0.6);
        }

        .cbm-tablet-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cbm-status-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: cbmPulse 2s infinite;
        }

        @keyframes cbmPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .cbm-tablet-status-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        :global(body.light-theme) .cbm-tablet-status-title,
        :global(html.light-theme) .cbm-tablet-status-title {
          color: #0f172a;
        }

        .cbm-tablet-badge {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 26, 26, 0.2);
          color: #ff3b3b;
          border: 1px solid rgba(255, 26, 26, 0.4);
          text-transform: uppercase;
        }

        .cbm-tablet-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
        }

        .cbm-tablet-btn {
          font-size: 0.82rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .cbm-ext-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        :global(body.light-theme) .cbm-ext-btn,
        :global(html.light-theme) .cbm-ext-btn {
          background: rgba(0, 0, 0, 0.05);
          color: #475569;
          border-color: rgba(0, 0, 0, 0.12);
        }

        .cbm-ext-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
        }

        .cbm-fullscreen-btn {
          background: rgba(255, 26, 26, 0.85);
          color: #ffffff;
          border: 1px solid #ff1a1a;
          box-shadow: 0 0 10px rgba(255, 26, 26, 0.4);
        }

        .cbm-fullscreen-btn:hover {
          background: #ff1a1a;
          box-shadow: 0 0 16px rgba(255, 26, 26, 0.7);
          transform: translateY(-1px);
        }

        .cbm-tablet-iframe-wrapper {
          flex: 1;
          width: 100%;
          height: calc(100% - 46px);
          min-height: 420px;
          position: relative;
        }

        @media (max-width: 600px) {
          .cbm-tablet-header-bar {
            padding: 6px 10px;
          }
          .cbm-tablet-status-title {
            font-size: 0.8rem;
          }
          .cbm-tablet-badge {
            display: none;
          }
          .cbm-tablet-btn {
            font-size: 0.75rem;
            padding: 5px 8px;
          }
        }
      `}</style>
    </>
  );
}
