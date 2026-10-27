import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessionGuard';

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
import modaisHTML from '@/components/abas/modais/index.js';

export async function GET(request) {
  try {
    const auth = await verifySession(request);
    if (!auth.valid) {
      return NextResponse.json(
        { 
          sucesso: false, 
          erro: 'ACESSO NEGADO: Sessão militar não autorizada ou ausente. Conteúdo restrito.' 
        },
        { status: 401 }
      );
    }

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

    const htmlContent = ('<main class="global-view-container">' + tabsContent + '</main>' + modaisHTML).replace(/\r/g, '');

    return NextResponse.json({
      sucesso: true,
      user: {
        militarId: auth.user.militarId,
        userName: auth.user.userName
      },
      content: htmlContent
    });
  } catch (err) {
    console.error('Erro ao servir conteúdo seguro:', err);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro interno ao processar conteúdo confidencial.' },
      { status: 500 }
    );
  }
}
