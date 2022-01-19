import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaModule } from '@modules/Prisma/prima.module';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { ProviderModule } from '@modules/providers/provider.module';
import { Test } from '@nestjs/testing';

import { mockDeep } from 'jest-mock-extended';
import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ChannelService, PaginationQueryBuilder],
      imports: [PaginationQueryBuilder, ProviderModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    service = module.get<ChannelService>(ChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
