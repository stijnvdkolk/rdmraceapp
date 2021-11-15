import { Test, TestingModule } from '@nestjs/testing';
import { Client, CopyConditions } from 'minio';
import { MinioService } from './minio.service';

describe('MinioClientService', () => {
  let service: MinioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinioService],
    }).compile();

    service = module.get<MinioService>(MinioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('client should be defined', () => {
    expect(service.client).toBeDefined();
  });

  it('copyConditions should be defined', () => {
    expect(service.copyConditions).toBeDefined();
  });

  it('client should be instance of minio client', () => {
    expect(service.client).toBeInstanceOf(Client);
  });

  it('copyConditions should be instance of minio copyConditions', () => {
    expect(service.copyConditions).toBeInstanceOf(CopyConditions);
  });
});
