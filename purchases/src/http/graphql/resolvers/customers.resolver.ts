import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';

import { PurchasesService } from '../../../services/purchases.service';
import { CustomersService } from '../../../services/customers.service';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';

import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
