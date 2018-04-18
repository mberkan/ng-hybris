import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {API_BASE_URL} from '../../app.tokens';
import {map} from "rxjs/operators";
import {Product} from "./category.service";


export class Cart {
  guid: string;
  entries:  OrderEntry[];
}

export class OrderEntry {
  product: Product;
  quantity: number;
  entryNumber: number;
}

@Injectable()
export abstract class CartService {
  abstract getCart(): Observable<Cart>;
  abstract addProductToCart(product : Product) : void;
  abstract removeFromCart(entry : OrderEntry) : void;
}

@Injectable()
export class HttpCartService implements CartService {
  currentCart : Observable<Cart>;

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {
    this.currentCart = this.http.post<Cart>(`${this.baseUrl}/users/anonymous/carts`, null);
    this.currentCart.subscribe(cart => {
      console.log("New cart: " + cart.guid);
    })
  }

  getCart() {
    return this.currentCart;
  }

  addProductToCart(product : Product) {
    // TODO zamienić na builder
    let orderEntry = new OrderEntry();
    orderEntry.product = product;
    this.currentCart.subscribe(data => {
      this.http.post<any>(`${this.baseUrl}/users/anonymous/carts/${data.guid}/entries`, orderEntry)
        .subscribe(() => this.refreshCart(data));
    })
  }

  removeFromCart(entry: OrderEntry): void {
    this.currentCart.subscribe(data => {
      this.http.delete<any>(`${this.baseUrl}/users/anonymous/carts/${data.guid}/entries/${entry.entryNumber}`)
        .subscribe(() => this.refreshCart(data));
    })
  }

  private refreshCart(data) {
    this.currentCart = this.http.get<Cart>(`${this.baseUrl}/users/anonymous/carts/${data.guid}`);
    this.currentCart.subscribe(cart => {
      console.log("Existing cart: " + cart.guid);
    })
  }
}
