import { NotFoundError } from '@lib/errors';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: User['id']): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { id: userId } });
    } catch (error) {
      throw new NotFoundError('user_not_found');
    }
  }

  async findUserByEmail(userEmail: User['email']): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { email: userEmail } });
    } catch (error) {
      throw new NotFoundError('user_not_found');
    }
  }

  async findUsersById(userIds: User['id'][]) {
    try {
      return await this.prisma.user.findMany({
        where: { id: { in: userIds } },
      });
    } catch (e) {
      throw new NotFoundError('users_not_found');
    }
  }

  async createUser() {
    return;
  }
}
