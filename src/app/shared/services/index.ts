import { Provider } from '@angular/core';
import { CategoryService, HttpCategoryService } from './category.service';
import { CartService, HttpCartService, OrderEntry} from './cart.service';
import { HttpUserService, UserService} from './user.service';
export { Category, Product, CategoryService } from './category.service';
export { Cart, CartService, OrderEntry } from './cart.service';
export { UserService, User, UserSignUp} from './user.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: CategoryService, useClass: HttpCategoryService },
  { provide: CartService, useClass: HttpCartService },
  { provide: UserService, useClass: HttpUserService }
];
