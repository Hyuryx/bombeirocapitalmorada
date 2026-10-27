import ThemeBackground from '@/components/ThemeBackground';
import NoSSRDynamicHTMLRenderer from '@/components/NoSSRDynamicHTMLRenderer';
import ErrorBoundary from '@/components/ErrorBoundary';
import NoSSRLanyardBadgeScreen from '@/components/NoSSRLanyardBadgeScreen';

// Apenas a casca pública de autenticação e navegação é entregue inicialmente.
// Todo o conteúdo confidencial das abas é servido de forma restrita via /api/content
// após validação da sessão militar criptografada (HMAC + HWID).
import loginHTML from '@/components/abas/login/index.js';
import navbarHTML from '@/components/abas/navbar/index.js';

export const dynamic = 'force-dynamic';

export default function Home() {
  const shellHTML = (loginHTML + navbarHTML).replace(/\r/g, '');

  return (
    <div suppressHydrationWarning>
      <ThemeBackground />
      <NoSSRLanyardBadgeScreen />
      <ErrorBoundary>
        <NoSSRDynamicHTMLRenderer htmlString={shellHTML} />
      </ErrorBoundary>
    </div>
  );
}
