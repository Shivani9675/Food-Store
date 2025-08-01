import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Categories } from '../../../shared/models/Categories';
import { SubCategories } from '../../../shared/models/SubCategories';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/food';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { ToastrService } from 'ngx-toastr';
import { FilterDialogComponent } from '../../partials/filter-dialog/filter-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-food-category-page',
  imports: [CommonModule, MatDialogModule,],
  templateUrl: './food-category-page.component.html',
  styleUrl: './food-category-page.component.css'
})
export class FoodCategoryPageComponent implements OnInit {

  allCategories: Categories[] = [];
  subCategories: SubCategories[] = [];
  selectedCategories: any;
  selectedSubCategory: SubCategories | null = null;
  foods: Food[] = [];
  cart!: Cart;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private dialog: MatDialog
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
      })
    })

    cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
    this.foodService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;

      this.activatedRoute.params.subscribe(params => {
        const categoryId = params['id'];
        this.selectedCategories = this.allCategories.find(item => item.id === categoryId);

        if (categoryId) {
          this.foodService.getSubCategoriesByCategoryId(categoryId).subscribe(subcategories => {
            this.subCategories = subcategories;
            console.log({ subcategories })
          });
        }
      });
    });
  }

  changeQuantity(food: any) {
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

  openSubCategoryDetailDialog(subcategories: SubCategories) {
    this.selectedSubCategory = subcategories;
    console.log({ subcategories })
  }

  closeFoodDetailDialog() {
    this.selectedSubCategory = null;
  }


  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      panelClass: 'custom-dialog',
      minWidth: '900px',
      minHeight: '60%'
      // width: '900px'
    });

    dialogRef.afterClosed().subscribe(filters => {
      if (filters) {
        console.log('Selected Filters:', filters);
      }
    });
  }
}
