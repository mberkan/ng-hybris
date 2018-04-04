import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryListComponent, ProductsListComponent, ProductDetailsComponent]
})
export class CatalogModule { }
