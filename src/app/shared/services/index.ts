import { Provider } from '@angular/core';
import { CategoryService, HttpCategoryService } from './category.service';
import {CartService, HttpCartService, OrderEntry} from './cart.service';

export { Category, Product, CategoryService } from './category.service';
export { Cart, CartService, OrderEntry } from './cart.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: CategoryService, useClass: HttpCategoryService },
  { provide: CartService, useClass: HttpCartService },
];
