"use client";

import { useState, useEffect } from "react";

export default function PainelAvisos() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123" || password === "cbm2026") {
      setIsUnlocked(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setStatus("Publicando...");

    try {
      const res = await fetch("/api/avisos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, conteudo, autor }),
      });

      if (res.ok) {
        setStatus("Aviso publicado com sucesso!");
        setTitulo("");
        setConteudo("");
        setAutor("");
      } else {
        setStatus("Erro ao publicar aviso.");
      }
    } catch (err) {
      setStatus("Erro de conexão.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0f1115] text-white">
        <form onSubmit={handleLogin} className="bg-black/50 p-8 rounded-xl border border-white/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Painel de Avisos CBM</h2>
          <input 
            type="password" 
            placeholder="Senha do Painel" 
            className="w-full bg-black/50 border border-white/20 text-white px-4 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-500 py-2 rounded font-bold">Acessar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0f1115] text-white p-10 overflow-y-auto">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Painel de Controle - Avisos Gerais</h1>
      
      <form onSubmit={handlePost} className="bg-black/40 border border-white/10 p-6 rounded-xl flex flex-col gap-4 max-w-2xl">
        <input 
          type="text" 
          placeholder="Título do Aviso" 
          required
          className="bg-black/50 border border-white/20 text-white px-4 py-3 rounded outline-none focus:border-red-500"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Autor (Ex: Comando Geral)" 
          className="bg-black/50 border border-white/20 text-white px-4 py-3 rounded outline-none focus:border-red-500"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <textarea 
          placeholder="Conteúdo do Aviso..." 
          required
          rows={6}
          className="bg-black/50 border border-white/20 text-white px-4 py-3 rounded outline-none focus:border-red-500"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
        ></textarea>
        
        <button type="submit" className="bg-red-600 hover:bg-red-500 py-3 rounded font-bold text-lg mt-2 transition-colors">
          Publicar Aviso
        </button>
        {status && <p className="text-center mt-2 text-green-400 font-bold">{status}</p>}
      </form>
      
      <div className="mt-10">
        <a href="/" className="text-gray-400 hover:text-white underline">Voltar para o Portal</a>
      </div>
    </div>
  );
}
