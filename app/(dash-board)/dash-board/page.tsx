import React from 'react';
import { setMeta } from '@/_libs';

interface Props {}

export const metadata = setMeta({
  title: `대시보드`,
  url: `/dash-board`,
});

export default function DashBoardPage() {
  return (
    <div>content</div>
  );
}
