import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv-flow';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { jwtDecoder } from './middlewares/jwt_decoder';
import { AuthResolver } from './resolvers/auth_resolver';
import { CartResolver } from './resolvers/cart_resolver';
import { ItemResolver } from './resolvers/item_resolver';
import { PaymentResolver } from './resolvers/order_resolver';
import { PasswordResolver } from './resolvers/password_resolver';
import { UserResolver } from './resolvers/user_resolver';

dotenv.config();

async function main() {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      PaymentResolver,
      ItemResolver,
      AuthResolver,
      PasswordResolver,
      UserResolver,
      CartResolver,
    ],
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
