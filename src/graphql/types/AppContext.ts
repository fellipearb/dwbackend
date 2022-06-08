import { Request } from 'express';

export interface AppContext {
  req: Request;
  res: Response;
  token: string | null;
}
