// Proteção Anti-Clone Front-end
(function() {
    const host = window.location.hostname;
    const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '' || host.endsWith('.local') || host.startsWith('192.168.') || host.startsWith('10.');
    const isAllowedDomain = host.includes('bombeirocapitalmorada.vercel.app');

    if (!isLocalhost && !isAllowedDomain) {
        document.body.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;height:100vh;background-color:#111;color:#ff3333;font-family:sans-serif;text-align:center;padding:20px;">
                <div>
                    <h1 style="font-size:3em;margin-bottom:10px;">⚠️ ACESSO NEGADO</h1>
                    <p style="font-size:1.5em;color:#fff;">Cópia Pirata ou Domínio Não Autorizado.</p>
                </div>
            </div>
        `;
        throw new Error("Execução bloqueada por proteção anti-clone.");
    }
})();

window.initApp = function() {

    // Lógica da Navegação Global
    const globalNavItems = document.querySelectorAll('.nav-item');
    const globalViews = document.querySelectorAll('.global-view');

    window.switchGlobalView = function(targetId) {
        localStorage.setItem('activeTab', targetId);
        
        const gradientBg = document.getElementById('gradient-waves-bg');
        if (gradientBg) {
            gradientBg.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            if (targetId === 'view-inicio') {
                gradientBg.style.opacity = '0';
                gradientBg.style.visibility = 'hidden';
            } else {
                gradientBg.style.opacity = '1';
                gradientBg.style.visibility = 'visible';
            }
        }

        globalNavItems.forEach(nav => {
            if(nav.getAttribute('data-global-target') === targetId) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });

        globalViews.forEach(view => {
            if(view.id === targetId) {
                view.classList.add('active');
                view.style.display = '';
                
                // Reset to the first sidebar item and section to ensure it is always active upon entry
                const sidebarNavItems = view.querySelectorAll('.sidebar-nav li');
                const contentSections = view.querySelectorAll('.content-section');
                
                if (sidebarNavItems.length > 0 && contentSections.length > 0) {
                    sidebarNavItems.forEach(n => n.classList.remove('active'));
                    sidebarNavItems[0].classList.add('active');
                    
                    const firstTargetId = sidebarNavItems[0].getAttribute('data-target');
                    contentSections.forEach(s => {
                        if (s.id === firstTargetId) {
                            s.classList.add('active');
                            s.style.display = 'block';
                        } else {
                            s.classList.remove('active');
                            s.style.display = 'none';
                        }
                    });
                }
            } else {
                view.classList.remove('active');
                view.style.display = 'none';
            }
        });

        // Atualizar planilha ao abrir a aba Planilhas para garantir tempo real
        if (targetId === 'view-planilhas') {
            const iframe = document.getElementById('planilha-iframe');
            if (iframe) {
                // Remove the old src and set it again to force a reload from Google
                const currentSrc = iframe.src;
                iframe.src = '';
                setTimeout(() => iframe.src = currentSrc, 10);
            }
        }

        // As notificações da central (lateral) agora permanecem visíveis em todas as abas.
        // A lógica de ocultar ao mudar de aba foi removida a pedido do usuário.

        // Mostrar Modal Destaque (Disparar evento para notificacoes.js)
        window.dispatchEvent(new CustomEvent('tabChanged', { detail: { targetId } }));
    }

    globalNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Ripple Effect
            if (!document.documentElement.classList.contains('no-effects')) {
                const circle = document.createElement('span');
                const diameter = Math.max(item.clientWidth, item.clientHeight);
                const radius = diameter / 2;
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - item.getBoundingClientRect().left - radius}px`;
                circle.style.top = `${e.clientY - item.getBoundingClientRect().top - radius}px`;
                circle.classList.add('ripple');
                const ripple = item.querySelector('.ripple');
                if (ripple) { ripple.remove(); }
                item.appendChild(circle);
            }

            const targetId = item.getAttribute('data-global-target');
            switchGlobalView(targetId);
            
            // Fechar menu gaveta mobile ao clicar em um item
            closeMobileDrawer();
        });
    });

    // Funções de Controle da Gaveta Mobile (Drawer Tático)
    function openMobileDrawer() {
        const navTabs = document.getElementById('nav-tabs');
        const navOverlay = document.getElementById('nav-overlay');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (navTabs) navTabs.classList.add('open');
        if (navOverlay) navOverlay.classList.add('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        const navTabs = document.getElementById('nav-tabs');
        const navOverlay = document.getElementById('nav-overlay');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (navTabs) navTabs.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMobileDrawer() {
        const navTabs = document.getElementById('nav-tabs');
        if (navTabs && navTabs.classList.contains('open')) {
            closeMobileDrawer();
        } else {
            openMobileDrawer();
        }
    }

    // Botão Hambúrguer Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileDrawer();
        });
    }

    // Botão Fechar no Cabeçalho do Drawer
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileDrawer();
        });
    }

    // Overlay de fundo escuro fecha a gaveta
    const navOverlay = document.getElementById('nav-overlay');
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileDrawer);
    }

    // Tecla ESC fecha a gaveta mobile
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileDrawer();
            const modal = document.getElementById("image-modal");
            if (modal && modal.style.display === "flex") {
                modal.style.display = "none";
                if (typeof resetZoom === 'function') resetZoom();
            }
        }
    });

    // Botões de Ação na Gaveta (Configurações e Logout)
    const drawerBtnConfig = document.getElementById('drawer-btn-config');
    if (drawerBtnConfig) {
        drawerBtnConfig.addEventListener('click', () => {
            closeMobileDrawer();
            window.dispatchEvent(new CustomEvent('openConfiguracoes'));
        });
    }

    const drawerBtnLogout = document.getElementById('drawer-btn-logout');
    if (drawerBtnLogout) {
        drawerBtnLogout.addEventListener('click', () => {
            closeMobileDrawer();
            if (typeof window.handleCbmLogout === 'function') {
                window.handleCbmLogout();
            } else {
                window.dispatchEvent(new CustomEvent('cbm_logout'));
            }
        });
    }

    // Logout Global Unificado
    window.handleCbmLogout = function() {
        try {
            localStorage.removeItem('cbm_auth_unlocked');
            localStorage.removeItem('cbm_auth_user');
            localStorage.removeItem('cbm_session_start');
            localStorage.removeItem('cbm_last_activity');
            sessionStorage.removeItem('cbm_auth_unlocked');
            sessionStorage.removeItem('cbm_session_start');
            sessionStorage.removeItem('cbm_last_activity');
            document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        } catch (e) {}

        document.documentElement.classList.remove('cbm-unlocked');
        document.body.classList.add('locked');
        window.dispatchEvent(new CustomEvent('cbm_lock_screen'));
        window.dispatchEvent(new CustomEvent('cbm_show_cracha'));
    };
    window.addEventListener('cbm_logout', window.handleCbmLogout);

    // Inicialização das Partículas NASA na Tela de Login
    function initLoginParticles() {
        const loginContainer = document.getElementById('particles-login');
        if (!loginContainer) return;
        if (loginContainer.querySelector('.particles-js-canvas-el')) return;
        if (!Array.isArray(window.pJSDom)) window.pJSDom = [];
        if (typeof window.particlesJS === 'function' && typeof window.particlesJS.load === 'function') {
            try {
                window.particlesJS.load('particles-login', '/particlesjs-config.json');
            } catch (err) {
                console.warn('Erro ao carregar particles-login:', err);
            }
        } else {
            setTimeout(initLoginParticles, 100);
        }
    }
    initLoginParticles();
    window.addEventListener('cbm_lock_screen', () => {
        setTimeout(initLoginParticles, 120);
    });
    window.addEventListener('cbm_cracha_dismissed', () => {
        setTimeout(initLoginParticles, 50);
    });

    // Ação de clique na logo da sidebar para voltar à tela inicial (Início)
    // Atualizado para pegar todas as logos de sidebars no site
    const sidebarLogos = document.querySelectorAll('.sidebar-logo');
    sidebarLogos.forEach(logo => {
        logo.addEventListener('click', () => {
            switchGlobalView('view-inicio');
        });
    });

    const navItems = document.querySelectorAll('.sidebar-nav li');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Find the parent global-view to scope the changes
            const globalView = item.closest('.global-view');
            if (!globalView) return;

            // Remove active class from all nav items within this sidebar
            const localNavItems = globalView.querySelectorAll('.sidebar-nav li');
            localNavItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');

            // Get target section id
            const targetId = item.getAttribute('data-target');

            // Get all sections within this global-view
            const localSections = globalView.querySelectorAll('.content-section');

            localSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                    section.style.display = 'block';
                } else {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }
            });

            // Se for mobile, fecha a gaveta lateral ao selecionar um item
            if (window.innerWidth <= 768) {
                const sidebar = item.closest('.sidebar');
                if (sidebar) {
                    sidebar.classList.add('collapsed');
                }
            }

            // Disparar evento para atualizar banner / modal ao clicar na sub-aba
            window.dispatchEvent(new CustomEvent('tabChanged', { detail: { targetId } }));
        });
    });

    // Lógica do Modal (Lightbox)
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".modal-close");
    
    // Variáveis para controle do Zoom e Pan
    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;

    function resetZoom() {
        scale = 1;
        pointX = 0;
        pointY = 0;
        if (modalImg) {
            modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            modalImg.style.cursor = 'zoom-in';
        }
    }

    if (modal && modalImg) {
        // Abertura Universal Delegada de Imagens (Desktop e Mobile)
        document.addEventListener('click', function(e) {
            const target = e.target;
            if (!target || target.tagName !== 'IMG') return;
            if (target.classList.contains('no-lightbox') || 
                target.closest('#modal-destaque') || 
                target.closest('#modal-evento-precos') || 
                target.closest('.sidebar-logo-container') || 
                target.closest('.nav-brand') || 
                target.closest('.drawer-header-brand') ||
                target.id === 'modal-img') return;

            const isLightboxTarget = target.closest('.cards-grid') || 
                                     target.closest('.content-section') || 
                                     target.closest('.video-gallery-grid') || 
                                     target.closest('.card') || 
                                     target.closest('.info-card') ||
                                     target.getAttribute('data-title') || 
                                     target.classList.contains('expandable-image') ||
                                     window.getComputedStyle(target).cursor === 'pointer';

            if (isLightboxTarget) {
                modal.style.display = "flex";
                modalImg.src = target.src;
                resetZoom();

                const title = target.getAttribute('data-title') || target.alt || '';
                const desc = target.getAttribute('data-desc') || '';
                const infoPanel = document.getElementById('modal-info-panel');
                const titleEl = document.getElementById('modal-title');
                const descEl = document.getElementById('modal-desc');

                if ((title || desc) && infoPanel) {
                    if (titleEl) titleEl.textContent = title;
                    if (descEl) descEl.innerHTML = desc;
                    infoPanel.style.display = "block";
                } else if (infoPanel) {
                    infoPanel.style.display = "none";
                }
            }
        });

        // Evento de Scroll para Zoom (Mouse Wheel)
        modalImg.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY) * -0.25;
            const newScale = Math.min(5, Math.max(1, scale + delta));
            scale = newScale;
            if (scale === 1) {
                pointX = 0;
                pointY = 0;
                modalImg.style.cursor = 'zoom-in';
            } else {
                modalImg.style.cursor = 'grab';
            }
            modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        });

        // Eventos de Mouse para Arrastar (Pan) a imagem com zoom
        modalImg.addEventListener('mousedown', (e) => {
            if (scale > 1) {
                e.preventDefault();
                panning = true;
                startX = e.clientX - pointX;
                startY = e.clientY - pointY;
                modalImg.style.cursor = 'grabbing';
            }
        });

        modalImg.addEventListener('mousemove', (e) => {
            if (!panning) return;
            e.preventDefault();
            pointX = e.clientX - startX;
            pointY = e.clientY - startY;
            modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        });

        modalImg.addEventListener('mouseup', () => {
            if (panning) {
                panning = false;
                modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
            }
        });

        modalImg.addEventListener('mouseleave', () => {
            if (panning) {
                panning = false;
                modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
            }
        });

        // Suporte a Toque Mobile (Double-Tap Zoom & Touch Pan)
        let lastTouchTime = 0;
        let initialPinchDist = 0;
        let touchStartX = 0;
        let touchStartY = 0;

        modalImg.addEventListener('touchstart', (e) => {
            const now = Date.now();
            if (e.touches.length === 1) {
                // Detecção de Duplo Toque para Zoom Rápido no Celular
                if (now - lastTouchTime < 320) {
                    e.preventDefault();
                    if (scale > 1) {
                        resetZoom();
                    } else {
                        scale = 2.5;
                        pointX = 0;
                        pointY = 0;
                        modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
                    }
                    lastTouchTime = 0;
                    return;
                }
                lastTouchTime = now;

                if (scale > 1) {
                    panning = true;
                    touchStartX = e.touches[0].clientX - pointX;
                    touchStartY = e.touches[0].clientY - pointY;
                }
            } else if (e.touches.length === 2) {
                // Pinch-to-zoom
                panning = false;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                initialPinchDist = Math.hypot(dx, dy);
            }
        }, { passive: false });

        modalImg.addEventListener('touchmove', (e) => {
            if (panning && e.touches.length === 1 && scale > 1) {
                e.preventDefault();
                pointX = e.touches[0].clientX - touchStartX;
                pointY = e.touches[0].clientY - touchStartY;
                modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            } else if (e.touches.length === 2 && initialPinchDist > 0) {
                e.preventDefault();
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const currentDist = Math.hypot(dx, dy);
                const zoomFactor = currentDist / initialPinchDist;
                scale = Math.min(5, Math.max(1, scale * (zoomFactor > 1 ? 1.03 : 0.97)));
                initialPinchDist = currentDist;
                modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            }
        }, { passive: false });

        modalImg.addEventListener('touchend', () => {
            panning = false;
            initialPinchDist = 0;
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                resetZoom();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-image-container')) {
                modal.style.display = "none";
                resetZoom();
            }
        });
    }

    // Modal Destaque (Avisos) Setup
    const modalDestaque = document.getElementById('modal-destaque');
    if (modalDestaque) {
        const closeBtnDestaque = modalDestaque.querySelector('.modal-destaque-close');
        const textCloseBtn = modalDestaque.querySelector('.modal-destaque-text-close');
        const textOverlay = modalDestaque.querySelector('.modal-destaque-text-overlay');

        if (closeBtnDestaque) {
            closeBtnDestaque.addEventListener('click', () => {
                modalDestaque.style.display = 'none';
            });
        }
        
        if (textCloseBtn && textOverlay) {
            textCloseBtn.addEventListener('click', () => {
                textOverlay.style.display = 'none';
            });
        }
    }

    // Lógica genérica para esconder/mostrar qualquer sidebar
    const sidebarToggleBtns = document.querySelectorAll('.sidebar-toggle-btn');
    sidebarToggleBtns.forEach(btn => {
        // Usar click para funcionar bem no mobile e no PC
        btn.addEventListener('click', (e) => {
            const sidebar = e.currentTarget.closest('.sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    });

    // Se a tela for de celular/tablet ao carregar, iniciar as sidebars recolhidas para não cobrir o conteúdo
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.sidebar').forEach(sidebar => {
            sidebar.classList.add('collapsed');
        });
    }

    // Lógica do Relógio Digital
    function updateClock() {
        const clockTime = document.getElementById('clock-time');
        const clockDate = document.getElementById('clock-date');
        
        if (clockTime && clockDate) {
            const now = new Date();
            
            // Hora formatada: 00:00:00
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockTime.textContent = `${hours}:${minutes}:${seconds}`;
            
            // Data formatada
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            clockDate.textContent = now.toLocaleDateString('pt-BR', options);
        }
    }
    
    // Inicia o relógio
    setInterval(updateClock, 1000);
    updateClock(); // Chama imediatamente para não esperar 1s

    // Restaura a aba salva ao recarregar a página
    const activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        switchGlobalView(activeTab);
    } else {
        switchGlobalView('view-inicio');
    }

    // Lógica da Tela de Login / Bloqueio
    const loginScreen = document.getElementById('login-screen');
    const loginPassword = document.getElementById('login-password');
    const loginSubmit = document.getElementById('login-submit');
    const loginError = document.getElementById('login-error');

    if (loginScreen) {
        // Relógio da tela de login
        const loginTime = document.getElementById('login-time');
        const loginDate = document.getElementById('login-date');
        
        function updateLoginClock() {
            if (loginTime && loginDate) {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                loginTime.textContent = `${hours}:${minutes}:${seconds}`;
                
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                loginDate.textContent = now.toLocaleDateString('pt-BR', options);
            }
        }
        setInterval(updateLoginClock, 1000);
        updateLoginClock();

        let inactivityTimer;
        let absoluteTimer;
        const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 min ausente
        const ABSOLUTE_LIMIT = 6 * 60 * 1000; // 6 min mexendo

        const isLocalHost = (function() {
            try {
                const proto = window.location.protocol;
                const host = window.location.hostname;
                return proto === 'file:' || 
                       host === 'localhost' || 
                       host === '127.0.0.1' || 
                       host === '' || 
                       host.endsWith('.local') || 
                       host.startsWith('192.168.') || 
                       host.startsWith('10.');
            } catch (e) {
                return false;
            }
        })();

        let isUnlocked = false;

        function lockScreen(animate = true) {
            isUnlocked = false;
            try {
                localStorage.removeItem('cbm_auth_unlocked');
                sessionStorage.removeItem('cbm_auth_unlocked');
                sessionStorage.removeItem('cbm_session_start');
                sessionStorage.removeItem('cbm_last_activity');
                document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            } catch (e) {}
            document.documentElement.classList.remove('cbm-unlocked');

            if (loginScreen) {
                loginScreen.style.display = 'flex';
                if (animate) {
                    setTimeout(() => {
                        loginScreen.style.opacity = '1';
                        loginScreen.style.visibility = 'visible';
                        loginScreen.style.pointerEvents = 'auto';
                    }, 10);
                } else {
                    loginScreen.style.opacity = '1';
                    loginScreen.style.visibility = 'visible';
                    loginScreen.style.pointerEvents = 'auto';
                }
            }
            document.body.classList.add('locked');
            const digitalClock = document.getElementById('digital-clock');
            if (digitalClock) digitalClock.style.display = 'none';
            if (loginPassword) {
                loginPassword.value = '';
                setTimeout(() => loginPassword.focus(), 150);
            }
            if (loginError) loginError.style.display = 'none';
            const formView = document.getElementById('cbm-form-view');
            const stepsView = document.getElementById('cbm-steps-view');
            const successView = document.getElementById('cbm-success-view');
            const deniedView = document.getElementById('cbm-denied-view');
            const loginFrame = document.getElementById('cbm-login-frame');
            if (formView) formView.style.display = 'flex';
            if (stepsView) stepsView.style.display = 'none';
            if (successView) successView.style.display = 'none';
            if (deniedView) deniedView.style.display = 'none';
            if (loginFrame) loginFrame.classList.remove('authorized');
            for (let s = 1; s <= 6; s++) {
                setStepState(s, 'pending', null);
            }
            stopTimers();
        }

        function startTimers() {
            // Desativado: o militar permanece autenticado até clicar manualmente no botão SAIR
        }

        function stopTimers() {
            clearTimeout(inactivityTimer);
            clearTimeout(absoluteTimer);
        }

        function resetInactivityTimer() {
            // Desativado: o militar permanece autenticado até clicar manualmente no botão SAIR
        }

        ['mousemove', 'mousedown', 'keypress', 'touchmove', 'scroll'].forEach(evt => 
            document.addEventListener(evt, resetInactivityTimer)
        );


        // Inicialização: a aplicação sempre inicia bloqueada exigindo a interação do crachá e o login militar
        lockScreen(false);

        // Tratamento de retorno da autorização do Discord
        const urlParams = new URLSearchParams(window.location.search);
        const discordAuthSuccess = urlParams.get('discord_auth') === 'success';
        const redirectedMilitarId = urlParams.get('militar_id');
        const authErrorParam = urlParams.get('auth_error');

        if (discordAuthSuccess && redirectedMilitarId) {
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => {
                const lanyardScreen = document.getElementById('cbm-lanyard-overlay');
                if (lanyardScreen) {
                    lanyardScreen.style.opacity = '0';
                    lanyardScreen.style.pointerEvents = 'none';
                    setTimeout(() => { lanyardScreen.style.display = 'none'; }, 400);
                }
                if (loginPassword) {
                    loginPassword.value = redirectedMilitarId;
                }
                setTimeout(() => {
                    handleLogin();
                }, 500);
            }, 200);
        } else if (authErrorParam) {
            window.history.replaceState({}, document.title, window.location.pathname);
            const lanyardScreen = document.getElementById('cbm-lanyard-overlay');
            if (lanyardScreen) {
                lanyardScreen.style.opacity = '0';
                lanyardScreen.style.pointerEvents = 'none';
                setTimeout(() => { lanyardScreen.style.display = 'none'; }, 400);
            }
            if (loginError) {
                loginError.textContent = decodeURIComponent(authErrorParam);
                loginError.style.display = 'block';
            }
        }

        function unlockApp() {
            isUnlocked = true;
            try {
                sessionStorage.setItem('cbm_auth_unlocked', 'true');
                localStorage.removeItem('cbm_auth_unlocked');
            } catch (e) {}

            if (loginError) loginError.style.display = 'none';
            if (loginScreen) {
                loginScreen.style.opacity = '0';
                loginScreen.style.pointerEvents = 'none';
                setTimeout(() => {
                    loginScreen.style.display = 'none';
                    loginScreen.style.visibility = 'hidden';
                    document.documentElement.classList.add('cbm-unlocked');
                    document.body.classList.remove('locked');
                    const digitalClock = document.getElementById('digital-clock');
                    if (digitalClock) digitalClock.style.display = 'block';
                    const btn = document.getElementById('login-submit');
                    if (btn) btn.disabled = false;
                    
                    // Disparar evento especial de login para mostrar o aviso
                    window.dispatchEvent(new CustomEvent('tabChanged', { detail: { targetId: 'login-event' } }));
                }, 500);
            } else {
                document.documentElement.classList.add('cbm-unlocked');
                document.body.classList.remove('locked');
                const digitalClock = document.getElementById('digital-clock');
                if (digitalClock) digitalClock.style.display = 'block';
                const btn = document.getElementById('login-submit');
                if (btn) btn.disabled = false;
            }
        }
        window.unlockApp = unlockApp;

        // Listener para evento de logout externo
        window.addEventListener('cbm_lock_screen', () => {
            lockScreen(true);
        });

        function setStepState(stepNumber, state, detailText) {
            const el = document.getElementById(`step-${stepNumber}`);
            if (!el) return;
            el.className = `cbm-step-item ${state}`;
            const iconEl = el.querySelector('.cbm-step-icon');
            const contentEl = el.querySelector('.cbm-step-content');
            
            if (iconEl) {
                if (state === 'success') {
                    iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                } else if (state === 'error') {
                    iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                } else {
                    iconEl.innerHTML = '';
                }
            }
            
            if (contentEl) {
                let detailEl = contentEl.querySelector('.cbm-step-detail');
                if (detailText) {
                    if (!detailEl) {
                        detailEl = document.createElement('div');
                        detailEl.className = 'cbm-step-detail';
                        contentEl.appendChild(detailEl);
                    }
                    detailEl.textContent = detailText;
                    if (state === 'error') {
                        detailEl.style.color = '#ff5565';
                    } else {
                        detailEl.style.color = '#00e676';
                    }
                } else if (detailEl) {
                    detailEl.remove();
                }
            }
        }

        let isAuthenticating = false;

        async function handleLogin() {
            if (isAuthenticating) return;

            const enteredValue = loginPassword ? loginPassword.value.trim() : '';
            const formView = document.getElementById('cbm-form-view');
            const stepsView = document.getElementById('cbm-steps-view');
            const successView = document.getElementById('cbm-success-view');
            const deniedView = document.getElementById('cbm-denied-view');
            const loginFrame = document.getElementById('cbm-login-frame');
            const inputWrap = document.getElementById('cbm-input-wrap');
            const btn = document.getElementById('login-submit');

            if (!enteredValue) {
                if (inputWrap) {
                    inputWrap.classList.add('has-error');
                    setTimeout(() => inputWrap.classList.remove('has-error'), 450);
                }
                if (loginError) {
                    loginError.textContent = "Por favor, digite seu ID militar.";
                    loginError.style.display = 'block';
                }
                if (loginPassword) loginPassword.focus();
                return;
            }

            isAuthenticating = true;
            if (btn) btn.disabled = true;
            if (loginPassword) loginPassword.disabled = true;
            if (loginError) loginError.style.display = 'none';

            // Muda visual para as Etapas de Autenticação Militar
            if (formView) formView.style.display = 'none';
            if (stepsView) stepsView.style.display = 'flex';
            if (successView) successView.style.display = 'none';
            if (deniedView) deniedView.style.display = 'none';
            if (loginFrame) loginFrame.classList.remove('authorized');

            // Prepara as 6 etapas no estado pendente
            for (let s = 1; s <= 6; s++) {
                setStepState(s, 'pending', null);
            }

            // Coleta identificação e HWID da máquina/dispositivo
            let deviceInfo = { hwid: 'default_hwid', deviceType: 'desktop', isMobile: false };
            try {
                if (typeof window.generateDeviceFingerprint === 'function') {
                    deviceInfo = await window.generateDeviceFingerprint();
                }
            } catch (fpErr) {
                console.warn('Erro ao gerar HWID:', fpErr);
            }

            // Dispara requisição real em segundo plano para o backend
            const authPromise = fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: enteredValue,
                    hwid: deviceInfo.hwid,
                    deviceType: deviceInfo.deviceType
                })
            }).then(async res => {
                const data = await res.json().catch(() => ({}));
                return { ok: res.ok, status: res.status, data };
            }).catch(err => {
                console.error("Falha ao comunicar com o servidor de auth:", err);
                return {
                    ok: false,
                    status: 503,
                    data: {
                        sucesso: false,
                        failedAtStep: 1,
                        erro: 'Falha de comunicação segura com o servidor.'
                    }
                };
            });

            // Execução sequencial das 6 etapas com cadência visual (~880ms por etapa = ~5.3s total)
            let authResult = null;
            let hadFailure = false;

            for (let stepIndex = 1; stepIndex <= 6; stepIndex++) {
                setStepState(stepIndex, 'loading');

                // Cadência para legibilidade tática
                await new Promise(r => setTimeout(r, 880));

                if (!authResult) {
                    authResult = await authPromise;
                }

                const data = authResult.data || {};
                const failedAt = data.failedAtStep;

                // Verifica se falhou nesta etapa
                const stepFailed = (failedAt === stepIndex) || (!authResult.ok && !data.steps && stepIndex === 1);

                if (stepFailed) {
                    hadFailure = true;
                    const errorMsg = data.erro || 'Falha na validação desta etapa.';
                    setStepState(stepIndex, 'error', errorMsg);

                    // Pula as etapas subsequentes
                    for (let rem = stepIndex + 1; rem <= 6; rem++) {
                        setStepState(rem, 'skipped');
                    }

                    // Aguarda o usuário ver a etapa que falhou com clareza
                    await new Promise(r => setTimeout(r, 1600));

                    // Exibe tela ACESSO NEGADO
                    if (stepsView) stepsView.style.display = 'none';
                    if (deniedView) deniedView.style.display = 'flex';
                    
                    const deniedMsg = document.getElementById('cbm-denied-msg');
                    const deniedDetail = document.getElementById('cbm-denied-detail');
                    const actionBtn = document.getElementById('btn-auth-action');
                    const actionBtnText = document.getElementById('btn-auth-action-text');

                    if (deniedMsg) {
                        deniedMsg.textContent = data.erro || "Não foi possível confirmar sua autorização de acesso.";
                    }

                    if (data.action && data.actionUrl && actionBtn) {
                        actionBtn.href = data.actionUrl;
                        if (data.actionUrl.startsWith('http')) {
                            actionBtn.target = '_blank';
                            actionBtn.rel = 'noopener noreferrer';
                        } else {
                            actionBtn.removeAttribute('target');
                            actionBtn.removeAttribute('rel');
                        }
                        actionBtn.style.display = 'flex';
                        if (actionBtnText) {
                            actionBtnText.textContent = data.actionLabel || 'PROSSEGUIR';
                        }
                    } else if (actionBtn) {
                        actionBtn.style.display = 'none';
                    }

                    if (deniedDetail) {
                        if (data.detail) {
                            deniedDetail.textContent = data.detail;
                        } else if (data.action === 'AUTHORIZE_BOT') {
                            deniedDetail.textContent = "Clique no botão abaixo para autorizar o Bot do CBM no seu Discord e vincular esta máquina.";
                        } else if (data.action === 'JOIN_DISCORD') {
                            deniedDetail.textContent = "Se você já está no Discord, certifique-se de que seu apelido no servidor termine com '#" + enteredValue + "'. Se ainda não entrou, clique abaixo para ingressar.";
                        } else if (data.action === 'HWID_LOCKED') {
                            deniedDetail.textContent = "Seu cadastro militar já possui uma máquina vinculada. Solicite ao Comando a liberação do dispositivo.";
                        } else {
                            deniedDetail.textContent = "Verifique seu ID militar ou entre em contato com o Comando para autorização.";
                        }
                    }

                    isAuthenticating = false;
                    return;
                } else {
                    // Etapa aprovada com sucesso!
                    const stepDetail = data.steps?.[stepIndex - 1]?.detail || null;
                    setStepState(stepIndex, 'success', stepDetail);
                }
            }

            // Se todas as 6 etapas passaram:
            if (!hadFailure && authResult && authResult.data && authResult.data.sucesso) {
                const data = authResult.data;
                await new Promise(r => setTimeout(r, 650));

                // Exibe tela ACESSO LIBERADO
                if (stepsView) stepsView.style.display = 'none';
                if (successView) successView.style.display = 'flex';
                if (loginFrame) loginFrame.classList.add('authorized');

                const militarNameEl = document.getElementById('cbm-auth-militar-name');
                if (militarNameEl) {
                    militarNameEl.textContent = data.userName || 'Combatente';
                }

                // Salva nome e ID no localStorage
                if (data.userName) {
                    localStorage.setItem('cbm_user_name', data.userName);
                }
                if (data.userId) {
                    localStorage.setItem('cbm_user_id', data.userId);
                }

                // Notifica as sidebars React
                window.dispatchEvent(new CustomEvent('userProfileUpdated', {
                    detail: { name: data.userName, id: data.userId }
                }));

                // Aguarda confirmação visual e libera o portal
                setTimeout(() => {
                    unlockApp();
                    setTimeout(() => {
                        if (formView) formView.style.display = 'flex';
                        if (stepsView) stepsView.style.display = 'none';
                        if (successView) successView.style.display = 'none';
                        if (deniedView) deniedView.style.display = 'none';
                        if (loginFrame) loginFrame.classList.remove('authorized');
                        if (loginPassword) {
                            loginPassword.disabled = false;
                            loginPassword.value = '';
                        }
                        if (btn) btn.disabled = false;
                        for (let s = 1; s <= 6; s++) {
                            setStepState(s, 'pending', null);
                        }
                        isAuthenticating = false;
                    }, 600);
                }, 1800);
            }
        }

        // Botão Tentar Novamente na tela de erro
        const retryBtn = document.getElementById('btn-auth-retry');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                const formView = document.getElementById('cbm-form-view');
                const stepsView = document.getElementById('cbm-steps-view');
                const successView = document.getElementById('cbm-success-view');
                const deniedView = document.getElementById('cbm-denied-view');
                const loginFrame = document.getElementById('cbm-login-frame');
                if (deniedView) deniedView.style.display = 'none';
                const actionBtn = document.getElementById('btn-auth-action');
                if (actionBtn) actionBtn.style.display = 'none';
                if (stepsView) stepsView.style.display = 'none';
                if (successView) successView.style.display = 'none';
                if (formView) formView.style.display = 'flex';
                if (loginFrame) loginFrame.classList.remove('authorized');
                for (let s = 1; s <= 6; s++) {
                    setStepState(s, 'pending', null);
                }
                if (loginPassword) {
                    loginPassword.disabled = false;
                    loginPassword.value = '';
                    loginPassword.focus();
                }
                const btn = document.getElementById('login-submit');
                if (btn) btn.disabled = false;
                isAuthenticating = false;
            });
        }

        if (loginSubmit) loginSubmit.addEventListener('click', handleLogin);
        if (loginPassword) {
            loginPassword.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleLogin();
                }
            });
        }
        // Permitir que ao apertar ENTER na tela de login entre normalmente ou tente novamente
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !isUnlocked && loginScreen && loginScreen.style.display !== 'none') {
                const deniedView = document.getElementById('cbm-denied-view');
                if (deniedView && deniedView.style.display === 'flex') {
                    e.preventDefault();
                    const retryBtnEl = document.getElementById('btn-auth-retry');
                    if (retryBtnEl) retryBtnEl.click();
                } else if (!isAuthenticating) {
                    e.preventDefault();
                    handleLogin();
                }
            }
        });
    }
};
// Gallery Folders Logic
function openGalleryFolder(folderName) {
    const galeriaMenu = document.getElementById('galeria-menu');
    const contentArea = document.getElementById('galeria-content-area');
    const contents = document.querySelectorAll('.gallery-content-tab');
    
    // Hide all tabs
    contents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // Hide menu and show content area
    if (galeriaMenu) galeriaMenu.style.display = 'none';
    if (contentArea) contentArea.style.display = 'block';

    // Show specific folder content
    const activeContent = document.getElementById(`galeria-${folderName}`);
    if (activeContent) {
        activeContent.style.display = 'block';
        setTimeout(() => {
            activeContent.classList.add('active');
        }, 10);
    }
}

