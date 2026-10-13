/**
 * Gerador de Fingerprint / HWID Físico de Dispositivo
 * Produz uma assinatura de hardware idêntica em qualquer navegador no mesmo PC/Dispositivo
 * (Chrome, Edge, Opera, Brave, Firefox, Janela Anônima).
 */

export async function generateDeviceFingerprint() {
  if (typeof window === 'undefined') {
    return { hwid: 'server_env', isMobile: false, deviceType: 'desktop' };
  }

  const components = [];

  // 1. Tipo de Dispositivo (PC ou Mobile) e Plataforma Base
  const ua = navigator.userAgent || '';
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (isTouch && window.innerWidth <= 820);
  const deviceType = isMobile ? 'mobile' : 'desktop';

  const platform = (navigator.platform || '').toLowerCase().includes('win') ? 'windows'
    : (navigator.platform || '').toLowerCase().includes('mac') ? 'macos'
    : (navigator.platform || '').toLowerCase().includes('iphone') || (navigator.platform || '').toLowerCase().includes('ipad') ? 'ios'
    : (navigator.platform || '').toLowerCase().includes('arm') || ua.includes('Android') ? 'android'
    : 'linux';

  components.push('deviceType:' + deviceType);
  components.push('platform:' + platform);

  // 2. Características Físicas do Hardware: CPU e Tela
  components.push('cores:' + (navigator.hardwareConcurrency || 4));
  components.push('screen:' + window.screen.width + 'x' + window.screen.height + 'x' + window.screen.colorDepth);

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

        let cleanRenderer = rawRenderer;
        const matchGpu = rawRenderer.match(/(NVIDIA[^\,\)\;]+|AMD[^\,\)\;]+|Radeon[^\,\)\;]+|Intel[^\,\)\;]+|GeForce[^\,\)\;]+|Apple\s+M\d[^\,\)\;]*|Adreno[^\,\)\;]+|Mali[^\,\)\;]+)/i);
        if (matchGpu) {
          cleanRenderer = matchGpu[1].trim();
        }

        components.push('gpuVendor:' + (rawVendor.includes('NVIDIA') ? 'NVIDIA' : rawVendor.includes('AMD') ? 'AMD' : rawVendor.includes('Intel') ? 'Intel' : rawVendor));
        components.push('gpuModel:' + cleanRenderer);
      }

      try {
        components.push('maxTex:' + gl.getParameter(gl.MAX_TEXTURE_SIZE));
        components.push('maxRender:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
        components.push('maxVectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
      } catch(e) {}
    }
  } catch (e) {
    components.push('gpu:fallback');
  }

  // 4. Parâmetros de Hardware de Áudio
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

  // 5. Hash SHA-256 Criptográfico
  const rawString = components.join('###');
  let hwidHash = '';

  try {
    const msgBuffer = new TextEncoder().encode(rawString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    hwidHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    let hash = 0;
    for (let i = 0; i < rawString.length; i++) {
      hash = ((hash << 5) - hash) + rawString.charCodeAt(i);
      hash |= 0;
    }
    hwidHash = 'legacy_' + Math.abs(hash).toString(16).padStart(16, '0');
  }

  const finalHwid = (isMobile ? 'mob' : 'pc') + '_' + hwidHash.substring(0, 24);

  return {
    hwid: finalHwid,
    isMobile: isMobile,
    deviceType: deviceType,
    rawComponents: components
  };
}
