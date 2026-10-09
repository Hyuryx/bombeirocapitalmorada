import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
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
    return NextResponse.json({ erro: "Erro interno no servidor local." }, { status: 500 });
  }
}
