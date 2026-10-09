import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref} style={{ 
        padding: props.isCover ? '0' : '30px', 
        backgroundColor: '#f4ecd8', // beige paper color
        color: '#1a1a1a', // dark text for contrast
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)', 
        border: '1px solid #d3c6a6',
        overflow: 'hidden',
        position: 'relative'
    }}>
      {props.children}
      {!props.isCover && (
        <div style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
          {props.number}
        </div>
      )}
    </div>
  );
});

export default function ReactCourseParaquedismo() {
  const book = useRef();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <HTMLFlipBook 
        width={400} 
        height={565} 
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        ref={book}
        style={{ margin: '0 auto' }}
      >
        {/* Capa */}
        <Page number="1" isCover={true}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="assets/cursos/paraquedismo/capa.png" alt="Capa Paraquedismo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Page>

        {/* Introdução */}
        <Page number="2">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>O Curso de Paraquedismo</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            É destinado aos militares que desejam atuar em operações especiais de inserção aérea, acesso rápido a áreas remotas e apoio a missões de alta complexidade.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            Durante a formação, o militar aprenderá técnicas de salto operacional, controle em queda livre, navegação sob velame, precisão de pouso e procedimentos de emergência.
          </p>
          <h3 style={{ color: '#005f73', marginTop: '15px' }}>Etapas</h3>
          <ul style={{ fontSize: '0.85rem', lineHeight: '1.4', paddingLeft: '20px' }}>
            <li><strong>Etapa 1 - Cercado:</strong> Orientações e entendimento.</li>
            <li><strong>Etapa 2 - Aquático:</strong> Salto com pouso em barco ou caminhão guincho.</li>
            <li><strong>Etapa 3 - Verticais:</strong> Salto com agilidade.</li>
            <li><strong>Etapa 4 - Eólica:</strong> Soma do trabalho anterior.</li>
          </ul>
        </Page>

        {/* Fase 1 & 2 */}
        <Page number="3">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Módulos Iniciais</h2>
          
          <h3 style={{ color: '#005f73', marginTop: '10px' }}>Módulo I — Salto Livre</h3>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <img src="assets/cursos/paraquedismo/1.png" alt="Módulo 1" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.4', textAlign: 'justify' }}>
            Domínio sobre a saída da aeronave, estabilidade em queda livre e abertura do paraquedas.
          </p>

          <h3 style={{ color: '#005f73', marginTop: '15px' }}>Módulo II — Ambientes Verticais</h3>
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <img src="assets/cursos/paraquedismo/2.png" alt="Módulo 2" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.4', textAlign: 'justify' }}>
            Inserções sobre ambientes verticais, abertura em baixa altitude e precisão de pouso.
          </p>
        </Page>

        {/* Fase 3 */}
        <Page number="4">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Missões de Alta Complexidade</h2>
          
          <h3 style={{ color: '#005f73', marginTop: '10px' }}>Módulo III — Eólica</h3>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/paraquedismo/3.png" alt="Módulo 3" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'justify' }}>
            A última etapa simula missões de alta complexidade em áreas restritas.
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
            <li>Precisão de pouso;</li>
            <li>Aproximação em zonas restritas;</li>
            <li>Controle sob condições adversas;</li>
            <li>Missão operacional completa.</li>
          </ul>
        </Page>

        {/* Critérios */}
        <Page number="5">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Critérios &amp; Requisitos</h2>
          <h3 style={{ color: '#d32f2f', marginTop: '15px' }}>Requisitos</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Estar ativo na corporação;</li>
            <li>Excelente condicionamento físico;</li>
            <li>Sem restrições para altura.</li>
          </ul>
          <h3 style={{ color: '#d32f2f', marginTop: '20px' }}>Critérios Avaliados</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Disciplina e Controle emocional;</li>
            <li>Controle do equipamento e segurança;</li>
            <li>Precisão nos pousos;</li>
            <li>Cumprimento dos protocolos.</li>
          </ul>
        </Page>

        {/* Certificação */}
        <Page number="6">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Certificação</h2>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/paraquedismo/certificado.png" alt="Certificação" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            O militar estará habilitado para integrar a Equipe de Paraquedismo e atuar em operações especiais.
          </p>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #005f73' }}>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0, color: '#333' }}>
              "Antes mesmo de tocar o solo, a missão de salvar vidas já começou."
            </p>
          </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
