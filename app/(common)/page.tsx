import React from 'react';
import { setMeta } from '@/_libs';
import { Home } from './_components';

export const metadata = setMeta({
  title: `홈`,
  url: `/`,
});

export default function HomePage() {
  return <Home />;
}
