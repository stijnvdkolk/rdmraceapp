import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import validator from 'validator';

// TODO: match against common passwords
export function isStrongPassword(value: unknown): boolean {
  return (
    typeof value === 'string' &&
    !value.toLowerCase().includes('tribecamp') &&
    !value.toLowerCase().includes('tribe') &&
    !value.toLowerCase().includes('tc') &&
    validator.isStrongPassword(value, {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 2,
      minUppercase: 2,
      minSymbols: 1,
    })
  );
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        ...validationOptions,
      },
      validator: {
        validate: (value): boolean => isStrongPassword(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property must be a valid password.`,
        ),
      },
    });
  };
}
