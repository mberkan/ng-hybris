import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import { CartComponent } from './cart.component';

const routes: Route[] = [
  { path: '', component: CartComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CartComponent]
})
export class CartModule { }
