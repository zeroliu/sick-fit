import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ItemResolver } from './modules/item/item_resolver';
import { AuthResolver } from './modules/user/auth_resolver';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { jwtDecoder } from './middlewares/jwt_decoder';
import { PasswordResolver } from './modules/user/password_resolver';

dotenv.config();

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [ItemResolver, AuthResolver, PasswordResolver],
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
  app.use(jwtDecoder);

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
