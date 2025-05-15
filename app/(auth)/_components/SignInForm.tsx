'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';
import {
  type InferType, object, string
} from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import type { AxiosError } from 'axios';
import Link from 'next/link';
import { cn } from '@/_libs';
import { useAuthActions, useSignIn, useSignInCallBackUrl } from '@/_entities/auth';
import type { ApiError, ApiResponse } from '@/_entities/common/common.types';
import type { UserSession } from '@/_entities/users/users.types';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface FormValues {
  email: string;
  password: string;
}

export function SignInForm({ className, ...props }: Props) {
  const [ formError, setFormError, ] = useState('');

  const { setUserSession, setSignInCallBackUrl, } = useAuthActions();
  const searchParams = useSearchParams();

  const model = object({
    email: string()
      .email('이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력해주세요.'),
    password: string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
      .matches(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .matches(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
  });

  type SubmitFormValues = SubmitHandler<InferType<typeof model>>;

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState: { errors, }, } = form;

  useEffect(() => {
    form.trigger();
  }, [ form.trigger, ]);

  const signIn = useSignIn();
  const router = useRouter();
  const signInCallBackUrl = useSignInCallBackUrl();

  const onSubmitForm: SubmitFormValues = (
    (data) => {
      console.log('submit');

      signIn.mutate({
        email: data.email,
        password: data.password,
      }, {
        onSuccess: (apiResponse: ApiResponse<UserSession>) => {
          setUserSession(apiResponse.response);

          // URL 파라미터의 callbackUrl이 우선순위가 높음
          const callbackUrl = searchParams.get('callbackUrl');

          if (callbackUrl && callbackUrl.startsWith('/')) {
            router.push(callbackUrl);
          } else if (signInCallBackUrl) {
            // 저장된 signInCallBackUrl로 리다이렉트
            router.push(signInCallBackUrl);
            // 사용 후 초기화
            setSignInCallBackUrl(null);
          } else {
            // 기본값으로 홈페이지로 이동
            router.push('/');
          }
        },
        onError: (error: AxiosError<ApiError>) => {
          console.error('로그인 실패:', error);
          setFormError(error.response?.data.message);
        },
      });
    }
  );

  return (
    <form
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
      onSubmit={form.handleSubmit(onSubmitForm)}
    >
      <label htmlFor='email'>
        <span>이메일</span>
        <input
          type='email'
          id='email'
          {...form.register('email')}
        />
        {errors.email && (
          <span>{errors.email.message}</span>
        )}
      </label>

      <label htmlFor='password'>
        <span>비밀번호</span>
        <input
          type='password'
          id='password'
          {...form.register('password')}
        />
        {errors.password && (
          <span>{errors.password.message}</span>
        )}
      </label>

      {formError && (
        <span>{formError}</span>
      )}

      <div>
        <button>로그인</button>
        <button type='reset'>초기화</button>
      </div>

      <div>
        아이디가 없으신가요?
        <Link href='/auth/signup'>회원가입</Link>
      </div>
    </form>
  );
}
