import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { ApiError, ApiResponse } from '@/_entities/common';
import type { UpdateTodoStatus } from '@/_entities/todos';
import type { Todo } from '@/_prisma/client';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(
  request: NextRequest,
  { params, }: Params,
) {
  try {
    const { id, } = await params;
    const body: UpdateTodoStatus = await request.json();

    const findTodo = await DB.todos().findUnique({
      where: {
        id,
      },
    });

    if (!findTodo) {
      const errorResponse: ApiError = {
        message: '존재하지 않는 할 일입니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 404, }
      );
    }

    const todo = await DB.todos().update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });

    const response: ApiResponse<Todo> = {
      message: '할 일 상태 수정에 성공했습니다.',
      response: todo,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('할 일 상태 수정 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 상태 수정 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
