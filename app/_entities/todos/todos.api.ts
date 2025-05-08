import type {
  CreateTodo, ExTodo, UpdateTodo, UpdateTodoStatus
} from '@/_entities/todos/todos.types';
import { Api } from '@/_libs';
import type { Todo } from '@/_prisma/client';

export class TodosApi {
  static async getAll() {
    return Api.getQuery<ExTodo[]>(
      `/todos`
    );
  }

  static async getById(id: string) {
    return Api.getQuery<ExTodo>(
      `/todos/${id}`
    );
  }

  static async getAllByTitle(title: string) {
    return Api.getQuery<ExTodo[]>(
      `/todos/search?word=${encodeURIComponent(title)}&type=title`
    );
  }

  static async getAllByContent(content: string) {
    return Api.getQuery<ExTodo[]>(
      `/todos/search?word=${encodeURIComponent(content)}&type=content`
    );
  }

  static async getAllByUserId(userId: string) {
    return Api.getQuery<ExTodo[]>(
      `/todos/user/${userId}`
    );
  }

  static async create(data: CreateTodo) {
    return Api.postQuery<Todo, CreateTodo>(
      `/todos`,
      data
    );
  }

  static async update(id: string, data: UpdateTodo) {
    return Api.putQuery<Todo, UpdateTodo>(
      `/todos/${id}`,
      data
    );
  }

  static async updateStatus(id: string, data: UpdateTodoStatus) {
    return Api.putQuery<Todo, UpdateTodoStatus>(
      `/todos/${id}/status`,
      data
    );
  }

  static async delete(id: string) {
    return Api.deleteQuery<null>(
      `/todos/${id}`
    );
  }

  static async deleteMany(ids: string[]) {
    return Api.deletesQuery<null, string[]>(
      `/todos`,
      ids
    );
  }
}
