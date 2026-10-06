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

      // Detectar cards de Viaturas para adicionar ElectricBorder
      if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('card-viatura')) {
        return (
          <ElectricBorder 
            borderRadius={16} 
            color="#5227FF" 
            className="flex-1"
            style={{ marginBottom: '20px' }}
          >
            <div {...domNode.attribs} style={{ margin: 0, height: '100%' }}>
              {domToReact(domNode.children, options)}
            </div>
          </ElectricBorder>
        );
      }
      
      // Detectar cards de Evoluir para adicionar ElectricBorder
      if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('card-evoluir')) {
        return (
          <ElectricBorder 
            borderRadius={16} 
            color={domNode.attribs.class.includes('merito') ? "#FBBF24" : "#10B981"} 
            className="flex-1"
            style={{ marginBottom: '20px' }}
          >
            <div {...domNode.attribs} style={{ margin: 0, height: '100%' }}>
              {domToReact(domNode.children, options)}
            </div>
          </ElectricBorder>
        );
      }
    }
  };

  return <>{parse(htmlString, options)}</>;
}
