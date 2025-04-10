import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor(foodService: FoodService) {
    foodService.getAllTags().subscribe(tag => {
      this.tags = tag;
    });
  }

  ngOnInit(): void {

  }
}
