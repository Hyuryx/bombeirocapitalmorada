import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref} style={{ padding: '20px', backgroundColor: '#fff', color: '#333', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
      {props.children}
    </div>
  );
});

export default function CourseFlipbook({ courseData }) {
  if (!courseData) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <HTMLFlipBook width={400} height={600} showCover={true}>
        <Page number="1">
          <img src={courseData.cover} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Capa" />
        </Page>
        <Page number="2">
          <h2>Sumário</h2>
          <ul>
            <li>Objetivo</li>
            <li>Requisitos</li>
            <li>Fases</li>
          </ul>
        </Page>
        <Page number="3">
          <h2>{courseData.title}</h2>
          <p>{courseData.description}</p>
        </Page>
        <Page number="4">
          <h3>Página 4</h3>
          <p>Conteúdo adicional...</p>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
