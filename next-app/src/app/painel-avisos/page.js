'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ThemeBackground from '@/components/ThemeBackground';
import NasaParticles from '@/components/NasaParticles';
import NoSSRLanyardBadgeScreen from '@/components/NoSSRLanyardBadgeScreen';
import '@/components/FuturisticLogin.css';

// Ícones SVG reutilizáveis
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BackArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

export default function PainelAvisosPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [militarId, setMilitarId] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authView, setAuthView] = useState('form'); // 'form' | 'steps' | 'success' | 'denied'
  const [authenticatedMilitarName, setAuthenticatedMilitarName] = useState('Militar');

  // Relógio HUD
  const [hudTime, setHudTime] = useState('00:00:00');
  const [hudDate, setHudDate] = useState('');

  // 6 Etapas Militares
  const [steps, setSteps] = useState([
    { id: 1, title: 'Estabelecendo conexão segura com o sistema de autenticação...', state: 'pending', detail: '' },
    { id: 2, title: 'Consultando registro militar no Discord do CBM...', state: 'pending', detail: '' },
    { id: 3, title: 'Validando autorização do Bot e cargo militar SYSTEM...', state: 'pending', detail: '' },
    { id: 4, title: 'Identificando dispositivo e plataforma de acesso...', state: 'pending', detail: '' },
    { id: 5, title: 'Validando trava de máquina autorizada (HWID Lock)...', state: 'pending', detail: '' },
    { id: 6, title: 'Finalizando processo de autenticação militar...', state: 'pending', detail: '' }
  ]);

  const [deniedInfo, setDeniedInfo] = useState({
    title: 'ACESSO NEGADO',
    msg: 'Não foi possível confirmar sua autorização de acesso.',
    detail: 'Verifique seu ID militar ou solicite a setagem do cargo SYSTEM no Discord.',
    actionLabel: '',
    actionUrl: ''
  });

  // Estado do Painel Administrativo
  const [activeTab, setActiveTab] = useState('avisos'); // 'avisos' | 'admin'
  const [avisos, setAvisos] = useState([]);
  const [statusServidor, setStatusServidor] = useState('Carregando avisos...');
  const [statusClass, setStatusClass] = useState('status');
  const [militaresList, setMilitaresList] = useState([]);
  const [adminStats, setAdminStats] = useState({ militares: 0, desktops: 0, mobiles: 0, bots: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [modalReset, setModalReset] = useState(null); // militar para reset
  const [modalDelete, setModalDelete] = useState(null); // militar para exclusão
  const [modalLogs, setModalLogs] = useState(null); // militar para visualização de logs

  // Campos de Formulário de Aviso
  const [avisoForm, setAvisoForm] = useState({
    id: '',
    titulo: '',
    resumo: '',
    descricao: '',
    categoria: 'comunicado',
    prioridade: 'normal',
    inicio: '',
    fim: '',
    semFim: false,
    link: '',
    mostrarPopup: true,
    mostrarAvisosGerais: true,
    piscar: false,
    ativo: true,
    imagemBase64: ''
  });
  const [isEditingAviso, setIsEditingAviso] = useState(false);

  // 1. Verificação de Sessão Militar Segura com o Servidor (SYSTEM Gate)
  useEffect(() => {
    let isMounted = true;

    const verifyServerSession = async () => {
      try {
        const res = await fetch('/api/auth/verify?panel=avisos');
        const data = await res.json().catch(() => ({}));
        if (isMounted) {
          if (res.ok && data.autenticado) {
            setIsUnlocked(true);
            setShowLogin(false);
            if (data.user?.userName) setAuthenticatedMilitarName(data.user.userName);
            sessionStorage.setItem('cbm_system_unlocked', 'true');
            sessionStorage.setItem('cbm_system_time', String(Date.now()));
            if (typeof document !== 'undefined') {
              document.documentElement.classList.add('cbm-unlocked');
            }
          } else {
            setIsUnlocked(false);
            sessionStorage.removeItem('cbm_system_unlocked');
            sessionStorage.removeItem('cbm_system_time');
            if (typeof document !== 'undefined') {
              document.documentElement.classList.remove('cbm-unlocked');
            }
          }
        }
      } catch (e) {
        if (isMounted) {
          setIsUnlocked(false);
        }
      }
    };

    verifyServerSession();

    // Escuta evento do crachá 3D Three.js
    const handleCrachaDismissed = () => {
      setShowLogin(true);
      setTimeout(() => {
        const input = document.getElementById('login-password');
        if (input) input.focus();
      }, 300);
    };

    window.addEventListener('cbm_cracha_dismissed', handleCrachaDismissed);
    return () => {
      isMounted = false;
      window.removeEventListener('cbm_cracha_dismissed', handleCrachaDismissed);
    };
  }, []);

  // 2. Relógio HUD Militar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setHudTime(`${h}:${m}:${s}`);

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setHudDate(now.toLocaleDateString('pt-BR', options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Carregar dados do Painel quando desbloqueado
  const carregarAvisos = useCallback(async () => {
    try {
      setStatusServidor('Atualizando avisos...');
      const res = await fetch('/api/avisos');
      if (!res.ok) throw new Error('Não foi possível carregar os avisos.');
      const data = await res.json();
      setAvisos(Array.isArray(data) ? data : []);
      setStatusServidor('Arquivo carregado');
      setStatusClass('status sucesso');
    } catch (err) {
      setStatusServidor('Erro ao carregar');
      setStatusClass('status erro');
    }
  }, []);

  const carregarMilitares = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/devices');
      const data = await res.json();
      if (data.sucesso && Array.isArray(data.militares)) {
        setMilitaresList(data.militares);
        setAdminStats({
          militares: data.militares.length,
          desktops: data.militares.filter(m => !!m.desktopHwid || !!m.siteDesktopHwid).length,
          mobiles: data.militares.filter(m => !!m.mobileHwid || !!m.siteMobileHwid).length,
          bots: data.militares.filter(m => m.isBotAuthorized === true).length
        });
      }
    } catch (err) {
      console.error('Erro ao buscar militares:', err);
    }
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('cbm-unlocked');
      }
      carregarAvisos();
      carregarMilitares();
    } else {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('cbm-unlocked');
      }
    }
  }, [isUnlocked, carregarAvisos, carregarMilitares]);

  // 4. Voltar ao Crachá 3D
  const handleVoltarCracha = () => {
    setShowLogin(false);
    setAuthView('form');
    setLoginError('');
    window.dispatchEvent(new CustomEvent('cbm_show_cracha'));
  };

  // 5. Bloquear Painel
  const handleLockPanel = () => {
    sessionStorage.removeItem('cbm_system_unlocked');
    sessionStorage.removeItem('cbm_system_time');
    try {
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (_) {}
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('cbm-unlocked');
    }
    setIsUnlocked(false);
    setShowLogin(false);
    setAuthView('form');
    setMilitarId('');
    window.dispatchEvent(new CustomEvent('cbm_show_cracha'));
  };

  // 6. Autenticação Militar (CARGO SYSTEM + HWID)
  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    const cleanId = String(militarId || '').replace(/^[#\s]+/, '').trim();
    if (!cleanId) {
      setLoginError('Por favor, informe seu ID militar.');
      return;
    }

    setLoginError('');
    setIsSubmitting(true);
    setAuthView('steps');

    // Reseta etapas para pending
    setSteps(prev => prev.map(s => ({ ...s, state: 'pending', detail: '' })));

    let deviceInfo = { hwid: 'default_hwid', deviceType: 'desktop' };
    try {
      if (typeof window !== 'undefined' && typeof window.generateDeviceFingerprint === 'function') {
        deviceInfo = await window.generateDeviceFingerprint();
      }
    } catch (err) {}

    // Dispara requisição com verificação do CARGO SYSTEM
    const authPromise = fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cleanId,
        hwid: deviceInfo.hwid,
        deviceType: deviceInfo.deviceType,
        panel: 'avisos', // Exige validação do CARGO SYSTEM
        systemInfo: deviceInfo
      })
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      return { ok: r.ok, status: r.status, data };
    }).catch(err => ({
      ok: false,
      status: 503,
      data: { sucesso: false, failedAtStep: 1, erro: 'Falha de comunicação segura com o servidor.' }
    }));

    let authResult = null;
    let hadFailure = false;

    for (let stepIndex = 1; stepIndex <= 6; stepIndex++) {
      setSteps(prev => prev.map(s => s.id === stepIndex ? { ...s, state: 'loading' } : s));
      await new Promise(r => setTimeout(r, 700));

      if (!authResult) authResult = await authPromise;

      const data = authResult.data || {};
      const failedAt = data.failedAtStep;
      const isFailed = (failedAt === stepIndex) || (!authResult.ok && !data.steps && stepIndex === 1);

      if (isFailed) {
        hadFailure = true;
        const msg = data.erro || 'Falha na validação desta etapa.';
        setSteps(prev => prev.map(s => {
          if (s.id === stepIndex) return { ...s, state: 'error', detail: msg };
          if (s.id > stepIndex) return { ...s, state: 'skipped' };
          return s;
        }));

        await new Promise(r => setTimeout(r, 1200));

        setDeniedInfo({
          title: 'ACESSO NEGADO',
          msg: data.erro || 'Acesso restrito ao Painel de Avisos.',
          detail: data.detail || 'Verifique seu ID militar ou solicite a atribuição do cargo SYSTEM no Discord CBM.',
          actionLabel: data.actionLabel || '',
          actionUrl: data.actionUrl || ''
        });
        setAuthView('denied');
        setIsSubmitting(false);
        break;
      } else {
        const okDetail = (data.steps && data.steps[stepIndex - 1]?.detail) || '';
        setSteps(prev => prev.map(s => s.id === stepIndex ? { ...s, state: 'success', detail: okDetail } : s));
      }
    }

    if (!hadFailure && authResult && authResult.ok) {
      await new Promise(r => setTimeout(r, 450));
      const userName = authResult.data?.userName || authResult.data?.displayName || 'Militar';
      setAuthenticatedMilitarName(userName);
      setAuthView('success');

      sessionStorage.setItem('cbm_system_unlocked', 'true');
      sessionStorage.setItem('cbm_system_time', Date.now().toString());

      setTimeout(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('cbm-unlocked');
        }
        setIsUnlocked(true);
        setShowLogin(false);
        setIsSubmitting(false);
      }, 1300);
    }
  };

  // 7. Manipulação de Imagens do Aviso
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setAvisoForm(prev => ({ ...prev, imagemBase64: '' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > MAX_WIDTH) { h *= MAX_WIDTH / w; w = MAX_WIDTH; }
        } else {
          if (h > MAX_HEIGHT) { w *= MAX_HEIGHT / h; h = MAX_HEIGHT; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setAvisoForm(prev => ({ ...prev, imagemBase64: compressed }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // 8. Salvar Aviso
  const handleSaveAviso = async (e) => {
    e.preventDefault();
    try {
      const novoAviso = {
        id: isEditingAviso && avisoForm.id ? avisoForm.id : `${avisoForm.titulo.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
        titulo: avisoForm.titulo,
        resumo: avisoForm.resumo,
        imagem: avisoForm.imagemBase64 || '',
        descricao: avisoForm.descricao,
        categoria: avisoForm.categoria,
        prioridade: avisoForm.prioridade,
        inicio: avisoForm.inicio ? `${avisoForm.inicio}:00-03:00` : '',
        fim: avisoForm.semFim ? '' : (avisoForm.fim ? `${avisoForm.fim}:00-03:00` : ''),
        semFim: avisoForm.semFim,
        link: avisoForm.link,
        mostrarPopup: avisoForm.mostrarPopup,
        mostrarAvisosGerais: avisoForm.mostrarAvisosGerais,
        piscar: avisoForm.piscar,
        ativo: avisoForm.ativo,
        criadoEm: new Date().toISOString()
      };

      let novaLista = [];
      if (isEditingAviso) {
        novaLista = avisos.map(a => a.id === novoAviso.id ? novoAviso : a);
      } else {
        novaLista = [novoAviso, ...avisos];
      }

      const res = await fetch('/api/avisos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaLista)
      });

      if (!res.ok) throw new Error('Falha ao salvar aviso no servidor.');

      setAvisos(novaLista);
      setIsEditingAviso(false);
      setAvisoForm({
        id: '',
        titulo: '',
        resumo: '',
        descricao: '',
        categoria: 'comunicado',
        prioridade: 'normal',
        inicio: '',
        fim: '',
        semFim: false,
        link: '',
        mostrarPopup: true,
        mostrarAvisosGerais: true,
        piscar: false,
        ativo: true,
        imagemBase64: ''
      });
      alert('Aviso salvo com sucesso!');
    } catch (err) {
      alert(err.message || 'Erro ao salvar aviso.');
    }
  };

  // 9. Excluir Aviso
  const handleDeleteAviso = async (id) => {
    if (!confirm('Deseja realmente excluir este aviso?')) return;
    try {
      const novaLista = avisos.filter(a => a.id !== id);
      const res = await fetch('/api/avisos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaLista)
      });
      if (!res.ok) throw new Error('Falha ao excluir aviso.');
      setAvisos(novaLista);
    } catch (err) {
      alert(err.message || 'Erro ao excluir aviso.');
    }
  };

  // 10. Editar Aviso
  const handleEditAviso = (a) => {
    setIsEditingAviso(true);
    setAvisoForm({
      id: a.id,
      titulo: a.titulo || '',
      resumo: a.resumo || '',
      descricao: a.descricao || '',
      categoria: a.categoria || 'comunicado',
      prioridade: a.prioridade || 'normal',
      inicio: a.inicio ? a.inicio.substring(0, 16) : '',
      fim: a.fim ? a.fim.substring(0, 16) : '',
      semFim: !a.fim || a.semFim === true,
      link: a.link || '',
      mostrarPopup: a.mostrarPopup !== false,
      mostrarAvisosGerais: a.mostrarAvisosGerais !== false,
      piscar: a.piscar === true,
      ativo: a.ativo !== false,
      imagemBase64: a.imagem || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 11. Reset de HWID
  const handleConfirmResetHWID = async () => {
    if (!modalReset) return;
    try {
      const res = await fetch('/api/admin/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset_hwid',
          militarId: modalReset.militarId,
          deviceSlot: modalReset.slot || 'all'
        })
      });
      const data = await res.json();
      if (data.sucesso) {
        alert(`HWID do militar #${modalReset.militarId} resetado com sucesso!`);
        setModalReset(null);
        carregarMilitares();
      } else {
        alert(data.erro || 'Falha ao resetar HWID.');
      }
    } catch (e) {
      alert('Erro de comunicação ao resetar HWID.');
    }
  };

  // 12. Excluir Cadastro Militar
  const handleConfirmDeleteMilitar = async () => {
    if (!modalDelete) return;
    try {
      const res = await fetch('/api/admin/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          militarId: modalDelete.militarId
        })
      });
      const data = await res.json();
      if (data.sucesso) {
        alert(data.mensagem || `Cadastro do militar #${modalDelete.militarId} excluído com sucesso!`);
        setModalDelete(null);
        carregarMilitares();
      } else {
        alert(data.erro || 'Falha ao excluir militar.');
      }
    } catch (e) {
      alert('Erro de comunicação ao excluir cadastro.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        height: isUnlocked ? '100vh' : 'auto',
        overflowY: isUnlocked ? 'auto' : 'hidden',
        background: 'radial-gradient(circle at 50% 30%, #161014 0%, #0c090c 55%, #050406 100%)',
        color: '#ffffff',
        position: 'relative'
      }}
    >
      {/* Folhas de estilo dedicadas */}
      <link rel="stylesheet" href="/painel-avisos/painel.css" />
      <link rel="stylesheet" href="/painel-avisos/painel-login.css" />

      {/* Partículas NASA vermelhas no fundo do Painel e do Login */}
      <NasaParticles id="particles-painel-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.8, pointerEvents: 'none' }} />

      {/* TELA 1: CRACHÁ 3D OFICIAL (THREE.JS COM CORDA E FÍSICA REAL) */}
      {!isUnlocked && <NoSSRLanyardBadgeScreen />}

      {/* TELA 2: LOGIN HUD MILITAR FUTURISTA (COM PARTÍCULAS NASA CAINDO) */}
      {!isUnlocked && showLogin && (
        <div id="login-screen" style={{ display: 'flex' }}>
          <NasaParticles id="particles-login-admin" style={{ zIndex: 1, opacity: 0.95 }} />

          <div className="cbm-login-screen-frame" id="cbm-login-frame">
            {/* Cantoneiras HUD vermelhas */}
            <span className="cbm-corner cbm-tl"></span>
            <span className="cbm-corner cbm-tr"></span>
            <span className="cbm-corner cbm-bl"></span>
            <span className="cbm-corner cbm-br"></span>

            {/* Relógio HUD */}
            <div id="login-clock">
              <div id="login-time">{hudTime}</div>
              <div id="login-date">{hudDate}</div>
            </div>

            {/* Brasão dos Bombeiros */}
            <div className="cbm-badge-wrap">
              <div className="cbm-badge-halo"></div>
              <img src="/assets/fotos/logo-capital.png" alt="Brasão CBM" className="cbm-badge-img" />
            </div>

            {/* Identificação Institucional */}
            <div className="cbm-title-group">
              <h2>CORPO DE BOMBEIROS</h2>
              <p>CAPITAL MORADA</p>
              <span className="cbm-system-badge">PAINEL ADMINISTRATIVO • CARGO SYSTEM</span>
            </div>

            {/* FASE 1: FORMULÁRIO DE ENTRADA */}
            {authView === 'form' && (
              <form className="cbm-form-box" id="cbm-form-view" onSubmit={handleAuthSubmit}>
                <div className="cbm-input-container" id="cbm-input-wrap">
                  <span className="cbm-lock-ico">
                    <LockIcon />
                  </span>
                  <input
                    type="text"
                    id="login-password"
                    className="cbm-input-text"
                    placeholder="Digite seu ID Militar"
                    autoComplete="off"
                    inputMode="numeric"
                    value={militarId}
                    onChange={(e) => setMilitarId(e.target.value)}
                  />
                </div>

                {loginError && (
                  <p className="cbm-error-alert" style={{ color: '#ff5565', fontSize: '13px', fontWeight: 600, textAlign: 'center', margin: 0 }}>
                    {loginError}
                  </p>
                )}

                <button id="login-submit" className="cbm-btn-entrar" type="submit" disabled={isSubmitting}>
                  <span>ENTRAR</span>
                </button>

                <button id="btn-show-cracha" className="btn-voltar-cracha" type="button" onClick={handleVoltarCracha}>
                  <BackArrowIcon />
                  <span>Voltar ao Crachá</span>
                </button>
              </form>
            )}

            {/* FASE 2: AS 6 ETAPAS MILITARES DE AUTENTICAÇÃO */}
            {authView === 'steps' && (
              <div className="cbm-auth-steps-box" id="cbm-steps-view">
                <div className="cbm-steps-header">
                  <div className="cbm-steps-pulse-dot"></div>
                  <span>SISTEMA DE AUTENTICAÇÃO MILITAR</span>
                </div>
                <div className="cbm-steps-list">
                  {steps.map((st) => (
                    <div key={st.id} className={`cbm-step-item ${st.state}`} id={`step-${st.id}`}>
                      <div className="cbm-step-icon"></div>
                      <div className="cbm-step-content">
                        <div className="cbm-step-title">{st.detail || st.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FASE 3: ACESSO LIBERADO */}
            {authView === 'success' && (
              <div className="cbm-result-box cbm-result-granted" id="cbm-success-view">
                <div className="cbm-result-icon-wrap cbm-icon-granted">
                  <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="cbm-result-title">ACESSO LIBERADO</h3>
                <p className="cbm-result-status">Credencial de segurança SYSTEM validada.</p>
                <p className="cbm-result-welcome">Bem-vindo ao Painel de Avisos, <span>{authenticatedMilitarName}</span>.</p>
              </div>
            )}

            {/* FASE 4: ACESSO NEGADO */}
            {authView === 'denied' && (
              <div className="cbm-result-box cbm-result-denied" id="cbm-denied-view">
                <div className="cbm-result-icon-wrap cbm-icon-denied">
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    <line x1="4" y1="4" x2="20" y2="20" stroke="#ff2638" strokeWidth="2.5" />
                  </svg>
                </div>
                <h3 className="cbm-result-title">{deniedInfo.title}</h3>
                <p className="cbm-result-status">{deniedInfo.msg}</p>
                <p className="cbm-result-detail">{deniedInfo.detail}</p>

                {deniedInfo.actionUrl && (
                  <a
                    className="cbm-btn-entrar"
                    style={{ textDecoration: 'none', marginBottom: '12px', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    href={deniedInfo.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{deniedInfo.actionLabel || 'AÇÃO NECESSÁRIA'}</span>
                  </a>
                )}

                <button className="cbm-btn-retry" type="button" onClick={() => setAuthView('form')}>
                  <RefreshIcon />
                  <span>TENTAR NOVAMENTE</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TELA 3: PAINEL ADMINISTRATIVO COMPLETO (SÓ RENDERIZA APÓS O LOGIN SYSTEM) */}
      {isUnlocked && (
        <main className="painel" style={{ display: 'block', minHeight: '100vh', padding: '20px', color: '#ffffff' }}>
          <header className="cabecalho">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="/assets/iconesite/icone.png" alt="Logo Bombeiros" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div>
                <span className="etiqueta">Painel Administrativo</span>
                <h1 style={{ marginTop: '5px' }}>Gerenciador de avisos</h1>
                <p style={{ marginTop: '5px' }}>Crie, edite e exclua os avisos que serão publicados no site.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div id="statusServidor" className={statusClass}>
                {statusServidor}
              </div>
              <button type="button" className="btn-lock-panel" id="btn-lock-screen" title="Bloquear e retornar ao crachá" onClick={handleLockPanel}>
                <LockIcon />
                <span>Bloquear Painel</span>
              </button>
            </div>
          </header>

          {/* MONITORES DE NAVEGAÇÃO */}
          <div className="monitores-nav-wrapper">
            {/* Monitor 1: Avisos */}
            <div
              className={`monitor-tab-card ${activeTab === 'avisos' ? 'active' : ''}`}
              id="tab-btn-avisos"
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('avisos')}
            >
              <div className="monitor-casing">
                <div className="monitor-screen">
                  <div className="monitor-icon-wrap">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="monitor-tag">MÓDULO DE COMUNICADOS</span>
                  <h3 className="monitor-title">PAINEL DE AVISOS</h3>
                  <p className="monitor-desc">Gerenciador de avisos e pop-ups do site</p>
                </div>
                <div className="monitor-chin">
                  <span>TERMINAL 01</span>
                  <div className="monitor-led"></div>
                </div>
              </div>
              <div className="monitor-stand"></div>
              <div className="monitor-base"></div>
            </div>

            {/* Monitor 2: Administrativo HWID */}
            <div
              className={`monitor-tab-card ${activeTab === 'admin' ? 'active' : ''}`}
              id="tab-btn-admin"
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab('admin')}
            >
              <div className="monitor-casing">
                <div className="monitor-screen">
                  <div className="monitor-icon-wrap">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <span className="monitor-tag">CENTRAL DE SEGURANÇA</span>
                  <h3 className="monitor-title">PAINEL ADMINISTRATIVO</h3>
                  <p className="monitor-desc">Gestão de Dispositivos e Reset de HWID</p>
                </div>
                <div className="monitor-chin">
                  <span>TERMINAL 02</span>
                  <div className="monitor-led"></div>
                </div>
              </div>
              <div className="monitor-stand"></div>
              <div className="monitor-base"></div>
            </div>
          </div>

          {/* ABA 1: GERENCIADOR DE AVISOS */}
          {activeTab === 'avisos' && (
            <div id="aba-conteudo-avisos">
              <section className="card">
                <h2 id="tituloFormulario">{isEditingAviso ? 'Editar Aviso' : 'Novo aviso'}</h2>

                <form id="formularioAviso" onSubmit={handleSaveAviso}>
                  <div className="campo campo-completo">
                    <label htmlFor="titulo">Título / Destino</label>
                    <select
                      id="titulo"
                      required
                      value={avisoForm.titulo}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, titulo: e.target.value }))}
                    >
                      <option value="" disabled>Selecione o destino / título</option>
                      <option value="Início">Início</option>
                      <option value="Avisos Gerais">Avisos Gerais</option>
                      <option value="Regras">Regras</option>
                      <option value="Uniformes">Uniformes</option>
                      <optgroup label="Cursos (Aba Geral e Específicos)">
                        <option value="Cursos">Cursos (Geral)</option>
                        <option value="Curso de Piloto">Curso de Piloto</option>
                        <option value="Resgate Aquático">Resgate Aquático</option>
                        <option value="Resgate Montanha">Resgate Montanha</option>
                        <option value="Paraquedismo">Paraquedismo</option>
                        <option value="Evoluir">Evoluir</option>
                        <option value="COER">COER</option>
                        <option value="Tripulantes">Tripulantes</option>
                        <option value="GTM">GTM</option>
                      </optgroup>
                      <optgroup label="Modulação (Aba Geral e Sub-itens)">
                        <option value="Modulação">Modulação (Geral)</option>
                        <option value="Códigos Q">Códigos Q</option>
                        <option value="Alfabeto Fonético">Alfabeto Fonético</option>
                        <option value="Numeração Fonética">Numeração Fonética</option>
                        <option value="Padrão de Rádio">Padrão de Rádio</option>
                      </optgroup>
                      <option value="Viaturas">Viaturas</option>
                      <option value="Hierarquia">Hierarquia</option>
                      <option value="Planilhas">Planilhas</option>
                      <option value="Galeria">Galeria</option>
                    </select>
                  </div>

                  <div className="campo campo-completo">
                    <label htmlFor="resumo">Resumo (Informação Curta)</label>
                    <input
                      type="text"
                      id="resumo"
                      maxLength={150}
                      required
                      placeholder="Texto curto que aparecerá no pop-up (Max: 150 caracteres)"
                      value={avisoForm.resumo}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, resumo: e.target.value }))}
                    />
                  </div>

                  <div className="campo campo-completo">
                    <label htmlFor="imagem">Imagem (Aparecerá nos Avisos Gerais)</label>
                    <input type="file" id="imagem" accept="image/*" onChange={handleImageUpload} />
                    <small style={{ color: '#66707c', display: 'block', marginTop: '5px' }}>Selecione uma imagem. Ela será otimizada automaticamente.</small>
                    {avisoForm.imagemBase64 && (
                      <img src={avisoForm.imagemBase64} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }} />
                    )}
                  </div>

                  <div className="campo campo-completo">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                      id="descricao"
                      required
                      placeholder="Digite as informações do aviso"
                      value={avisoForm.descricao}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, descricao: e.target.value }))}
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                      id="categoria"
                      required
                      value={avisoForm.categoria}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, categoria: e.target.value }))}
                    >
                      <option value="informacao">Informação</option>
                      <option value="comunicado">Comunicado</option>
                      <option value="evento">Evento</option>
                      <option value="manutencao">Manutenção</option>
                    </select>
                  </div>

                  <div className="campo">
                    <label htmlFor="prioridade">Prioridade</label>
                    <select
                      id="prioridade"
                      required
                      value={avisoForm.prioridade}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, prioridade: e.target.value }))}
                    >
                      <option value="normal">Normal</option>
                      <option value="importante">Importante</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>

                  <div className="campo">
                    <label htmlFor="inicio">Início</label>
                    <input
                      type="datetime-local"
                      id="inicio"
                      required
                      value={avisoForm.inicio}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, inicio: e.target.value }))}
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="fim">Encerramento</label>
                    <input
                      type="datetime-local"
                      id="fim"
                      disabled={avisoForm.semFim}
                      required={!avisoForm.semFim}
                      value={avisoForm.fim}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, fim: e.target.value }))}
                    />
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        id="semFim"
                        checked={avisoForm.semFim}
                        onChange={(e) => setAvisoForm(prev => ({ ...prev, semFim: e.target.checked }))}
                      />
                      <label htmlFor="semFim" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Sem limite de tempo</label>
                    </div>
                  </div>

                  <div className="campo campo-completo">
                    <label htmlFor="link">Link do aviso</label>
                    <input
                      type="text"
                      id="link"
                      placeholder="/cursos.html ou #curso-resgate"
                      value={avisoForm.link}
                      onChange={(e) => setAvisoForm(prev => ({ ...prev, link: e.target.value }))}
                    />
                  </div>

                  <fieldset className="campo-completo opcoes">
                    <legend>Onde exibir</legend>
                    <label>
                      <input
                        type="checkbox"
                        checked={avisoForm.mostrarPopup}
                        onChange={(e) => setAvisoForm(prev => ({ ...prev, mostrarPopup: e.target.checked }))}
                      />
                      Mostrar como pop-up
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={avisoForm.mostrarAvisosGerais}
                        onChange={(e) => setAvisoForm(prev => ({ ...prev, mostrarAvisosGerais: e.target.checked }))}
                      />
                      Mostrar em Avisos Gerais
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={avisoForm.piscar}
                        onChange={(e) => setAvisoForm(prev => ({ ...prev, piscar: e.target.checked }))}
                      />
                      Aplicar animação de destaque
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={avisoForm.ativo}
                        onChange={(e) => setAvisoForm(prev => ({ ...prev, ativo: e.target.checked }))}
                      />
                      Aviso ativo
                    </label>
                  </fieldset>

                  <div className="acoes campo-completo">
                    <button type="submit" className="botao primario">
                      {isEditingAviso ? 'Salvar Alterações' : 'Salvar aviso'}
                    </button>
                    {isEditingAviso && (
                      <button
                        type="button"
                        className="botao secundario"
                        onClick={() => {
                          setIsEditingAviso(false);
                          setAvisoForm({
                            id: '',
                            titulo: '',
                            resumo: '',
                            descricao: '',
                            categoria: 'comunicado',
                            prioridade: 'normal',
                            inicio: '',
                            fim: '',
                            semFim: false,
                            link: '',
                            mostrarPopup: true,
                            mostrarAvisosGerais: true,
                            piscar: false,
                            ativo: true,
                            imagemBase64: ''
                          });
                        }}
                      >
                        Cancelar edição
                      </button>
                    )}
                  </div>
                </form>
              </section>

              <section className="card">
                <div className="titulo-lista">
                  <div>
                    <h2>Avisos cadastrados</h2>
                    <p>{avisos.length} aviso(s) cadastrado(s)</p>
                  </div>
                </div>

                <div className="lista-avisos">
                  {avisos.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#66707c' }}>Nenhum aviso cadastrado.</div>
                  ) : (
                    avisos.map((aviso) => (
                      <div key={aviso.id} className={`item-aviso prioridade-${aviso.prioridade}`}>
                        <div style={{ flex: 1 }}>
                          <div className="item-topo">
                            <span className="etiqueta">{aviso.categoria}</span>
                            <span className="etiqueta">{aviso.prioridade}</span>
                            <span className="etiqueta">{aviso.titulo}</span>
                          </div>
                          <h3>{aviso.resumo}</h3>
                          <p>{aviso.descricao}</p>
                        </div>
                        <div className="item-acoes" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <button className="botao secundario" type="button" onClick={() => handleEditAviso(aviso)}>Editar</button>
                          <button className="botao perigo" type="button" onClick={() => handleDeleteAviso(aviso.id)}>Excluir</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ABA 2: CENTRAL ADMINISTRATIVA & HWID */}
          {activeTab === 'admin' && (
            <div id="aba-conteudo-admin">
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">👥</div>
                  <div className="admin-stat-info">
                    <div className="admin-stat-num">{adminStats.militares}</div>
                    <div className="admin-stat-label">Militares Registrados</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">💻</div>
                  <div className="admin-stat-info">
                    <div className="admin-stat-num">{adminStats.desktops}</div>
                    <div className="admin-stat-label">PCs / Desktops Ativos</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">📱</div>
                  <div className="admin-stat-info">
                    <div className="admin-stat-num">{adminStats.mobiles}</div>
                    <div className="admin-stat-label">Mobiles / Tablets</div>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon">🤖</div>
                  <div className="admin-stat-info">
                    <div className="admin-stat-num">{adminStats.bots}</div>
                    <div className="admin-stat-label">Bots Autorizados</div>
                  </div>
                </div>
              </div>

              <div className="admin-toolbar">
                <div className="admin-search-wrap">
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Buscar por ID (#01), Nome ou Discord..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button type="button" className="admin-btn-refresh" onClick={carregarMilitares}>
                  <RefreshIcon />
                  <span>Atualizar Lista</span>
                </button>
              </div>

              <div className="militares-grid">
                {militaresList
                  .filter(m => {
                    if (!searchTerm) return true;
                    const termo = searchTerm.toLowerCase();
                    return String(m.militarId || '').toLowerCase().includes(termo) ||
                           String(m.nick || m.globalName || '').toLowerCase().includes(termo);
                  })
                  .map(m => {
                    const hasSiteDesktop = !!(m.siteDesktopHwid || m.desktopHwid);
                    const hasSiteMobile = !!(m.siteMobileHwid || m.mobileHwid);
                    const hasAdminDesktop = !!m.adminDesktopHwid;
                    const hasAdminMobile = !!m.adminMobileHwid;

                    return (
                      <div key={m.militarId} className="militar-admin-card">
                        {/* Header do Card Militar */}
                        <div className="militar-card-header">
                          <div className="militar-identity-group">
                            <span className="militar-id-badge">#{m.militarId}</span>
                            <div>
                              <h4 className="militar-name-title">{m.nick || m.globalName || `Militar #${m.militarId}`}</h4>
                              <div className="militar-discord-tag">
                                <span>{m.discordTag || (m.discordId ? `ID Discord: ${m.discordId}` : 'Discord não vinculado')}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`bot-status-badge ${m.isBotAuthorized ? 'authorized' : 'pending'}`}>
                            {m.isBotAuthorized ? '✓ Bot Autorizado' : '⏳ Bot Pendente'}
                          </span>
                        </div>

                        {/* Grid dos 2 Sistemas: Site Principal vs Painel de Avisos */}
                        <div className="militar-systems-grid">
                          {/* SISTEMA 1: SITE PRINCIPAL (CARGO BOMBEIRO) */}
                          <div className="system-section-card site">
                            <div className="system-section-header">
                              <span>🌐 SITE PRINCIPAL (CARGO BOMBEIRO)</span>
                            </div>

                            {/* Slot PC Site */}
                            <div className="device-subslot">
                              <div className="device-subslot-top">
                                <span className="device-subslot-title">💻 Computador (Desktop)</span>
                                <span className={`device-status-pill ${hasSiteDesktop ? 'bound' : 'unbound'}`}>
                                  {hasSiteDesktop ? '✓ Vinculado' : 'Livre'}
                                </span>
                              </div>
                              <div className="device-hwid-box" title={m.siteDesktopHwid || m.desktopHwid || ''}>
                                HWID: {(m.siteDesktopHwid || m.desktopHwid) ? `${(m.siteDesktopHwid || m.desktopHwid).substring(0, 18)}...` : 'Nenhum dispositivo registrado'}
                              </div>
                              <button
                                type="button"
                                className="btn-reset-device-slot site"
                                disabled={!hasSiteDesktop}
                                onClick={() => setModalReset({ militarId: m.militarId, slot: 'site_desktop', label: 'Computador do Site Principal' })}
                              >
                                Resetar PC (Site)
                              </button>
                            </div>

                            {/* Slot Celular Site */}
                            <div className="device-subslot">
                              <div className="device-subslot-top">
                                <span className="device-subslot-title">📱 Celular (Mobile)</span>
                                <span className={`device-status-pill ${hasSiteMobile ? 'bound' : 'unbound'}`}>
                                  {hasSiteMobile ? '✓ Vinculado' : 'Livre'}
                                </span>
                              </div>
                              <div className="device-hwid-box" title={m.siteMobileHwid || m.mobileHwid || ''}>
                                HWID: {(m.siteMobileHwid || m.mobileHwid) ? `${(m.siteMobileHwid || m.mobileHwid).substring(0, 18)}...` : 'Nenhum dispositivo registrado'}
                              </div>
                              <button
                                type="button"
                                className="btn-reset-device-slot site"
                                disabled={!hasSiteMobile}
                                onClick={() => setModalReset({ militarId: m.militarId, slot: 'site_mobile', label: 'Celular do Site Principal' })}
                              >
                                Resetar Celular (Site)
                              </button>
                            </div>
                          </div>

                          {/* SISTEMA 2: PAINEL DE AVISOS (CARGO SYSTEM) */}
                          <div className="system-section-card admin">
                            <div className="system-section-header">
                              <span>🛡️ PAINEL DE AVISOS (CARGO SYSTEM)</span>
                            </div>

                            {/* Slot PC Painel */}
                            <div className="device-subslot">
                              <div className="device-subslot-top">
                                <span className="device-subslot-title">💻 Computador (Desktop)</span>
                                <span className={`device-status-pill ${hasAdminDesktop ? 'bound' : 'unbound'}`}>
                                  {hasAdminDesktop ? '✓ Vinculado' : 'Livre'}
                                </span>
                              </div>
                              <div className="device-hwid-box" title={m.adminDesktopHwid || ''}>
                                HWID: {m.adminDesktopHwid ? `${m.adminDesktopHwid.substring(0, 18)}...` : 'Nenhum dispositivo registrado'}
                              </div>
                              <button
                                type="button"
                                className="btn-reset-device-slot admin"
                                disabled={!hasAdminDesktop}
                                onClick={() => setModalReset({ militarId: m.militarId, slot: 'admin_desktop', label: 'Computador do Painel de Avisos' })}
                              >
                                Resetar PC (Painel)
                              </button>
                            </div>

                            {/* Slot Celular Painel */}
                            <div className="device-subslot">
                              <div className="device-subslot-top">
                                <span className="device-subslot-title">📱 Celular (Mobile)</span>
                                <span className={`device-status-pill ${hasAdminMobile ? 'bound' : 'unbound'}`}>
                                  {hasAdminMobile ? '✓ Vinculado' : 'Livre'}
                                </span>
                              </div>
                              <div className="device-hwid-box" title={m.adminMobileHwid || ''}>
                                HWID: {m.adminMobileHwid ? `${m.adminMobileHwid.substring(0, 18)}...` : 'Nenhum dispositivo registrado'}
                              </div>
                              <button
                                type="button"
                                className="btn-reset-device-slot admin"
                                disabled={!hasAdminMobile}
                                onClick={() => setModalReset({ militarId: m.militarId, slot: 'admin_mobile', label: 'Celular do Painel de Avisos' })}
                              >
                                Resetar Celular (Painel)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Rodapé com Ações Globais */}
                        <div className="militar-card-footer">
                          <span style={{ fontSize: '12px', color: '#8c97a8' }}>
                            Identificação: #{m.militarId} • Trava HWID separada (Site + Painel)
                          </span>
                          <div className="militar-card-footer-actions">
                            <button
                              type="button"
                              className="btn-reset-all"
                              onClick={() => setModalReset({ militarId: m.militarId, slot: 'all', label: 'TODOS os dispositivos vinculados (Site e Painel)' })}
                            >
                              <span>Resetar Todos HWIDs</span>
                            </button>
                            <button
                              type="button"
                              className="btn-delete-militar"
                              onClick={() => setModalDelete({ militarId: m.militarId, nome: m.nick || m.globalName || m.militarId })}
                            >
                              <span>Excluir Cadastro</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

        </main>
      )}

      {/* MODAL DE RESET DE HWID */}
      {modalReset && (
        <div className="cbm-admin-modal-overlay" style={{ display: 'flex' }}>
          <div className="cbm-admin-modal-box">
            <h3 className="cbm-admin-modal-title">Resetar HWID Militar?</h3>
            <p className="cbm-admin-modal-desc">
              Confirma o reset do <strong>{modalReset.label}</strong> vinculado ao Militar #{modalReset.militarId}? Um novo dispositivo poderá se vincular no próximo login desse sistema.
            </p>
            <div className="cbm-admin-modal-actions">
              <button type="button" className="cbm-modal-btn cancel" onClick={() => setModalReset(null)}>Cancelar</button>
              <button type="button" className="cbm-modal-btn confirm" onClick={handleConfirmResetHWID}>Confirmar Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EXCLUSÃO DE CADASTRO MILITAR */}
      {modalDelete && (
        <div className="cbm-admin-modal-overlay" style={{ display: 'flex' }}>
          <div className="cbm-admin-modal-box" style={{ maxWidth: '520px', border: '1px solid #ff3849', boxShadow: '0 0 50px rgba(255, 38, 56, 0.45)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(255, 60, 60, 0.4)', color: '#ff3849', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>
            <h3 className="cbm-admin-modal-title" style={{ color: '#ffffff', fontSize: '22px', marginBottom: '8px' }}>
              Você tem certeza que deseja excluir?
            </h3>
            <div style={{ background: 'rgba(255, 60, 60, 0.1)', border: '1px solid rgba(255, 60, 60, 0.3)', borderRadius: '12px', padding: '14px 18px', margin: '16px 0', textAlign: 'left' }}>
              <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '4px' }}>Militar Selecionado:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', fontFamily: 'Rajdhani, sans-serif' }}>
                {modalDelete.nome || `Militar #${modalDelete.militarId}`}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff5565', marginTop: '2px' }}>
                ID: #{modalDelete.militarId}
              </div>
            </div>
            <p className="cbm-admin-modal-desc" style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
              Esta ação é irreversível. O cadastro do militar será removido da base de dados e todas as travas de HWID (Site Principal e Painel de Avisos) serão excluídas.
            </p>
            <div className="cbm-admin-modal-actions" style={{ marginTop: '20px' }}>
              <button type="button" className="cbm-modal-btn cancel" onClick={() => setModalDelete(null)}>
                Cancelar
              </button>
              <button type="button" className="cbm-modal-btn confirm" onClick={handleConfirmDeleteMilitar}>
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
