'use client';
import React from 'react';
import BounceCards from './BounceCards';

export default function ReactModulacaoBounceCards({ items }) {
  // Since we have exactly 4 cards, we define 4 transform styles:
  const transformStyles = [
    "rotate(-5deg) translate(-250px)",
    "rotate(3deg) translate(-80px)",
    "rotate(-2deg) translate(80px)",
    "rotate(6deg) translate(250px)"
  ];

  return (
    <div style={{ margin: '40px 0', width: '100%', overflow: 'visible' }}>
      <BounceCards
        className="modulacao-bounceCards"
        items={items}
        containerWidth="100%"
        containerHeight={350}
        animationDelay={0.2}
        animationStagger={0.08}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStyles}
        enableHover={true}
      />
    </div>
  );
}
