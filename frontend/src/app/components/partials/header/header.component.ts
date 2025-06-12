import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;

  constructor(cartService: CartService, private userService: UserService, private router: Router) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.items.length;
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  goToOffers() {
    this.router.navigate(['/'], { queryParams: { scrollTo: 'offers' } });
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
