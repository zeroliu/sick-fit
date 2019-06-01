/**
 * This file connects to the remote prisma DB and gives us the ability to query
 * it with JS.
 */
import { Prisma } from 'prisma-binding';

export const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISEMA_SECRET,
  debug: false,
});
