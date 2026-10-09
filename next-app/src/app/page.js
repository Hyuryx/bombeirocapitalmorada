import fs from 'fs';
import path from 'path';
import Galaxy from '@/components/Galaxy';
import NoSSRDynamicHTMLRenderer from '@/components/NoSSRDynamicHTMLRenderer';
import ErrorBoundary from '@/components/ErrorBoundary';

export const dynamic = 'force-static';

export default function Home() {
  const readHTML = (relativePath) => {
    try {
      return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
    } catch(e) {
      console.log("Error reading", relativePath, e);
      return '';
    }
  };

  const login = readHTML('src/components/abas/login/index.html');
  const navbar = readHTML('src/components/abas/navbar/index.html');
  const modais = readHTML('src/components/abas/modais/index.html');
  
  const tabsContent = [
    readHTML('src/components/abas/inicio/index.html'),
    readHTML('src/components/abas/cursos/index.html'),
    readHTML('src/components/abas/uniformes/index.html'),
    readHTML('src/components/abas/avisos/index.html'),
    readHTML('src/components/abas/planilhas/index.html'),
    readHTML('src/components/abas/modulacao/index.html'),
    readHTML('src/components/abas/viaturas/index.html'),
    readHTML('src/components/abas/regras/index.html'),
    readHTML('src/components/abas/hierarquia/index.html'),
    readHTML('src/components/abas/galeria/index.html')
  ].join('');
  
  const htmlContent = (login + navbar + '<main class="global-view-container">' + tabsContent + '</main>' + modais).replace(/\r/g, '');

  if (!htmlContent || htmlContent.length < 1000) {
     console.error("HTML CONTENT IS TOO SMALL OR EMPTY! Length:", htmlContent.length);
  }

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
      <ErrorBoundary>
        <NoSSRDynamicHTMLRenderer htmlString={htmlContent} />
      </ErrorBoundary>
    </div>
  );
}
