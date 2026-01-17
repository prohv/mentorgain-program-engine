import { Injectable } from '@nestjs/common';
import { User } from './types/user.interface';

@Injectable()
export class AppService {
  googleLogin(user: User) {
    if (!user) {
      return 'User not found';
    }
    return {
      message: 'User found',
      user: user,
    };
  }
}
