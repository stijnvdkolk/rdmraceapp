import { Global, Module } from '@nestjs/common';
import { Argon2CryptoProvider } from './argon2.provider';
import { SpacesProvider } from './spaces.provider';

@Global()
@Module({
  providers: [
    { provide: 'CRYPTO', useClass: Argon2CryptoProvider },
    { provide: 'SPACES', useClass: SpacesProvider },
  ],
  exports: ['CRYPTO', 'SPACES'],
})
export class ProviderModule {}
