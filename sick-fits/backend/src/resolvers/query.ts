import { QueryResolvers } from 'src/generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  items(_parent, _args, ctx) {
    return ctx.db.items();
  },
  item(_parent, args, ctx) {
    return ctx.db.item({ id: args.where.id! });
  },
};
