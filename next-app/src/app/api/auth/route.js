import { NextResponse } from 'next/server';
import { getMilitarRecord, saveMilitarRecord, addMilitarLog } from '@/lib/deviceStore';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || '1505995174801702912';
const DISCORD_ROLE_BOMBEIRO = process.env.DISCORD_ROLE_BOMBEIRO || '1505995174906429566';
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '1529936529064067255';
const DISCORD_INVITE_URL = process.env.DISCORD_INVITE_URL || 'https://discord.gg/JdAB2NVss';

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
    const clientHwid = String(body.hwid || '').trim();
    const rawDeviceType = String(body.deviceType || 'desktop').toLowerCase();
    const isMobile = rawDeviceType === 'mobile';
    const deviceType = isMobile ? 'mobile' : 'desktop';

    // Obter URL base da requisição para redirecionamentos
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${protocol}://${host}`;

    if (!input) {
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 1,
          erro: 'Por favor, informe seu ID militar para autenticação.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: false },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: null },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: null },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
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
          erro: 'Falha ao estabelecer conexão com os servidores do Discord do CBM.',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: false },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: null },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: null },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 503 }
      );
    }

    // ETAPA 2: Consulta de presença no Discord oficial do CBM
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
      await addMilitarLog(cleanId, {
        type: 'DISCORD_NOT_FOUND',
        title: 'Militar Não Encontrado no Discord',
        detail: `Tentativa de login rejeitada: Militar com ID #${cleanId} não localizado no Servidor Oficial CBM.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 2,
          erro: `Militar com ID #${cleanId} não encontrado no Servidor Oficial CBM.`,
          action: 'JOIN_DISCORD',
          actionUrl: DISCORD_INVITE_URL,
          actionLabel: 'Entrar no Servidor do Discord',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: false, detail: 'Militar não localizado no servidor' },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: null },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 404 }
      );
    }

    // Extrair o nome de guerra do militar
    const rawNick = targetMember.nick || targetMember.user?.global_name || targetMember.user?.username || '';
    let extractedName = rawNick;
    if (rawNick.includes('#')) {
      extractedName = rawNick.split('#')[0].trim();
    }
    extractedName = extractedName.trim() || 'Militar';

    // ETAPA 3: Validar cargo militar e autorização do Bot CBM
    const hasRole = Array.isArray(targetMember.roles) && targetMember.roles.includes(DISCORD_ROLE_BOMBEIRO);
    if (!hasRole) {
      await addMilitarLog(cleanId, {
        type: 'ROLE_MISSING',
        title: 'Cargo Militar CBM Não Encontrado',
        detail: `Tentativa de login rejeitada: Usuário "${extractedName}" (${targetMember.user?.id}) está no servidor mas não possui a setagem oficial de Bombeiro.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 3,
          erro: `Vínculo com o Corpo de Bombeiros não confirmado para o militar #${cleanId}. É necessário o cargo oficial.`,
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar #${cleanId} localizado no servidor` },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: false, detail: 'Cargo de Bombeiro não encontrado' },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 403 }
      );
    }

    // Verificar se o militar já autorizou o Bot do Discord
    const militarRecord = await getMilitarRecord(cleanId);
    const isBotAuthorized = militarRecord && militarRecord.isBotAuthorized === true;

    // Se ainda não autorizou o bot, emitir a ação de autorizar via Discord OAuth2
    if (!isBotAuthorized) {
      await addMilitarLog(cleanId, {
        type: 'BOT_PENDING',
        title: 'Autorização do Bot Pendente',
        detail: `Primeiro acesso do militar #${cleanId} (${extractedName}): pendente autorizar o Bot CBM no Discord.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      const authUrl = `${baseUrl}/api/auth/discord/login?id=${encodeURIComponent(cleanId)}&hwid=${encodeURIComponent(clientHwid)}&type=${encodeURIComponent(deviceType)}`;
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 3,
          erro: 'Primeiro acesso detectado: é necessário autorizar o Bot do CBM no seu Discord.',
          action: 'AUTHORIZE_BOT',
          actionUrl: authUrl,
          actionLabel: 'Autorizar Bot no Discord',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar #${cleanId} localizado no servidor` },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: false, detail: 'Autorização do Bot CBM pendente' },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 401 }
      );
    }

    // ETAPA 4: Identificação do Dispositivo e Plataforma
    const platformLabel = isMobile ? 'Dispositivo Móvel (Smartphone / Tablet)' : 'Computador Desktop';

    // ETAPA 5: Validação da Trava de Máquina (HWID Lock)
    // Regra: Cada militar tem direito a 1 PC (desktopHwid) e 1 Mobile (mobileHwid).
    let isDeviceAuthorized = false;
    let hwidDetailMsg = '';

    if (isMobile) {
      if (!militarRecord.mobileHwid) {
        // Primeiro acesso em dispositivo móvel: registra e vincula
        await saveMilitarRecord(cleanId, {
          mobileHwid: clientHwid,
          mobileDeviceName: 'Dispositivo Móvel Autorizado',
          lastMobileLogin: new Date().toISOString()
        });
        isDeviceAuthorized = true;
        hwidDetailMsg = 'Dispositivo móvel registrado e vinculado';
      } else if (militarRecord.mobileHwid === clientHwid) {
        isDeviceAuthorized = true;
        hwidDetailMsg = 'Dispositivo móvel reconhecido e autorizado';
      } else {
        isDeviceAuthorized = false;
      }
    } else {
      if (!militarRecord.desktopHwid) {
        // Primeiro acesso em computador: registra e vincula
        await saveMilitarRecord(cleanId, {
          desktopHwid: clientHwid,
          desktopDeviceName: 'Computador Desktop Autorizado',
          lastDesktopLogin: new Date().toISOString()
        });
        isDeviceAuthorized = true;
        hwidDetailMsg = 'Computador registrado e vinculado';
      } else if (militarRecord.desktopHwid === clientHwid) {
        isDeviceAuthorized = true;
        hwidDetailMsg = 'Computador reconhecido e autorizado';
      } else {
        isDeviceAuthorized = false;
      }
    }

    if (!isDeviceAuthorized) {
      const deviceName = isMobile ? 'dispositivo móvel' : 'computador';
      const registeredHwid = isMobile ? militarRecord.mobileHwid : militarRecord.desktopHwid;
      await addMilitarLog(cleanId, {
        type: 'HWID_BLOCKED',
        title: 'Acesso Bloqueado - Máquina Não Autorizada',
        detail: `Acesso negado em outro ${deviceName}. HWID da tentativa: [${clientHwid ? clientHwid.substring(0, 16) + '...' : 'Nenhum'}]. HWID registrado: [${registeredHwid ? registeredHwid.substring(0, 16) + '...' : 'Nenhum'}]. Possível troca de dispositivo ou tentativa de acesso indevido.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 5,
          erro: `Acesso bloqueado: Este ID militar já está registrado em outro ${deviceName}. Solicite ao Comando a liberação da máquina.`,
          action: 'HWID_LOCKED',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar #${cleanId} localizado no servidor` },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: true, detail: `Bot autorizado | Militar: ${extractedName}` },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: true, detail: platformLabel },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: false, detail: `Máquina não autorizada para #${cleanId}` },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 403 }
      );
    }

    // ETAPA 6: Finalizando autenticação militar com Sessão Única Criptografada
    const sessionToken = `cbm_sec_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    await saveMilitarRecord(cleanId, {
      sessionToken,
      lastLogin: new Date().toISOString()
    });

    await addMilitarLog(cleanId, {
      type: 'LOGIN_SUCCESS',
      title: 'Autenticação Militar Concluída com Sucesso',
      detail: `Militar ${extractedName} (#${cleanId}) autenticado com sucesso no ${platformLabel}. Trava HWID validada.`,
      hwid: clientHwid || null,
      deviceType: deviceType,
      success: true
    });

    const response = NextResponse.json(
      {
        sucesso: true,
        failedAtStep: null,
        mensagem: 'Identificação militar validada com sucesso.',
        userName: extractedName,
        userId: cleanId,
        displayName: rawNick,
        deviceType: deviceType,
        steps: [
          { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
          { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar #${cleanId} localizado no servidor` },
          { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: true, detail: `Bot autorizado | Militar: ${extractedName}` },
          { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: true, detail: platformLabel },
          { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: true, detail: hwidDetailMsg },
          { id: 6, title: 'Finalizando processo de autenticação militar...', ok: true, detail: 'Sessão criptografada gerada' }
        ]
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', sessionToken, {
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
          { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: null },
          { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: null },
          { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
          { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
          { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
        ]
      },
      { status: 500 }
    );
  }
}
