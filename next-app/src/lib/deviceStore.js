import fs from 'fs';
import path from 'path';
import os from 'os';
import { DISCORD_BOT_TOKEN, DISCORD_DATABASE_CHANNEL_ID } from './discordConfig.js';

// Cache em memória compartilhado durante o ciclo de vida da instância
let memoryDb = null;
let lastFetchTime = 0;
const MEMORY_TTL_MS = 5000; // 5 segundos de cache para evitar sobrecarga de requisições

// Caminhos locais de contingência
const getLocalStorePath = () => {
  return path.join(process.cwd(), 'data', 'devices_store.json');
};

const getTmpStorePath = () => {
  return path.join(os.tmpdir(), 'cbm_devices_store.json');
};

function writeSafeLocal(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (e) {
    // EROFS silencioso na Vercel (esperado no /var/task)
  }
}

/**
 * Lê o banco de dados de dispositivos e militares.
 * Prioridade:
 * 1. Cache em memória (< 5s)
 * 2. Canal do Discord (cbm_devices_store.json fixado)
 * 3. Arquivo local /tmp ou data/devices_store.json
 */
export async function getDeviceDatabase() {
  const now = Date.now();
  if (memoryDb && (now - lastFetchTime < MEMORY_TTL_MS)) {
    return memoryDb;
  }

  // 1. Tentar ler do Cloud Store no Discord (canal dedicado do bot)
  if (DISCORD_BOT_TOKEN && DISCORD_DATABASE_CHANNEL_ID) {
    try {
      let fileAttachment = null;

      // 1a. Buscar mensagens recentes no canal (atualização em tempo real imediata)
      try {
        const msgsRes = await fetch(
          `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/messages?limit=15`,
          {
            headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
            cache: 'no-store'
          }
        );

        if (msgsRes.ok) {
          const msgs = await msgsRes.json();
          if (Array.isArray(msgs)) {
            const dbMsg = msgs.find(m => m.attachments?.some(a => a.filename === 'cbm_devices_store.json'));
            if (dbMsg) {
              fileAttachment = dbMsg.attachments.find(a => a.filename === 'cbm_devices_store.json');
            }
          }
        }
      } catch (e) {
        console.warn('Aviso: Falha ao buscar mensagens recentes no Discord:', e.message);
      }

      // 1b. Fallback para mensagens fixadas (pins)
      if (!fileAttachment) {
        const pinsRes = await fetch(
          `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/pins`,
          {
            headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
            cache: 'no-store'
          }
        );

        if (pinsRes.ok) {
          const pins = await pinsRes.json();
          const dbMsg = Array.isArray(pins) 
            ? pins.find(p => p.attachments?.some(a => a.filename === 'cbm_devices_store.json'))
            : null;

          if (dbMsg) {
            fileAttachment = dbMsg.attachments.find(a => a.filename === 'cbm_devices_store.json');
          }
        }
      }

      if (fileAttachment?.url) {
        const fileRes = await fetch(fileAttachment.url, { cache: 'no-store' });
        if (fileRes.ok) {
          const cloudDb = await fileRes.json();
          if (cloudDb && typeof cloudDb === 'object') {
            memoryDb = cloudDb;
            lastFetchTime = now;
            writeSafeLocal(getTmpStorePath(), JSON.stringify(cloudDb, null, 2));
            writeSafeLocal(getLocalStorePath(), JSON.stringify(cloudDb, null, 2));
            return memoryDb;
          }
        }
      }
    } catch (err) {
      console.warn('Aviso: Falha ao carregar devices_store do Discord Cloud:', err.message);
    }
  }

  // 2. Fallback para /tmp (gravável no ambiente Serverless da Vercel)
  const tmpPath = getTmpStorePath();
  if (fs.existsSync(tmpPath)) {
    try {
      const raw = fs.readFileSync(tmpPath, 'utf8');
      memoryDb = JSON.parse(raw || '{}');
      lastFetchTime = now;
      return memoryDb;
    } catch (e) {
      // Ignora erro de parse
    }
  }

  // 3. Fallback para data/devices_store.json do repositório
  const localPath = getLocalStorePath();
  if (fs.existsSync(localPath)) {
    try {
      const raw = fs.readFileSync(localPath, 'utf8');
      memoryDb = JSON.parse(raw || '{}');
      lastFetchTime = now;
      return memoryDb;
    } catch (e) {
      console.error('Erro ao ler devices_store.json local:', e);
    }
  }

  memoryDb = {};
  lastFetchTime = now;
  return memoryDb;
}

/**
 * Salva o banco de dados de dispositivos e militares.
 * Persiste na nuvem do Discord e em cópias locais (/tmp e local store).
 */
