import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';

class GoogleAuthDto {
  idToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('google')
  async googleLogin(@Body() body: GoogleAuthDto) {
    return this.authService.googleLogin(body.idToken);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verify(@GetUser() user: any) {
    return { valid: true, user };
  }
}

