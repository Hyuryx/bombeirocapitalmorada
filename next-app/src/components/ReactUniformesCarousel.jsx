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
        <div 
          className="carousel-modal-overlay"
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 1,
            padding: '2rem'
          }}
        >
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
            backgroundColor: 'rgba(10, 8, 14, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: -1
          }} onClick={closeModal} />

          {/* Modal Container */}
          {/* Modal Container */}
          <div 
            className="carousel-modal-box futuristic-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={closeModal} className="futuristic-modal-close-btn" aria-label="Fechar">
              ✕
            </button>

            {/* Top / Left Side: Parallax Image */}
            <div className="futuristic-modal-image-side">
              {/* Glow behind image */}
              <div className="futuristic-modal-glow" />
              <img 
                src={selectedUniform.src} 
                alt={selectedUniform.title}
                className="futuristic-modal-img"
              />
            </div>

            {/* Bottom / Right Side: Data Panel */}
            <div className="futuristic-modal-data-side">
              <h2 className="futuristic-modal-title">
                {selectedUniform.title}
              </h2>
              
              <div 
                className="futuristic-modal-desc"
                dangerouslySetInnerHTML={{ __html: selectedUniform.desc }} 
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
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .futuristic-modal-card {
          display: flex;
          flex-direction: row;
          width: 90%;
          max-width: 1200px;
          height: 85vh;
          background: rgba(18, 15, 23, 0.96);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          position: relative;
          opacity: 1;
          z-index: 1;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        body.light-theme .futuristic-modal-card,
        html.light-theme .futuristic-modal-card {
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .futuristic-modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .futuristic-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.08);
        }
        body.light-theme .futuristic-modal-close-btn,
        html.light-theme .futuristic-modal-close-btn {
          background: rgba(0, 0, 0, 0.08);
          color: #0f172a;
        }
        body.light-theme .futuristic-modal-close-btn:hover,
        html.light-theme .futuristic-modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.15);
        }

        .futuristic-modal-image-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .futuristic-modal-glow {
          position: absolute;
          width: 65%;
          height: 80%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        .futuristic-modal-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          z-index: 1;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
          animation: floatImage 6s ease-in-out infinite;
        }

        .futuristic-modal-data-side {
          flex: 1;
          padding: 3rem;
          overflow-y: auto;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          -webkit-overflow-scrolling: touch;
        }
        body.light-theme .futuristic-modal-data-side,
        html.light-theme .futuristic-modal-data-side {
          border-left-color: rgba(0, 0, 0, 0.08);
        }

        .futuristic-modal-title {
          font-size: clamp(1.4rem, 3vw, 2.3rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.25;
          word-wrap: break-word;
          white-space: normal;
          background: linear-gradient(to right, #c084fc, #f472b6, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(192, 132, 252, 0.3);
        }
        body.light-theme .futuristic-modal-title,
        html.light-theme .futuristic-modal-title {
          background: linear-gradient(135deg, #7c3aed, #db2777, #0284c7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .futuristic-modal-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #ffffff;
        }
        body.light-theme .futuristic-modal-desc,
        html.light-theme .futuristic-modal-desc {
          color: #0f172a;
        }

        .futuristic-modal-desc .modal-info-item {
          background: #141724;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 14px;
          padding: 1.4rem;
          margin-bottom: 1.2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }
        body.light-theme .futuristic-modal-desc .modal-info-item,
        html.light-theme .futuristic-modal-desc .modal-info-item {
          background: #ffffff;
          border-color: rgba(0, 0, 0, 0.14);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          color: #0f172a;
        }

        .futuristic-modal-desc .modal-info-item:hover {
          background: #1a1e2e;
          border-color: rgba(192, 132, 252, 0.6);
          box-shadow: 0 0 25px rgba(192, 132, 252, 0.25);
          transform: translateY(-2px);
        }
        body.light-theme .futuristic-modal-desc .modal-info-item:hover,
        html.light-theme .futuristic-modal-desc .modal-info-item:hover {
          background: #f8fafc;
          border-color: rgba(147, 51, 234, 0.5);
          box-shadow: 0 6px 18px rgba(147, 51, 234, 0.15);
        }

        .futuristic-modal-desc strong {
          display: block;
          font-size: 1.25rem;
          margin-bottom: 0.6rem;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-weight: 800;
        }
        .futuristic-modal-desc p {
          margin: 0;
          color: #ffffff;
          font-weight: 600;
          font-size: 1.02rem;
          line-height: 1.8;
          opacity: 1;
        }
        body.light-theme .futuristic-modal-desc p,
        html.light-theme .futuristic-modal-desc p {
          color: #0f172a;
        }

        /* 📱 RESPONSIVO MOBILE E TABLET (Telas <= 820px) */
        @media (max-width: 820px) {
          .futuristic-modal-card {
            flex-direction: column !important;
            width: 94% !important;
            height: 88vh !important;
            max-height: 88vh !important;
            border-radius: 20px !important;
          }

          .futuristic-modal-image-side {
            flex: none !important;
            width: 100% !important;
            height: 220px !important;
            padding: 1.5rem 1rem 0.5rem 1rem !important;
          }

          .futuristic-modal-glow {
            width: 80% !important;
            height: 90% !important;
          }

          .futuristic-modal-img {
            max-height: 180px !important;
            filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6)) !important;
          }

          .futuristic-modal-data-side {
            flex: 1 !important;
            width: 100% !important;
            padding: 1rem 1.15rem 1.5rem 1.15rem !important;
            border-left: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            overflow-y: auto !important;
          }
          body.light-theme .futuristic-modal-data-side,
          html.light-theme .futuristic-modal-data-side {
            border-top-color: rgba(0, 0, 0, 0.08) !important;
          }

          .futuristic-modal-title {
            font-size: 1.25rem !important;
            margin-bottom: 0.85rem !important;
            text-align: center !important;
          }

          .futuristic-modal-desc {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
          }

          .futuristic-modal-desc .modal-info-item {
            padding: 1rem !important;
            margin-bottom: 0.85rem !important;
            border-radius: 12px !important;
          }

          .futuristic-modal-desc strong {
            font-size: 1.05rem !important;
            margin-bottom: 0.35rem !important;
          }
        }
      `}} />
    </>
  );
}