export async function saveDeviceDatabase(db) {
  memoryDb = db;
  lastFetchTime = Date.now();

  const jsonStr = JSON.stringify(db, null, 2);

  // 1. Salvar no /tmp e tentar no diretório do projeto
  writeSafeLocal(getTmpStorePath(), jsonStr);
  writeSafeLocal(getLocalStorePath(), jsonStr);

  // 2. Persistir no Discord Cloud Store
  if (DISCORD_BOT_TOKEN && DISCORD_DATABASE_CHANNEL_ID) {
    try {
      const formData = new FormData();
      const fileBlob = new Blob([jsonStr], { type: 'application/json' });
      formData.append('files[0]', fileBlob, 'cbm_devices_store.json');
      formData.append(
        'payload_json',
        JSON.stringify({
          content: `💾 **[CBM DATABASE]** Atualização de cadastro militar e HWIDs (${new Date().toLocaleString('pt-BR')})`
        })
      );

      const uploadRes = await fetch(
        `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/messages`,
        {
          method: 'POST',
          headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
          body: formData
        }
      );

      if (uploadRes.ok) {
        const newMsg = await uploadRes.json();

        // Tentar fixar a nova mensagem (sem bloquear se o canal atingir o limite de 50 pins)
        try {
          await fetch(
            `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/pins/${newMsg.id}`,
            {
              method: 'PUT',
              headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
            }
          );
        } catch (_) {}

        // Limpar mensagens antigas de banco fixadas para manter apenas a mais recente
        try {
          const pinsRes = await fetch(
            `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/pins`,
            { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` } }
          );

          if (pinsRes.ok) {
            const pins = await pinsRes.json();
            if (Array.isArray(pins)) {
              const oldPins = pins.filter(
                p => p.id !== newMsg.id && p.attachments?.some(a => a.filename === 'cbm_devices_store.json')
              );
              for (const oldPin of oldPins) {
                await fetch(
                  `https://discord.com/api/v10/channels/${DISCORD_DATABASE_CHANNEL_ID}/messages/${oldPin.id}`,
                  {
                    method: 'DELETE',
                    headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
                  }
                ).catch(() => {});
              }
            }
          }
        } catch (_) {}
      } else {
        const errText = await uploadRes.text();
        console.warn('Aviso: Falha ao fazer upload da base para o Discord:', uploadRes.status, errText);
      }
    } catch (err) {
      console.error('Erro ao sincronizar base de dispositivos com o Discord Cloud:', err);
    }
  }
}

/**
 * Obtém os dados de um militar específico
 */
export async function getMilitarRecord(militarId) {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();
  return db[cleanId] || null;
}

/**
 * Registra ou atualiza o militar e seus dispositivos vinculados
 */
export async function saveMilitarRecord(militarId, recordData) {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  const existing = db[cleanId] || {
    militarId: cleanId,
    createdAt: new Date().toISOString(),
    logs: []
  };

  db[cleanId] = {
    ...existing,
    ...recordData,
    militarId: cleanId,
    updatedAt: new Date().toISOString()
  };

  await saveDeviceDatabase(db);
  return db[cleanId];
}

/**
 * Reseta o HWID de um militar (separado por Site e Painel de Avisos)
 */
export async function resetMilitarHwid(militarId, targetType = 'all') {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  if (!db[cleanId]) return null;

  const t = String(targetType).toLowerCase();

  // Reset do Site Principal
  if (t === 'all' || t === 'site_all' || t === 'site_desktop' || t === 'desktop') {
    db[cleanId].desktopHwid = null;
    db[cleanId].desktopDeviceName = null;
    db[cleanId].siteDesktopHwid = null;
    db[cleanId].siteDesktopDeviceName = null;
  }
  if (t === 'all' || t === 'site_all' || t === 'site_mobile' || t === 'mobile') {
    db[cleanId].mobileHwid = null;
    db[cleanId].mobileDeviceName = null;
    db[cleanId].siteMobileHwid = null;
    db[cleanId].siteMobileDeviceName = null;
  }

  // Reset do Painel de Avisos (Admin / SYSTEM)
  if (t === 'all' || t === 'admin_all' || t === 'admin_desktop') {
    db[cleanId].adminDesktopHwid = null;
    db[cleanId].adminDesktopDeviceName = null;
  }
  if (t === 'all' || t === 'admin_all' || t === 'admin_mobile') {
    db[cleanId].adminMobileHwid = null;
    db[cleanId].adminMobileDeviceName = null;
  }

  db[cleanId].sessionToken = null;
  db[cleanId].updatedAt = new Date().toISOString();

  // Registrar no histórico de logs
  if (!Array.isArray(db[cleanId].logs)) {
    db[cleanId].logs = [];
  }
  db[cleanId].logs.unshift({
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'HWID_RESET',
    title: 'Reset de HWID Executado',
    detail: `Vínculo de dispositivo (${targetType.toUpperCase()}) liberado pelo comando via Painel Administrativo.`,
    timestamp: new Date().toISOString(),
    success: true
  });
  if (db[cleanId].logs.length > 50) {
    db[cleanId].logs = db[cleanId].logs.slice(0, 50);
  }

  await saveDeviceDatabase(db);
  return db[cleanId];
}


/**
 * Adiciona um evento de log de auditoria ao militar
 */
export async function addMilitarLog(militarId, logData) {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  if (!cleanId) return null;

  if (!db[cleanId]) {
    db[cleanId] = {
      militarId: cleanId,
      createdAt: new Date().toISOString(),
      logs: []
    };
  }

  if (!Array.isArray(db[cleanId].logs)) {
    db[cleanId].logs = [];
  }

  const newLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...logData
  };

  db[cleanId].logs.unshift(newLog);
  if (db[cleanId].logs.length > 50) {
    db[cleanId].logs = db[cleanId].logs.slice(0, 50);
  }

  await saveDeviceDatabase(db);
  return newLog;
}

/**
 * Exclui totalmente o cadastro militar do sistema
 */
export async function deleteMilitarRecord(militarId) {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  if (!db[cleanId]) return false;

  delete db[cleanId];
  await saveDeviceDatabase(db);
  return true;
}
