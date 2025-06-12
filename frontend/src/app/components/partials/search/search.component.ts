import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../../shared/models/Cart';
import { CommonModule } from '@angular/common';
import { Categories } from '../../../shared/models/Categories';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  foods: Food[] = [];
  cart!: Cart;
  selectedFood: Food | null = null;
  categories?: Categories[];

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm']
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      foodsObservable.subscribe((foods) => {
        this.foods = foods;
        console.log(this.foods)
      })
    })
    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
    this.foodService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  search(term: string) {
    if (term)
      this.router.navigateByUrl('search/' + term);
  }

  openFoodDetailDialog(food: Food) {
    this.selectedFood = food;
    console.log({ food })
  }

  closeFoodDetailDialog() {
    this.selectedFood = null;
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
}
