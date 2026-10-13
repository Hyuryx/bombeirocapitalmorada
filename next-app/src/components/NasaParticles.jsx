'use client';

import React, { useEffect, useRef } from 'react';

export const NASA_PARTICLES_CONFIG = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ff0000"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: {
        distance: 400,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

export default function NasaParticles({ id = 'particles-bg', style = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let timer;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      if (typeof window !== 'undefined' && typeof window.particlesJS === 'function') {
        const domTarget = document.getElementById(id);
        if (!domTarget) {
          timer = setTimeout(init, 60);
          return;
        }

        if (!Array.isArray(window.pJSDom)) {
          window.pJSDom = [];
        }

        const isMobile = window.innerWidth < 768;
        const config = JSON.parse(JSON.stringify(NASA_PARTICLES_CONFIG));
        if (isMobile) {
          config.particles.number.value = 85;
        }

        try {
          window.particlesJS(id, config);
        } catch (err) {
          console.warn('Erro ao inicializar particlesJS:', err);
        }
      } else {
        timer = setTimeout(init, 75);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (typeof window !== 'undefined') {
        if (!Array.isArray(window.pJSDom)) {
          window.pJSDom = [];
        }
        const idx = window.pJSDom.findIndex(item => {
          return item && item.pJS && item.pJS.canvas && item.pJS.canvas.el && (
            item.pJS.canvas.el.closest ? item.pJS.canvas.el.closest(`#${id}`) : false
          );
        });
        if (idx !== -1) {
          try {
            const item = window.pJSDom[idx];
            if (item && item.pJS) {
              if (item.pJS.fn && item.pJS.fn.drawAnimFrame) {
                cancelAnimationFrame(item.pJS.fn.drawAnimFrame);
              }
              if (item.pJS.canvas && item.pJS.canvas.el && item.pJS.canvas.el.parentNode) {
                item.pJS.canvas.el.parentNode.removeChild(item.pJS.canvas.el);
              }
            }
          } catch (e) {}
          window.pJSDom.splice(idx, 1);
        }
      }
    };
  }, [id]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={`nasa-particles-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style
      }}
    />
  );
}
