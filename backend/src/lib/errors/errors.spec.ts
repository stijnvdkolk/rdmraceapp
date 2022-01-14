import { HttpException, HttpStatus } from '@nestjs/common';
import { UserError, NotFoundError } from './';

describe('Errors', () => {
  describe('UserError', () => {
    it('should be defined', () => {
      expect(UserError).toBeDefined();
    });

    it('should be a class', () => {
      expect(typeof UserError).toBe('function');
    });

    it('should have a data property', () => {
      const error = new UserError('message', 200);
      error.data = {};
      expect(error.data).toBeDefined();
    });
  });

  describe('NotFoundError', () => {
    it('should be defined', () => {
      expect(NotFoundError).toBeDefined();
    });

    it('should be a class', () => {
      expect(typeof NotFoundError).toBe('function');
    });

    it('should have a data property', () => {
      const error = new NotFoundError('message');
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(UserError);
      expect(error).toBeInstanceOf(HttpException);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual('message');
      expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
    });
  });
});
