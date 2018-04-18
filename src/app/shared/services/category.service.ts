import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
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

export class Product {
  code: string;
  name: string;
  description: string;
}

export class CategorySearch {
  products: Product[];
}



export abstract class CategoryService {
  abstract getAllCategories(): Observable<Category[]>;
  abstract getProductsByCategory(categoryId : string): Observable<Product[]>;
  abstract getProductByCode(productCode : string) : Observable<Product>;
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

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get<CategorySearch>(`${this.baseUrl}/products/search?query=:relevance:collection:` + categoryId)
      .pipe(map(categorySearch => categorySearch.products));
  }

  getProductByCode(productCode: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/` + productCode);
  }
}
