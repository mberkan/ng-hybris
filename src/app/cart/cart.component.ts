import {Component, OnInit} from '@angular/core';
import {Cart, CartService} from "../shared/services";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ngh-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart : Observable<Cart>;

  constructor(private cartService: CartService) {
    this.cart = cartService.getCart();
  }

  ngOnInit() {
  }

  removeFromCart(orderEntry) {
    this.cartService.removeFromCart(orderEntry);
  }

}
