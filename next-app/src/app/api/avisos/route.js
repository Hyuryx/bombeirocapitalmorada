import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

// Helper para obter o caminho do arquivo JSON (usado apenas no localhost)
const getAvisosFilePath = () => {
  return path.join(process.cwd(), 'public', 'api', 'avisos.json');
};

export async function GET() {
  try {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    // 1. Tentar ler da Nuvem (Upstash Redis) se configurado
    if (redisUrl && redisToken) {
      const redis = new Redis({ url: redisUrl, token: redisToken });
      const avisosNuvem = await redis.get('avisos');
      return NextResponse.json(avisosNuvem || []);
    }

    // 2. Fallback para arquivo local
    const filePath = getAvisosFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    const avisos = JSON.parse(fileData);
    return NextResponse.json(avisos);
  } catch (error) {
    console.error('Erro no GET de avisos:', error);
    return NextResponse.json({ error: error.message || 'Erro ao ler os avisos', stack: error.stack }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newAvisos = await request.json();
    
    if (!Array.isArray(newAvisos)) {
      throw new Error("A lista de avisos é inválida.");
    }

    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    // 1. Tentar salvar na Nuvem (Upstash Redis) se configurado
    if (redisUrl && redisToken) {
      const redis = new Redis({ url: redisUrl, token: redisToken });
      await redis.set('avisos', newAvisos);
      return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos na nuvem (Upstash Redis)!" }, { status: 201 });
    }

    // Se nao achou as variaveis, vamos retornar o erro explicitamente pra debugar
    if (!redisUrl) {
      return NextResponse.json({ erro: "Nenhuma URL de Redis encontrada no process.env", env: Object.keys(process.env) }, { status: 500 });
    }

    // 2. Fallback para arquivo local
    const filePath = getAvisosFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(newAvisos, null, 2));

    return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos no arquivo local!" }, { status: 201 });
  } catch (error) {
    console.error('Erro no POST de avisos:', error);
    return NextResponse.json({ error: error.message || 'Erro ao salvar o aviso', stack: error.stack }, { status: 500 });
  }
}
