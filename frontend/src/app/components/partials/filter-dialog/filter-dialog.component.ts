import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-dialog',
  imports: [CommonModule, MatDialogModule, MatSelectModule, FormsModule, MatListModule, MatRadioModule, MatIconModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {
  selectedOption = 'sort';

  filterOptions = [
    { key: 'sort', label: 'Sort' },
    { key: 'delivery', label: '10 Mins Delivery' },
    { key: 'veg', label: 'Veg/Non-Veg' },
    { key: 'ratings', label: 'Ratings' },
    { key: 'deliveryTime', label: 'Delivery Time' },
    { key: 'cost', label: 'Cost For Two' }
  ];

  filters = {
    sort: 'relevance',
    fastDelivery: false,
    vegOnly: false,
    rating: '',
    cost: ''
  };

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>) { }

  selectOption(key: string) {
    this.selectedOption = key;
  }

  applyFilters() {
    this.dialogRef.close(this.filters);
  }

  clearFilters() {
    this.filters = {
      sort: 'relevance',
      fastDelivery: false,
      vegOnly: false,
      rating: '',
      cost: ''
    };
  }
}
