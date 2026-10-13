'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import './FuturisticLogin.css';

export default function FuturisticLogin({
  emblemSrc = '/assets/fotos/logo-capital.png',
  brandName = 'CAPITAL MORADA',
  onAuthorized,
}) {
  const mountRef = useRef(null);

  // Fases Estritas da Animação:
  // 'intro' (notebook fechado -> abrindo -> câmera aproximando)
  // 'transition' (tela preencheu 100% do enquadramento, pulso cinematográfico)
  // 'login' (único formulário definitivo ativo e pronto para interação)
  const [scenePhase, setScenePhase] = useState('intro'); // 'intro' | 'transition' | 'login'
  const [timelineProgress, setTimelineProgress] = useState(0); // 0.0 a 1.0
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isAutoPlayingRef = useRef(false);
  const autoPlayTimerRef = useRef(null);
  const flightAnimRef = useRef(null);

  // Estados de Autenticação
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authStage, setAuthStage] = useState('form'); // 'form' | 'checking' | 'authorized' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Relógio e Data em tempo real
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const passwordInputRef = useRef(null);

  // Efeitos Sonoros Web Audio API
  const playSound = useCallback((type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'transition') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'success') {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.setValueAtTime(659.25, now + 0.09);
        osc1.frequency.setValueAtTime(783.99, now + 0.18);
        osc2.frequency.setValueAtTime(1046.5, now + 0.27);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.55);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start(now + 0.27);
        osc1.stop(now + 0.27);
        osc2.stop(now + 0.55);
      } else if (type === 'error') {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(130, now + 0.14);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.28);
      }
    } catch (e) {}
  }, []);

  // Relógio do HUD
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateStr = now.toLocaleDateString('pt-BR', options);
      setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Inicialização e Trava do Body
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local');

    if (!isLocal) {
      const isSessionStored = sessionStorage.getItem('cbm_auth_unlocked') === 'true';
      if (isSessionStored) {
        document.documentElement.classList.add('cbm-unlocked');
        document.body.classList.remove('locked');
        setIsUnlocked(true);
        return;
      }
    }

    document.body.classList.add('locked');
    document.documentElement.classList.remove('cbm-unlocked');
  }, []);

  // =========================================================================
  // CENÁRIO TRIDIMENSIONAL THREE.JS REALISTA
  // =========================================================================
  useEffect(() => {
    if (!mountRef.current || isUnlocked) return;

    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050609, 0.038);

    const fov = isMobile ? 52 : 38;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 1.45, 4.4);
    camera.lookAt(0, 0.22, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Iluminação Cinematográfica (Conforme Referência)
    const ambientLight = new THREE.AmbientLight(0x1a0c10, 1.2);
    scene.add(ambientLight);

    // Luz de recorte traseira vermelha intensa (Rim light)
    const rimLight = new THREE.DirectionalLight(0xff2235, 4.5);
    rimLight.position.set(-3.8, 4.2, -3.2);
    scene.add(rimLight);

    // Luz de preenchimento frontal suave para acabamento metálico
    const keyLight = new THREE.DirectionalLight(0xffe8e8, 1.4);
    keyLight.position.set(2.8, 4.5, 4.2);
    scene.add(keyLight);

    // Luz neon no chão sob o notebook (Underglow)
    const underGlow = new THREE.PointLight(0xff182b, 5.5, 8.0);
    underGlow.position.set(0, 0.06, 0);
    scene.add(underGlow);

    // Luz emitida pela tela do notebook (acende com a abertura)
    const screenGlowLight = new THREE.PointLight(0xff2638, 0, 5.5);
    screenGlowLight.position.set(0, 1.15, -0.6);
    scene.add(screenGlowLight);

    // 3. Piso Metálico Reflexivo e Linha de Luz no Chão (Frame 1)
    const floorGeo = new THREE.PlaneGeometry(32, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07080c,
      roughness: 0.28,
      metalness: 0.90,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    scene.add(floorMesh);

    // Linha de luz vermelha embutida no piso
    const floorLine = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xff2638 })
    );
    floorLine.rotation.x = -Math.PI / 2;
    floorLine.position.set(0, 0.001, 1.45);
    scene.add(floorLine);

    // Brilho difuso radial no chão
    const discMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7.0, 5.2),
      new THREE.MeshBasicMaterial({ color: 0xff1628, transparent: true, opacity: 0.32 })
    );
    discMesh.rotation.x = -Math.PI / 2;
    discMesh.position.set(0, 0.002, 0);
    scene.add(discMesh);

    // 4. FUMAÇA VOLUMÉTRICA PROCEDURAL (Camadas de fumaça vermelha orgânica em movimento)
    const createSmokeParticleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(255, 45, 65, 0.9)');
      g.addColorStop(0.3, 'rgba(210, 25, 45, 0.55)');
      g.addColorStop(0.7, 'rgba(120, 10, 25, 0.18)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      return tex;
    };
    const smokeTexture = createSmokeParticleTexture();

    const smokeGroup = new THREE.Group();
    scene.add(smokeGroup);

    const smokePlanes = [];
    const smokeCount = 14;
    for (let i = 0; i < smokeCount; i++) {
      const size = 5.5 + Math.random() * 3.5;
      const smokeGeo = new THREE.PlaneGeometry(size, size);
      const smokeMat = new THREE.MeshBasicMaterial({
        map: smokeTexture,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
      // Espalhar ao redor e principalmente atrás do notebook
      const angle = (i / smokeCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 2.8;
      smokeMesh.position.set(
        Math.cos(angle) * radius,
        0.4 + Math.random() * 1.8,
        -1.2 + Math.sin(angle) * 2.2
      );
      smokeMesh.rotation.z = Math.random() * Math.PI * 2;
      smokeGroup.add(smokeMesh);

      smokePlanes.push({
        mesh: smokeMesh,
        baseX: smokeMesh.position.x,
        baseY: smokeMesh.position.y,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        swaySpeed: 0.3 + Math.random() * 0.4,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    // Partículas de brasas incandescentes subindo lentamente
    const emberCount = 65;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount * 3; i += 3) {
      emberPos[i] = (Math.random() - 0.5) * 9;
      emberPos[i + 1] = Math.random() * 4.2;
      emberPos[i + 2] = (Math.random() - 0.5) * 7;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xff3b4b,
      size: 0.042,
      transparent: true,
      opacity: 0.7,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // 5. Carregamento do Brasão Oficial
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(emblemSrc);
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // 6. MONTAGEM REALISTA DO NOTEBOOK 3D (Corpo Robusto, Acabamento Premium e Luzes)
    const laptopGroup = new THREE.Group();
    const initialLaptopAngle = -0.38; // Ângulo 3/4 diagonal inicial conforme Frame 2
    laptopGroup.rotation.y = initialLaptopAngle;
    scene.add(laptopGroup);

    // Materiais Metálicos
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111216,
      roughness: 0.28,
      metalness: 0.88,
    });
    const innerDeckMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d11,
      roughness: 0.35,
      metalness: 0.82,
    });
    const ledRedMat = new THREE.MeshBasicMaterial({ color: 0xff2638 });

    // =======================================================================
    // A. BASE DO NOTEBOOK
    // Largura: 3.2, Altura: 0.09, Profundidade: 2.1
    // =======================================================================
    const baseGroup = new THREE.Group();
    laptopGroup.add(baseGroup);

    // Chassi principal da base
    const baseChassis = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.09, 2.1), darkMetalMat);
    baseChassis.position.set(0, 0.045, 0);
    baseGroup.add(baseChassis);

    // Fitas de LED embutidas (Frontal e Laterais)
    const frontLed = new THREE.Mesh(new THREE.BoxGeometry(3.18, 0.02, 0.03), ledRedMat);
    frontLed.position.set(0, 0.055, 1.05);
    baseGroup.add(frontLed);

    const leftLed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 2.06), ledRedMat);
    leftLed.position.set(-1.59, 0.055, 0);
    baseGroup.add(leftLed);

    const rightLed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 2.06), ledRedMat);
    rightLed.position.set(1.59, 0.055, 0);
    baseGroup.add(rightLed);

    // Bandeja rebaixada do teclado
    const deckTray = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.015, 1.44), innerDeckMat);
    deckTray.position.set(0, 0.088, 0.15);
    baseGroup.add(deckTray);

    // Textura do Teclado com Teclas Físicas Iluminadas
    const keyCanvas = document.createElement('canvas');
    keyCanvas.width = 1024;
    keyCanvas.height = 512;
    const kctx = keyCanvas.getContext('2d');
    if (kctx) {
      kctx.fillStyle = '#08080c';
      kctx.fillRect(0, 0, 1024, 512);

      // Moldura do teclado
      kctx.strokeStyle = 'rgba(255, 38, 56, 0.45)';
      kctx.lineWidth = 3;
      kctx.strokeRect(16, 16, 992, 330);

      // Teclas individuais com iluminação vermelha
      const rows = 5;
      const cols = 15;
      const kw = 52;
      const kh = 48;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = 46 + c * 62;
          const y = 32 + r * 58;

          // Sombra da tecla
          kctx.fillStyle = '#0a0a0f';
          kctx.fillRect(x, y, kw, kh);

          // Contorno da tecla
          kctx.strokeStyle = '#ff2638';
          kctx.lineWidth = 2;
          kctx.strokeRect(x, y, kw, kh);

          // LED central da tecla
          kctx.fillStyle = '#ff4254';
          kctx.fillRect(x + 18, y + 18, 16, 12);
        }
      }

      // Touchpad com borda sutil
      kctx.strokeStyle = 'rgba(255, 38, 56, 0.55)';
      kctx.lineWidth = 2;
      kctx.strokeRect(362, 366, 300, 124);
      kctx.fillStyle = '#0f1016';
      kctx.fillRect(364, 368, 296, 120);
    }
    const keyboardTex = new THREE.CanvasTexture(keyCanvas);
    const keyboardMat = new THREE.MeshBasicMaterial({ map: keyboardTex });
    const keyboardPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.4), keyboardMat);
    keyboardPlane.rotation.x = -Math.PI / 2;
    keyboardPlane.position.set(0, 0.096, 0.15);
    baseGroup.add(keyboardPlane);

    // =======================================================================
    // B. PIVÔ DA DOBRADIÇA E TAMPA DO NOTEBOOK
    // O pivô fica exatamente na borda traseira superior da base: (0, 0.09, -1.05)
    // =======================================================================
    const hingeGroup = new THREE.Group();
    hingeGroup.position.set(0, 0.09, -1.05);
    laptopGroup.add(hingeGroup);

    // Cilindro da dobradiça
    const hingeCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 3.1, 16),
      darkMetalMat
    );
    hingeCylinder.rotation.z = Math.PI / 2;
    hingeGroup.add(hingeCylinder);

    // Anéis de acabamento vermelho nas pontas
    const hingeRingL = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.08, 16), ledRedMat);
    hingeRingL.rotation.z = Math.PI / 2;
    hingeRingL.position.x = -1.5;
    hingeGroup.add(hingeRingL);

    const hingeRingR = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.08, 16), ledRedMat);
    hingeRingR.rotation.z = Math.PI / 2;
    hingeRingR.position.x = 1.5;
    hingeGroup.add(hingeRingR);

    // =======================================================================
    // GRUPO DA TAMPA (Filho do Pivô da Dobradiça)
    // Quando hingeGroup.rotation.x = 0, a tampa repousa DEITADA sobre a base (+Z)!
    // Centro local da tampa: (0, 0.03, 1.05)
    // =======================================================================
    const lidGroup = new THREE.Group();
    hingeGroup.add(lidGroup);

    // Corpo metálico da tampa
    const lidChassis = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 2.1), darkMetalMat);
    lidChassis.position.set(0, 0.03, 1.05);
    lidGroup.add(lidChassis);

    // Fitas de LED na tampa
    const lidTopLed = new THREE.Mesh(new THREE.BoxGeometry(3.18, 0.02, 0.03), ledRedMat);
    lidTopLed.position.set(0, 0.03, 2.09);
    lidGroup.add(lidTopLed);

    const lidLeftLed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 2.08), ledRedMat);
    lidLeftLed.position.set(-1.59, 0.03, 1.05);
    lidGroup.add(lidLeftLed);

    const lidRightLed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 2.08), ledRedMat);
    lidRightLed.position.set(1.59, 0.03, 1.05);
    lidGroup.add(lidRightLed);

    // 1. LOGO OFICIAL NA PARTE EXTERNA DA TAMPA (Frame 2 da referência)
    // Face superior da tampa quando fechada: y = 0.061
    const lidLogoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      side: THREE.FrontSide,
    });
    const lidLogoMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), lidLogoMat);
    lidLogoMesh.position.set(0, 0.061, 1.05);
    lidLogoMesh.rotation.x = -Math.PI / 2;
    lidGroup.add(lidLogoMesh);

    // 2. TELA DO NOTEBOOK NA PARTE INTERNA DA TAMPA (Frames 3 e 4 da referência)
    // Face inferior da tampa quando fechada: y = -0.001
    // IMPORTANTE (REGRA PRINCIPAL): Esta tela exibe EXCLUSIVAMENTE a identidade visual de abertura!
    // NENHUM formulário duplicado ou campo de senha desenhado na textura 3D!
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1280;
    screenCanvas.height = 720;
    const sctx = screenCanvas.getContext('2d');

    const drawCleanScreenContent = () => {
      if (!sctx) return;
      // Fundo preto absoluto tecnológico
      sctx.fillStyle = '#050609';
      sctx.fillRect(0, 0, 1280, 720);

      // Grade HUD sutil
      sctx.strokeStyle = 'rgba(255, 38, 56, 0.12)';
      sctx.lineWidth = 1;
      for (let x = 0; x < 1280; x += 40) {
        sctx.beginPath();
        sctx.moveTo(x, 0);
        sctx.lineTo(x, 720);
        sctx.stroke();
      }
      for (let y = 0; y < 720; y += 40) {
        sctx.beginPath();
        sctx.moveTo(0, y);
        sctx.lineTo(1280, y);
        sctx.stroke();
      }

      // Moldura de contorno e cantoneiras HUD vermelhas
      sctx.strokeStyle = '#ff2638';
      sctx.lineWidth = 3;
      sctx.strokeRect(36, 36, 1208, 648);

      sctx.fillStyle = '#ff2638';
      sctx.fillRect(30, 30, 42, 8);
      sctx.fillRect(30, 30, 8, 42);
      sctx.fillRect(1208, 30, 42, 8);
      sctx.fillRect(1242, 30, 8, 42);
      sctx.fillRect(30, 682, 42, 8);
      sctx.fillRect(30, 648, 8, 42);
      sctx.fillRect(1208, 682, 42, 8);
      sctx.fillRect(1242, 648, 8, 42);

      // Desenhar o brasão oficial dos Bombeiros centralizado com halo vermelho
      const img = new Image();
      img.src = emblemSrc;
      img.onload = () => {
        try {
          // Halo circular vermelho
          sctx.beginPath();
          sctx.arc(640, 290, 115, 0, Math.PI * 2);
          sctx.strokeStyle = 'rgba(255, 38, 56, 0.7)';
          sctx.lineWidth = 3;
          sctx.stroke();

          sctx.drawImage(img, 640 - 95, 290 - 95, 190, 190);
          screenTex.needsUpdate = true;
        } catch (e) {}
      };

      // Título Institucional Oficial
      sctx.font = '800 36px Rajdhani, sans-serif';
      sctx.fillStyle = '#ffffff';
      sctx.textAlign = 'center';
      sctx.fillText('CORPO DE BOMBEIROS', 640, 440);

      sctx.font = '700 16px Rajdhani, sans-serif';
      sctx.fillStyle = '#ff3b4a';
      sctx.fillText('CAPITAL MORADA', 640, 475);

      // Slogan Oficial
      sctx.font = '600 14px Rajdhani, sans-serif';
      sctx.fillStyle = '#9a9ba7';
      sctx.fillText('“VIDAS ALHEIAS E RIQUEZAS SALVAR”', 640, 560);

      // Linha de status operacional
      sctx.font = '700 12px Rajdhani, monospace';
      sctx.fillStyle = 'rgba(255, 38, 56, 0.8)';
      sctx.fillText('CENTRAL DE OPERAÇÕES // SISTEMA SEGURO INICIALIZADO', 640, 630);
    };
    drawCleanScreenContent();

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTex,
      transparent: true,
      opacity: 0, // Desligada enquanto o notebook estiver fechado
    });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.05, 1.95), screenMat);
    screenMesh.position.set(0, -0.001, 1.05);
    screenMesh.rotation.x = Math.PI / 2;
    lidGroup.add(screenMesh);

    // 7. Loop de Renderização e Animação Cinematográfica
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Movimento lento e orgânico da fumaça volumétrica
      smokePlanes.forEach((s) => {
        s.mesh.rotation.z += s.rotSpeed * delta;
        s.mesh.position.x = s.baseX + Math.sin(time * s.swaySpeed + s.swayOffset) * 0.25;
        s.mesh.position.y = s.baseY + Math.cos(time * s.swaySpeed * 0.8 + s.swayOffset) * 0.15;
      });

      // Flutuação das brasas incandescentes
      embers.rotation.y = time * 0.02;

      // Interpolação suave do progresso (LERP)
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.085;
        const p = Math.min(1, Math.max(0, currentProgressRef.current));
        setTimelineProgress(p);

        // Transição de fases estritas:
        // A tela de login definitiva SÓ APARECE no final absoluto da aproximação
        if (p >= 0.94) {
          setScenePhase('login');
        } else if (p >= 0.86) {
          setScenePhase('transition');
        } else {
          setScenePhase('intro');
        }
      }

      const p = currentProgressRef.current;

      // =====================================================================
      // FÍSICA E SEQUÊNCIA CINEMATOGRÁFICA
      // =====================================================================
      // ETAPA 1 & 2: Notebook fechado (p de 0.0 a 0.18)
      // ETAPA 3: Abertura física da tampa (p de 0.18 a 0.55) -> 0 a -108 graus
      const lidOpenT = Math.min(1, Math.max(0, (p - 0.18) / 0.38));
      const easedLid =
        lidOpenT < 0.5 ? 2 * lidOpenT * lidOpenT : 1 - Math.pow(-2 * lidOpenT + 2, 2) / 2;
      const targetLidAngle = -easedLid * (Math.PI * 0.60); // -108 graus
      hingeGroup.rotation.x = targetLidAngle;

      // Tela acende e ilumina o teclado conforme abre
      screenMat.opacity = Math.min(1, lidOpenT * 1.6);
      screenGlowLight.intensity = lidOpenT * 3.8;

      // ETAPA 4 & 5: Aproximação contínua da câmera (DOLLY ZOOM na tela)
      // O notebook se alinha de frente para a câmera
      const alignT = Math.min(1, Math.max(0, (p - 0.45) / 0.45));
      laptopGroup.rotation.y = initialLaptopAngle * (1 - alignT);

      const zoomT = Math.min(1, Math.max(0, (p - 0.48) / 0.52));
      const easedZoom = Math.pow(zoomT, 1.7);

      const startCamY = isMobile ? 1.65 : 1.45;
      const startCamZ = isMobile ? 5.3 : 4.4;

      // A câmera viaja até mergulhar diretamente no centro da tela (-0.68)
      const camY = startCamY - easedZoom * (startCamY - 1.15);
      const camZ = startCamZ - easedZoom * (startCamZ - (-0.68));
      camera.position.set(0, camY, camZ);

      const targetLookAtY = 0.22 + easedZoom * (1.08 - 0.22);
      const targetLookAtZ = 0.0 + easedZoom * (-1.40 - 0.0);
      camera.lookAt(0, targetLookAtY, targetLookAtZ);

      // Renderização
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const mobile = width < 768;
      camera.fov = mobile ? 52 : 38;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [emblemSrc, isUnlocked]);

  // =========================================================================
  // AUTOMAÇÃO CINEMATOGRÁFICA E GESTOS
  // =========================================================================
  useEffect(() => {
    if (isUnlocked) return;

    // Voo automático após 1.4s
    autoPlayTimerRef.current = setTimeout(() => {
      if (!isAutoPlayingRef.current && targetProgressRef.current < 0.1) {
        startSmoothCinematicFlight();
      }
    }, 1400);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isUnlocked]);

  const startSmoothCinematicFlight = () => {
    isAutoPlayingRef.current = true;
    const startTime = performance.now();
    const duration = 4000; // 4.0s de voo cinematográfico
    const startP = currentProgressRef.current;

    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = ease(t);
      const val = startP + (1 - startP) * eased;

      targetProgressRef.current = val;

      if (t < 1 && !isUnlocked) {
        flightAnimRef.current = requestAnimationFrame(step);
      }
    };

    flightAnimRef.current = requestAnimationFrame(step);
  };

  // Scroll do Mouse e Touch
  useEffect(() => {
    if (isUnlocked || isExiting) return;

    const handleWheel = (e) => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (flightAnimRef.current) cancelAnimationFrame(flightAnimRef.current);
      isAutoPlayingRef.current = false;

      const delta = e.deltaY * 0.0018;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
    };

    let touchY = 0;
    const handleTouchStart = (e) => {
      touchY = e.touches[0].clientY;
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (flightAnimRef.current) cancelAnimationFrame(flightAnimRef.current);
      isAutoPlayingRef.current = false;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const diff = touchY - currentY;
      touchY = currentY;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + diff * 0.006));
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isUnlocked, isExiting]);

  // Foco no campo de senha no momento exato em que a tela definitiva aparece
  useEffect(() => {
    if (scenePhase === 'login' && passwordInputRef.current) {
      playSound('transition');
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 200);
    }
  }, [scenePhase, playSound]);

  // Pular direto para a tela definitiva de login
  const skipToLoginForm = () => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    if (flightAnimRef.current) cancelAnimationFrame(flightAnimRef.current);
    targetProgressRef.current = 1;
    currentProgressRef.current = 1;
    setTimelineProgress(1);
    setScenePhase('login');
  };

  // Liberação do Portal (Fase 7 & 8)
  const completeUnlock = useCallback(() => {
    playSound('success');
    setAuthStage('authorized');

    setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        sessionStorage.setItem('cbm_auth_unlocked', 'true');
        sessionStorage.setItem('cbm_session_start', Date.now().toString());
        sessionStorage.setItem('cbm_last_activity', Date.now().toString());

        document.documentElement.classList.add('cbm-unlocked');
        document.body.classList.remove('locked');

        window.dispatchEvent(new CustomEvent('tabChanged', { detail: { targetId: 'login-event' } }));

        if (onAuthorized) onAuthorized();
        setIsUnlocked(true);
      }, 700);
    }, 900);
  }, [playSound, onAuthorized]);

  // Submissão do Formulário de Senha (Preservação da Autenticação Existente)
  const handleAuthSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (authStage === 'checking' || authStage === 'authorized') return;

      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.endsWith('.local'));

      setAuthStage('checking');
      setErrorMessage('');
      playSound('click');

      // No LOCALHOST: libera instantaneamente ao clicar ou apertar Enter
      if (isLocalhost) {
        setTimeout(() => {
          completeUnlock();
        }, 550);
        return;
      }

      // Em PRODUÇÃO: validação real com a API existente
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          completeUnlock();
        } else {
          playSound('error');
          setAuthStage('error');
          setErrorMessage('Senha não reconhecida. Verifique e tente novamente.');
          setPassword('');
          setTimeout(() => passwordInputRef.current?.focus(), 120);
        }
      } catch (err) {
        if (password.trim().toUpperCase() === 'HONRA' || password.trim().toUpperCase() === 'MORADA') {
          completeUnlock();
        } else {
          playSound('error');
          setAuthStage('error');
          setErrorMessage('Erro ao conectar com o servidor.');
        }
      }
    },
    [authStage, password, playSound, completeUnlock]
  );

  // Escuta global do ENTER
  useEffect(() => {
    if (isUnlocked || isExiting) return;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const isLocalhost =
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.endsWith('.local');

        if (scenePhase === 'login') {
          handleAuthSubmit(e);
        } else {
          // Se apertar ENTER durante a intro:
          if (isLocalhost) {
            skipToLoginForm();
            setTimeout(() => {
              completeUnlock();
            }, 300);
          } else {
            skipToLoginForm();
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isUnlocked, isExiting, scenePhase, handleAuthSubmit, completeUnlock]);

  if (isUnlocked) return null;

  return (
    <div className={`cbm-cinematic-container ${isExiting ? 'is-unlocked' : ''}`}>
      {/* 1. Canvas 3D Three.js */}
      <div ref={mountRef} className="cbm-webgl-canvas" />

      {/* 2. Filtros e Vinheta Cinematográfica */}
      <div className="cbm-vignette" />
      <div className="cbm-scanline-fx" />

      {/* Flash Cinematográfico de Transição */}
      <div className={`cbm-transition-flash ${scenePhase === 'transition' ? 'active' : ''}`} />

      {/* 3. Barra Superior HUD */}
      <header className="cbm-hud-topbar" style={{ opacity: scenePhase === 'login' ? 0.4 : 1 }}>
        <div className="cbm-hud-brand">
          <i />
          <span>{brandName}</span>
        </div>

        <div className="cbm-hud-clock-pill">
          <span className="cbm-hud-clock">{currentTime || '00:00:00'}</span>
          <span className="cbm-hud-date">{currentDate || 'CBM Operacional'}</span>
        </div>

        <div>
          {scenePhase !== 'login' && (
            <button className="cbm-hud-skip-btn" onClick={skipToLoginForm} type="button">
              PULAR INTRO ↗
            </button>
          )}
        </div>
      </header>

      {/* ====================================================================
          4. ÚNICA TELA DEFINITIVA DE LOGIN (REGRA PRINCIPAL)
          Só é renderizada no DOM e visível após a transição da câmera na tela!
          Zero duplicação, zero formulários flutuando em cima de outro.
          ==================================================================== */}
      <div
        className={`cbm-login-panel-layer ${scenePhase === 'login' ? 'is-active' : ''}`}
        aria-hidden={scenePhase !== 'login'}
      >
        <div className={`cbm-login-screen-frame ${authStage === 'authorized' ? 'authorized' : ''}`}>
          {/* Cantoneiras HUD Vermelhas */}
          <span className="cbm-corner cbm-tl" />
          <span className="cbm-corner cbm-tr" />
          <span className="cbm-corner cbm-bl" />
          <span className="cbm-corner cbm-br" />

          {/* Brasão Oficial dos Bombeiros com Halo de Luz */}
          <div className="cbm-badge-wrap">
            <div className="cbm-badge-halo" />
            <img className="cbm-badge-img" src={emblemSrc} alt="Brasão Oficial Corpo de Bombeiros" />
          </div>

          {/* Identificação Institucional */}
          <div className="cbm-title-group">
            <h2>CORPO DE BOMBEIROS</h2>
            <p>CAPITAL MORADA</p>
          </div>

          {/* Estados de Autenticação */}
          {authStage === 'checking' ? (
            /* FASE 6 DA REFERÊNCIA — AUTENTICAÇÃO COM SPINNER NEON */
            <div className="cbm-auth-feedback-box">
              <p className="cbm-verifying-text">CORPO DE BOMBEIROS... VERIFICANDO ACESSO...</p>
              <div className="cbm-spinner-ring" />
            </div>
          ) : authStage === 'authorized' ? (
            /* FASE 7 DA REFERÊNCIA — ACESSO LIBERADO */
            <div className="cbm-auth-feedback-box">
              <p className="cbm-authorized-text">ACESSO AUTORIZADO</p>
              <div className="cbm-authorized-ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          ) : (
            /* FASE 5 DA REFERÊNCIA — INSERIR A SENHA (ÚNICO FORMULÁRIO DO SITE) */
            <form className="cbm-form-box" onSubmit={handleAuthSubmit}>
              <div className={`cbm-input-container ${authStage === 'error' ? 'has-error' : ''}`}>
                <span className="cbm-lock-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  ref={passwordInputRef}
                  className="cbm-input-text"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="cbm-eye-btn"
                  onClick={() => {
                    setShowPassword((v) => !v);
                    playSound('click');
                  }}
                  title={showPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errorMessage && <p className="cbm-error-alert">{errorMessage}</p>}

              <button className="cbm-btn-entrar" type="submit">
                <span>ENTRAR</span>
              </button>

              <span className="cbm-dev-tag">LOCALHOST ATIVO · APERTE ENTER PARA ACESSAR</span>
            </form>
          )}

          {/* Slogan Oficial */}
          <div className="cbm-slogan-line">
            “VIDAS ALHEIAS E RIQUEZAS SALVAR”
          </div>
        </div>
      </div>

      {/* 5. Guia Interativo de Scroll */}
      {scenePhase !== 'login' && (
        <div className="cbm-scroll-guide" onClick={startSmoothCinematicFlight}>
          <span className="cbm-scroll-text">Role o mouse para aproximar</span>
          <div className="cbm-mouse-icon">
            <div className="cbm-mouse-wheel" />
          </div>
        </div>
      )}

      {/* 6. Rodapé HUD */}
      <footer className="cbm-hud-footer" style={{ opacity: scenePhase === 'login' ? 0.4 : 1 }}>
        <span>CAPITAL MORADA · CORPO DE BOMBEIROS</span>
        <span>SISTEMA TÁTICO OPERACIONAL</span>
      </footer>
    </div>
  );
}
