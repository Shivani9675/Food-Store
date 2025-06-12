import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { TitleComponent } from "../../partials/title/title.component";
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-page',
  imports: [TitleComponent, RouterModule, RouterLink, CommonModule, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService, private toastrService: ToastrService) {
    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(cart)
    })
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.toastrService.success("item is removed from your cart")
  }

  increaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity < 6) {
      const newQuantity = cartItem.quantity + 1;
      this.cartService.changeQuantity(cartItem.food.id, newQuantity);
      this.toastrService.success('Item has been added to your cart successfully');
    } else {
      this.toastrService.warning('You cannot add more than 6 quantities of this food');
    }
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      this.cartService.changeQuantity(cartItem.food.id, newQuantity);
    } else {
      if (this.cart.items.length === 1) {
        this.cartService.removeFromCart(cartItem.food.id);
        this.cart.items = [];
      } else {
        this.cartService.removeFromCart(cartItem.food.id);
        this.cart.items = this.cart.items.filter(item => item.food.id !== cartItem.food.id);
      }
    }
    this.toastrService.success('Quantity of Item has been reduced');
  }
}
