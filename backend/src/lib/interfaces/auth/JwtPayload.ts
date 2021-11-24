import { UserRole } from '@prisma/client';
import { JwtPayload as payload } from 'jsonwebtoken';

export interface JwtPayload extends payload {
  user: {
    id: string;
    username: string;
    role: UserRole;
  };
}
