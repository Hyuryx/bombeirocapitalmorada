'use client';

import React, { useState, useEffect } from 'react';
import './ConfiguracoesModal.css';

export default function ConfiguracoesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('dark');
  const [noEffects, setNoEffects] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Carregar dados salvos no localStorage ao montar
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('cbm_user_name') || '';
      const savedTheme = localStorage.getItem('cbm_theme') || 'dark';
      const savedNoEffects = localStorage.getItem('cbm-no-effects') === 'true';

      setUserName(savedName);
      setTheme(savedTheme);
      setNoEffects(savedNoEffects);

      // Aplicar tema inicial
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
      }

      // Aplicar efeitos iniciais
      if (savedNoEffects) {
        document.documentElement.classList.add('no-effects');
        document.body.classList.add('no-effects');
      }
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
    }

    const handleOpen = () => {
      // Recarregar os valores atuais sempre que abrir
      try {
        setUserName(localStorage.getItem('cbm_user_name') || '');
        setTheme(localStorage.getItem('cbm_theme') || 'dark');
        setNoEffects(localStorage.getItem('cbm-no-effects') === 'true');
      } catch (e) {}
      setSaveSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener('openConfiguracoes', handleOpen);
    return () => window.removeEventListener('openConfiguracoes', handleOpen);
  }, []);

  const handleClose = () => {
    try {
      const savedTheme = localStorage.getItem('cbm_theme') || 'dark';
      const savedNoEffects = localStorage.getItem('cbm-no-effects') === 'true';
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
      }
      if (savedNoEffects) {
        document.documentElement.classList.add('no-effects');
        document.body.classList.add('no-effects');
      } else {
        document.documentElement.classList.remove('no-effects');
        document.body.classList.remove('no-effects');
      }
    } catch (e) {}
    setIsOpen(false);
    setSaveSuccess(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
  };

  const handleEffectsToggle = () => {
    const nextVal = !noEffects;
    setNoEffects(nextVal);
    if (nextVal) {
      document.documentElement.classList.add('no-effects');
      document.body.classList.add('no-effects');
    } else {
      document.documentElement.classList.remove('no-effects');
      document.body.classList.remove('no-effects');
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    const cleanName = userName.trim();

    try {
      localStorage.setItem('cbm_user_name', cleanName);
      localStorage.setItem('cbm_theme', theme);
      localStorage.setItem('cbm-no-effects', String(noEffects));

      // Aplicar classes imediatamente
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
      }

      if (noEffects) {
        document.documentElement.classList.add('no-effects');
        document.body.classList.add('no-effects');
      } else {
        document.documentElement.classList.remove('no-effects');
        document.body.classList.remove('no-effects');
      }

      // Notificar todas as partes da aplicação
      window.dispatchEvent(
        new CustomEvent('userProfileUpdated', {
          detail: { name: cleanName, theme, noEffects }
        })
      );

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsOpen(false);
      }, 700);
    } catch (err) {
      console.error('Erro ao salvar configurações no localStorage:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="config-modal-overlay" onClick={handleClose}>
      <div
        className="config-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-modal-title"
      >
        {/* Header */}
        <div className="config-modal-header">
          <div className="config-modal-title-group">
            <div className="config-gear-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div>
              <h2 id="config-modal-title" className="config-title-text">Configurações</h2>
              <span className="config-subtitle-text">Preferências do seu dispositivo</span>
            </div>
          </div>
          <button
            className="config-close-btn"
            onClick={handleClose}
            aria-label="Fechar configurações"
          >
            ✕
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSave} className="config-form">
          {/* Seção 1: Nome do Usuário */}
          <div className="config-field-group">
            <label className="config-label" htmlFor="user-name-input">
              <span className="label-icon">👤</span>
              <span>Nome de Usuário</span>
            </label>
            <div className="config-input-wrapper">
              <input
                id="user-name-input"
                type="text"
                className="config-input"
                placeholder="Ex: Marcelo, Soldado Silva..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={30}
                autoFocus
              />
            </div>
            <p className="config-field-hint">
              Este nome será exibido na saudação <strong>"Seja bem-vindo"</strong> abaixo da logo do Bombeiro.
            </p>
          </div>

          {/* Seção 2: Gaveta de Tema (Tema Claro / Tema Escuro) */}
          <div className="config-field-group">
            <label className="config-label">
              <span className="label-icon">🎨</span>
              <span>Tema da Interface</span>
            </label>

            {/* Cabeçalho da Gaveta */}
            <div
              className={`config-drawer-trigger ${isDrawerOpen ? 'open' : ''}`}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDrawerOpen(!isDrawerOpen);
                }
              }}
            >
              <div className="drawer-current-theme">
                <span className="drawer-theme-icon">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
                <div className="drawer-theme-info">
                  <span className="drawer-theme-title">
                    {theme === 'dark' ? 'Tema Escuro' : 'Tema Claro'}
                  </span>
                  <span className="drawer-theme-desc">
                    {theme === 'dark' ? 'Preto tático com neon CBM (Padrão)' : 'Interface clara e iluminada'}
                  </span>
                </div>
              </div>
              <span className="drawer-chevron">{isDrawerOpen ? '▲' : '▼'}</span>
            </div>

            {/* Conteúdo Expansível da Gaveta */}
            {isDrawerOpen && (
              <div className="config-drawer-content">
                <div
                  className={`theme-option-card ${theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="theme-card-left">
                    <span className="theme-option-icon">🌙</span>
                    <div>
                      <div className="theme-option-name">Tema Escuro</div>
                      <div className="theme-option-sub">Ambiente escuro imersivo, ideal para modulação noturna</div>
                    </div>
                  </div>
                  {theme === 'dark' && <span className="theme-selected-pill">✓ Ativo</span>}
                </div>

                <div
                  className={`theme-option-card ${theme === 'light' ? 'selected' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="theme-card-left">
                    <span className="theme-option-icon">☀️</span>
                    <div>
                      <div className="theme-option-name">Tema Claro</div>
                      <div className="theme-option-sub">Visual claro e suave com alta legibilidade</div>
                    </div>
                  </div>
                  {theme === 'light' && <span className="theme-selected-pill">✓ Ativo</span>}
                </div>
              </div>
            )}
          </div>

          {/* Seção 3: Efeitos Visuais (Desempenho) */}
          <div className="config-field-group">
            <div className="config-toggle-row" onClick={handleEffectsToggle}>
              <div className="toggle-info">
                <div className="toggle-label-group">
                  <span className="label-icon">👁️</span>
                  <span className="toggle-title">Efeitos Gráficos e Luzes</span>
                </div>
                <span className="toggle-sub">
                  {noEffects
                    ? 'Modo Desempenho ativado (menos consumo de memória/GPU)'
                    : 'Efeitos de neon, luzes e animações visuais ativados'}
                </span>
              </div>
              <div className={`config-switch ${!noEffects ? 'active' : ''}`}>
                <div className="config-switch-knob" />
              </div>
            </div>
          </div>

          {/* Footer com Botão de Salvar */}
          <div className="config-modal-footer">
            {saveSuccess ? (
              <div className="config-save-success-badge">
                ✓ Alterações salvas com sucesso!
              </div>
            ) : (
              <button type="submit" className="config-submit-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Salvar Configurações</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
