'use client';

import React, { useState, useEffect, useRef } from 'react';
import PixelCard from './ui/PixelCard';
import StickerPeel from './StickerPeel';
import ShinyText from './ShinyText';

import MobileSubnav from './MobileSubnav';

export default function ReactSidebarCursos() {
  const [activeId, setActiveId] = useState('curso-evoluir');
  const sidebarRef = useRef(null);

  const cursosItems = [
    {
      id: 'curso-evoluir',
      title: 'Evoluir',
      subtitle: null,
      accentColor: '#a855f7',
      colors: ['#f3e8ff', '#d8b4fe', '#a855f7'],
      glowColor: '#a855f7',
      icon: (
        <svg className="anim-icon icon-evoluir" viewBox="0 0 24 24" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline className="evoluir-step1" points="17 11 12 6 7 11" />
          <polyline className="evoluir-step2" points="17 17 12 12 7 17" />
        </svg>
      )
    },
    {
      id: 'curso-aereo',
      title: 'Curso de Piloto',
      subtitle: '10 PILOTOS EM ATIVIDADE',
      accentColor: '#3b82f6',
      colors: ['#e0f2fe', '#7dd3fc', '#3b82f6'],
      glowColor: '#3b82f6',
      icon: (
        <svg className="anim-icon icon-aereo" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line className="heli-rotor" x1="6" y1="5" x2="18" y2="5" />
          <line x1="12" y1="5" x2="12" y2="9" />
          <path d="M4 14a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M4 12H1" />
          <line className="heli-tail-rotor" x1="2" y1="10" x2="2" y2="14" />
          <line x1="7" y1="16" x2="7" y2="19" />
          <line x1="15" y1="16" x2="15" y2="19" />
          <line x1="5" y1="19" x2="17" y2="19" />
        </svg>
      )
    },
    {
      id: 'curso-aquatico',
      title: 'Resgate Aquático',
      subtitle: null,
      accentColor: '#0ea5e9',
      colors: ['#e0f2fe', '#38bdf8', '#0ea5e9'],
      glowColor: '#0ea5e9',
      icon: (
        <svg className="anim-icon icon-water" viewBox="0 0 24 24" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="water-wave1" d="M2 12c2 0 4-4 8-4s6 4 8 4 6-4 8-4" />
          <path className="water-wave2" d="M2 16c2 0 4-4 8-4s6 4 8 4 6-4 8-4" />
        </svg>
      )
    },
    {
      id: 'curso-montanha',
      title: 'Resgate em Montanha',
      subtitle: null,
      accentColor: '#10b981',
      colors: ['#d1fae5', '#34d399', '#10b981'],
      glowColor: '#10b981',
      icon: (
        <svg className="anim-icon icon-mountain" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="mountain-path" d="M1 20l7-12 5 8 4-5 6 9z" />
        </svg>
      )
    },
    {
      id: 'curso-paraquedismo',
      title: 'Paraquedismo',
      subtitle: null,
      accentColor: '#f59e0b',
      colors: ['#fef3c7', '#fde047', '#f59e0b'],
      glowColor: '#f59e0b',
      icon: (
        <svg className="anim-icon icon-parachute" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path className="parachute-top" d="M12 2C6.48 2 2 6.48 2 12h20c0-5.52-4.48-10-10-10z" />
          <path className="parachute-cord" d="M12 12v10" />
        </svg>
      )
    },
    {
      id: 'curso-coer',
      title: 'COER',
      subtitle: 'Em andamento',
      accentColor: '#ef4444',
      colors: ['#fee2e2', '#f87171', '#ef4444'],
      glowColor: '#ef4444',
      icon: (
        <svg className="anim-icon icon-coer" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="14" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      )
    },
    {
      id: 'curso-tripulantes',
      title: 'Tripulantes',
      subtitle: 'Em andamento',
      accentColor: '#06b6d4',
      colors: ['#cffafe', '#22d3ee', '#06b6d4'],
      glowColor: '#06b6d4',
      icon: (
        <svg className="anim-icon icon-tripulantes" viewBox="0 0 24 24" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      )
    },
    {
      id: 'curso-gtm',
      title: 'GTM',
      subtitle: 'Em desenvolvimento',
      accentColor: '#f97316',
      colors: ['#ffedd5', '#fb923c', '#f97316'],
      glowColor: '#f97316',
      icon: (
        <svg className="anim-icon icon-gtm" viewBox="0 0 24 24" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle className="moto-wheel" cx="6" cy="16" r="3" />
          <circle className="moto-wheel" cx="18" cy="16" r="3" />
          <path className="moto-frame" d="M9 16L12.5 9h4l2.5 4" />
          <path className="moto-handle" d="M12.5 9L10 5.5h2" />
          <path className="moto-engine" d="M14.5 11l-2 5" />
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

    const globalView = sidebarRef.current?.closest('.global-view') || document.getElementById('view-cursos');
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
      if (e.detail?.targetId && cursosItems.some(item => item.id === e.detail.targetId)) {
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
        items={cursosItems}
        activeId={activeId}
        onSelect={handleSelect}
        sectionTitle="CURSOS CBM"
        theme={theme}
      />

      <aside className="sidebar sidebar-cursos" id="sidebar-cursos" ref={sidebarRef}>
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

      {/* Lista de Cursos com espaçamento superior */}
      <nav className="sidebar-nav">
        <ul>
          {cursosItems.map(item => {
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
            src="/assets/fotos/logo-capita2l.png"
            className="sidebar-capital-logo"
            alt="Corpo de Bombeiros Capital"
            title="Corpo de Bombeiros Capital"
          />
        </div>
      </div>
    </aside>
    </>
  );
}
