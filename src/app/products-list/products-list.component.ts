import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import { filter, map, switchMap } from 'rxjs/operators';
import {Product, CategoryService} from '../shared/services';


@Component({
  selector: 'ngh-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  categoryId: Observable<string>;
  products: Observable<Product[]>;

  constructor(route: ActivatedRoute, private categoryService: CategoryService) {
    this.categoryId = route.paramMap.pipe(map(params => params.get('id')));
    this.products = route.paramMap.pipe(switchMap(params => this.categoryService.getProductsByCategory(params.get('id'))));
  }

  ngOnInit() {
  }

}
