import {Component, Input, OnInit} from '@angular/core';

import { Category, CategoryService } from '../shared/services';
import { Observable } from "rxjs/Observable";
import { mergeMap } from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";

@Component({
  selector: 'ngh-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  readonly categories$: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().pipe(mergeMap(catalog => catalog.subcategories))
      .subscribe(data => {
        this.categories$.push(data);
      }
    )
  }

  ngOnInit() {
  }
}

