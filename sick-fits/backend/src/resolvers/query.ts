import { QueryResolvers } from 'src/generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  items({}, {}, ctx) {
    return ctx.db.items();
  },
};
