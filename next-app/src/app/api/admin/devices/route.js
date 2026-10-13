import { NextResponse } from 'next/server';
import { getDeviceDatabase, resetMilitarHwid, deleteMilitarRecord } from '@/lib/deviceStore';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || '1505995174801702912';

// GET: Retorna todos os militares registrados e seus dispositivos vinculados
export async function GET() {
  try {
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
    const body = await request.json().catch(() => ({}));
    const militarId = String(body.militarId || '').trim();
    const action = String(body.action || '').toLowerCase();
    const target = String(body.target || 'all').toLowerCase(); // 'all' | 'desktop' | 'mobile' | 'delete'

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
    if (target === 'desktop') {
      msg = `HWID do Computador (Desktop) do militar #${militarId} foi resetado.`;
    } else if (target === 'mobile') {
      msg = `HWID do Dispositivo Móvel (Celular) do militar #${militarId} foi resetado.`;
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
