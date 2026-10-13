import ThemeBackground from '@/components/ThemeBackground';
import NoSSRDynamicHTMLRenderer from '@/components/NoSSRDynamicHTMLRenderer';
import ErrorBoundary from '@/components/ErrorBoundary';
import NoSSRLanyardBadgeScreen from '@/components/NoSSRLanyardBadgeScreen';

// Importando o conteúdo HTML como strings JS puras
import loginHTML from '@/components/abas/login/index.js';
import navbarHTML from '@/components/abas/navbar/index.js';
import modaisHTML from '@/components/abas/modais/index.js';
import inicioHTML from '@/components/abas/inicio/index.js';
import cursosHTML from '@/components/abas/cursos/index.js';
import uniformesHTML from '@/components/abas/uniformes/index.js';
import avisosHTML from '@/components/abas/avisos/index.js';
import planilhasHTML from '@/components/abas/planilhas/index.js';
import modulacaoHTML from '@/components/abas/modulacao/index.js';
import viaturasHTML from '@/components/abas/viaturas/index.js';
import regrasHTML from '@/components/abas/regras/index.js';
import hierarquiaHTML from '@/components/abas/hierarquia/index.js';
import galeriaHTML from '@/components/abas/galeria/index.js';

export const dynamic = 'force-static';

export default function Home() {
  const tabsContent = [
    inicioHTML,
    cursosHTML,
    uniformesHTML,
    avisosHTML,
    planilhasHTML,
    modulacaoHTML,
    viaturasHTML,
    regrasHTML,
    hierarquiaHTML,
    galeriaHTML
  ].join('');
  
  const htmlContent = (loginHTML + navbarHTML + '<main class="global-view-container">' + tabsContent + '</main>' + modaisHTML).replace(/\r/g, '');

  if (!htmlContent || htmlContent.length < 1000) {
     console.error("HTML CONTENT IS TOO SMALL OR EMPTY! Length:", htmlContent.length);
  }

  return (
    <div suppressHydrationWarning>
      <ThemeBackground />
      <NoSSRLanyardBadgeScreen />
      <ErrorBoundary>
        <NoSSRDynamicHTMLRenderer htmlString={htmlContent} />
      </ErrorBoundary>
    </div>
  );
}
