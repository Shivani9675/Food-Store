import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-items-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent implements OnInit {
  @Input()
  order!: Order;
  constructor() { }

  ngOnInit(): void {
  }
}
