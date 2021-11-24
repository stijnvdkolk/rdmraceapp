import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Errors caused by a user.
 */
export class UserError extends HttpException {
  data: Record<string, unknown>;
}

/**
 * Used when something cannot be found.
 */
export class NotFoundError extends UserError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
