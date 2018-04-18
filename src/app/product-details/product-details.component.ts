import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {map, switchMap} from "rxjs/operators";
import {CategoryService, Product} from "../shared/services";

@Component({
  selector: 'ngh-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productCode: Observable<string>;
  product: Observable<Product>;

  constructor(route: ActivatedRoute, private categoryService: CategoryService) {
    this.productCode = route.paramMap.pipe(map(params => params.get('product')));
    this.product = route.paramMap.pipe(switchMap(params => this.categoryService.getProductByCode(params.get('product'))));
  }

  ngOnInit() {
  }

}
