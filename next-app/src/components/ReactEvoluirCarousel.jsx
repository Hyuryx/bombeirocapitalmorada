'use client';
import React from 'react';
import MagicBento from './ui/MagicBento';

export default function ReactEvoluirCarousel({ items }) {
  const handleItemClick = (index) => {
    const item = items[index];
    const originalItemProps = Array.isArray(item) ? item[0]?.props : item?.props;
    
    if (window.openModalEvoluir) {
      const mockEl = document.createElement('div');
      if (originalItemProps) {
        Object.keys(originalItemProps).forEach(key => {
          if (key.startsWith('data-')) {
            mockEl.setAttribute(key, originalItemProps[key]);
          }
        });
      }
      window.openModalEvoluir(mockEl);
    }
  };

  return (
    <div style={{ width: '100%', padding: '40px 0' }}>
      <MagicBento 
        items={items}
        onItemClick={handleItemClick}
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={400}
        particleCount={15}
        glowColor="255, 26, 26" // Glow vermelho neon elétrico
        disableAnimations={false}
      />
    </div>
  );
}
