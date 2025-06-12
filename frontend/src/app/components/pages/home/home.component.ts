import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TagsComponent } from "../../partials/tags/tags.component";
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TagsComponent,
    NotFoundComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @ViewChild('offerSection') offerSection!: ElementRef;
  foods: Food[] = [];
  popularFood: Food[] = [];
  offerInFood: Food[] = [];
  recommendedFood: Food[] = [];
  cart!: Cart;
  selectedFood: Food | null = null;

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {
    let foodsObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      else {
        foodsObservable = foodService.getAll();
      }

      foodsObservable.subscribe((foods) => {
        this.foods = foods;

        // Filter popular foods based on stars (example: 4.5 or higher)
        this.popularFood = foods.filter(food => food.rating >= 4.0);

        // Filter foods that have a discount
        this.offerInFood = foods.filter(food => food.discount && food.discount.trim() !== '');

        // Recommended For You: top-rated + discounted
        this.recommendedFood = foods
          .filter(food => food.rating >= 4.2 && food.discount && food.discount.trim() !== '')
          .slice(0, 8); // Limit to top 8
      })
    })

    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['scrollTo'] === 'offers') {
        setTimeout(() => this.scrollToOffers(), 300);
      }
    });
  }

  changeQuantity(food: Food) {
    this.cartService.addToCart(food);
    this.toastrService.success('Item has been added to your cart successfully');
  }

  getQuantity(foodId: string): number {
    const item = this.cart.items.find(item => item.food.id === foodId);
    return item ? item.quantity : 0;
  }

  isInCart(foodId: string): boolean {
    return this.cart.items.some(item => item.food.id === foodId);
  }

  increaseQuantity(foodId: string) {
    const quantity = this.getQuantity(foodId);
    if (quantity < 6) {
      const newQuantity = quantity + 1;
      this.cartService.changeQuantity(foodId, newQuantity);
      this.toastrService.success('Item has been added to your cart successfully');
    } else {
      this.toastrService.warning('You cannot add more than 6 quantities of this food');
    }
  }

  decreaseQuantity(foodId: string) {
    const quantity = this.getQuantity(foodId);
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      this.cartService.changeQuantity(foodId, newQuantity);
    } else {
      if (this.cart.items.length === 1) {
        this.cartService.removeFromCart(foodId);
        this.cart.items = [];
      } else {
        this.cartService.removeFromCart(foodId);
        this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
      }
    }
    this.toastrService.success('Quantity of Item has been reduced');
  }

  toggleFavorite(food: Food) {
    food.favorite = !food.favorite;
  }

  openFoodDetailDialog(food: Food) {
    this.selectedFood = food;
    console.log({ food })
  }

  closeFoodDetailDialog() {
    this.selectedFood = null;
  }

  scrollToOffers() {
    if (this.offerSection) {
      this.offerSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
