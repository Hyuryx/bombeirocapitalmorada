import fs from 'fs';
import path from 'path';
import DynamicHTMLRenderer from '@/components/DynamicHTMLRenderer';

// Esta página agora é um Server Component no Next.js!
// Toda vez que você der refresh, ela vai ler o seu index.html antigo e converter ele em React em tempo real.
export default function Home() {
  // Caminho absoluto para o seu index.html que está FORA da pasta next-app
  const htmlPath = path.join(process.cwd(), '../index.html');
  
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } catch (error) {
    console.error("Não foi possível ler o arquivo index.html:", error);
    return <div>Erro: Arquivo index.html não encontrado fora da pasta next-app!</div>;
  }

  // Extrair apenas o que está dentro do <body> para não duplicar <html> e <head> do layout.js
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  return (
    <>
      <DynamicHTMLRenderer htmlString={bodyContent} />
    </>
  );
}
