'use client';

import React, { useEffect, useState } from 'react';
import CircularGallery from './CircularGallery';

export default function ReactRegrasGallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const rules = [
      {
        title: 'Respeito e Hierarquia',
        lines: [
          'Todo militar deverá respeitar superiores, subordinados e civis.',
          'A hierarquia deverá ser seguida em qualquer situação.',
          'Discussões, desrespeito ou insubordinação serão punidos.',
          'Ordens diretas só podem ser contestadas após a ocorrência.'
        ],
        borderColor: '#3b82f6'
      },
      {
        title: 'Conduta Operacional',
        lines: [
          'É obrigatório manter postura profissional em serviço.',
          'O uso correto do rádio é essencial.',
          'É proibido abandonar viaturas sem autorização.',
          'Todo chamado deverá ser atendido com prioridade.',
          'Código 4 deverá ser informado ao finalizar ocorrência.',
          'Proibido corrupção. Favorecimentos resultam em expulsão.'
        ],
        borderColor: '#f97316'
      },
      {
        title: 'Comunicação via Rádio',
        lines: [
          'Evitar flood, gritos ou brincadeiras no rádio.',
          'Utilizar linguagem operacional e objetiva.',
          'Sempre identificar patente e nome ao iniciar.'
        ],
        borderColor: '#22c55e'
      },
      {
        title: 'Viaturas e Aeronaves',
        lines: [
          'Utilizar viaturas apenas em serviço.',
          'Proibido dirigir de forma irresponsável.',
          'Abastecimento/organização é respons. da equipe.',
          'Proibido usar helicópteros sem licença.'
        ],
        borderColor: '#a855f7'
      },
      {
        title: 'Fardamento',
        lines: [
          'Uso do fardamento é obrigatório em serviço.',
          'Proibido misturar peças inadequadas.',
          'Manter aparência organizada e profissional.'
        ],
        borderColor: '#eab308'
      },
      {
        title: 'Punições',
        lines: [
          'Advertência verbal',
          'Advertência escrita',
          'Suspensão',
          'Rebaixamento',
          'Expulsão'
        ],
        borderColor: '#ef4444'
      },
      {
        title: 'Disposições Finais',
        lines: [
          'Prezar pela disciplina, honra e compromisso.',
          'Desconhecimento das regras não isenta punições.',
          'Regulamento pode ser atualizado pelo Comando.'
        ],
        borderColor: '#3b82f6'
      }
    ];

    const generateImage = (rule) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      
      // Fundo
      ctx.fillStyle = 'rgba(17, 20, 29, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Borda colorida superior
      ctx.fillStyle = rule.borderColor;
      ctx.fillRect(0, 0, canvas.width, 14);
      
      // Borda geral
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      // Título
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 52px sans-serif';
      ctx.fillText(rule.title, 60, 100);
      
      // Linhas
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '36px sans-serif';
      rule.lines.forEach((line, i) => {
        const words = line.split(' ');
        let currentLine = '';
        let yOffset = 220 + (i * 120); // space between bullets
        let firstLineOfBullet = true;
        
        ctx.fillStyle = rule.borderColor;
        ctx.fillText('•', 60, yOffset);
        
        ctx.fillStyle = '#e2e8f0';
        words.forEach(word => {
            const testLine = currentLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > 620) {
                ctx.fillText(currentLine, 100, yOffset);
                currentLine = word + ' ';
                yOffset += 45; // line height within a bullet
                firstLineOfBullet = false;
            } else {
                currentLine = testLine;
            }
        });
        ctx.fillText(currentLine, 100, yOffset);
      });
      
      return canvas.toDataURL('image/png');
    };

    const newItems = rules.map(rule => ({
      image: generateImage(rule),
      text: rule.title
    }));

    setItems(newItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <div style={{ height: '700px', width: '100%', position: 'relative', marginTop: '20px' }}>
      <CircularGallery
        bend={1}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.05}
        font="bold 30px sans-serif"
        scrollSpeed={2}
        items={items}
      />
    </div>
  );
}
