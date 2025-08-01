import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { FoodCategoryPageComponent } from './components/pages/food-category-page/food-category-page.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FoodsComponent } from './components/pages/foods/foods.component';
import { GoogleMapsComponent } from './components/partials/google-maps/google-maps.component';
import { MapTilerComponent } from './components/partials/map-tiler/map-tiler.component';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { AddressesPageComponent } from './components/pages/addresses-page/addresses-page.component';
import { FoodmineonePageComponent } from './components/pages/foodmineone-page/foodmineone-page.component';
import { FavouritesPageComponent } from './components/pages/favourites-page/favourites-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'foods', component: FoodsComponent },
    { path: 'search', component: SearchComponent },
    // { path: 'google-map', component: GoogleMapsComponent },
    { path: 'google-map', component: MapTilerComponent },
    { path: 'search/:searchTerm', component: SearchComponent },
    { path: 'category/:id', component: FoodCategoryPageComponent },
    { path: 'food/:id', component: FoodPageComponent },
    { path: 'cart-page', component: CartPageComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
    { path: 'payment', component: PaymentPageComponent, canActivate: [authGuard] },
    { path: 'track/:orderId', component: OrderTrackPageComponent, canActivate: [authGuard] },
    {
        path: 'my-account',
        component: MyAccountComponent,
        // loadComponent: () => import('./components/pages/my-account/my-account.component').then(m => m.MyAccountComponent),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'orders', pathMatch: 'full' },
            { path: 'orders', component: OrderPageComponent },
            { path: 'food-mine-one', component: FoodmineonePageComponent },
            { path: 'favourites', component: FavouritesPageComponent },
            { path: 'payments', component: PaymentComponent },
            { path: 'addresses', component: AddressesPageComponent },
            { path: 'settings', component: SettingsPageComponent },
        ]
    },
];
