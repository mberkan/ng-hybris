import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {API_BASE_URL} from '../../app.tokens';
import {Product} from "./category.service";
import {UserService} from "./user.service";


export class Cart {
  code: string;
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
  currentCart$ : Observable<Cart>;

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private http: HttpClient, private userService: UserService) {
    this.retrieveCurrentCart();
    this.userService.tokenSubject.subscribe(() => this.retrieveCurrentCart());
  }

  private retrieveCurrentCart() {
    this.currentCart$ = this.http.post<Cart>(this.addAuthenticationParamsToURL(`users/{userId}/carts`), null);
    this.currentCart$.subscribe(cart => {
      console.log("New cart: " + cart.guid);
    });
  }

  addAuthenticationParamsToURL(url : string, currentCart : Cart = null) : string {
    let token = this.userService.getLoggedUserToken();
    let result = this.baseUrl + '/' + url.replace('{userId}', token != null? "current" : "anonymous");
    if (token != null) {
      if (currentCart != null) {
        result = result.replace('{cartId}', currentCart.code);
      }
      result += '?access_token=' + token;
    } else {
      if (currentCart != null) {
        result = result.replace('{cartId}', currentCart.guid);
      }
    }
    return result;
  }

  getCart() {
    return this.currentCart$;
  }

  addProductToCart(product : Product) {
    // TODO zamienić na builder
    let orderEntry = new OrderEntry();
    orderEntry.product = product;
    this.currentCart$.subscribe(currentCart => {
      this.http.post<any>(this.addAuthenticationParamsToURL(`users/{userId}/carts/{cartId}/entries`, currentCart), orderEntry)
        .subscribe(() => this.refreshCart(currentCart));
    })
  }

  removeFromCart(entry: OrderEntry): void {
    this.currentCart$.subscribe(currentCart => {
      this.http.delete<any>(this.addAuthenticationParamsToURL(`users/{userId}/carts/{cartId}/entries/${entry.entryNumber}`, currentCart))
        .subscribe(() => this.refreshCart(currentCart));
    })
  }

  private refreshCart(currentCart) {
    this.currentCart$ = this.http.get<Cart>(this.addAuthenticationParamsToURL(`users/{userId}/carts/{cartId}`, currentCart));
    this.currentCart$.subscribe(currentCart => {
      console.log("Existing cart: " + currentCart.guid);
    })
  }
}
