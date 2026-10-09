'use client';

import React, { useEffect } from 'react';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import GooeyNav from './GooeyNav';
import ReactAvisosGerais from './ReactAvisosGerais';
import ReactRegrasGallery from './ReactRegrasGallery';
import ReactUniformesCarousel from './ReactUniformesCarousel';
import ReactViaturasCarousel from './ReactViaturasCarousel';
import ReactEvoluirCarousel from './ReactEvoluirCarousel';
import ReactModulacaoBounceCards from './ReactModulacaoBounceCards';
import { cursos } from '../data/cursos';
import dynamic from 'next/dynamic';
import ReactCodigosQBounceCards from './ReactCodigosQBounceCards';
import ReactPlanilhaTablet from './ReactPlanilhaTablet';
import ReactHierarquiaMagicBento from './ReactHierarquiaMagicBento';

const Livro3D = dynamic(() => import('./Livro3D'), { ssr: false });

export default function DynamicHTMLRenderer({ htmlString }) {
  useEffect(() => {
    // Inicialização da parte Vanilla
    const initVanilla = () => {
      if (typeof window !== 'undefined') {
        try {
          if (window.initApp && !window.appInitialized) {
            // Ensure anime is loaded before initializing animations
            if (window.initAnimations && typeof window.anime === 'undefined') {
              setTimeout(initVanilla, 200);
              return;
            }
            window.initApp();
            if (window.initAnimations) window.initAnimations();
            if (window.initSecondaryApp) window.initSecondaryApp();
            if (window.initBackgroundVideos) window.initBackgroundVideos();
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
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'lista-avisos-gerais') {
        return <ReactAvisosGerais />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'regras-cards-grid') {
        return <ReactRegrasGallery />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'planilha-target') {
        return <ReactPlanilhaTablet />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'hierarquia-lista') {
        return <ReactHierarquiaMagicBento />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'uniformes-cards-grid') {
        return <ReactUniformesCarousel />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('evoluir-grid')) {
        const items = domNode.children.filter(child => child.type === 'tag').map((child, index) => {
          return domToReact([child], options);
        });
        return <ReactEvoluirCarousel items={items} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'modulacao-bounce-cards-grid') {
        const items = domNode.children.filter(child => child.type === 'tag').map((child, index) => {
          return domToReact([child], options);
        });
        return <ReactModulacaoBounceCards items={items} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'codigos-q-bounce-cards-grid') {
        const items = domNode.children.filter(child => child.type === 'tag').map((child, index) => {
          return domToReact([child], options);
        });
        return <ReactCodigosQBounceCards items={items} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'viaturas-carousel-grid') {
        return <ReactViaturasCarousel />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-piloto-container') {
        return <Livro3D curso={cursos.piloto} />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-aquatico-container') {
        return <Livro3D curso={cursos.aquatico} />;
      }
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-montanha-container') {
        return <Livro3D curso={cursos.montanha} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-paraquedismo-container') {
        return <Livro3D curso={cursos.paraquedismo} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-coer-container') {
        return <Livro3D curso={cursos.coer} />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-course-tripulantes-container') {
        return <Livro3D curso={cursos.tripulante} />;
      }
      
      // Replace nav-tabs with GooeyNav
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('nav-tabs')) {
        const items = [
          { label: "INÍCIO", href: "#", target: "view-inicio" },
          { label: "AVISOS GERAIS", href: "#", target: "view-avisos" },
          { label: "REGRAS", href: "#", target: "view-regras" },
          { label: "UNIFORMES", href: "#", target: "view-uniformes" },
          { label: "CURSOS", href: "#", target: "view-cursos" },
          { label: "MODULAÇÃO", href: "#", target: "view-modulacao" },
          { label: "VIATURAS", href: "#", target: "view-viaturas" },
          { label: "HIERARQUIA", href: "#", target: "view-hierarquia" },
          { label: "PLANILHA", href: "#", target: "view-planilhas" },
          { label: "GALERIA", href: "#", target: "view-galeria" }
        ];
        return (
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        );
      }

      // Remover scripts para não duplicar, pois o layout.js já os carrega
      if (domNode.name === 'script') {
        return <></>;
      }

      // Detectar cards para adicionar ElectricBorder removido
      
      if (domNode.type === 'tag' && domNode.attribs) {
        if (domNode.attribs.src === '') {
          delete domNode.attribs.src;
        }

        let hasInlineEvent = false;
        const props = attributesToProps(domNode.attribs);

        const reactEventMapping = {
          onclick: 'onClick',
          onmouseover: 'onMouseOver',
          onmouseout: 'onMouseOut',
          onchange: 'onChange',
          oninput: 'onInput',
          onkeydown: 'onKeyDown',
          onkeyup: 'onKeyUp',
          onsubmit: 'onSubmit',
          onfocus: 'onFocus',
          onblur: 'onBlur',
          onload: 'onLoad',
          onerror: 'onError'
        };

        Object.keys(domNode.attribs).forEach(attr => {
          if (attr.startsWith('on')) {
            hasInlineEvent = true;
            const reactEventName = reactEventMapping[attr.toLowerCase()] || attr;
            const code = domNode.attribs[attr];
            
            delete props[attr];
            delete props[attr.toLowerCase()];
            delete props[reactEventName];

            props[reactEventName] = (e) => {
              try {
                // If it's something like document.getElementById(...)
                // Evaluate the code string
                const fn = new Function('event', code);
                fn.call(e.currentTarget, e);
              } catch (err) {
                console.error("Error executing inline event", err);
              }
            };
          }
        });

        if (hasInlineEvent) {
          const isVoid = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(domNode.name);
          if (isVoid) {
            return <domNode.name {...props} />;
          } else {
            return (
              <domNode.name {...props}>
                {domToReact(domNode.children, options)}
              </domNode.name>
            );
          }
        }
      }
    }
  };

  return <>{parse(htmlString, options)}</>;
}
