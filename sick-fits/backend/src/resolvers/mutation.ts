import { MutationResolvers } from 'src/generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  createItem(_parent, args, ctx) {
    return ctx.db.createItem({
      title: args.title,
      description: args.description,
      price: args.price,
      image: args.image || undefined,
      largeImage: args.largeImage || undefined,
    });
  },
  updateItem(_parent, args, ctx) {
    const { id, ...data } = args;
    return ctx.db.updateItem({
      where: { id },
      data,
    });
  },
};
