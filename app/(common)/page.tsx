import React from 'react';
import { setMeta } from '@/_libs';
import { Home } from './_components';

interface Props {}

export const metadata = setMeta({
  title: `홈`,
  url: `/`,
});

export function HomePage() {
  return (
    <Home />
  );
}

export default HomePage;
