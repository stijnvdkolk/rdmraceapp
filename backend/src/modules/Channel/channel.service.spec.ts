import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { ProviderModule } from '@modules/providers/provider.module';
import { Test } from '@nestjs/testing';

import { mockDeep } from 'jest-mock-extended';
import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
        PaginationQueryBuilder,
      ],
      imports: [PaginationQueryBuilder, ProviderModule],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
