'use client';

import React from 'react';
import './GlitchText.css';

const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  style = {}
}) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 #ef4444' : 'none',
    '--before-shadow': enableShadows ? '5px 0 #00f0ff' : 'none',
    ...style
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';
  const textContent = typeof children === 'string' ? children : String(children ?? '');

  return (
    <span
      className={`glitch ${hoverClass} ${className}`.trim()}
      style={inlineStyles}
      data-text={textContent}
    >
      {children}
    </span>
  );
};

export default GlitchText;
