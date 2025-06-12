import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categories } from '../../../shared/models/Categories';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements AfterViewInit, OnInit {

  categories?: Categories[];
  canScrollLeft = false;
  canScrollRight = false;
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  constructor(private foodService: FoodService) {
  }

  ngOnInit() {
    this.foodService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      setTimeout(() => this.updateScrollButtons(), 0);
    });
  }

  ngAfterViewInit() {
    if (this.categories?.length) {
      setTimeout(() => this.updateScrollButtons(), 0);
    }
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -380, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 380);
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 380, behavior: 'smooth' });
    setTimeout(() => this.updateScrollButtons(), 380);
  }

  onScroll() {
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const el = this.slider.nativeElement;
    this.canScrollLeft = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth;
  }
}
