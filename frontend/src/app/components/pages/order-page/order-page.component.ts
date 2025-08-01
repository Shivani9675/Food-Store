import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  imports: [CommonModule],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {

  orders: Order[] = [];
  visibleOrders: Order[] = [];
  displayLimit = 6;
  router = inject(Router)
  orderService = inject(OrderService);
  expandedOrders: { [orderId: string]: boolean } = {};

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        const payedOrders = orders
          .filter((order: Order) => order.status === 'PAYED')
          .map(order => ({
            ...(order as Order),
            isExpanded: false
          }));

        this.orders = payedOrders;
        console.log(this.orders)
        this.updateVisibleOrders();
      },
      error: (err) => {
        console.log('Feaching orders error', err)
      }
    })
  }

  updateVisibleOrders() {
    this.visibleOrders = this.orders.slice(0, this.displayLimit);
  }

  loadMoreOrders() {
    this.displayLimit += 6;
    this.updateVisibleOrders();
  }

  hasMoreOrders(): boolean {
    return this.displayLimit < this.orders.length;
  }

  toggleItems(order: Order) {
    order.isExpanded = !order.isExpanded;
  }

  goToViewDetailsPage(orderId: any) {
    this.router.navigateByUrl(`track/${orderId}`)
  }
}
