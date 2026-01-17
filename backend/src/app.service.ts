import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestWithUser } from './types/request-with-user.interface';

@Injectable()
export class AppService {
  googleLogin(req: RequestWithUser){
    if(!req.user){
      return 'User not found';
    }
    return {
      message: 'User found',
      user: req.user,
    };
  }
}
