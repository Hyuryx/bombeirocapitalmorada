import fs from 'fs';
import path from 'path';
import Redis from 'ioredis';

// Conexão Redis (caso configurada em produção na Vercel/Upstash)
let redisClient = null;
if (process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL) {
  try {
    const url = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
    redisClient = new Redis(url);
  } catch (e) {
    console.warn('Falha ao conectar ao Redis para deviceStore:', e.message);
  }
}

// Arquivo JSON de fallback local
const getLocalStorePath = () => {
  return path.join(process.cwd(), 'data', 'devices_store.json');
};

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Lê o banco de dados de militares e vínculos
 * Estrutura:
 * {
 *   "01": {
 *     militarId: "01",
 *     discordId: "123456789",
 *     discordTag: "usuario",
 *     isBotAuthorized: true,
 *     desktopHwid: "hash_pc",
 *     mobileHwid: "hash_celular",
 *     lastLogin: "2026-10-13T...",
 *     sessionToken: "uuid...",
 *     deviceCount: 1
 *   }
 * }
 */
export async function getDeviceDatabase() {
  if (redisClient) {
    try {
      const data = await redisClient.get('cbm_devices_store');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Erro ao ler devices do Redis:', e);
    }
  }

  const filePath = getLocalStorePath();
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content || '{}');
  } catch (e) {
    console.error('Erro ao ler devices_store.json:', e);
    return {};
  }
}

export async function saveDeviceDatabase(db) {
  if (redisClient) {
    try {
      await redisClient.set('cbm_devices_store', JSON.stringify(db));
      return;
    } catch (e) {
      console.error('Erro ao salvar devices no Redis:', e);
    }
  }

  const filePath = getLocalStorePath();
  try {
    ensureDirExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error('Erro ao salvar arquivo local devices_store.json:', e);
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
    createdAt: new Date().toISOString()
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
 * Reseta o HWID de um militar (útil para o painel futuro ou comando)
 */
export async function resetMilitarHwid(militarId, targetType = 'all') {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  if (!db[cleanId]) return null;

  if (targetType === 'all' || targetType === 'desktop') {
    db[cleanId].desktopHwid = null;
    db[cleanId].desktopDeviceName = null;
  }
  if (targetType === 'all' || targetType === 'mobile') {
    db[cleanId].mobileHwid = null;
    db[cleanId].mobileDeviceName = null;
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
 * (Desvincula Discord antigo, apaga ambos os HWIDs e limpa dados)
 */
export async function deleteMilitarRecord(militarId) {
  const db = await getDeviceDatabase();
  const cleanId = String(militarId).replace(/^[#\s]+/, '').trim();

  if (!db[cleanId]) return false;

  delete db[cleanId];
  await saveDeviceDatabase(db);
  return true;
}
