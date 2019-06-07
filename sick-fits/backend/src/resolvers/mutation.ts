import { MutationResolvers } from 'src/generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  createItem({}, args, ctx) {
    return ctx.db.createItem({
      title: args.title,
      description: args.description,
      price: args.price,
      image: args.image || undefined,
      largeImage: args.largeImage || undefined,
    });
  },
};
