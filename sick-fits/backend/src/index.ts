// Must configure dotenv before importing anything else.
require('dotenv').config();
import { createServer } from './create_server';

const server = createServer();

// // TODO: Use express middleware to handle cookies (JWT)
// // TODO: Use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets: any) => {
    console.log(`Server is now running on http://localhost:${deets.port}`);
  },
);
