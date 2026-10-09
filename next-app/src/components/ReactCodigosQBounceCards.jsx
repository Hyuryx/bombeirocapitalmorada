'use client';
import React from 'react';
import BounceCards from './BounceCards';

export default function ReactCodigosQBounceCards({ items }) {
  // We have 8 cards for Codigos Q, so we define 8 transform styles spreading them out:
  const transformStyles = [
    "rotate(-8deg) translate(-420px)",
    "rotate(-4deg) translate(-300px)",
    "rotate(2deg) translate(-180px)",
    "rotate(-2deg) translate(-60px)",
    "rotate(3deg) translate(60px)",
    "rotate(-1deg) translate(180px)",
    "rotate(4deg) translate(300px)",
    "rotate(8deg) translate(420px)"
  ];

  return (
    <div style={{ margin: '40px 0', width: '100%', overflow: 'visible' }}>
      <BounceCards
        className="codigos-q-bounceCards"
        items={items}
        containerWidth="100%"
        containerHeight={350}
        animationDelay={0.2}
        animationStagger={0.06}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStyles}
        enableHover={true}
      />
    </div>
  );
}
