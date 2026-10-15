import { NextResponse } from 'next/server';
import { saveMilitarRecord, getMilitarRecord, addMilitarLog } from '@/lib/deviceStore';

import { 
  DISCORD_CLIENT_ID, 
  DISCORD_CLIENT_SECRET, 
  DISCORD_GUILD_ID, 
  DISCORD_ROLE_BOMBEIRO,
  DISCORD_ROLE_SYSTEM,
  DISCORD_BOT_TOKEN 
} from '@/lib/discordConfig';
import { sendDiscordRegistrationNotification, resolveIpAndLocation } from '@/lib/discordNotifier';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/auth/discord/callback`;

  if (error || !code) {
    console.warn('Autorização do Discord cancelada ou com erro:', error);
    return NextResponse.redirect(`${baseUrl}/?auth_error=${encodeURIComponent('Autorização do Discord cancelada pelo usuário.')}`);
  }

  // Decodificar estado (id militar, hwid, tipo de dispositivo)
  let stateData = {};
  try {
    if (state) {
      const decoded = Buffer.from(state, 'base64').toString('utf8');
      stateData = JSON.parse(decoded);
    }
  } catch (e) {
    console.error('Falha ao decodificar state:', e);
  }

  const rawMilitarId = stateData.id || '';
  const militarId = String(rawMilitarId).replace(/^[#\s]+/, '').trim();
  const hwid = stateData.hwid || '';
  const deviceType = stateData.deviceType || 'desktop';
  const panel = stateData.panel || '';
  const isSystemPanel = panel === 'avisos' || panel === 'system' || panel === 'admin';
  const requiredRoleId = isSystemPanel ? DISCORD_ROLE_SYSTEM : DISCORD_ROLE_BOMBEIRO;
  const roleName = isSystemPanel ? 'SYSTEM (Administrador)' : 'Bombeiro';
  const targetUrl = isSystemPanel ? `${baseUrl}/painel-avisos` : baseUrl;

  try {
    // 1. Trocar o código de autorização pelo Access Token
    const tokenParams = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    });

    const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString()
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error('Falha ao trocar token no Discord:', tokenRes.status, errBody);
      return NextResponse.redirect(`${targetUrl}?auth_error=${encodeURIComponent('Falha ao validar autorização com o Discord.')}`);
    }

    const tokenData = await tokenRes.json();
    const userAccessToken = tokenData.access_token;

    // 2. Buscar perfil do militar autenticado
    const userRes = await fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${userAccessToken}` }
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${targetUrl}?auth_error=${encodeURIComponent('Não foi possível obter dados do seu Discord.')}`);
    }

    const discordUser = await userRes.json();

    // 3. Buscar informações do membro no servidor do CBM usando o BOT_TOKEN
    let memberData = null;
    if (DISCORD_BOT_TOKEN) {
      const memberRes = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${discordUser.id}`, {
        headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
      });
      if (memberRes.ok) {
        memberData = await memberRes.json();
      }
    }

    // Se o militar não estiver no servidor
    if (!memberData) {
      return NextResponse.redirect(`${targetUrl}?auth_error=${encodeURIComponent('Você precisa estar no servidor do Discord oficial dos Bombeiros.')}&action=join_discord`);
    }

    // Conferir se possui a setagem requerida (SYSTEM para o painel ou Bombeiro para o site)
    const hasRole = Array.isArray(memberData.roles) && memberData.roles.includes(requiredRoleId);
    if (!hasRole) {
      return NextResponse.redirect(`${targetUrl}?auth_error=${encodeURIComponent(`Você não possui a setagem oficial de ${roleName} no Discord.`)}`);
    }

    // 4. Salvar vínculo e HWID da máquina
    const existingRecord = await getMilitarRecord(militarId);
    const updates = {
      discordId: discordUser.id,
      discordTag: `${discordUser.username}#${discordUser.discriminator || '0'}`,
      globalName: discordUser.global_name || discordUser.username,
      nick: memberData.nick || discordUser.global_name || discordUser.username,
      isBotAuthorized: true,
      lastAuthDate: new Date().toISOString()
    };

    // Vincular HWID caso ainda não esteja preenchido
    if (hwid) {
      if (deviceType === 'mobile') {
        if (!existingRecord?.mobileHwid) {
          updates.mobileHwid = hwid;
          updates.mobileDeviceName = 'Dispositivo Móvel';
        }
      } else {
        if (!existingRecord?.desktopHwid) {
          updates.desktopHwid = hwid;
          updates.desktopDeviceName = 'Computador Desktop';
        }
      }
    }

    await saveMilitarRecord(militarId, updates);

    await addMilitarLog(militarId, {
      type: 'DISCORD_LINKED',
      title: 'Discord Autorizado e Vinculado',
      detail: `Conta Discord vinculada: @${discordUser.username} (${discordUser.id}). Setagem ${roleName} confirmada.`,
      hwid: hwid || null,
      deviceType: deviceType,
      success: true
    });

    // Notificação visual no Discord via Webhook (Novo Registro/Vínculo)
    try {
      const { ip, location } = await resolveIpAndLocation(request);
      const userAgent = request.headers.get('user-agent') || '';

      sendDiscordRegistrationNotification({
        militarId: militarId,
        discordUser: {
          id: discordUser.id,
          username: discordUser.username,
          avatar: discordUser.avatar,
          discriminator: discordUser.discriminator || '0',
          global_name: discordUser.global_name
        },
        panel: isSystemPanel ? 'avisos' : 'site',
        clientInfo: {
          hwid: hwid,
          deviceType: deviceType,
          isMobile: deviceType === 'mobile'
        },
        ip,
        location,
        userAgent
      }).catch(err => console.error('Erro assíncrono ao enviar webhook no callback:', err));
    } catch (whErr) {
      console.warn('Erro ao disparar webhook no callback:', whErr);
    }

    // 5. Autenticar e redirecionar para a tela inicial
    const response = NextResponse.redirect(`${targetUrl}?discord_auth=success&militar_id=${encodeURIComponent(militarId)}`);
    response.cookies.set('cbm_discord_auth', 'authorized', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      sameSite: 'lax'
    });

    return response;
  } catch (err) {
    console.error('Erro no callback do Discord:', err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=${encodeURIComponent('Erro interno na validação do Discord.')}`);
  }
}
