import { NextResponse } from 'next/server';
import { getDeviceDatabase, resetMilitarHwid, deleteMilitarRecord } from '@/lib/deviceStore';
import { verifySession } from '@/lib/sessionGuard';
import { DISCORD_GUILD_ID } from '@/lib/discordConfig';

// GET: Retorna todos os militares registrados e seus dispositivos vinculados
export async function GET(request) {
  try {
    const auth = await verifySession(request, 'SYSTEM');
    if (!auth.valid) {
      return NextResponse.json(
        { sucesso: false, erro: 'ACESSO NEGADO: Sessão de administrador SYSTEM não autorizada.' },
        { status: 401 }
      );
    }

    const db = await getDeviceDatabase();
    const militaresList = Object.values(db);

    // Ordenar por ID ou último login
    militaresList.sort((a, b) => {
      const idA = parseInt(a.militarId, 10) || 0;
      const idB = parseInt(b.militarId, 10) || 0;
      return idA - idB;
    });

    return NextResponse.json({
      sucesso: true,
      total: militaresList.length,
      militares: militaresList
    });
  } catch (error) {
    console.error('Erro ao listar dispositivos no admin:', error);
    return NextResponse.json(
      { sucesso: false, erro: 'Falha ao buscar registros de dispositivos.' },
      { status: 500 }
    );
  }
}

// POST: Executa reset de HWID ou Exclusão total do registro militar
export async function POST(request) {
  try {
    const auth = await verifySession(request, 'SYSTEM');
    if (!auth.valid) {
      return NextResponse.json(
        { sucesso: false, erro: 'ACESSO NEGADO: Operação restrita a administradores SYSTEM.' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const militarId = String(body.militarId || '').trim();
    const action = String(body.action || '').toLowerCase();
    const target = String(body.target || body.deviceSlot || 'all').toLowerCase();

    if (!militarId) {
      return NextResponse.json(
        { sucesso: false, erro: 'ID militar é obrigatório.' },
        { status: 400 }
      );
    }

    // Ação de EXCLUIR CADASTRO MILITAR
    if (action === 'delete' || target === 'delete') {
      const deleted = await deleteMilitarRecord(militarId);
      if (!deleted) {
        return NextResponse.json(
          { sucesso: false, erro: `Militar com ID #${militarId} não encontrado no banco.` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        sucesso: true,
        mensagem: `Cadastro do militar #${militarId} excluído com sucesso do sistema. Vínculos e HWIDs foram apagados.`
      });
    }

    // Ação de RESET DE HWID
    const updated = await resetMilitarHwid(militarId, target);

    if (!updated) {
      return NextResponse.json(
        { sucesso: false, erro: `Militar com ID #${militarId} não encontrado no banco.` },
        { status: 404 }
      );
    }

    let msg = `HWID de todos os dispositivos do militar #${militarId} foram resetados.`;
    if (target === 'site_desktop' || target === 'desktop') {
      msg = `HWID do Computador no Site Principal do militar #${militarId} foi resetado.`;
    } else if (target === 'site_mobile' || target === 'mobile') {
      msg = `HWID do Celular no Site Principal do militar #${militarId} foi resetado.`;
    } else if (target === 'admin_desktop') {
      msg = `HWID do Computador no Painel de Avisos do militar #${militarId} foi resetado.`;
    } else if (target === 'admin_mobile') {
      msg = `HWID do Celular no Painel de Avisos do militar #${militarId} foi resetado.`;
    } else if (target === 'site_all') {
      msg = `Todos os HWIDs do Site Principal do militar #${militarId} foram resetados.`;
    } else if (target === 'admin_all') {
      msg = `Todos os HWIDs do Painel de Avisos do militar #${militarId} foram resetados.`;
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: msg,
      militar: updated
    });
  } catch (error) {
    console.error('Erro ao processar ação de dispositivo/militar:', error);
    return NextResponse.json(
      { sucesso: false, erro: 'Erro interno no servidor administrativo.' },
      { status: 500 }
    );
  }
}
