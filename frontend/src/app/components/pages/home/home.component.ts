import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchComponent,
    SearchComponent,
    RouterModule,
    TagsComponent,
    TagsComponent,
    NotFoundComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      else
        foodsObservable = foodService.getAll();

      foodsObservable.subscribe((foods) => {
        this.foods = foods;
      })

    })
  }

  ngOnInit(): void {

  }
}
