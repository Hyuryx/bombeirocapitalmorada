'use client';

import React, { useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import ElectricBorder from './animations/ElectricBorder';

export default function DynamicHTMLRenderer({ htmlString }) {
  useEffect(() => {
    // Inicialização da parte Vanilla
    const initVanilla = () => {
      if (typeof window !== 'undefined') {
        try {
          if (window.initApp && !window.appInitialized) {
            window.initApp();
            if (window.initAnimations) window.initAnimations();
            if (window.initSecondaryApp) window.initSecondaryApp();
            window.appInitialized = true;
          } else if (!window.appInitialized) {
            setTimeout(initVanilla, 200);
          }
        } catch (error) {
          console.error("Erro na inicialização:", error);
        }
      }
    };
    initVanilla();

    // Capturar erros globais
    if (typeof window !== 'undefined') {
        window.onerror = function(msg, url, line) {
            console.error("ERRO GLOBAL: " + msg + " linha: " + line);
            return false;
        };
    }
  }, []);

  const options = {
    replace: (domNode) => {
      // Remover scripts para não duplicar, pois o layout.js já os carrega
      if (domNode.name === 'script') {
        return <></>;
      }

      // Detectar cards para adicionar ElectricBorder
      if (domNode.attribs && domNode.attribs.class) {
        const classes = domNode.attribs.class.split(' ');
        const isCard = classes.some(cls => 
          cls === 'card' || 
          cls === 'card-evoluir' || 
          cls === 'viatura-card' || 
          cls === 'info-card' || 
          cls === 'hierarquia-card'
        );

        if (isCard && domNode.name !== 'section') {
          return (
            <ElectricBorder 
              borderRadius={16} 
              color="#ef4444" 
              className="flex-1"
              style={{ marginBottom: '20px' }}
            >
              <div {...domNode.attribs} style={{ margin: 0, height: 'fit-content' }}>
                {domToReact(domNode.children, options)}
              </div>
            </ElectricBorder>
          );
        }
      }
    }
  };

  return <>{parse(htmlString, options)}</>;
}
