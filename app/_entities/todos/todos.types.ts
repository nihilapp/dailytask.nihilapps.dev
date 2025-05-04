import type { Prisma, TodoStatus } from '@/_prisma/client';

export type ExTodo = Prisma.TodoGetPayload<{
  include: {
    user: true;
  }
}>;

export interface CreateTodo {
  user_id: string;
  title: string;
  description?: string;
}

export interface UpdateTodo {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

export interface UpdateTodoStatus {
  status: TodoStatus;
}

export interface DeleteTodos {
  ids: string[];
}
