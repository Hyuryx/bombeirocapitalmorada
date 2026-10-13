'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import TearTicket from './TearTicket';
import FallingText from './FallingText';

function DraggableTicket({ aviso, index, total, onClickModal, screenWidth }) {
  const zIndex = total - index;
  const isMobile = screenWidth < 600;
  const ticketWidth = isMobile ? Math.min(500, Math.max(280, screenWidth - 28)) : 500;
  const ticketHeight = isMobile ? 300 : 280;
  const stubSize = isMobile ? Math.min(130, Math.round(ticketWidth * 0.32)) : 160;
  const offsetTop = isMobile ? index * 16 : index * 30;
  const offsetLeft = isMobile ? (index % 3) * 6 : index * 20;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform horizontal movement into rotation
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  // Transform vertical movement into slight X rotation
  const rotateX = useTransform(y, [-200, 200], [15, -15]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        position: 'absolute',
        top: `${offsetTop}px`,
        left: `calc(50% - ${ticketWidth / 2}px + ${offsetLeft}px)`,
        zIndex: zIndex,
        cursor: 'grab',
        x,
        y,
        rotate,
        rotateX,
        perspective: 1000
      }}
      whileDrag={{ zIndex: 100, scale: 1.05, cursor: 'grabbing' }}
    >
      <TearTicket
        onTear={() => {
          setTimeout(() => onClickModal(aviso), 400);
        }}
        image={aviso.imagem || ""}
        imageAlt={aviso.titulo}
        stub={
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: isMobile ? '10px' : '16px', gap: '6px', color: '#fff', height: '100%' }}>
            <div style={{ position: 'absolute', top: '10px', left: '-18px', zIndex: 10, pointerEvents: 'none' }}>
              <span style={{ fontSize: isMobile ? '18px' : '24px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>&#x2702;</span>
            </div>
            
            <h3 style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: 'bold' }}>{aviso.categoria || "Aviso"}</h3>
            <p style={{ fontSize: isMobile ? '11px' : '14px', opacity: 0.8 }}>Prioridade: {aviso.prioridade}</p>
            <span style={{ fontSize: '11px', marginTop: 'auto', opacity: 0.6 }}>Id: {aviso.id || "N/A"}</span>
          </div>
        }
        orientation="horizontal"
        scrim={true}
        imageRadius={8}
        width={ticketWidth}
        height={ticketHeight}
        stubSize={stubSize}
        background="#1f1f23"
        color="#f5f5f5"
        border={true}
        borderColor="#444"
        borderWidth={1}
      >
        <div style={{ padding: isMobile ? '14px' : '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold', marginBottom: isMobile ? '6px' : '12px' }}>{aviso.titulo}</h2>
          <p style={{ fontSize: isMobile ? '12px' : '14px', lineHeight: '1.4', opacity: 0.9, overflowY: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: isMobile ? 3 : 4, WebkitBoxOrient: 'vertical' }}>{aviso.descricao || aviso.resumo || aviso.frase || aviso.conteudo || "Sem descrição"}</p>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '11px' }}>
            <span>{new Date(aviso.inicio).toLocaleDateString()}</span>
            <span>{aviso.autor || "Comando"}</span>
          </div>
        </div>
      </TearTicket>
    </motion.div>
  );
}

export default function ReactAvisosGerais() {
  const [avisos, setAvisos] = useState([]);
  const [modalAviso, setModalAviso] = useState(null);
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      const onResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    async function carregar() {
      try {
        let res;
        try {
          res = await fetch('http://localhost:3001/api/avisos');
        } catch (e) {
          res = await fetch('/api/avisos');
        }
        
        if (!res || !res.ok) {
          res = await fetch('/api/avisos');
        }
        if (res.ok) {
          const data = await res.json();
          const agora = new Date();
          
          const filtrados = data.filter((aviso) => {
            const inicio = new Date(aviso.inicio);
            let expired = false;
            if (aviso.fim && String(aviso.fim).trim() !== "" && String(aviso.fim) !== "null") {
              const fim = new Date(aviso.fim);
              if (!Number.isNaN(fim.getTime())) {
                expired = agora >= fim;
              }
            }
            return (
              aviso.ativo &&
              aviso.mostrarAvisosGerais &&
              agora >= inicio &&
              !expired
            );
          }).sort((a, b) => new Date(b.inicio) - new Date(a.inicio));
          
          setAvisos(filtrados);
        }
      } catch (err) {
        console.error("Erro ao carregar avisos:", err);
      }
    }
    carregar();
    const int = setInterval(carregar, 30000);
    return () => clearInterval(int);
  }, []);

  if (avisos.length === 0) {
    return (
      <div style={{ width: '100%', maxWidth: '600px', height: '120px', position: 'relative', margin: '0 auto' }}>
        <FallingText
          text="Nenhum aviso disponível no momento."
          highlightWords={["Nenhum", "aviso"]}
          trigger="hover"
          backgroundColor="transparent"
          gravity={0.56}
          fontSize="1.2rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'relative', width: '100%', minHeight: '600px', display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
        {avisos.map((aviso, index) => (
          <DraggableTicket 
            key={aviso.id || index}
            aviso={aviso} 
            index={index} 
            total={avisos.length} 
            onClickModal={setModalAviso}
            screenWidth={screenWidth} 
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalAviso && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aviso-modal-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setModalAviso(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="aviso-modal-card"
              style={{
                borderRadius: '16px',
                padding: '26px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setModalAviso(null)}
                className="aviso-modal-close"
                style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                aria-label="Fechar"
              >
                &times;
              </button>
              <h2 className="aviso-modal-title" style={{ fontSize: '24px', color: '#ef4444', marginBottom: '10px', fontWeight: 800 }}>{modalAviso.titulo}</h2>
              <div className="aviso-modal-meta" style={{ display: 'flex', gap: '15px', marginBottom: '18px', fontSize: '13px', flexWrap: 'wrap' }}>
                <span>Data: {new Date(modalAviso.inicio).toLocaleDateString()}</span>
                <span>Categoria: {modalAviso.categoria}</span>
                <span>Por: {modalAviso.autor || "Comando"}</span>
              </div>
              
              {modalAviso.imagem && (
                <img src={modalAviso.imagem} alt="Aviso" style={{ width: '100%', borderRadius: '10px', marginBottom: '18px', maxHeight: '300px', objectFit: 'cover' }} />
              )}
              
              <div className="aviso-modal-text" style={{ fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {modalAviso.descricao || modalAviso.resumo || modalAviso.frase || modalAviso.conteudo}
              </div>

              {modalAviso.link && (
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <a href={modalAviso.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#ef4444', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Acessar Link
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .aviso-modal-card {
          background-color: #1a1d26;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }
        body.light-theme .aviso-modal-card,
        html.light-theme .aviso-modal-card {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          color: #0f172a;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .aviso-modal-close {
          color: #94a3b8;
        }
        body.light-theme .aviso-modal-close,
        html.light-theme .aviso-modal-close {
          color: #475569;
        }
        .aviso-modal-meta {
          color: #94a3b8;
        }
        body.light-theme .aviso-modal-meta,
        html.light-theme .aviso-modal-meta {
          color: #64748b;
        }
        .aviso-modal-text {
          color: #e2e8f0;
        }
        body.light-theme .aviso-modal-text,
        html.light-theme .aviso-modal-text {
          color: #334155;
        }
      `}</style>
    </>
  );
}
