'use client';

import React, { useState, useEffect } from 'react';
import GradientWaves from './GradientWaves';
import NasaParticles from './NasaParticles';

export default function ThemeBackground() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const updateTheme = () => {
      const isLight =
        document.documentElement.classList.contains('light-theme') ||
        document.body.classList.contains('light-theme') ||
        localStorage.getItem('cbm_theme') === 'light';
      setTheme(isLight ? 'light' : 'dark');
    };

    updateTheme();

    const onProfileUpdate = (e) => {
      if (e.detail?.theme) {
        setTheme(e.detail.theme);
      }
    };

    window.addEventListener('userProfileUpdated', onProfileUpdate);
    window.addEventListener('storage', updateTheme);

    // Observa mudanças nas classes de <html> e <body> para troca instantânea de tema
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('userProfileUpdated', onProfileUpdate);
      window.removeEventListener('storage', updateTheme);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        id="gradient-waves-bg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background: theme === 'light' 
            ? 'transparent' 
            : 'radial-gradient(circle at 50% 30%, #161014 0%, #0c090c 55%, #050406 100%)'
        }}
      >
        {theme === 'light' ? (
          /* Fundo do Tema Claro: Ondas fluidas com tonalidade Cinza Fumaça */
          <GradientWaves
            key="theme-light-waves"
            horizonColor="#8c96a4"
            waveColor="#333c4d"
            crestColor="#e2e8f0"
            speed={0.35}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1.0}
            opacity={1.0}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.04}
          />
        ) : (
          /* Fundo do Tema Escuro: Tonalidade idêntica ao Painel de Avisos com feixes avermelhados sutis */
          <div className="cbm-light-rays" />
        )}
      </div>

      {/* Partículas NASA Vermelhas Flutuantes (Idênticas ao Painel de Avisos) */}
      <NasaParticles
        id="particles-portal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: theme === 'light' ? 0.45 : 0.85
        }}
      />
    </>
  );
}
