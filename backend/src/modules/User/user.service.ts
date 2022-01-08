import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { NotFoundError } from '@lib/errors';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';
import { SpacesProvider } from '@modules/providers/spaces.provider';
import { Argon2CryptoProvider } from '@modules/providers/argon2.provider';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private queryBuilder: PaginationQueryBuilder<
      Prisma.UserWhereInput,
      Prisma.UserOrderByWithRelationInput
    >,
    @Inject('SPACES') private spaces: SpacesProvider,
    @Inject('CRYPTO') private crypto: Argon2CryptoProvider,
  ) {}

  async findUserById(userId: User['id'], includeSensitiveInformation = false) {
    try {
      return this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          aboutMe: true,
          email: includeSensitiveInformation,
          profilePicture: true,
          password: false,
          username: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          channels: false,
          messages: false,
        },
      });
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
    role,
  }: {
    email: User['email'];
    username: User['username'];
    password: User['password'];
    role: UserRole;
  }) {
    try {
      return this.prisma.user.create({
        data: {
          email: email,
          username: username,
          password: await this.crypto.hashPassword(password),
          role: role,
        },
        select: {
          profilePicture: true,
          aboutMe: true,
          email: true,
          username: true,
          password: false,
          status: true,
          role: true,
          messages: false,
          channels: false,
          id: true,
          createdAt: true,
          updatedAt: true,
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
          password: user.password
            ? await this.crypto.hashPassword(user.password)
            : undefined,
          profilePicture: user.profilePicture,
          aboutMe: user.aboutMe,
        },
        select: {
          password: false,
          email: true,
          username: true,
          profilePicture: true,
          aboutMe: true,
          status: true,
          role: true,
          messages: false,
          channels: false,
          id: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('email_address_already_in_use');
      }
      throw new NotFoundError('user_not_found');
    }
  }

  async uploadProfilePicture(
    id: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const data = await this.spaces.uploadProfilePicture({ id }, file);
    return data.profilePictureId;
  }

  async deleteUser(id: string) {
    try {
      return this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('user_not_found');
    }
  }
}
