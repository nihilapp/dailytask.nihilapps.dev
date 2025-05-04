import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { ApiResponse, ApiError } from '@/_entities/common';
import type { ExTodo, UpdateTodo } from '@/_entities/todos';
import type { Todo } from '@/_prisma/client';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params, }: Params) {
  const { id, } = await params;
  try {
    const todo = await DB.todos().findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    const response: ApiResponse<ExTodo> = {
      message: '할 일 조회에 성공했습니다.',
      response: todo,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('할 일 조회 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 조회 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

export async function PUT(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

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

    const body: UpdateTodo = await request.json();

    const todo = await DB.todos().update({
      where: {
        id,
      },
      data: body,
    });

    const response: ApiResponse<Todo> = {
      message: '할 일 수정에 성공했습니다.',
      response: todo,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('할 일 수정 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 수정 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  try {
    const { id, } = await params;

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

    await DB.todos().delete({
      where: {
        id,
      },
    });

    const response: ApiResponse<null> = {
      message: '할 일 삭제에 성공했습니다.',
      response: null,
    };

    return NextResponse.json(
      response,
      { status: 200, }
    );
  } catch (error) {
    console.error('할 일 삭제 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 삭제 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}
