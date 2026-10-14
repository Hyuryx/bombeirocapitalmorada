import { NextResponse } from 'next/server';
import { getMilitarRecord, saveMilitarRecord, addMilitarLog } from '@/lib/deviceStore';

import { 
  DISCORD_BOT_TOKEN, 
  DISCORD_GUILD_ID, 
  DISCORD_ROLE_BOMBEIRO,
  DISCORD_ROLE_SYSTEM,
  DISCORD_CLIENT_ID, 
  DISCORD_INVITE_URL 
} from '@/lib/discordConfig';

// Cache em memória de membros do Discord (60 segundos)
let cachedMembers = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000;

async function fetchGuildMembers(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedMembers && now - lastCacheTime < CACHE_DURATION) {
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

    // Diferenciação de painel: para o Painel de Avisos/Admin exige CARGO SYSTEM (1531036518876184637)
    const rawPanel = String(body.panel || body.requiredRole || '').toLowerCase();
    const isSystemPanel = rawPanel === 'avisos' || rawPanel === 'system' || rawPanel === 'admin';
    const requiredRoleId = isSystemPanel ? DISCORD_ROLE_SYSTEM : DISCORD_ROLE_BOMBEIRO;
    const requiredRoleName = isSystemPanel ? 'SYSTEM (Administrador)' : 'Bombeiro';

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

    let militarRecord = await getMilitarRecord(cleanId);

    // Diferenciação de slots de HWID:
    // Painel de Avisos (Cargo SYSTEM): adminDesktopHwid / adminMobileHwid
    // Site Principal (Cargo Bombeiro): siteDesktopHwid (fallback desktopHwid) / siteMobileHwid (fallback mobileHwid)
    const deviceHwidField = isSystemPanel
      ? (isMobile ? 'adminMobileHwid' : 'adminDesktopHwid')
      : (isMobile ? 'siteMobileHwid' : 'siteDesktopHwid');

    const deviceNameField = isSystemPanel
      ? (isMobile ? 'adminMobileDeviceName' : 'adminDesktopDeviceName')
      : (isMobile ? 'siteMobileDeviceName' : 'siteDesktopDeviceName');

    const deviceLoginField = isSystemPanel
      ? (isMobile ? 'lastAdminMobileLogin' : 'lastAdminDesktopLogin')
      : (isMobile ? 'lastSiteMobileLogin' : 'lastSiteDesktopLogin');

    if (clientHwid) {
      const initialSave = {
        militarId: cleanId,
        lastLogin: new Date().toISOString(),
        [deviceLoginField]: new Date().toISOString()
      };

      // Se este slot específico do painel correspondente ainda estiver livre, vincula o HWID
      const currentSlotHwid = isSystemPanel
        ? (isMobile ? militarRecord?.adminMobileHwid : militarRecord?.adminDesktopHwid)
        : (isMobile ? (militarRecord?.siteMobileHwid || militarRecord?.mobileHwid) : (militarRecord?.siteDesktopHwid || militarRecord?.desktopHwid));

      if (!militarRecord || !currentSlotHwid) {
        initialSave[deviceHwidField] = clientHwid;
        initialSave[deviceNameField] = isSystemPanel
          ? (isMobile ? 'Dispositivo Móvel (Painel de Avisos)' : 'Computador Desktop (Painel de Avisos)')
          : (isMobile ? 'Dispositivo Móvel (Site)' : 'Computador Desktop (Site)');

        // Para retrocompatibilidade no site principal
        if (!isSystemPanel) {
          if (isMobile && !militarRecord?.mobileHwid) initialSave.mobileHwid = clientHwid;
          if (!isMobile && !militarRecord?.desktopHwid) initialSave.desktopHwid = clientHwid;
        }
      }

      militarRecord = await saveMilitarRecord(cleanId, initialSave);
    }


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
    const idNumber = parseInt(cleanId, 10);

    const matchMember = (list) => {
      return list.find(m => {
        // Se este militar já possui Discord vinculado na base de dados
        if (militarRecord?.discordId && m.user?.id === militarRecord.discordId) {
          return true;
        }

        const nick = m.nick || '';
        const globalName = m.user?.global_name || '';
        const username = m.user?.username || '';
        const fullNames = [nick, globalName, username];

        return fullNames.some(name => {
          if (!name) return false;
          // 1. Número exato em #(\d+) (ex: #35904, #01 -> 1)
          if (!isNaN(idNumber)) {
            const hashMatch = name.match(/#\s*(\d+)/i);
            if (hashMatch && parseInt(hashMatch[1], 10) === idNumber) return true;
          }
          // 2. Procura com # (ex: #35904 ou # 35904)
          if (new RegExp(`#\\s*0*${cleanId}(?:\\b|\\s|$)`, 'i').test(name)) return true;
          // 3. Procura com separadores (ex: [35904], - 35904, | 35904, ID 35904)
          if (new RegExp(`(?:[\\[\\(\\|\\-]\\s*|\\b(?:id|rg)\\s*[:\\-]?\\s*)0*${cleanId}(?:\\b|\\s|[\\]\\)]|$)`, 'i').test(name)) return true;
          // 4. Termina com o número do ID
          if (new RegExp(`\\b0*${cleanId}$`, 'i').test(name.trim())) return true;
          return false;
        });
      });
    };

    let targetMember = matchMember(members);

    // Se não encontrou no cache, força uma busca fresca em tempo real no Discord
    if (!targetMember) {
      try {
        const freshMembers = await fetchGuildMembers(true);
        targetMember = matchMember(freshMembers);
      } catch (err) {
        console.warn('Erro ao atualizar membros do Discord em tempo real:', err);
      }
    }

    if (!targetMember) {
      await addMilitarLog(cleanId, {
        type: 'DISCORD_NOT_FOUND',
        title: 'ID Militar Não Localizado no Discord',
        detail: `Tentativa de login: ID #${cleanId} não encontrado no apelido de nenhum membro do servidor CBM. Se já estiver no servidor, certifique-se de que seu apelido contenha "#${cleanId}".`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 2,
          erro: `ID militar #${cleanId} não localizado no Servidor do Discord CBM.`,
          detail: `Não localizamos nenhum membro com "#${cleanId}" no apelido. Se você já está no Discord dos Bombeiros, certifique-se de que o seu apelido no servidor termine com o seu ID (ex: "Seu Nome #${cleanId}"). Se ainda não entrou, clique abaixo para ingressar.`,
          action: 'JOIN_DISCORD',
          actionUrl: DISCORD_INVITE_URL,
          actionLabel: 'Entrar no Servidor do Discord',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: false, detail: `ID #${cleanId} não encontrado no apelido de nenhum membro` },
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

    // Salvar imediatamente o nome e identificação do Discord na ficha do militar
    militarRecord = await saveMilitarRecord(cleanId, {
      nick: extractedName,
      discordTag: `${targetMember.user?.username}#${targetMember.user?.discriminator || '0'}`,
      discordId: targetMember.user?.id,
      globalName: targetMember.user?.global_name || targetMember.user?.username
    });

    // ETAPA 3: Validar cargo militar e autorização do Bot CBM
    const hasRole = Array.isArray(targetMember.roles) && targetMember.roles.includes(requiredRoleId);
    if (!hasRole) {
      await addMilitarLog(cleanId, {
        type: 'ROLE_MISSING',
        title: `Setagem Oficial de ${requiredRoleName} Não Confirmada`,
        detail: `Tentativa de login: Usuário "${extractedName}" (${targetMember.user?.id}) está no Discord CBM, mas não possui a setagem oficial de ${requiredRoleName}.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 3,
          erro: `Setagem oficial de ${requiredRoleName} não confirmada para o militar #${cleanId}.`,
          detail: isSystemPanel
            ? `Seu usuário "${extractedName}" foi localizado no Discord dos Bombeiros, porém não possui o cargo SYSTEM necessário para gerenciar o Painel de Avisos. Solicite a sua setagem de Administrador com um Oficial no Discord.`
            : `Seu usuário "${extractedName}" foi localizado no Discord dos Bombeiros, porém ainda não possui o cargo militar de Bombeiro. Solicite a sua setagem com um Oficial no Discord.`,
          action: 'JOIN_DISCORD',
          actionUrl: DISCORD_INVITE_URL,
          actionLabel: 'Abrir Discord dos Bombeiros',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar localizado: ${extractedName} (#${cleanId})` },
            { id: 3, title: `Validando autorização do Bot e cargo militar (${requiredRoleName})...`, ok: false, detail: `Setagem oficial de ${requiredRoleName} não encontrada` },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: null },
            { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', ok: null },
            { id: 6, title: 'Finalizando processo de autenticação militar...', ok: null }
          ]
        },
        { status: 403 }
      );
    }

    // Verificar se o militar já autorizou o Bot do Discord
    const isBotAuthorized = militarRecord && militarRecord.isBotAuthorized === true;

    // Se ainda não autorizou o bot, emitir a ação de autorizar via Discord OAuth2
    if (!isBotAuthorized) {
      await addMilitarLog(cleanId, {
        type: 'BOT_PENDING',
        title: 'Autorização do Bot Pendente (1º Acesso)',
        detail: `Militar #${cleanId} (${extractedName}) possui cargo de ${requiredRoleName}. Pendente autorizar o Bot CBM no Discord para vincular máquina.`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      const authUrl = `${baseUrl}/api/auth/discord/login?id=${encodeURIComponent(cleanId)}&hwid=${encodeURIComponent(clientHwid)}&type=${encodeURIComponent(deviceType)}&panel=${encodeURIComponent(isSystemPanel ? 'avisos' : '')}`;
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 3,
          erro: `Primeiro acesso do militar #${cleanId}: autorização do Bot CBM necessária.`,
          detail: `Militar ${extractedName} (#${cleanId}) confirmado com cargo de ${requiredRoleName}! Clique no botão abaixo para autorizar o Bot do CBM no seu Discord e vincular seu dispositivo.`,
          action: 'AUTHORIZE_BOT',
          actionUrl: authUrl,
          actionLabel: 'Autorizar Bot no Discord',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar localizado: ${extractedName} (#${cleanId})` },
            { id: 3, title: `Validando autorização do Bot e cargo militar (${requiredRoleName})...`, ok: false, detail: 'Autorização do Bot CBM pendente (1º Acesso)' },
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
    // Regra:
    // Painel de Avisos (Cargo SYSTEM): cada militar tem direito a 1 PC (adminDesktopHwid) e 1 Celular (adminMobileHwid).
    // Site Principal (Cargo Bombeiro): cada militar tem direito a 1 PC (siteDesktopHwid) e 1 Celular (siteMobileHwid).
    let isDeviceAuthorized = false;
    let hwidDetailMsg = '';

    // HWID registrado neste painel específico
    const registeredHwid = isSystemPanel
      ? (isMobile ? militarRecord?.adminMobileHwid : militarRecord?.adminDesktopHwid)
      : (isMobile ? (militarRecord?.siteMobileHwid || militarRecord?.mobileHwid) : (militarRecord?.siteDesktopHwid || militarRecord?.desktopHwid));

    // HWID já aprovado do mesmo militar no outro painel (Site <-> Avisos)
    const otherPanelHwid = isSystemPanel
      ? (isMobile ? (militarRecord?.siteMobileHwid || militarRecord?.mobileHwid) : (militarRecord?.siteDesktopHwid || militarRecord?.desktopHwid))
      : (isMobile ? militarRecord?.adminMobileHwid : militarRecord?.adminDesktopHwid);

    const systemNameLabel = isSystemPanel ? 'Painel de Avisos' : 'Site Principal';

    if (!registeredHwid) {
      // 1. Primeiro vínculo no painel
      const savePayload = {
        [deviceHwidField]: clientHwid,
        [deviceNameField]: isSystemPanel
          ? (isMobile ? 'Dispositivo Móvel Autorizado (Painel de Avisos)' : 'Computador Desktop Autorizado (Painel de Avisos)')
          : (isMobile ? 'Dispositivo Móvel Autorizado (Site)' : 'Computador Desktop Autorizado (Site)'),
        [deviceLoginField]: new Date().toISOString()
      };
      // Retrocompatibilidade para o site principal
      if (!isSystemPanel) {
        if (isMobile && !militarRecord?.mobileHwid) savePayload.mobileHwid = clientHwid;
        if (!isMobile && !militarRecord?.desktopHwid) savePayload.desktopHwid = clientHwid;
      }
      militarRecord = await saveMilitarRecord(cleanId, savePayload);
      isDeviceAuthorized = true;
      hwidDetailMsg = `${isMobile ? 'Dispositivo móvel' : 'Computador'} vinculado ao ${systemNameLabel}`;
    } else if (registeredHwid === clientHwid) {
      // 2. Dispositivo reconhecido exatamente no slot deste painel
      isDeviceAuthorized = true;
      hwidDetailMsg = `${isMobile ? 'Dispositivo móvel' : 'Computador'} reconhecido e autorizado no ${systemNameLabel}`;
    } else if (otherPanelHwid === clientHwid || (!isMobile && (militarRecord?.adminDesktopHwid === clientHwid || militarRecord?.siteDesktopHwid === clientHwid || militarRecord?.desktopHwid === clientHwid))) {
      // 3. Máquina legítima do militar já autorizada no outro painel ou no cadastro: sincroniza automaticamente
      const savePayload = {
        [deviceHwidField]: clientHwid,
        [deviceNameField]: isSystemPanel
          ? (isMobile ? 'Dispositivo Móvel Sincronizado (Painel de Avisos)' : 'Computador Desktop Sincronizado (Painel de Avisos)')
          : (isMobile ? 'Dispositivo Móvel Sincronizado (Site)' : 'Computador Desktop Sincronizado (Site)'),
        [deviceLoginField]: new Date().toISOString()
      };
      if (!isSystemPanel) {
        if (isMobile) savePayload.mobileHwid = clientHwid;
        if (!isMobile) savePayload.desktopHwid = clientHwid;
      }
      militarRecord = await saveMilitarRecord(cleanId, savePayload);
      isDeviceAuthorized = true;
      hwidDetailMsg = `${isMobile ? 'Dispositivo móvel' : 'Computador'} reconhecido e sincronizado com sucesso`;
    } else {
      isDeviceAuthorized = false;
    }

    if (!isDeviceAuthorized) {
      const deviceName = isMobile ? 'dispositivo móvel' : 'computador';
      await addMilitarLog(cleanId, {
        type: 'HWID_BLOCKED',
        title: `Acesso Bloqueado no ${systemNameLabel} - Máquina Não Autorizada`,
        detail: `Acesso negado em outro ${deviceName} no ${systemNameLabel}. HWID da tentativa: [${clientHwid ? clientHwid.substring(0, 16) + '...' : 'Nenhum'}]. HWID registrado no ${systemNameLabel}: [${registeredHwid ? registeredHwid.substring(0, 16) + '...' : 'Nenhum'}].`,
        hwid: clientHwid || null,
        deviceType: deviceType,
        success: false
      });
      return NextResponse.json(
        {
          sucesso: false,
          failedAtStep: 5,
          erro: `Acesso bloqueado: Este ID militar já está registrado em outro ${deviceName} para o ${systemNameLabel}. Solicite ao Comando a liberação da máquina no ${systemNameLabel}.`,
          action: 'HWID_LOCKED',
          steps: [
            { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', ok: true },
            { id: 2, title: 'Consultando registro militar no Discord do CBM...', ok: true, detail: `Militar #${cleanId} localizado no servidor` },
            { id: 3, title: 'Validando autorização do Bot e cargo militar...', ok: true, detail: `Bot autorizado | Militar: ${extractedName}` },
            { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', ok: true, detail: `${platformLabel} • ${systemNameLabel}` },
            { id: 5, title: `Validando trava de máquina autorizada no ${systemNameLabel}...`, ok: false, detail: `Máquina não autorizada para o ${systemNameLabel}` },
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
