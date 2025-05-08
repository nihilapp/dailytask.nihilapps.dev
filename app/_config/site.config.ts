import type { SiteConfig } from '@/_entities/common';
import { nihilLogo, nihilLogoWhite } from '@/_images';

export const siteConfig: SiteConfig = {
  title: '데일리태스크',
  description: '하루 하루의 일정 관리, 혹은 업무 사항을 기록하고, 관리하세요.',
  keywords: '데일리태스크, 일정 관리, 업무 사항, 일정 관리, 업무 관리',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://dailytask.nihilapps.dev',
  cover: {
    link: '/opengraph-image.png',
    alt: 'site image',
  },
  logo: nihilLogo.src,
  darkLogo: nihilLogoWhite.src,
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get apiRoute() {
    return `${this.url}/api`;
  },
};
