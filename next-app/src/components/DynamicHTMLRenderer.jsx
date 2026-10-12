'use client';

import React, { useEffect } from 'react';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import GooeyNav from './GooeyNav';
import ReactAvisosGerais from './ReactAvisosGerais';
import ReactRegrasGallery from './ReactRegrasGallery';
import MagicBento from './ui/MagicBento';
import ReactUniformesCarousel from './ReactUniformesCarousel';
import ReactViaturasCarousel from './ReactViaturasCarousel';
import ReactEvoluirCarousel from './ReactEvoluirCarousel';
import ReactModulacaoBounceCards from './ReactModulacaoBounceCards';
import { cursos } from '../data/cursos';
import dynamic from 'next/dynamic';
import ReactCodigosQBounceCards from './ReactCodigosQBounceCards';
import ReactPlanilhaTablet from './ReactPlanilhaTablet';
import ReactHierarquiaMagicBento from './ReactHierarquiaMagicBento';
import ReactGaleriaFolders from './ReactGaleriaFolders';
import ReactPosicoesViaturas from './ReactPosicoesViaturas';
import ReactAlfabetoFoneticoPixelCard from './ReactAlfabetoFoneticoPixelCard';
import ReactNumeracaoFoneticaPixelCard from './ReactNumeracaoFoneticaPixelCard';
import ReactPadraoRadioPixelCard from './ReactPadraoRadioPixelCard';
import GlitchText from './GlitchText';
import FallingText from './FallingText';
import TextType from './TextType';
import ReactSidebarCursos from './ReactSidebarCursos';
import ReactSidebarModulacao from './ReactSidebarModulacao';
import ReactSidebarDefault from './ReactSidebarDefault';
import ConfiguracoesModal from './ConfiguracoesModal';

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

    // Capturar erros globais (ignorando ResizeObserver benigno do browser)
    if (typeof window !== 'undefined') {
        window.onerror = function(msg, url, line) {
            const str = String(msg || '');
            if (str.includes('ResizeObserver') || str.includes('undelivered notifications')) {
                return true;
            }
            console.error("ERRO GLOBAL: " + str + " linha: " + line);
            return false;
        };
    }
  }, []);

  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && (domNode.name === 'footer' || (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('site-footer')))) {
        const style = domNode.attribs?.style ? attributesToProps(domNode.attribs).style : {};
        const className = domNode.attribs?.class || 'site-footer';
        let text = '© 2026 ERREJOTA. Todos os direitos reservados.';
        
        const findText = (node) => {
          if (!node) return '';
          if (node.type === 'text') return node.data || '';
          if (node.children) return node.children.map(findText).join('');
          return '';
        };
        const extracted = findText(domNode).trim();
        if (extracted && extracted.length > 5) {
          text = extracted;
        }

        return (
          <footer className={className} style={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 0' }}>
            <TextType
              text={[text, 'Bombeiros Capital Morada 🔥', text]}
              typingSpeed={55}
              deletingSpeed={35}
              pauseDuration={3500}
              initialDelay={600}
              loop={true}
              showCursor={true}
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
              className="footer-text-type"
              style={{ fontSize: '13px', color: '#9ba3b2', fontFamily: 'inherit', letterSpacing: '1px', fontWeight: 500 }}
            />
          </footer>
        );
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('falling-subtitle')) {
        const text = domNode.children?.map(c => c.data || '').join('').trim();
        const highlightWords = domNode.attribs['data-highlight']
          ? domNode.attribs['data-highlight'].split(',').map(s => s.trim()).filter(Boolean)
          : [];
        return (
          <div style={{ width: '100%', maxWidth: '700px', height: '120px', position: 'relative', margin: '0 auto' }}>
            <FallingText
              text={text}
              highlightWords={highlightWords}
              highlightClass="highlighted"
              trigger="hover"
              backgroundColor="transparent"
              gravity={0.56}
              fontSize="1.1rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        );
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('glitch-title')) {
        const text = domNode.children?.map(c => c.data || '').join('').trim();
        const customStyle = domNode.attribs.style ? attributesToProps(domNode.attribs).style : {};
        return (
          <h1 className="glitch-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...customStyle }}>
            <GlitchText speed={1} enableShadows enableOnHover={false}>
              {text}
            </GlitchText>
          </h1>
        );
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'sidebar-cursos') {
        return <ReactSidebarCursos />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'sidebar-modulacao') {
        return <ReactSidebarModulacao />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id && domNode.attribs.id.startsWith('sidebar-default')) {
        return <ReactSidebarDefault />;
      }

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

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'viaturas-posicoes-grid') {
        return <ReactPosicoesViaturas />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-alfabeto-fonetico-container') {
        return <ReactAlfabetoFoneticoPixelCard />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-numeracao-fonetica-container') {
        return <ReactNumeracaoFoneticaPixelCard />;
      }

      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'react-padrao-radio-container') {
        return <ReactPadraoRadioPixelCard />;
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
      
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs.id === 'galeria-menu') {
        return <ReactGaleriaFolders />;
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

  return (
    <>
      {parse(htmlString, options)}
      <ConfiguracoesModal />
    </>
  );
}
