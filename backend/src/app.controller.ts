import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import * as UserTypes from './types/user.interface';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: UserTypes.User) {

    return {
      message: 'Protected route works!',
      user,
    };
  }
}
