import { GraphQLServer } from 'graphql-yoga';
import { Mutation } from './resolvers/mutation';
import { Query } from './resolvers/query';
import { db } from './db';

// Creates the GraphQL Yoga server.
export function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  });
}
