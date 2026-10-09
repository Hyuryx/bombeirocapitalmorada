'use client';

import dynamic from 'next/dynamic';

const DynamicHTMLRenderer = dynamic(() => import('./DynamicHTMLRenderer'), {
  ssr: false,
});

export default function NoSSRDynamicHTMLRenderer(props) {
  return <DynamicHTMLRenderer {...props} />;
}
