import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from './pagination.queryBuilder';

describe('PaginationQueryBuilder', () => {
  it('should return the standard response when no imput is given', () => {
    const query: PaginationQueryInput = {};
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
    expect(result.where.AND[0].createdAt.gte).toBeInstanceOf(Date);
    expect(result.where.AND[1].createdAt.lte).toBeInstanceOf(Date);
    expect(result.orderBy).toBeUndefined();
  });

  it('should skip 0 and take 10 when page is 1', () => {
    const query: PaginationQueryInput = {
      page: 1,
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
  });

  it('should skip 10 and take 10 when page is 2', () => {
    const query: PaginationQueryInput = {
      page: 2,
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 10,
      take: 10,
    });
  });

  it('should skip 5 and take 5 when page is 2 and limit is 5', () => {
    const query: PaginationQueryInput = {
      page: 2,
      limit: 5,
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 5,
      take: 5,
    });
  });

  it('should only select items that were added yesterday but not till the current time', () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const endDate = new Date();
    const query: PaginationQueryInput = {
      endDate: endDate.toString(),
      startDate: endDate.toString(),
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
    expect(result.where.AND[0].createdAt.gte).toBeInstanceOf(Date);
    expect(result.where.AND[1].createdAt.lte).toBeInstanceOf(Date);
    expect(result.orderBy).toBeUndefined();
  });

  it('should sort items ascending by createdAt', () => {
    const query: PaginationQueryInput = {
      sortBy: 'createdAt',
      sortDirection: 'asc',
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
    expect(result.where.AND[0].createdAt.gte).toBeInstanceOf(Date);
    expect(result.where.AND[1].createdAt.lte).toBeInstanceOf(Date);
    expect(result.orderBy).toEqual({
      createdAt: 'asc',
    });
  });

  it('should sort items descending by createdAt', () => {
    const query: PaginationQueryInput = {
      sortBy: 'createdAt',
      sortDirection: 'desc',
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
    expect(result.where.AND[0].createdAt.gte).toBeInstanceOf(Date);
    expect(result.where.AND[1].createdAt.lte).toBeInstanceOf(Date);
    expect(result.orderBy).toEqual({
      createdAt: 'desc',
    });
  });

  it('should sort items ascending by createdAt when sortDirection is undefined', () => {
    const query: PaginationQueryInput = {
      sortBy: 'createdAt',
    };
    const result = new PaginationQueryBuilder().build(query);
    expect(result.pagination).toEqual({
      skip: 0,
      take: 10,
    });
    expect(result.where.AND[0].createdAt.gte).toBeInstanceOf(Date);
    expect(result.where.AND[1].createdAt.lte).toBeInstanceOf(Date);
    expect(result.orderBy).toEqual({
      createdAt: 'asc',
    });
  });
});
