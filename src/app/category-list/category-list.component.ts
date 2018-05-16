import {Component, OnInit} from '@angular/core';

import {Category, CategoryService, UserService} from '../shared/services';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Component({
  selector: 'ngh-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategories();
  }
}

