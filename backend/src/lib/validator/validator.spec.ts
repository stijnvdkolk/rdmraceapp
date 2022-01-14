import { IsDefined, validate } from 'class-validator';
import { IsStrongPassword, isStrongPassword } from './validator';

describe('Validator', () => {
  describe('isStrongPassword', () => {
    it('should return true with strong password', () => {
      const password = 'H3NKh3nk!?';
      const result = isStrongPassword(password);
      expect(result).toBeTruthy();
    });
    it('should return false with weak password', () => {
      const password = 'hallowereld';
      const result = isStrongPassword(password);
      expect(result).toBeFalsy();
    });
    it('should return false when a blocked word is being used', () => {
      const password = 'phidippi';
      const result = isStrongPassword(password);
      expect(result).toBeFalsy();
    });
  });

  describe('IsStrongPassword decorator', () => {
    class IsStrongPasswordTest {
      @IsDefined()
      @IsStrongPassword()
      password: string;
    }

    it('should return true with strong password', async () => {
      const model = new IsStrongPasswordTest();
      model.password = 'H3NKh3nk!?';
      const errors = await validate(model);
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(0);
    });

    it('should return false with weak password', async () => {
      const model = new IsStrongPasswordTest();
      model.password = 'hallowereld';
      const errors = await validate(model);
      expect(errors).toBeInstanceOf(Array);
      expect(errors.length).toBe(1);
      expect(errors[0].property).toBe('password');
      expect(errors[0].constraints).toEqual({
        isStrongPassword: 'password must be a valid password.',
      });
      expect(errors[0].value).toBe('hallowereld');
      expect(errors[0].children).toBeInstanceOf(Array);
      expect(errors[0].children.length).toBe(0);
      expect(errors[0].target).toBeInstanceOf(IsStrongPasswordTest);
    });
  });
});