function closeGalleryFolder() {
    const galeriaMenu = document.getElementById('galeria-menu');
    const contentArea = document.getElementById('galeria-content-area');
    
    // Show menu and hide content area
    if (galeriaMenu) galeriaMenu.style.display = 'grid'; // Using grid to maintain the cards-grid layout
    if (contentArea) contentArea.style.display = 'none';
}

// Custom Video Player Controls
function initCustomVideoPlayers() {
    document.querySelectorAll(".video-card").forEach((card) => {
        const video = card.querySelector(".gallery-video");
        if (!video) return;

        const centerPlay = card.querySelector(".center-play");
        const playButton = card.querySelector(".play-button");
        const muteButton = card.querySelector(".mute-button");
        const fullscreenButton = card.querySelector(".fullscreen-button");

        const progressBar = card.querySelector(".progress-bar");
        const volumeBar = card.querySelector(".volume-bar");

        const currentTimeElement = card.querySelector(".current-time");
        const durationElement = card.querySelector(".duration");

        function formatTime(seconds) {
            if (!Number.isFinite(seconds)) {
                return "0:00";
            }

            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60)
                .toString()
                .padStart(2, "0");

            return `${minutes}:${remainingSeconds}`;
        }

        function updatePlayButtons() {
            const paused = video.paused;

            if (playButton) {
                playButton.textContent = paused ? "▶" : "❚❚";
                playButton.setAttribute(
                    "aria-label",
                    paused ? "Reproduzir" : "Pausar"
                );
            }

            if (centerPlay) {
                centerPlay.hidden = !paused;
            }
        }

        async function togglePlay() {
            try {
                if (video.paused) {
                    await video.play();
                } else {
                    video.pause();
                }
            } catch (error) {
                console.error("Não foi possível reproduzir o vídeo:", error);
            }
        }

        function updateProgress() {
            if (!progressBar || !currentTimeElement) return;
            if (!Number.isFinite(video.duration) || video.duration <= 0) {
                progressBar.value = 0;
                currentTimeElement.textContent = "0:00";
                return;
            }

            progressBar.value = (video.currentTime / video.duration) * 100;
            currentTimeElement.textContent = formatTime(video.currentTime);
        }

        function updateVolumeButton() {
            if (!muteButton) return;
            const muted = video.muted || video.volume === 0;

            muteButton.textContent = muted ? "🔇" : "🔊";
            muteButton.setAttribute(
                "aria-label",
                muted ? "Ativar som" : "Desativar som"
            );
        }

        if (playButton) playButton.addEventListener("click", togglePlay);
        if (centerPlay) centerPlay.addEventListener("click", togglePlay);
        video.addEventListener("click", togglePlay);

        video.addEventListener("play", updatePlayButtons);
        video.addEventListener("pause", updatePlayButtons);
        video.addEventListener("ended", updatePlayButtons);

        video.addEventListener("loadedmetadata", () => {
            if (durationElement) durationElement.textContent = formatTime(video.duration);
            updateProgress();
        });

        video.addEventListener("timeupdate", updateProgress);

        if (progressBar) {
            progressBar.addEventListener("input", () => {
                if (!Number.isFinite(video.duration)) {
                    return;
                }

                video.currentTime =
                    (Number(progressBar.value) / 100) * video.duration;
            });
        }

        if (muteButton) {
            muteButton.addEventListener("click", () => {
                video.muted = !video.muted;
                updateVolumeButton();
            });
        }

        if (volumeBar) {
            volumeBar.addEventListener("input", () => {
                video.volume = Number(volumeBar.value);
                video.muted = video.volume === 0;
                updateVolumeButton();
            });
        }

        video.addEventListener("volumechange", () => {
            if (volumeBar) volumeBar.value = video.muted ? 0 : video.volume;
            updateVolumeButton();
        });

        if (fullscreenButton) {
            fullscreenButton.addEventListener("click", async () => {
                try {
                    if (!document.fullscreenElement) {
                        await card.requestFullscreen();
                    } else {
                        await document.exitFullscreen();
                    }
                } catch (error) {
                    console.error("Não foi possível ativar a tela cheia:", error);
                }
            });
        }

        updatePlayButtons();
        updateVolumeButton();
    });
}

