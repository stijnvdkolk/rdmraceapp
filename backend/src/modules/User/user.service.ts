import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { NotFoundError } from '@lib/errors';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private queryBuilder: PaginationQueryBuilder<
      Prisma.UserWhereInput,
      Prisma.UserOrderByWithRelationInput
    >,
  ) {}

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

  // Returns all the users, given the correct QueryInput
  async findUsersPagination(query: PaginationQueryInput) {
    try {
      const {
        pagination: { skip, take },
        where,
        orderBy,
      } = this.queryBuilder.build(query);
      return this.prisma.user.findMany({
        skip,
        take,
        orderBy,
        where,
        select: {
          id: true,
          email: false,
          username: true,
          password: false,
          profilePicture: true,
          status: true,
          aboutMe: true,
          role: true,
          channels: false,
          messages: false,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('users_not_found');
    }
  }

  async createUser({
    email,
    username,
    password,
    profilePicture = null,
    role,
  }: {
    email: User['email'];
    username: User['username'];
    password: User['password'];
    profilePicture?: User['profilePicture'];
    role: UserRole;
  }) {
    try {
      return this.prisma.user.create({
        data: {
          email: email,
          username: username,
          password: password,
          profilePicture: profilePicture,
          role: role,
        },
      });
    } catch (error) {
      throw new BadRequestException('could_not_create_user');
    }
  }

  async editUser(userId: User['id'], user: Partial<User>) {
    try {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          email: user.email,
          username: user.username,
          password: user.password,
          profilePicture: user.profilePicture,
          status: user.status,
          aboutMe: user.aboutMe,
          role: user.role,
        },
      });
    } catch (error) {
      throw new NotFoundError('user_not_found');
    }
  }

  async deleteUser(id: string) {
    try {
      return this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('user_not_found');
    }
  }
}
