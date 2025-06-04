import React, { Suspense } from 'react';
import { setMeta } from '@/_libs';
import { SignInForm } from '@/(auth)/_components';

interface Props {}

export const metadata = setMeta({
  title: `로그인`,
  url: `/auth/signin`,
});

export function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}

export default SignInPage;
