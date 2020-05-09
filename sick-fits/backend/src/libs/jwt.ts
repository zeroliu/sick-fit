import jwt from 'jsonwebtoken';
import { Response } from 'express';

const TOKEN_COOKIE_KEY = 'token';

export function signToken(userId: number) {
  if (!process.env.APP_SECRET) {
    throw new Error('App secret not set');
  }
  return jwt.sign({ userId }, process.env.APP_SECRET);
}

export function addTokenToCookie(token: string, res: Response) {
  res.cookie(TOKEN_COOKIE_KEY, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
}

export function clearCookie(res: Response) {
  res.clearCookie(TOKEN_COOKIE_KEY);
}
