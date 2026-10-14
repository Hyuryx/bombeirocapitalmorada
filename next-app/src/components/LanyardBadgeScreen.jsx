'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Lanyard from './Lanyard';
import NasaParticles from './NasaParticles';
import './LanyardBadgeScreen.css';

export default function LanyardBadgeScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('cbm_auth_unlocked') !== 'true';
    }
    return true;
  });
  const [isHiding, setIsHiding] = useState(false);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem('cbm_auth_unlocked') === 'true') {
      setIsVisible(false);
    }

    // Eventos para abrir ou fechar o crachá
    const handleShowCracha = () => {
      setIsHiding(false);
      setIsVisible(true);
      isTransitioningRef.current = false;
    };

    const handleLockScreen = () => {
      setIsHiding(false);
      setIsVisible(true);
      isTransitioningRef.current = false;
    };

    window.addEventListener('cbm_show_cracha', handleShowCracha);
    window.addEventListener('cbm_lock_screen', handleLockScreen);

    return () => {
      window.removeEventListener('cbm_show_cracha', handleShowCracha);
      window.removeEventListener('cbm_lock_screen', handleLockScreen);
    };
  }, []);

  const playPullSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {}
  }, []);

  // Transição do Crachá para a Tela de Login
  const handleTriggerLogin = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    playPullSound();
    setIsHiding(true);

    setTimeout(() => {
      setIsVisible(false);
      isTransitioningRef.current = false;

      // Garantir foco no input da senha de login
      const loginPassword = document.getElementById('login-password');
      if (loginPassword) {
        loginPassword.focus();
      }

      // Notificar a tela de login
      window.dispatchEvent(new CustomEvent('cbm_cracha_dismissed'));
    }, 600);
  }, [playPullSound]);

  if (!isVisible) return null;

  return (
    <div
      className={`lanyard-screen-wrapper ${isHiding ? 'is-hiding' : ''}`}
      id="cbm-lanyard-overlay"
      aria-label="Crachá de Acesso CBM"
    >
      {/* Brilhos e partículas NASA vermelhas cinematográficas */}
      <div className="lanyard-ambient-glow" />
      <NasaParticles id="particles-cracha" style={{ zIndex: 1, opacity: 0.95 }} />

      {/* Crachá 3D Lanyard com física Three.js */}
      <div className="lanyard-canvas-container">
        <Lanyard
          frontImage="/assets/telalogin/celular.png"
          backImage="/assets/telalogin/celular.png"
          imageFit="cover"
          cardColor="#0a0a0a"
          orientation="portrait"
          finish="glossy"
          cornerRadius={0.25}
          size={0.62}
          anchor="center"
          strapLength={0.48}
          strapColor="#111111"
          strapWidth={0.65}
          metal="silver"
          gravity={1}
          damping={0.5}
          elasticity={0.5}
          breeze={0.35}
          interactive={true}
          intro={true}
          onPullDown={handleTriggerLogin}
        />
      </div>

      {/* Legenda visual "Tente arrastar" com seta */}
      <div
        className="lanyard-hint-container"
        style={{ pointerEvents: 'none' }}
        aria-label="Puxe o crachá até embaixo para acessar"
      >
        <div className="lanyard-hint-text">
          <span>Tente arrastar</span>
        </div>
        <div className="lanyard-pull-arrow">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
        <span className="lanyard-hint-sub">Puxe o crachá até embaixo para acessar</span>
      </div>
    </div>
  );
}
