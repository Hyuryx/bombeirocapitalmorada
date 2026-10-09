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

export default function ReactCourseCOER() {
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
            <img src="assets/cursos/coer/capa.png" alt="Capa COER" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Page>

        {/* Introdução */}
        <Page number="2">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>O Curso COER</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            O Curso de Operador de Embarcação de Resgate — COER é uma formação destinada à preparação do bombeiro para a condução segura e eficiente de embarcações empregadas em operações de emergência, salvamento e apoio operacional.
          </p>
          <h3 style={{ color: '#005f73', marginTop: '20px' }}>Objetivo do Curso</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            Capacitar o bombeiro militar a conduzir embarcações de resgate em condições diversas, garantindo aproximações corretas, estabilidade durante o embarque de vítimas e navegação segura.
          </p>
          <h3 style={{ color: '#005f73', marginTop: '20px' }}>Requisitos</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Ter 18 anos ou mais e estar em boas condições de saúde;</li>
            <li>Saber nadar e possuir segurança no meio aquático;</li>
            <li>Possuir aptidão para condução de veículos motores;</li>
            <li>Demonstrar equilíbrio emocional e noção espacial.</li>
          </ul>
        </Page>

        {/* Fase 1 */}
        <Page number="3">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Estrutura do Curso</h2>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/coer/2.png" alt="Etapa 1" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <h3 style={{ color: '#005f73' }}>FASE 1 — TÉCNICAS E MANOBRAS</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'justify' }}>
            <strong>Objetivo:</strong> Desenvolver habilidade na condução da embarcação.
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
            <li><strong>Passo 1:</strong> Leitura da água e identificação de riscos;</li>
            <li><strong>Passo 2:</strong> Controle de direção e velocidade;</li>
            <li><strong>Passo 3:</strong> Técnicas de atracação e desatracação;</li>
            <li><strong>Passo 4:</strong> Manobras de emergência;</li>
            <li><strong>Passo 5:</strong> Operação em espaços confinados.</li>
          </ul>
        </Page>

        {/* Fase 2 */}
        <Page number="4">
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/coer/3.png" alt="Etapa 2" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <h3 style={{ color: '#005f73' }}>FASE 2 — BUSCA, RESGATE E NAVEGAÇÃO NOTURNA</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'justify' }}>
            <strong>Objetivo:</strong> Preparar o operador para atuar em missões reais.
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
            <li><strong>Passo 1:</strong> Aproximação de vítimas na água;</li>
            <li><strong>Passo 2:</strong> Estabilidade durante o embarque;</li>
            <li><strong>Passo 3:</strong> Padrões de busca aquática;</li>
            <li><strong>Passo 4:</strong> Navegação noturna com visibilidade reduzida;</li>
            <li><strong>Passo 5:</strong> Resgate em águas agitadas.</li>
          </ul>
        </Page>

        {/* Critérios */}
        <Page number="5">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Critérios &amp; Comunicação</h2>
          <h3 style={{ color: '#d32f2f', marginTop: '15px' }}>Critérios Eliminatórios</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Desobedecer orientações do instrutor;</li>
            <li>Executar manobras de forma negligente;</li>
            <li>Ignorar as limitações da embarcação;</li>
            <li>Colocar a tripulação ou a vítima em risco.</li>
          </ul>
          <h3 style={{ color: '#d32f2f', marginTop: '20px' }}>Manutenção e Preparação</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Inspeção e manutenção preventiva;</li>
            <li>Verificação de combustível e motor;</li>
            <li>Organização dos materiais de resgate.</li>
          </ul>
        </Page>

        {/* Certificação */}
        <Page number="6">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Certificação</h2>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/coer/4.png" alt="Certificação" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            Ao concluir o COER, o bombeiro estará preparado para atuar na condução de embarcações empregadas em operações de resgate e apoio operacional.
          </p>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #005f73' }}>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0, color: '#333' }}>
              "Controle, técnica e responsabilidade para conduzir onde poucos conseguem navegar."
            </p>
          </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
