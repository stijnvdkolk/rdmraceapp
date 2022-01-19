import { Argon2CryptoProvider } from './argon2.provider';

describe('Argon2CryptoProvider', () => {
  let provider: Argon2CryptoProvider;

  beforeEach(() => {
    provider = new Argon2CryptoProvider();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should be able to hash a password', async () => {
    const password = 'password';

    await expect(provider.hashPassword(password)).resolves.toBeDefined();
  });

  it('should be able to verify the right password', async () => {
    const password = 'password';
    const hash = await provider.hashPassword(password);
    const result = await provider.verifyPassword(hash, password);
    expect(result).toBeTruthy();
  });

  it('should not be able verify a wrong password', async () => {
    const password = 'password';
    const hash = await provider.hashPassword(password);
    const result = await provider.verifyPassword(hash, 'wrong-password');
    expect(result).toBeFalsy();
  });
});
