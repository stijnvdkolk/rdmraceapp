import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_NOT_AUTH = 'no-auth';
export const NoAuth = (): CustomDecorator<string> =>
  SetMetadata(IS_NOT_AUTH, true);
