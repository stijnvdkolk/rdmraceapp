import { Prisma } from '@prisma/client';

export interface PrismaPagination {
  skip: number;
  take: number;
}

export interface PaginationQueryOutput<
  PrismaWhere extends PrismaWhereBase = PrismaWhereBase,
  PrismaOrderBy extends PrismaOrderByBase = PrismaOrderByBase,
> {
  pagination: PrismaPagination;
  where: PrismaWhere;
  orderBy: PrismaOrderBy;
}

export interface PaginationQueryInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: Prisma.SortOrder;
  startDate?: string;
  endDate?: string;
}

export interface PrismaWhereBase {
  AND?: Prisma.Enumerable<PrismaWhereBase>;
  OR?: Prisma.Enumerable<PrismaWhereBase>;
  NOT?: Prisma.Enumerable<PrismaWhereBase>;
  createdAt?: Prisma.DateTimeFilter | Date | string;
  updatedAt?: Prisma.DateTimeFilter | Date | string;
}

export interface PrismaOrderByBase {
  createdAt?: Prisma.SortOrder;
  updatedAt?: Prisma.SortOrder;
}
