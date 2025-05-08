export const todosKeys = {
  all: () => [ 'todos', 'list', ],
  byId: (id: string) => [ 'todos', 'detail', id, ],
  allByUserId: (userId: string) => [ 'todos', 'user', 'list', userId, ],
  allByTitle: (title: string) => [ 'todos', 'search', 'title', title, ],
  allByContent: (content: string) => [ 'todos', 'search', 'content', content, ],
};
