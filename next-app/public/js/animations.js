function initAnimations() {
    // 1. Animação Cinematográfica Inicial (Logo e Videos)
    const initCinematic = () => {
        // Animação da Logo inicial
        const logo = document.querySelector('#inicio-logo-container img');
        if (logo) {
            // Remove a animação CSS nativa para usar o AnimeJS
            logo.style.animation = 'none';
            anime({
                targets: logo,
                scale: [0.8, 1],
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 2500,
                easing: 'easeOutExpo',
                delay: 200
            });
        }

        // Efeito de pulso lento contínuo para a logo
        if (logo) {
            anime({
                targets: logo,
                scale: 1.02,
                duration: 3000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });
        }
        
        // Efeito de transição nos vídeos de fundo (Scale down suave)
        const videos = document.querySelectorAll('#video-sequence-container video');
        videos.forEach(video => {
            anime({
                targets: video,
                scale: [1.1, 1],
                duration: 10000,
                easing: 'easeOutQuad'
            });
        });
    };

    initCinematic();

    // 2. IntersectionObserver para todas as abas, cards de viaturas e imagens
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animeType = el.getAttribute('data-anime') || 'fade-up';
                const delay = el.getAttribute('data-delay') ? parseInt(el.getAttribute('data-delay')) : 0;
                
                if (animeType === 'fade-up') {
                    anime({
                        targets: el,
                        translateY: [40, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: delay
                    });
                } else if (animeType === 'scale') {
                    anime({
                        targets: el,
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutElastic(1, .8)',
                        delay: delay
                    });
                } else if (animeType === 'slide-right') {
                    anime({
                        targets: el,
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: delay
                    });
                } else if (animeType === 'viatura') {
                    // Efeito especial para viaturas
                    anime({
                        targets: el,
                        translateY: [50, 0],
                        scale: [0.95, 1],
                        opacity: [0, 1],
                        rotate: [-2, 0], // Leve rotação
                        duration: 1000,
                        easing: 'easeOutQuart',
                        delay: delay
                    });
                }
                
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Selecionar todos os elementos possíveis no site para animar
    // (Inclui viaturas, galerias, cards de regras, etc)
    const animatableElements = document.querySelectorAll('.card-evoluir, .info-card, .nav-item, .evoluir-card-titulo, .viatura-card, .galeria-item, .card, [id^="view-"] img:not(.sidebar-logo)');
    
    animatableElements.forEach((el, index) => {
        el.style.opacity = '0';
        
        if (el.classList.contains('card-evoluir') || el.classList.contains('card')) {
            el.setAttribute('data-anime', 'fade-up');
            el.setAttribute('data-delay', (index % 5) * 100);
        } else if (el.classList.contains('info-card')) {
            el.setAttribute('data-anime', 'scale');
        } else if (el.classList.contains('nav-item')) {
            el.setAttribute('data-anime', 'slide-right');
            el.setAttribute('data-delay', index * 50);
        } else if (el.classList.contains('viatura-card') || el.closest('#view-viaturas')) {
            // Se estiver na aba viaturas
            el.setAttribute('data-anime', 'viatura');
            el.setAttribute('data-delay', (index % 4) * 150);
        } else {
            el.setAttribute('data-anime', 'fade-up');
        }

        scrollObserver.observe(el);
    });

    // 3. Efeito Magnético em Botões e Cards de Viaturas
    const interactiveElements = document.querySelectorAll('.evoluir-btn-modal, .nav-item, .viatura-card, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Reduz o peso do magnético para cards maiores
            const isLarge = el.classList.contains('card');
            const factor = isLarge ? 0.05 : 0.2;

            anime({
                targets: el,
                translateX: x * factor,
                translateY: y * factor,
                scale: 1.02,
                duration: 100,
                easing: 'linear'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            anime({
                targets: el,
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // 4. Parallax no Scroll das Abas
    const mainContents = document.querySelectorAll('.main-content, .global-view');
    mainContents.forEach(main => {
        main.addEventListener('scroll', () => {
            const scrollPos = main.scrollTop;
            
            // Parallax sutil no fundo e icones
            anime({
                targets: '.background-overlay',
                translateY: scrollPos * 0.3,
                duration: 0,
                easing: 'linear'
            });
            
            // Rotação da logo da sidebar baseada no scroll
            anime({
                targets: '.sidebar-logo',
                rotate: scrollPos * 0.05,
                duration: 0,
                easing: 'linear'
            });
        });
    });

    // 5. Interceptar as trocas de Aba para resetar animações dos cards visíveis
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Pequeno delay para esperar a nova aba ficar ativa
            setTimeout(() => {
                const activeView = document.querySelector('.global-view.active');
                if (activeView) {
                    const viewElements = activeView.querySelectorAll('.card-evoluir, .info-card, .viatura-card, .card, img:not(.sidebar-logo)');
                    viewElements.forEach(el => {
                        el.style.opacity = '0';
                        scrollObserver.unobserve(el);
                        scrollObserver.observe(el); // Re-observa para disparar animação de entrada
                    });
                }
            }, 50);
        });
    });
};
