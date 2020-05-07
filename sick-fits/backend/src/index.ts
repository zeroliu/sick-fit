import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ItemResolver } from './modules/item/item_resolver';
import { RegisterResolver } from './modules/user/user_resolver';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [ItemResolver, RegisterResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  const app = express();
  app.use(cookieParser());
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.listen(process.env.PORT || 4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
}

main();
