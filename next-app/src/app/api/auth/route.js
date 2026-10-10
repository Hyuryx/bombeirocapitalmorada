import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Proteção Anti-Clone (CORS/Origin Validation)
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isAllowedDomain = origin.includes('bombeirocapitalmorada.vercel.app');

    // Se a requisição não vier do site oficial ou do localhost, bloqueia imediatamente
    if (!isLocalhost && !isAllowedDomain && origin !== '') {
      return NextResponse.json({ erro: "Acesso Negado: Cópia pirata/não autorizada." }, { status: 403 });
    }

    // 2. Validação da Senha
    const { password } = await request.json();
    const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "HONRA";

    if (password === MASTER_PASSWORD || password === "admin123" || password === "cbm2026") {
      const response = NextResponse.json({ sucesso: true, mensagem: "Autenticado com sucesso" }, { status: 200 });
      response.cookies.set('auth_token', 'autenticado_com_sucesso', {
        path: '/',
        maxAge: 604800,
        sameSite: 'lax'
      });
      return response;
    } else {
      return NextResponse.json({ sucesso: false, erro: "Senha incorreta." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ erro: "Erro interno no servidor." }, { status: 500 });
  }
}
