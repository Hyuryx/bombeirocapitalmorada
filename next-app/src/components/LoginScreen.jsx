"use client";
import { useState } from "react";
import ElectricBorder from "./animations/ElectricBorder";
import MagneticElement from "./animations/MagneticElement";

export default function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica se está rodando localmente
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.');
    
    // Se for local, entra direto sem validar senha. Se for produção, exige a senha.
    if (isLocal || password === "admin123" || password === "cbm2026") {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f1115] z-[9999] flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-[url('/assets/fotos/bg-inicial.jpg')] bg-cover bg-center opacity-30 blur-sm"></div>
      
      <ElectricBorder className="relative z-10 max-w-md w-full mx-4" borderRadius={16} color="#ff4444" speed={1} chaos={0.12}>
        <div className="bg-black/60 backdrop-blur-md p-10 rounded-2xl text-center shadow-2xl w-full">
          <img src="/assets/fotos/logo-capital.png" alt="Logo Capital" className="h-32 object-contain mx-auto mb-6 drop-shadow-xl" />
          
          <h2 className="text-2xl font-bold text-white mb-6 tracking-widest">PORTAL CBM</h2>
          
          <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
            <input 
              type="password" 
              placeholder="Digite a senha de acesso..." 
              className="w-full bg-black/50 border border-white/20 text-white px-5 py-4 rounded-xl outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MagneticElement className="absolute right-2" strength={0.3}>
              <button type="submit" className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </MagneticElement>
          </form>
          
          {error && <p className="text-red-400 text-sm mt-2">Senha incorreta. Tente novamente.</p>}
        </div>
      </ElectricBorder>
    </div>
  );
}
