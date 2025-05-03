export const userKeys = {
  list: [ 'users', 'list', ],
  detailId: (id: string) => [ 'users', 'detail', id, ],
  detailEmail: (email: string) => [ 'users', 'detail', email, ],
};
