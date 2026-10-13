'use client';

import React, { useState, useEffect, useRef } from 'react';
import PixelCard from './ui/PixelCard';
import StickerPeel from './StickerPeel';
import ShinyText from './ShinyText';
import MobileSubnav from './MobileSubnav';

export default function ReactSidebarModulacao() {
  const [activeId, setActiveId] = useState('home');
  const sidebarRef = useRef(null);

  const modulacaoItems = [
    {
      id: 'home',
      title: 'Início',
      subtitle: null,
      accentColor: '#00d2ff',
      colors: ['#e0f2fe', '#38bdf8', '#00d2ff'],
      glowColor: '#00d2ff',
      icon: (
        <svg className="anim-icon icon-home" viewBox="0 0 24 24" stroke="#00d2ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'codigos-q',
      title: 'Códigos Q',
      subtitle: null,
      accentColor: '#10b981',
      colors: ['#d1fae5', '#34d399', '#10b981'],
      glowColor: '#10b981',
      icon: (
        <svg className="anim-icon icon-q-code" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="5" />
          <line x1="12.5" y1="15.5" x2="15" y2="18" />
          <path className="wave1" d="M17 9c1 1 1 3 0 4" />
          <path className="wave2" d="M20 7c2 2 2 6 0 8" />
        </svg>
      )
    },
    {
      id: 'alfabeto-fonetico',
      title: 'Alfabeto Fonético',
      subtitle: null,
      accentColor: '#b142ff',
      colors: ['#f3e8ff', '#c084fc', '#b142ff'],
      glowColor: '#b142ff',
      icon: (
        <svg className="anim-icon icon-head" viewBox="0 0 24 24" stroke="#b142ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="4" />
          <path d="M8 14c-4 0-6 2-6 6h12c0-4-2-6-6-6z" />
          <path className="wave1" d="M15 8c1.5 1.5 1.5 4.5 0 6" />
          <path className="wave2" d="M18 5c3 3 3 9 0 12" />
        </svg>
      )
    },
    {
      id: 'numeracao-fonetica',
      title: 'Numeração Fonética',
      subtitle: null,
      accentColor: '#ff8c00',
      colors: ['#ffedd5', '#fb923c', '#ff8c00'],
      glowColor: '#ff8c00',
      icon: (
        <svg className="anim-icon icon-number" viewBox="0 0 24 24" stroke="#ff8c00" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <text x="4" y="18" fontSize="18" fontFamily="monospace" fontWeight="bold" fill="none" stroke="#ff8c00">7</text>
          <path className="wave1" d="M14 8c1.5 1.5 1.5 4.5 0 6" />
          <path className="wave2" d="M17 5c3 3 3 9 0 12" />
        </svg>
      )
    },
    {
      id: 'padrao-radio',
      title: 'Padrão de Rádio',
      subtitle: null,
      accentColor: '#fde047',
      colors: ['#fef9c3', '#fde047', '#eab308'],
      glowColor: '#fde047',
      icon: (
        <svg className="anim-icon icon-radio" viewBox="0 0 24 24" stroke="#fde047" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="10" height="14" rx="2" />
          <line x1="9" y1="8" x2="9" y2="3" />
          <path className="wave1" d="M14 4c1 1 1 3 0 4" />
          <path className="wave2" d="M17 2c2 2 2 6 0 8" />
        </svg>
      )
    }
  ];

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [theme, setTheme] = useState('dark');
  const [noEffects, setNoEffects] = useState(false);

  const handleSelect = (targetId) => {
    setActiveId(targetId);

    if (targetId === 'configuracoes') {
      window.dispatchEvent(new CustomEvent('openConfiguracoes'));
      return;
    }

    const globalView = sidebarRef.current?.closest('.global-view') || document.getElementById('view-modulacao');
    if (globalView) {
      const sections = globalView.querySelectorAll('.content-section');
      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active');
          sec.style.display = 'block';
        } else {
          sec.classList.remove('active');
          sec.style.display = 'none';
        }
      });
    }

    window.dispatchEvent(new CustomEvent('tabChanged', { detail: { targetId } }));
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

    const onTabChanged = (e) => {
      if (e.detail?.targetId && modulacaoItems.some(item => item.id === e.detail.targetId)) {
        setActiveId(e.detail.targetId);
      }
    };
    window.addEventListener('tabChanged', onTabChanged);

    return () => {
      window.removeEventListener('userProfileUpdated', onProfileUpdate);
      window.removeEventListener('tabChanged', onTabChanged);
    };
  }, []);

  return (
    <>
      {/* Barra de Sub-abas Mobile (Visível apenas em celulares e tablets) */}
      <MobileSubnav
        items={modulacaoItems}
        activeId={activeId}
        onSelect={handleSelect}
        sectionTitle="MODULAÇÃO CBM"
        theme={theme}
      />

      <aside className="sidebar" id="sidebar-modulacao" ref={sidebarRef}>
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
          onClick={() => window.dispatchEvent(new CustomEvent('openConfiguracoes'))}
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

      {/* Lista com espaçamento superior */}
      <nav className="sidebar-nav">
        <ul>
          {modulacaoItems.map(item => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`sidebar-nav-li ${isActive ? 'active' : ''}`}
                data-target={item.id}
                style={{
                  '--active-color': item.accentColor,
                  '--btn-glow': item.glowColor
                }}
                onClick={() => handleSelect(item.id)}
              >
                <PixelCard
                  colors={item.colors}
                  glowColor={item.glowColor}
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
                    <div className="sidebar-btn-icon" style={{ color: item.accentColor }}>
                      {item.icon}
                    </div>
                    <div className="sidebar-btn-info">
                      <span className="sidebar-btn-title">{item.title}</span>
                      {item.subtitle && (
                        <span className="sidebar-btn-subtitle">{item.subtitle}</span>
                      )}
                    </div>
                  </div>
                </PixelCard>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Seção Inferior: Botão Configurações + Logo Capital Morada */}
      <div className="sidebar-bottom-section">
        <div
          className={`sidebar-nav-li ${activeId === 'configuracoes' ? 'active' : ''}`}
          data-target="configuracoes"
          style={{
            '--active-color': '#94a3b8',
            '--btn-glow': '#cbd5e1'
          }}
          onClick={() => handleSelect('configuracoes')}
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
                <svg className="anim-icon icon-settings" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
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
            src="assets/fotos/logo-capital.png"
            className="sidebar-capital-logo"
            alt="Capital Morada"
            title="Capital Morada"
          />
        </div>
      </div>
    </aside>
    </>
  );
}
