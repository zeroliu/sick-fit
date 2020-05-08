import { Request, Response } from 'express';
import { AccessToken } from './middlewares/jwt_decoder';

export interface Context {
  req: Request & AccessToken;
  res: Response;
}
