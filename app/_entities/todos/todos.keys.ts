export const TodosKeys = {
  all: () => [ 'todos', 'list', ],
  byId: (id: string) => [ 'todos', 'detail', id, ],
  allByUserId: (userId: string) => [ 'todos', 'user', 'list', userId, ],
  allByTitle: (title: string) => [ 'todos', 'title', 'list', title, ],
};
