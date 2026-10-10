import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

// Helper para obter o caminho do arquivo JSON (usado apenas no localhost)
const getAvisosFilePath = () => {
  return path.join(process.cwd(), 'public', 'api', 'avisos.json');
};

export async function GET() {
  try {
    // 1. Tentar ler do Vercel KV (Nuvem) se estiver configurado
    if (process.env.KV_REST_API_URL) {
      const avisosNuvem = await kv.get('avisos');
      return NextResponse.json(avisosNuvem || []);
    }

    // 2. Fallback para arquivo local (para quando rodar npm run dev no computador)
    const filePath = getAvisosFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    const avisos = JSON.parse(fileData);
    return NextResponse.json(avisos);
  } catch (error) {
    console.error('Erro no GET de avisos:', error);
    return NextResponse.json({ error: 'Erro ao ler os avisos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newAvisos = await request.json();
    
    if (!Array.isArray(newAvisos)) {
      throw new Error("A lista de avisos é inválida.");
    }

    // 1. Tentar salvar no Vercel KV (Nuvem) se estiver configurado
    if (process.env.KV_REST_API_URL) {
      await kv.set('avisos', newAvisos);
      return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos na nuvem (Vercel KV)!" }, { status: 201 });
    }

    // 2. Fallback para arquivo local (para quando rodar npm run dev no computador)
    const filePath = getAvisosFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(newAvisos, null, 2));

    return NextResponse.json({ sucesso: true, mensagem: "Avisos salvos no arquivo local!" }, { status: 201 });
  } catch (error) {
    console.error('Erro no POST de avisos:', error);
    return NextResponse.json({ error: 'Erro ao salvar o aviso' }, { status: 500 });
  }
}
