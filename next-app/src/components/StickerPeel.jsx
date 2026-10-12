'use client';

import { useRef, useEffect, useMemo, useId } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './StickerPeel.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

const StickerPeel = ({
  imageSrc,
  rotate = 0,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 66,
  shadowIntensity = 0.6,
  lightingIntensity = 0,
  enableLighting = false,
  initialPosition = 'center',
  peelDirection = 0,
  className = '',
  draggable = false,
  onClick,
  alt = 'Sticker Logo',
  title = ''
}) => {
  const containerRef = useRef(null);
  const dragTargetRef = useRef(null);
  const pointLightRef = useRef(null);
  const pointLightFlippedRef = useRef(null);
  const draggableInstanceRef = useRef(null);

  const rawId = useId();
  const filterId = useMemo(() => rawId.replace(/[^a-zA-Z0-9]/g, ''), [rawId]);
  const pointLightId = `pointLight-${filterId}`;
  const pointLightFlippedId = `pointLightFlipped-${filterId}`;
  const dropShadowId = `dropShadow-${filterId}`;
  const expandAndFillId = `expandAndFill-${filterId}`;

  const defaultPadding = 10;

  useEffect(() => {
    if (!draggable) return;
    const target = dragTargetRef.current;
    if (!target) return;

    let startX = 0,
      startY = 0;

    if (initialPosition === 'center') {
      return;
    }

    if (typeof initialPosition === 'object' && initialPosition.x !== undefined && initialPosition.y !== undefined) {
      startX = initialPosition.x;
      startY = initialPosition.y;
    }

    gsap.set(target, { x: startX, y: startY });
  }, [initialPosition, draggable]);

  useEffect(() => {
    if (!draggable) return;
    const target = dragTargetRef.current;
    if (!target) return;
    const boundsEl = target.parentNode;
    if (!boundsEl) return;

    draggableInstanceRef.current = Draggable.create(target, {
      type: 'x,y',
      bounds: boundsEl,
      inertia: true,
      onDrag() {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });
      },
      onDragEnd() {
        const rotationEase = 'power2.out';
        const duration = 0.8;
        gsap.to(target, { rotation: 0, duration, ease: rotationEase });
      }
    })[0];

    const handleResize = () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.update();

        const currentX = gsap.getProperty(target, 'x');
        const currentY = gsap.getProperty(target, 'y');

        const boundsRect = boundsEl.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const maxX = boundsRect.width - targetRect.width;
        const maxY = boundsRect.height - targetRect.height;

        const newX = Math.max(0, Math.min(currentX, maxX));
        const newY = Math.max(0, Math.min(currentY, maxY));

        if (newX !== currentX || newY !== currentY) {
          gsap.to(target, {
            x: newX,
            y: newY,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
      }
    };
  }, [draggable]);

  useEffect(() => {
    const updateLight = e => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (pointLightRef.current) {
        gsap.set(pointLightRef.current, { attr: { x, y } });
      }

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (pointLightFlippedRef.current) {
        if (normalizedAngle !== 180) {
          gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
        } else {
          gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', updateLight);
      return () => container.removeEventListener('mousemove', updateLight);
    }
  }, [peelDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      container.classList.add('touch-active');
    };

    const handleTouchEnd = () => {
      container.classList.remove('touch-active');
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const cssVars = useMemo(
    () => ({
      '--sticker-rotate': `${rotate}deg`,
      '--sticker-p': `${defaultPadding}px`,
      '--sticker-peelback-hover': `${peelBackHoverPct}%`,
      '--sticker-peelback-active': `${peelBackActivePct}%`,
      '--sticker-peel-easing': peelEasing,
      '--sticker-peel-hover-easing': peelHoverEasing,
      '--sticker-width': typeof width === 'number' ? `${width}px` : width,
      '--sticker-shadow-opacity': shadowIntensity,
      '--sticker-lighting-constant': lightingIntensity,
      '--peel-direction': `${peelDirection}deg`
    }),
    [
      rotate,
      peelBackHoverPct,
      peelBackActivePct,
      peelEasing,
      peelHoverEasing,
      width,
      shadowIntensity,
      lightingIntensity,
      peelDirection
    ]
  );

  return (
    <div
      className={`draggable ${draggable ? '' : 'draggable-disabled'} ${className}`.trim()}
      ref={dragTargetRef}
      style={cssVars}
      onClick={onClick}
      title={title}
    >
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id={pointLightId}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={pointLightFlippedId}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={dropShadowId}>
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id={expandAndFillId}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(220, 225, 230)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef} style={onClick ? { cursor: 'pointer' } : undefined}>
        <div className="sticker-main" style={{ filter: `url(#${dropShadowId})` }}>
          <div
            className="sticker-lighting"
            style={enableLighting && lightingIntensity > 0 ? { filter: `url(#${pointLightId})` } : undefined}
          >
            <img
              src={imageSrc}
              alt={alt}
              className="sticker-image"
              draggable="false"
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        </div>

        <div className="flap">
          <div
            className="flap-lighting"
            style={enableLighting && lightingIntensity > 0 ? { filter: `url(#${pointLightFlippedId})` } : undefined}
          >
            <img
              src={imageSrc}
              alt={alt}
              className="flap-image"
              style={{ filter: `url(#${expandAndFillId})` }}
              draggable="false"
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;
