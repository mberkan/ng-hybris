import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: './catalog/catalog.module#CatalogModule'
  }
];
