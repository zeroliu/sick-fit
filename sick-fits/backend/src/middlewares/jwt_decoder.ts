import { RequestHandler, Request } from 'express';
import jwt from 'jsonwebtoken';

export interface AccessToken {
  userId?: number;
}

export const jwtDecoder: RequestHandler = (req, _, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error('App secret is not provided.');
  }
  const { token } = req.cookies;
  if (token) {
    // Verify whether the token has been contaminated.
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as AccessToken;
    (req as Request & AccessToken).userId = userId;
  }
  next();
};
