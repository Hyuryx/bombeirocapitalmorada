import React, { useRef, useState } from 'react';
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

export default function ReactCourseTripulantes() {
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
            <img src="assets/cursos/tripulantes/capa.png" alt="Capa Tripulantes" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Page>

        {/* Sumário / Introdução */}
        <Page number="2">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>O Curso de Tripulante</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            O Curso de Tripulante é uma formação destinada à preparação do bombeiro para atuar como integrante de uma equipe de operações aéreas, exercendo funções de apoio ao piloto, comunicação, segurança operacional e participação direta em missões de resgate realizadas com helicóptero.
          </p>
          <h3 style={{ color: '#005f73', marginTop: '20px' }}>Objetivo do Curso</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            Preparar o bombeiro para atuar em operações de resgate com helicóptero, desenvolvendo conhecimentos técnicos e comportamento operacional compatível com missões aéreas.
          </p>
          <h3 style={{ color: '#005f73', marginTop: '20px' }}>Requisitos</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Ter 18 anos ou mais e estar em boas condições de saúde;</li>
            <li>Saber nadar e possuir segurança no meio aquático;</li>
            <li>Demonstrar equilíbrio emocional e seguir instruções;</li>
            <li>Possuir noções básicas de primeiros socorros.</li>
          </ul>
        </Page>

        {/* Fase 1 */}
        <Page number="3">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Estrutura do Curso</h2>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/tripulantes/1.png" alt="Etapa 1" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <h3 style={{ color: '#005f73' }}>ETAPA 1 — RESGATE NA ÁGUA</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'justify' }}>
            <strong>Objetivo:</strong> Preparar o tripulante para realizar o resgate de uma vítima em ambiente aquático e coordenar sua retirada.
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
            <li><strong>Passo 1:</strong> Resgate da vítima e condução;</li>
            <li><strong>Passo 2:</strong> Solicitação de autorização ao piloto;</li>
            <li><strong>Passo 3:</strong> Embarque organizado da vítima;</li>
            <li><strong>Passo 4:</strong> Embarque do tripulante;</li>
            <li><strong>Passo 5:</strong> Busca por local seguro.</li>
          </ul>
        </Page>

        {/* Fase 2 */}
        <Page number="4">
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/tripulantes/2.png" alt="Etapa 2" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <h3 style={{ color: '#005f73' }}>ETAPA 2 — RESGATE EM ALTURA</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'justify' }}>
            <strong>Objetivo:</strong> Preparar o tripulante para atuar em operação de resgate aéreo envolvendo estrutura elevada de difícil acesso.
          </p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
            <li><strong>Passo 1:</strong> Localização da vítima e avaliação de riscos;</li>
            <li><strong>Passo 2:</strong> Aproximação, resgate e condução;</li>
            <li><strong>Passo 3:</strong> Movimentação para o helicóptero;</li>
            <li><strong>Passo 4:</strong> Embarque do tripulante;</li>
            <li><strong>Passo 5:</strong> Pouso em área segura.</li>
          </ul>
        </Page>

        {/* Critérios */}
        <Page number="5">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Critérios &amp; Comunicação</h2>
          <h3 style={{ color: '#d32f2f', marginTop: '15px' }}>Critérios Eliminatórios</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Desobedecer orientações ou manobra não autorizada;</li>
            <li>Aproximar-se da aeronave sem autorização;</li>
            <li>Colocar vítima ou equipe em risco imprudente;</li>
            <li>Ignorar um risco evidente.</li>
          </ul>
          <h3 style={{ color: '#d32f2f', marginTop: '20px' }}>Comunicação e Modulação</h3>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Transmitir informações de forma objetiva;</li>
            <li>Confirmar comandos recebidos e informar riscos;</li>
            <li>Auxiliar o piloto nas condições externas;</li>
            <li>Evitar comunicações desnecessárias.</li>
          </ul>
        </Page>

        {/* Certificação */}
        <Page number="6">
          <h2 style={{ color: '#005f73', borderBottom: '2px solid #005f73', paddingBottom: '5px', marginTop: '10px' }}>Certificação</h2>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <img src="assets/cursos/tripulantes/3.png" alt="Certificação" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
            Ao concluir o curso, o militar estará preparado para integrar equipes de operações aéreas, atuando como tripulante em missões de resgates.
          </p>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px', borderLeft: '4px solid #005f73' }}>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0, color: '#333' }}>
              "Quando o acesso termina, a missão continua pelo ar — e uma tripulação preparada transforma distância em possibilidade de resgate."
            </p>
          </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
