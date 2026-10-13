'use client';

import dynamic from 'next/dynamic';

const LanyardBadgeScreen = dynamic(() => import('./LanyardBadgeScreen'), {
  ssr: false,
});

export default function NoSSRLanyardBadgeScreen(props) {
  return <LanyardBadgeScreen {...props} />;
}
