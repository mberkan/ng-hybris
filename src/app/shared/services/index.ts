import { Provider } from '@angular/core';
import { CategoryService, HttpCategoryService } from './category.service';

export { Category, CategoryService } from './category.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: CategoryService, useClass: HttpCategoryService },
];
