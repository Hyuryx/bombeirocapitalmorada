'use client';
import React from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import GlitchText from './GlitchText';

export default function ReactPlanilhaTablet() {
  return (
    <div className="flex flex-col" style={{ zIndex: 10, width: '90%', maxWidth: '1200px', alignSelf: 'center' }}>
      <ContainerScroll
        titleComponent={
          <h1 className="glitch-title" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <GlitchText speed={1} enableShadows enableOnHover={false}>PLANILHAS</GlitchText>
          </h1>
        }>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden' }}>
            <button 
                onClick={() => {
                  const iframe = document.getElementById('planilha-iframe');
                  if (iframe) {
                    if (iframe.requestFullscreen) iframe.requestFullscreen();
                    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
                    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
                  }
                }} 
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', zIndex: 10, fontWeight: 'bold', transition: 'all 0.3s' }} 
                onMouseOver={(e) => e.currentTarget.style.background='rgba(0,0,0,0.9)'} 
                onMouseOut={(e) => e.currentTarget.style.background='rgba(0,0,0,0.7)'}>
                ⛶ Expandir Tela Cheia
            </button>
            <iframe 
              id="planilha-iframe" 
              src="https://docs.google.com/spreadsheets/d/1rnK19wQkGAWG907tO530ReVBcpRFu-4VN7QzdbIFgbo/htmlembed?widget=true&headers=false" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ background: 'white' }}>
            </iframe>
        </div>
      </ContainerScroll>
    </div>
  );
}
