import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

@Resolver('products')
export class ProductsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  products() {
    return this.prisma.products.findMany();
  }
}
