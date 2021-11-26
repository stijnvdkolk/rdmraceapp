import { Injectable } from '@nestjs/common';
import { Message, Channel, ChannelType, User, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // // USER
  // async createUser(): Promise<User> {
  //   return this.prisma.user.create({
  //     data: {
  //       email: 'emily@kolkies.dev',
  //       password: 'yeet',
  //       username: 'Stijn',
  //       aboutMe: 'I am a developer',
  //       profilePicture: 'https://i.imgur.com/XqwXZ8l.jpg',
  //       role: UserRole.ADMIN,
  //     },
  //   });
  // }

  // async getUser(email: string): Promise<User> {
  //   return this.prisma.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  // }

  // // CHANNEL
  // async createChannel(): Promise<Channel> {
  //   return this.prisma.channel.create({
  //     data: {
  //       name: 'General',
  //       type: ChannelType.PUBLIC_CHANNEL,
  //     },
  //   });
  // }

  // async getChannel(name: string): Promise<Channel> {
  //   return this.prisma.channel.findFirst({
  //     where: {
  //       name,
  //     },
  //   });
  // }

  // // MESSAGE
  // async createMessage(): Promise<Message> {
  //   return this.prisma.message.create({
  //     data: {
  //       content: 'This is a message!',
  //       channelId: '1',
  //       authorId: '991911',
  //     },
  //   });
  // }
  // async getMessage(content: string): Promise<Message> {
  //   return this.prisma.message.findFirst({
  //     where: {
  //       content,
  //     },
  //   });
  // }
}
