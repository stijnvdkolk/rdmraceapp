import { Global, Module } from '@nestjs/common';
import { Argon2CryptoProvider } from './argon2.provider';

@Global()
@Module({
  providers: [{ provide: 'CRYPTO', useClass: Argon2CryptoProvider }],
  exports: ['CRYPTO'],
})
export class ProviderModule {}
