'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import TearTicket from './TearTicket';
import FallingText from './FallingText';

function DraggableTicket({ aviso, index, total, onClickModal }) {
  const zIndex = total - index;
  const offsetTop = index * 30;
  const offsetLeft = index * 20;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform horizontal movement into rotation
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  // Transform vertical movement into slight X rotation (optional, but requested by user)
  const rotateX = useTransform(y, [-200, 200], [15, -15]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        position: 'absolute',
        top: `${offsetTop}px`,
        left: `calc(50% - 250px + ${offsetLeft}px)`,
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
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', padding: '16px', gap: '8px', color: '#fff', height: '100%' }}>
            <div style={{ position: 'absolute', top: '10px', left: '-18px', zIndex: 10, pointerEvents: 'none' }}>
              <span style={{ fontSize: '24px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>&#x2702;</span>
            </div>
            
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{aviso.categoria || "Aviso"}</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Prioridade: {aviso.prioridade}</p>
            <span style={{ fontSize: '12px', marginTop: 'auto', opacity: 0.6 }}>Id: {aviso.id || "N/A"}</span>
          </div>
        }
        orientation="horizontal"
        scrim={true}
        imageRadius={8}
        width={500}
        height={280}
        stubSize={160}
        background="#1f1f23"
        color="#f5f5f5"
        border={true}
        borderColor="#444"
        borderWidth={1}
      >
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>{aviso.titulo}</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.5', opacity: 0.9, overflowY: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>{aviso.descricao || aviso.resumo || aviso.frase || aviso.conteudo || "Sem descrição"}</p>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '12px' }}>
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
      <div style={{ width: '100%', maxWidth: '600px', height: '200px', position: 'relative', margin: '0 auto' }}>
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
              style={{
                backgroundColor: '#1f1f23',
                border: '1px solid #444',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: 'white',
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setModalAviso(null)}
                style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: '#888', fontSize: '24px', cursor: 'pointer' }}
              >
                &times;
              </button>
              <h2 style={{ fontSize: '28px', color: '#ef4444', marginBottom: '10px' }}>{modalAviso.titulo}</h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', opacity: 0.7, fontSize: '14px' }}>
                <span>Data: {new Date(modalAviso.inicio).toLocaleDateString()}</span>
                <span>Categoria: {modalAviso.categoria}</span>
                <span>Por: {modalAviso.autor || "Comando"}</span>
              </div>
              
              {modalAviso.imagem && (
                <img src={modalAviso.imagem} alt="Aviso" style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', maxHeight: '300px', objectFit: 'cover' }} />
              )}
              
              <div style={{ fontSize: '16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {modalAviso.descricao || modalAviso.resumo || modalAviso.frase || modalAviso.conteudo}
              </div>

              {modalAviso.link && (
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <a href={modalAviso.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#ef4444', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Acessar Link
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
