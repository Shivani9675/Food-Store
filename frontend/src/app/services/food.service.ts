import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_SUBCATEGORIES_BY_CATEGORY_ID_URL, FOODS_CATEGORIES_URL, FOODS_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { Categories } from '../shared/models/Categories';
 import { SubCategories } from '../shared/models/SubCategories';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(FOODS_CATEGORIES_URL);
  }

  getSubCategoriesByCategoryId(categoryId: string): Observable<SubCategories[]> {
    return this.http.get<SubCategories[]>(FOODS_SUBCATEGORIES_BY_CATEGORY_ID_URL + categoryId);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
