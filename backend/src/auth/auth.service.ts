import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async googleLogin(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token');
    }
    const { sub: googleId, email, name } = payload;
    if (!email || !name) {
      throw new Error('Google profile missing email or name');
    }

    const user = await this.prisma.user.upsert({
      where: { googleId },
      update: {},
      create: { googleId, email, name },
    });

    const accessToken = this.jwt.sign({
      sub: user.id,
      role: user.role,
    });

    return { accessToken, user };
  }
}
