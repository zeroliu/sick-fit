import { MutationResolvers } from 'src/generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  createItem(_parent, args, ctx) {
    return ctx.db.createItem(args.data);
  },
  updateItem(_parent, args, ctx) {
    return ctx.db.updateItem({
      where: { id: args.where.id! },
      data: args.data,
    });
  },
  async deleteItem(_parent, args, ctx) {
    // 1. Fetch the item from the database.
    // const item = await ctx.db.item(args.where);

    // 2. Verify if the user owns the item or has the permission to modify the
    // item.
    // TODO: to implement

    // 3. Delete the item.
    return ctx.db.deleteItem({ id: args.where.id! });
  },
};
