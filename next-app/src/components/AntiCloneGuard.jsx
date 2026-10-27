'use client';

import { useEffect } from 'react';

/**
 * AntiCloneGuard - Blindagem Ativa contra Clonagem, Engenharia Reversa e Espelhamento
 * Defesas:
 * 1. Domain Lock (Trava de Domínio Autorizado)
 * 2. Frame-Busting (Impedir iframes e proxies reversos como Rea)
 * 3. Bloqueio de Teclas de Inspeção (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S)
 * 4. Bloqueio de Menu de Contexto (Botão Direito)
 * 5. Debugger Trap Assíncrono (Congela o Inspecionar Elemento se aberto)
 */
export default function AntiCloneGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Frame Busting (Impede que o Rea ou outros serviços incorporem o site em iframes)
    try {
      if (window.top !== window.self) {
        window.top.location = window.self.location;
      }
    } catch (_) {
      try {
        document.body.innerHTML = '';
      } catch (e) {}
    }

    // 2. Trava de Domínio Autorizado (Domain Lock)
    const host = window.location.hostname.toLowerCase();
    const isLocal = host === 'localhost' || 
                    host === '127.0.0.1' || 
                    host.endsWith('.local') || 
                    host.startsWith('192.168.') || 
                    host.startsWith('10.');
    const isAuthorized = host.includes('bombeirocapitalmorada') || 
                         host.includes('modula-aocapitalmorada') ||
                         host.endsWith('.vercel.app');

    if (!isLocal && !isAuthorized) {
      document.documentElement.innerHTML = `
        <div style="background:#05070a;color:#ff3344;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Segoe UI',sans-serif;text-align:center;padding:25px;">
          <div style="max-width:500px;border:1px solid #ff3344;padding:30px;border-radius:12px;background:rgba(255,51,68,0.06);box-shadow:0 0 30px rgba(255,51,68,0.2);">
            <h1 style="font-size:2.2rem;margin:0 0 15px;letter-spacing:1px;">⚠️ ACESSO BLOQUEADO</h1>
            <p style="font-size:1.1rem;color:#ffffff;line-height:1.5;margin-bottom:15px;">Tentativa de clonagem, espelhamento ou domínio não autorizado detectada.</p>
            <p style="font-size:0.85rem;color:#8899a6;margin:0;">Sistema de Defesa Ativa do Corpo de Bombeiros Capital Morada.</p>
          </div>
        </div>
      `;
      throw new Error("Execução encerrada: Domínio não autorizado.");
    }

    // 3. Bloqueio de Menu de Contexto (Botão Direito)
    const handleContextMenu = (e) => {
      // Permite apenas em inputs de texto
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
      return false;
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // 4. Bloqueio de Teclas de Atalho de Inspeção e Download
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / J / C (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U (Ver Código-Fonte)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S (Salvar Página)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);

    // 5. Debugger Trap Ativo (Congela a aba se DevTools for aberto)
    let trapInterval = null;
    if (process.env.NODE_ENV === 'production' || !isLocal) {
      trapInterval = setInterval(() => {
        const startTime = performance.now();
        (function() {
          Function("debugger")();
        })();
        const duration = performance.now() - startTime;
        if (duration > 100) {
          // DevTools aberto detectado pelo atraso de execução
          document.body.innerHTML = `
            <div style="background:#05070a;color:#ff3344;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;">
              <h2>Sessão Militar Bloqueada: Ferramentas de Inspeção Detectadas.</h2>
            </div>
          `;
        }
      }, 1000);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown, true);
      if (trapInterval) clearInterval(trapInterval);
    };
  }, []);

  return null;
}
