import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {
    this.client = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async googleLogin(idToken: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const { sub: googleId, email, name } = payload;

      const user = await this.prisma.user.upsert({
        where: { googleId },
        update: { email, name: name || 'User' },
        create: {
          googleId,
          email,
          name: name || 'User',
        },
      });

      const accessToken = this.jwt.sign({
        sub: user.id,
        role: user.role,
        email: user.email,
      });

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired Google token');
    }
  }
}
