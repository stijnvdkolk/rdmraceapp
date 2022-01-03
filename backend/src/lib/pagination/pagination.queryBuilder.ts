import {
  PaginationQueryInput,
  PaginationQueryOutput,
  PrismaOrderByBase,
  PrismaPagination,
  PrismaWhereBase,
} from '@lib/interfaces/pagination.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationQueryBuilder<
  PrismaWhere extends PrismaWhereBase,
  PrismaOrderBy extends PrismaOrderByBase,
> {
  private prismaWhere: PrismaWhere;
  private prismaOrderBy: PrismaOrderBy;

  private buildPagination(query: PaginationQueryInput): PrismaPagination {
    let pageInt = 1;
    let limitInt = 10;

    if (query.page && query.page !== undefined) {
      pageInt = Number(query.page);
    }

    if (query.limit) {
      limitInt = Number(query.limit);
    }

    return {
      skip: (pageInt - 1 <= 0 ? 0 : pageInt - 1) * limitInt,
      take: limitInt,
    };
  }

  private buildDateQuery(query: PaginationQueryInput): void {
    let start: Date;
    let end: Date;

    if (query.startDate) {
      start = new Date(query.startDate);
    } else {
      start = new Date(0);
    }

    if (query.endDate) {
      end = new Date(query.endDate);
    } else {
      end = new Date();
    }

    this.prismaWhere = {
      ...this.prismaWhere,
      AND: [
        {
          createdAt: { gte: start },
        },
        {
          createdAt: { lte: end },
        },
      ],
    };
  }

  private buildSortQuery(query: PaginationQueryInput): void {
    if (query.sortBy) {
      this.prismaOrderBy = {
        ...this.prismaOrderBy,
        [query.sortBy]: query.sortDirection ? query.sortDirection : 'asc',
      };
    }
  }

  public build(
    query: PaginationQueryInput,
  ): PaginationQueryOutput<PrismaWhere, PrismaOrderBy> {
    const { skip, take } = this.buildPagination(query);
    this.buildDateQuery(query);
    this.buildSortQuery(query);

    return {
      pagination: { skip, take },
      where: this.prismaWhere,
      orderBy: this.prismaOrderBy,
    };
  }
}
