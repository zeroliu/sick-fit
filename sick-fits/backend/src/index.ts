import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ItemResolver } from './modules/item/item_resolver';
import { RegisterResolver } from './modules/user/register_resolver';
import { createConnection } from 'typeorm';

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [ItemResolver, RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  const app = express();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
}

main();
