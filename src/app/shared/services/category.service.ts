import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_BASE_URL} from '../../app.tokens';

export interface Category {
  id: string;
  name: string;
  url: string;
  subcategories: Category[];
}

// export interface CategorySearchParams {
//   [key: string]: any; // To make compatible with HttpParams type.
//   title?: string;
//   minPrice?: number;
//   maxPrice?: number;
// }

export abstract class CategoryService {
  abstract getAllCategories(): Observable<Category>;
}

@Injectable()
export class HttpCategoryService implements CategoryService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAllCategories(): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/catalogs/apparelProductCatalog/Online/categories/collections`);
  }
}
