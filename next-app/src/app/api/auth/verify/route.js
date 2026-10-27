import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/sessionGuard';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requiredRole = searchParams.get('panel') === 'avisos' ? 'SYSTEM' : null;

    const auth = await verifySession(request, requiredRole);
    if (!auth.valid) {
      return NextResponse.json(
        { autenticado: false, erro: auth.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      autenticado: true,
      user: {
        militarId: auth.user.militarId,
        userName: auth.user.userName || auth.user.nome || 'Militar',
        role: auth.user.role || 'BOMBEIRO',
        isMaster: !!auth.user.isMaster
      }
    });
  } catch (err) {
    return NextResponse.json(
      { autenticado: false, erro: 'Falha ao validar sessão.' },
      { status: 500 }
    );
  }
}
