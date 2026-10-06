import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper para obter o caminho do arquivo JSON
const getAvisosFilePath = () => {
  return path.join(process.cwd(), 'public', 'api', 'avisos.json');
};

export async function GET() {
  try {
    const filePath = getAvisosFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    const avisos = JSON.parse(fileData);
    return NextResponse.json(avisos);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler os avisos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newAviso = await request.json();
    const filePath = getAvisosFilePath();
    
    // Garantir que o diretório exista
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let avisos = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      avisos = JSON.parse(fileData);
    }

    // Adiciona o novo aviso no início (mais recente)
    newAviso.id = Date.now().toString();
    newAviso.data = new Date().toISOString();
    avisos.unshift(newAviso);

    fs.writeFileSync(filePath, JSON.stringify(avisos, null, 2));

    return NextResponse.json({ success: true, aviso: newAviso }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar o aviso' }, { status: 500 });
  }
}
