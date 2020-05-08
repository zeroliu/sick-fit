import jwt from 'jsonwebtoken';
import { Response } from 'express';

export function signToken(userId: number) {
  if (!process.env.APP_SECRET) {
    throw new Error('App secret not set');
  }
  return jwt.sign({ userId }, process.env.APP_SECRET);
}

export function addTokenToCookie(token: string, res: Response) {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
}