window.initSecondaryApp = function() {
    initCustomVideoPlayers();

    // Alternar Efeitos Gráficos (Modo Desempenho / Olhinho)
    const btnToggleEffects = document.getElementById('btn-toggle-effects');
    if (btnToggleEffects) {
        const iconEyeOpen = btnToggleEffects.querySelector('.icon-eye-open');
        const iconEyeClosed = btnToggleEffects.querySelector('.icon-eye-closed');
        const effectsBtnText = btnToggleEffects.querySelector('.effects-btn-text');

        function updateEffectsUI(isNoEffects) {
            if (isNoEffects) {
                document.documentElement.classList.add('no-effects');
                document.body.classList.add('no-effects');
                if (iconEyeOpen) iconEyeOpen.style.display = 'none';
                if (iconEyeClosed) iconEyeClosed.style.display = 'inline-block';
                if (effectsBtnText) effectsBtnText.textContent = 'Efeitos: OFF';
                btnToggleEffects.title = 'Reativar Efeitos Gráficos (Modo Normal)';
            } else {
                document.documentElement.classList.remove('no-effects');
                document.body.classList.remove('no-effects');
                if (iconEyeOpen) iconEyeOpen.style.display = 'inline-block';
                if (iconEyeClosed) iconEyeClosed.style.display = 'none';
                if (effectsBtnText) effectsBtnText.textContent = 'Efeitos: ON';
                btnToggleEffects.title = 'Desativar Efeitos Gráficos (Modo Desempenho)';
            }
        }

        // Inicializar estado com base no localStorage ou classe existente no documentElement
        const initialNoEffects = localStorage.getItem('cbm-no-effects') === 'true' || document.documentElement.classList.contains('no-effects');
        updateEffectsUI(initialNoEffects);

        btnToggleEffects.addEventListener('click', () => {
            const currentNoEffects = document.documentElement.classList.contains('no-effects') || document.body.classList.contains('no-effects');
            const newNoEffects = !currentNoEffects;
            localStorage.setItem('cbm-no-effects', newNoEffects);
            updateEffectsUI(newNoEffects);
            window.dispatchEvent(new CustomEvent('userProfileUpdated', { detail: { noEffects: newNoEffects } }));
        });

        window.addEventListener('userProfileUpdated', (e) => {
            if (e.detail?.noEffects !== undefined) {
                updateEffectsUI(Boolean(e.detail.noEffects));
            }
        });
    }

    // Botão de Configurações no topo
    const btnNavConfig = document.getElementById('btn-nav-config');
    if (btnNavConfig) {
        btnNavConfig.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('openConfiguracoes'));
        });
    }

    // =========================================================================
    // Modal Aviso de Preços / Eventos (Abertura Inicial e ao Atualizar F5)
    // =========================================================================
    const modalPrecos = document.getElementById('modal-evento-precos');
    if (modalPrecos) {
        const closeBtn = document.getElementById('modal-evento-close');
        const backdrop = modalPrecos.querySelector('.modal-evento-backdrop');

        function openModalPrecos() {
            modalPrecos.classList.add('active');
            modalPrecos.setAttribute('aria-hidden', 'false');
        }

        function closeModalPrecos() {
            modalPrecos.classList.remove('active');
            modalPrecos.setAttribute('aria-hidden', 'true');
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModalPrecos);
        if (backdrop) backdrop.addEventListener('click', closeModalPrecos);
        modalPrecos.addEventListener('click', (e) => {
            if (e.target === modalPrecos) closeModalPrecos();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalPrecos.classList.contains('active')) {
                closeModalPrecos();
            }
        });

        function checkAndOpenModalPrecos() {
            const loginScreenEl = document.getElementById('login-screen');
            const isLocked = document.body.classList.contains('locked') || 
                (loginScreenEl && window.getComputedStyle(loginScreenEl).display !== 'none' && loginScreenEl.style.opacity !== '0');

            if (isLocked) {
                // Se a tela estiver bloqueada pelo login, aguarda o desbloqueio
                const handleUnlock = (e) => {
                    if (e.detail && e.detail.targetId === 'login-event') {
                        window.removeEventListener('tabChanged', handleUnlock);
                        setTimeout(openModalPrecos, 400);
                    }
                };
                window.addEventListener('tabChanged', handleUnlock);
            } else {
                // Já desbloqueado ou sem tela de login (primeiro acesso ou F5)
                setTimeout(openModalPrecos, 350);
            }
        }

        checkAndOpenModalPrecos();
    }

    // =========================================================================
    // Modal Interativo - Como Evoluir (RGB em Volta)
    // =========================================================================
    const modalEvoluir = document.getElementById('modal-evoluir');
    if (modalEvoluir) {
        const closeBtn = document.getElementById('modal-evoluir-close');
        const footerBtn = document.getElementById('modal-evoluir-btn-fechar');
        const tagEl = document.getElementById('modal-evoluir-tag');
        const tituloEl = document.getElementById('modal-evoluir-titulo');
        const tempoEl = document.getElementById('modal-evoluir-tempo');
        const cursosContainer = document.getElementById('modal-evoluir-cursos');
        const detalhesEl = document.getElementById('modal-evoluir-detalhes');
        const obsEl = document.getElementById('modal-evoluir-obs');
        const fraseEl = document.getElementById('modal-evoluir-frase');

        function openModalEvoluir(card) {
            const titulo = card.getAttribute('data-titulo') || '';
            const tempo = card.getAttribute('data-tempo') || '';
            const tipo = card.getAttribute('data-tipo') || '';
            const cursosStr = card.getAttribute('data-cursos') || '';
            const detalhes = card.getAttribute('data-detalhes') || '';
            const obs = card.getAttribute('data-obs') || '';
            const frase = card.getAttribute('data-frase') || '';

            if (tituloEl) tituloEl.textContent = titulo;
            if (tempoEl) tempoEl.textContent = tempo;
            if (detalhesEl) detalhesEl.innerHTML = detalhes;
            if (obsEl) obsEl.textContent = obs;
            if (fraseEl) fraseEl.textContent = `"${frase}"`;

            // Tag de Tipo/Tempo
            if (tagEl) {
                tagEl.className = '';
                if (tipo.includes('Mérito') || tempo.includes('Mérito')) {
                    tagEl.className = 'evoluir-badge-merito';
                    tagEl.innerHTML = '⭐ ' + tempo;
                    if (tempoEl) tempoEl.style.color = '#fbbf24';
                } else if (tipo.includes('Contratação') || tempo.includes('Contratação')) {
                    tagEl.className = 'evoluir-badge-contrato';
                    tagEl.innerHTML = '📌 ' + tempo;
                    if (tempoEl) tempoEl.style.color = '#34d399';
                } else {
                    tagEl.className = 'evoluir-badge-tempo';
                    tagEl.innerHTML = '⏱️ ' + tempo;
                    if (tempoEl) tempoEl.style.color = '#60a5fa';
                }
            }

            // Gerar badges de cursos
            if (cursosContainer) {
                cursosContainer.innerHTML = '';
                const cursosList = cursosStr.split(',').map(c => c.trim()).filter(Boolean);
                cursosList.forEach(curso => {
                    const badge = document.createElement('span');
                    badge.className = 'evoluir-tag-curso';
                    if (curso.includes('Modulação') || curso.includes('Externo') || curso.includes('Mod/Ext')) {
                        badge.classList.add('verde');
                    } else if (curso.includes('Aquático') || curso.includes('COER') || curso.includes('Aéreo') || curso.includes('Tripulante')) {
                        badge.classList.add('azul');
                    } else if (curso.includes('Mérito') || curso.includes('CNH') || curso.includes('Vistoria') || curso.includes('Recrutador')) {
                        badge.classList.add('dourado');
                    }
                    badge.textContent = curso;
                    cursosContainer.appendChild(badge);
                });
            }

            modalEvoluir.classList.add('active');
            modalEvoluir.setAttribute('aria-hidden', 'false');
        }

        function closeModalEvoluir() {
            modalEvoluir.classList.remove('active');
            modalEvoluir.setAttribute('aria-hidden', 'true');
        }

        document.querySelectorAll('.card-evoluir').forEach(card => {
            card.addEventListener('click', () => {
                openModalEvoluir(card);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModalEvoluir);
        if (footerBtn) footerBtn.addEventListener('click', closeModalEvoluir);

        modalEvoluir.addEventListener('click', (e) => {
            if (e.target === modalEvoluir) {
                closeModalEvoluir();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalEvoluir.classList.contains('active')) {
                closeModalEvoluir();
            }
        });
    }
};

// ==========================================
// SISTEMA ANTI-CLONAGEM (FRONT-END)
// ==========================================
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
    }
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) {
        e.preventDefault();
    }
});
