import { NextResponse, type NextRequest } from 'next/server';
import { DB } from '@/api/_libs';
import type { ApiResponse, ApiError } from '@/_entities/common';
import type { CreateTodo, DeleteTodos, ExTodo } from '@/_entities/todos';
import type { Todo } from '@/_prisma/client';

export async function GET() {
  try {
    const todos = await DB.todos().findMany({
      include: {
        user: true,
      },
    });

    const response: ApiResponse<ExTodo[]> = {
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

export async function POST(request: NextRequest) {
  try {
    const body: CreateTodo = await request.json();

    if (!body.title) {
      const errorResponse: ApiError = {
        message: '할 일 제목은 필수 항목입니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const todo = await DB.todos().create({
      data: body,
    });

    const response: ApiResponse<Todo> = {
      message: '할 일을 성공적으로 생성했습니다.',
      response: todo,
    };

    return NextResponse.json(
      response,
      { status: 201, }
    );
  } catch (error) {
    console.error('할 일 생성 중 오류가 발생했습니다.', error);

    const errorResponse: ApiError = {
      message: '할 일 생성 중 오류가 발생했습니다.',
      response: null,
    };

    return NextResponse.json(
      errorResponse,
      { status: 500, }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: DeleteTodos = await request.json();

    if (!body || body.ids.length === 0) {
      const errorResponse: ApiError = {
        message: '삭제할 할 일의 ID를 제공해야 합니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const deleteResult = await DB.todos().deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });

    const response: ApiResponse<{ count: number }> = {
      message: `${deleteResult.count}개의 할 일을 성공적으로 삭제했습니다.`,
      response: {
        count: deleteResult.count,
      },
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
