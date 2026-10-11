'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './StrokeText.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const DEFAULT_TEXT = '© 2026 ERREJOTA. Todos os direitos reservados.';

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = '#A78BFA',
  fillColor = '#F8FAFC',
  strokeWidth = 1,
  drawDuration = 1.4,
  fillDelay = 0.2,
  stagger = 0.03,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 14,
  fontWeight = 600,
  letterSpacing = 0.5,
  reverse = false,
  className = '',
  style = {}
}) => {
  const rootRef = useRef(null);
  const strokeTextRef = useRef(null);
  const wipeRectRef = useRef(null);

  const [box, setBox] = useState(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const characters = useMemo(() => Array.from(String(text ?? '')), [text]);

  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
      fontFamily: 'inherit'
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  // Fallback seguro caso o elemento esteja em aba oculta inicialmente
  const fallbackBox = useMemo(() => {
    const approxWidth = Math.max(characters.length * (fontSize * 0.7), 250);
    return {
      x: 0,
      y: -fontSize * 1.1,
      width: approxWidth,
      height: fontSize * 1.8
    };
  }, [characters, fontSize]);

  const activeBox = box || fallbackBox;

  useIsomorphicLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return false;
      let bbox;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return false;
      }
      if (!bbox || !bbox.width || bbox.width <= 0) return false;

      const pad = Math.max(Number(strokeWidth) || 1, fontSize * 0.15);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2
      };

      setBox(prev =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next
      );
      return true;
    };

    measure();

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => measure()).catch(() => {});
    }

    // Observer de visibilidade e redimensionamento
    let io;
    if (typeof IntersectionObserver !== 'undefined' && rootRef.current) {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          measure();
        }
      });
      io.observe(rootRef.current);
    }

    let ro;
    if (typeof ResizeObserver !== 'undefined' && rootRef.current) {
      ro = new ResizeObserver(() => {
        measure();
      });
      ro.observe(rootRef.current);
    }

    // Listener para cliques globais (troca de abas) e redimensionamento
    const onActivity = () => {
      setTimeout(measure, 50);
      setTimeout(measure, 200);
    };
    window.addEventListener('resize', onActivity);
    window.addEventListener('click', onActivity);

    // Polling caso o componente esteja em display: none e seja ativado depois
    let pollId;
    let attempts = 0;
    pollId = setInterval(() => {
      attempts++;
      const success = measure();
      if (success || attempts > 20) {
        clearInterval(pollId);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearInterval(pollId);
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', onActivity);
      window.removeEventListener('click', onActivity);
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root) return undefined;

    const strokes = gsap.utils.toArray(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const currentBox = activeBox;
    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse ? { each: stagger, from: 'end' } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: fillEnabled ? currentBox.width : 0 } });
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === 'loop' ? -1 : 0,
        repeatDelay: trigger === 'loop' ? 0.9 : 0,
        defaults: { overwrite: 'auto' }
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(
          wipe,
          { attr: { width: currentBox.width }, duration: fillDuration, ease: 'power2.inOut' },
          drawDuration + fillDelay
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    let timeline = null;
    let scrollTrigger = null;
    let removeListeners = null;

    if (trigger === 'hover') {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener('pointerenter', play);
      removeListeners = () => root.removeEventListener('pointerenter', play);
    } else {
      timeline = build();
      if (trigger === 'scroll') {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 95%',
          once: true,
          onEnter: () => timeline?.play(0)
        });
      } else {
        timeline.play(0);
      }

      // Replay interativo no hover
      const playOnHover = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener('pointerenter', playOnHover);
      removeListeners = () => root.removeEventListener('pointerenter', playOnHover);
    }

    return () => {
      removeListeners?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [activeBox, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse]);

  const viewBox = `${activeBox.x} ${activeBox.y} ${activeBox.width} ${activeBox.height}`;

  return (
    <span
      ref={rootRef}
      className={`stroke-text stroke-text--interactive ${trigger === 'hover' ? 'stroke-text--hover' : ''} ${className}`.trim()}
      style={{ ...style, '--stroke-text-height': `${Math.max(22, Math.round(fontSize * 1.6))}px` }}
      role="img"
      aria-label={String(text ?? '')}
    >
      <svg className="stroke-text__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {fillMode === 'wipe' && activeBox && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={activeBox.x} y={activeBox.y} width={activeBox.width} height={activeBox.height} />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === 'wipe' && activeBox ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export default StrokeText;
