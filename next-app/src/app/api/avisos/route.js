import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import Redis from 'ioredis';

// Helper para obter o caminho do arquivo JSON (usado no localhost)
const getAvisosFilePath = () => {
  return path.join(process.cwd(), 'public', 'api', 'avisos.json');
};

const getTmpAvisosPath = () => {
  return path.join(os.tmpdir(), 'cbm_avisos.json');
};

let redisClient = null;
if (process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL) {
  const url = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
  redisClient = new Redis(url);
}

export async function GET() {
  try {
    // 1. Tentar ler da Nuvem se configurado
    if (redisClient) {
      const avisosNuvem = await redisClient.get('avisos');
      if (avisosNuvem) {
         return NextResponse.json(JSON.parse(avisosNuvem));
      }
      return NextResponse.json([]);
    }

    // 2. Tentar ler de /tmp (se atualizado em serverless)
    const tmpPath = getTmpAvisosPath();
    if (fs.existsSync(tmpPath)) {
      try {
        const fileData = fs.readFileSync(tmpPath, 'utf8');
        return NextResponse.json(JSON.parse(fileData));
      } catch (e) {}
    }

    // 3. Fallback para arquivo local
    const filePath = getAvisosFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json(JSON.parse(fileData));
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Erro no GET de avisos:', error);
    return NextResponse.json({ error: error.message || 'Erro ao ler os avisos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newAvisos = await request.json();
    
    if (!Array.isArray(newAvisos)) {
      throw new Error("A lista de avisos é inválida.");
    }

    const jsonStr = JSON.stringify(newAvisos, null, 2);

    // 1. Tentar salvar na Nuvem se configurado
    if (redisClient) {
      await redisClient.set('avisos', jsonStr);
    }

    // 2. Salvar em /tmp (gravável em serverless)
    try {
      fs.writeFileSync(getTmpAvisosPath(), jsonStr, 'utf8');
    } catch (_) {}

    // 3. Salvar no diretório do projeto (localhost)
    try {
      const filePath = getAvisosFilePath();
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, jsonStr, 'utf8');
    } catch (_) {}

    return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error('Erro no POST de avisos:', error);
    return NextResponse.json({ error: error.message || 'Erro ao salvar o aviso' }, { status: 500 });
  }
}
