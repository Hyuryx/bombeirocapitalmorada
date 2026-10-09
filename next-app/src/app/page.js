import fs from 'fs';
import path from 'path';
import Galaxy from '@/components/Galaxy';
import NoSSRDynamicHTMLRenderer from '@/components/NoSSRDynamicHTMLRenderer';

function readTab(name) {
    const p = path.join(process.cwd(), 'src/components/abas', name, 'index.html');
    if (fs.existsSync(p)) {
        return fs.readFileSync(p, 'utf8');
    }
    return '';
}

export default function Home() {
  const login = readTab('login');
  const navbar = readTab('navbar');
  const modais = readTab('modais');
  
  const tabs = [
      'inicio', 'cursos', 'uniformes', 'avisos', 'planilhas', 
      'modulacao', 'viaturas', 'regras', 'hierarquia', 'galeria'
  ];
  const tabsContent = tabs.map(tab => readTab(tab)).join('');
  
  const htmlContent = (login + navbar + '<main class="global-view-container">' + tabsContent + '</main>' + modais).replace(/\r/g, '');

  return (
    <div suppressHydrationWarning>
      <div id="galaxy-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -3, overflow: 'hidden' }}>
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <NoSSRDynamicHTMLRenderer htmlString={htmlContent} />
    </div>
  );
}
