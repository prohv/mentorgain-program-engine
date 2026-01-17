import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class GoogleAuthDto {
  idToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body() body: GoogleAuthDto) {
    return this.authService.googleLogin(body.idToken);
  }
}
