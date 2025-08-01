import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LocationService } from '../../../services/location.service';
import { TagsComponent } from '../../partials/tags/tags.component';
import { FooterComponent } from '../../partials/footer/footer.component';
import { featureFilter } from '@maptiler/sdk';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TagsComponent,
    FooterComponent,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user!: User;
  dialogRef: MatDialogRef<SignInComponent> | null = null;
  isLocationMenuOpen: boolean = false;
  isFetchingLocation = false;
  isLocationErr = false;
  currentLocation = '';
  recentSearchArr = ['TRP Mall Bopal, Main Rd, Central Bopal, Bopal, Ahmedabad, Gujarat, India'];
  locationErrorArr = ['You have blocked Foodmine from tracking your location. To use this, change your location settings in browser.']

  private router = inject(Router)
  private dialog = inject(MatDialog)
  private userService = inject(UserService)
  private locationService = inject(LocationService);

  constructor(
  ) {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  async useCurrentLocation() {
    this.isFetchingLocation = true;
    try {
      const position = await this.locationService.getCurrentCoordinates();
      const { latitude, longitude } = position.coords;
      const address = await this.locationService.getAddressFromCoords(longitude, latitude);
      this.currentLocation = address;
      this.isLocationMenuOpen = false
    } catch (error) {
      console.error('Oops! something went wrong. Please try entering your location again');
      console.error('Error getting location', error);
      this.isLocationErr = true;
    } finally {
      this.isFetchingLocation = false;
      this.isLocationMenuOpen = false
    }
  }

  toggleLocation() {
    this.isLocationMenuOpen = !this.isLocationMenuOpen;
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

  goToMap() {
    this.router.navigateByUrl('/google-map');
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
