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
    const newAvisos = await request.json();
    const filePath = getAvisosFilePath();
    
    // Garantir que o diretório exista
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!Array.isArray(newAvisos)) {
      throw new Error("A lista de avisos é inválida.");
    }

    fs.writeFileSync(filePath, JSON.stringify(newAvisos, null, 2));

    return NextResponse.json({ sucesso: true, mensagem: "Arquivo avisos.json atualizado!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar o aviso' }, { status: 500 });
  }
}
