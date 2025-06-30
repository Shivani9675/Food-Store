import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;
  dialogRef: MatDialogRef<SignInComponent> | null = null;

  constructor(
    cartService: CartService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
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
    this.router.navigate(['/foods'], { queryParams: { scrollTo: 'offers' } });
  }

  logout() {
    this.userService.logout();
  }

  openLoginDialog(event: Event) {
    event?.preventDefault();
    if (this.dialogRef) return;

    this.dialogRef = this.dialog.open(SignInComponent, {
      width: '600px',
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  get isAuth() {
    return this.user.token;
  }
}
