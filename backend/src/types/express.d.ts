import { User } from './user.interface';

declare namespace Express {
  export interface Request {
    user: User;
  }
}
