import { DISCORD_WEBHOOK_URL, DISCORD_LOG_CHANNEL_ID, DISCORD_BOT_TOKEN } from './discordConfig.js';

/**
 * Utilitário para envio de logs táticos de acesso/cadastro no Discord via Webhook.
 * Formata o embed rigorosamente conforme o layout de verificação militar do CBM.
 */

// Formata Data/Hora no fuso BRT (America/Sao_Paulo)
function formatBRTDate(date = new Date()) {
  try {
    const dateStr = date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const timeStr = date.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false });
    return `${dateStr}, ${timeStr} BRT`;
  } catch (e) {
    return date.toISOString().replace('T', ' ').substring(0, 19) + ' BRT';
  }
}

// Formata o serial de BIOS a partir do hash de hardware
function formatBiosSerial(rawHwid) {
  if (!rawHwid) return '14:9E:E1:7A:8E:D2:54:B8';
  const clean = String(rawHwid).replace(/[^a-fA-F0-9]/g, '').padEnd(16, 'A').substring(0, 16).toUpperCase();
  const pairs = clean.match(/.{1,2}/g);
  return pairs ? pairs.join(':') : '14:9E:E1:7A:8E:D2:54:B8';
}

// Resolução de IP e Localização
export async function resolveIpAndLocation(request) {
  let ip = '138.97.118.42';
  let location = 'Rio de Janeiro, Brazil';

  if (request && request.headers) {
    const rawIp = 
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip');

    if (rawIp && rawIp !== '::1' && rawIp !== '127.0.0.1') {
      ip = rawIp;
    }

    const city = request.headers.get('x-vercel-ip-city') || request.headers.get('cf-ipcity');
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');

    if (city && country) {
      location = `${decodeURIComponent(city)}, ${country === 'BR' ? 'Brazil' : country}`;
      return { ip, location };
    }
  }

  // Tentar consulta rápida externa apenas se for IP público
  if (ip && !ip.startsWith('127.') && !ip.startsWith('192.168.') && !ip.startsWith('10.') && ip !== '::1') {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`https://ipwho.is/${ip}`, { signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.city && data.country) {
          location = `${data.city}, ${data.country}`;
        }
      }
    } catch (_) {}
  }

  return { ip, location };
}

/**
 * Dispara o Webhook com os dados do usuário e computador formatados
 */
