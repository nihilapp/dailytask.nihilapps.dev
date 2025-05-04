import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { ApiResponse, ApiError } from '@/_entities/common';
import type { Todo } from '@/_prisma/client';

interface Params {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  try {
    const { userId, } = await params;

    const findUser = await DB.users().findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      const errorResponse: ApiError = {
        message: '존재하지 않는 사용자입니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    const todos = await DB.todos().findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
      },
    });

    const response: ApiResponse<Todo[]> = {
      message: '할 일 목록을 성공적으로 조회했습니다.',
      response: todos,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('할 일 목록 조회 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 목록 조회 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
