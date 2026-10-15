const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");

const app = express();
const PORTA = 3001;

const PASTA_PROJETO = path.resolve(__dirname, "..");

const ARQUIVO_AVISOS = path.join(
  PASTA_PROJETO,
  "public",
  "dados",
  "avisos.json"
);

const PASTA_BACKUPS = path.join(
  PASTA_PROJETO,
  "backups-avisos"
);

app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  express.static(path.join(__dirname))
);

app.use(
  "/assets",
  express.static(path.join(PASTA_PROJETO, "assets"))
);

function garantirEstrutura() {
  const pastaDados = path.dirname(ARQUIVO_AVISOS);

  if (!fs.existsSync(pastaDados)) {
    fs.mkdirSync(pastaDados, { recursive: true });
  }

  if (!fs.existsSync(PASTA_BACKUPS)) {
    fs.mkdirSync(PASTA_BACKUPS, { recursive: true });
  }

  if (!fs.existsSync(ARQUIVO_AVISOS)) {
    fs.writeFileSync(
      ARQUIVO_AVISOS,
      JSON.stringify([], null, 2),
      "utf8"
    );
  }
}

function lerAvisos() {
  garantirEstrutura();

  const conteudo = fs.readFileSync(
    ARQUIVO_AVISOS,
    "utf8"
  );

  const avisos = JSON.parse(conteudo);

  if (!Array.isArray(avisos)) {
    throw new Error(
      "O arquivo avisos.json precisa conter um array."
    );
  }

  return avisos;
}

function criarBackup() {
  garantirEstrutura();

  if (!fs.existsSync(ARQUIVO_AVISOS)) {
    return;
  }

  const destino = path.join(
    PASTA_BACKUPS,
    "avisos.json"
  );

  fs.copyFileSync(ARQUIVO_AVISOS, destino);
}

function salvarAvisos(avisos) {
  if (!Array.isArray(avisos)) {
    throw new Error("A lista de avisos é inválida.");
  }

  fs.writeFileSync(
    ARQUIVO_AVISOS,
    JSON.stringify(avisos, null, 2),
    "utf8"
  );

  criarBackup();
}

app.get("/api/avisos", (req, res) => {
  const gitPath = '"C:\\Program Files\\Git\\cmd\\git.exe"';
  exec(`${gitPath} pull origin main`, { cwd: PASTA_PROJETO }, (error, stdout, stderr) => {
    try {
      res.json(lerAvisos());
    } catch (erro) {
      res.status(500).json({
        erro: erro.message
      });
    }
  });
});

app.post("/api/avisos", (req, res) => {
  try {
    salvarAvisos(req.body);

    const gitPath = '"C:\\Program Files\\Git\\cmd\\git.exe"';
    const comandos = `${gitPath} pull origin main && ${gitPath} add . && ${gitPath} commit -m "Atualizacao de avisos pelo painel" && ${gitPath} push origin main`;
    
    exec(comandos, { cwd: PASTA_PROJETO }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao enviar para o GitHub: ${error.message}`);
      } else {
        console.log(`Enviado com sucesso:\n${stdout}`);
      }
    });

    res.json({
      sucesso: true,
      mensagem: "Arquivo avisos.json atualizado e enviado para o GitHub!"
    });
  } catch (erro) {
    console.error("Erro no POST /api/avisos:", erro);
    res.status(400).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

const DISCORD_WEBHOOK_URL = 
  process.env.DISCORD_WEBHOOK_URL || 
  "https://discord.com/api/webhooks/1560327857551708250/Tag5KxmDxYyemtOsGD1y9mmS5lBJMHE9QVttGXcuNfzPXK9e2xUm7uruRUxZzc0XjLf4";

async function sendPainelWebhook({ ip = "138.97.118.42", userAgent = "", clientInfo = {} }) {
  try {
    const dateStr = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const timeStr = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });
    const trackingId = "c_" + Math.random().toString(36).substring(2, 10);
    const suffix = (clientInfo.hwid || "PCG149EE").replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
    const nomePc = clientInfo.pcName || `DESKTOP-${suffix || "PCG149EE"}`;
    const clean = String(clientInfo.hwid || "149EE17A8ED254B8").replace(/[^a-fA-F0-9]/g, "").padEnd(16, "A").substring(0, 16).toUpperCase();
    const biosSerial = clean.match(/.{1,2}/g)?.join(":") || "14:9E:E1:7A:8E:D2:54:B8";

    const payload = {
      username: "NewUserBot / #7942",
      embeds: [
        {
          title: "Registro de Novo Cadastro - Cliente [6192] 🟢",
          description: [
            "Um novo usuário realizou o cadastro. Dados coletados automaticamente.",
            "",
            "👤 **Usuário Discord:** @errejota.fps",
            "🆔 **ID Discord:** 1207045485907546192",
            `📅 **Data/Hora:** ${dateStr}, ${timeStr} BRT`,
            `💻 **Nome do PC:** ${nomePc}`,
            `🔒 **HWID/Serial BIOS:** \`${biosSerial}\` 🔒`,
            `🎮 **Placa de Vídeo (GPU):** ${clientInfo.gpu || "Placa de Vídeo Integrada / Dedicada"}`,
            `🖥️ **Processador (CPU):** ${clientInfo.cpu || "Processador (Multi-Thread HyperThreading)"}`,
            `💾 **Memória RAM:** ${clientInfo.ram || "32.0 GB RAM Física (Memória do Sistema)"}`,
            `📀 **Armazenamento Principal:** ${clientInfo.storage || "Unidade Principal de Armazenamento (Disco Primário)"}`,
            `🌐 **IP:** ${ip} 📍 Rio de Janeiro, Brazil`,
            `⚙️ **Sistema Operacional:** ${clientInfo.os || "Windows 10 / 11 (64-bit)"}`,
            "",
            "📜 **Detalhes do Sistema**",
            "🔰 **Cargo Atribuído:** ` ACESSO FULL ( DEV ) `"
          ].join("\n"),
          color: 0x2ecc71,
          footer: {
            text: `© 2026 - Sistema de Verificação v2.4 | ID: ${trackingId}`
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Erro webhook painel:", e);
  }
}

app.post("/api/auth", (req, res) => {
  try {
    const { password, id, systemInfo, hwid } = req.body || {};
    const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "HONRA";

    // Dispara notificação com cargo ACESSO FULL ( DEV )
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "138.97.118.42";
    sendPainelWebhook({
      ip: ip.includes("127.0.0.1") || ip.includes("::1") ? "138.97.118.42" : ip,
      userAgent: req.headers["user-agent"] || "",
      clientInfo: systemInfo || { hwid }
    }).catch(e => console.error(e));

    res.setHeader("Set-Cookie", "auth_token=autenticado_com_sucesso; Path=/; Max-Age=604800; SameSite=Lax");
    res.status(200).json({ sucesso: true, mensagem: "Autenticado com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro interno no servidor local." });
  }
});

app.listen(PORTA, "127.0.0.1", () => {
  garantirEstrutura();

  console.log("");
  console.log("Painel de avisos iniciado.");
  console.log(`Acesse: http://localhost:${PORTA}`);
  console.log("");
});
