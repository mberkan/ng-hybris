import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_BASE_URL} from '../../app.tokens';
import {map} from "rxjs/operators";

export class Category {
  id: string;
  name: string;
  url: string;
  subcategories: Category[];
}

export class Catalog {
  subcategories: Category[];
}

export abstract class CategoryService {
  abstract getAllCategories(): Observable<Category[]>;
}

@Injectable()
export class HttpCategoryService implements CategoryService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Catalog>(`${this.baseUrl}/catalogs/apparelProductCatalog/Online/categories/collections`)
      .pipe(map(catalog => catalog.subcategories));
  }
}
