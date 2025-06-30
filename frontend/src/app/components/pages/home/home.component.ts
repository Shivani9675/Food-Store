import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user!: User;
  dialogRef: MatDialogRef<SignInComponent> | null = null;
  isLocationMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  openLoginDialog() {
    // event?.preventDefault();
    // if (this.dialogRef) return;

    this.dialogRef = this.dialog.open(SignInComponent, {
      width: '600px',
      disableClose: true
    });

    // this.dialogRef.afterClosed().subscribe(() => {
    //   this.dialogRef = null;
    // });
  }

  goToFoodPage() {
    this.router.navigateByUrl('/foods');
  }

  goToSearch() {
    this.router.navigateByUrl('/search');
  }

  toggleLocation() {
    this.isLocationMenuOpen = !this.isLocationMenuOpen;
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