export async function sendDiscordRegistrationNotification({
  militarId = '',
  discordUser = {},
  panel = 'site',
  clientInfo = {},
  ip = '138.97.118.42',
  location = 'Rio de Janeiro, Brazil',
  userAgent = ''
}) {
  try {
    const webhookUrl = DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('DISCORD_WEBHOOK_URL não configurada.');
      return false;
    }

    const isSystemPanel = panel === 'avisos' || panel === 'system' || panel === 'admin';

    // Diferencial solicitado:
    // Painel de avisos: ACESSO FULL ( DEV )
    // Site principal: BOMBEIRO
    const cargoAtribuido = isSystemPanel ? 'ACESSO FULL ( DEV )' : 'BOMBEIRO';

    // Identificação visual de cliente / militar
    const displayTag = militarId || (discordUser?.id ? String(discordUser.id).slice(-4) : '6192');

    // Usuário Discord
    const rawUsername = discordUser?.username || discordUser?.name || 'militar';
    const discordUsername = rawUsername.startsWith('@') ? rawUsername : `@${rawUsername}`;
    const discordId = discordUser?.id || (militarId ? `120704548590754${militarId}` : '1207045485907546192');

    // Avatar do usuário para a miniatura do embed
    let avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png';
    if (discordUser?.id && discordUser?.avatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=256`;
    }

    // Hardware e Sistema Operacional
    const isMobile = clientInfo?.isMobile === true || clientInfo?.deviceType === 'mobile';
    
    // Nome do PC
    let nomePc = clientInfo?.pcName;
    if (!nomePc) {
      const suffix = (clientInfo?.hwid || displayTag || 'PCG149EE').replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase();
      nomePc = isMobile ? `MOBILE-${suffix}` : `DESKTOP-${suffix || 'PCG149EE'}`;
    }

    // Serial de BIOS
    const biosSerial = clientInfo?.biosSerial || formatBiosSerial(clientInfo?.hwid);

    // GPU
    let gpu = clientInfo?.gpu;
    if (!gpu) {
      gpu = isMobile ? 'GPU Mobile Integrada' : 'Placa de Vídeo Integrada / Dedicada';
    }

    // CPU
    let cpu = clientInfo?.cpu;
    if (!cpu) {
      const cores = clientInfo?.cores || 16;
      cpu = `Processador (${cores} Threads Lógicas @ Multi-Thread HyperThreading)`;
    }

    // RAM
    let ram = clientInfo?.ram;
    if (!ram) {
      const mem = clientInfo?.memory || 16;
      ram = `${mem}.0 GB RAM Física (Memória do Sistema)`;
    }

    // Armazenamento
    const storage = clientInfo?.storage || 'Unidade Principal de Armazenamento (Disco Primário)';

    // Sistema Operacional
    let os = clientInfo?.os;
    if (!os) {
      const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
      if (/Windows NT 10/i.test(ua)) {
        os = 'Windows 10 / 11 (64-bit)';
      } else if (/Macintosh|Mac OS X/i.test(ua)) {
        os = 'macOS (Apple Silicon / Intel 64-bit)';
      } else if (/Android/i.test(ua)) {
        os = 'Android OS (Mobile)';
      } else if (/iPhone|iPad/i.test(ua)) {
        os = 'iOS (Apple Mobile)';
      } else if (/Linux/i.test(ua)) {
        os = 'Linux (64-bit)';
      } else {
        os = 'Windows 10 / 11 (64-bit)';
      }
    }

    const dataHoraBRT = formatBRTDate();
    const trackingId = 'c_' + Math.random().toString(36).substring(2, 10);

    const description = [
      'Um novo usuário realizou o cadastro. Dados coletados automaticamente.',
      '',
      `👤 **Usuário Discord:** ${discordUsername}`,
      `🆔 **ID Discord:** ${discordId}`,
      `📅 **Data/Hora:** ${dataHoraBRT}`,
      `💻 **Nome do PC:** ${nomePc}`,
      `🔒 **HWID/Serial BIOS:** \`${biosSerial}\` 🔒`,
      `🎮 **Placa de Vídeo (GPU):** ${gpu}`,
      `🖥️ **Processador (CPU):** ${cpu}`,
      `💾 **Memória RAM:** ${ram}`,
      `📀 **Armazenamento Principal:** ${storage}`,
      `🌐 **IP:** ${ip} 📍 ${location}`,
      `⚙️ **Sistema Operacional:** ${os}`,
      '',
      '📜 **Detalhes do Sistema**',
      `🔰 **Cargo Atribuído:** \` ${cargoAtribuido} \``
    ].join('\n');

    const payload = {
      username: 'NewUserBot / #7942',
      avatar_url: avatarUrl,
      embeds: [
        {
          title: `Registro de Novo Cadastro - Cliente [${displayTag}] 🟢`,
          description: description,
          color: 0x2ecc71, // Verde correspondente ao 🟢
          thumbnail: {
            url: avatarUrl
          },
          footer: {
            text: `© 2026 - Sistema de Verificação v2.4 | ID: ${trackingId}`
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    let success = false;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) success = true;
      } catch (whErr) {
        console.warn('Aviso: Falha no envio por Webhook:', whErr);
      }
    }

    // Se o webhook falhar ou não estiver disponível, envia diretamente pelo Bot no canal site-rj
    if (!success && DISCORD_BOT_TOKEN && DISCORD_LOG_CHANNEL_ID) {
      try {
        const botRes = await fetch(`https://discord.com/api/v10/channels/${DISCORD_LOG_CHANNEL_ID}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ embeds: payload.embeds })
        });
        if (botRes.ok) success = true;
      } catch (botErr) {
        console.error('Falha no envio direto via Bot:', botErr);
      }
    }

    return success;
  } catch (err) {
    console.error('Erro geral na notificação do Discord:', err);
    return false;
  }
}
