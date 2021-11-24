import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class Argon2CryptoProvider {
  hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2i,
      memoryCost: 2 ** 16,
      timeCost: 6,
      hashLength: 32,
    });
  }

  verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
