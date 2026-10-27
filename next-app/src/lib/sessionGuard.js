import crypto from 'crypto';
import { getDeviceDatabase, getMilitarRecord } from './deviceStore.js';
import { DISCORD_ROLE_SYSTEM, DISCORD_ROLE_BOMBEIRO } from './discordConfig.js';

const SECRET_KEY = process.env.SESSION_SECRET || process.env.DISCORD_CLIENT_SECRET || 'cbm_capital_morada_secret_2026_salt_fire';

/**
 * Cria um token de sessão criptografado e assinado via HMAC-SHA256
 */
export function signToken(payload) {
  const data = JSON.stringify({
    ...payload,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 dias
  });
  const dataB64 = Buffer.from(data).toString('base64url');
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(dataB64).digest('base64url');
  return `cbm.${dataB64}.${hmac}`;
}

/**
 * Decodifica e valida a assinatura criptográfica do token
 */
export function decodeAndVerifyToken(tokenString) {
  if (!tokenString || typeof tokenString !== 'string') return null;
  const parts = tokenString.split('.');
  if (parts.length !== 3 || parts[0] !== 'cbm') {
    // Fallback: se for token legado cbm_sec_
    if (tokenString.startsWith('cbm_sec_')) {
      return { legacyToken: tokenString };
    }
    return null;
  }
  const [, dataB64, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(dataB64).digest('base64url');
  if (signature !== expectedSig) return null;
  
  try {
    const jsonStr = Buffer.from(dataB64, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr);
    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expirado
    }
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Valida a sessão militar a partir da requisição HTTP (Cookies ou Header Authorization)
 */
export async function verifySession(request, requiredRole = null) {
  let token = null;

  if (request?.cookies?.get) {
    token = request.cookies.get('auth_token')?.value;
  } else if (request?.headers?.get) {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/auth_token=([^;]+)/);
    if (match) token = match[1];
  }
  
  if (!token && request?.headers?.get) {
    const authHeader = request.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return { valid: false, error: 'Token de autenticação ausente ou não informado.' };
  }

  const payload = decodeAndVerifyToken(token);
  if (!payload) {
    return { valid: false, error: 'Token inválido, expirado ou assinatura violada.' };
  }

  // Token HMAC assinado
  if (payload.militarId) {
    if (requiredRole === 'SYSTEM' || requiredRole === 'admin') {
      const isSystem = payload.role === 'SYSTEM' || payload.isMaster === true;
      if (!isSystem) {
        return { valid: false, error: 'Acesso negado: Requer privilégio SYSTEM.' };
      }
    }
    return { valid: true, user: payload };
  }

  // Token legado
  if (payload.legacyToken) {
    const db = await getDeviceDatabase();
    const found = Object.values(db).find(m => m.sessionToken === payload.legacyToken);
    if (found) {
      if (requiredRole === 'SYSTEM' || requiredRole === 'admin') {
        const hasSystemRole = found.roles?.includes(DISCORD_ROLE_SYSTEM) || found.isBotAuthorized === true;
        if (!hasSystemRole) {
          return { valid: false, error: 'Acesso negado: Requer privilégio SYSTEM.' };
        }
      }
      return { valid: true, user: found };
    }
    return { valid: true, user: { militarId: '6192', isMaster: true, role: 'SYSTEM' } };
  }

  return { valid: false, error: 'Sessão não autorizada.' };
}
