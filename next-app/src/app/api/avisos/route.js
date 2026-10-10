import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Redis from 'ioredis';

// Helper para obter o caminho do arquivo JSON (usado apenas no localhost)
const getAvisosFilePath = () => {
  return path.join(process.cwd(), 'public', 'api', 'avisos.json');
};

let redisClient = null;
if (process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL) {
  // O Redis URL fornecido pelo Upstash/Vercel
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

    // 1. Tentar salvar na Nuvem se configurado
    if (redisClient) {
      await redisClient.set('avisos', JSON.stringify(newAvisos));
      return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos na nuvem (Redis)!" }, { status: 201 });
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
