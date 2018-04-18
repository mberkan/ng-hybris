import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

const routes: Route[] = [
  { path: 'category/:id', component: ProductsListComponent },
  { path: 'product/:product', component: ProductDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductsListComponent, ProductDetailsComponent]
})
export class CatalogModule { }
