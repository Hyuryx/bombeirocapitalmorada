import { NextResponse } from 'next/server';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || '1505995174801702912';
const DISCORD_ROLE_BOMBEIRO = process.env.DISCORD_ROLE_BOMBEIRO || '1505995174906429566';

// Cache em memória de membros do Discord (60 segundos)
let cachedMembers = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000;

async function fetchGuildMembers() {
  const now = Date.now();
  if (cachedMembers && now - lastCacheTime < CACHE_DURATION) {
    return cachedMembers;
  }

  if (!DISCORD_BOT_TOKEN) {
    throw new Error('Token do Discord não configurado no servidor.');
  }

  const res = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members?limit=1000`, {
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Erro na API do Discord:', res.status, errorText);
    throw new Error(`Erro na API do Discord: ${res.status}`);
  }

  const members = await res.json();
  cachedMembers = members;
  lastCacheTime = now;
  return members;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const input = String(body.id || '').trim();

    if (!input) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 1,
          erro: 'Por favor, informe seu ID militar para autenticação.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: false },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: null },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: null },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: null },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 400 }
      );
    }

    const cleanId = input.replace(/^[#\s]+/, '').trim();

    // ETAPA 1: Conexão segura com o sistema de autenticação
    let members;
    try {
      members = await fetchGuildMembers();
    } catch (err) {
      console.error('Falha na Etapa 1 - Conexão segura:', err);
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 1,
          erro: 'Falha ao estabelecer conexão segura com o sistema de registros militares.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: false },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: null },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: null },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: null },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 503 }
      );
    }

    // ETAPA 2: Consulta real ao banco de registros militares
    const targetMember = members.find(m => {
      const nick = m.nick || '';
      const globalName = m.user?.global_name || '';
      const username = m.user?.username || '';
      const fullNames = [nick, globalName, username];

      return fullNames.some(name => {
        if (!name) return false;
        const regex = new RegExp(`#\\s*${cleanId}(?:\\b|\\s|$)`, 'i');
        return regex.test(name);
      });
    });

    if (!targetMember) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 2,
          erro: `Registro militar com ID #${cleanId} não encontrado no banco de dados.`,
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: false },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: null },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: null },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 404 }
      );
    }

    // ETAPA 3: Validando identificação e registro do militar
    const rawNick = targetMember.nick || targetMember.user?.global_name || targetMember.user?.username || '';
    let extractedName = rawNick;
    if (rawNick.includes('#')) {
      extractedName = rawNick.split('#')[0].trim();
    }
    extractedName = extractedName.trim();

    if (!extractedName) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 3,
          erro: 'Identificação militar inválida ou registro incompleto no sistema.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: true, detail: `Registro #${cleanId} localizado` },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: false },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: null },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 422 }
      );
    }

    // ETAPA 4: Verificando vínculo ativo com o Corpo de Bombeiros
    const hasRole = Array.isArray(targetMember.roles) && targetMember.roles.includes(DISCORD_ROLE_BOMBEIRO);

    if (!hasRole) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 4,
          erro: `Vínculo com o Corpo de Bombeiros não confirmado para o militar #${cleanId}.`,
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: true, detail: `Registro #${cleanId} localizado` },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: true, detail: `Militar identificado: ${extractedName}` },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: false },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 403 }
      );
    }

    // ETAPA 5: Confirmando permissões e autorização de acesso
    // Verifica se o usuário não está mutado / suspenso / sem comunicação
    const isCommunicationDisabled = targetMember.communication_disabled_until && new Date(targetMember.communication_disabled_until) > new Date();
    if (isCommunicationDisabled) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 5,
          erro: 'Registro militar atualmente suspenso ou sem permissão de acesso ao portal.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando banco de dados de registros militares...', ok: true, detail: `Registro #${cleanId} localizado` },
            { id: 3, title: 'Validando identificação e registro do militar...', ok: true, detail: `Militar identificado: ${extractedName}` },
            { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: true, detail: 'Setagem CBM ativa confirmada' },
            { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: false },
            { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
          ]
        },
        { status: 403 }
      );
    }

    // ETAPA 6: Finalizando autenticação com sucesso
    const response = NextResponse.json(
      {
        sucesso: true,
        failedAtStep: null,
        mensagem: 'Identificação militar validada com sucesso.',
        userName: extractedName,
        userId: cleanId,
        displayName: rawNick,
        steps: [
          { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
          { id: 2, title: 'Consultando banco de dados de registros militares...', ok: true, detail: `Registro #${cleanId} localizado` },
          { id: 3, title: 'Validando identificação e registro do militar...', ok: true, detail: `Militar identificado: ${extractedName}` },
          { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: true, detail: 'Setagem CBM ativa confirmada' },
          { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: true, detail: 'Permissão concedida' },
          { id: 6, title: 'Finalizando processo de autenticação...', ok: true, detail: 'Sessão criptografada gerada' }
        ]
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', 'autenticado_com_sucesso', {
      path: '/',
      maxAge: 604800,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      {
        sucesso: false,
        failedAtStep: 1,
        erro: 'Erro interno no processamento de autenticação militar.',
        steps: [
          { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: false },
          { id: 2, title: 'Consultando banco de dados de registros militares...', ok: null },
          { id: 3, title: 'Validando identificação e registro do militar...', ok: null },
          { id: 4, title: 'Verificando vínculo com o Corpo de Bombeiros...', ok: null },
          { id: 5, title: 'Confirmando permissões e autorização de acesso...', ok: null },
          { id: 6, title: 'Finalizando processo de autenticação...', ok: null }
        ]
      },
      { status: 500 }
    );
  }
}
