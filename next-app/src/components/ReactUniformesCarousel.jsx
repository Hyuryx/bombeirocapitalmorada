'use client';

import React from 'react';
import CircularCarousel from './CircularCarousel';

const uniformItems = [
  { 
    src: 'assets/uniformes/1.png', 
    title: 'SOLDADO, CABO E SARGENTO',
    desc: `<div class='modal-info-item'><strong style='color: #3b82f6;'>Masculino:</strong><p>Mãos - 30<br>Calça - 341 7<br>Camisa - 288 1<br>Sapato - 150<br>Mochila - 163<br>Jaqueta - 796 2 - ALUNO<br>Jaqueta - 804 7 - SOLDADO<br>Jaqueta - 804 9 - CABO<br>Jaqueta - 804 8 - SARGENTO<br>Mascara - 120 (Opcional)<br>Chapéu - 280 (Opcional)<br>Brincos - 1</p></div><div class='modal-info-item'><strong style='color: #ec4899;'>Feminino:</strong><p>Mãos - 44<br>Calça - 472 0<br>Camisa - 576 1<br>Sapato - 159<br>Camisa - 15<br>Jaqueta - 1047 - ALUNO<br>Jaqueta - 1039 3 - SOLDADO<br>Jaqueta - 1039 2 - CABO<br>Jaqueta - 1039 4 - SARGENTO<br>Mochila - 197<br>Brincos - 1</p></div>`
  },
  { 
    src: 'assets/uniformes/2.png', 
    title: 'SUBTENENTE',
    desc: `<div class='modal-info-item'><strong style='color: #3b82f6;'>Masculino:</strong><p>Mãos - 30<br>Calça - 341 2<br>Sapato - 150<br>Camisa - 288 1<br>Jaqueta - 799<br>Brincos - 1</p></div><div class='modal-info-item'><strong style='color: #ec4899;'>Feminino:</strong><p>Mãos - 44<br>Calça - 471<br>Sapato - 159<br>Camisa - 576 2<br>Jaqueta - 1050<br>Brincos - 1</p></div>`
  },
  { 
    src: 'assets/uniformes/3.png', 
    title: 'ASPIRANTE, TENENTE 2 E TENENTE 1',
    desc: `<div class='modal-info-item'><strong style='color: #3b82f6;'>Masculino:</strong><p>Mãos - 30<br>Calça - 341 2<br>Sapato - 150<br>Camisa - 288 1<br>Jaqueta - 796 1<br>Brincos - 1</p></div><div class='modal-info-item'><strong style='color: #ec4899;'>Feminino:</strong><p>Mãos - 44<br>Calça - 471<br>Sapato - 159<br>Camisa - 576 2<br>Jaqueta - 1047 2<br>Brincos - 1</p></div>`
  },
  { 
    src: 'assets/uniformes/4.png', 
    title: 'UNIFORME DE RESGATE AÉREO 1',
    desc: `<div class='modal-info-item'><strong style='color: #3b82f6;'>Masculino:</strong><p>Mãos - 31<br>Calça - 195 1<br>Sapato - 145 1<br>Colar - 112<br>Camisa - 297<br>Jaqueta - 797<br>Chapéu - 115 (Opcional)<br>Brincos - 1</p></div><div class='modal-info-item'><strong style='color: #ec4899;'>Feminino:</strong><p>Mãos - 44<br>Calça - 474<br>Sapato - 159<br>Jaqueta - 1048<br>Brincos - 1</p></div>`
  },
  { 
    src: 'assets/uniformes/5.png', 
    title: 'UNIFORME DE RESGATE AÉREO 2',
    desc: `<div class='modal-info-item'><strong style='color: #3b82f6;'>Masculino:</strong><p>Mãos - 33<br>Calça - 341 2<br>Sapato - 150<br>Camisa - 294<br>Jaqueta - 798<br>Brincos - 1</p></div><div class='modal-info-item'><strong style='color: #ec4899;'>Feminino:</strong><p>Mãos - 36<br>Calça - 474<br>Sapato - 159<br>Camisa - 2<br>Jaqueta - 1049<br>Brincos - 1</p></div>`
  }
];

export default function ReactUniformesCarousel() {
  const [selectedUniform, setSelectedUniform] = React.useState(null);

  const handleItemClick = (item, index) => {
    setSelectedUniform(item);
  };

  const closeModal = () => {
    setSelectedUniform(null);
  };

  return (
    <>
      <div style={{ width: '100%', height: '620px', position: 'relative', marginTop: '0px' }}>
        <CircularCarousel
          items={uniformItems}
          preset="cylinder"
          intro="rise"
          cardWidth={360}
          aspectRatio={0.65}
          speed={14}
          captions={true}
          gap={25}
          tilt={-5}
          curve={0}
          perspective={2500}
          autoplay="drift"
          interval={3}
          direction="left"
          momentum={0.6}
          snap
          pauseOnHover
          focusOnClick
          draggable
          parallax={0.3}
          stretch={0.5}
          fadeColor="#000000"
          depthFade={0.55}
          innerShade={0.6}
          cornerRadius={12}
          onItemClick={handleItemClick}
        />
      </div>

      {selectedUniform && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          animation: 'fadeIn 0.3s forwards',
          padding: '2rem'
        }}>
          {/* Blurred Background */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${selectedUniform.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(30px)',
            transform: 'scale(1.1)',
            zIndex: -2
          }} />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(18, 15, 23, 0.85)',
            zIndex: -1
          }} onClick={closeModal} />

          {/* Modal Container */}
          <div style={{
            display: 'flex',
            width: '90%',
            maxWidth: '1200px',
            height: '85vh',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
            overflow: 'hidden',
            position: 'relative',
            animation: 'slideUp 0.4s ease-out forwards'
          }}>
            {/* Close Button */}
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '20px', right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              width: '40px', height: '40px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ✕
            </button>

            {/* Left Side: Parallax Image */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              position: 'relative'
            }}>
              {/* Glow behind image */}
              <div style={{
                position: 'absolute',
                width: '60%', height: '80%',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0
              }} />
              <img 
                src={selectedUniform.src} 
                alt={selectedUniform.title}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  zIndex: 1,
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                  animation: 'floatImage 6s ease-in-out infinite'
                }} 
              />
            </div>

            {/* Right Side: Data Panel */}
            <div style={{
              flex: 1,
              padding: '3rem',
              overflowY: 'auto',
              borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 'bold',
                marginBottom: '2rem',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                background: 'linear-gradient(to right, #c084fc, #f472b6, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(192, 132, 252, 0.3)'
              }}>
                {selectedUniform.title}
              </h2>
              
              <div 
                className="futuristic-modal-desc"
                dangerouslySetInnerHTML={{ __html: selectedUniform.desc }} 
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#e2e8f0'
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes floatImage {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .futuristic-modal-desc .modal-info-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .futuristic-modal-desc .modal-info-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(192, 132, 252, 0.5);
          box-shadow: 0 0 20px rgba(192, 132, 252, 0.2);
          transform: translateX(5px);
        }
        .futuristic-modal-desc strong {
          display: block;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      `}} />
    </>
  );
}
