import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DB } from '@/api/_libs';
import type { ApiError, ApiResponse } from '@/_entities/common';
import type { Todo } from '@/_prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams, } = request.nextUrl;
    const word = searchParams.get('word');
    const type = searchParams.get('type') || 'title'; // 기본값은 title

    if (!word) {
      const errorResponse: ApiError = {
        message: '검색어를 제공해야 합니다.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    let whereClause = {};

    if (type === 'title') {
      whereClause = {
        title: {
          contains: word,
        },
      };
    } else if (type === 'content') {
      whereClause = {
        description: {
          contains: word,
        },
      };
    } else {
      const errorResponse: ApiError = {
        message: '유효하지 않은 검색 유형입니다. title 또는 content를 사용하세요.',
        response: null,
      };

      return NextResponse.json(
        errorResponse,
        { status: 400, }
      );
    }

    const todos = await DB.todos().findMany({
      where: whereClause,
      include: {
        user: true,
      },
    });

    const searchType = type === 'title' ? '제목' : '내용';

    const response: ApiResponse<Todo[]> = {
      message: `${searchType}에서 '${word}'와 관련된 할 일 목록을 성공적으로 조회했습니다.`,
      response: todos,
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
