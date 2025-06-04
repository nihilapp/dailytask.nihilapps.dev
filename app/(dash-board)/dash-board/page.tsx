import React from 'react';
import { setMeta } from '@/_libs';
import { DashBoardMain } from '@/(dash-board)/_components';

export const metadata = setMeta({
  title: `대시보드`,
  url: `/dash-board`,
});

export default function DashBoardPage() {
  return <DashBoardMain />;
}
