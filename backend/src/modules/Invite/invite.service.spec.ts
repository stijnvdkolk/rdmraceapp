import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { ProviderModule } from '@modules/providers/provider.module';
import { Test } from '@nestjs/testing';

import { mockDeep } from 'jest-mock-extended';
import { InviteService } from './invite.service';

describe('ChannelService', () => {
  let service: InviteService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        InviteService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
        PaginationQueryBuilder,
      ],
      imports: [PaginationQueryBuilder, ProviderModule],
    }).compile();

    service = module.get<InviteService>(InviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
