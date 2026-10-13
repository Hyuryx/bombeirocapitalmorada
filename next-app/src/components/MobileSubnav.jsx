'use client';

import React, { useState } from 'react';

export default function MobileSubnav({ items, activeId, onSelect, sectionTitle = 'Navegação', theme = 'dark' }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeItem = items.find((it) => it.id === activeId) || items[0] || null;

  const handleItemClick = (id) => {
    onSelect(id);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className={`cbm-mobile-subnav-root ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}>
        <div className="cbm-mobile-subnav-bar">
          {/* Informação da Aba Atual Ativa */}
          <div className="cbm-active-display" onClick={() => setIsDrawerOpen(true)}>
            <div className="cbm-active-icon-badge" style={{ '--badge-color': activeItem?.accentColor || '#ef4444' }}>
              {activeItem?.icon}
            </div>
            <div className="cbm-active-text-group">
              <span className="cbm-active-label">MÓDULO ATIVO</span>
              <span className="cbm-active-title">{activeItem?.title || sectionTitle}</span>
            </div>
          </div>

          {/* Botão de Lista Único (com três tracinhos/menu) */}
          <button
            type="button"
            className="cbm-menu-toggle-btn"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Abrir lista de opções"
            title="Ver todas as opções"
          >
            <div className="cbm-hamburger-icon">
              <span />
              <span />
              <span />
            </div>
            <span className="cbm-menu-toggle-text">Lista</span>
          </button>
        </div>
      </div>

      {/* Drawer / Modal Mobile com Todas as Abas Expandidas */}
      {isDrawerOpen && (
        <div className="cbm-mobile-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div 
            className="cbm-mobile-drawer-sheet" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cbm-drawer-handle-bar" />
            
            <div className="cbm-drawer-header">
              <div className="cbm-drawer-title-group">
                <span className="cbm-drawer-badge">SELECIONAR</span>
                <h3 className="cbm-drawer-title">{sectionTitle}</h3>
              </div>
              <button 
                type="button" 
                className="cbm-drawer-close-btn" 
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="cbm-drawer-list">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`cbm-drawer-item ${isActive ? 'active' : ''}`}
                    style={{ '--item-accent': item.accentColor }}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="cbm-drawer-item-icon">
                      {item.icon}
                    </div>
                    <div className="cbm-drawer-item-info">
                      <span className="cbm-drawer-item-title">{item.title}</span>
                      {item.subtitle && (
                        <span className="cbm-drawer-item-sub">{item.subtitle}</span>
                      )}
                    </div>
                    {isActive ? (
                      <span className="cbm-drawer-active-tag">Ativo</span>
                    ) : (
                      <span className="cbm-drawer-item-arrow">→</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cbm-mobile-subnav-root {
          display: none;
          width: 100%;
          position: sticky;
          top: 66px;
          z-index: 1000;
          box-sizing: border-box;
        }

        @media (max-width: 820px) {
          .cbm-mobile-subnav-root {
            display: block;
          }
        }

        .cbm-mobile-subnav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: rgba(12, 14, 20, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          gap: 12px;
        }

        :global(body.light-theme) .cbm-mobile-subnav-bar,
        :global(html.light-theme) .cbm-mobile-subnav-bar {
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }

        .cbm-active-display {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          cursor: pointer;
          overflow: hidden;
        }

        .cbm-active-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--badge-color, rgba(239, 68, 68, 0.3));
        }

        :global(body.light-theme) .cbm-active-icon-badge,
        :global(html.light-theme) .cbm-active-icon-badge {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .cbm-active-icon-badge :global(svg) {
          width: 20px;
          height: 20px;
        }

        .cbm-active-text-group {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .cbm-active-label {
          font-size: 0.68rem;
          font-weight: 800;
          color: #ef4444;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .cbm-active-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :global(body.light-theme) .cbm-active-title,
        :global(html.light-theme) .cbm-active-title {
          color: #0f172a;
        }

        /* Botão com 3 tracinhos (Hamburger) */
        .cbm-menu-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(168, 85, 247, 0.2));
          border: 1px solid rgba(239, 68, 68, 0.45);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.25);
          transition: all 0.2s ease;
        }

        :global(body.light-theme) .cbm-menu-toggle-btn,
        :global(html.light-theme) .cbm-menu-toggle-btn {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(147, 51, 234, 0.12));
          border-color: rgba(239, 68, 68, 0.5);
          color: #dc2626;
        }

        .cbm-menu-toggle-btn:active {
          transform: scale(0.96);
        }

        .cbm-hamburger-icon {
          display: flex;
          flex-direction: column;
          gap: 3px;
          width: 14px;
        }

        .cbm-hamburger-icon span {
          display: block;
          height: 2px;
          width: 100%;
          background: currentColor;
          border-radius: 2px;
        }

        /* 📱 BOTTOM SHEET DRAWER */
        .cbm-mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          animation: cbmFadeIn 0.25s ease-out;
        }

        @keyframes cbmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cbm-mobile-drawer-sheet {
          background: #11141c;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px 24px 0 0;
          padding: 12px 18px 30px 18px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8);
          animation: cbmSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        :global(body.light-theme) .cbm-mobile-drawer-sheet,
        :global(html.light-theme) .cbm-mobile-drawer-sheet {
          background: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
        }

        @keyframes cbmSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .cbm-drawer-handle-bar {
          width: 44px;
          height: 4px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          margin: 0 auto 12px auto;
        }

        :global(body.light-theme) .cbm-drawer-handle-bar,
        :global(html.light-theme) .cbm-drawer-handle-bar {
          background: rgba(0, 0, 0, 0.2);
        }

        .cbm-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 12px;
        }

        :global(body.light-theme) .cbm-drawer-header,
        :global(html.light-theme) .cbm-drawer-header {
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }

        .cbm-drawer-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cbm-drawer-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #ef4444;
          letter-spacing: 1px;
        }

        .cbm-drawer-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        :global(body.light-theme) .cbm-drawer-title,
        :global(html.light-theme) .cbm-drawer-title {
          color: #0f172a;
        }

        .cbm-drawer-close-btn {
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #e2e8f0;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(body.light-theme) .cbm-drawer-close-btn,
        :global(html.light-theme) .cbm-drawer-close-btn {
          background: rgba(0, 0, 0, 0.06);
          color: #334155;
        }

        .cbm-drawer-list {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-right: 4px;
          max-height: 60vh;
          -webkit-overflow-scrolling: touch;
        }

        .cbm-drawer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }

        :global(body.light-theme) .cbm-drawer-item,
        :global(html.light-theme) .cbm-drawer-item {
          background: rgba(241, 245, 249, 0.85);
          border-color: rgba(203, 213, 225, 0.85);
          color: #1e293b;
        }

        .cbm-drawer-item:hover,
        .cbm-drawer-item:active {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        :global(body.light-theme) .cbm-drawer-item:hover,
        :global(html.light-theme) .cbm-drawer-item:active {
          background: #f8fafc;
        }

        .cbm-drawer-item.active {
          background: rgba(239, 68, 68, 0.12);
          border-color: var(--item-accent, #ef4444);
          color: #ffffff;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
        }

        :global(body.light-theme) .cbm-drawer-item.active {
          background: rgba(239, 68, 68, 0.08);
          color: #0f172a;
        }

        .cbm-drawer-item-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        :global(body.light-theme) .cbm-drawer-item-icon {
          background: rgba(0, 0, 0, 0.05);
        }

        .cbm-drawer-item-icon :global(svg) {
          width: 20px;
          height: 20px;
        }

        .cbm-drawer-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cbm-drawer-item-title {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .cbm-drawer-item-sub {
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .cbm-drawer-active-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--item-accent, #ef4444);
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.15);
        }

        .cbm-drawer-item-arrow {
          font-size: 1.1rem;
          color: #64748b;
        }
      `}</style>
    </>
  );
}
