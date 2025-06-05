'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { cva, type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type InferType, object, ref, string, mixed } from 'yup';

import { useCreateUser } from '@/_entities/users';
import { cn } from '@/_libs';
import type { UserRole } from '@/_prisma/client';

interface Props
  extends React.FormHTMLAttributes<HTMLFormElement>,
    VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `w-full max-w-md mx-auto p-8 bg-gray-50 rounded-xl shadow-lg border border-gray-100`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

interface FormValues {
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  password: string;
  passwordConfirm: string;
}

export function SignUpForm({ className, ...props }: Props) {
  const model = object({
    email: string()
      .email('이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력해주세요.'),
    name: string().required('이름을 입력해주세요.'),
    role: mixed<'USER' | 'ADMIN'>()
      .oneOf([ 'USER', 'ADMIN', ], '역할은 USER 또는 ADMIN이어야 합니다.')
      .required('역할을 선택해주세요.'),
    password: string()
      .required('비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(16, '비밀번호는 16자 이하여야 합니다.')
      .matches(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다.')
      .matches(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .matches(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    passwordConfirm: string()
      .required('비밀번호를 확인해주세요.')
      .oneOf(
        [ ref('password'), ],
        '비밀번호가 일치하지 않습니다.'
      ),
  });

  const form = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(model),
    defaultValues: {
      email: '',
      name: '',
      role: 'USER',
      password: '',
      passwordConfirm: '',
    },
  });

  const {
    formState: { errors, },
  } = form;

  useEffect(() => {
    form.trigger();
  }, [ form.trigger, ]);

  const signUp = useCreateUser();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<InferType<typeof model>> = (data) => {
    console.log('submit');

    signUp.mutate(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role as UserRole,
      },
      {
        onSuccess() {
          router.push('/auth/signin');
        },
      }
    );
  };

  const onResetForm = () => {
    form.reset();
  };

  return (
    <form
      className={cn(cssVariants({}), className)}
      {...props}
      onSubmit={form.handleSubmit(onSubmitForm)}
    >
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>회원가입</h2>
        <p className='text-gray-500'>데일리태스크에 오신 것을 환영합니다</p>
      </div>

      <div className='space-y-6'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='email' className='text-sm font-medium text-gray-700'>
            <span>이메일</span>
          </label>
          <div className='relative'>
            <input
              type='email'
              id='email'
              className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white'
              placeholder='example@email.com'
              {...form.register('email')}
            />
          </div>
          {errors.email && (
            <span className='text-sm text-red-500 font-medium'>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <label htmlFor='name' className='text-sm font-medium text-gray-700'>
            <span>이름</span>
          </label>
          <input
            type='text'
            id='name'
            className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white'
            placeholder='이름을 입력하세요'
            {...form.register('name')}
          />
          {errors.name && (
            <span className='text-sm text-red-500 font-medium'>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <span className='text-sm font-medium text-gray-700'>역할</span>
          <div className='flex space-x-6 bg-white p-3 border border-gray-200 rounded-lg'>
            <label
              htmlFor='roleUser'
              className='flex items-center space-x-3 cursor-pointer'
            >
              <div className='relative flex items-center justify-center'>
                <input
                  type='radio'
                  id='roleUser'
                  value='USER'
                  className='h-5 w-5 text-red-500 focus:ring-red-400 border-gray-300 cursor-pointer'
                  {...form.register('role')}
                />
                <div className='absolute w-full h-full rounded-full opacity-0 hover:opacity-10 bg-red-500 transition-opacity duration-200' />
              </div>
              <span className='text-gray-700 font-medium'>사용자</span>
            </label>

            <label
              htmlFor='roleAdmin'
              className='flex items-center space-x-3 cursor-pointer'
            >
              <div className='relative flex items-center justify-center'>
                <input
                  type='radio'
                  id='roleAdmin'
                  value='ADMIN'
                  className='h-5 w-5 text-red-500 focus:ring-red-400 border-gray-300 cursor-pointer'
                  {...form.register('role')}
                />
                <div className='absolute w-full h-full rounded-full opacity-0 hover:opacity-10 bg-red-500 transition-opacity duration-200' />
              </div>
              <span className='text-gray-700 font-medium'>관리자</span>
            </label>
          </div>
          {errors.role && (
            <span className='text-sm text-red-500 font-medium'>
              {errors.role.message}
            </span>
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <label
            htmlFor='password'
            className='text-sm font-medium text-gray-700'
          >
            <span>비밀번호</span>
          </label>
          <input
            type='password'
            id='password'
            className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white'
            placeholder='8-16자 영문, 숫자, 특수문자 조합'
            {...form.register('password')}
          />
          {errors.password && (
            <span className='text-sm text-red-500 font-medium'>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='flex flex-col space-y-2'>
          <label
            htmlFor='passwordConfirm'
            className='text-sm font-medium text-gray-700'
          >
            <span>비밀번호 확인</span>
          </label>
          <input
            type='password'
            id='passwordConfirm'
            className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200 bg-white'
            placeholder='비밀번호를 다시 입력하세요'
            {...form.register('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <span className='text-sm text-red-500 font-medium'>
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <div className='flex space-x-4 pt-6'>
          <button
            type='submit'
            className='flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-sm hover:shadow'
            disabled={signUp.isPending}
          >
            {signUp.isPending ? '처리 중...' : '회원가입'}
          </button>
          <button
            type='button'
            onClick={onResetForm}
            className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-300 border border-gray-200'
            disabled={signUp.isPending}
          >
            초기화
          </button>
        </div>
      </div>
    </form>
  );
}
