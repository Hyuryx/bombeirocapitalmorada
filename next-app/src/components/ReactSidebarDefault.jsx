'use client';

import React, { useRef, useState, useEffect } from 'react';
import PixelCard from './ui/PixelCard';
import StickerPeel from './StickerPeel';
import ShinyText from './ShinyText';

export default function ReactSidebarDefault() {
  const sidebarRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [theme, setTheme] = useState('dark');
  const [noEffects, setNoEffects] = useState(false);

  useEffect(() => {
    try {
      setUserName(localStorage.getItem('cbm_user_name') || '');
      setUserId(localStorage.getItem('cbm_user_id') || '');
      setTheme(localStorage.getItem('cbm_theme') || 'dark');
      setNoEffects(localStorage.getItem('cbm-no-effects') === 'true');
    } catch (e) {}

    const onProfileUpdate = (e) => {
      if (e.detail?.name !== undefined) setUserName(e.detail.name);
      if (e.detail?.id !== undefined) setUserId(e.detail.id);
      if (e.detail?.theme !== undefined) setTheme(e.detail.theme);
      if (e.detail?.noEffects !== undefined) setNoEffects(e.detail.noEffects);
    };
    window.addEventListener('userProfileUpdated', onProfileUpdate);
    return () => window.removeEventListener('userProfileUpdated', onProfileUpdate);
  }, []);

  const handleOpenConfiguracoes = () => {
    window.dispatchEvent(new CustomEvent('openConfiguracoes'));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('cbm_auth_unlocked');
      sessionStorage.removeItem('cbm_auth_unlocked');
      sessionStorage.removeItem('cbm_session_start');
      sessionStorage.removeItem('cbm_last_activity');
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (e) {}

    document.documentElement.classList.remove('cbm-unlocked');
    document.body.classList.add('locked');
    window.dispatchEvent(new CustomEvent('cbm_lock_screen'));
    window.dispatchEvent(new CustomEvent('cbm_show_cracha'));
  };

  return (
    <aside className="sidebar sidebar-default" ref={sidebarRef}>
      {/* Top Header com PORTAL CBM, Logo do Bombeiro e Saudação */}
      <div className="sidebar-top-header">
        <span 
          className="sidebar-portal-title"
          style={{
            color: theme === 'light' ? '#000000' : '#ffffff',
            WebkitTextFillColor: theme === 'light' ? '#000000' : '#ffffff',
            textShadow: theme === 'light' ? 'none' : undefined
          }}
        >
          PORTAL CBM
        </span>
        <div className="sidebar-logo-container">
          <StickerPeel
            imageSrc="assets/iconesite/icone.png"
            rotate={0}
            peelBackHoverPct={32}
            peelBackActivePct={44}
            shadowIntensity={0.65}
            lightingIntensity={0}
            enableLighting={false}
            peelDirection={-25}
            alt="Logo Bombeiros"
            className="sidebar-sticker-logo"
            draggable={false}
          />
        </div>
        <div
          className="sidebar-user-welcome"
          onClick={handleOpenConfiguracoes}
          title="Clique para alterar seu nome nas configurações"
        >
          <span className="welcome-tag">SEJA BEM-VINDO</span>
          <span className="welcome-name">
            <ShinyText
              text={userName || 'Combatente'}
              color={theme === 'light' ? '#2b2f38' : '#e2e8f0'}
              shineColor={theme === 'light' ? '#64748b' : '#ffffff'}
              speed={2}
              shineWidth={45}
              softness={0.8}
              direction="left"
              trigger="loop"
              delay={0.5}
              disabled={noEffects}
            />
          </span>
          {userId && (
            <span className="welcome-id">
              {userId}
            </span>
          )}
        </div>
      </div>

      {/* Espaço flexível intermediário */}
      <div style={{ flex: 1, minHeight: '40px' }} />

      {/* Seção Inferior: Botão Configurações + Logo Capital Morada */}
      <div className="sidebar-bottom-section">
        <div
          className="sidebar-nav-li"
          data-target="configuracoes"
          style={{
            '--active-color': '#94a3b8',
            '--btn-glow': '#cbd5e1'
          }}
          onClick={handleOpenConfiguracoes}
          title="Configurações"
        >
          <PixelCard
            colors={['#f8fafc', '#cbd5e1', '#94a3b8']}
            glowColor="#cbd5e1"
            shape="square"
            origin="center"
            gap={5}
            pixelSize={2}
            speed={35}
            revealDuration={500}
            spotlight={0.5}
            glow={0.5}
            opacity={0.35}
            fade={0.7}
            trigger="hover"
            radius={14}
            clickPulse
            intro={false}
            theme="dark"
            className="sidebar-pixel-card"
          >
            <div className="sidebar-btn-inner">
              <div className="sidebar-btn-icon" style={{ color: '#cbd5e1' }}>
                <svg
                  className="anim-icon icon-settings"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="sidebar-btn-info">
                <span className="sidebar-btn-title">Configurações</span>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* Botão SAIR Tático Neon Vermelho */}
        <button
          className="sidebar-btn-logout"
          onClick={handleLogout}
          title="Sair do Sistema"
          type="button"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>SAIR</span>
        </button>

        <div className="sidebar-capital-container">
          <img
            src="/assets/fotos/logo-capita2l.png"
            className="sidebar-capital-logo"
            alt="Corpo de Bombeiros Capital"
            title="Corpo de Bombeiros Capital"
          />
        </div>
      </div>
    </aside>
  );
}
