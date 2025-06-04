import React from 'react';
import { setMeta } from '@/_libs';
import { SignUpForm } from '@/(auth)/_components';

interface Props {}

export const metadata = setMeta({
  title: `회원가입`,
  url: `/auth/signup`,
});

export function SignUpPage() {
  return (
    <SignUpForm />
  );
}

export default SignUpPage;
