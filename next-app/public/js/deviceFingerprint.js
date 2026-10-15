/**
 * Gerador de Fingerprint / HWID Físico de Dispositivo (Navegador)
 * Produz uma assinatura de hardware idêntica em qualquer navegador no mesmo PC/Dispositivo
 * (Chrome, Edge, Opera, Brave, Firefox, Janela Anônima).
 */
(function(window) {
  'use strict';

  window.generateDeviceFingerprint = async function() {
    const components = [];

    // 1. Tipo de Dispositivo (PC ou Mobile) e Plataforma Base
    const ua = navigator.userAgent || '';
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (isTouch && window.innerWidth <= 820);
    const deviceType = isMobile ? 'mobile' : 'desktop';

    // Plataforma limpa (ex: Win32/Mac/Linux/Android/iPhone)
    const platform = (navigator.platform || '').toLowerCase().includes('win') ? 'windows'
      : (navigator.platform || '').toLowerCase().includes('mac') ? 'macos'
      : (navigator.platform || '').toLowerCase().includes('iphone') || (navigator.platform || '').toLowerCase().includes('ipad') ? 'ios'
      : (navigator.platform || '').toLowerCase().includes('arm') || ua.includes('Android') ? 'android'
      : 'linux';

    components.push('deviceType:' + deviceType);
    components.push('platform:' + platform);

    // 2. Características Físicas do Hardware: CPU e Tela
    // Quantidade de núcleos da CPU (Idêntico em qualquer navegador na mesma máquina)
    components.push('cores:' + (navigator.hardwareConcurrency || 4));

    // Dimensões físicas da tela e profundidade de cor (Idêntico em qualquer navegador)
    components.push('screen:' + window.screen.width + 'x' + window.screen.height + 'x' + window.screen.colorDepth);

    // Fuso horário do sistema operacional (Idêntico em qualquer navegador)
    try {
      components.push('tz:' + (Intl.DateTimeFormat().resolvedOptions().timeZone || ''));
    } catch(e) {}

    // 3. Assinatura de Hardware da GPU (WebGL Hardware Parameters)
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rawVendor = String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '');
          const rawRenderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');

          // Extrai o modelo da GPU sem os prefixos voláteis de navegadores diferentes
          // Ex: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11...)" -> "NVIDIA GeForce RTX 3060"
          let cleanRenderer = rawRenderer;
          const matchGpu = rawRenderer.match(/(NVIDIA[^\,\)\;]+|AMD[^\,\)\;]+|Radeon[^\,\)\;]+|Intel[^\,\)\;]+|GeForce[^\,\)\;]+|Apple\s+M\d[^\,\)\;]*|Adreno[^\,\)\;]+|Mali[^\,\)\;]+)/i);
          if (matchGpu) {
            cleanRenderer = matchGpu[1].trim();
          }

          components.push('gpuVendor:' + (rawVendor.includes('NVIDIA') ? 'NVIDIA' : rawVendor.includes('AMD') ? 'AMD' : rawVendor.includes('Intel') ? 'Intel' : rawVendor));
          components.push('gpuModel:' + cleanRenderer);
        }

        // Parâmetros fixos do silício da Placa de Vídeo (Constantes físicas da GPU)
        try {
          components.push('maxTex:' + gl.getParameter(gl.MAX_TEXTURE_SIZE));
          components.push('maxRender:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
          components.push('maxVectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
        } catch(e) {}
      }
    } catch (e) {
      components.push('gpu:fallback');
    }

    // 4. Parâmetros de Hardware de Áudio (Placa de som do sistema)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        components.push('audioSampleRate:' + (audioCtx.sampleRate || 48000));
        components.push('audioChannels:' + (audioCtx.destination ? audioCtx.destination.maxChannelCount : 2));
        if (audioCtx.state !== 'closed' && typeof audioCtx.close === 'function') {
          audioCtx.close().catch(function() {});
        }
      }
    } catch (e) {}

    // 5. Hash SHA-256 Criptográfico das constantes de hardware
    const rawString = components.join('###');
    let hwidHash = '';

    try {
      const msgBuffer = new TextEncoder().encode(rawString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hwidHash = hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    } catch (e) {
      let hash = 0;
      for (let i = 0; i < rawString.length; i++) {
        hash = ((hash << 5) - hash) + rawString.charCodeAt(i);
        hash |= 0;
      }
      hwidHash = 'legacy_' + Math.abs(hash).toString(16).padStart(16, '0');
    }

    // Prefixo semântico para identificação no painel (ex: pc_9a3f2b184c... ou mob_7c12...)
    const finalHwid = (isMobile ? 'mob' : 'pc') + '_' + hwidHash.substring(0, 24);

    // Formatação de BIOS / Hardware serial em octetos hexadecimais (ex: 14:9E:E1:7A:8E:D2:54:B8)
    const cleanHash = hwidHash.replace(/[^a-fA-F0-9]/g, '').padEnd(16, 'A').substring(0, 16).toUpperCase();
    const biosSerial = cleanHash.match(/.{1,2}/g)?.join(':') || '14:9E:E1:7A:8E:D2:54:B8';

    // Nome de PC determinístico militar único por máquina
    const pcSuffix = cleanHash.substring(0, 8);
    const pcName = isMobile ? ('MOBILE-' + pcSuffix) : ('DESKTOP-' + pcSuffix);

    // Detalhes da GPU real
    let gpuStr = 'GPU Integrada / Não identificada';
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rawRenderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '');
          if (rawRenderer) {
            gpuStr = rawRenderer.replace(/ANGLE \(/i, '').replace(/\)/g, '').trim();
          }
        }
      }
    } catch (_) {}

    // Detalhes do SO (com suporte a detecção exata de Windows 11 vs Windows 10 via High Entropy API)
    let osStr = 'Windows 10 / 11 (64-bit)';
    if (/Windows NT 10/i.test(ua)) osStr = 'Windows 10 / 11 (64-bit)';
    else if (/Macintosh|Mac OS X/i.test(ua)) osStr = 'macOS (Apple Silicon / Intel 64-bit)';
    else if (/Android/i.test(ua)) osStr = 'Android OS (Mobile)';
    else if (/iPhone|iPad/i.test(ua)) osStr = 'iOS (Apple Mobile)';
    else if (/Linux/i.test(ua)) osStr = 'Linux (64-bit)';

    // Detecção refinada via User-Agent Client Hints (Windows 11 vs Windows 10)
    if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
      try {
        const entropy = await navigator.userAgentData.getHighEntropyValues(['platformVersion', 'architecture', 'bitness']);
        if (entropy && entropy.platformVersion) {
          const major = parseInt(entropy.platformVersion.split('.')[0] || '0', 10);
          const bitness = entropy.bitness ? (entropy.bitness + '-bit') : '64-bit';
          if (major >= 13) {
            osStr = 'Windows 11 (' + bitness + ')';
          } else if (major > 0) {
            osStr = 'Windows 10 (' + bitness + ')';
          }
        }
      } catch (_) {}
    }

    // Cores e RAM reais
    const coresCount = navigator.hardwareConcurrency || 16;
    const cpuStr = 'Processador (' + coresCount + ' Threads Lógicas @ Multi-Thread HyperThreading)';
    const ramGb = navigator.deviceMemory || 32;
    const ramStr = ramGb + '.0 GB RAM Física (Memória do Sistema)';

    // Armazenamento Real estimado via Storage API
    let storageStr = 'Unidade Principal de Armazenamento (Disco Primário)';
    if (navigator.storage && typeof navigator.storage.estimate === 'function') {
      try {
        const est = await navigator.storage.estimate();
        if (est && est.quota) {
          const quotaGb = Math.round(est.quota / (1024 * 1024 * 1024));
          storageStr = 'Disco Primário (Armazenamento Disponível: ~' + quotaGb + ' GB)';
        }
      } catch (_) {}
    }

    return {
      hwid: finalHwid,
      biosSerial: biosSerial,
      pcName: pcName,
      gpu: gpuStr,
      cpu: cpuStr,
      cores: coresCount,
      memory: ramGb,
      ram: ramStr,
      storage: storageStr,
      os: osStr,
      isMobile: isMobile,
      deviceType: deviceType,
      rawComponents: components
    };
  };
})(window);
