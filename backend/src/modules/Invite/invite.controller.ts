import { Public, Roles } from '@decorators';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { SpacesProvider } from '@modules/providers/spaces.provider';
import { UserService } from '@modules/User/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from '@prisma/client';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UseInviteDto } from './dto/use-invite.dto';
import { InviteService } from './invite.service';

@Controller('/invites')
export class InviteController {
  constructor(
    private inviteService: InviteService,
    private userService: UserService,
  ) {}

  @Roles([UserRole.ADMIN])
  @Get('/')
  async getInvites(@Query() query: PaginationQueryInput) {
    return this.inviteService.findInvitesPagination(query);
  }

  @Get('/:id')
  @Public()
  async getInviteById(@Param('id') id: string) {
    const invite = await this.inviteService.getInviteById(id);

    let isValid = true;

    // invite validating
    const date = new Date();

    if (invite.expireAt < date) {
      isValid = false;
    }

    if (invite.amountUsed >= invite.maxUses) {
      isValid = false;
    }

    return { invite, isValid };
  }

  @Post('/')
  @Roles([UserRole.ADMIN])
  async createInvite(@Body() inviteData: CreateInviteDto) {
    return this.inviteService.createInvite(
      new Date(Date.parse(inviteData.expiresAt)),
      inviteData.maxUses,
      inviteData.role,
    );
  }

  @Post('/:id')
  @Public()
  @UseInterceptors(
    FileInterceptor('profilepicture', {
      limits: {
        fileSize: 10000000,
      },
      fileFilter: /* istanbul ignore next */ (req, file, callback) => {
        /* istanbul ignore next */
        if (file.mimetype.includes('image')) {
          callback(null, true);
        } else {
          callback(new UnsupportedMediaTypeException(), false);
        }
      },
    }),
  )
  async useInvite(
    @Param('id') id: string,
    @Body() data: UseInviteDto,
    @UploadedFile() profilepicture: Express.Multer.File,
  ) {
    const invite = await this.inviteService.getInviteById(id);

    let isValid = true;

    // invite validating
    const date = new Date();

    if (invite.expireAt < date) {
      isValid = false;
    }

    if (invite.amountUsed >= invite.maxUses) {
      isValid = false;
    }

    if (!isValid) {
      throw new BadRequestException('invite_not_valid');
    }

    let user = await this.inviteService.useInvite(invite, data);

    if (profilepicture) {
      const profilePicture = await this.userService.uploadProfilePicture(
        user.id,
        profilepicture,
      );
      user = await this.userService.editUser(user.id, {
        profilePicture,
      });
    }
    return user;
  }

  @Roles([UserRole.ADMIN])
  @Delete('/:id')
  async deleteInvite(@Param('id') id: string) {
    return await this.inviteService.deleteInvite(id);
  }
}
