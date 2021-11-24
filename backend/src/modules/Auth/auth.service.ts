import { JwtPayload } from '@lib/interfaces/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
  private jwtSecret: string;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  /**
   * @description Signs a jwt
   * @param  {User} user
   * @returns {string}
   */
  signUserJWT(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };

    return this.jwtService.sign(payload, {
      expiresIn: '12h',
      secret: this.jwtSecret,
    });
  }

  /**
   * @description Verifies a jwt
   * @param  {string} jwt
   * @returns {JwtPayload}
   */
  verifyJWT(jwt: string): JwtPayload {
    try {
      const decodedJwt = this.jwtService.verify<JwtPayload>(jwt, {
        secret: this.jwtSecret,
      });

      return decodedJwt;
    } catch (err) {
      throw new Error('invalid token');
    }
  }
}
